"use client";

import {
  UserPlus, Users, Calculator, ClipboardList, BadgeCheck,
  Shield, BarChart2, Database, Lock, Gauge,
  Sparkles, Clock, Smartphone, Building2, Zap,
} from "lucide-react";

// ── Carte 1 : Gestion RH complète ────────────────────────────────────────────

const RH_STEPS = [
  { icon: UserPlus,      label: "Embauche",              desc: "Création du dossier salarié, contrat et intégration.",        color: "bg-blue-50 text-blue-600"     },
  { icon: Users,         label: "Gestion des salariés",  desc: "Suivi des absences, congés, avancements et carrière.",        color: "bg-violet-50 text-violet-600" },
  { icon: Calculator,    label: "Calcul de la paie",      desc: "Calcul automatique CNSS, AMO, CIMR et IR chaque mois.",       color: "bg-sky-50 text-sky-600"       },
  { icon: ClipboardList, label: "Déclarations sociales",  desc: "Génération et envoi des déclarations aux organismes.",       color: "bg-indigo-50 text-indigo-600" },
  { icon: BadgeCheck,    label: "Conformité légale",      desc: "Respect du Code du travail et de la législation marocaine.", color: "bg-green-50 text-green-600"   },
];

function GestionRHCard() {
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-white p-8"
      style={{ boxShadow: "0 20px 60px -10px rgba(0,0,0,0.12), 0 8px 24px -6px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-dark">Gestion RH complète</h3>
        <p className="text-sm text-muted">De l'embauche jusqu'aux déclarations sociales</p>
      </div>

      {/* Flow vertical */}
      <div className="flex flex-col gap-0">
        {RH_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${step.color}`}>
                  <Icon size={18} />
                </div>
                {i < RH_STEPS.length - 1 && (
                  <div className="h-8 w-0.5 bg-border" />
                )}
              </div>
              <div className="pb-2">
                <p className="text-sm font-semibold text-dark">{step.label}</p>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge bas */}
      <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5">
        <BadgeCheck size={15} className="shrink-0 text-green-600" />
        <span className="text-xs font-medium text-green-700">
          Conforme CNSS, AMO, CIMR & IR — Code du travail marocain
        </span>
      </div>
    </div>
  );
}

// ── Carte 2 : ERP vs PME ─────────────────────────────────────────────────────

const ERP_ITEMS = [
  { icon: Shield,   label: "Fiabilité"             },
  { icon: Gauge,    label: "Processus structurés"  },
  { icon: Database, label: "Données centralisées"  },
  { icon: Lock,     label: "Sécurité renforcée"    },
  { icon: BarChart2,label: "Pilotage avancé"        },
];

const PME_ITEMS = [
  { icon: Sparkles,  label: "Interface intuitive"     },
  { icon: Clock,     label: "Prise en main rapide"    },
  { icon: Smartphone,label: "Accessible partout"      },
  { icon: Building2, label: "Adapté aux PME"          },
  { icon: Zap,       label: "Souple et évolutif"      },
];

function ErpPmeCard() {
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-white p-8"
      style={{ boxShadow: "0 20px 60px -10px rgba(0,0,0,0.12), 0 8px 24px -6px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-dark">Inspiré des meilleurs systèmes</h3>
        <p className="text-sm text-muted">La rigueur des ERP, l'accessibilité d'une solution PME</p>
      </div>

      {/* Deux colonnes */}
      <div className="grid flex-1 grid-cols-2 gap-5">
        {/* ERP */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-blue-600 px-3 py-2 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-white">Rigueur ERP</span>
          </div>
          {ERP_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={17} className="shrink-0 text-blue-600" />
              <span className="text-sm font-medium text-dark">{label}</span>
            </div>
          ))}
        </div>

        {/* PME */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-green-600 px-3 py-2 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-white">Accessibilité PME</span>
          </div>
          {PME_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={17} className="shrink-0 text-green-600" />
              <span className="text-sm font-medium text-dark">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div className="rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 text-center">
        <span className="text-sm font-semibold text-primary">
          Une solution complète, conçue pour votre croissance
        </span>
      </div>
    </div>
  );
}

// ── Section principale ────────────────────────────────────────────────────────

export function ScrollingInfographics() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-5xl items-stretch gap-8 px-4 lg:px-8">
        <div className="flex-1">
          <GestionRHCard />
        </div>
        <div className="flex-1">
          <ErpPmeCard />
        </div>
      </div>
    </section>
  );
}
