const TIMEZONE_OFFSET = "+01:00";
/** Délai minimum avant le début du créneau (30 min = durée d'une démo) */
export const DEMO_SLOT_MIN_ADVANCE_MS = 30 * 60 * 1000;

export function parseDemoSlotStart(date: string, heure: string): Date {
  return new Date(`${date}T${heure}:00${TIMEZONE_OFFSET}`);
}

/** Créneau déjà passé ou trop proche de l'heure actuelle */
export function isDemoSlotTooSoon(
  date: string,
  heure: string,
  now: Date = new Date()
): boolean {
  const slotStart = parseDemoSlotStart(date, heure);
  const earliestStart = new Date(now.getTime() + DEMO_SLOT_MIN_ADVANCE_MS);
  return slotStart.getTime() <= earliestStart.getTime();
}

export function isDemoSlotBookable(
  date: string,
  heure: string,
  bookedSlots: string[] = [],
  now: Date = new Date()
): boolean {
  if (bookedSlots.includes(heure)) return false;
  return !isDemoSlotTooSoon(date, heure, now);
}
