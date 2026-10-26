import Image from "next/image";
import Link from "next/link";
import { Etiqueta, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

const a = home.acompano;

/** Foto a la izquierda + texto: «Un servicio exclusivo, antes, durante y después». */
export function Acompano() {
  return (
    <section className="bg-crema">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-14 md:py-24">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-crema-oscuro">
          <Image src="/img/ester/ester-salon-sonrisa.jpg" alt={a.imagenAlt} fill sizes="(min-width: 768px) 50vw, 92vw" className="object-cover object-top" />
        </div>
        <div>
          <Etiqueta className="text-ciruela">{a.eyebrow}</Etiqueta>
          <Titulo className="text-ciruela">{a.titulo}</Titulo>
          <p className="mt-5 text-lg leading-relaxed text-tinta-suave">{a.texto}</p>
          <Link href="#servicios" className="mt-7 inline-block rounded-lg border border-ciruela px-6 py-3.5 font-semibold text-ciruela transition-colors hover:bg-ciruela hover:text-blanco">
            {a.boton} →
          </Link>
        </div>
      </div>
    </section>
  );
}
