import type { Metadata } from "next";
import { HeroSection } from "@/features/home/HeroSection";
import { TrustBar } from "@/features/home/TrustBar";
import { PresentationSection } from "@/features/home/PresentationSection";
import { FeaturesSection } from "@/features/home/FeaturesSection";
import { AdvantagesSection } from "@/features/home/AdvantagesSection";
import { CTASection } from "@/features/shared/CTASection";

export const metadata: Metadata = {
  title: "BluePay — Logiciel de Paie Marocain | SaaS CNSS AMO IR",
  description:
    "BluePay est la solution SaaS de gestion de la paie conçue pour les entreprises marocaines. Automatisez vos bulletins, CNSS, AMO et IR. Conformité réglementaire garantie.",
  keywords: [
    "logiciel paie maroc",
    "paie marocaine",
    "gestion paie PME maroc",
    "CNSS AMO IR maroc",
    "bulletin de paie",
    "logiciel RH maroc",
    "SaaS paie",
  ],
  openGraph: {
    title: "BluePay — Logiciel de Paie Marocain",
    description:
      "Solution SaaS de gestion de la paie pour PME marocaines. CNSS, AMO, IR automatisés.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PresentationSection />
      <FeaturesSection />
      <AdvantagesSection />
      <CTASection />
    </>
  );
}
