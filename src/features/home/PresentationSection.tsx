"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const PROBLEMS_SOLVED = [
  "Calculs manuels sujets aux erreurs",
  "Mise à jour fastidieuse des barèmes légaux",
  "Génération laborieuse des déclarations sociales",
  "Absence de traçabilité et d'historique",
  "Outils inadaptés à la réglementation marocaine",
];

export function PresentationSection() {
  return (
    <section id="presentation" className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <SectionTitle
              badge="Notre mission"
              title="Qu'est-ce que BluePay ?"
              subtitle="BluePay est un logiciel de gestion de la paie destiné aux petites et moyennes entreprises marocaines, avec une nouvelle vision des systèmes d'information RH."
              align="left"
            />

            <div>
              <h3 className="mb-3 text-base font-semibold text-dark">
                Les problèmes que nous résolvons
              </h3>
              <ul className="flex flex-col gap-2">
                {PROBLEMS_SOLVED.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-muted">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "100%", label: "Conforme CNSS/AMO/IR" },
                { value: "PME", label: "Adaptées Maroc" },
                { value: "24h", label: "Mise en service" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-surface p-4 text-center"
                >
                  <div className="text-xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
