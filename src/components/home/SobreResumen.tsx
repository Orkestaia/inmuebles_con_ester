import Image from "next/image";
import Link from "next/link";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

export function SobreResumen() {
  const s = home.sobre;
  return (
    <Seccion fondo="crema">
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] bg-crema-oscuro md:max-w-sm">
          <Image src="/img/ester/ester-sobre.jpg" alt={s.imagenAlt} fill sizes="(min-width: 768px) 35vw, 80vw" className="object-cover object-top" />
        </div>
        <div>
          <Etiqueta className="text-ciruela">Quién está al otro lado</Etiqueta>
          <Titulo className="text-tinta">{s.titulo}</Titulo>
          <p className="mt-5 text-lg leading-relaxed text-tinta-suave">{s.texto}</p>
          <Link href="/sobre-ester" className="mt-6 inline-block font-semibold text-ciruela underline-offset-4 hover:underline">
            {s.enlace} →
          </Link>
        </div>
      </div>
    </Seccion>
  );
}
