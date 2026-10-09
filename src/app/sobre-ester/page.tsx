import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Marcador } from "@/components/Marcador";
import { Nav } from "@/components/Nav";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { WhatsAppFloat, WhatsAppLink } from "@/components/WhatsAppLink";
import { breadcrumbs, JsonLd, personEster } from "@/lib/jsonld";
import { sobre } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Ester, agente inmobiliaria en Madrid desde 2018",
  description:
    "Empecé en 2018 de la mano de mi tía. Acompaño a propietarios que quieren vender y a personas que buscan casa en Madrid. Soy yo quien está al otro lado del teléfono.",
  alternates: { canonical: "/sobre-ester" },
  openGraph: { images: [{ url: "/img/ester/ester-sobre.jpg", width: 1100, height: 1440 }] },
};

export default function SobreEsterPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...personEster }} />
      <JsonLd data={breadcrumbs([{ name: "Inicio", path: "/" }, { name: "Sobre Ester", path: "/sobre-ester" }])} />
      <Nav />
      <main>
        <section className="bg-crema">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[0.75fr_1.25fr] md:gap-16 md:pt-16 md:pb-20">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] bg-crema-oscuro md:sticky md:top-24 md:max-w-sm">
              <Image src="/img/ester/ester-sobre.jpg" alt={sobre.imagenAlt} fill priority sizes="(min-width: 768px) 35vw, 80vw" className="object-cover object-top" />
            </div>
            <div>
              <Etiqueta className="text-ciruela">Sobre Ester</Etiqueta>
              <Titulo as="h1" className="text-[2.1rem] text-tinta sm:text-5xl">{sobre.titulo}</Titulo>
              <p className="mt-5 text-lg leading-relaxed text-tinta">
                <Marcador texto={sobre.intro} />
              </p>
              <div className="mt-10 space-y-10">
                {sobre.secciones.map((s) => (
                  <section key={s.titulo}>
                    <h2 className="font-display text-2xl text-tinta">{s.titulo}</h2>
                    {s.parrafos.map((p) => (
                      <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-tinta-suave">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Seccion fondo="ciruela">
          <div className="mx-auto max-w-3xl text-center">
            <Titulo className="text-blanco">¿Hablamos de tu piso?</Titulo>
            <p className="mt-4 text-lg text-blanco/85">Mándame el enlace de tu anuncio o escríbeme directamente. Te contesto yo.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#formulario" className="rounded-full bg-blanco px-7 py-4 font-semibold text-ciruela transition-colors hover:bg-crema">
                Quiero saber por qué no se vende
              </Link>
              <WhatsAppLink lugar="sobre-ester" label="Escribirme por WhatsApp" className="rounded-full border border-blanco/40 px-7 py-4 font-semibold text-blanco transition-colors hover:border-blanco" />
            </div>
          </div>
        </Seccion>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
