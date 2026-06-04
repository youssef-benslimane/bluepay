"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import type { SolutionItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  solution: SolutionItem;
  reverse?: boolean;
  diagram: React.ReactNode;
}

export function SolutionCard({
  solution,
  reverse = false,
  diagram,
}: SolutionCardProps) {
  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[direction:rtl]"
      )}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 [direction:ltr]"
      >
        <div className="flex flex-col gap-3">
          {solution.highlighted && (
            <Badge variant="primary" className="w-fit">
              <Star size={12} />
              Recommandé
            </Badge>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-dark lg:text-3xl">
            {solution.title}
          </h2>
          <p className="text-lg font-medium text-primary">{solution.tagline}</p>
          <p className="leading-relaxed text-muted">{solution.description}</p>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {solution.advantages.map((adv) => (
            <li key={adv} className="flex items-start gap-2">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-primary"
              />
              <span className="text-sm text-dark">{adv}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Diagram */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="[direction:ltr]"
      >
        {diagram}
      </motion.div>
    </div>
  );
}
