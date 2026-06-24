"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  BadgeCheck,
  Lock,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ADVANTAGES } from "@/data/features";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Clock,
  CheckCircle2,
  BadgeCheck,
  Lock,
  Sparkles,
  Smartphone,
};

const PROBLEMS_SOLVED = [
  "Calculs manuels sujets aux erreurs",
  "Mise à jour fastidieuse des barèmes légaux",
  "Génération laborieuse des déclarations sociales",
  "Absence de traçabilité et d'historique",
  "Outils inadaptés à la réglementation marocaine",
];

export function AProposContent() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero — Qu'est-ce que BluePay ? */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-blue-50/30 py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                badge="Notre mission"
                title="Qu'est-ce que BluePay ?"
                subtitle="BluePay est un logiciel de gestion de la paie destiné aux petites et moyennes entreprises marocaines, avec une nouvelle vision des systèmes d'information RH."
                align="left"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl bg-white p-8 shadow-sm border border-border/50"
            >
              <h3 className="mb-4 text-base font-semibold text-dark">
                Les problèmes que nous résolvons
              </h3>
              <ul className="flex flex-col gap-3">
                {PROBLEMS_SOLVED.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-sm text-muted">{problem}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Avantages — grille uniforme 6 tuiles */}
      <section className="py-20 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex justify-center"
          >
            <SectionTitle
              badge="Avantages"
              title="Pourquoi choisir BluePay ?"
              subtitle="Une solution pensée pour les gestionnaires RH marocains, alliant performance, conformité et simplicité."
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((adv, i) => {
              const Icon = iconMap[adv.icon];
              return (
                <motion.div
                  key={adv.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-8 [box-shadow:var(--shadow-card)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    {Icon && <Icon size={22} className="text-primary" />}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-dark">{adv.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {adv.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
