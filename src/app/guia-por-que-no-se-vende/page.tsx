import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { WhatsAppFloat } from "@/components/WhatsAppLink";
import { GuideForm } from "@/components/form/GuideForm";
import { breadcrumbs, faqPage, JsonLd } from "@/lib/jsonld";
import { guia } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Por qué no se vende mi piso? 7 errores que lo frenan",
  description:
    "Siete errores que veo una y otra vez en anuncios que llevan meses en idealista y Fotocasa, y qué haría yo en cada caso. Guía en PDF gratis.",
  alternates: { canonical: "/guia-por-que-no-se-vende" },
};

export default function GuiaPage() {
  return (
    <>
      <JsonLd data={faqPage(guia.errores)} />
      <JsonLd data={breadcrumbs([{ name: "Inicio", path: "/" }, { name: "Guía: por qué no se vende mi piso", path: "/guia-por-que-no-se-vende" }])} />
      <Nav />
      <main>
        <Seccion fondo="crema" className="!pb-10">
          <Etiqueta className="text-ciruela">Guía gratuita</Etiqueta>
          <Titulo as="h1" className="max-w-3xl text-[2.1rem] text-tinta sm:text-5xl">{guia.titulo}</Titulo>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-tinta-suave">{guia.sub}</p>
          <p className="mt-3 text-sm text-tinta-suave">Actualizado en {guia.actualizado}.</p>
          <a href="#formulario" className="mt-8 inline-block rounded-full bg-ciruela px-7 py-4 font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro">
            Llevarme la guía en PDF
          </a>
        </Seccion>

        <Seccion fondo="blanco">
          <div className="mx-auto max-w-3xl space-y-12 guia-prose">
            {guia.errores.map((e, i) => (
              <article key={e.q}>
                <p className="font-display text-4xl text-rosa-oscuro">0{i + 1}</p>
                <h2 className="mt-2 font-display text-2xl leading-snug text-tinta sm:text-3xl">{e.q}</h2>
                <p className="mt-4 text-lg">{e.a}</p>
              </article>
            ))}
          </div>
        </Seccion>

        <section className="bg-ciruela py-16 text-blanco sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <div>
              <Etiqueta className="text-rosa">En PDF</Etiqueta>
              <Titulo className="text-blanco">{guia.formulario.titulo}</Titulo>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-blanco/85">{guia.formulario.intro}</p>
            </div>
            <div className="rounded-3xl bg-crema p-5 text-tinta sm:p-8">
              <GuideForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
