import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inmuebles con Ester",
    short_name: "Ester",
    description: "Agente inmobiliaria independiente en Madrid. Vendo pisos que llevan meses sin venderse.",
    start_url: "/",
    display: "browser",
    background_color: "#FAF6F2",
    theme_color: "#7A1F5C",
    lang: "es-ES",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
