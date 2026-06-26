import nodemailer from "nodemailer";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? "mail.bluepay.ma";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER ?? "contact@bluepay.ma";
  const pass = process.env.SMTP_PASS ?? "";

  return { host, port, user, pass };
}

export function isMailConfigured(): boolean {
  return Boolean(getSmtpConfig().pass);
}

export function createMailTransporter() {
  const { host, port, user, pass } = getSmtpConfig();

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
  const address = process.env.SMTP_FROM ?? "contact@bluepay.ma";
  return `"${label}" <${address}>`;
}

/** Confirmations utilisateur → noreply@bluepay.ma */
export function noreplyFromAddress(label = "BluePay") {
  const address = process.env.SMTP_NOREPLY ?? "noreply@bluepay.ma";
  return `"${label}" <${address}>`;
}

export async function verifyMailConnection() {
  const transporter = createMailTransporter();
  await transporter.verify();
}

export async function sendMail(options: nodemailer.SendMailOptions) {
  if (!isMailConfigured()) {
    throw new Error("SMTP_PASS non configuré sur le serveur");
  }

  const transporter = createMailTransporter();
  return transporter.sendMail(options);
}
