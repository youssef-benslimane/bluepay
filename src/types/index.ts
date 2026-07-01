export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  basePrice: number | null;
  perSalaryPrice: number | null;
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

export type { PayrollResult, PayrollInput, NetToGrossInput, CimrConfig, SimulationItem, CotisationDetail, SituationFamiliale, TypeContrat, ProduitCimr } from "@/features/simulator/SimulatorEngine";

export interface ContactFormData {
  prenom: string;
  nom: string;
  societe?: string;
  telephone?: string;
  email: string;
  message: string;
  plan?: string;
  recaptchaToken?: string;
}
