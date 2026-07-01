import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { internalFromAddress, isMailConfigured, noreplyFromAddress, sendInternalThenUserMail } from "@/lib/mail";
import { getRequestIp, verifyRecaptchaToken } from "@/lib/recaptcha";

const contactSchema = z.object({
  prenom:    z.string().min(2),
  nom:       z.string().min(2),
  societe:   z.string().optional(),
  telephone: z.string().min(8),
  email:     z.string().email(),
  message:   z.string().min(10).max(1000),
  plan:      z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);
    const fullName = `${data.prenom} ${data.nom}`;

    const captcha = await verifyRecaptchaToken(data.recaptchaToken, getRequestIp(request));
    if (!captcha.success) {
      return NextResponse.json(
        { success: false, message: captcha.message ?? "Vérification de sécurité échouée." },
        { status: 400 }
      );
    }

    if (!isMailConfigured()) {
      console.error("Contact email error: SMTP_PASS non configuré");
      return NextResponse.json(
        { success: false, message: "Service email temporairement indisponible. Contactez-nous au +212 6 11 29 97 03." },
        { status: 503 }
      );
    }

    const planInfo = data.plan ? `<tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Offre</td><td style="padding:8px">${data.plan}</td></tr>` : "";

    try {
      await sendInternalThenUserMail(
        {
          from: internalFromAddress("BluePay Contact"),
          to: "contact@bluepay.ma",
          replyTo: data.email,
          subject: `Nouveau message — ${fullName}${data.societe ? ` (${data.societe})` : ""}`,
          html: `
            <h2 style="color:#1a6bcc">Nouveau message via le formulaire de contact</h2>
            <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
              <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${fullName}</td></tr>
              <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone}</td></tr>
              <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Société</td><td style="padding:8px">${data.societe ?? "—"}</td></tr>
              ${planInfo}
              <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${data.message.replace(/\n/g, "<br/>")}</td></tr>
            </table>
          `,
        },
        {
          from: noreplyFromAddress("BluePay"),
          to: data.email,
          replyTo: "contact@bluepay.ma",
          subject: "Confirmation — votre message BluePay a bien ete recu",
          text: `Bonjour ${fullName},\n\nMerci de nous avoir contactes. Notre equipe vous repondra dans les plus brefs delais.\n\nBluePay — contact@bluepay.ma — +212 6 11 29 97 03`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:auto">
              <h2 style="color:#1a6bcc">Votre message a bien été reçu</h2>
              <p>Bonjour <strong>${fullName}</strong>,</p>
              <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
              <p>Pour toute urgence : <a href="mailto:contact@bluepay.ma">contact@bluepay.ma</a> · +212 6 11 29 97 03</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
              <p style="color:#888;font-size:12px">BluePay · <a href="https://bluepay.ma">bluepay.ma</a></p>
            </div>
          `,
        }
      );
    } catch (emailErr) {
      console.error("Contact email error:", emailErr);
      return NextResponse.json(
        { success: false, message: "Impossible d'envoyer l'email pour le moment. Réessayez ou appelez le +212 6 11 29 97 03." },
        { status: 502 }
      );
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
