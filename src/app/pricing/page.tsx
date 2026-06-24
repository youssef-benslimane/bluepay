import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/features/shared/PageHero";
import { PricingCard } from "@/features/pricing/PricingCard";
import { PricingFAQ } from "@/features/pricing/PricingFAQ";
import { PRICING_PLANS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Tarifs — Offres Starter, Business & Enterprise",
  description:
    "Découvrez les offres BluePay adaptées à votre entreprise. Starter, Business ou Enterprise — tarification transparente sur mesure pour la paie marocaine.",
  openGraph: {
    title: "Tarifs BluePay — Starter, Business, Enterprise",
    description:
      "Offres de gestion de la paie marocaine pour toutes les tailles d'entreprise.",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        badge="Tarifs"
        title="Des offres pour chaque entreprise"
        subtitle="Choisissez l'offre adaptée à votre taille et vos besoins. Tous les tarifs sont sur devis personnalisé — contactez-nous pour une proposition."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-10 flex justify-center">
            <SectionTitle
              title="Nos offres"
              subtitle="Tarifs personnalisés selon votre nombre de salariés et vos besoins spécifiques."
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 md:items-stretch">
            {PRICING_PLANS.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

        </Container>
      </section>

      <PricingFAQ />

    </>
  );
}
