"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

interface SimulatorTabsClientProps {
  SimulatorBrutNet: ComponentType;
  SimulatorNetBrut: ComponentType;
}

export function SimulatorTabsClient({
  SimulatorBrutNet,
  SimulatorNetBrut,
}: SimulatorTabsClientProps) {
  const [activeTab, setActiveTab] = useState<"brut-net" | "net-brut">(
    "brut-net"
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border border-border bg-surface p-1">
          {(
            [
              { id: "brut-net", label: "Brut → Net" },
              { id: "net-brut", label: "Net → Brut (estimation)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors duration-200",
                activeTab === tab.id
                  ? "text-white"
                  : "text-muted hover:text-dark"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "brut-net" ? <SimulatorBrutNet /> : <SimulatorNetBrut />}
      </motion.div>
    </div>
  );
}
