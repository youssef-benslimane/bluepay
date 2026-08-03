import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/features/shared/PageHero";
import { PricingTabs } from "@/features/pricing/PricingTabs";
import { PricingFAQ } from "@/features/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Tarifs - Offres BPO & Cabinets Comptables",
  description:
    "Découvrez les offres BluePay : BPO avec ressources BlueTalent, ou licence pour cabinets comptables. Tarification transparente pour la paie marocaine.",
  openGraph: {
    title: "Tarifs BluePay - BPO & Cabinets Comptables",
    description:
      "Offres de gestion de la paie marocaine : BPO ou licence cabinet.",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        badge="Tarifs"
        title="Des offres pour chaque entreprise"
        subtitle="Choisissez entre le BPO BlueTalent ou la licence cabinet - des tarifs adaptés à votre mode d'organisation."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-10 flex justify-center">
            <SectionTitle
              title="Nos offres"
              subtitle="BPO ou licence cabinet - sélectionnez l'offre qui correspond à votre besoin."
            />
          </div>

          <PricingTabs />
        </Container>
      </section>

      <PricingFAQ />
    </>
  );
}
