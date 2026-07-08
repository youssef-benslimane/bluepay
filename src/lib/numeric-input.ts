export function sanitizeDecimalInput(raw: string): string {
  let value = raw.replace(/[^\d.,]/g, "");
  const sepMatch = value.match(/[.,]/);

  if (sepMatch && sepMatch.index !== undefined) {
    const sep = sepMatch[0];
    const parts = value.split(/[.,]/);
    value = `${parts[0]}${sep}${parts.slice(1).join("")}`;
  }

  return value;
}

export function sanitizeIntegerInput(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function parseDecimalField(value: unknown): number {
  if (typeof value === "number") return value;
  const normalized = String(value ?? "").replace(/\s/g, "").replace(",", ".");
  if (!normalized) return NaN;
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function parseIntegerField(value: unknown): number {
  if (typeof value === "number") return value;
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return NaN;
  return Number.parseInt(digits, 10);
}
