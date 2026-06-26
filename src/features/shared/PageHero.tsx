"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export function PageHero({
  badge,
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-white pt-32 pb-12 lg:pt-40 lg:pb-16 border-b border-border",
        className
      )}
    >
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {breadcrumbs && (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 text-sm text-muted"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight size={14} className="text-border-dark" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-dark font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {badge && (
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {badge}
            </span>
          )}

          <h1 className="text-4xl font-bold tracking-tight text-dark lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
