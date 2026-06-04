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
  salaireNet: z
    .number({ message: "Veuillez saisir un montant valide" })
    .min(2500, "Le salaire net minimum est de 2 500 MAD"),
});

type FormData = z.infer<typeof schema>;

export function SimulatorNetBrut() {
  const [result, setResult] = useState<SimulatorResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (data: FormData) => {
    const res = payrollEngine.calculateNetToBrut(data);
    setResult(res);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Salaire net souhaité (MAD)"
          type="number"
          placeholder="Ex : 7 000"
          required
          error={errors.salaireNet?.message}
          hint="Nous calculons le brut équivalent pour un célibataire sans enfant."
          {...register("salaireNet", { valueAsNumber: true })}
        />

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-muted">
            <span className="font-semibold text-primary">Note :</span> Le calcul
            Net → Brut est une estimation basée sur un profil célibataire sans
            enfant. Pour un calcul personnalisé, utilisez le simulateur Brut →
            Net.
          </p>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          <Calculator size={18} />
          Estimer le salaire brut
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
              Renseignez votre salaire net souhaité pour estimer le brut
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
