"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { BotonEnviar, Campo, Casilla, ErrorEnvio, Honeypot, Input, Select } from "@/components/form/Campos";
import { Turnstile, resetTurnstile } from "@/components/Turnstile";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { enviarLead, telefonoValido } from "@/lib/lead-client";
import { home } from "@/lib/site";

const c = home.formulario.campos;

/**
 * Formulario principal para propietarios. `origen` distingue home y /vender-mi-piso.
 */
export function LeadForm({ origen = "home", id = "formulario" }: { origen?: "home" | "vender"; id?: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nombre = String(fd.get("nombre") ?? "").trim();
    const telefono = String(fd.get("telefono") ?? "").trim();
    const enlace = String(fd.get("enlace_anuncio") ?? "").trim();
    const zonaTipo = String(fd.get("zona_tipo") ?? "").trim();
    const tiempo = String(fd.get("tiempo_en_venta") ?? "");
    const consiente = fd.get("consiente_contacto") === "on";
    const asistente = fd.get("consiente_llamada_asistente") === "on";
    const web = String(fd.get("web") ?? "");

    const errs: Record<string, string> = {};
    if (nombre.length < 2) errs.nombre = "Escribe tu nombre.";
    if (!telefonoValido(telefono)) errs.telefono = "Escribe un teléfono español válido, por ejemplo 600 123 456.";
    if (!enlace && !zonaTipo) errs.enlace = "Pega el enlace o cuéntame la zona y el tipo de piso.";
    if (enlace && !/^https?:\/\//i.test(enlace) && !/^[\w.-]+\.[a-z]{2,}/i.test(enlace)) errs.enlace = "Pega el enlace completo del anuncio.";
    if (!tiempo) errs.tiempo = "Elige una opción.";
    if (!consiente) errs.consiente = "Necesito tu permiso para contactarte.";
    setErrores(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setCargando(true);
    setErrorEnvio(null);
    const r = await enviarLead(
      origen,
      {
        nombre,
        telefono,
        enlace_anuncio: enlace || undefined,
        zona_tipo: zonaTipo || undefined,
        tiempo_en_venta: tiempo,
        consiente_contacto: true,
        consiente_llamada_asistente: asistente,
        web,
      },
      token,
    );
    setCargando(false);
    if (r.ok) {
      router.push(`/gracias?o=${origen}`);
      return;
    }
    setErrorEnvio(r.error);
    resetTurnstile();
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="relative space-y-5" aria-describedby={`${id}-nota`}>
      <Honeypot />

      <Campo id={`${id}-nombre`} label={c.nombre} error={errores.nombre}>
        <Input id={`${id}-nombre`} name="nombre" type="text" autoComplete="name" required maxLength={80} error={!!errores.nombre} aria-describedby={errores.nombre ? `${id}-nombre-error` : undefined} />
      </Campo>

      <Campo id={`${id}-telefono`} label={c.telefono} error={errores.telefono}>
        <Input id={`${id}-telefono`} name="telefono" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="600 123 456" error={!!errores.telefono} aria-describedby={errores.telefono ? `${id}-telefono-error` : undefined} />
      </Campo>

      <Campo id={`${id}-enlace`} label={c.enlace} ayuda={c.enlaceAyuda} error={errores.enlace}>
        <Input id={`${id}-enlace`} name="enlace_anuncio" type="url" inputMode="url" autoComplete="off" maxLength={500} placeholder="https://www.idealista.com/inmueble/…" error={!!errores.enlace} aria-describedby={errores.enlace ? `${id}-enlace-error` : `${id}-enlace-ayuda`} />
      </Campo>

      <Campo id={`${id}-zona`} label={c.zonaTipo}>
        <Input id={`${id}-zona`} name="zona_tipo" type="text" maxLength={200} placeholder="Ej.: Barrio del Pilar, 3 dormitorios, exterior" />
      </Campo>

      <Campo id={`${id}-tiempo`} label={c.tiempo} error={errores.tiempo}>
        <Select id={`${id}-tiempo`} name="tiempo_en_venta" opciones={c.tiempoOpciones} required aria-invalid={errores.tiempo ? true : undefined} />
      </Campo>

      <Casilla
        id={`${id}-consiente`}
        name="consiente_contacto"
        error={errores.consiente}
        label={
          <>
            He leído la{" "}
            <Link href="/privacidad" className="text-ciruela underline underline-offset-2" target="_blank">
              política de privacidad
            </Link>{" "}
            y acepto que Ester me contacte por WhatsApp o teléfono para responder a mi consulta.
          </>
        }
      />

      <Casilla id={`${id}-asistente`} name="consiente_llamada_asistente" label={c.consentimientoAsistente} />

      <Turnstile onToken={setToken} />

      {errorEnvio && (
        <ErrorEnvio
          mensaje={errorEnvio}
          fallback={
            <WhatsAppLink lugar={`form-${origen}-error`} label="Escribir a Ester por WhatsApp" className="font-semibold text-ciruela underline underline-offset-2" />
          }
        />
      )}

      <BotonEnviar cargando={cargando}>{cargando ? c.enviando : c.boton}</BotonEnviar>

      <p id={`${id}-nota`} className="text-center text-sm text-tinta-suave">
        {c.nota}
      </p>
    </form>
  );
}
