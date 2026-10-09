import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PisoCard } from "@/components/PisoCard";
import { Etiqueta, Seccion, Titulo } from "@/components/Seccion";
import { WhatsAppFloat } from "@/components/WhatsAppLink";
import { breadcrumbs, JsonLd } from "@/lib/jsonld";
import { pisosData } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pisos vendidos en Madrid",
  description:
    "Viviendas que he vendido en Barrio del Pilar, Hortaleza, Valdezarza, Tetuán, Carabanchel y San Sebastián de los Reyes. Sin número de portal, por respeto a quienes viven ahora en ellas.",
  alternates: { canonical: "/vendidos" },
};

export default function VendidosPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Inicio", path: "/" }, { name: "Pisos vendidos", path: "/vendidos" }])} />
      <Nav />
      <main>
        <Seccion fondo="crema" className="!pb-8">
          <Etiqueta className="text-ciruela">Pisos vendidos</Etiqueta>
          <Titulo as="h1" className="max-w-2xl text-[2.1rem] text-tinta sm:text-5xl">Viviendas reales, en barrios reales.</Titulo>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-suave">
            Estas son algunas de las viviendas que he vendido en Madrid. Publico calle y barrio, nunca el número de portal, por respeto a quienes viven ahora en ellas. Cada una tenía su historia y su comprador.
          </p>
          <p className="mt-3 text-sm text-tinta-suave">Actualizado en {pisosData.actualizado}.</p>
        </Seccion>
        <Seccion fondo="blanco">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pisosData.pisos.map((p, i) => (
              <PisoCard key={p.slug} piso={p} mostrarPrecio={pisosData.mostrarPrecios} prioridad={i < 3} />
            ))}
          </div>
          <div className="mt-14 rounded-3xl bg-crema p-8 text-center sm:p-12">
            <Titulo className="text-tinta">¿El tuyo lleva meses sin venderse?</Titulo>
            <p className="mx-auto mt-3 max-w-xl text-tinta-suave">Mándame el enlace del anuncio y te digo en 24 horas qué está fallando. Sin compromiso.</p>
            <Link href="/#formulario" className="mt-6 inline-block rounded-full bg-ciruela px-7 py-4 font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro">
              Quiero saber por qué no se vende
            </Link>
          </div>
        </Seccion>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
