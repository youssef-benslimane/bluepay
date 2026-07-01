"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RecaptchaField, isRecaptchaEnabled, type RecaptchaFieldRef } from "@/components/ui/RecaptchaField";
import { submitContactForm } from "@/services/contact";

const schema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  societe: z.string().optional(),
  telephone: z
    .string()
    .regex(/^(\+212|0)[5-7]\d{8}$/, "Format attendu : 06XXXXXXXX ou +212XXXXXXXXX")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères")
    .max(1000, "Le message est trop long (max 1000 caractères)"),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  defaultPlan?: string;
}

export function ContactForm({ defaultPlan }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const recaptchaRef = useRef<RecaptchaFieldRef>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setStatus("idle");

      const recaptchaToken = isRecaptchaEnabled()
        ? recaptchaRef.current?.getToken() ?? ""
        : undefined;

      if (isRecaptchaEnabled() && !recaptchaToken) {
        setStatus("error");
        setStatusMessage("Veuillez confirmer que vous n'êtes pas un robot.");
        return;
      }

      const result = await submitContactForm({
        ...data,
        plan: defaultPlan,
        recaptchaToken,
      });
      setStatus("success");
      setStatusMessage(result.message);
      reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error
          ? err.message
          : "Une erreur s'est produite. Veuillez réessayer."
      );
      recaptchaRef.current?.reset();
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-success/20 bg-success/5 px-8 py-12 text-center">
        <CheckCircle2 size={48} className="text-success" />
        <h3 className="text-xl font-bold text-dark">Message envoyé !</h3>
        <p className="text-muted">{statusMessage}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-primary underline underline-offset-2 hover:no-underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-error/20 bg-error/5 p-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-error" />
          <p className="text-sm text-error">{statusMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Prénom"
          placeholder="Votre prénom"
          required
          error={errors.prenom?.message}
          {...register("prenom")}
        />
        <Input
          label="Nom"
          placeholder="Votre nom"
          required
          error={errors.nom?.message}
          {...register("nom")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Société"
          placeholder="Nom de votre entreprise"
          error={errors.societe?.message}
          {...register("societe")}
        />
        <Input
          label="Téléphone"
          type="tel"
          placeholder="06XXXXXXXX"
          error={errors.telephone?.message}
          {...register("telephone")}
        />
      </div>

      <Input
        label="Email professionnel"
        type="email"
        placeholder="vous@entreprise.ma"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <Textarea
        label="Votre message"
        placeholder="Décrivez votre besoin, le nombre de salariés, vos contraintes..."
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      <RecaptchaField ref={recaptchaRef} className="flex justify-center sm:justify-start" />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        className="w-full"
      >
        <Send size={18} />
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </Button>

      <p className="text-center text-xs text-muted">
        Nous vous répondrons dans les 24 heures ouvrées.
      </p>
    </form>
  );
}
