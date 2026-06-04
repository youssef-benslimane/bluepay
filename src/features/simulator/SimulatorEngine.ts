import type {
  SimulatorInputBrutNet,
  SimulatorInputNetBrut,
  SimulatorResult,
} from "@/types";

/**
 * Interface publique du moteur de calcul de paie.
 * Remplacer MockPayrollEngine par l'implémentation réelle lors de l'intégration.
 */
export interface IPayrollEngine {
  calculateBrutToNet(input: SimulatorInputBrutNet): SimulatorResult;
  calculateNetToBrut(input: SimulatorInputNetBrut): SimulatorResult;
}

/**
 * Taux en vigueur au Maroc (2024).
 * Source : CNSS, AMO, barème IR DGI.
 */
const RATES = {
  CNSS_SALARIE: 0.0448,
  CNSS_PATRONAL: 0.2162,
  AMO_SALARIE: 0.0226,
  AMO_PATRONAL: 0.0223,
  CNSS_PLAFOND: 6000,
  ABATTEMENT_FRAIS_PRO: 0.2,
  ABATTEMENT_FRAIS_PRO_MAX: 2500,
  DEDUCTION_CNSS_MAX: 268.8,
  DEDUCTION_AMO_MAX: 135.6,
};

const IR_TRANCHES = [
  { min: 0, max: 2500, taux: 0, deduction: 0 },
  { min: 2500, max: 4166.67, taux: 0.1, deduction: 250 },
  { min: 4166.67, max: 5000, taux: 0.2, deduction: 666.67 },
  { min: 5000, max: 6666.67, taux: 0.3, deduction: 1166.67 },
  { min: 6666.67, max: 15000, taux: 0.34, deduction: 1433.33 },
  { min: 15000, max: Infinity, taux: 0.38, deduction: 2033.33 },
];

function getDeductionEnfants(nombreEnfants: number): number {
  const capped = Math.min(nombreEnfants, 6);
  return capped * 30;
}

function calculateIR(
  salaireNetImposable: number,
  situationFamiliale: SimulatorInputBrutNet["situationFamiliale"],
  nombreEnfants: number
): number {
  const mensuel = salaireNetImposable;
  const tranche = IR_TRANCHES.find(
    (t) => mensuel > t.min && mensuel <= t.max
  ) ?? IR_TRANCHES[IR_TRANCHES.length - 1];

  let ir = mensuel * tranche.taux - tranche.deduction;

  const deductionChargeFamille =
    situationFamiliale !== "celibataire" ? 30 : 0;
  const deductionEnfants = getDeductionEnfants(nombreEnfants);

  ir = Math.max(0, ir - deductionChargeFamille - deductionEnfants);

  return Math.max(0, ir);
}

/**
 * Implémentation mock — calculs approximatifs pour la démo.
 * À remplacer par le moteur de calcul réel de l'application BluePay.
 */
export class MockPayrollEngine implements IPayrollEngine {
  calculateBrutToNet(input: SimulatorInputBrutNet): SimulatorResult {
    const { salaireBrut, situationFamiliale, nombreEnfants } = input;

    const cnss = Math.min(
      salaireBrut * RATES.CNSS_SALARIE,
      RATES.DEDUCTION_CNSS_MAX
    );

    const amo = Math.min(
      salaireBrut * RATES.AMO_SALARIE,
      RATES.DEDUCTION_AMO_MAX
    );

    const abattementFraisPro = Math.min(
      salaireBrut * RATES.ABATTEMENT_FRAIS_PRO,
      RATES.ABATTEMENT_FRAIS_PRO_MAX
    );

    const salaireNetImposable = salaireBrut - cnss - amo - abattementFraisPro;

    const ir = calculateIR(salaireNetImposable, situationFamiliale, nombreEnfants);

    const totalCotisations = cnss + amo + ir;
    const salaireNet = salaireBrut - totalCotisations;

    return {
      salaireBrut,
      cnss,
      amo,
      ir,
      salaireNet,
      totalCotisations,
      tauxEffectifIR: salaireBrut > 0 ? (ir / salaireBrut) * 100 : 0,
    };
  }

  calculateNetToBrut(input: SimulatorInputNetBrut): SimulatorResult {
    const { salaireNet } = input;

    // Estimation itérative (brut ≈ net / (1 - taux_cotisations_approx))
    let brutEstime = salaireNet / 0.8;

    for (let i = 0; i < 10; i++) {
      const result = this.calculateBrutToNet({
        salaireBrut: brutEstime,
        situationFamiliale: "celibataire",
        nombreEnfants: 0,
        anciennete: 0,
      });
      const diff = salaireNet - result.salaireNet;
      brutEstime += diff;
      if (Math.abs(diff) < 0.01) break;
    }

    return this.calculateBrutToNet({
      salaireBrut: Math.max(brutEstime, 0),
      situationFamiliale: "celibataire",
      nombreEnfants: 0,
      anciennete: 0,
    });
  }
}

export const payrollEngine: IPayrollEngine = new MockPayrollEngine();
