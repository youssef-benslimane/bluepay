"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { COMPARISON_CRITERIA } from "@/data/solutions";

function Indicator({ positive }: { positive: boolean | null }) {
  if (positive === null)
    return <Minus size={16} className="text-muted" />;
  if (positive)
    return (
      <Check
        size={16}
        className="text-success"
        strokeWidth={3}
      />
    );
  return <X size={16} className="text-error" strokeWidth={3} />;
}

export function ComparisonTable() {
  return (
    <section className="section-alt py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <SectionTitle
            badge="Comparaison"
            title="SaaS ou On-Premise ?"
            subtitle="Comparez les deux modes de déploiement selon vos priorités pour choisir la solution adaptée."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-border bg-white [box-shadow:var(--shadow-lg)]"
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border bg-surface">
            <div className="p-5 text-sm font-semibold text-muted">Critère</div>
            <div className="border-l border-border p-5">
              <div className="text-center">
                <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  SaaS Cloud
                </span>
              </div>
            </div>
            <div className="border-l border-border p-5">
              <div className="text-center">
                <span className="inline-block rounded-lg bg-dark/10 px-3 py-1 text-sm font-bold text-dark">
                  On-Premise
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {COMPARISON_CRITERIA.map((criteria, i) => (
            <div
              key={criteria.label}
              className={`grid grid-cols-3 border-b border-border/50 last:border-0 transition-colors hover:bg-surface/50 ${
                i % 2 === 0 ? "bg-white" : "bg-surface/30"
              }`}
            >
              <div className="flex items-center p-5">
                <span className="text-sm font-medium text-dark">
                  {criteria.label}
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-border/50 p-5">
                <Indicator positive={criteria.saasPositive} />
                <span className="text-sm text-muted">{criteria.saas}</span>
              </div>
              <div className="flex items-center gap-2 border-l border-border/50 p-5">
                <Indicator positive={criteria.onpremisePositive} />
                <span className="text-sm text-muted">{criteria.onpremise}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
