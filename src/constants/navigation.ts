export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Nos solutions", href: "/solutions" },
  { label: "Nos services", href: "/fonctionnalites" },
  { label: "Notre offre", href: "/pricing" },
  { label: "Simulateur de paie", href: "/simulateur" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Nos services", href: "/fonctionnalites" },
    { label: "Nos solutions", href: "/solutions" },
    { label: "Notre offre", href: "/pricing" },
    { label: "Simulateur de paie", href: "/simulateur" },
  ],
  company: [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "Réserver votre démo", href: "/contact?demo=true" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
} as const;
