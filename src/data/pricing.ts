import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Idéal pour les petites entreprises",
    basePrice: 990,
    perSalaryPrice: 100,
    priceLabel: "990 DH HT / mois",
    maxSalaries: "Jusqu'à 20 salariés",
    features: [
      "Gestion des dossiers des salariés",
      "Gestion de la paie mensuelle",
      "Édition des bulletins de paie PDF",
      "Déclarations sociales",
      "Historisation complète",
      "Tableau de bord basique",
      "Export Excel",
      "Support email",
    ],
    support: "Réponse sous 48h",
    hosting: "Cloud SaaS",
    highlighted: false,
    ctaLabel: "Commencer",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Pour les PME en croissance",
    basePrice: 4900,
    perSalaryPrice: 80,
    priceLabel: "4 900 DH HT / mois",
    maxSalaries: "Jusqu'à 100 salariés",
    features: [
      "Tout Essentiel inclus",
      "Gestion multi-sociétés",
      "Reporting personnalisé",
      "Support prioritaire",
      "Formation incluse",
    ],
    support: "Téléphone + Email sous 24h",
    hosting: "Cloud SaaS ou On-Premise",
    highlighted: false,
    ctaLabel: "Commencer",
  },
  {
    id: "entreprise",
    name: "Entreprise",
    tagline: "Pour les grandes organisations",
    basePrice: null,
    perSalaryPrice: null,
    priceLabel: "Sur devis",
    maxSalaries: "Salariés illimités",
    features: [
      "Tout Business inclus",
      "Multi-entités / Groupe",
      "Personnalisations avancées",
      "SLA garanti",
      "Déploiement On-Premise dédié",
      "Gestionnaire de compte dédié",
      "Formation sur site",
      "Support 7j/7",
    ],
    support: "Dédié 7j/7",
    hosting: "On-Premise ou Cloud privé",
    highlighted: false,
    ctaLabel: "Commencer",
  },
];

export const CABINET_LICENCE = {
  oneShotPrice: 39900,
  oneShotLabel: "39 900 DH HT",
  roles: [
    { id: "rh", label: "RH", price: 490 },
    { id: "configurateur", label: "Configurateur", price: 490 },
    { id: "administrateur", label: "Administrateur", price: 490 },
    { id: "employe", label: "Employé", price: 199 },
  ],
  features: [
    "Licence logicielle complète BluePay",
    "Ressources gérées par le cabinet",
    "Mises à jour réglementaires incluses",
    "Support technique dédié",
    "Formation à l'utilisation",
  ],
};

export const PRICING_FAQ = [
  {
    question: "Comment sont calculés les prix ?",
    answer:
      "Les tarifs BluePay sont proposés selon le mode d'accès choisi : BPO (ressources BlueTalent) ou licence cabinet. Contactez-nous pour obtenir une proposition adaptée à votre structure.",
  },
  {
    question: "Quelle est la différence entre BPO et Cabinet Comptables ?",
    answer:
      "En mode BPO, toutes les ressources sont du côté BlueTalent : vous bénéficiez d'un abonnement mensuel tout compris. En mode Cabinet Comptables, vous achetez une licence one-shot et gérez la solution avec vos propres ressources, avec une licence annuelle par rôle (RH, Configurateur, Administrateur, Employé).",
  },
  {
    question: "Puis-je changer d'offre en cours d'abonnement ?",
    answer:
      "Oui, vous pouvez évoluer vers une offre supérieure à tout moment. Notre équipe vous accompagne dans la transition sans interruption de service.",
  },
  {
    question: "Y a-t-il une période d'essai gratuite ?",
    answer:
      "Nous proposons une démonstration personnalisée gratuite de la solution. Contactez-nous pour planifier votre session de découverte.",
  },
  {
    question: "Les mises à jour réglementaires sont-elles incluses ?",
    answer:
      "Oui, toutes les mises à jour légales (barèmes IR, taux CNSS/AMO, etc.) sont intégrées automatiquement dans la solution SaaS.",
  },
  {
    question: "Quelle est la politique de sauvegarde des données ?",
    answer:
      "En mode SaaS, vos données sont sauvegardées automatiquement quotidiennement avec réplication géographique. En On-Premise, vous gérez vos propres sauvegardes.",
  },
];
