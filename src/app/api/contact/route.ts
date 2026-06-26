import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  nom:       z.string().min(2),
  societe:   z.string().optional(),
  telephone: z.string().min(8),
  email:     z.string().email(),
  message:   z.string().min(10).max(1000),
  plan:      z.string().optional(),
});

function createTransporter() {
  return nodemailer.createTransport({
    host:              process.env.SMTP_HOST ?? "mail.bluepay.ma",
    port:              Number(process.env.SMTP_PORT ?? 465),
    secure:            Number(process.env.SMTP_PORT ?? 465) === 465,
    connectionTimeout: 10000,
    greetingTimeout:   10000,
    socketTimeout:     15000,
    tls:               { rejectUnauthorized: false },
    auth: {
      user: process.env.SMTP_USER ?? "contact@bluepay.ma",
      pass: process.env.SMTP_PASS ?? "",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const smtpPass = process.env.SMTP_PASS;
    if (smtpPass) {
      const transporter = createTransporter();
      const planInfo = data.plan ? `<tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Offre</td><td style="padding:8px">${data.plan}</td></tr>` : "";

      try {
        // Email à l'équipe BluePay
        await transporter.sendMail({
          from:    `"BluePay Contact" <contact@bluepay.ma>`,
          to:      "contact@bluepay.ma",
          subject: `📩 Nouveau message — ${data.nom}${data.societe ? ` (${data.societe})` : ""}`,
          html: `
            <h2 style="color:#1a6bcc">Nouveau message via le formulaire de contact</h2>
            <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
              <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${data.nom}</td></tr>
              <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone}</td></tr>
              <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Société</td><td style="padding:8px">${data.societe ?? "—"}</td></tr>
              ${planInfo}
              <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${data.message.replace(/\n/g, "<br/>")}</td></tr>
            </table>
          `,
        });

        // Email de confirmation à l'utilisateur
        await transporter.sendMail({
          from:    `"BluePay" <contact@bluepay.ma>`,
          to:      data.email,
          subject: `✅ Nous avons bien reçu votre message`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto">
              <h2 style="color:#1a6bcc">Votre message a bien été reçu</h2>
              <p>Bonjour <strong>${data.nom}</strong>,</p>
              <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
              <p>Pour toute urgence : <a href="mailto:contact@bluepay.ma">contact@bluepay.ma</a> · +212 6 11 29 97 03</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
              <p style="color:#888;font-size:12px">BluePay · <a href="https://bluepay.ma">bluepay.ma</a></p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Contact email error:", emailErr);
      }
    } else {
      console.warn("SMTP_PASS non configuré — email non envoyé. Données reçues:", data);
    }

    return NextResponse.json(
      { success: true, message: "Votre message a été envoyé avec succès. Notre équipe vous contactera dans les 24h." },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Données invalides", issues: error.issues }, { status: 400 });
    }
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, message: "Une erreur interne s'est produite. Veuillez réessayer." }, { status: 500 });
  }
}
