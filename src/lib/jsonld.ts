import { SITE_CONFIG } from "@/constants/site";

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BluePay",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Solution SaaS de gestion de la paie marocaine — CNSS, AMO, IR, bulletins automatisés.",
    url: SITE_CONFIG.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MAD",
      description: "Démo gratuite disponible sur demande",
    },
    provider: {
      "@type": "Organization",
      name: "BluePay",
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressLocality: "Casablanca",
      },
    },
    featureList: [
      "Calcul automatique CNSS, AMO, IR",
      "Gestion des bulletins de paie",
      "Déclarations sociales CNSS, CIMR, SIMPL-IR",
      "Multi-sociétés",
      "Gestion des absences et congés",
      "Reporting et tableaux de bord",
    ],
    inLanguage: "fr",
    audience: {
      "@type": "Audience",
      audienceType: "PME marocaines, Cabinets RH, Groupes multi-entités",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BluePay",
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
    },
    description:
      "Éditeur de logiciel de gestion de la paie marocaine — solution SaaS et On-Premise.",
    sameAs: [SITE_CONFIG.social.linkedin],
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contactez BluePay",
    url: `${SITE_CONFIG.url}/contact`,
    description: "Page de contact pour demander une démonstration de BluePay.",
    mainEntity: {
      "@type": "Organization",
      name: "BluePay",
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
    },
  };
}
