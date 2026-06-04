import type { SolutionItem, ComparisonCriteria } from "@/types";

export const SOLUTIONS: SolutionItem[] = [
  {
    id: "saas",
    title: "Solution SaaS",
    tagline: "Hébergée dans le Cloud, accessible partout",
    description:
      "BluePay SaaS est la solution clé en main pour les entreprises qui souhaitent démarrer rapidement sans infrastructure à gérer. Accédez à votre outil de paie depuis n'importe quel navigateur, n'importe où.",
    advantages: [
      "Aucun serveur à installer ni à maintenir",
      "Mises à jour automatiques et immédiates",
      "Sauvegardes automatiques quotidiennes",
      "Accès à distance depuis tout navigateur",
      "Mise en service en moins de 24h",
      "Coût d'entrée minimal",
      "Évolutivité instantanée",
      "Support technique inclus",
    ],
    highlighted: true,
  },
  {
    id: "onpremise",
    title: "Solution On-Premise",
    tagline: "Installée sur votre infrastructure",
    description:
      "BluePay On-Premise s'installe directement sur les serveurs de votre entreprise. Vous gardez un contrôle total sur vos données et pouvez personnaliser la solution en profondeur selon vos processus métier.",
    advantages: [
      "Contrôle total de vos données sensibles",
      "Hébergement sur votre infrastructure interne",
      "Personnalisations avancées possibles",
      "Fonctionnement en réseau local (LAN)",
      "Indépendance vis-à-vis d'internet",
      "Intégration avec vos systèmes existants",
      "Conformité aux politiques IT internes",
      "Idéal pour les groupes et grandes entreprises",
    ],
    highlighted: false,
  },
];

export const COMPARISON_CRITERIA: ComparisonCriteria[] = [
  {
    label: "Coût initial",
    saas: "Faible (abonnement mensuel)",
    onpremise: "Élevé (licence + infrastructure)",
    saasPositive: true,
    onpremisePositive: false,
  },
  {
    label: "Maintenance",
    saas: "Gérée par BluePay",
    onpremise: "Gérée en interne",
    saasPositive: true,
    onpremisePositive: false,
  },
  {
    label: "Sécurité des données",
    saas: "Cloud sécurisé, chiffrement",
    onpremise: "Contrôle total en interne",
    saasPositive: true,
    onpremisePositive: true,
  },
  {
    label: "Personnalisation",
    saas: "Standard + options",
    onpremise: "Totale et avancée",
    saasPositive: false,
    onpremisePositive: true,
  },
  {
    label: "Hébergement",
    saas: "Serveurs BluePay (Cloud)",
    onpremise: "Vos propres serveurs",
    saasPositive: true,
    onpremisePositive: true,
  },
  {
    label: "Évolutivité",
    saas: "Instantanée et flexible",
    onpremise: "Limitée par l'infrastructure",
    saasPositive: true,
    onpremisePositive: false,
  },
  {
    label: "Mises à jour",
    saas: "Automatiques",
    onpremise: "Manuelles (à planifier)",
    saasPositive: true,
    onpremisePositive: false,
  },
  {
    label: "Accès à distance",
    saas: "Oui, depuis tout navigateur",
    onpremise: "Nécessite un VPN",
    saasPositive: true,
    onpremisePositive: false,
  },
];
