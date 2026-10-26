import { LeadForm } from "@/components/form/LeadForm";
import { Etiqueta, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

export function FormSection({ origen = "home" }: { origen?: "home" | "vender" }) {
  const f = home.formulario;
  return (
    <section id="formulario-seccion" className="bg-ciruela py-16 text-blanco sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div>
          <Etiqueta className="text-rosa">{f.eyebrow}</Etiqueta>
          <Titulo className="text-blanco">{f.titulo}</Titulo>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-blanco/85">{f.intro}</p>
          <ul className="mt-8 space-y-3 text-blanco/85">
            {f.puntos.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dorado" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-crema p-5 text-tinta sm:p-8">
          <LeadForm origen={origen} />
        </div>
      </div>
    </section>
  );
}
