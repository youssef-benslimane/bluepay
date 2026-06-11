import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "./Container";
import { FOOTER_LINKS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/80">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">Blue</span>
              <span className="text-white">Pay</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              La solution SaaS de gestion de la paie conçue pour les entreprises
              marocaines.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={14} className="shrink-0 text-primary" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={14} className="shrink-0 text-primary" />
                {SITE_CONFIG.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-primary" />
                {SITE_CONFIG.address}
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Produit
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Suivez-nous
            </h3>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-primary/40 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-primary"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Légal
              </h3>
              <ul className="flex flex-col gap-2">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-sm text-white/40 sm:flex-row">
          <p>© {year} BluePay. Tous droits réservés.</p>
          <p>
            Solution de paie marocaine
          </p>
        </div>
      </Container>
    </footer>
  );
}
