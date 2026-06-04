"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { SimulatorResult } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface SimulatorResultsProps {
  result: SimulatorResult;
}

export function SimulatorResults({ result }: SimulatorResultsProps) {
  const deductions = [
    {
      label: "Cotisation CNSS",
      amount: result.cnss,
      sublabel: "4.48% plafonné",
      color: "text-warning",
    },
    {
      label: "Cotisation AMO",
      amount: result.amo,
      sublabel: "2.26% plafonné",
      color: "text-secondary",
    },
    {
      label: "Impôt sur le Revenu (IR)",
      amount: result.ir,
      sublabel: `Taux effectif ${formatNumber(result.tauxEffectifIR)}%`,
      color: "text-error",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      {/* Salaire brut */}
      <div className="flex items-center justify-between rounded-xl bg-dark/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <span className="font-semibold text-dark">Salaire brut</span>
        </div>
        <span className="text-lg font-bold text-dark">
          {formatCurrency(result.salaireBrut)}
        </span>
      </div>

      {/* Déductions */}
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-white p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
          Retenues et cotisations
        </p>
        {deductions.map((d) => (
          <div
            key={d.label}
            className="flex items-center justify-between border-b border-border/50 py-2 last:border-0"
          >
            <div className="flex items-center gap-2">
              <Minus size={14} className={d.color} />
              <div>
                <span className="text-sm font-medium text-dark">{d.label}</span>
                <span className="ml-2 text-xs text-muted">({d.sublabel})</span>
              </div>
            </div>
            <span className={`text-sm font-semibold ${d.color}`}>
              - {formatCurrency(d.amount)}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-muted">
            Total retenues
          </span>
          <span className="font-bold text-error">
            - {formatCurrency(result.totalCotisations)}
          </span>
        </div>
      </div>

      {/* Salaire net */}
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingDown size={18} className="text-white" />
          <span className="font-bold text-white">Salaire net à payer</span>
        </div>
        <span className="text-2xl font-bold text-white">
          {formatCurrency(result.salaireNet)}
        </span>
      </div>

      <p className="text-center text-xs text-muted italic">
        ⚠️ Résultats indicatifs — simulation basée sur les taux en vigueur 2024.
        Consultez un expert comptable pour des calculs définitifs.
      </p>
    </motion.div>
  );
}
