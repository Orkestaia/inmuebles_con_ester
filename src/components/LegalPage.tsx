import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Etiqueta } from "@/components/Seccion";

export function LegalPage({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="bg-crema">
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
          <Etiqueta className="text-ciruela">Información legal</Etiqueta>
          <h1 className="font-display text-3xl leading-tight text-tinta sm:text-4xl">{titulo}</h1>
          <p className="mt-3 text-sm text-tinta-suave">Última actualización: {actualizado}</p>
          <div className="legal-prose mt-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
