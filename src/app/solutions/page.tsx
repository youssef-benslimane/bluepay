import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/features/shared/PageHero";
import { SolutionCard } from "@/features/solutions/SolutionCard";
import { SaasDiagram, OnPremiseDiagram } from "@/features/solutions/DeploymentDiagram";
import { ComparisonTable } from "@/features/solutions/ComparisonTable";
import { CTASection } from "@/features/shared/CTASection";
import { SOLUTIONS } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Nos Solutions SaaS & On-Premise",
  description:
    "Choisissez le mode de déploiement BluePay adapté à votre entreprise : solution Cloud SaaS hébergée ou installation On-Premise sur votre infrastructure.",
  openGraph: {
    title: "Nos Solutions SaaS & On-Premise — BluePay",
    description:
      "Cloud SaaS ou On-Premise : comparez les deux modes de déploiement BluePay.",
    images: [{ url: "/og/solutions.png", width: 1200, height: 630 }],
  },
};

const diagrams = [<SaasDiagram key="saas" />, <OnPremiseDiagram key="op" />];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        badge="Déploiement"
        title="Nos Solutions"
        subtitle="BluePay s'adapte à votre organisation. Choisissez le mode de déploiement qui correspond à vos contraintes techniques, budgétaires et de sécurité."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Nos Solutions" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-20 lg:gap-28">
            {SOLUTIONS.map((solution, i) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                reverse={i % 2 !== 0}
                diagram={diagrams[i]}
              />
            ))}
          </div>
        </Container>
      </section>

      <ComparisonTable />

      <CTASection
        title="Pas sûr du bon choix ?"
        subtitle="Notre équipe vous aide à choisir la solution la mieux adaptée à votre contexte. Échangeons ensemble."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Voir les tarifs"
        secondaryHref="/pricing"
      />
    </>
  );
}
