import type { Metadata } from "next";
import { PageHero } from "@/features/shared/PageHero";
import { FeaturesSection } from "@/features/home/FeaturesSection";

export const metadata: Metadata = {
  title: "Fonctionnalités — BluePay",
  description:
    "Découvrez toutes les fonctionnalités de BluePay : gestion de la paie, CNSS, AMO, IR, bulletins, déclarations sociales et plus encore.",
  openGraph: {
    title: "Fonctionnalités BluePay",
    description:
      "Un moteur de paie complet intégrant toutes les spécificités de la réglementation marocaine.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
};

export default function FonctionnalitesPage() {
  return (
    <>
      <PageHero
        badge="Fonctionnalités"
        title="Tout ce dont vous avez besoin"
        subtitle="Un moteur de paie complet intégrant toutes les spécificités de la réglementation marocaine."
      />
      <FeaturesSection />
    </>
  );
}
