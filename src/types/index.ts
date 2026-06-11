export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string | null;
  priceLabel: string;
  maxSalaries: string;
  features: string[];
  support: string;
  hosting: string;
  highlighted: boolean;
  ctaLabel: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
  metricLabel?: string;
}

export interface SolutionItem {
  id: "saas" | "onpremise";
  title: string;
  tagline: string;
  description: string;
  advantages: string[];
  highlighted: boolean;
}

export interface ComparisonCriteria {
  label: string;
  saas: string;
  onpremise: string;
  saasPositive: boolean;
  onpremisePositive: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface SimulatorInputBrutNet {
  salaireBrut: number;
  situationFamiliale: "celibataire" | "marie" | "divorce" | "veuf";
  nombreEnfants: number;
  anciennete: number;
}

export interface SimulatorInputNetBrut {
  salaireNet: number;
}

export interface SimulatorResult {
  salaireBrut: number;
  cnss: number;
  amo: number;
  ir: number;
  salaireNet: number;
  totalCotisations: number;
  tauxEffectifIR: number;
}

export interface ContactFormData {
  prenom: string;
  nom: string;
  societe?: string;
  telephone?: string;
  email: string;
  message: string;
  plan?: string;
}
