const DEMO_DURATION_MINUTES = 30;
const TIMEZONE = "Africa/Casablanca";
const TIMEZONE_OFFSET = "+01:00";

export interface DemoCalendarInput {
  date: string;
  heure: string;
  title?: string;
  description?: string;
  location?: string;
}

export interface DemoCalendarLinks {
  google: string;
  outlook: string;
  icsContent: string;
  icsFileName: string;
}

function parseDemoStart(date: string, heure: string): Date {
  return new Date(`${date}T${heure}:00${TIMEZONE_OFFSET}`);
}

function formatICSLocal(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";

  return `${get("year")}${get("month")}${get("day")}T${get("hour")}${get("minute")}${get("second")}`;
}

function formatICSUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeICS(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildDemoCalendarLinks(input: DemoCalendarInput): DemoCalendarLinks {
  const start = parseDemoStart(input.date, input.heure);
  const end = new Date(start.getTime() + DEMO_DURATION_MINUTES * 60 * 1000);

  const title = input.title ?? "Démonstration BluePay";
  const description =
    input.description ??
    "Votre démonstration BluePay (30 min). Notre équipe vous enverra le lien de réunion avant le rendez-vous.";
  const location = input.location ?? "En ligne";

  const startLocal = formatICSLocal(start);
  const endLocal = formatICSLocal(end);
  const startUtc = formatICSUtc(start);
  const endUtc = formatICSUtc(end);
  const uid = `demo-${input.date}-${input.heure.replace(":", "")}@bluepay.ma`;

  const google = new URL("https://calendar.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", title);
  google.searchParams.set("dates", `${startUtc}/${endUtc}`);
  google.searchParams.set("details", description);
  google.searchParams.set("location", location);

  const outlook = new URL("https://outlook.live.com/calendar/0/deeplink/compose");
  outlook.searchParams.set("path", "/calendar/action/compose");
  outlook.searchParams.set("rru", "addevent");
  outlook.searchParams.set("subject", title);
  outlook.searchParams.set("body", description);
  outlook.searchParams.set("location", location);
  outlook.searchParams.set("startdt", start.toISOString());
  outlook.searchParams.set("enddt", end.toISOString());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BluePay//Demo Booking//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatICSUtc(new Date())}`,
    `DTSTART;TZID=${TIMEZONE}:${startLocal}`,
    `DTEND;TZID=${TIMEZONE}:${endLocal}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    "ORGANIZER;CN=BluePay:mailto:contact@bluepay.ma",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return {
    google: google.toString(),
    outlook: outlook.toString(),
    icsContent,
    icsFileName: "demo-bluepay.ics",
  };
}

export function downloadICS(icsContent: string, fileName: string) {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
