import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Marcador } from "@/components/Marcador";
import { FormSection } from "@/components/home/FormSection";
import { Hero } from "@/components/home/Hero";
import { Pasos } from "@/components/home/Pasos";
import { Problema } from "@/components/home/Problema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vender mi piso en Madrid: te digo en 24 h por qué no se vende",
  description:
    "¿Tu piso lleva meses en idealista o Fotocasa sin venderse? Mándame el enlace y te digo en 24 horas qué está fallando. Ester, agente inmobiliaria en Madrid.",
  alternates: { canonical: "/vender-mi-piso" },
};

/**
 * Destino de anuncios: misma oferta que la home, sin menú, sin bloques que distraigan
 * y un solo formulario.
 */
export default function VenderMiPisoPage() {
  return (
    <>
      <Nav minimal />
      <main>
        <Hero sinSecundario />
        <Problema />
        <Pasos />
        <FormSection origen="vender" />
      </main>
      <footer className="border-t border-linea bg-crema-oscuro/60 py-8 text-center text-xs text-tinta-suave">
        <p>
          {site.nombre} · <Marcador texto={site.legal.titular} /> · <Marcador texto={site.legal.nif} /> ·{" "}
          <a href={`mailto:${site.contacto.email}`} className="hover:text-ciruela">
            {site.contacto.email}
          </a>
        </p>
        <p className="mt-2 space-x-3">
          <Link href="/aviso-legal" className="hover:text-ciruela">Aviso legal</Link>
          <Link href="/privacidad" className="hover:text-ciruela">Privacidad</Link>
          <Link href="/cookies" className="hover:text-ciruela">Cookies</Link>
          <Link href="/" className="hover:text-ciruela">Ver la web completa</Link>
        </p>
      </footer>
    </>
  );
}
