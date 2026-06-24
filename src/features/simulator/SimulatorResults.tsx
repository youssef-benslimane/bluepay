"use client";

import { motion } from "framer-motion";
import type { PayrollResult } from "./SimulatorEngine";
import { formatCurrency } from "@/lib/utils";

interface SimulatorResultsProps {
  result: PayrollResult;
  isNetToBrut?: boolean;
}

function fmt(n: number) {
  return formatCurrency(n);
}

function TableRow({
  label,
  value,
  bold,
  negative,
  highlight,
  indent,
  muted,
}: {
  label: string;
  value: number | string;
  bold?: boolean;
  negative?: boolean;
  highlight?: boolean;
  indent?: boolean;
  muted?: boolean;
}) {
  const displayValue =
    typeof value === "number"
      ? `${negative && value > 0 ? "– " : ""}${fmt(Math.abs(typeof value === "number" ? value : 0))}`
      : value;

  return (
    <tr
      className={
        highlight
          ? "bg-primary/5 font-bold"
          : muted
          ? "opacity-60"
          : ""
      }
    >
      <td
        className={`py-2 pr-4 text-sm ${bold ? "font-semibold" : ""} ${indent ? "pl-4" : ""} ${
          muted ? "text-muted" : "text-dark"
        }`}
      >
        {label}
      </td>
      <td
        className={`py-2 text-right text-sm whitespace-nowrap ${
          negative && typeof value === "number" && value > 0
            ? "text-error font-semibold"
            : bold || highlight
            ? "font-bold text-dark"
            : "text-dark"
        }`}
      >
        {displayValue}
      </td>
    </tr>
  );
}

export function SimulatorResults({ result, isNetToBrut = false }: SimulatorResultsProps) {
  const tauxEffectifIR =
    result.salaireBrut > 0
      ? ((result.igr / result.salaireBrut) * 100).toFixed(2)
      : "0.00";

  return (
    <motion.div
      key={result.netPayer}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      {/* ── 3 cartes de synthèse ────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-white p-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
            Salaire Brut
          </p>
          <p className="text-base font-bold text-primary">
            {fmt(result.salaireBrut)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
            Net à Payer
          </p>
          <p className="text-base font-bold text-[#16a34a]">
            {fmt(result.netPayer)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
            Coût Employeur
          </p>
          <p className="text-base font-bold text-[#ea580c]">
            {fmt(result.totalDesCouts)}
          </p>
        </div>
      </div>

      {/* ── Détail du bulletin ──────────────────────────────── */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="bg-surface px-4 py-2 border-b border-border">
          <p className="text-xs font-semibold text-muted flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Détail du bulletin
          </p>
        </div>

        <div className="px-4 py-2 overflow-x-auto">
          <table className="w-full">
            <tbody>
              {/* Base */}
              <TableRow label="Salaire de base" value={result.salaireBase} />
              {result.totalPrimes > 0 && (
                <TableRow label="+ Primes" value={result.totalPrimes} indent />
              )}
              {result.totalAvantages > 0 && (
                <TableRow label="+ Avantages en nature" value={result.totalAvantages} indent />
              )}
              {result.retenuesBrute > 0 && (
                <TableRow label="– Retenues brutes" value={result.retenuesBrute} negative indent />
              )}
              <TableRow label="Salaire brut" value={result.salaireBrut} bold />

              {/* Cotisations sociales */}
              <tr><td colSpan={2} className="pt-3 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Cotisations sociales
                </p>
              </td></tr>

              {/* En-tête du tableau cotisations */}
              {result.cotisationsDetails.length > 0 && (
                <tr className="border-b border-border/50">
                  {["Code","Libellé","Base","Taux Sal.","Mt Sal.","Taux Pat.","Mt Pat."].map((h) => (
                    <td key={h} className="pb-1 pr-3 text-[10px] font-semibold uppercase text-muted last:text-right">
                      {h}
                    </td>
                  ))}
                </tr>
              )}

              {result.cotisationsDetails.map((d) => (
                <tr key={d.code} className="border-b border-border/30 last:border-0">
                  <td className="py-1.5 pr-3 text-xs font-semibold text-primary">{d.code}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark">{d.libelle}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark whitespace-nowrap">{fmt(d.base)}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark">{d.tauxSalarial}%</td>
                  <td className="py-1.5 pr-3 text-xs font-medium text-error whitespace-nowrap">{fmt(d.montantSalarial)}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark">{d.tauxPatronal}%</td>
                  <td className="py-1.5 text-xs text-muted text-right whitespace-nowrap">{fmt(d.montantPatronal)}</td>
                </tr>
              ))}

              <TableRow
                label="Total Cotisations Salariales"
                value={result.totalCotisationsSalariales}
                bold
                negative
              />

              {/* Frais pro + IR */}
              {result.fraisProfessionnels > 0 && (
                <TableRow
                  label="Frais professionnels (déduction)"
                  value={result.fraisProfessionnels}
                  negative
                  muted
                />
              )}
              <TableRow label="Brut imposable" value={result.brutImposable} />
              <TableRow label="Net imposable" value={result.netImposable} muted />
              <TableRow
                label={`IGR (taux effectif ${tauxEffectifIR}%)`}
                value={result.igr}
                negative
              />

              {/* Net à payer */}
              <tr><td colSpan={2} className="py-1" /></tr>
              <TableRow
                label="Net à payer"
                value={result.netPayer}
                bold
                highlight
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Charges patronales ──────────────────────────────── */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="bg-surface px-4 py-2 border-b border-border">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Charges Patronales
          </p>
        </div>

        <div className="px-4 py-2 overflow-x-auto">
          <table className="w-full">
            <tbody>
              {result.cotisationsDetails.length > 0 && (
                <tr className="border-b border-border/50">
                  {["Code","Libellé","Base","Taux Pat.","Montant Pat."].map((h) => (
                    <td key={h} className="pb-1 pr-3 text-[10px] font-semibold uppercase text-muted last:text-right">
                      {h}
                    </td>
                  ))}
                </tr>
              )}

              {result.cotisationsDetails.map((d) => (
                <tr key={d.code} className="border-b border-border/30 last:border-0">
                  <td className="py-1.5 pr-3 text-xs font-semibold text-primary">{d.code}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark">{d.libelle}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark whitespace-nowrap">{fmt(d.base)}</td>
                  <td className="py-1.5 pr-3 text-xs text-dark">{d.tauxPatronal}%</td>
                  <td className="py-1.5 text-xs font-medium text-[#ea580c] text-right whitespace-nowrap">{fmt(d.montantPatronal)}</td>
                </tr>
              ))}

              <tr className="border-t border-border/50">
                <td colSpan={4} className="py-2 text-sm font-semibold text-dark">
                  Total cotisations patronales
                </td>
                <td className="py-2 text-sm font-bold text-[#ea580c] text-right whitespace-nowrap">
                  {fmt(result.totalCotisationsPatronales)}
                </td>
              </tr>
              <tr className="bg-surface/60">
                <td colSpan={4} className="py-2 text-sm font-bold text-dark">
                  Coût total employeur (brut + patronales)
                </td>
                <td className="py-2 text-sm font-bold text-dark text-right whitespace-nowrap">
                  {fmt(result.totalDesCouts)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-muted italic">
        ⚠️ Résultats indicatifs — taux CNSS, AMO et barème IR en vigueur 2026. Consultez un expert-comptable pour des calculs définitifs.
      </p>
    </motion.div>
  );
}
