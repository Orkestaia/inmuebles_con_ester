"use client";

import Link from "next/link";
import { setConsent, useConsent } from "@/lib/cookie-consent";

export function CookieBanner() {
  const consent = useConsent();
  if (consent !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-blanco/95 shadow-[0_-8px_30px_rgba(29,26,31,0.08)] backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-2xl text-sm leading-relaxed text-tinta-suave">
          Uso cookies de analítica y de Meta para saber si mis anuncios funcionan. Solo se activan si
          las aceptas. Rechazarlas no cambia nada de lo que puedes hacer en esta web.{" "}
          <Link href="/cookies" className="text-ciruela underline underline-offset-2">
            Política de cookies
          </Link>
          .
        </p>
        <div className="flex w-full shrink-0 gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="flex-1 rounded-full border border-tinta/25 px-5 py-2.5 text-sm font-semibold text-tinta transition-colors hover:border-tinta/50 sm:flex-none"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="flex-1 rounded-full border border-ciruela bg-ciruela px-5 py-2.5 text-sm font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro sm:flex-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
