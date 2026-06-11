export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Nos Solutions", href: "/solutions" },
  { label: "Nos Fonctionnalités", href: "/fonctionnalites" },
  { label: "Nos Tarifs", href: "/pricing" },
  { label: "Simulateur", href: "/simulateur" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Nos Fonctionnalités", href: "/fonctionnalites" },
    { label: "Nos Solutions", href: "/solutions" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Simulateur de paie", href: "/simulateur" },
  ],
  company: [
    { label: "À propos", href: "/#presentation" },
    { label: "Contact", href: "/contact" },
    { label: "Demander une démo", href: "/contact?demo=true" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
} as const;
