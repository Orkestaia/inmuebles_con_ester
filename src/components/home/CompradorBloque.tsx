import Link from "next/link";
import { Seccion, Titulo } from "@/components/Seccion";
import { home } from "@/lib/site";

export function CompradorBloque() {
  const c = home.comprador;
  return (
    <Seccion fondo="rosa">
      <div className="mx-auto max-w-3xl text-center">
        <Titulo className="text-tinta">{c.titulo}</Titulo>
        <p className="mt-4 text-lg leading-relaxed text-tinta-suave">{c.texto}</p>
        <Link href="/comprar" className="mt-7 inline-block rounded-full border border-ciruela px-7 py-3.5 font-semibold text-ciruela transition-colors hover:bg-ciruela hover:text-blanco">
          {c.boton}
        </Link>
      </div>
    </Seccion>
  );
}
