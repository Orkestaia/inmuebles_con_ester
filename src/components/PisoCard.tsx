import Image from "next/image";
import { EUR, type Piso, pisoTitulo } from "@/lib/site";

export function PisoCard({ piso, mostrarPrecio, prioridad = false }: { piso: Piso; mostrarPrecio: boolean; prioridad?: boolean }) {
  const tieneTiempos = piso.mesesAntes != null && piso.mesesConEster != null;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-linea bg-blanco">
      {piso.foto && (
        <div className="relative aspect-[4/3] bg-crema-oscuro">
          <Image src={piso.foto} alt={piso.fotoAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" priority={prioridad} />
          {piso.fotoEtiqueta && (
            <span className="absolute top-3 left-3 rounded-full bg-tinta/80 px-3 py-1 text-xs font-semibold text-blanco">{piso.fotoEtiqueta}</span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight text-tinta">{pisoTitulo(piso)}</h3>
            <p className="mt-1 text-sm text-tinta-suave">{piso.calle}</p>
          </div>
          <span className="shrink-0 rounded-full bg-verde px-3 py-1 text-xs font-semibold tracking-wide text-blanco uppercase">Vendido</span>
        </div>
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-tinta">
          <div className="flex gap-1">
            <dt className="sr-only">Superficie</dt>
            <dd>{piso.m2} m²</dd>
          </div>
          <div className="flex gap-1">
            <dt className="sr-only">Dormitorios</dt>
            <dd>{piso.dormitorios} {piso.dormitorios === 1 ? "dormitorio" : "dormitorios"}</dd>
          </div>
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
