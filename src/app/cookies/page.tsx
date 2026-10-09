import type { Metadata } from "next";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usa la web de Inmuebles con Ester y cómo aceptarlas o rechazarlas.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage titulo="Política de cookies" actualizado={site.legal.actualizado}>
      <h2>1. Qué son las cookies</h2>
      <p>
        Una cookie es un pequeño archivo que se guarda en tu navegador cuando visitas una web. Sirve para recordar tus preferencias o para medir cómo se usa el sitio. Algunas las pone esta web (propias) y otras las ponen empresas externas (de terceros).
      </p>

      <h2>2. Qué cookies usa esta web</h2>
      <p>
        Cuando entras por primera vez ves un aviso con dos botones iguales: <strong>Aceptar</strong> y <strong>Rechazar</strong>. Hasta que no pulses Aceptar, no se carga ninguna cookie de analítica ni de publicidad. Rechazar no limita nada de lo que puedes hacer en la web.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Quién la pone</th>
              <th>Para qué</th>
              <th>Tipo</th>
              <th>Dura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ice-cookie-consent</td>
              <td>Propia (almacenamiento local)</td>
              <td>Recordar si aceptaste o rechazaste las cookies</td>
              <td>Necesaria</td>
              <td>Hasta que la borres</td>
            </tr>
            <tr>
              <td>ice-utm</td>
              <td>Propia (almacenamiento de sesión)</td>
              <td>Recordar desde qué anuncio o enlace llegaste para adjuntarlo a tu consulta</td>
              <td>Necesaria</td>
              <td>Mientras tengas la pestaña abierta</td>
            </tr>
            <tr>
              <td>cf_clearance y similares</td>
              <td>Cloudflare (Turnstile)</td>
              <td>Comprobar que el formulario lo envía una persona y no un robot</td>
              <td>Necesaria</td>
              <td>Hasta 1 año</td>
            </tr>
            <tr>
              <td>_ga, _ga_*</td>
              <td>Google Analytics 4</td>
              <td>Medir visitas y uso de la web de forma agregada</td>
              <td>Analítica</td>
              <td>Hasta 13 meses</td>
            </tr>
            <tr>
              <td>_fbp, _fbc</td>
              <td>Meta (Facebook e Instagram)</td>
              <td>Saber si llegaste desde un anuncio de Meta y si dejaste una consulta, para medir la publicidad</td>
              <td>Publicidad</td>
              <td>Hasta 3 meses</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Las cookies de analítica y publicidad se gestionan con el modo de consentimiento de Google (Consent Mode v2): mientras no aceptes, Google y Meta no reciben identificadores de tu navegador.
      </p>

      <h2>3. Cambiar tu decisión</h2>
      <p>Puedes cambiar lo que elegiste en cualquier momento desde aquí:</p>
      <p>
        <CookiePreferencesLink className="text-ciruela" />
      </p>

      <h2>4. Bloquear cookies desde el navegador</h2>
      <p>También puedes borrarlas o bloquearlas desde la configuración de tu navegador:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Firefox</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
      </ul>

      <h2>5. Más información</h2>
      <p>
        Sobre cómo trato tus datos personales, lee la <a href="/privacidad">política de privacidad</a>. Para cualquier duda, escríbeme a <a href={`mailto:${site.contacto.email}`}>{site.contacto.email}</a>.
      </p>
    </LegalPage>
  );
}
