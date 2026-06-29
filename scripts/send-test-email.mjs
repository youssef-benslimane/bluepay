/**
 * Envoie un email test noreply → adresse externe
 * Usage : node scripts/send-test-email.mjs you@email.com
 */
import nodemailer from "nodemailer";
import { config } from "dotenv";

config({ path: ".env.local", override: true });

const to = process.argv[2];
if (!to) {
  console.error("Usage: node scripts/send-test-email.mjs <email>");
  process.exit(1);
}

const host = process.env.SMTP_HOST ?? "chidori.nindohost.net";
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_NOREPLY_USER ?? "noreply@bluepay.ma";
const pass = process.env.SMTP_NOREPLY_PASS ?? process.env.SMTP_PASS ?? "";

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  tls: { rejectUnauthorized: false },
});

console.log(`Envoi test : ${user} → ${to}`);

try {
  const info = await transporter.sendMail({
    from: `"BluePay Test" <${user}>`,
    to,
    replyTo: "contact@bluepay.ma",
    subject: "Test confirmation BluePay",
    text: "Si vous recevez ce message, l'envoi noreply@ fonctionne.",
    html: "<p>Si vous recevez ce message, l'envoi <strong>noreply@bluepay.ma</strong> fonctionne.</p>",
  });
  console.log("✅ Accepté par le serveur SMTP");
  console.log("   Message-ID:", info.messageId);
  console.log("   Response:", info.response);
} catch (err) {
  console.error("❌ Échec:", err.message);
  process.exit(1);
}
