"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { IconoWhatsApp, WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/lib/site";

/**
 * Cabecera. `minimal` (para /vender-mi-piso): solo el logo, sin menú ni distracciones.
 */
export function Nav({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-linea/80 bg-crema/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-5">
          <Logo />
          <span className="hidden border-l border-linea pl-5 text-[10px] font-semibold tracking-[0.28em] whitespace-nowrap text-tinta-suave uppercase xl:block">{site.lema}</span>
        </div>

        {!minimal && (
          <>
            <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
              {site.menu.map((m) => (
                <Link key={m.href} href={m.href} className="text-[15px] font-medium whitespace-nowrap text-tinta-suave transition-colors hover:text-ciruela">
                  {m.label}
                </Link>
              ))}
              <WhatsAppLink
                lugar="menu"
                label={site.ctaMenu.label}
                icono
                className="inline-flex items-center gap-2 rounded-full bg-ciruela px-5 py-2.5 text-[15px] font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro"
              />
            </nav>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ciruela md:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
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
                <Link href={m.href} onClick={() => setOpen(false)} className="block py-3 font-display text-lg text-tinta">
                  {m.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-3">
              <WhatsAppLink
                lugar="menu-movil"
                label={site.ctaMenu.label}
                icono
                className="flex items-center justify-center gap-2 rounded-full bg-ciruela px-5 py-3 text-base font-semibold text-blanco"
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export { IconoWhatsApp };
