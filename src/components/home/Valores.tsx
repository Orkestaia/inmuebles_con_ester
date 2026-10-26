import { home } from "@/lib/site";

const ICONOS: Record<string, React.ReactNode> = {
  persona: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  casa: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v10h13V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.8 7.5 9 4.5-1.2 7.5-4.5 7.5-9V6L12 3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  estrella: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5z" />,
  manos: (
    <>
      <path d="M3 12.5 7.5 8h4l3 3-3 3-2.5-2.5" />
      <path d="M21 12.5 16.5 8h-2" />
      <path d="M8.5 14 12 17.5l3-3 3-3" />
    </>
  ),
};

/** Fila de cinco valores con iconos de trazo fino, como en la referencia de Ester. */
export function Valores() {
  return (
    <section className="border-y border-linea bg-blanco" aria-label="Cómo trabajo">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-linea px-4 py-8 sm:px-6 md:grid-cols-5 md:divide-x md:py-10">
        {home.valores.map((v) => (
          <li key={v.titulo} className="flex flex-col items-center px-3 py-4 text-center last:col-span-2 md:py-0 md:last:col-span-1">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-ciruela" aria-hidden="true">
              {ICONOS[v.icono]}
            </svg>
            <p className="mt-3 font-sans text-[15px] font-semibold text-ciruela">{v.titulo}</p>
            <p className="mt-1 text-sm leading-snug text-tinta-suave">{v.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
