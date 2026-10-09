import Link from "next/link";
import { Marcador } from "@/components/Marcador";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-linea bg-crema-oscuro/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-2xl text-tinta">
              Inmuebles con <span className="text-ciruela">Ester</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-tinta-suave">{site.firma}. Agente inmobiliaria independiente en Madrid desde {site.ester.desde}.</p>
            <p className="mt-4 text-sm text-tinta-suave">
              <Marcador texto={site.legal.titular} /> · <Marcador texto={site.legal.nif} />
              <br />
              <Marcador texto={site.legal.direccion} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold text-tinta">Contacto</p>
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
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-tinta">La web</p>
              <ul className="space-y-2 text-tinta-suave">
                <li><Link href="/#vender" className="hover:text-ciruela">Vender</Link></li>
                <li><Link href="/comprar" className="hover:text-ciruela">Comprar</Link></li>
                <li><Link href="/vendidos" className="hover:text-ciruela">Pisos vendidos</Link></li>
                <li><Link href="/sobre-ester" className="hover:text-ciruela">Sobre Ester</Link></li>
                <li><Link href="/guia-por-que-no-se-vende" className="hover:text-ciruela">Guía: por qué no se vende</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-tinta">Legal</p>
              <ul className="space-y-2 text-tinta-suave">
                <li><Link href="/aviso-legal" className="hover:text-ciruela">Aviso legal</Link></li>
                <li><Link href="/privacidad" className="hover:text-ciruela">Privacidad</Link></li>
                <li><Link href="/cookies" className="hover:text-ciruela">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-linea pt-6 text-xs text-tinta-suave sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.nombre}. Madrid.</p>
          <a href={site.orkesta.href} target="_blank" rel="noopener noreferrer" className="hover:text-ciruela">
            {site.orkesta.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
