"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoBookingModal } from "./DemoBookingModal";

const SLIDE_INTERVAL_MS = 5000;

const DEMO_SLIDES = [
  {
    src: "/images/demo-slides/01-documents-v2.png",
    alt: "Validation des demandes de documents — BluePay",
  },
  {
    src: "/images/demo-slides/02-salaries.png",
    alt: "Gestion des salariés — BluePay",
  },
  {
    src: "/images/demo-slides/03-calcul-paie.png",
    alt: "Calcul de la paie — BluePay",
  },
  {
    src: "/images/demo-slides/04-conges.png",
    alt: "Demandes de congés — BluePay",
  },
  {
    src: "/images/demo-slides/05-utilisateurs.png",
    alt: "Gestion des utilisateurs — BluePay",
  },
  {
    src: "/images/demo-slides/06-absences.png",
    alt: "Types d'absence — BluePay",
  },
] as const;

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoPlayKey, setAutoPlayKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % DEMO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoPlayKey]);

  const goTo = (index: number) => {
    setSlideIndex(index);
    setAutoPlayKey((k) => k + 1);
  };

  const goPrev = () =>
    goTo((slideIndex - 1 + DEMO_SLIDES.length) % DEMO_SLIDES.length);

  const goNext = () => goTo((slideIndex + 1) % DEMO_SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-white">

      {/* ── Background décoratif ─────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/60" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a6bcc 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[100px]" />
      <div className="absolute top-1/3 right-0 h-[350px] w-[350px] rounded-full bg-sky-300/10 blur-[90px]" />

      {/* ── Layout pleine largeur ─────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-4 lg:min-h-screen">

          {/* ── Colonne gauche : texte - paddé depuis le bord ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-8 px-8 py-24 sm:px-12 lg:px-16 xl:px-24 text-left"
          >
            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-bold leading-[1.15] tracking-tight text-dark lg:text-5xl"
            >
              La paie marocaine,{" "}
              <span className="gradient-text">simplifiée</span>{" "}
              et automatisée
            </motion.h1>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="group"
                onClick={() => setModalOpen(true)}
              >
                <Calendar size={18} />
                Réserver votre démo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Colonne droite : carrousel plein cadre ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="hidden lg:flex h-full min-h-screen items-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-16"
          >
            <div className="relative flex h-[calc(100svh-11rem)] w-full flex-col">
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={DEMO_SLIDES[slideIndex].src}
                      alt={DEMO_SLIDES[slideIndex].alt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-contain"
                      priority={slideIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Flèches de navigation */}
                <button
                  type="button"
                  aria-label="Image précédente"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-dark shadow-lg ring-1 ring-black/5 transition hover:bg-primary hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Image suivante"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-dark shadow-lg ring-1 ring-black/5 transition hover:bg-primary hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Indicateurs */}
              <div className="mt-4 flex shrink-0 justify-center gap-2">
                {DEMO_SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Afficher l'écran ${i + 1}`}
                    aria-current={i === slideIndex}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === slideIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <DemoBookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Scroll indicator — ancré en bas du premier viewport */}
      <motion.a
        href="#contenu"
        aria-label="Voir le contenu ci-dessous"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 text-primary/70 hover:text-primary transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={40} strokeWidth={2.5} />
        </motion.div>
      </motion.a>

    </section>
  );
}
