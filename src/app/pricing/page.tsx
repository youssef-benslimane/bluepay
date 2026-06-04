import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/features/shared/PageHero";
import { PricingCard } from "@/features/pricing/PricingCard";
import { PricingFAQ } from "@/features/pricing/PricingFAQ";
import { CTASection } from "@/features/shared/CTASection";
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
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Tarifs" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mb-10 flex justify-center">
            <SectionTitle
              title="Nos offres"
              subtitle="Tarifs personnalisés selon votre nombre de salariés et vos besoins spécifiques."
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {PRICING_PLANS.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Enterprise note */}
          <div className="mt-10 rounded-2xl border border-border bg-surface p-8 text-center [box-shadow:var(--shadow-card)]">
            <h3 className="mb-2 text-xl font-bold text-dark">
              Besoin d&apos;une solution sur mesure ?
            </h3>
            <p className="mb-4 text-muted">
              Pour les groupes, holdings et grandes entreprises avec des besoins
              spécifiques, nous proposons des solutions entièrement personnalisées.
            </p>
            <a
              href="/contact?plan=enterprise"
              className="inline-flex items-center gap-2 rounded-xl bg-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-dark/90"
            >
              Discutons de votre projet
            </a>
          </div>
        </Container>
      </section>

      <PricingFAQ />

      <CTASection
        title="Prêt à démarrer avec BluePay ?"
        subtitle="Demandez votre démonstration personnalisée. Notre équipe vous présentera la solution et établira un devis adapté."
        primaryLabel="Demander un devis gratuit"
        primaryHref="/contact?demo=true"
      />
    </>
  );
}
