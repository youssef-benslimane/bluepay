// ─── Types ─────────────────────────────────────────────────────────────────

export type SituationFamiliale = "C" | "M";
export type TypeContrat =
  | "CDI"
  | "CDD"
  | "ANAPEC_1"
  | "ANAPEC_2"
  | "ANAPEC_3"
  | "TAHFIZ";
export type ProduitCimr = "AL_KAMIL" | "AL_MOUNASSIB" | "TCNSS";

export interface SimulationItem {
  libelle: string;
  montant: number;
  cotisable: boolean;  // soumis CNSS/AMO/CIMR
  imposable: boolean;  // soumis IR
}

export interface CimrConfig {
  produit: ProduitCimr;
  tauxSalarialOption: string; // e.g. "TAUX_3_00"
}

export interface PayrollInput {
  salaireBase: number;
  tauxActivite?: number;             // %, default 100
  typeContrat?: TypeContrat;         // default CDI
  situationFamiliale?: SituationFamiliale; // default C
  nombrePersonnesACharge?: number;   // default 0
  retenuesBrute?: number;            // default 0
  cimrConfig?: CimrConfig;
  primes?: SimulationItem[];
  avantages?: SimulationItem[];
}

export interface NetToGrossInput {
  netCible: number;
  tauxActivite?: number;
  typeContrat?: TypeContrat;
  situationFamiliale?: SituationFamiliale;
  nombrePersonnesACharge?: number;
  retenuesBrute?: number;
  cimrConfig?: CimrConfig;
  primes?: SimulationItem[];
  avantages?: SimulationItem[];
}

export interface CotisationDetail {
  code: string;
  libelle: string;
  base: number;
  tauxSalarial: number;
  montantSalarial: number;
  tauxPatronal: number;
  montantPatronal: number;
  /** Ligne uniquement affichée dans la section charges patronales */
  patronalOnly?: boolean;
}

export interface PayrollResult {
  salaireBase: number;
  salaireBrutBase: number;
  totalPrimes: number;
  totalAvantages: number;
  salaireBrut: number;
  totalCotisationsSalariales: number;
  totalCotisationsPatronales: number;
  brutImposable: number;
  fraisProfessionnels: number;
  netImposable: number;
  igr: number;
  retenuesBrute: number;
  netPayer: number;
  totalDesCouts: number;
  cotisationsDetails: CotisationDetail[];
  tauxCIMRSalarial?: number;
  tauxCIMRPatronal?: number;
}

// ─── Taux 2025 ──────────────────────────────────────────────────────────────

const TAUX_CNSS_SALARIAL = 4.48;
// CNSS patronale décomposée :
// - Vieillesse/invalidité/décès      : 8.98% plafonnée à 6 000 MAD
// - Prestations familiales           : 6.40% non plafonnée
// - IPE (perte d'emploi)             : 1.30% non plafonnée
// - Taxe de formation professionnelle: 1.60% non plafonnée
const TAUX_CNSS_PAT_VIE  = 8.98;   // plafonnée
const TAUX_CNSS_PAT_FAM  = 6.40;   // non plafonnée
const TAUX_CNSS_PAT_IPE  = 1.30;   // non plafonnée
const TAUX_CNSS_PAT_TFP  = 1.60;   // non plafonnée
const PLAFOND_CNSS = 6000;

const TAUX_AMO_SALARIAL = 2.26;   // taux salarié (2.26%)
const TAUX_AMO_PATRONAL = 4.11;   // taux patronal (4.11%)
// AMO : pas de plafond (appliqué sur le brut cotisable)

// Barème IR annuel 2025 (Loi de Finances 2023-2025)
const BAREME_IR = [
  { min: 0,       max: 40000,   taux: 0,  deduction: 0     },
  { min: 40000,   max: 60000,   taux: 10, deduction: 4000  },
  { min: 60000,   max: 80000,   taux: 20, deduction: 10000 },
  { min: 80000,   max: 100000,  taux: 30, deduction: 18000 },
  { min: 100000,  max: 180000,  taux: 34, deduction: 22000 },
  { min: 180000,  max: Infinity, taux: 38, deduction: 29200 },
];

// tauxPatronal = tauxSalarial × 1.30
const TAUX_CIMR_MAP: Record<string, { salarial: number; patronal: number }> = {
  TAUX_3_00:  { salarial: 3.00,  patronal: 3.90  },
  TAUX_3_75:  { salarial: 3.75,  patronal: 4.88  },
  TAUX_4_50:  { salarial: 4.50,  patronal: 5.85  },
  TAUX_5_25:  { salarial: 5.25,  patronal: 6.83  },
  TAUX_6_00:  { salarial: 6.00,  patronal: 7.80  },
  TAUX_7_00:  { salarial: 7.00,  patronal: 9.10  },
  TAUX_7_50:  { salarial: 7.50,  patronal: 9.75  },
  TAUX_8_00:  { salarial: 8.00,  patronal: 10.40 },
  TAUX_8_50:  { salarial: 8.50,  patronal: 11.05 },
  TAUX_9_00:  { salarial: 9.00,  patronal: 11.70 },
  TAUX_9_50:  { salarial: 9.50,  patronal: 12.35 },
  TAUX_10_00: { salarial: 10.00, patronal: 13.00 },
  TAUX_11_00: { salarial: 11.00, patronal: 14.30 },
  TAUX_12_00: { salarial: 12.00, patronal: 15.60 },
};

export const CIMR_OPTIONS_AL_KAMIL_TCNSS = Object.entries(TAUX_CIMR_MAP).map(
  ([key, val]) => ({ key, ...val })
);
export const CIMR_OPTIONS_AL_MOUNASSIB = CIMR_OPTIONS_AL_KAMIL_TCNSS.filter(
  (o) => o.salarial >= 6
);

// ─── Helpers CNSS ───────────────────────────────────────────────────────────

/**
 * Retourne les deux lignes CNSS pour cotisationsDetails :
 * 1. Vieillesse — salarial 4.48% + patronal 8.98% sur min(brutCotisable, 6000)
 * 2. Social (famille + IPE) — patronalOnly, 8.0% sur brutCotisable non plafonné
 */
function buildCnssCotisations(
  brutCotisable: number,
  baseCNSS: number          // = min(brutCotisable, PLAFOND_CNSS)
): CotisationDetail[] {
  const cnssSal  = r2((baseCNSS * TAUX_CNSS_SALARIAL) / 100);
  const cnssPat1 = r2((baseCNSS * TAUX_CNSS_PAT_VIE) / 100);
  const cnssPat2 = r2((brutCotisable * TAUX_CNSS_PAT_FAM) / 100);
  const cnssPat3 = r2((brutCotisable * TAUX_CNSS_PAT_IPE) / 100);
  const cnssPat4 = r2((brutCotisable * TAUX_CNSS_PAT_TFP) / 100);

  return [
    {
      code: "CNSS", libelle: "CNSS — Vieillesse",
      base: baseCNSS,
      tauxSalarial: TAUX_CNSS_SALARIAL, montantSalarial: cnssSal,
      tauxPatronal: TAUX_CNSS_PAT_VIE,  montantPatronal: cnssPat1,
    },
    {
      code: "CNSS", libelle: "CNSS — Prestations familiales",
      base: brutCotisable,
      tauxSalarial: 0, montantSalarial: 0,
      tauxPatronal: TAUX_CNSS_PAT_FAM,
      montantPatronal: cnssPat2,
      patronalOnly: true,
    },
    {
      code: "CNSS", libelle: "CNSS — IPE",
      base: brutCotisable,
      tauxSalarial: 0, montantSalarial: 0,
      tauxPatronal: TAUX_CNSS_PAT_IPE,
      montantPatronal: cnssPat3,
      patronalOnly: true,
    },
    {
      code: "CNSS", libelle: "CNSS — Taxe formation professionnelle",
      base: brutCotisable,
      tauxSalarial: 0, montantSalarial: 0,
      tauxPatronal: TAUX_CNSS_PAT_TFP,
      montantPatronal: cnssPat4,
      patronalOnly: true,
    },
  ];
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

function sumMontants(items: SimulationItem[] | undefined): number {
  return items?.reduce((s, i) => s + i.montant, 0) ?? 0;
}

function sumExonereCnssAmo(items: SimulationItem[] | undefined): number {
  return (
    items?.filter((i) => !i.cotisable).reduce((s, i) => s + i.montant, 0) ?? 0
  );
}

function sumExonereIR(items: SimulationItem[] | undefined): number {
  return (
    items?.filter((i) => !i.imposable).reduce((s, i) => s + i.montant, 0) ?? 0
  );
}

function fraisPro(brutImposable: number): number {
  if (brutImposable <= 6500) return Math.min(r2(brutImposable * 0.35), 2500);
  return Math.min(r2(brutImposable * 0.25), 2916.67);
}

function abattementFamilial(sf: SituationFamiliale, nbCharges: number): number {
  const total = nbCharges + (sf === "M" ? 1 : 0);
  return Math.min(total * 50, 300);
}

function calculateIGR(
  netImposable: number,
  sf: SituationFamiliale,
  nbCharges: number
): number {
  if (netImposable <= 0) return 0;
  const annuel = netImposable * 12;
  const tranche =
    BAREME_IR.find((t) => annuel <= t.max) ?? BAREME_IR[BAREME_IR.length - 1];
  const igrAnnuel = Math.max(
    0,
    r2((annuel * tranche.taux) / 100 - tranche.deduction)
  );
  const igrMensuel = r2(igrAnnuel / 12);
  return Math.max(0, r2(igrMensuel - abattementFamilial(sf, nbCharges)));
}

// Barème TAHFIZ mensuel direct (tranches mensuelles figées)
function calculateTAHFIZIR(
  sni: number,
  sf: SituationFamiliale,
  nbCharges: number
): number {
  if (sni <= 0) return 0;
  let irBrut = 0;
  if (sni <= 3333.33)      irBrut = 0;
  else if (sni <= 4166.67) irBrut = r2(sni * 0.10 - 333.33);
  else if (sni <= 5000)    irBrut = r2(sni * 0.20 - 750.0);
  else if (sni <= 6666.67) irBrut = r2(sni * 0.30 - 1250.0);
  else if (sni <= 15000)   irBrut = r2(sni * 0.34 - 1516.67);
  else                     irBrut = r2(sni * 0.38 - 2116.67);
  return Math.max(0, r2(irBrut - abattementFamilial(sf, nbCharges)));
}

function getCimrTaux(cfg: CimrConfig): { salarial: number; patronal: number } | null {
  return TAUX_CIMR_MAP[cfg.tauxSalarialOption] ?? null;
}

function cimrBase(brut: number, cfg: CimrConfig): number {
  return cfg.produit === "AL_MOUNASSIB" ? Math.max(0, brut - PLAFOND_CNSS) : brut;
}

function cimrSalarialAmt(brut: number, cfg: CimrConfig): number {
  const t = getCimrTaux(cfg);
  if (!t) return 0;
  return r2((cimrBase(brut, cfg) * t.salarial) / 100);
}

function cimrPatronalAmt(brut: number, cfg: CimrConfig): number {
  const t = getCimrTaux(cfg);
  if (!t) return 0;
  return r2((cimrBase(brut, cfg) * t.patronal) / 100);
}

// ─── ANAPEC ─────────────────────────────────────────────────────────────────

function calculateANAPEC(
  typeContrat: TypeContrat,
  salaireBrut: number,
  salaireBase: number,
  salaireBrutBase: number,
  totalPrimes: number,
  totalAvantages: number,
  retenuesBrute: number,
  sf: SituationFamiliale,
  nbCharges: number
): PayrollResult {
  const base: PayrollResult = {
    salaireBase,
    salaireBrutBase,
    totalPrimes,
    totalAvantages,
    salaireBrut,
    totalCotisationsSalariales: 0,
    totalCotisationsPatronales: 0,
    brutImposable: salaireBrut,
    fraisProfessionnels: 0,
    netImposable: salaireBrut,
    igr: 0,
    retenuesBrute,
    netPayer: Math.max(0, salaireBrut),
    totalDesCouts: salaireBrut,
    cotisationsDetails: [],
  };

  if (typeContrat === "ANAPEC_3") {
    const assietteFP = salaireBrutBase + totalPrimes;
    const fp = fraisPro(assietteFP);
    const sni = salaireBrut - fp;
    const igr = calculateIGR(sni, sf, nbCharges);
    const net = Math.max(0, salaireBrut - igr - totalAvantages);
    return { ...base, fraisProfessionnels: fp, netImposable: sni, igr, netPayer: net };
  }

  return base; // ANAPEC_1 & ANAPEC_2 : exonérés totalement
}

// ─── TAHFIZ ─────────────────────────────────────────────────────────────────

function calculateTAHFIZ(
  salaireBrut: number,
  salaireBase: number,
  salaireBrutBase: number,
  totalPrimes: number,
  totalAvantages: number,
  retenuesBrute: number,
  sf: SituationFamiliale,
  nbCharges: number,
  cimrConfig?: CimrConfig
): PayrollResult {
  // Salarial : CNSS + AMO sur le brut complet
  const baseCNSSSal = Math.min(salaireBrut, PLAFOND_CNSS);
  const cnssRowsTAH = buildCnssCotisations(salaireBrut, baseCNSSSal);
  const cnssSal     = cnssRowsTAH[0].montantSalarial;
  const amoSal      = r2((salaireBrut * TAUX_AMO_SALARIAL) / 100);

  const cimrTaux = cimrConfig ? getCimrTaux(cimrConfig) : null;
  const cimrSal  = cimrConfig && cimrTaux ? cimrSalarialAmt(salaireBrut, cimrConfig) : 0;
  const cimrPat  = cimrConfig && cimrTaux ? cimrPatronalAmt(salaireBrut, cimrConfig) : 0;

  const totalCotisationsSalariales = cnssSal + amoSal + cimrSal;

  // Patronal : exonération sur les 10 000 premiers DH
  const exonerationTAHFIZ = 10000;
  const basePatronale  = Math.max(0, salaireBrut - exonerationTAHFIZ);
  const baseCNSSPat    = Math.min(basePatronale, PLAFOND_CNSS);
  const cnssRowsPat    = buildCnssCotisations(basePatronale, baseCNSSPat);
  const cnssPat        = r2(cnssRowsPat.reduce((s, r) => s + r.montantPatronal, 0));
  const amoPat         = r2((basePatronale * TAUX_AMO_PATRONAL) / 100);
  const totalCotisationsPatronales = cnssPat + amoPat + cimrPat;

  // Base IR TAHFIZ = max(0, brut - 10 000)
  const sbi = Math.max(0, salaireBrut - exonerationTAHFIZ);
  let fp = 0;
  if (sbi > 0) {
    const assietteFP = Math.max(0, sbi - totalAvantages);
    fp = fraisPro(assietteFP);
  }
  const sni = Math.max(0, sbi - fp - totalCotisationsSalariales);
  const igr = sni > 0 ? calculateTAHFIZIR(sni, sf, nbCharges) : 0;
  const netPayer = Math.max(0, salaireBrut - totalCotisationsSalariales - igr - totalAvantages);

  const salaireBrutOriginal = salaireBrutBase + totalPrimes + totalAvantages;
  const totalDesCouts = r2(salaireBrutOriginal + totalCotisationsPatronales - totalAvantages);

  const cotisationsDetails: CotisationDetail[] = [
    ...cnssRowsTAH,
    { code: "AMO", libelle: "Cotisation AMO",
      base: salaireBrut, tauxSalarial: TAUX_AMO_SALARIAL, montantSalarial: amoSal,
      tauxPatronal: TAUX_AMO_PATRONAL, montantPatronal: amoPat },
  ];
  if (cimrConfig && cimrTaux) {
    cotisationsDetails.push({
      code: "CIMR", libelle: `CIMR ${cimrConfig.produit}`,
      base: cimrBase(salaireBrut, cimrConfig),
      tauxSalarial: cimrTaux.salarial, montantSalarial: cimrSal,
      tauxPatronal: cimrTaux.patronal, montantPatronal: cimrPat,
    });
  }

  return {
    salaireBase, salaireBrutBase, totalPrimes, totalAvantages, salaireBrut,
    totalCotisationsSalariales, totalCotisationsPatronales,
    brutImposable: sbi, fraisProfessionnels: fp, netImposable: sni,
    igr, retenuesBrute, netPayer, totalDesCouts, cotisationsDetails,
    tauxCIMRSalarial: cimrTaux?.salarial, tauxCIMRPatronal: cimrTaux?.patronal,
  };
}

// ─── Standard CDI / CDD ──────────────────────────────────────────────────────

function calculateGrossToNet(input: PayrollInput): PayrollResult {
  const salaireBase    = input.salaireBase ?? 0;
  const tauxActivite   = (input.tauxActivite ?? 100) / 100;
  const typeContrat    = input.typeContrat ?? "CDI";
  const sf             = input.situationFamiliale ?? "C";
  const nbCharges      = input.nombrePersonnesACharge ?? 0;
  const retenuesBrute  = input.retenuesBrute ?? 0;
  const primes         = input.primes ?? [];
  const avantages      = input.avantages ?? [];

  const salaireBrutBase = r2(salaireBase * tauxActivite);
  const totalPrimes     = r2(sumMontants(primes));
  const totalAvantages  = r2(sumMontants(avantages));
  const salaireBrut     = r2(salaireBrutBase + totalPrimes + totalAvantages - retenuesBrute);

  if (typeContrat.startsWith("ANAPEC")) {
    return calculateANAPEC(typeContrat, salaireBrut, salaireBase, salaireBrutBase,
      totalPrimes, totalAvantages, retenuesBrute, sf, nbCharges);
  }
  if (typeContrat === "TAHFIZ") {
    return calculateTAHFIZ(salaireBrut, salaireBase, salaireBrutBase,
      totalPrimes, totalAvantages, retenuesBrute, sf, nbCharges, input.cimrConfig);
  }

  // ── Cotisables CNSS/AMO/CIMR
  const exonereCnssAmo   = sumExonereCnssAmo(primes) + sumExonereCnssAmo(avantages);
  const brutCotisable    = salaireBrut - exonereCnssAmo;

  const baseCNSS    = Math.min(brutCotisable, PLAFOND_CNSS);
  const cnssRows    = buildCnssCotisations(brutCotisable, baseCNSS);
  const cnssSal     = cnssRows[0].montantSalarial;
  const cnssPat     = r2(cnssRows.reduce((s, r) => s + r.montantPatronal, 0));

  const amoSal      = r2((brutCotisable * TAUX_AMO_SALARIAL) / 100);
  const amoPat      = r2((brutCotisable * TAUX_AMO_PATRONAL) / 100);

  const cimrTaux    = input.cimrConfig ? getCimrTaux(input.cimrConfig) : null;
  const cimrSal     = input.cimrConfig && cimrTaux ? cimrSalarialAmt(brutCotisable, input.cimrConfig) : 0;
  const cimrPat     = input.cimrConfig && cimrTaux ? cimrPatronalAmt(brutCotisable, input.cimrConfig) : 0;

  const totalCotisationsSalariales  = r2(cnssSal + amoSal + cimrSal);
  const totalCotisationsPatronales  = r2(cnssPat + amoPat + cimrPat);

  // ── IR
  const exonereIR    = sumExonereIR(primes) + sumExonereIR(avantages);
  const brutImposable = salaireBrut - exonereIR;
  const fp            = fraisPro(brutImposable);
  const netImposable  = brutImposable - fp - totalCotisationsSalariales;
  const igr           = calculateIGR(netImposable, sf, nbCharges);

  const netPayer      = Math.max(0, r2(salaireBrut - totalCotisationsSalariales - igr));
  const salaireBrutOriginal = salaireBrutBase + totalPrimes + totalAvantages;
  const totalDesCouts = r2(salaireBrutOriginal + totalCotisationsPatronales);

  const cotisationsDetails: CotisationDetail[] = [
    ...cnssRows,
    { code: "AMO", libelle: "Cotisation AMO",
      base: brutCotisable, tauxSalarial: TAUX_AMO_SALARIAL, montantSalarial: amoSal,
      tauxPatronal: TAUX_AMO_PATRONAL, montantPatronal: amoPat },
  ];
  if (input.cimrConfig && cimrTaux) {
    cotisationsDetails.push({
      code: "CIMR", libelle: `CIMR ${input.cimrConfig.produit.replace("_", " ")}`,
      base: cimrBase(brutCotisable, input.cimrConfig),
      tauxSalarial: cimrTaux.salarial, montantSalarial: cimrSal,
      tauxPatronal: cimrTaux.patronal, montantPatronal: cimrPat,
    });
  }

  return {
    salaireBase, salaireBrutBase, totalPrimes, totalAvantages, salaireBrut,
    totalCotisationsSalariales, totalCotisationsPatronales,
    brutImposable, fraisProfessionnels: fp, netImposable,
    igr, retenuesBrute, netPayer, totalDesCouts, cotisationsDetails,
    tauxCIMRSalarial: cimrTaux?.salarial, tauxCIMRPatronal: cimrTaux?.patronal,
  };
}

// ─── Net → Brut (dichotomie) ─────────────────────────────────────────────────

function calculateNetToGross(input: NetToGrossInput): PayrollResult {
  const { netCible, ...rest } = input;
  const tolerance = 0.001;
  const maxIterations = 200;

  // baseMin = 0 (et non netCible) car des primes non-cotisables/non-imposables
  // peuvent rendre le salaireBase inférieur au net cible
  let baseMin = 0;
  let baseMax = netCible * 3;
  let bestResult: PayrollResult | null = null;

  for (let i = 0; i < maxIterations; i++) {
    const baseEstime = (baseMin + baseMax) / 2;
    const result = calculateGrossToNet({ ...rest, salaireBase: baseEstime });
    bestResult = result;
    const diff = result.netPayer - netCible;
    if (Math.abs(diff) < tolerance) break;
    if (diff > 0) baseMax = baseEstime;
    else baseMin = baseEstime;
  }

  if (bestResult) bestResult.netPayer = netCible;
  return bestResult!;
}

// ─── API publique ─────────────────────────────────────────────────────────────

export const payrollEngine = { calculateGrossToNet, calculateNetToGross };
