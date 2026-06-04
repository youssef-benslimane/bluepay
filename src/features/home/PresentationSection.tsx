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

const VALUE_PROPS = [
  {
    title: "Inspiré des meilleurs systèmes",
    description:
      "BluePay s'inspire de la logique de paie et de la structuration des données des systèmes avancés comme SAP, tout en restant accessible.",
  },
  {
    title: "Interface intuitive",
    description:
      "Conçu pour les gestionnaires RH, sans compétences techniques requises. Interface fluide, accessible sur tablette et mobile.",
  },
  {
    title: "Gestion RH complète",
    description:
      "De l'embauche des salariés jusqu'aux déclarations sociales et fiscales, BluePay couvre tout le cycle de vie RH.",
  },
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

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="flex gap-4 rounded-xl border border-border bg-white p-5 [box-shadow:var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-dark">{prop.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {prop.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
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
