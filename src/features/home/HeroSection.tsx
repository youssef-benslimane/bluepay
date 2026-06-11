"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center py-32 lg:py-40">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-bold leading-tight tracking-tight text-dark lg:text-5xl xl:text-6xl"
            >
              La paie marocaine,{" "}
              <span className="gradient-text">simplifiée</span> et automatisée
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg leading-relaxed text-muted lg:text-xl"
            >
              BluePay est la solution de gestion de la paie conçue spécifiquement
              pour les entreprises marocaines. Automatisez vos bulletins, CNSS,
              AMO et IR en toute conformité réglementaire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row justify-center"
            >
              <Link href="/contact">
                <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                  <Calendar size={18} />
                  Demander une démo
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-muted/40" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
