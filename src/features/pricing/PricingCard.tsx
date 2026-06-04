"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star, Users, Headphones, Server } from "lucide-react";
import type { PricingPlan } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
        plan.highlighted
          ? "border-primary bg-gradient-to-b from-primary/5 to-white [box-shadow:0_0_0_2px_var(--color-primary),var(--shadow-xl)]"
          : "border-border bg-white [box-shadow:var(--shadow-card)] hover:[box-shadow:var(--shadow-card-hover)]"
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="primary" className="shadow-sm">
            <Star size={12} />
            Populaire
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-dark">{plan.name}</h3>
        <p className="text-sm text-muted">{plan.tagline}</p>

        <div className="mt-2">
          <div className="text-3xl font-bold text-dark">{plan.priceLabel}</div>
          {plan.price && (
            <div className="text-sm text-muted">par mois</div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted">
          <Users size={14} className="text-primary" />
          {plan.maxSalaries}
        </div>
      </div>

      {/* CTA */}
      <Link href={`/contact?plan=${plan.id}`} className="mb-6">
        <Button
          variant={plan.highlighted ? "primary" : "secondary"}
          size="md"
          className="w-full"
        >
          {plan.ctaLabel}
        </Button>
      </Link>

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              size={16}
              className={cn(
                "mt-0.5 shrink-0",
                plan.highlighted ? "text-primary" : "text-success"
              )}
              strokeWidth={2.5}
            />
            <span className="text-sm text-dark">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Footer details */}
      <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Headphones size={13} className="text-primary" />
          Support : {plan.support}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <Server size={13} className="text-primary" />
          Hébergement : {plan.hosting}
        </div>
      </div>
    </motion.div>
  );
}
