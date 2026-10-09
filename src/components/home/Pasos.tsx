import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

export function Pasos() {
  const p = home.pasos;
  return (
    <Seccion fondo="crema">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Etiqueta className="text-ciruela">Cómo trabajo</Etiqueta>
          <Titulo className="text-tinta">{p.titulo}</Titulo>
          <p className="mt-4 max-w-md leading-relaxed text-tinta-suave">
            Cuatro pasos, siempre conmigo. Sin comerciales por medio y sin sorpresas.
          </p>
        </div>
        <ol className="space-y-4">
          {p.lista.map((paso, i) => (
            <li key={paso.titulo} className="flex gap-5 rounded-2xl border border-linea bg-blanco p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ciruela font-display text-lg text-blanco" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl leading-snug text-tinta">{paso.titulo}</h3>
                <p className="mt-1.5 leading-relaxed text-tinta-suave">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Seccion>
  );
}
