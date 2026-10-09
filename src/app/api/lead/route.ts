import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ───────────── Validación ───────────── */

const telefono = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s.\-()]/g, ""))
  .refine((v) => /^(\+34|0034|34)?[6-9]\d{8}$/.test(v), "Teléfono no válido")
  .transform((v) => `+34${v.replace(/^(\+34|0034|34)/, "")}`);

const comun = {
  nombre: z.string().trim().min(2).max(80),
  telefono,
  consiente_contacto: z.literal(true),
  web: z.string().max(0).optional().or(z.literal("")), // honeypot: debe venir vacío
  turnstile_token: z.string().nullable().optional(),
  event_id: z.string().min(8).max(64),
  consent_marketing: z.boolean().default(false),
  fbp: z.string().max(100).optional(),
  fbc: z.string().max(200).optional(),
  page: z.string().max(200).optional(),
  utm: z
    .object({
      utm_source: z.string().max(200).optional(),
      utm_medium: z.string().max(200).optional(),
      utm_campaign: z.string().max(200).optional(),
      utm_content: z.string().max(200).optional(),
      utm_term: z.string().max(200).optional(),
      fbclid: z.string().max(200).optional(),
      gclid: z.string().max(200).optional(),
      referrer: z.string().max(500).optional(),
      landing: z.string().max(200).optional(),
    })
    .partial()
    .optional()
    .default({}),
};

const vender = z.object({
  origen: z.enum(["home", "vender"]),
  ...comun,
  enlace_anuncio: z.string().trim().max(500).optional(),
  zona_tipo: z.string().trim().max(200).optional(),
  tiempo_en_venta: z.enum(["no-publicado", "menos-1-mes", "1-3-meses", "3-6-meses", "mas-6-meses"]),
  consiente_llamada_asistente: z.boolean().default(false),
}).refine((d) => d.enlace_anuncio || d.zona_tipo, { message: "Falta el enlace o la zona", path: ["enlace_anuncio"] });

const comprar = z.object({
  origen: z.literal("comprar"),
  ...comun,
  zona: z.string().trim().min(2).max(200),
  dormitorios: z.enum(["1", "2", "3", "4+"]).optional(),
  presupuesto: z.enum(["hasta-200", "200-300", "300-450", "450-700", "mas-700"]),
  plazo: z.enum(["ya", "3-meses", "6-meses", "sin-prisa"]).optional(),
});

const guia = z.object({
  origen: z.literal("guia"),
  ...comun,
  email: z.string().trim().email().max(120),
  quiere_llamada: z.boolean().default(false),
});

const schema = z.union([vender, comprar, guia]);

/* ───────────── Límite por IP (mejor esfuerzo en serverless) ───────────── */

const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const intentos = new Map<string, number[]>();

function limitado(clave: string): boolean {
  const ahora = Date.now();
  const lista = (intentos.get(clave) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (lista.length >= MAX_POR_VENTANA) return true;
  lista.push(ahora);
  intentos.set(clave, lista);
  if (intentos.size > 5000) intentos.clear();
  return false;
}

/* ───────────── Turnstile ───────────── */

async function verificarTurnstile(token: string | null | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // sin clave configurada no se verifica (desarrollo)
  if (!token || token === "sin-turnstile") return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(6000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/* ───────────── Handler ───────────── */

const ERROR_USUARIO = "No he podido enviar tu mensaje. Escríbeme directamente y lo miro igual.";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "0.0.0.0";
  const ua = req.headers.get("user-agent") ?? "";
  const salt = process.env.N8N_LEAD_SECRET ?? "sin-secreto";
  const ipHash = createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);

  if (limitado(ipHash)) {
    return NextResponse.json({ ok: false, error: "Has enviado varios mensajes seguidos. Espera unos minutos o escríbeme por WhatsApp.", codigo: "limite" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Datos no válidos.", codigo: "json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Revisa los datos del formulario.", codigo: "validacion", detalles: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const lead = parsed.data;

  // Honeypot relleno: respondemos OK sin hacer nada.
  if (lead.web) return NextResponse.json({ ok: true, silenciado: true });

  if (!(await verificarTurnstile(lead.turnstile_token, ip))) {
    return NextResponse.json({ ok: false, error: "No he podido comprobar que no eres un robot. Recarga la página y vuelve a intentarlo, o escríbeme por WhatsApp.", codigo: "turnstile" }, { status: 400 });
  }

  const webhook = process.env.N8N_LEAD_WEBHOOK_URL;
  const secreto = process.env.N8N_LEAD_SECRET;
  if (!webhook || !secreto) {
    console.error("[lead] N8N_LEAD_WEBHOOK_URL o N8N_LEAD_SECRET sin configurar");
    return NextResponse.json({ ok: false, error: ERROR_USUARIO, codigo: "sin-destino" }, { status: 503 });
  }

  const { turnstile_token: _t, web: _w, ...datos } = lead;
  void _t;
  void _w;
  const cuerpo = {
    ...datos,
    ...(datos.consent_marketing ? {} : { fbp: undefined, fbc: undefined }),
    ip_hash: ipHash,
    user_agent: ua.slice(0, 300),
    ts: new Date().toISOString(),
    fuente: "web",
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lead-Secret": secreto },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) {
      console.error("[lead] n8n respondió", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: ERROR_USUARIO, codigo: "n8n" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] fallo al llamar a n8n", err);
    return NextResponse.json({ ok: false, error: ERROR_USUARIO, codigo: "red" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Método no permitido" }, { status: 405 });
}
