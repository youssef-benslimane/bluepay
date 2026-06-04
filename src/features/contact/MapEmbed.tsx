import { GOOGLE_MAPS_EMBED_URL } from "@/data/contact";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border [box-shadow:var(--shadow-card)]">
      <iframe
        src={GOOGLE_MAPS_EMBED_URL}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation BluePay — Casablanca, Maroc"
      />
    </div>
  );
}
