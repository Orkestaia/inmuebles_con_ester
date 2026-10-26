import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WhatsAppFloat } from "@/components/WhatsAppLink";
import { Acompano } from "@/components/home/Acompano";
import { Cierre } from "@/components/home/Cierre";
import { CompradorBloque } from "@/components/home/CompradorBloque";
import { Faq } from "@/components/home/Faq";
import { FormSection } from "@/components/home/FormSection";
import { Frase } from "@/components/home/Frase";
import { Hero } from "@/components/home/Hero";
import { Pasos } from "@/components/home/Pasos";
import { Problema } from "@/components/home/Problema";
import { SobreResumen } from "@/components/home/SobreResumen";
import { Valores } from "@/components/home/Valores";
import { VendidosPreview } from "@/components/home/VendidosPreview";
import { faqPage, JsonLd } from "@/lib/jsonld";
import { home } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Vender tu casa en Madrid con Ester | Inmuebles con Ester" },
  description:
    "¿Quieres vender tu casa en Madrid? Soy Ester, agente inmobiliaria independiente desde 2018. Si tu piso lleva meses en los portales, te digo en 24 horas qué está fallando. Sin compromiso.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPage(home.faq.lista)} />
      <Nav />
      <main>
        <Hero />
        <Valores />
        <Acompano />
        <Problema />
        <Pasos />
        <FormSection origen="home" />
        <VendidosPreview />
        <Frase />
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
