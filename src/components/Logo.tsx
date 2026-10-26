import Link from "next/link";

/** Icono de llave de la marca (trazo fino). */
export function Llave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" width="26" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="10" cy="12" r="6" />
      <path d="M16 12h28M38 12v5M32 12v4" />
    </svg>
  );
}

/**
 * Wordmark de Ester: INMUEBLES / CON / Ester (caligrafía) / MADRID.
 * `tamano`: "nav" (cabecera) o "pie" (más grande).
 */
export function Logo({ tamano = "nav", claro = false, className = "" }: { tamano?: "nav" | "pie"; claro?: boolean; className?: string }) {
  const grande = tamano === "pie";
  const color = claro ? "text-crema" : "text-ciruela";
  return (
    <Link href="/" aria-label="Inmuebles con Ester, inicio" className={`inline-block leading-none ${color} ${className}`}>
      <span className={`relative z-10 block font-display font-semibold tracking-[0.22em] uppercase ${grande ? "text-lg" : "text-[13px]"}`}>Inmuebles</span>
      <span className={`flex items-baseline gap-1.5 ${grande ? "mt-1" : "mt-0.5"}`}>
        <span className={`font-sans tracking-[0.3em] uppercase ${grande ? "text-[11px]" : "text-[8px]"}`}>con</span>
        <span className={`font-script leading-none ${grande ? "text-[2.6rem]" : "text-[1.7rem]"}`}>Ester</span>
      </span>
      <span className={`flex items-center justify-end gap-1 font-sans tracking-[0.28em] uppercase ${grande ? "text-[10px]" : "text-[7px]"}`}>
        <Llave className={grande ? "h-3 w-6" : "h-2.5 w-5"} />
        Madrid
      </span>
    </Link>
  );
}
