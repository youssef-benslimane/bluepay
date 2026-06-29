/**
 * Teste la connexion SMTP pour contact@ et noreply@
 * Usage : npm run test:smtp
 */
import nodemailer from "nodemailer";
import { config } from "dotenv";

config({ path: ".env.local", override: true });

const host = process.env.SMTP_HOST ?? "chidori.nindohost.net";
const port = Number(process.env.SMTP_PORT ?? 465);

const accounts = [
  { label: "contact@", user: process.env.SMTP_USER ?? "contact@bluepay.ma", pass: process.env.SMTP_PASS ?? "" },
  { label: "noreply@", user: process.env.SMTP_NOREPLY_USER ?? "noreply@bluepay.ma", pass: process.env.SMTP_NOREPLY_PASS ?? process.env.SMTP_PASS ?? "" },
];

console.log(`Serveur : ${host}:${port}\n`);

for (const { label, user, pass } of accounts) {
  if (!pass) {
    console.log(`❌ ${label} — mot de passe non configuré`);
    continue;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.verify();
    console.log(`✅ ${label} (${user}) — connexion OK`);
  } catch (err) {
    console.log(`❌ ${label} (${user}) — ${err.message}`);
  }
}
