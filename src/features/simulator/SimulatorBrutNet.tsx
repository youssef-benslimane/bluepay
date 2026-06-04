"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SimulatorResults } from "./SimulatorResults";
import { payrollEngine } from "./SimulatorEngine";
import type { SimulatorResult } from "@/types";

const schema = z.object({
  salaireBrut: z
    .number({ message: "Veuillez saisir un montant valide" })
    .min(3111, "Le salaire brut minimum est de 3 111 MAD (SMIG)"),
  situationFamiliale: z.enum(["celibataire", "marie", "divorce", "veuf"]),
  nombreEnfants: z.number().min(0).max(10),
  anciennete: z.number().min(0).max(50),
});

type FormData = z.infer<typeof schema>;

export function SimulatorBrutNet() {
  const [result, setResult] = useState<SimulatorResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      situationFamiliale: "celibataire",
      nombreEnfants: 0,
      anciennete: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    const res = payrollEngine.calculateBrutToNet(data);
    setResult(res);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Salaire brut mensuel (MAD)"
          type="number"
          placeholder="Ex : 8 000"
          required
          error={errors.salaireBrut?.message}
          {...register("salaireBrut", { valueAsNumber: true })}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-dark">
            Situation familiale <span className="text-error">*</span>
          </label>
          <select
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-border-dark"
            {...register("situationFamiliale")}
          >
            <option value="celibataire">Célibataire</option>
            <option value="marie">Marié(e)</option>
            <option value="divorce">Divorcé(e)</option>
            <option value="veuf">Veuf/Veuve</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre d'enfants"
            type="number"
            placeholder="0"
            error={errors.nombreEnfants?.message}
            {...register("nombreEnfants", { valueAsNumber: true })}
          />
          <Input
            label="Ancienneté (années)"
            type="number"
            placeholder="0"
            error={errors.anciennete?.message}
            {...register("anciennete", { valueAsNumber: true })}
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          <Calculator size={18} />
          Calculer mon salaire net
        </Button>
      </form>

      {/* Results */}
      <div>
        {result ? (
          <SimulatorResults result={result} />
        ) : (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <Calculator size={36} className="text-muted/40" />
            <p className="text-muted">
              Renseignez votre salaire brut pour obtenir une simulation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
