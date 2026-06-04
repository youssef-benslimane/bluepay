"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

export function ContactPageClient() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? undefined;

  return <ContactForm defaultPlan={plan} />;
}
