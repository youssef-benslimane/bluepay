import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const bookingSchema = z.object({
  date:      z.string().min(1),
  heure:     z.string().min(1),
  nom:       z.string().min(1),
  prenom:    z.string().min(1),
  email:     z.string().email(),
  telephone: z.string().min(1),
  societe:   z.string().optional(),
});

function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   ?? "smtp.hostinger.com",
    port:   Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER ?? "noreply@bluepay.ma",
      pass: process.env.SMTP_PASS ?? "",
    },
  });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-MA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

async function sendEmails(
  data: { prenom: string; nom: string; email: string; telephone: string; societe?: string; heure: string },
  bookingId: number,
  dateFormatted: string
) {
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpPass) {
    console.warn("SMTP_PASS non configuré — emails non envoyés");
    return;
  }
  const transporter = createTransporter();

  await transporter.sendMail({
    from:    `"BluePay Démos" <noreply@bluepay.ma>`,
    to:      "contact@bluepay.ma",
    subject: `🗓️ Nouvelle démo — ${dateFormatted} à ${data.heure}`,
    html: `
      <h2 style="color:#1a6bcc">Nouvelle réservation de démo</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
        <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${data.prenom} ${data.nom}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Société</td><td style="padding:8px">${data.societe ?? "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Date</td><td style="padding:8px">${dateFormatted}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Heure</td><td style="padding:8px">${data.heure}</td></tr>
      </table>
      <p style="color:#888;font-size:12px;margin-top:24px">ID réservation : #${bookingId}</p>
    `,
  });

  await transporter.sendMail({
    from:    `"BluePay" <noreply@bluepay.ma>`,
    to:      data.email,
    subject: `✅ Votre démo BluePay est confirmée — ${dateFormatted} à ${data.heure}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto">
        <h2 style="color:#1a6bcc">Votre démo est confirmée !</h2>
        <p>Bonjour <strong>${data.prenom}</strong>,</p>
        <p>Votre démonstration BluePay est bien enregistrée. Voici un récapitulatif :</p>
        <div style="background:#f0f7ff;border-left:4px solid #1a6bcc;padding:16px;border-radius:4px;margin:16px 0">
          <p style="margin:4px 0"><strong>📅 Date :</strong> ${dateFormatted}</p>
          <p style="margin:4px 0"><strong>🕐 Heure :</strong> ${data.heure}</p>
          <p style="margin:4px 0"><strong>⏱ Durée :</strong> 30 minutes</p>
        </div>
        <p>Notre équipe vous contactera avant la démo pour vous envoyer le lien de la réunion.</p>
        <p>Pour toute question : <a href="mailto:contact@bluepay.ma">contact@bluepay.ma</a> · +212 6 11 29 97 03</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="color:#888;font-size:12px">BluePay · <a href="https://bluepay.ma">bluepay.ma</a></p>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // ── 1. Vérifier qu'aucune réservation n'existe déjà sur ce créneau ──────
    const existing = await prisma.demoBooking.findFirst({
      where: { date: data.date, heure: data.heure },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Ce créneau est déjà réservé. Veuillez en choisir un autre." },
        { status: 409 }
      );
    }

    // ── 2. Enregistrer la réservation ────────────────────────────────────────
    const booking = await prisma.demoBooking.create({ data });

    // ── 3. Envoyer les emails en arrière-plan (non-bloquant) ─────────────────
    const dateFormatted = formatDate(data.date);
    sendEmails(data, booking.id, dateFormatted).catch((err) =>
      console.error("Email error (non-bloquant):", err)
    );

    return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Données invalides", issues: error.issues }, { status: 400 });
    }
    console.error("Demo booking error:", error);
    return NextResponse.json({ success: false, message: "Une erreur s'est produite. Veuillez réessayer." }, { status: 500 });
  }
}

// Récupérer les créneaux déjà réservés pour une date donnée
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ success: false, message: "Paramètre date manquant" }, { status: 400 });
  }

  const bookings = await prisma.demoBooking.findMany({
    where: { date },
    select: { heure: true },
  });

  return NextResponse.json({ bookedSlots: bookings.map((b) => b.heure) });
}
