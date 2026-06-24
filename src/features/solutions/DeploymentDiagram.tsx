"use client";

import { motion } from "framer-motion";
import { Cloud, Monitor, Server, Wifi, Lock } from "lucide-react";

export function SaasDiagram() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface to-primary/5 p-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Cloud */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-md">
            <Cloud size={28} className="text-primary" />
          </div>
          <span className="text-xs font-semibold text-dark">Cloud BluePay</span>
          <div className="flex gap-1">
            {["CNSS", "AMO", "IR"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="h-6 w-0.5 bg-gradient-to-b from-primary to-secondary" />
            <Wifi size={16} className="text-secondary" />
            <div className="h-6 w-0.5 bg-gradient-to-b from-secondary to-primary" />
          </motion.div>
          <span className="text-xs text-muted">HTTPS sécurisé</span>
        </div>

        {/* Devices */}
        <div className="flex gap-4">
          {[
            { label: "Configurateur", sublabel: "Paramétrage" },
            { label: "Responsable RH", sublabel: "Navigateur" },
            { label: "Direction", sublabel: "Mobile/Tablette" },
          ].map((device) => (
            <div key={device.label} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark/5 shadow-sm">
                <Monitor size={20} className="text-dark" />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-dark">
                  {device.label}
                </div>
                <div className="text-xs text-muted">{device.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted italic">
          Accessible depuis n&apos;importe où, aucun logiciel à installer
        </div>
      </div>
    </div>
  );
}

export function OnPremiseDiagram() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface to-dark/5 p-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Server */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-dark/10 shadow-md">
            <Server size={28} className="text-dark" />
          </div>
          <span className="text-xs font-semibold text-dark">Serveur Client</span>
          <div className="flex items-center gap-1">
            <Lock size={11} className="text-success" />
            <span className="text-xs text-success">Données internes</span>
          </div>
        </div>

        {/* LAN */}
        <div className="flex flex-col items-center gap-1">
          <div className="h-6 w-0.5 bg-dark/20" />
          <div className="rounded-full border border-dark/20 bg-dark/5 px-3 py-1 text-xs text-muted">
            Réseau local (LAN)
          </div>
          <div className="h-6 w-0.5 bg-dark/20" />
        </div>

        {/* Workstations */}
        <div className="flex gap-4">
          {["RH", "Compta", "Direction"].map((dept) => (
            <div key={dept} className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark/5 shadow-sm">
                <Monitor size={16} className="text-dark" />
              </div>
              <span className="text-xs text-muted">{dept}</span>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted italic">
          Contrôle total de vos données — installation sur vos serveurs
        </div>
      </div>
    </div>
  );
}
