import Link from "next/link";
import { Titulo } from "@/components/Seccion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { home } from "@/lib/site";

export function Cierre() {
  const c = home.cierre;
  return (
    <section className="bg-crema py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Titulo className="text-tinta">{c.titulo}</Titulo>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="#formulario" className="rounded-full bg-ciruela px-7 py-4 font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro">
            {c.boton}
          </Link>
          <WhatsAppLink lugar="cierre" label={c.botonWhatsapp} className="rounded-full border border-tinta/20 px-7 py-4 font-semibold text-tinta transition-colors hover:border-ciruela hover:text-ciruela" />
        </div>
      </div>
    </section>
  );
}
