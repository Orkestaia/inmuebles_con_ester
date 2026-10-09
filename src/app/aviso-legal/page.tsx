import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { Marcador } from "@/components/Marcador";
import { site, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de la web de Inmuebles con Ester (LSSI-CE).",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

export default function AvisoLegalPage() {
  const dominio = SITE_URL.replace(/^https?:\/\//, "");
  return (
    <LegalPage titulo="Aviso legal" actualizado={site.legal.actualizado}>
      <h2>1. Titular de la web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que la web {dominio} es titularidad de:
      </p>
      <ul>
        <li>Titular: <Marcador texto={site.legal.titular} /></li>
        <li>NIF: <Marcador texto={site.legal.nif} /></li>
        <li>Domicilio: <Marcador texto={site.legal.direccion} /></li>
        <li>Correo electrónico: <a href={`mailto:${site.contacto.email}`}>{site.contacto.email}</a></li>
        <li>Teléfono: <Marcador texto={site.contacto.telefonoVisible} /></li>
        <li>Actividad: intermediación inmobiliaria (agente inmobiliaria independiente), Madrid.</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Esta web tiene carácter informativo y comercial: presenta los servicios de intermediación inmobiliaria de Ester y permite a propietarios y compradores ponerse en contacto con ella. El acceso a la web es gratuito y no exige registro.
      </p>

      <h2>3. Uso de la web</h2>
      <p>
        El usuario se compromete a hacer un uso lícito de la web y de sus formularios, a no introducir datos falsos o de terceros sin su autorización y a no realizar acciones que puedan dañar, sobrecargar o impedir el funcionamiento normal del sitio.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, marca «Inmuebles con Ester» y demás contenidos de esta web pertenecen a su titular o cuentan con autorización para su uso. No está permitida su reproducción, distribución o transformación sin permiso expreso, salvo lo que permita la ley.
      </p>

      <h2>5. Información sobre los inmuebles</h2>
      <p>
        Los pisos vendidos que se muestran son operaciones reales en las que Ester ha intervenido. Por respeto a la privacidad de sus actuales ocupantes se publican sin número de portal. Las valoraciones que Ester ofrece son orientativas y no constituyen tasación oficial. Nada en esta web es una oferta vinculante ni una garantía de plazo o precio de venta.
      </p>

      <h2>6. Enlaces a terceros</h2>
      <p>
        La web puede incluir enlaces a Instagram, WhatsApp u otras webs de terceros. El titular no se responsabiliza de sus contenidos ni de sus políticas de privacidad.
      </p>

      <h2>7. Responsabilidad</h2>
      <p>
        El titular procura que la web esté disponible y que la información sea correcta, pero no garantiza la ausencia de errores ni la disponibilidad continua. No se hace responsable de los daños derivados del uso de la web, salvo en los casos en que la ley no permita excluirlo.
      </p>

      <h2>8. Legislación aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan según la normativa de consumidores y usuarios.
      </p>

      <p>
        Consulta también la <a href="/privacidad">política de privacidad</a> y la <a href="/cookies">política de cookies</a>.
      </p>
    </LegalPage>
  );
}
