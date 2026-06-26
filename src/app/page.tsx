import type { Metadata } from "next";
import Script from "next/script";
import { HeroSection } from "@/features/home/HeroSection";
import { ScrollingInfographics } from "@/features/home/ScrollingInfographics";
import { RolesSection } from "@/features/home/RolesSection";
import { softwareApplicationJsonLd, organizationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "BluePay",
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
      " de gestion de la paie pour PME marocaines. CNSS, AMO, IR automatisés.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="json-ld-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd()),
        }}
      />
      <Script
        id="json-ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <HeroSection />
      <ScrollingInfographics />
      <RolesSection />
    </>
  );
}
