"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="gradient-hero relative min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/3 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 flex min-h-screen flex-col items-center justify-center py-32 lg:py-40">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start gap-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Solution SaaS marocaine
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl"
            >
              La paie marocaine,{" "}
              <span className="gradient-text">simplifiée</span> et automatisée
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg leading-relaxed text-white/75 lg:text-xl"
            >
              BluePay est la solution de gestion de la paie conçue
              spécifiquement pour les entreprises marocaines. Automatisez vos
              bulletins, CNSS, AMO et IR en toute conformité réglementaire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/contact?demo=true">
                <Button variant="white" size="lg" className="group w-full sm:w-auto">
                  <Calendar size={18} />
                  Demander une démo
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                >
                  Nous contacter
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              {[
                { label: "CNSS / AMO", sublabel: "Conforme" },
                { label: "IR Maroc", sublabel: "Barème 2024" },
                { label: "Multi-sociétés", sublabel: "Supporté" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {item.label}
                    </div>
                    <div className="text-xs text-white/50">{item.sublabel}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex lg:items-center lg:justify-center"
          >
            <DashboardIllustration />
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
            <ChevronDown size={24} className="text-white/40" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function DashboardIllustration() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Main card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Tableau de bord paie</h3>
          <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
            Période ouverte
          </span>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: "Salariés", value: "42" },
            { label: "Bulletins", value: "42" },
            { label: "Masse salariale", value: "485k" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 p-3 text-center">
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-xs text-white/50">
            <span>Répartition cotisations</span>
            <span>Mai 2024</span>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {[60, 45, 30, 70, 50, 80, 40, 65, 55, 75, 35, 60].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background:
                      i % 3 === 0
                        ? "rgba(0,153,230,0.7)"
                        : i % 3 === 1
                          ? "rgba(0,102,204,0.5)"
                          : "rgba(255,255,255,0.15)",
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap gap-2">
          {["CNSS ✓", "AMO ✓", "IR ✓", "CIMR ✓"].map((b) => (
            <span
              key={b}
              className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-secondary"
            >
              {b}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Floating notification card */}
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -right-6 rounded-xl border border-white/10 bg-dark/80 p-3 shadow-xl backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20">
            <span className="text-sm text-success">✓</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Paie validée</div>
            <div className="text-xs text-white/50">42 bulletins générés</div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat card */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-6 -top-6 rounded-xl border border-white/10 bg-primary/20 p-3 shadow-xl backdrop-blur-sm"
      >
        <div className="text-xs text-white/70">Temps économisé</div>
        <div className="text-lg font-bold text-white">-80%</div>
      </motion.div>
    </div>
  );
}
