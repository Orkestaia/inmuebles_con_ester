import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Titulo } from "@/components/Seccion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recibido",
  robots: { index: false, follow: false },
};

const textos = {
  home: {
    titulo: "Recibido. Ya tengo tu anuncio.",
    texto: "Lo miro con calma y te escribo por WhatsApp en menos de 24 horas con tres cosas concretas que están frenando la venta. Si prefieres adelantar, escríbeme tú.",
  },
  vender: {
    titulo: "Recibido. Ya tengo tu anuncio.",
    texto: "Lo miro con calma y te escribo por WhatsApp en menos de 24 horas con tres cosas concretas que están frenando la venta. Si prefieres adelantar, escríbeme tú.",
  },
  comprar: {
    titulo: "Recibido. Ya sé qué buscas.",
    texto: "Te escribo en menos de 24 horas para concretar y empezar a buscar. Si quieres adelantar, escríbeme tú.",
  },
  guia: {
    titulo: "Recibido. Te llega al correo.",
    texto: "Revisa la bandeja de entrada (y la de promociones, por si acaso). Si has marcado que te llame, te escribo en menos de 24 horas.",
  },
};

export default async function GraciasPage({ searchParams }: { searchParams: Promise<{ o?: string }> }) {
  const { o } = await searchParams;
  const t = textos[(o as keyof typeof textos) ?? "home"] ?? textos.home;

  return (
    <>
      <Nav />
      <main className="flex flex-1 items-center bg-crema py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verde text-blanco" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <Titulo as="h1" className="mt-6 text-tinta">{t.titulo}</Titulo>
          <p className="mt-4 text-lg leading-relaxed text-tinta-suave">{t.texto}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppLink lugar="gracias" label="Escribirme por WhatsApp" className="rounded-full bg-verde px-7 py-4 font-semibold text-blanco transition-colors hover:brightness-95" />
            <a href={site.contacto.instagramUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-tinta/20 px-7 py-4 font-semibold text-tinta transition-colors hover:border-ciruela hover:text-ciruela">
              Seguirme en Instagram
            </a>
          </div>
          <p className="mt-10 text-sm text-tinta-suave">
            Mientras tanto, puedes leer{" "}
            <Link href="/guia-por-que-no-se-vende" className="text-ciruela underline underline-offset-2">
              los siete errores que frenan la venta de un piso
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
