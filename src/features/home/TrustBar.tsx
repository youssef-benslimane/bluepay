"use client";

import { motion } from "framer-motion";
import { Building2, Briefcase, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";

const CLIENT_TYPES = [
  {
    icon: Building2,
    label: "PME marocaines",
    description: "Toutes tailles",
  },
  {
    icon: Briefcase,
    label: "Cabinets RH & Comptables",
    description: "Multi-clients",
  },
  {
    icon: Users,
    label: "Groupes multi-entités",
    description: "Gestion centralisée",
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-white py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted">
            Conçu pour
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {CLIENT_TYPES.map((type, i) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-dark text-sm">
                      {type.label}
                    </div>
                    <div className="text-xs text-muted">{type.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
