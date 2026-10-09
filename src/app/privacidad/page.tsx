import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { Marcador } from "@/components/Marcador";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Inmuebles con Ester tus datos personales (RGPD y LOPDGDD).",
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalPage titulo="Política de privacidad" actualizado={site.legal.actualizado}>
      <p>
        Esta política explica, en lenguaje claro, qué datos recojo a través de esta web, para qué los uso y qué derechos tienes. Cumple el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>Responsable: <Marcador texto={site.legal.titular} /></li>
        <li>NIF: <Marcador texto={site.legal.nif} /></li>
        <li>Domicilio: <Marcador texto={site.legal.direccion} /></li>
        <li>Correo electrónico: <a href={`mailto:${site.contacto.email}`}>{site.contacto.email}</a></li>
      </ul>

      <h2>2. Qué datos recojo y de dónde</h2>
      <ul>
        <li>
          <strong>Formulario para propietarios:</strong> nombre, teléfono, enlace de tu anuncio o zona y tipo de piso, tiempo que lleva a la venta, y tus casillas de consentimiento.
        </li>
        <li>
          <strong>Formulario para compradores:</strong> nombre, teléfono, zonas de interés, dormitorios, presupuesto aproximado y plazo.
        </li>
        <li>
          <strong>Guía en PDF:</strong> nombre, correo electrónico, teléfono y si quieres que te llame.
        </li>
        <li>
          <strong>Datos técnicos:</strong> al enviar un formulario se guarda la fecha, la página desde la que lo enviaste, el origen de la visita (por ejemplo, un anuncio en Instagram) y un identificador anonimizado de tu conexión, para evitar envíos automáticos y abusos. Tu dirección IP completa no se almacena.
        </li>
        <li>
          <strong>Cookies de analítica y publicidad:</strong> solo si las aceptas. Ver la <a href="/cookies">política de cookies</a>.
        </li>
      </ul>
      <p>Los datos los facilitas tú. No recojo datos de terceros ni de portales inmobiliarios a través de esta web.</p>

      <h2>3. Para qué uso tus datos y con qué base legal</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Responder a tu consulta: revisar tu anuncio y contactarte por WhatsApp, teléfono o correo para darte el diagnóstico o concretar lo que buscas.</td>
            <td>Tu consentimiento (casilla del formulario) y la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).</td>
          </tr>
          <tr>
            <td>Enviarte la guía en PDF que has pedido.</td>
            <td>Tu consentimiento (art. 6.1.a RGPD).</td>
          </tr>
          <tr>
            <td>Llamarte a través de un asistente para concretar la hora de la llamada con Ester (solo si marcas esa casilla; en este momento esa opción no está activa).</td>
            <td>Tu consentimiento específico (art. 6.1.a RGPD).</td>
          </tr>
          <tr>
            <td>Evitar envíos automáticos y abusos en los formularios.</td>
            <td>Interés legítimo en la seguridad de la web (art. 6.1.f RGPD).</td>
          </tr>
          <tr>
            <td>Medir si los anuncios de Instagram y Facebook y la web funcionan (solo con cookies aceptadas).</td>
            <td>Tu consentimiento (art. 6.1.a RGPD y art. 22 LSSI).</td>
          </tr>
        </tbody>
      </table>
      <p>No tomo decisiones automatizadas con efectos jurídicos sobre ti ni elaboro perfiles más allá de la medición agregada de la publicidad.</p>

      <h2>4. Quién puede acceder a tus datos</h2>
      <p>Tus datos solo los ve Ester. No se venden ni se ceden a otras agencias. Para que la web funcione intervienen estos proveedores, que tratan los datos siguiendo mis instrucciones (encargados del tratamiento):</p>
      <ul>
        <li><strong>Vercel Inc.</strong> (alojamiento de la web). Servidores en la Unión Europea cuando es posible; transferencias internacionales amparadas en cláusulas contractuales tipo y el Marco de Privacidad de Datos UE-EE. UU.</li>
        <li><strong>Cloudflare Inc.</strong> (Turnstile, comprobación de que no eres un robot). Mismas garantías.</li>
        <li><strong>n8n GmbH</strong> (automatización: recibe el formulario y lo reparte). Servidores en la Unión Europea.</li>
        <li><strong>Google LLC</strong> (hoja de cálculo donde Ester guarda las consultas; Google Analytics solo con cookies aceptadas). Cláusulas contractuales tipo y Marco de Privacidad de Datos.</li>
        <li><strong>Resend Inc.</strong> (envío del correo de confirmación y de la guía). Cláusulas contractuales tipo.</li>
        <li><strong>Meta Platforms Ireland Ltd.</strong> (píxel de Meta y API de conversiones, solo con cookies aceptadas; el teléfono y el correo se envían cifrados de forma irreversible para medir la publicidad).</li>
        <li><strong>Orkesta Automatización &amp; IA</strong> (mantenimiento técnico de la web y de la automatización), con acceso limitado a lo necesario para ese mantenimiento.</li>
      </ul>

      <h2>5. Cuánto tiempo conservo tus datos</h2>
      <ul>
        <li>Consultas de propietarios y compradores: mientras dure la relación y, como máximo, 2 años desde el último contacto si no llegamos a trabajar juntos.</li>
        <li>Si finalmente contratas mis servicios: lo que exija la normativa fiscal y civil aplicable a la operación.</li>
        <li>Datos de seguridad (identificador anonimizado de conexión): 30 días.</li>
        <li>Datos de analítica y publicidad: según la <a href="/cookies">política de cookies</a>.</li>
      </ul>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes pedirme en cualquier momento acceder a tus datos, rectificarlos, suprimirlos, limitar u oponerte a su tratamiento, llevártelos a otro proveedor y retirar el consentimiento que hayas dado (sin que afecte a lo hecho antes). Escríbeme a{" "}
        <a href={`mailto:${site.contacto.email}`}>{site.contacto.email}</a> indicando qué derecho quieres ejercer. Te contesto en el plazo de un mes.
      </p>
      <p>
        Si crees que no he tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        La web se sirve cifrada (HTTPS), el formulario viaja a la automatización por un canal protegido con clave y el acceso a la hoja de consultas está limitado a Ester y al mantenimiento técnico. No hay base de datos pública en la web.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>Si cambio algo relevante, actualizaré esta página y la fecha de arriba.</p>
    </LegalPage>
  );
}
