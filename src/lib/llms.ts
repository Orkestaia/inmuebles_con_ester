import { absoluteUrl, comprar, guia, home, pisosData, pisoTitulo, site, sobre } from "@/lib/site";

const limpiar = (t: string) => t.replace(/\s*\[[^\]]*\]\s*/g, " ").replace(/\s{2,}/g, " ").trim();

/** llms.txt: índice corto para modelos de lenguaje. */
export function llmsTxt(): string {
  return [
    `# ${site.nombre}`,
    "",
    `> ${limpiar(site.descripcionEntidad)}`,
    "",
    "Ester es la persona que atiende cada consulta: revisa el anuncio del propietario y le dice en 24 horas, por WhatsApp, qué está frenando la venta. No hay comerciales intermedios. Trabaja en toda la ciudad de Madrid y alrededores.",
    "",
    "## Páginas",
    "",
    `- [Inicio: vendo pisos en Madrid que llevan meses sin venderse](${absoluteUrl("/")}): oferta principal para propietarios, cómo trabaja Ester, pisos vendidos y preguntas frecuentes.`,
    `- [Vender mi piso](${absoluteUrl("/vender-mi-piso")}): diagnóstico gratuito en 24 horas de un anuncio que no se vende.`,
    `- [Comprar: personal shopper inmobiliario](${absoluteUrl("/comprar")}): Ester busca casa para compradores que no encuentran lo que necesitan.`,
    `- [Pisos vendidos](${absoluteUrl("/vendidos")}): viviendas vendidas en ${site.zonas.join(", ")}.`,
    `- [Sobre Ester](${absoluteUrl("/sobre-ester")}): agente inmobiliaria independiente en Madrid desde ${site.ester.desde}; aprendió el oficio con su tía.`,
    `- [Guía: por qué no se vende mi piso](${absoluteUrl("/guia-por-que-no-se-vende")}): siete errores que frenan la venta, en formato pregunta y respuesta.`,
    "",
    "## Contacto",
    "",
    `- Correo: ${site.contacto.email}`,
    `- Instagram: ${site.contacto.instagramUrl}`,
    "- Zona: Madrid y alrededores (España). Idioma: español.",
    "",
    "## Opcional",
    "",
    `- [Texto completo de la web](${absoluteUrl("/llms-full.txt")})`,
    `- [Aviso legal](${absoluteUrl("/aviso-legal")}), [Privacidad](${absoluteUrl("/privacidad")}), [Cookies](${absoluteUrl("/cookies")})`,
    "",
  ].join("\n");
}

/** llms-full.txt: texto completo de las páginas públicas. */
export function llmsFullTxt(): string {
  const L: string[] = [];
  const h = (n: number, t: string) => L.push("", `${"#".repeat(n)} ${t}`, "");
  const p = (t: string) => L.push(limpiar(t), "");

  L.push(`# ${site.nombre}: texto completo de la web`, "", `> ${limpiar(site.descripcionEntidad)}`, "", `Fuente: ${absoluteUrl("/")}. Actualizado en ${pisosData.actualizado}.`);

  h(2, `Inicio (${absoluteUrl("/")})`);
  h(3, home.hero.h1);
  p(home.hero.sub);
  p(`Confianza: ${home.hero.confianza.map(limpiar).filter(Boolean).join(" · ")}.`);
  h(3, home.problema.titulo);
  home.problema.tarjetas.forEach((t) => p(`${t.titulo} ${t.texto}`));
  h(3, home.pasos.titulo);
  home.pasos.lista.forEach((t, i) => p(`${i + 1}. ${t.titulo} ${t.texto}`));
  h(3, home.formulario.titulo);
  p(home.formulario.intro);
  h(3, home.sobre.titulo);
  p(home.sobre.texto);
  h(3, home.comprador.titulo);
  p(home.comprador.texto);
  h(3, home.faq.titulo);
  home.faq.lista.forEach((f) => {
    L.push(`**${f.q}**`, "");
    p(f.a);
  });

  h(2, `Pisos vendidos (${absoluteUrl("/vendidos")})`);
  p("Viviendas reales vendidas por Ester en Madrid. Se publica calle y barrio, nunca el número de portal.");
  pisosData.pisos.forEach((pi) => {
    const partes = [`${pisoTitulo(pi)}, ${pi.calle}`, `${pi.m2} m²`, `${pi.dormitorios} dormitorios`, `${pi.banos} ${pi.banos === 1 ? "baño" : "baños"}`];
    if (pi.detalles) partes.push(pi.detalles);
    if (pisosData.mostrarPrecios && pi.precio) partes.push(`vendido por ${pi.precio.toLocaleString("es-ES")} €`);
    L.push(`- ${partes.join(". ")}. Vendido.`);
  });
  L.push("");

  h(2, `Sobre Ester (${absoluteUrl("/sobre-ester")})`);
  p(sobre.intro);
  sobre.secciones.forEach((s) => {
    h(3, s.titulo);
    s.parrafos.forEach(p);
  });

  h(2, `Comprar: personal shopper inmobiliario (${absoluteUrl("/comprar")})`);
  h(3, comprar.titulo);
  p(comprar.sub);
  comprar.comoTrabajo.pasos.forEach((s, i) => p(`${i + 1}. ${s.titulo} ${s.texto}`));

  h(2, `Guía: ${guia.titulo} (${absoluteUrl("/guia-por-que-no-se-vende")})`);
  p(guia.sub);
  guia.errores.forEach((e, i) => {
    h(3, `${i + 1}. ${e.q}`);
    p(e.a);
  });

  h(2, "Contacto");
  L.push(`- Correo: ${site.contacto.email}`, `- Instagram: ${site.contacto.instagramUrl}`, "- Madrid y alrededores, España.", "");
  return L.join("\n");
}
