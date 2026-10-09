import site from "../../content/site.json";
import home from "../../content/home.json";
import pisosData from "../../content/pisos.json";
import sobre from "../../content/sobre-ester.json";
import comprar from "../../content/comprar.json";
import guia from "../../content/guia.json";

export { site, home, pisosData, sobre, comprar, guia };

export type Piso = (typeof pisosData.pisos)[number] & { fotoEtiqueta?: string };

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "true";
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

/** Enlace a WhatsApp con mensaje precargado, o null si Ester aún no ha dado el número. */
export function whatsappUrl(mensaje: string = site.whatsappMensaje): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

/** Marcador pendiente de Ester: "[Apellidos]", "[NIF]"… */
export function esMarcador(texto: string): boolean {
  return /^\[.*\]$/.test(texto.trim());
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const EUR = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function pisoTitulo(p: Piso): string {
  return p.distrito && p.distrito !== p.zona ? `${p.zona} (${p.distrito})` : p.zona;
}
