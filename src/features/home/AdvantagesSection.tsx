"use client";

import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  BadgeCheck,
  Lock,
  Sparkles,
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
};

export function AdvantagesSection() {
  const mainAdvantages = ADVANTAGES.filter((a) => a.metric);
  const otherAdvantages = ADVANTAGES.filter((a) => !a.metric);

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

        {/* Main metrics */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {mainAdvantages.map((adv, i) => {
            const Icon = iconMap[adv.icon];
            return (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-8 text-center [box-shadow:var(--shadow-card)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  {Icon && <Icon size={26} className="text-primary" />}
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">
                    {adv.metric}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-muted">
                    {adv.metricLabel}
                  </div>
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

        {/* Other advantages */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {otherAdvantages.map((adv, i) => {
            const Icon = iconMap[adv.icon];
            return (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4 rounded-xl border border-border bg-white p-6 [box-shadow:var(--shadow-card)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
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
