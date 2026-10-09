import type { MetadataRoute } from "next";
import { absoluteUrl, NOINDEX } from "@/lib/site";

export const dynamic = "force-static";

const BOTS_IA = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Bingbot", "Applebot", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    // Mientras viva en *.vercel.app sin dominio propio: nada se indexa.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/gracias"] },
      ...BOTS_IA.map((ua) => ({ userAgent: ua, allow: "/", disallow: ["/api/", "/gracias"] })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
