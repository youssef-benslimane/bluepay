"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoBookingModal } from "./DemoBookingModal";



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

      {/* ── Layout pleine largeur ─────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 items-center">

          {/* ── Colonne gauche : texte — paddé depuis le bord ─────────── */}
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

          {/* ── Colonne droite : vidéo — flush contre le bord droit ───── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="hidden lg:flex h-full items-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16"
          >
            {/* Carte vidéo */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">

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
          </motion.div>

        </div>
      </div>

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
