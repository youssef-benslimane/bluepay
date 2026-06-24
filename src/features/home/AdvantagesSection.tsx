"use client";

import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
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

export function AdvantagesSection() {
  return (
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
  );
}
