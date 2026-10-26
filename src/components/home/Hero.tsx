import Image from "next/image";
import Link from "next/link";
import { Marcador } from "@/components/Marcador";
import { Etiqueta } from "@/components/Seccion";
import { home, site } from "@/lib/site";

const h = home.hero;

export function Hero({ sinSecundario = false }: { sinSecundario?: boolean }) {
  return (
    <section className="relative overflow-hidden papel">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[1fr_1fr] md:gap-10 md:pt-16 md:pb-20">
        <div className="order-last md:order-first">
          <Etiqueta className="text-ciruela">{h.eyebrow}</Etiqueta>
          <h1 className="font-display text-[2.2rem] leading-[1.1] tracking-tight text-ciruela sm:text-5xl md:text-[3.3rem]">{h.h1}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta-suave">{h.sub}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#formulario"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ciruela px-7 py-4 text-base font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro"
            >
              {h.ctaPrincipal}
            </Link>
            {!sinSecundario && (
              <Link href="#servicios" className="text-center text-[15px] font-semibold text-ciruela underline-offset-4 hover:underline">
                {h.ctaSecundario} →
              </Link>
            )}
          </div>
          <p className="mt-4 text-sm text-tinta-suave">{h.nota}</p>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-tinta-suave" aria-label="Por qué confiar">
            {h.confianza.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
                <Marcador texto={t} />
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-crema-oscuro shadow-[0_30px_60px_-30px_rgba(62,20,36,0.45)]">
            <Image
              src="/img/ester/ester-salon-sofa.jpg"
              alt={h.imagenAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 768px) 48vw, 92vw"
              quality={74}
              className="object-cover object-top"
            />
            <p className="absolute right-5 bottom-5 font-script text-3xl leading-tight text-blanco drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl">
              {site.lemaCorto} <span aria-hidden="true">♡</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
