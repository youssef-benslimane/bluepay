import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  societe: z.string().optional(),
  telephone: z
    .string()
    .regex(/^(\+212|0)[5-7]\d{8}$/, "Numéro de téléphone marocain invalide"),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
  plan: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    /**
     * TODO: Intégrer l'envoi d'email via SMTP (nodemailer, Resend, etc.)
     * Les variables d'environnement à configurer dans .env :
     * - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
     * - CONTACT_EMAIL (destinataire)
     */
    console.log("Contact form submission:", {
      ...data,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Votre message a été envoyé avec succès. Notre équipe vous contactera dans les 24h.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Données invalides",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur interne s'est produite. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
