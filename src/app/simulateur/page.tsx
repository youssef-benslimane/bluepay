import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/features/shared/PageHero";
import { SimulatorTabsClient } from "@/features/simulator/SimulatorTabsClient";

export const metadata: Metadata = {
  title: "Simulateur de Paie Marocain — CNSS, AMO, IR",
  description:
    "Calculez votre salaire net à partir du brut ou estimez le brut à partir du net. Simulation gratuite et instantanée intégrant CNSS, AMO et IR marocain.",
  openGraph: {
    title: "Simulateur de Paie Marocain — BluePay",
    description:
      "Simulation gratuite du salaire net marocain : CNSS, AMO, IR calculés automatiquement.",
    images: [{ url: "/og/simulateur.png", width: 1200, height: 630 }],
  },
};

export default function SimulateurPage() {
  return (
    <>
      <PageHero
        badge="Simulateur"
        title="Simulateur de paie"
        subtitle="Estimez votre salaire net ou calculez le brut correspondant. Simulation basée sur les taux CNSS, AMO et le barème IR marocain en vigueur."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <SimulatorTabsClient />
        </Container>
      </section>

    </>
  );
}
