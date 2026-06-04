"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Calculator,
  Shield,
  HeartPulse,
  Receipt,
  CalendarX,
  FileText,
  ClipboardList,
  BarChart3,
  History,
  Settings2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FEATURES } from "@/data/features";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Users,
  Calculator,
  Shield,
  HeartPulse,
  Receipt,
  CalendarX,
  FileText,
  ClipboardList,
  BarChart3,
  History,
  Settings2,
};

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="section-alt py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-center"
        >
          <SectionTitle
            badge="Fonctionnalités"
            title="Tout ce dont vous avez besoin"
            subtitle="Un moteur de paie complet intégrant toutes les spécificités de la réglementation marocaine."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:[box-shadow:var(--shadow-card-hover)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-primary transition-colors group-hover:text-white"
                    />
                  )}
                </div>
                <h3 className="font-semibold text-dark">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
