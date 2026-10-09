import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { WhatsAppFloat } from "@/components/WhatsAppLink";
import { BuyerForm } from "@/components/form/BuyerForm";
import { breadcrumbs, JsonLd } from "@/lib/jsonld";
import { comprar } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personal shopper inmobiliario en Madrid: busco la casa que necesitas",
  description:
    "Si llevas tiempo buscando piso en Madrid y no encuentras lo que quieres, cuéntame qué necesitas. Busco, filtro y te acompaño hasta la firma.",
  alternates: { canonical: "/comprar" },
};

export default function ComprarPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Inicio", path: "/" }, { name: "Comprar", path: "/comprar" }])} />
      <Nav />
      <main>
        <section className="bg-crema">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pt-16 md:pb-20">
            <div>
              <Etiqueta className="text-ciruela">Para compradores</Etiqueta>
              <Titulo as="h1" className="text-[2.1rem] text-tinta sm:text-5xl">{comprar.titulo}</Titulo>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta-suave">{comprar.sub}</p>
              <a href="#formulario" className="mt-8 inline-block rounded-full bg-ciruela px-7 py-4 font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro">
                Contarle a Ester qué busco
              </a>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] bg-crema-oscuro md:max-w-sm">
              <Image src="/img/ester/ester-sonrisa.jpg" alt="Ester sonriendo, con americana ciruela y pañuelo" fill priority sizes="(min-width: 768px) 40vw, 80vw" className="object-cover object-top" />
            </div>
          </div>
        </section>

        <Seccion fondo="blanco">
          <Titulo className="text-tinta">{comprar.comoTrabajo.titulo}</Titulo>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {comprar.comoTrabajo.pasos.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-linea bg-crema p-6">
                <span className="font-display text-4xl text-rosa-oscuro">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl text-tinta">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-tinta-suave">{p.texto}</p>
              </li>
            ))}
          </ol>
        </Seccion>

        <section className="bg-ciruela py-16 text-blanco sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <div>
              <Etiqueta className="text-rosa">Sin compromiso</Etiqueta>
              <Titulo className="text-blanco">{comprar.formulario.titulo}</Titulo>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-blanco/85">{comprar.formulario.intro}</p>
            </div>
            <div className="rounded-3xl bg-crema p-5 text-tinta sm:p-8">
              <BuyerForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
