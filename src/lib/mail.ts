import nodemailer from "nodemailer";

type MailAccount = "contact" | "noreply";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { responseCode?: number; response?: string; message?: string };
  return (
    err.responseCode === 550 ||
    err.response?.includes("Too many emails") === true ||
    err.message?.includes("Too many emails") === true
  );
}

function getSmtpConfig(account: MailAccount = "contact") {
  const host = process.env.SMTP_HOST ?? "chidori.nindohost.net";
  const port = Number(process.env.SMTP_PORT ?? 465);

  if (account === "noreply") {
    return {
      host,
      port,
      user: process.env.SMTP_NOREPLY_USER ?? "noreply@bluepay.ma",
      pass: process.env.SMTP_NOREPLY_PASS ?? process.env.SMTP_PASS ?? "",
    };
  }

  return {
    host,
    port,
    user: process.env.SMTP_USER ?? "contact@bluepay.ma",
    pass: process.env.SMTP_PASS ?? "",
  };
}

export function isMailConfigured(): boolean {
  const contact = getSmtpConfig("contact");
  const noreply = getSmtpConfig("noreply");
  return Boolean(contact.pass && noreply.pass);
}

function createTransporter(account: MailAccount) {
  const { host, port, user, pass } = getSmtpConfig(account);

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: { rejectUnauthorized: false },
    auth: { user, pass },
  });
}

/** Notifications internes → contact@bluepay.ma */
export function internalFromAddress(label = "BluePay") {
  const address = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "contact@bluepay.ma";
  return `"${label}" <${address}>`;
}

/** Confirmations utilisateur → noreply@bluepay.ma */
export function noreplyFromAddress(label = "BluePay") {
  const address = process.env.SMTP_NOREPLY_USER ?? "noreply@bluepay.ma";
  return `"${label}" <${address}>`;
}

async function sendWithAccount(
  account: MailAccount,
  options: nodemailer.SendMailOptions,
  attempt = 0
): Promise<nodemailer.SentMessageInfo> {
  const { pass } = getSmtpConfig(account);
  if (!pass) {
    throw new Error(`SMTP_PASS non configuré pour le compte ${account}`);
  }

  const transporter = createTransporter(account);
  try {
    const info = await transporter.sendMail(options);
    console.log(`[mail] ${account} → ${options.to} | ${info.messageId}`);
    return info;
  } catch (error) {
    if (isRateLimitError(error) && attempt < 3) {
      await sleep(1500 * (attempt + 1));
      return sendWithAccount(account, options, attempt + 1);
    }
    throw error;
  }
}

/** Email interne (authentifié avec contact@) */
export function sendInternalMail(options: nodemailer.SendMailOptions) {
  return sendWithAccount("contact", options);
}

/** Email utilisateur (authentifié avec noreply@) */
export function sendUserMail(options: nodemailer.SendMailOptions) {
  return sendWithAccount("noreply", options);
}

/** Envoie interne puis confirmation utilisateur avec délai entre les deux */
export async function sendInternalThenUserMail(
  internal: nodemailer.SendMailOptions,
  user: nodemailer.SendMailOptions
): Promise<void> {
  await sendInternalMail(internal);
  await sleep(1500);
  await sendUserMail(user);
}

export async function verifyMailConnection(account: MailAccount = "contact") {
  await createTransporter(account).verify();
}
