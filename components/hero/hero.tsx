import Link from "next/link";
import { getSession } from "@/lib/auth/auth";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

async function HeroContent() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center gap-4">
      <Link href={session?.user ? "/dashboard" : "/auth"}>
        <Button
          size="lg"
          variant="secondary"
          className="h-12 px-8 text-lg font-medium"
        >
          {session?.user ? "Dashboard" : "Comece grátis"}{" "}
          <ArrowRight className="ml-2" />
        </Button>
      </Link>

      <p className="text-sm text-muted-foreground">
        100% gratuito. Sem cartão.
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="container mx-auto px-4 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-secondary mb-6 text-6xl font-bold">
            Uma maneira melhor de acompanhar suas candidaturas.
          </h1>
          <p className="text-muted-foreground mb-10 text-xl">
            Registre, organize e gerencie sua busca por emprego em um só lugar.
          </p>

          <Suspense fallback={<p>loading...</p>}>
            <HeroContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
