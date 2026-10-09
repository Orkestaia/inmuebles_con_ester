"use client";

import { trackWhatsApp } from "@/components/Analytics";
import { site, whatsappUrl } from "@/lib/site";

const IG_DM = `https://ig.me/m/${site.contacto.instagram}`;

type Props = {
  lugar: string;
  label: string;
  className?: string;
  mensaje?: string;
};

/**
 * Botón de WhatsApp. Si Ester aún no ha dado el número, enlaza al mensaje directo
 * de Instagram y cambia la palabra "WhatsApp" por "Instagram" en la etiqueta.
 */
export function WhatsAppLink({ lugar, label, className = "", mensaje }: Props) {
  const wa = whatsappUrl(mensaje);
  const href = wa ?? IG_DM;
  const texto = wa ? label : label.replace(/WhatsApp/gi, "Instagram");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp(lugar)}
      className={className}
    >
      {texto}
    </a>
  );
}

export function WhatsAppFloat() {
  const wa = whatsappUrl();
  const href = wa ?? IG_DM;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp("flotante")}
      aria-label={wa ? "Escribir a Ester por WhatsApp" : "Escribir a Ester por Instagram"}
      className="fixed right-4 bottom-20 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-verde text-blanco shadow-lg transition-transform hover:scale-105 md:hidden"
    >
      {wa ? (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )}
    </a>
  );
}
