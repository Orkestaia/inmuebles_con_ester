import Image from "next/image";
import Link from "next/link";
import { Marcador } from "@/components/Marcador";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { home } from "@/lib/site";

const h = home.hero;

export function Hero({ sinSecundario = false }: { sinSecundario?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-crema">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pt-16 md:pb-24">
        <div className="relative order-first mx-auto w-full max-w-sm md:order-last md:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-crema-oscuro">
            <Image
              src="/img/ester/ester-hero.jpg"
              alt={h.imagenAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 768px) 45vw, 90vw"
              quality={72}
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-3 left-4 rounded-full bg-blanco px-4 py-2 text-sm font-semibold text-ciruela shadow-md md:left-8">
            Ester · Madrid
          </div>
        </div>

        <div>
          <h1 className="font-display text-[2.1rem] leading-[1.08] tracking-tight text-tinta sm:text-5xl md:text-[3.4rem]">{h.h1}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta-suave">{h.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#formulario"
              className="rounded-full bg-ciruela px-7 py-4 text-center text-base font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro"
            >
              {h.ctaPrincipal}
            </Link>
            {!sinSecundario && (
              <WhatsAppLink
                lugar="hero"
                label={h.ctaSecundario}
                className="rounded-full border border-tinta/20 px-7 py-4 text-center text-base font-semibold text-tinta transition-colors hover:border-ciruela hover:text-ciruela"
              />
            )}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-tinta-suave" aria-label="Por qué confiar">
            {h.confianza.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ciruela" />
                <Marcador texto={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
