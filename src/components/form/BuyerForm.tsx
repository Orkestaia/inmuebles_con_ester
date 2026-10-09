"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { BotonEnviar, Campo, Casilla, ErrorEnvio, Honeypot, Input, Select } from "@/components/form/Campos";
import { Turnstile, resetTurnstile } from "@/components/Turnstile";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { enviarLead, telefonoValido } from "@/lib/lead-client";
import { comprar } from "@/lib/site";

const c = comprar.formulario.campos;
const id = "formulario";

export function BuyerForm() {
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
    const zona = String(fd.get("zona") ?? "").trim();
    const dormitorios = String(fd.get("dormitorios") ?? "");
    const presupuesto = String(fd.get("presupuesto") ?? "");
    const plazo = String(fd.get("plazo") ?? "");
    const consiente = fd.get("consiente_contacto") === "on";

    const errs: Record<string, string> = {};
    if (nombre.length < 2) errs.nombre = "Escribe tu nombre.";
    if (!telefonoValido(telefono)) errs.telefono = "Escribe un teléfono español válido, por ejemplo 600 123 456.";
    if (zona.length < 2) errs.zona = "Dime al menos una zona.";
    if (!presupuesto) errs.presupuesto = "Elige un rango.";
    if (!consiente) errs.consiente = "Necesito tu permiso para contactarte.";
    setErrores(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setCargando(true);
    setErrorEnvio(null);
    const r = await enviarLead(
      "comprar",
      { nombre, telefono, zona, dormitorios: dormitorios || undefined, presupuesto, plazo: plazo || undefined, consiente_contacto: true, web: String(fd.get("web") ?? "") },
      token,
    );
    setCargando(false);
    if (r.ok) {
      router.push("/gracias?o=comprar");
      return;
    }
    setErrorEnvio(r.error);
    resetTurnstile();
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <Campo id="c-nombre" label={c.nombre} error={errores.nombre}>
        <Input id="c-nombre" name="nombre" type="text" autoComplete="name" required maxLength={80} error={!!errores.nombre} />
      </Campo>
      <Campo id="c-telefono" label={c.telefono} error={errores.telefono}>
        <Input id="c-telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="600 123 456" error={!!errores.telefono} />
      </Campo>
      <Campo id="c-zona" label={c.zona} error={errores.zona}>
        <Input id="c-zona" name="zona" type="text" required maxLength={200} placeholder="Ej.: Chamberí, Tetuán o Hortaleza" error={!!errores.zona} />
      </Campo>
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id="c-dormitorios" label={c.dormitorios}>
          <Select id="c-dormitorios" name="dormitorios" opciones={c.dormitoriosOpciones} placeholder="Me da igual" />
        </Campo>
        <Campo id="c-presupuesto" label={c.presupuesto} error={errores.presupuesto}>
          <Select id="c-presupuesto" name="presupuesto" opciones={c.presupuestoOpciones} required aria-invalid={errores.presupuesto ? true : undefined} />
        </Campo>
      </div>
      <Campo id="c-plazo" label={c.plazo}>
        <Select id="c-plazo" name="plazo" opciones={c.plazoOpciones} />
      </Campo>

      <Casilla
        id="c-consiente"
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

      <Turnstile onToken={setToken} />

      {errorEnvio && (
        <ErrorEnvio mensaje={errorEnvio} fallback={<WhatsAppLink lugar="form-comprar-error" label="Escribir a Ester por WhatsApp" className="font-semibold text-ciruela underline underline-offset-2" mensaje="Hola Ester, estoy buscando piso en Madrid y quiero contarte qué necesito." />} />
      )}

      <BotonEnviar cargando={cargando}>{cargando ? "Enviando…" : c.boton}</BotonEnviar>
      <p className="text-center text-sm text-tinta-suave">{c.nota}</p>
    </form>
  );
}
