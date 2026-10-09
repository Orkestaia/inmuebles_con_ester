"use client";

import { metaBrowserIds, trackLead } from "@/components/Analytics";
import { leerAtribucion } from "@/components/UtmCapture";
import { getConsent } from "@/lib/cookie-consent";

export type Origen = "home" | "vender" | "comprar" | "guia";

export type EnvioResultado = { ok: true; eventId: string } | { ok: false; error: string; codigo?: string };

/** Mensaje de error que ve el usuario: nunca técnico. */
export const ERROR_GENERICO = "No he podido enviar tu mensaje. Escríbeme directamente y lo miro igual.";

/**
 * Envía un lead al route handler /api/lead. Añade atribución, consentimiento de cookies,
 * identificadores del píxel (solo con consentimiento) y un event_id compartido con CAPI.
 */
export async function enviarLead(origen: Origen, campos: Record<string, unknown>, turnstileToken: string | null): Promise<EnvioResultado> {
  const eventId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const consentMarketing = getConsent() === "accepted";

  const body = {
    origen,
    ...campos,
    turnstile_token: turnstileToken,
    event_id: eventId,
    consent_marketing: consentMarketing,
    ...(consentMarketing ? metaBrowserIds() : {}),
    utm: leerAtribucion(),
    page: typeof window !== "undefined" ? window.location.pathname : undefined,
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; codigo?: string };
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error ?? ERROR_GENERICO, codigo: data.codigo };
    }
    trackLead(eventId, origen);
    return { ok: true, eventId };
  } catch {
    return { ok: false, error: ERROR_GENERICO };
  }
}

/** Validación cliente del teléfono español, igual que en el servidor. */
export function telefonoValido(v: string): boolean {
  const d = v.replace(/[\s.\-()]/g, "");
  return /^(\+34|0034|34)?[6-9]\d{8}$/.test(d);
}
