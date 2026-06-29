"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle2, ArrowRight, Loader2, CalendarPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buildDemoCalendarLinks, downloadICS } from "@/lib/calendar";
import { isDemoSlotBookable, isDemoSlotTooSoon } from "@/lib/demo-slots";

// ─── Time slots (09:00 → 17:30, every 30 min) ────────────────────────────────

const SLOTS: string[] = [];
for (let h = 9; h <= 17; h++) {
  SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}
const TIME_SLOTS = SLOTS.filter((s) => s <= "17:30");

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function isWeekend(date: Date) { const d = date.getDay(); return d === 0 || d === 6; }
function isBefore(date: Date, ref: Date) {
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const r = new Date(ref);  r.setHours(0, 0, 0, 0);
  return d < r;
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function buildCalendar(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(startDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
function formatDateISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDateFR(d: Date) {
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  prenom:    z.string().min(2, "Requis"),
  nom:       z.string().min(2, "Requis"),
  email:     z.string().email("Email invalide"),
  societe:   z.string().min(2, "Requis"),
  telephone: z.string().min(8, "Requis"),
});
type FormData = z.infer<typeof schema>;

// ─── Modal ────────────────────────────────────────────────────────────────────

interface Props { isOpen: boolean; onClose: () => void; }
type Step = "calendar" | "slot" | "form" | "confirm";

export function DemoBookingModal({ isOpen, onClose }: Props) {
  const today = new Date();
  const [viewYear, setViewYear]     = useState(today.getFullYear());
  const [viewMonth, setViewMonth]   = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep]             = useState<Step>("calendar");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError]     = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const cells = buildCalendar(viewYear, viewMonth);
  const canGoPrev = !(viewYear === today.getFullYear() && viewMonth === today.getMonth());

  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); } else setViewMonth(m => m + 1); };

  // Charger les créneaux réservés quand une date est sélectionnée
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    fetch(`/api/demo-booking?date=${formatDateISO(selectedDate)}`)
      .then((r) => r.json())
      .then((data) => setBookedSlots(data.bookedSlots ?? []))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const handleDayClick = (date: Date) => {
    if (isWeekend(date) || isBefore(date, today)) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setApiError(null);
    setStep("slot");
  };

  const handleSlotClick = (slot: string) => {
    if (!selectedDate) return;
    const dateIso = formatDateISO(selectedDate);
    if (bookedSlots.includes(slot) || isDemoSlotTooSoon(dateIso, slot)) return;
    setSelectedSlot(slot);
    setApiError(null);
    setStep("form");
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/demo-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date:  formatDateISO(selectedDate),
          heure: selectedSlot,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setApiError(result.message ?? "Une erreur s'est produite.");
        return;
      }
      setStep("confirm");
    } catch {
      setApiError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("calendar");
      setSelectedDate(null);
      setSelectedSlot(null);
      setBookedSlots([]);
      setApiError(null);
      reset();
    }, 300);
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
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span className="font-semibold text-dark text-sm">Réserver votre démo</span>
              </div>
              <button onClick={handleClose} className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors">
                <X size={18} className="text-muted" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1 px-6 pt-3">
              {(["calendar", "slot", "form", "confirm"] as Step[]).map((s, i) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    (["calendar", "slot", "form", "confirm"] as Step[]).indexOf(step) >= i ? "bg-primary" : "bg-gray-100"
                  }`}
                />
              ))}
            </div>

            <div className="px-6 pb-6 pt-4 min-h-[380px]">
              <AnimatePresence mode="wait">

                {/* ── STEP 1: Calendar ── */}
                {step === "calendar" && (
                  <motion.div key="calendar" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}>
                    <p className="text-sm text-muted mb-4">Choisissez une date disponible (jours ouvrés)</p>
                    <div className="flex items-center justify-between mb-3">
                      <button onClick={prevMonth} disabled={!canGoPrev} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-sm font-semibold text-dark capitalize">{MONTHS_FR[viewMonth]} {viewYear}</span>
                      <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 mb-1">
                      {DAYS_FR.map((d) => (
                        <div key={d} className={`text-center text-xs font-medium py-1 ${d === "Sam" || d === "Dim" ? "text-gray-300" : "text-muted"}`}>{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5">
                      {cells.map((date, i) => {
                        if (!date) return <div key={i} />;
                        const disabled = isWeekend(date) || isBefore(date, today);
                        const isToday  = sameDay(date, today);
                        return (
                          <button
                            key={i}
                            disabled={disabled}
                            onClick={() => handleDayClick(date)}
                            className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                              ${disabled ? "text-gray-200 cursor-not-allowed" : "hover:bg-primary/10 hover:text-primary cursor-pointer text-dark"}
                              ${isToday && !disabled ? "ring-1 ring-primary/30" : ""}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Time slots ── */}
                {step === "slot" && selectedDate && (
                  <motion.div key="slot" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}>
                    <button onClick={() => setStep("calendar")} className="flex items-center gap-1 text-xs text-muted hover:text-dark mb-3 transition-colors">
                      <ChevronLeft size={14} /> Retour
                    </button>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={15} className="text-primary" />
                      <span className="text-sm font-medium text-dark capitalize">{formatDateFR(selectedDate)}</span>
                    </div>
                    <p className="text-xs text-muted mb-3">Sélectionnez un créneau de 30 min</p>
                    {loadingSlots ? (
                      <div className="flex justify-center py-8">
                        <Loader2 size={24} className="text-primary animate-spin" />
                      </div>
                    ) : (() => {
                      const dateIso = formatDateISO(selectedDate);
                      const now = new Date();
                      const visibleSlots = TIME_SLOTS.filter(
                        (slot) => !isDemoSlotTooSoon(dateIso, slot, now)
                      );

                      if (visibleSlots.length === 0) {
                        return (
                          <p className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-6 text-center text-sm text-muted">
                            Aucun créneau disponible pour cette date. Choisissez un autre jour.
                          </p>
                        );
                      }

                      return (
                      <div className="grid grid-cols-4 gap-2">
                        {visibleSlots.map((slot) => {
                          const booked = bookedSlots.includes(slot);
                          const available = isDemoSlotBookable(dateIso, slot, bookedSlots, now);
                          return (
                            <button
                              key={slot}
                              disabled={!available}
                              onClick={() => handleSlotClick(slot)}
                              className={`rounded-lg border py-2 text-sm font-medium transition-all
                                ${!available
                                  ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                                  : "border-gray-200 text-dark hover:border-primary hover:bg-primary/5 hover:text-primary"
                                }
                              `}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      );
                    })()}
                  </motion.div>
                )}

                {/* ── STEP 3: Contact form ── */}
                {step === "form" && selectedDate && selectedSlot && (
                  <motion.div key="form" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}>
                    <button onClick={() => setStep("slot")} className="flex items-center gap-1 text-xs text-muted hover:text-dark mb-3 transition-colors">
                      <ChevronLeft size={14} /> Retour
                    </button>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-dark">
                        <Calendar size={13} className="text-primary" />
                        <span className="capitalize">{formatDateFR(selectedDate)}</span>
                      </div>
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1.5 text-xs text-dark">
                        <Clock size={13} className="text-primary" />
                        <span>{selectedSlot}</span>
                      </div>
                    </div>

                    {apiError && (
                      <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
                        {apiError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <input {...register("prenom")} placeholder="Prénom *" className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.prenom ? "border-red-300" : "border-gray-200"}`} />
                          {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom.message}</p>}
                        </div>
                        <div>
                          <input {...register("nom")} placeholder="Nom *" className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.nom ? "border-red-300" : "border-gray-200"}`} />
                          {errors.nom && <p className="mt-1 text-xs text-red-500">{errors.nom.message}</p>}
                        </div>
                      </div>
                      <div>
                        <input {...register("email")} type="email" placeholder="Email professionnel *" className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.email ? "border-red-300" : "border-gray-200"}`} />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input {...register("societe")} placeholder="Société *" className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.societe ? "border-red-300" : "border-gray-200"}`} />
                        {errors.societe && <p className="mt-1 text-xs text-red-500">{errors.societe.message}</p>}
                      </div>
                      <div>
                        <input {...register("telephone")} type="tel" placeholder="Téléphone *" className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.telephone ? "border-red-300" : "border-gray-200"}`} />
                        {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone.message}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
                      >
                        {submitting ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={15} />}
                        {submitting ? "Envoi en cours…" : "Confirmer la réservation"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── STEP 4: Confirmation ── */}
                {step === "confirm" && selectedDate && selectedSlot && (() => {
                  const calendar = buildDemoCalendarLinks({
                    date: formatDateISO(selectedDate),
                    heure: selectedSlot,
                  });

                  return (
                  <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-8 gap-4"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
                      <CheckCircle2 size={52} className="text-green-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-dark mb-1">Démo réservée !</h3>
                      <p className="text-sm text-muted">
                        Votre démo est confirmée le{" "}
                        <span className="font-medium text-dark capitalize">{formatDateFR(selectedDate)}</span>
                        {" "}à <span className="font-medium text-dark">{selectedSlot}</span>.
                      </p>
                      <p className="text-sm text-muted mt-1">Un email de confirmation vous a été envoyé.</p>
                    </div>
                    <div className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
                      <p className="flex items-center gap-2 text-sm font-medium text-dark mb-3">
                        <CalendarPlus size={16} className="text-primary" />
                        Ajouter à votre agenda
                      </p>
                      <div className="flex flex-col gap-2">
                        <a
                          href={calendar.google}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark hover:border-primary hover:text-primary transition-colors"
                        >
                          Google Calendar
                        </a>
                        <a
                          href={calendar.outlook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark hover:border-primary hover:text-primary transition-colors"
                        >
                          Outlook
                        </a>
                        <button
                          type="button"
                          onClick={() => downloadICS(calendar.icsContent, calendar.icsFileName)}
                          className="flex items-center justify-center rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark hover:border-primary hover:text-primary transition-colors"
                        >
                          Télécharger (.ics)
                        </button>
                      </div>
                    </div>
                    <button onClick={handleClose} className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                      Fermer
                    </button>
                  </motion.div>
                  );
                })()}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
