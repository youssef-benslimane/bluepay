"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SimulatorBrutNet } from "./SimulatorBrutNet";
import { SimulatorNetBrut } from "./SimulatorNetBrut";
import type { TypeContrat } from "./SimulatorEngine";

const TYPE_CONTRAT_OPTIONS = [
  { value: "CDI",      label: "Contrat à Durée Indéterminée — CDI" },
  { value: "CDD",      label: "Contrat à Durée Déterminée — CDD" },
  { value: "ANAPEC_1", label: "ANAPEC Modèle 1 (1 600 – 3 125 DH)" },
  { value: "ANAPEC_2", label: "ANAPEC Modèle 2 (1 600 – 6 000 DH)" },
  { value: "ANAPEC_3", label: "ANAPEC Modèle 3 (3 125 – 6 000 DH)" },
  { value: "TAHFIZ",   label: "Contrat TAHFIZ" },
];

export function SimulatorTabsClient() {
  const [activeTab, setActiveTab] = useState<"brut-net" | "net-brut">("brut-net");
  const [typeContrat, setTypeContrat] = useState<TypeContrat>("CDI");

  return (
    <div className="flex flex-col gap-6">

      {/* Type de Contrat — partagé entre les deux onglets */}
      <div className="mx-auto w-full max-w-sm">
        <label className="mb-1.5 block text-sm font-medium text-dark">
          Type de Contrat
        </label>
        <select
          value={typeContrat}
          onChange={(e) => setTypeContrat(e.target.value as TypeContrat)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark
            transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {TYPE_CONTRAT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Sélecteur d'onglets */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border border-border bg-surface p-1">
          {([
            { id: "brut-net", label: "Brut → Net" },
            { id: "net-brut", label: "Net → Brut" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors duration-200",
                activeTab === tab.id ? "text-white" : "text-muted hover:text-dark"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "brut-net"
          ? <SimulatorBrutNet typeContrat={typeContrat} />
          : <SimulatorNetBrut typeContrat={typeContrat} />
        }
      </motion.div>
    </div>
  );
}
