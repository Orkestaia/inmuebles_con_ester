import { Marcador } from "@/components/Marcador";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

export function Faq() {
  const f = home.faq;
  return (
    <Seccion fondo="blanco" id="preguntas">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Etiqueta className="text-ciruela">Preguntas frecuentes</Etiqueta>
          <Titulo className="text-tinta">{f.titulo}</Titulo>
        </div>
        <div className="divide-y divide-linea rounded-2xl border border-linea">
          {f.lista.map((item, i) => (
            <details key={item.q} className="group px-5 py-4 sm:px-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-tinta marker:content-none">
                <span>{item.q}</span>
                <span aria-hidden="true" className="shrink-0 text-ciruela transition-transform group-open:rotate-45">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-tinta-suave">
                <Marcador texto={item.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
