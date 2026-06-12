"use client";

import { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SimulatorResults } from "./SimulatorResults";
import {
  payrollEngine,
  CIMR_OPTIONS_AL_KAMIL_TCNSS,
  CIMR_OPTIONS_AL_MOUNASSIB,
} from "./SimulatorEngine";
import type { PayrollResult, ProduitCimr, TypeContrat } from "./SimulatorEngine";
import { formatCurrency } from "@/lib/utils";

// ─── Schéma ────────────────────────────────────────────────────────────────

const itemSchema = z.object({
  libelle:   z.string().optional(),
  montant:   z.number().min(0),
  cotisable: z.boolean(),
  imposable: z.boolean(),
});

// Convertit une chaîne "7 000,50" ou "7000.50" en nombre
function toNumber(val: string): number {
  return parseFloat(val.replace(/\s/g, "").replace(",", "."));
}

const schema = z.object({
  netCible: z
    .string()
    .min(1, "Requis")
    .refine((v) => !isNaN(toNumber(v)) && toNumber(v) > 0, {
      message: "Montant invalide (ex : 7 000,50)",
    }),
  tauxActivite:           z.number().min(1).max(100),
  situationFamiliale:     z.enum(["C","M"]),
  nombrePersonnesACharge: z.number().min(0).max(10),
  retenuesBrute:          z.number().min(0),
  cimrProduit:            z.string(),
  cimrTauxOption:         z.string(),
  primes:                 z.array(itemSchema),
  avantages:              z.array(itemSchema),
});

type FormData = z.infer<typeof schema>;

// ─── Constantes UI ─────────────────────────────────────────────────────────

const CIMR_PRODUIT_OPTIONS = [
  { value: "",             label: "Aucun" },
  { value: "AL_KAMIL",    label: "Al Kamil" },
  { value: "AL_MOUNASSIB", label: "Al Mounassib" },
  { value: "TCNSS",       label: "TCNSS" },
];

const sel =
  "w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-dark " +
  "transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

// ─── Composant ─────────────────────────────────────────────────────────────

export function SimulatorNetBrut({ typeContrat }: { typeContrat: TypeContrat }) {
  const [result, setResult] = useState<PayrollResult | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tauxActivite: 100,
      situationFamiliale: "C",
      nombrePersonnesACharge: 0,
      retenuesBrute: 0,
      cimrProduit: "",
      cimrTauxOption: "",
      primes: [],
      avantages: [],
    },
  });

  const { fields: primeFields, append: appendPrime, remove: removePrime } =
    useFieldArray({ control, name: "primes" });
  const { fields: avantageFields, append: appendAvantage, remove: removeAvantage } =
    useFieldArray({ control, name: "avantages" });

  const watched = watch();
  const cimrProduit = watched.cimrProduit as ProduitCimr | "";
  const cimrOptions =
    cimrProduit === "AL_MOUNASSIB"
      ? CIMR_OPTIONS_AL_MOUNASSIB
      : CIMR_OPTIONS_AL_KAMIL_TCNSS;

  // Net cible parsé pour l'affichage en temps réel
  const netCibleDisplay = useMemo(() => {
    const n = toNumber(watched.netCible || "");
    return isNaN(n) ? 0 : n;
  }, [watched.netCible]);

  const onSubmit = (data: FormData) => {
    const res = payrollEngine.calculateNetToGross({
      netCible: toNumber(data.netCible),
      tauxActivite: data.tauxActivite,
      typeContrat,
      situationFamiliale: data.situationFamiliale,
      nombrePersonnesACharge: data.nombrePersonnesACharge,
      retenuesBrute: data.retenuesBrute,
      cimrConfig:
        data.cimrProduit && data.cimrTauxOption
          ? { produit: data.cimrProduit as ProduitCimr, tauxSalarialOption: data.cimrTauxOption }
          : undefined,
      primes: data.primes.map((p) => ({
        libelle: p.libelle || "",
        montant: p.montant,
        cotisable: p.cotisable,
        imposable: p.imposable,
      })),
      avantages: data.avantages.map((a) => ({
        libelle: a.libelle || "",
        montant: a.montant,
        cotisable: a.cotisable,
        imposable: a.imposable,
      })),
    });
    setResult(res);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* ── Formulaire ─────────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Net cible */}
        <Input
          label="Salaire net cible (MAD)"
          type="text"
          inputMode="decimal"
          placeholder="Ex : 7 000,00"
          required
          error={errors.netCible?.message}
          {...register("netCible")}
        />

        {/* Paramètres */}
        <fieldset className="rounded-xl border border-border p-4 flex flex-col gap-3">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-muted">
            Paramètres
          </legend>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Taux d'activité (%)"
              type="number"
              placeholder="100"
              {...register("tauxActivite", { valueAsNumber: true })}
            />
            <Input
              label="Personnes à charge"
              type="number"
              placeholder="0"
              {...register("nombrePersonnesACharge", { valueAsNumber: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Retenues brutes (MAD)"
              type="number"
              placeholder="0"
              {...register("retenuesBrute", { valueAsNumber: true })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-dark">
                Situation familiale
              </label>
              <select className={sel} {...register("situationFamiliale")}>
                <option value="C">Célibataire / Divorcé(e)</option>
                <option value="M">Marié(e)</option>
              </select>
            </div>
          </div>

          {/* CIMR */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-dark">CIMR</label>
              <select className={sel} {...register("cimrProduit")}>
                {CIMR_PRODUIT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {cimrProduit ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-dark">Taux (%)</label>
                <select className={sel} {...register("cimrTauxOption")}>
                  <option value="">— Choisir —</option>
                  {cimrOptions.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.salarial}% sal. / {o.patronal}% pat.
                    </option>
                  ))}
                </select>
              </div>
            ) : <div />}
          </div>
        </fieldset>

        {/* Net cible (rappel) */}
        <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
          <span className="text-sm font-medium text-dark">Net cible</span>
          <span className="text-base font-bold text-primary">
            {formatCurrency(netCibleDisplay)}
          </span>
        </div>

        {/* Primes / indemnités */}
        <fieldset className="rounded-xl border border-border p-4 flex flex-col gap-3">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-muted">
            Primes / indemnités
          </legend>

          {primeFields.map((field, idx) => (
            <div key={field.id} className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  label={idx === 0 ? "Montant (MAD)" : undefined}
                  type="number"
                  placeholder="0"
                  {...register(`primes.${idx}.montant`, { valueAsNumber: true })}
                />
              </div>
              <label className={`flex items-center gap-1 text-xs text-muted cursor-pointer ${idx === 0 ? "mb-1" : ""} pb-2.5`}>
                <input type="checkbox" className="accent-primary" {...register(`primes.${idx}.imposable`)} />
                Soumis IR
              </label>
              <label className={`flex items-center gap-1 text-xs text-muted cursor-pointer ${idx === 0 ? "mb-1" : ""} pb-2.5`}>
                <input type="checkbox" className="accent-primary" {...register(`primes.${idx}.cotisable`)} />
                Cotisable
              </label>
              <button
                type="button"
                onClick={() => removePrime(idx)}
                className={`text-error/70 hover:text-error ${idx === 0 ? "mb-1" : ""} pb-2.5`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendPrime({ libelle: "", montant: 0, cotisable: true, imposable: true })}
            className="flex items-center gap-1.5 text-sm text-primary hover:underline w-fit"
          >
            <Plus size={15} /> Ajouter
          </button>
        </fieldset>

        {/* Avantages en nature */}
        <fieldset className="rounded-xl border border-border p-4 flex flex-col gap-3">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-muted">
            Avantages en nature
          </legend>

          {avantageFields.map((field, idx) => (
            <div key={field.id} className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  label={idx === 0 ? "Montant (MAD)" : undefined}
                  type="number"
                  placeholder="0"
                  {...register(`avantages.${idx}.montant`, { valueAsNumber: true })}
                />
              </div>
              <label className={`flex items-center gap-1 text-xs text-muted cursor-pointer ${idx === 0 ? "mb-1" : ""} pb-2.5`}>
                <input type="checkbox" className="accent-primary" {...register(`avantages.${idx}.imposable`)} />
                Soumis IR
              </label>
              <label className={`flex items-center gap-1 text-xs text-muted cursor-pointer ${idx === 0 ? "mb-1" : ""} pb-2.5`}>
                <input type="checkbox" className="accent-primary" {...register(`avantages.${idx}.cotisable`)} />
                Cotisable
              </label>
              <button
                type="button"
                onClick={() => removeAvantage(idx)}
                className={`text-error/70 hover:text-error ${idx === 0 ? "mb-1" : ""} pb-2.5`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendAvantage({ libelle: "", montant: 0, cotisable: true, imposable: true })}
            className="flex items-center gap-1.5 text-sm text-primary hover:underline w-fit"
          >
            <Plus size={15} /> Ajouter
          </button>
        </fieldset>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          <Calculator size={18} />
          Calculer la simulation
        </Button>
      </form>

      {/* ── Résultats ──────────────────────────────────────────── */}
      <div>
        {result ? (
          <SimulatorResults result={result} isNetToBrut />
        ) : (
          <div className="flex h-full min-h-[340px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <Calculator size={36} className="text-muted/40" />
            <p className="text-sm text-muted">
              Renseignez votre net souhaité et cliquez sur<br />
              <span className="font-medium text-dark">« Calculer la simulation »</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
