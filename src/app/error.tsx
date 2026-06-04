"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="gradient-hero flex min-h-[60vh] items-center py-32">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-8xl font-bold text-white/10">500</div>
          <h1 className="text-3xl font-bold text-white">
            Une erreur s&apos;est produite
          </h1>
          <p className="max-w-md text-lg text-white/70">
            Quelque chose s&apos;est mal passé. Veuillez réessayer.
          </p>
          <div className="flex gap-4">
            <Button variant="white" size="lg" onClick={reset}>
              Réessayer
            </Button>
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                Accueil
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
