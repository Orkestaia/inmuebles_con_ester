import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Marcador } from "@/components/Marcador";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-linea papel">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo tamano="pie" />
            <p className="mt-4 text-sm leading-relaxed text-tinta-suave">
              {site.lema}. Agente inmobiliaria independiente en Madrid desde {site.ester.desde}.
            </p>
            <p className="mt-4 text-sm text-tinta-suave">
              <Marcador texto={site.legal.titular} /> · <Marcador texto={site.legal.nif} />
              <br />
              <Marcador texto={site.legal.direccion} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-ciruela uppercase">Contacto</p>
              <ul className="space-y-2 text-tinta-suave">
                <li>
                  <a href={`mailto:${site.contacto.email}`} className="hover:text-ciruela">
                    {site.contacto.email}
                  </a>
                </li>
                <li>
                  <Marcador texto={site.contacto.telefonoVisible} />
                </li>
                <li>
                  <a href={site.contacto.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ciruela">
                    @{site.contacto.instagram}
                  </a>
                </li>
                <li>Madrid</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-ciruela uppercase">La web</p>
              <ul className="space-y-2 text-tinta-suave">
                {site.menu.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="hover:text-ciruela">{m.label}</Link>
                  </li>
                ))}
                <li><Link href="/comprar" className="hover:text-ciruela">Busco casa</Link></li>
                <li><Link href="/guia-por-que-no-se-vende" className="hover:text-ciruela">Guía: por qué no se vende</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-ciruela uppercase">Legal</p>
              <ul className="space-y-2 text-tinta-suave">
                <li><Link href="/aviso-legal" className="hover:text-ciruela">Aviso legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-ciruela">Política de privacidad</Link></li>
                <li><Link href="/cookies" className="hover:text-ciruela">Política de cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-linea pt-6 text-xs text-tinta-suave sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.</p>
          <a href={site.orkesta.href} target="_blank" rel="noopener noreferrer" className="hover:text-ciruela">
            {site.orkesta.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
