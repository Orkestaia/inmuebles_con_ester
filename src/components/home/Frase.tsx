import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

/** Banda con el lema de Ester sobre papel: «Una experiencia tan personal como tu hogar». */
export function Frase() {
  return (
    <section className="papel border-y border-linea">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <Logo tamano="nav" className="pointer-events-none" />
        <p className="mt-8 font-display text-3xl leading-tight text-ciruela-oscuro italic sm:text-4xl md:text-5xl">{site.frase}</p>
      </div>
    </section>
  );
}
