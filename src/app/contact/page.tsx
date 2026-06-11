import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/features/shared/PageHero";
import { ContactForm } from "@/features/contact/ContactForm";
import { ContactInfo } from "@/features/contact/ContactInfo";
import { ContactPageClient } from "@/features/contact/ContactPageClient";
import { contactPageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contactez-nous — Demande de Démo",
  description:
    "Prenez contact avec l'équipe BluePay pour une démonstration personnalisée ou un devis sur mesure. Réponse sous 24h.",
  openGraph: {
    title: "Contactez BluePay — Demande de Démo",
    description:
      "Discutons de votre projet de gestion de paie marocaine. Démonstration gratuite disponible.",
    images: [{ url: "/og/contact.png", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="json-ld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd()) }}
      />
      <PageHero
        badge="Contact"
        title="Parlons de votre projet"
        subtitle="Notre équipe vous accompagne dans la mise en place de BluePay et répond à toutes vos questions."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Info */}
            <div className="rounded-2xl border border-border bg-white p-8 [box-shadow:var(--shadow-lg)]">
              <ContactInfo />
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-border bg-white p-8 [box-shadow:var(--shadow-lg)]">
              <h2 className="mb-6 text-xl font-bold text-dark">
                Envoyez-nous un message
              </h2>
              <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-surface" />}>
                <ContactPageClient />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
