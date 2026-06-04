import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="gradient-hero flex min-h-[60vh] items-center py-32">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-8xl font-bold text-white/10">404</div>
          <h1 className="text-3xl font-bold text-white">Page introuvable</h1>
          <p className="max-w-md text-lg text-white/70">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link href="/">
            <Button variant="white" size="lg">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
