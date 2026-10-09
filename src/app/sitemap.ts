import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const rutas: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/vender-mi-piso", priority: 0.9, changeFrequency: "monthly" },
    { path: "/comprar", priority: 0.7, changeFrequency: "monthly" },
    { path: "/vendidos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sobre-ester", priority: 0.7, changeFrequency: "yearly" },
    { path: "/guia-por-que-no-se-vende", priority: 0.8, changeFrequency: "monthly" },
    { path: "/aviso-legal", priority: 0.1, changeFrequency: "yearly" },
    { path: "/privacidad", priority: 0.1, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.1, changeFrequency: "yearly" },
  ];
  return rutas.map((r) => ({ url: absoluteUrl(r.path), lastModified: ahora, changeFrequency: r.changeFrequency, priority: r.priority }));
}
