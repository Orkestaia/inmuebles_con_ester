import Image from "next/image";
import { Llave } from "@/components/Logo";
import { EUR, type Piso, pisoTitulo } from "@/lib/site";

export function PisoCard({ piso, mostrarPrecio, prioridad = false }: { piso: Piso; mostrarPrecio: boolean; prioridad?: boolean }) {
  const tieneTiempos = piso.mesesAntes != null && piso.mesesConEster != null;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-linea bg-blanco">
      <div className="relative aspect-[4/3] bg-crema-oscuro">
        {piso.foto ? (
          <Image src={piso.foto} alt={piso.fotoAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" priority={prioridad} />
        ) : (
          <div className="papel flex h-full w-full flex-col items-center justify-center gap-2 text-ciruela/70" aria-hidden="true">
            <Llave className="h-5 w-10" />
            <span className="font-display text-sm tracking-[0.2em] uppercase">{piso.zona}</span>
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-md bg-ciruela px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-blanco uppercase">Vendido</span>
        {piso.fotoEtiqueta && piso.foto && (
          <span className="absolute top-3 right-3 rounded-md bg-tinta/75 px-2.5 py-1 text-[11px] font-semibold text-blanco">{piso.fotoEtiqueta}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-tight text-ciruela">{pisoTitulo(piso)}</h3>
        <p className="mt-1 text-sm text-tinta-suave">{piso.calle}</p>
        <dl className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-tinta">
          <div className="flex gap-1">
            <dt className="sr-only">Dormitorios</dt>
            <dd>{piso.dormitorios} {piso.dormitorios === 1 ? "dormitorio" : "dormitorios"}</dd>
          </div>
          <span aria-hidden="true" className="text-linea">·</span>
          <div className="flex gap-1">
            <dt className="sr-only">Superficie</dt>
            <dd>{piso.m2} m²</dd>
          </div>
          <span aria-hidden="true" className="text-linea">·</span>
          <div className="flex gap-1">
            <dt className="sr-only">Baños</dt>
            <dd>{piso.banos} {piso.banos === 1 ? "baño" : "baños"}</dd>
          </div>
        </dl>
        {piso.detalles && <p className="mt-2 text-sm text-tinta-suave">{piso.detalles}</p>}
        {tieneTiempos && (
          <p className="mt-3 text-sm text-tinta">
            Llevaba <strong>{piso.mesesAntes} meses</strong> a la venta. Vendido en <strong>{piso.mesesConEster} meses</strong>.
          </p>
        )}
        {mostrarPrecio && piso.precio && <p className="mt-auto pt-4 font-display text-lg text-ciruela">{EUR.format(piso.precio)}</p>}
      </div>
    </article>
  );
}
