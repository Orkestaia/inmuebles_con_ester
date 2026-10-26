import type { ReactNode } from "react";

export function Seccion({
  id,
  children,
  fondo = "crema",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  fondo?: "crema" | "blanco" | "ciruela" | "rosa" | "papel";
  className?: string;
}) {
  const bg = {
    crema: "bg-crema",
    blanco: "bg-blanco",
    ciruela: "bg-ciruela text-blanco",
    rosa: "bg-rosa-claro",
    papel: "papel",
  }[fondo];
  return (
    <section id={id} className={`${bg} py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Titulo({ children, className = "", as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return <Tag className={`font-display text-3xl leading-[1.15] tracking-tight sm:text-4xl ${className}`}>{children}</Tag>;
}

/** Antetítulo en versalitas, como en los creativos de Ester. */
export function Etiqueta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mb-3 text-[11px] font-semibold tracking-[0.26em] uppercase ${className}`}>{children}</p>;
}
