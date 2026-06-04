"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = "Prêt à automatiser votre gestion de paie ?",
  subtitle =
    "Rejoignez les entreprises marocaines qui font confiance à BluePay pour une paie fiable, conforme et automatisée.",
  primaryLabel = "Demander une démo gratuite",
  primaryHref = "/contact?demo=true",
  secondaryLabel = "Nous contacter",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="gradient-cta py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href={primaryHref}>
              <Button variant="white" size="lg" className="group">
                <Calendar size={18} />
                {primaryLabel}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
            <Link href={secondaryHref}>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                {secondaryLabel}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
