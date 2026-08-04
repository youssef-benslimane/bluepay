import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/features/shared/PageHero";
import { PricingTabs } from "@/features/pricing/PricingTabs";
import { PricingFAQ } from "@/features/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Notre offre - Gestion externe & Gestion interne",
  description:
    "Que vous soyez une PME, grande entreprise ou cabinet comptable, BluePay vous propose une offre adaptée à votre organisation.",
  openGraph: {
    title: "Notre offre BluePay - Gestion externe & Gestion interne",
    description:
      "Offres de gestion de la paie marocaine : gestion externe ou gestion interne.",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Notre offre"
        subtitle="Que vous soyez une PME, Grande entreprise ou Cabinet comptable, nous vous proposons une offre la mieux adaptée à votre organisation"
      />

      <section className="py-20 lg:py-28">
        <Container>
          <PricingTabs />
        </Container>
      </section>

      <PricingFAQ />
    </>
  );
}
