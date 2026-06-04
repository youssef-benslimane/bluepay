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
        "gradient-hero relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
      </div>

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
              className="flex items-center gap-1 text-sm text-white/60"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight size={14} className="text-white/40" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {badge && (
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
              {badge}
            </span>
          )}

          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-lg leading-relaxed text-white/75">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
