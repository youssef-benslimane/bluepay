"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Calendar, ChevronDown, Sparkles, Zap, Users, Play, CheckCircle
} from "lucide-react";
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

const HIGHLIGHTS = [
  "Bulletins de paie PDF automatiques",
  "Déclarations CNSS, AMO, IR conformes 2026",
  "Multi-sociétés, multi-utilisateurs",
];

// ─── Remplace par l'URL de ta vidéo de démo ──────────────────────────────────
const DEMO_VIDEO_URL = "";

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

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

      <Container className="relative z-10 py-24 lg:py-32">

        {/* ── Layout 2 colonnes ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* ── Colonne gauche : texte ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6 text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Solution de paie marocaine — 2026
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-bold leading-tight tracking-tight text-dark lg:text-5xl xl:text-6xl"
            >
              La paie marocaine,{" "}
              <span className="gradient-text">simplifiée</span>{" "}
              et automatisée
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-muted leading-relaxed max-w-lg"
            >
              BluePay calcule bulletins, CNSS, AMO et IR en quelques secondes.
              Fini les erreurs manuelles, gagnez en sérénité chaque fin de mois.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-col gap-2"
            >
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-dark">
                  <CheckCircle size={15} className="shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto"
                onClick={() => setModalOpen(true)}
              >
                <Calendar size={18} />
                Réserver votre démo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Colonne droite : vidéo démo ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="relative"
          >
            {/* Carte vidéo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">

              {/* Barre de fausse navigation */}
              <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <div className="ml-4 flex-1 rounded-md bg-gray-700/60 h-5 max-w-[200px]" />
              </div>

              {/* Zone vidéo */}
              <div className="relative aspect-video bg-gradient-to-br from-[#0f1c3f] to-[#1a4a8a]">
                {DEMO_VIDEO_URL && videoPlaying ? (
                  <video
                    src={DEMO_VIDEO_URL}
                    autoPlay
                    controls
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    {/* Faux contenu d'interface */}
                    <div className="absolute inset-0 p-6 flex flex-col gap-4 opacity-40">
                      <div className="h-3 w-32 rounded bg-white/30" />
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-16 rounded-xl bg-white/10 border border-white/10" />
                        ))}
                      </div>
                      <div className="h-2 w-full rounded bg-white/20" />
                      <div className="h-2 w-3/4 rounded bg-white/15" />
                    </div>

                    {/* Bouton Play */}
                    <button
                      onClick={() => DEMO_VIDEO_URL && setVideoPlaying(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 group"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 transition-all group-hover:scale-110 group-hover:bg-white/25">
                        <Play size={26} className="text-white fill-white ml-1" />
                      </div>
                      <span className="text-white/70 text-sm font-medium">
                        {DEMO_VIDEO_URL ? "Voir la démo" : "Démo vidéo disponible prochainement"}
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5 flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                <CheckCircle size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-dark">100 % conforme</p>
                <p className="text-xs text-muted">CNSS · AMO · IR 2026</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scrolling feature cards (pleine largeur) ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
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

      </Container>

      <DemoBookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-muted/40" />
        </motion.div>
      </motion.div>

    </section>
  );
}
