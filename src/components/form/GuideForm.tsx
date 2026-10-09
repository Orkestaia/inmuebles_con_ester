"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { BotonEnviar, Campo, Casilla, ErrorEnvio, Honeypot, Input } from "@/components/form/Campos";
import { Turnstile, resetTurnstile } from "@/components/Turnstile";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { enviarLead, telefonoValido } from "@/lib/lead-client";
import { guia } from "@/lib/site";

const c = guia.formulario.campos;

export function GuideForm() {
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
    const email = String(fd.get("email") ?? "").trim();
    const telefono = String(fd.get("telefono") ?? "").trim();
    const quiereLlamada = fd.get("quiere_llamada") === "on";
    const consiente = fd.get("consiente_contacto") === "on";

    const errs: Record<string, string> = {};
    if (nombre.length < 2) errs.nombre = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = "Escribe un correo válido.";
    if (!telefonoValido(telefono)) errs.telefono = "Escribe un teléfono español válido, por ejemplo 600 123 456.";
    if (!consiente) errs.consiente = "Necesito tu permiso para enviarte la guía.";
    setErrores(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setCargando(true);
    setErrorEnvio(null);
    const r = await enviarLead("guia", { nombre, email, telefono, quiere_llamada: quiereLlamada, consiente_contacto: true, web: String(fd.get("web") ?? "") }, token);
    setCargando(false);
    if (r.ok) {
      router.push("/gracias?o=guia");
      return;
    }
    setErrorEnvio(r.error);
    resetTurnstile();
  }

  return (
    <form id="formulario" onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <Campo id="g-nombre" label={c.nombre} error={errores.nombre}>
        <Input id="g-nombre" name="nombre" type="text" autoComplete="name" required maxLength={80} error={!!errores.nombre} />
      </Campo>
      <Campo id="g-email" label={c.email} error={errores.email}>
        <Input id="g-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={120} error={!!errores.email} />
      </Campo>
      <Campo id="g-telefono" label={c.telefono} error={errores.telefono}>
        <Input id="g-telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="600 123 456" error={!!errores.telefono} />
      </Campo>
      <Casilla id="g-llamada" name="quiere_llamada" label={c.quiereLlamada} />
      <Casilla
        id="g-consiente"
        name="consiente_contacto"
        error={errores.consiente}
        label={
          <>
            He leído la{" "}
            <Link href="/privacidad" className="text-ciruela underline underline-offset-2" target="_blank">
              política de privacidad
            </Link>{" "}
            y acepto recibir la guía por correo y que Ester me contacte si se lo pido.
          </>
        }
      />
      <Turnstile onToken={setToken} />
      {errorEnvio && (
        <ErrorEnvio mensaje={errorEnvio} fallback={<WhatsAppLink lugar="form-guia-error" label="Pedir la guía por WhatsApp" className="font-semibold text-ciruela underline underline-offset-2" mensaje="Hola Ester, quiero la guía de por qué no se vende mi piso." />} />
      )}
      <BotonEnviar cargando={cargando}>{cargando ? "Enviando…" : c.boton}</BotonEnviar>
      <p className="text-center text-sm text-tinta-suave">{c.nota}</p>
    </form>
  );
}
