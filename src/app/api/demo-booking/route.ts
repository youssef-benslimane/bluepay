import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { internalFromAddress, isMailConfigured, noreplyFromAddress, sendInternalThenUserMail } from "@/lib/mail";
import { buildDemoCalendarLinks } from "@/lib/calendar";
import { isDemoSlotTooSoon } from "@/lib/demo-slots";

const bookingSchema = z.object({
  date:      z.string().min(1),
  heure:     z.string().min(1),
  nom:       z.string().min(1),
  prenom:    z.string().min(1),
  email:     z.string().email(),
  telephone: z.string().min(1),
  societe:   z.string().optional(),
});

// Lazy import Prisma — n'échoue pas si SQLite n'est pas disponible
async function tryGetPrisma() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch {
    return null;
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-MA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

async function sendEmails(
  data: { prenom: string; nom: string; email: string; telephone: string; societe?: string; date: string; heure: string },
  bookingId: number | null,
  dateFormatted: string
) {
  const fullName = `${data.prenom} ${data.nom}`;
  const calendar = buildDemoCalendarLinks({
    date: data.date,
    heure: data.heure,
  });

  await sendInternalThenUserMail(
    {
      from: internalFromAddress("BluePay Démos"),
      to: "contact@bluepay.ma",
      replyTo: data.email,
      subject: `Nouvelle demo — ${dateFormatted} a ${data.heure}`,
      html: `
        <h2 style="color:#1a6bcc">Nouvelle réservation de démo</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${fullName}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Société</td><td style="padding:8px">${data.societe ?? "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Date</td><td style="padding:8px">${dateFormatted}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px;font-weight:bold">Heure</td><td style="padding:8px">${data.heure}</td></tr>
        </table>
        ${bookingId ? `<p style="color:#888;font-size:12px;margin-top:24px">ID réservation : #${bookingId}</p>` : ""}
      `,
    },
    {
      from: noreplyFromAddress("BluePay"),
      to: data.email,
      replyTo: "contact@bluepay.ma",
      subject: `Confirmation demo BluePay — ${dateFormatted} a ${data.heure}`,
      text: `Bonjour ${fullName},\n\nVotre demonstration BluePay est confirmee le ${dateFormatted} a ${data.heure} (30 min).\n\nAjouter a votre agenda :\nGoogle Calendar : ${calendar.google}\nOutlook : ${calendar.outlook}\n\nBluePay — contact@bluepay.ma`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#1a6bcc">Votre démo est confirmée !</h2>
          <p>Bonjour <strong>${fullName}</strong>,</p>
          <p>Votre démonstration BluePay est bien enregistrée. Voici un récapitulatif :</p>
          <div style="background:#f0f7ff;border-left:4px solid #1a6bcc;padding:16px;border-radius:4px;margin:16px 0">
            <p style="margin:4px 0"><strong>Date :</strong> ${dateFormatted}</p>
            <p style="margin:4px 0"><strong>Heure :</strong> ${data.heure}</p>
            <p style="margin:4px 0"><strong>Durée :</strong> 30 minutes</p>
          </div>
          <p style="margin:16px 0 8px;font-weight:bold">Ajouter à votre agenda :</p>
          <p style="margin:8px 0">
            <a href="${calendar.google}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;background:#1a6bcc;color:#fff;text-decoration:none;border-radius:6px;font-size:14px">Google Calendar</a>
            <a href="${calendar.outlook}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;background:#0078d4;color:#fff;text-decoration:none;border-radius:6px;font-size:14px">Outlook</a>
          </p>
          <p style="color:#666;font-size:13px">Un fichier calendrier (.ics) est aussi joint à cet email pour Apple Calendar et autres applications.</p>
          <p>Notre équipe vous contactera avant la démo pour vous envoyer le lien de la réunion.</p>
          <p>Pour toute question : <a href="mailto:contact@bluepay.ma">contact@bluepay.ma</a> · +212 6 11 29 97 03</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="color:#888;font-size:12px">BluePay · <a href="https://bluepay.ma">bluepay.ma</a></p>
        </div>
      `,
      attachments: [
        {
          filename: calendar.icsFileName,
          content: calendar.icsContent,
          contentType: "text/calendar; charset=utf-8",
        },
      ],
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    if (isDemoSlotTooSoon(data.date, data.heure)) {
      return NextResponse.json(
        { success: false, message: "Ce créneau n'est plus disponible. Veuillez en choisir un autre." },
        { status: 400 }
      );
    }

    const dateFormatted = formatDate(data.date);
    let bookingId: number | null = null;

    // ── 1. Tentative de sauvegarde en base (optionnelle) ────────────────────
    const prisma = await tryGetPrisma();
    if (prisma) {
      try {
        const existing = await prisma.demoBooking.findFirst({
          where: { date: data.date, heure: data.heure },
        });
        if (existing) {
          return NextResponse.json(
            { success: false, message: "Ce créneau est déjà réservé. Veuillez en choisir un autre." },
            { status: 409 }
          );
        }
        const booking = await prisma.demoBooking.create({ data });
        bookingId = booking.id;
      } catch (dbErr) {
        console.warn("DB indisponible (non-bloquant) :", dbErr);
      }
    }

    // ── 2. Envoyer les emails ───────────────────────────────────────────────
    if (!isMailConfigured()) {
      console.error("Demo booking email error: SMTP_PASS non configuré");
      return NextResponse.json(
        { success: false, message: "Réservation enregistrée mais email indisponible. Contactez-nous au +212 6 11 29 97 03." },
        { status: 503 }
      );
    }

    try {
      await sendEmails(data, bookingId, dateFormatted);
    } catch (emailErr) {
      console.error("Email error:", emailErr);
      return NextResponse.json(
        { success: false, message: "Impossible d'envoyer la confirmation par email. Réessayez ou contactez-nous." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, bookingId }, { status: 201 });

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

  const prisma = await tryGetPrisma();
  if (!prisma) {
    return NextResponse.json({ bookedSlots: [] });
  }

  try {
    const bookings = await prisma.demoBooking.findMany({
      where: { date },
      select: { heure: true },
    });
    return NextResponse.json({ bookedSlots: bookings.map((b) => b.heure) });
  } catch {
    return NextResponse.json({ bookedSlots: [] });
  }
}
