"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-display text-xl tracking-tight text-tinta ${className}`} aria-label="Inmuebles con Ester, inicio">
      Inmuebles con <span className="text-ciruela">Ester</span>
    </Link>
  );
}

/**
 * Cabecera. `minimal` (para /vender-mi-piso): solo el nombre, sin menú ni distracciones.
 */
export function Nav({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-linea/70 bg-crema/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark />

        {!minimal && (
          <>
            <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
              {site.menu.map((m) => (
                <Link key={m.href} href={m.href} className="text-[15px] font-medium text-tinta-suave transition-colors hover:text-ciruela">
                  {m.label}
                </Link>
              ))}
              <Link
                href={site.ctaMenu.href}
                className="rounded-full bg-ciruela px-5 py-2.5 text-[15px] font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro"
              >
                {site.ctaMenu.label}
              </Link>
            </nav>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-tinta md:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {!minimal && open && (
        <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-linea bg-crema md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {site.menu.map((m) => (
              <li key={m.href}>
                <Link href={m.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-tinta">
                  {m.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-2">
              <Link
                href={site.ctaMenu.href}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-ciruela px-5 py-3 text-center text-base font-semibold text-blanco"
              >
                {site.ctaMenu.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
