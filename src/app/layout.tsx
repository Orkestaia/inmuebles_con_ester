import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { UtmCapture } from "@/components/UtmCapture";
import { JsonLd, realEstateAgent } from "@/lib/jsonld";
import { NOINDEX, site, SITE_URL } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vendo pisos en Madrid que no se venden | Inmuebles con Ester",
    template: "%s | Inmuebles con Ester",
  },
  description:
    "Si tu piso lleva meses en los portales, mándame el enlace y te digo en 24 horas qué está fallando. Ester, agente inmobiliaria en Madrid desde 2018.",
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
  themeColor: "#7A1F5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-ES" className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}>
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
