import type { Metadata } from "next";
import { AProposContent } from "@/features/a-propos/AProposContent";

export const metadata: Metadata = {
  title: "À propos — BluePay",
  description:
    "Découvrez la mission de BluePay : simplifier la gestion de la paie pour les PME marocaines avec une solution conforme, intuitive et inspirée des meilleurs systèmes.",
};

export default function AProposPage() {
  return <AProposContent />;
}
