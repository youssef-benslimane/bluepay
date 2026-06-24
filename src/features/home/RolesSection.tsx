"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BarChart3,
  Calculator,
  FileText,
  ClipboardList,
  CalendarX,
  Shield,
  HeartPulse,
  Receipt,
  History,
  Settings2,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    id: "configurateur",
    label: "Configurateur",
    emoji: "⚙️",
    description: "Paramétrez l'intégralité de l'application selon les besoins de votre entreprise avant le démarrage.",
    features: [
      { icon: CalendarX, title: "Paramétrage des types d'absences", desc: "Définissez les catégories d'absences, congés et motifs applicables à chaque salarié." },
      { icon: Settings2, title: "Grilles salariales", desc: "Définissez les barèmes, catégories professionnelles, primes et indemnités propres à votre entreprise." },
      { icon: Shield, title: "Cotisations sociales", desc: "Configuration des taux CNSS, AMO et CIMR selon les conventions collectives applicables." },
      { icon: Receipt, title: "Barème IR", desc: "Paramétrage du barème IR, des abattements et des situations familiales reconnues." },
      { icon: Building2, title: "Paramétrage des unités organisationnelles", desc: "Structurez les départements, services et niveaux hiérarchiques de votre entreprise." },
      { icon: ClipboardList, title: "Modèles de documents", desc: "Personnalisation des bulletins de paie, contrats et formulaires aux couleurs de votre entreprise." },
    ],
  },
  {
    id: "rh",
    label: "Responsable RH",
    emoji: "👩‍💼",
    description: "Gérez les salariés, exécutez les paies et envoyez les documents réglementaires chaque mois.",
    features: [
      { icon: Users, title: "Gestion des salariés", desc: "Fiches complètes, contrats, historique des rémunérations et suivi de carrière." },
      { icon: Calculator, title: "Calcul de la paie", desc: "Lancement du calcul mensuel avec intégration automatique des éléments variables." },
      { icon: CalendarX, title: "Absences & congés", desc: "Saisie et validation des absences, congés et heures supplémentaires impactant la paie." },
      { icon: FileText, title: "Bulletins de paie", desc: "Génération et envoi des bulletins PDF conformes aux exigences légales marocaines." },
      { icon: ClipboardList, title: "Déclarations sociales", desc: "Production et transmission des déclarations CNSS, CIMR et SIMPL-IR." },
      { icon: History, title: "Historique & reconstitution", desc: "Consultation et reconstitution des paies passées pour tout audit ou litige." },
    ],
  },
  {
    id: "admin",
    label: "Administrateur",
    emoji: "🛡️",
    description: "Administrez l'ensemble de la plateforme, les accès et la sécurité des données.",
    features: [
      { icon: Building2, title: "Gestion multi-sociétés", desc: "Supervision et administration de toutes les entités depuis un tableau de bord centralisé." },
      { icon: Users, title: "Droits & accès", desc: "Attribution fine des permissions par rôle, entité et périmètre fonctionnel." },
      { icon: BarChart3, title: "Tableaux de bord globaux", desc: "Vision consolidée des indicateurs RH et de la masse salariale sur toutes les sociétés." },
      { icon: History, title: "Journaux d'audit", desc: "Traçabilité complète de chaque action réalisée sur la plateforme." },
      { icon: Shield, title: "Sécurité des données", desc: "Gestion des sauvegardes, chiffrement et conformité RGPD des données personnelles." },
      { icon: Settings2, title: "Configuration système", desc: "Paramètres globaux, intégrations et maintenance de l'environnement applicatif." },
    ],
  },
  {
    id: "employe",
    label: "Employé",
    emoji: "🧑‍🤝‍🧑",
    description: "Accédez à vos informations personnelles, consultez vos bulletins et gérez vos demandes.",
    features: [
      { icon: FileText, title: "Mes bulletins de paie", desc: "Consultation et téléchargement de l'ensemble de vos bulletins de paie archivés." },
      { icon: CalendarX, title: "Demandes de congés", desc: "Soumission et suivi en temps réel de vos demandes de congés et absences." },
      { icon: Receipt, title: "Mes informations RH", desc: "Accès à votre contrat, fiche de poste et historique de rémunération." },
      { icon: HeartPulse, title: "Couverture sociale", desc: "Visualisation de votre affiliation AMO, CNSS et CIMR." },
      { icon: CheckCircle2, title: "Solde de congés", desc: "Suivi en temps réel de votre solde de congés acquis, pris et restants." },
      { icon: History, title: "Historique des demandes", desc: "Suivi de toutes vos demandes passées et de leur statut de validation." },
    ],
  },
];

export function RolesSection() {
  const [activeRole, setActiveRole] = useState(ROLES[0].id);
  const current = ROLES.find((r) => r.id === activeRole)!;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-center"
        >
          <SectionTitle
            badge="Fonctionnalités par rôle"
            title="Une plateforme adaptée à chaque profil"
            subtitle="Configurateur, Responsable RH, Administrateur ou Employé — chaque profil dispose de son espace dédié dans BluePay."
          />
        </motion.div>

        {/* Onglets rôles */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
                activeRole === role.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface text-dark hover:bg-primary/10 hover:text-primary border border-border"
              )}
            >
              <span>{role.emoji}</span>
              {role.label}
            </button>
          ))}
        </div>

        {/* Description du rôle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-8 text-center text-sm text-muted">
              {current.description}
            </p>

            {/* Grille des fonctionnalités */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {current.features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex gap-4 rounded-2xl border border-border bg-white p-6 [box-shadow:var(--shadow-card)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feat.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-dark">
                      {feat.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
