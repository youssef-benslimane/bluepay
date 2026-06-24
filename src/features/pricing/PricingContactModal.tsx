"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  prenom:    z.string().min(2, "Requis"),
  nom:       z.string().min(2, "Requis"),
  email:     z.string().email("Email invalide"),
  telephone: z.string().min(8, "Requis"),
  societe:   z.string().min(2, "Requis"),
  salaries:  z.string().min(1, "Requis"),
  message:   z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface Props {
  isOpen:  boolean;
  onClose: () => void;
  planName: string;
  planId:   string;
}

export function PricingContactModal({ isOpen, onClose, planName, planId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom:       `${data.prenom} ${data.nom}`,
          societe:   data.societe,
          telephone: data.telephone,
          email:     data.email,
          message:   `Intéressé par l'offre ${planName}.\nNombre de salariés : ${data.salaries}.\n${data.message ?? ""}`.trim(),
          plan:      planId,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setError(null); reset(); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-muted font-medium uppercase tracking-wider">Offre sélectionnée</p>
                <h2 className="text-base font-bold text-dark">{planName}</h2>
              </div>
              <button onClick={handleClose} className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors">
                <X size={18} className="text-muted" />
              </button>
            </div>

            <div className="px-6 py-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 gap-4"
                >
                  <CheckCircle2 size={52} className="text-green-500" />
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-1">Demande envoyée !</h3>
                    <p className="text-sm text-muted">
                      Notre équipe vous contactera dans les <strong>24h</strong> pour discuter de l&apos;offre <strong>{planName}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                  >
                    Fermer
                  </button>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-muted mb-5">
                    Renseignez vos coordonnées et notre équipe vous contactera sous 24h.
                  </p>

                  {error && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input {...register("prenom")} placeholder="Prénom *" className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.prenom ? "border-red-300" : "border-gray-200"}`} />
                        {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom.message}</p>}
                      </div>
                      <div>
                        <input {...register("nom")} placeholder="Nom *" className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.nom ? "border-red-300" : "border-gray-200"}`} />
                        {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom.message}</p>}
                      </div>
                    </div>

                    <div>
                      <input {...register("societe")} placeholder="Société *" className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.societe ? "border-red-300" : "border-gray-200"}`} />
                      {errors.societe && <p className="mt-1 text-xs text-red-500">{errors.societe.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input {...register("email")} type="email" placeholder="Email *" className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.email ? "border-red-300" : "border-gray-200"}`} />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input {...register("telephone")} type="tel" placeholder="Téléphone *" className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.telephone ? "border-red-300" : "border-gray-200"}`} />
                        {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <select {...register("salaries")} className={`w-full rounded-lg border px-3 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.salaries ? "border-red-300" : "border-gray-200"}`}>
                        <option value="">Nombre de salariés *</option>
                        <option value="1-10">1 – 10 salariés</option>
                        <option value="11-20">11 – 20 salariés</option>
                        <option value="21-50">21 – 50 salariés</option>
                        <option value="51-100">51 – 100 salariés</option>
                        <option value="100+">Plus de 100 salariés</option>
                      </select>
                      {errors.salaries && <p className="mt-1 text-xs text-red-500">{errors.salaries.message}</p>}
                    </div>

                    <div>
                      <textarea
                        {...register("message")}
                        placeholder="Message ou question (optionnel)"
                        rows={3}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
                    >
                      {submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={15} />}
                      {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
