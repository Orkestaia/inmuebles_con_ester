"use client";

import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Cloudflare Turnstile en modo "interaction-only": invisible salvo que haga falta un reto.
 * El script solo se carga cuando el formulario entra en pantalla.
 * Sin clave configurada, pasa un token de desarrollo y el servidor no verifica.
 */
export function Turnstile({ onToken }: { onToken: (token: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const cb = useRef(onToken);

  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!SITE_KEY) {
      cb.current("sin-turnstile");
      return;
    }
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const render = async () => {
      try {
        await loadScript();
        if (cancelled || !window.turnstile || idRef.current) return;
        idRef.current = window.turnstile.render(el, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          language: "es",
          callback: (token: string) => cb.current(token),
          "expired-callback": () => cb.current(null),
          "error-callback": () => cb.current(null),
        });
      } catch {
        cb.current(null);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void render();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (idRef.current && window.turnstile) {
        try {
          window.turnstile.remove(idRef.current);
        } catch {
          /* ya retirado */
        }
        idRef.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="min-h-0" />;
}

export function resetTurnstile() {
  try {
    window.turnstile?.reset();
  } catch {
    /* nada */
  }
}
