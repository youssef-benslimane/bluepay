import type { ContactFormData } from "@/types";

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erreur lors de l'envoi du formulaire");
  }

  return result;
}
