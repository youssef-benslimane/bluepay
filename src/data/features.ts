import type { Feature, Advantage } from "@/types";

export const FEATURES: Feature[] = [
  {
    id: "multi-societe",
    title: "Gestion multi-sociétés",
    description:
      "Gérez plusieurs sociétés depuis une seule plateforme, chacune avec ses propres paramètres, salariés et périodes de paie.",
    icon: "Building2",
  },
  {
    id: "salaries",
    title: "Gestion des salariés",
    description:
      "Fiches salariés complètes avec gestion des contrats, historique des rémunérations et suivi des carrières.",
    icon: "Users",
  },
  {
    id: "calcul-paie",
    title: "Calcul automatique de la paie",
    description:
      "Calcul automatisé des salaires mensuels et horaires, intégrant tous les éléments variables de rémunération.",
    icon: "Calculator",
  },
  {
    id: "cnss",
    title: "CNSS",
    description:
      "Calcul automatique des cotisations CNSS salariales et patronales selon les taux en vigueur au Maroc.",
    icon: "Shield",
  },
  {
    id: "amo",
    title: "AMO",
    description:
      "Gestion de l'Assurance Maladie Obligatoire (AMO) intégrée dans le moteur de calcul de la paie.",
    icon: "HeartPulse",
  },
  {
    id: "ir",
    title: "Impôt sur le Revenu (IR)",
    description:
      "Application du barème IR marocain avec déductions légales, abattements forfaitaires et situations familiales.",
    icon: "Receipt",
  },
  {
    id: "absences",
    title: "Gestion des absences",
    description:
      "Déduction automatique des absences sur la paie, gestion des congés, jours fériés et heures supplémentaires.",
    icon: "CalendarX",
  },
  {
    id: "bulletins",
    title: "Bulletins de paie",
    description:
      "Génération automatique des bulletins de paie au format PDF, conformes aux exigences légales marocaines.",
    icon: "FileText",
  },
  {
    id: "declarations",
    title: "Déclarations sociales",
    description:
      "Génération des déclarations CNSS, CIMR et SIMPL-IR directement depuis la plateforme.",
    icon: "ClipboardList",
  },
  {
    id: "reporting",
    title: "Reporting & Tableaux de bord",
    description:
      "Tableaux de bord analytiques et rapports personnalisés pour piloter votre masse salariale.",
    icon: "BarChart3",
  },
  {
    id: "historisation",
    title: "Historisation des données",
    description:
      "Conservation complète de l'historique des paies, permettant des reconstitutions et audits à tout moment.",
    icon: "History",
  },
  {
    id: "parametrage",
    title: "Paramétrage flexible",
    description:
      "Configurez librement vos grilles salariales, primes, indemnités et retenues selon les spécificités de votre entreprise.",
    icon: "Settings2",
  },
];

export const ADVANTAGES: Advantage[] = [
  {
    id: "temps",
    title: "Gain de temps considérable",
    description:
      "Automatisez les tâches répétitives de paie. Ce qui prenait des jours ne prend plus que quelques minutes.",
    icon: "Clock",
    metric: "-80%",
    metricLabel: "de temps de traitement",
  },
  {
    id: "erreurs",
    title: "Moins d'erreurs de calcul",
    description:
      "Le moteur de calcul BluePay applique automatiquement les règles légales marocaines, réduisant considérablement les erreurs de calcul de nature humaine.",
    icon: "CheckCircle2",
    metric: "-95%",
    metricLabel: "d'erreurs de calcul humaines",
  },
  {
    id: "conformite",
    title: "Conformité réglementaire",
    description:
      "Toujours à jour avec la réglementation marocaine : CNSS, AMO, CIMR, IR, Code du Travail.",
    icon: "BadgeCheck",
    metric: "100%",
    metricLabel: "conformité légale",
  },
  {
    id: "securite",
    title: "Sécurité des données",
    description:
      "Vos données sont chiffrées, sauvegardées automatiquement et accessibles uniquement aux personnes autorisées.",
    icon: "Lock",
  },
  {
    id: "simplicite",
    title: "Simplicité d'utilisation",
    description:
      "Interface intuitive conçue pour les gestionnaires RH, sans formation longue ni compétences techniques.",
    icon: "Sparkles",
  },
  {
    id: "responsive",
    title: "Application responsive",
    description:
      "Accessible depuis n'importe quel appareil - ordinateur, tablette ou smartphone - sans aucune installation.",
    icon: "Smartphone",
  },
];
