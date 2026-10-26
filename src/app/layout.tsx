import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { UtmCapture } from "@/components/UtmCapture";
import { JsonLd, realEstateAgent } from "@/lib/jsonld";
import { NOINDEX, site, SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vender tu casa en Madrid con Ester | Inmuebles con Ester",
    template: "%s | Inmuebles con Ester",
  },
  description:
    "Soy Ester, agente inmobiliaria independiente en Madrid desde 2018. Si tu piso lleva meses en los portales, mándame el enlace y te digo en 24 horas qué está fallando.",
  applicationName: site.nombre,
  authors: [{ name: "Ester", url: `${SITE_URL}/sobre-ester` }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.nombre,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Inmuebles con Ester" }],
  },
  twitter: { card: "summary_large_image" },
  robots: NOINDEX ? { index: false, follow: false } : { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#6E2A46",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-ES" className={`${playfair.variable} ${script.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={realEstateAgent} />
        {children}
        <CookieBanner />
        <Analytics />
        <UtmCapture />
      </body>
    </html>
  );
}
