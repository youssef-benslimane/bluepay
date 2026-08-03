"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, KeyRound, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "./PricingCard";
import { PricingContactModal } from "./PricingContactModal";
import { PRICING_PLANS, CABINET_LICENCE } from "@/data/pricing";

type PricingTab = "bpo" | "cabinet";

const TABS = [
  {
    id: "bpo" as const,
    label: "BPO",
    description: "Toutes les ressources sont du côté BlueTalent - abonnement mensuel tout compris.",
  },
  {
    id: "cabinet" as const,
    label: "Cabinets Comptables",
    description: "Les ressources sont gérées par le cabinet - vente par licence one-shot.",
  },
];

export function PricingTabs() {
  const [activeTab, setActiveTab] = useState<PricingTab>("bpo");
  const [modalOpen, setModalOpen] = useState(false);
  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border border-border bg-surface p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-8",
                activeTab === tab.id ? "text-white" : "text-muted hover:text-dark"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="pricing-active-tab"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted max-w-xl mx-auto">
        {current.description}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "bpo" ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 md:items-stretch">
                {PRICING_PLANS.map((plan, i) => (
                  <PricingCard key={plan.id} plan={plan} index={i} />
                ))}
              </div>
              <p className="mt-6 text-center text-xs text-muted">
                <sup>*</sup> Le montant indiqué comprend les frais d&apos;installation, de gestion et de maintenance.
              </p>
            </>
          ) : (
            <CabinetLicenceCard onCta={() => setModalOpen(true)} />
          )}
        </motion.div>
      </AnimatePresence>

      <PricingContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName="Licence Cabinet"
        planId="cabinet-licence"
      />
    </div>
  );
}

function CabinetLicenceCard({ onCta }: { onCta: () => void }) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 lg:p-10 [box-shadow:var(--shadow-card)]">
      <div className="mb-8 flex flex-col gap-2 text-center sm:text-left">
        <div className="mb-2 flex justify-center sm:justify-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <KeyRound size={22} className="text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-dark">Vente par licence (One shot)</h3>
        <p className="text-sm text-muted">
          Solution BluePay destinée aux cabinets comptables - ressources gérées par le cabinet.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/60 p-5 sm:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            <Building2 size={14} className="text-primary" />
            Licence one-shot
          </div>
          <div className="text-3xl font-bold text-dark">
            {CABINET_LICENCE.oneShotPrice.toLocaleString("fr-MA")} DH
            <span className="text-base font-normal text-muted"> HT</span>
          </div>
          <p className="mt-1 text-sm text-muted">Paiement unique</p>
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-5 sm:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            <Users size={14} className="text-primary" />
            Licence annuelle par rôle
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CABINET_LICENCE.roles.map((role) => (
              <li
                key={role.id}
                className="flex items-baseline justify-between gap-3 rounded-lg border border-border/70 bg-white px-4 py-3"
              >
                <span className="text-sm font-medium text-dark">{role.label}</span>
                <span className="text-sm font-bold text-dark whitespace-nowrap">
                  {role.price.toLocaleString("fr-MA")} DH
                  <span className="font-normal text-muted"> HT / an</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mb-8 flex flex-col gap-2.5">
        {CABINET_LICENCE.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check size={16} className="mt-0.5 shrink-0 text-success" strokeWidth={2.5} />
            <span className="text-sm text-dark">{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant="primary" size="md" className="w-full" onClick={onCta}>
        Demander un devis
      </Button>
    </div>
  );
}
