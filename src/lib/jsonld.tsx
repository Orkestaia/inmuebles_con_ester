import { limpiar } from "@/lib/llms";
import { absoluteUrl, esMarcador, site, SITE_URL } from "@/lib/site";

const telefono = esMarcador(site.contacto.telefonoVisible) ? undefined : site.contacto.telefonoVisible;
const nombreCompleto = esMarcador(site.ester.apellidos)
  ? site.ester.nombre
  : `${site.ester.nombre} ${site.ester.apellidos}`;

export const personEster = {
  "@type": "Person",
  "@id": `${SITE_URL}/sobre-ester#ester`,
  name: nombreCompleto,
  givenName: site.ester.nombre,
  jobTitle: "Agente inmobiliaria",
  url: absoluteUrl("/sobre-ester"),
  image: absoluteUrl("/img/ester/ester-sobre.jpg"),
  sameAs: [site.contacto.instagramUrl],
  worksFor: { "@id": `${SITE_URL}/#agencia` },
};

export const realEstateAgent = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#agencia`,
  name: site.nombre,
  description: site.descripcionEntidad,
  url: SITE_URL,
  image: absoluteUrl("/img/og.jpg"),
  logo: absoluteUrl("/icon-512.png"),
  email: site.contacto.email,
  ...(telefono ? { telephone: telefono } : {}),
  foundingDate: String(site.ester.desde),
  founder: personEster,
  areaServed: [
    { "@type": "City", name: "Madrid" },
    ...site.zonas.map((z) => ({ "@type": "Place", name: `${z}, Madrid` })),
  ],
  address: { "@type": "PostalAddress", addressLocality: "Madrid", addressRegion: "Madrid", addressCountry: "ES" },
  priceRange: "Comisión sobre el precio de venta",
  knowsLanguage: "es",
  sameAs: [site.contacto.instagramUrl],
};

export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: limpiar(i.a) },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD es texto estático generado en build; no entra contenido de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
