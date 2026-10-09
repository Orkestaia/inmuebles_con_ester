import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WhatsAppFloat } from "@/components/WhatsAppLink";
import { Cierre } from "@/components/home/Cierre";
import { CompradorBloque } from "@/components/home/CompradorBloque";
import { Faq } from "@/components/home/Faq";
import { FormSection } from "@/components/home/FormSection";
import { Hero } from "@/components/home/Hero";
import { Pasos } from "@/components/home/Pasos";
import { Problema } from "@/components/home/Problema";
import { SobreResumen } from "@/components/home/SobreResumen";
import { VendidosPreview } from "@/components/home/VendidosPreview";
import { faqPage, JsonLd } from "@/lib/jsonld";
import { home } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Vendo pisos en Madrid que no se venden | Inmuebles con Ester" },
  description:
    "Si tu piso lleva meses en los portales, mándame el enlace y te digo en 24 horas qué está fallando. Sin compromiso. Ester, agente inmobiliaria en Madrid desde 2018.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPage(home.faq.lista)} />
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Pasos />
        <FormSection origen="home" />
        <VendidosPreview />
        <SobreResumen />
        <CompradorBloque />
        <Faq />
        <Cierre />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
