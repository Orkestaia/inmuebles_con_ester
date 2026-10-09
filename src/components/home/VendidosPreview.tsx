import Link from "next/link";
import { PisoCard } from "@/components/PisoCard";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { home, pisosData } from "@/lib/site";

export function VendidosPreview() {
  const v = home.vendidos;
  const muestra = pisosData.pisos.slice(0, 4);
  return (
    <Seccion fondo="blanco">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Etiqueta className="text-ciruela">Pisos vendidos</Etiqueta>
          <Titulo className="text-tinta">{v.titulo}</Titulo>
          <p className="mt-3 max-w-lg leading-relaxed text-tinta-suave">{v.texto}</p>
        </div>
        <Link href="/vendidos" className="shrink-0 font-semibold text-ciruela underline-offset-4 hover:underline">
          {v.enlace} →
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {muestra.map((p) => (
          <PisoCard key={p.slug} piso={p} mostrarPrecio={pisosData.mostrarPrecios} />
        ))}
      </div>
    </Seccion>
  );
}
