import Image from "next/image";
import Link from "next/link";
import { Etiqueta, Titulo } from "@/components/Seccion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { home } from "@/lib/site";

/** Banda de cierre en vino con foto desenfocada, como en la referencia de Ester. */
export function Cierre() {
  const c = home.cierre;
  return (
    <section className="relative overflow-hidden bg-vino-noche text-blanco">
      <Image src="/img/fondo-cierre.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-vino-noche via-vino-noche/85 to-vino-noche/40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_0.7fr] md:py-20">
        <div>
          <Etiqueta className="text-rosa">{c.eyebrow}</Etiqueta>
          <Titulo className="text-blanco">{c.titulo}</Titulo>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-blanco/85">{c.texto}</p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-center">
          <Link href="#formulario" className="inline-flex items-center gap-2 rounded-lg border border-blanco/70 px-7 py-4 font-semibold text-blanco transition-colors hover:bg-blanco hover:text-ciruela">
            {c.boton}
          </Link>
          <WhatsAppLink lugar="cierre" label={c.botonWhatsapp} icono className="inline-flex items-center gap-2 text-sm text-blanco/85 underline-offset-4 hover:underline" />
          <p className="text-sm text-blanco/70">{c.nota}</p>
        </div>
      </div>
    </section>
  );
}
