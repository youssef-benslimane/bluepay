"use client";

import { motion } from "framer-motion";
import { Cloud, Monitor, Smartphone, Tablet, Server, Lock, Globe, ShieldCheck } from "lucide-react";

export function SaasDiagram() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface to-primary/5 p-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-5">

        {/* Appareils utilisateur */}
        <div className="flex w-full items-end justify-center gap-6">
          {[
            { icon: Monitor,    label: "Ordinateur" },
            { icon: Tablet,     label: "Tablette"   },
            { icon: Smartphone, label: "Mobile"     },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-border shadow-sm">
                <Icon size={18} className="text-dark/70" />
              </div>
              <span className="text-xs text-muted">{label}</span>
            </div>
          ))}
        </div>

        {/* Connexion internet */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="h-5 w-0.5 bg-gradient-to-b from-primary/40 to-primary" />
            <Globe size={14} className="text-primary" />
            <div className="h-5 w-0.5 bg-gradient-to-b from-primary to-primary/40" />
          </motion.div>
          <div className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-green-500" />
            <span className="text-xs text-muted">HTTPS chiffré</span>
          </div>
        </div>

        {/* Cloud BluePay */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-md">
            <Cloud size={28} className="text-primary" />
          </div>
          <span className="text-sm font-semibold text-dark">Cloud BluePay</span>
          <div className="flex flex-wrap justify-center gap-1">
            {["Application", "Données", "Mises à jour"].map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted italic">
          Aucune installation requise — accès immédiat depuis n&apos;importe quel navigateur
        </p>
      </div>
    </div>
  );
}

export function OnPremiseDiagram() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface to-dark/5 p-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-5">

        {/* Appareils utilisateur */}
        <div className="flex w-full items-end justify-center gap-6">
          {[
            { icon: Monitor,    label: "Ordinateur" },
            { icon: Tablet,     label: "Tablette"   },
            { icon: Smartphone, label: "Mobile"     },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-border shadow-sm">
                <Icon size={18} className="text-dark/70" />
              </div>
              <span className="text-xs text-muted">{label}</span>
            </div>
          ))}
        </div>

        {/* Réseau interne */}
        <div className="flex flex-col items-center gap-1">
          <div className="h-5 w-0.5 bg-dark/20" />
          <div className="rounded-full border border-dark/20 bg-dark/5 px-3 py-1 text-xs text-muted">
            Réseau interne sécurisé
          </div>
          <div className="h-5 w-0.5 bg-dark/20" />
        </div>

        {/* Serveur client */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-dark/10 shadow-md">
            <Server size={28} className="text-dark" />
          </div>
          <span className="text-sm font-semibold text-dark">Serveur de l&apos;entreprise</span>
          <div className="flex flex-wrap justify-center gap-1">
            {["Application", "Données", "Contrôle total"].map((tag) => (
              <span key={tag} className="rounded-full bg-dark/8 border border-dark/10 px-2 py-0.5 text-xs text-dark/70">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Lock size={11} className="text-green-500" />
            <span className="text-xs text-green-600">Données hébergées sur votre infrastructure</span>
          </div>
        </div>

        <p className="text-center text-xs text-muted italic">
          Installation sur vos serveurs — vos données ne quittent jamais votre infrastructure
        </p>
      </div>
    </div>
  );
}
