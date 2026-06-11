"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        "bg-white/95 shadow-md backdrop-blur-md"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="BluePay"
              className="h-20 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? "text-primary"
                      : "text-dark hover:text-primary",
                    pathname === link.href && "active"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact">
              <Button
                variant="secondary"
                size="sm"
              >
                Nous contacter
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden",
              "text-dark hover:bg-surface"
            )}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-16 z-40 border-t border-border bg-white shadow-xl lg:hidden"
          >
            <Container>
              <ul className="flex flex-col py-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-2 py-3 text-base font-medium transition-colors border-b border-border/50 last:border-0",
                        pathname === link.href
                          ? "text-primary"
                          : "text-dark hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Link href="/contact" className="block">
                    <Button variant="primary" size="md" className="w-full">
                      Nous contacter
                    </Button>
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
