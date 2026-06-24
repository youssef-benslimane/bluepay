"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, Sparkles, Zap, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { DemoBookingModal } from "./DemoBookingModal";

const SCROLLING_FEATURES = [
  {
    icon: Sparkles,
    title: "Interface intuitive",
    description: "Conçu pour les gestionnaires RH, sans compétences techniques requises.",
  },
  {
    icon: Zap,
    title: "Inspiré des meilleurs systèmes",
    description: "La rigueur de SAP, l'accessibilité d'une solution PME.",
  },
  {
    icon: Users,
    title: "Gestion RH complète",
    description: "De l'embauche jusqu'aux déclarations sociales et fiscales.",
  },
];

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">

      {/* ── Background décoratif ─────────────────────────────── */}
      {/* Dégradé de base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/60" />

      {/* Grille de points */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a6bcc 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Blob haut-gauche */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />

      {/* Blob bas-droite */}
      <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[100px]" />

      {/* Blob centre-droite */}
      <div className="absolute top-1/3 right-0 h-[350px] w-[350px] rounded-full bg-sky-300/10 blur-[90px]" />



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

            {/* Scrolling feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="w-full overflow-hidden"
              style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
            >
              <div className="flex gap-4 animate-marquee w-max">
                {[...SCROLLING_FEATURES, ...SCROLLING_FEATURES].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-8 [box-shadow:var(--shadow-card)] w-72 shrink-0"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <Icon size={26} className="text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-base font-semibold text-dark leading-tight">{f.title}</p>
                        <p className="mt-2 text-sm text-muted leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row justify-center"
            >
              <Button
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto"
                onClick={() => setModalOpen(true)}
              >
                <Calendar size={18} />
                Réserver votre démo
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <DemoBookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

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
