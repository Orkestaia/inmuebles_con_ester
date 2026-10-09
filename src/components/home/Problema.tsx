import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

export function Problema() {
  const p = home.problema;
  return (
    <Seccion id="vender" fondo="blanco">
      <Etiqueta className="text-ciruela">Lo que suele pasar</Etiqueta>
      <Titulo className="max-w-2xl text-tinta">{p.titulo}</Titulo>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {p.tarjetas.map((t, i) => (
          <article key={t.titulo} className="rounded-2xl border border-linea bg-crema p-6">
            <p className="font-display text-4xl text-rosa">0{i + 1}</p>
            <h3 className="mt-3 font-display text-xl leading-snug text-tinta">{t.titulo}</h3>
            <p className="mt-2 leading-relaxed text-tinta-suave">{t.texto}</p>
          </article>
        ))}
      </div>
    </Seccion>
  );
}
