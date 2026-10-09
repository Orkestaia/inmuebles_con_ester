"use client";

import { useEffect } from "react";

export const UTM_KEY = "ice-utm";

export type Atribucion = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  referrer?: string;
  landing?: string;
};

/** Guarda UTM, fbclid y referrer de la primera visita para adjuntarlos al formulario. */
export function UtmCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(UTM_KEY)) return;
      const p = new URLSearchParams(window.location.search);
      const data: Atribucion = { referrer: document.referrer || undefined, landing: window.location.pathname };
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const) {
        const v = p.get(k);
        if (v) data[k] = v.slice(0, 200);
      }
      sessionStorage.setItem(UTM_KEY, JSON.stringify(data));
    } catch {
      /* sin sessionStorage */
    }
  }, []);
  return null;
}

export function leerAtribucion(): Atribucion {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as Atribucion) : {};
  } catch {
    return {};
  }
}
