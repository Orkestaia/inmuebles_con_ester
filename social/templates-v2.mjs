// Plantillas v2 (27-oct-2026): piezas sin foto de Ester, con la marca de la web.
// Fachadas en línea fina para pisos vendidos, sello «Vendido», comparativas, mitos, checklists,
// glosario, piezas de valor («por qué conmigo»), preguntas, iceberg y mapa de ventas.

import { C, FORMATOS, PAPEL, base, esc, handle, logo, rich } from "./templates.mjs";

/* ───────── Iconos de trazo fino (viewBox 24) ───────── */
const IC = {
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  casa: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-6h4v6"/>',
  escudo: '<path d="M12 3 4.5 6v6c0 4.5 3 7.8 7.5 9 4.5-1.2 7.5-4.5 7.5-9V6L12 3z"/><path d="m9 12 2 2 4-4"/>',
  estrella: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8L12 3.5z"/>',
  manos: '<path d="M3 12.5 7.5 8h4l3 3-3 3-2.5-2.5"/><path d="M21 12.5 16.5 8h-2"/><path d="M8.5 14 12 17.5l3-3 3-3"/>',
  llave: '<circle cx="7" cy="12" r="4"/><path d="M11 12h10M18 12v3M15 12v2.5"/>',
  ojo: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  corazon: '<path d="M12 20s-7-4.4-9-9.2C1.6 7.2 4 4 7.2 4c2 0 3.6 1.2 4.8 3 1.2-1.8 2.8-3 4.8-3C20 4 22.4 7.2 21 10.8 19 15.6 12 20 12 20z"/>',
  documento: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  pluma: '<path d="M4 20 15 9"/><path d="M14 4c3 0 6 3 6 6l-6 6-6-6 6-6z"/>',
  telefono: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  marcador: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  pregunta: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7v.5"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
};
const icono = (n, size = 64, color = C.vino, sw = 1.4) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${IC[n] ?? IC.casa}</svg>`;

/* ───────── Sello «Vendido» ───────── */
export function sello(size = 230, rot = -12) {
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" style="transform:rotate(${rot}deg)">
  <defs><path id="sc" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"/></defs>
  <circle cx="100" cy="100" r="95" fill="${C.crema}" stroke="${C.vino}" stroke-width="3"/>
  <circle cx="100" cy="100" r="86" fill="none" stroke="${C.vino}" stroke-width="1"/>
  <circle cx="100" cy="100" r="54" fill="none" stroke="${C.vino}" stroke-width="1"/>
  <text font-family="Source Sans 3, sans-serif" font-weight="700" font-size="14" letter-spacing="3.6" fill="${C.vino}"><textPath href="#sc">VENDIDO · INMUEBLES CON ESTER · MADRID ·</textPath></text>
  <text x="100" y="112" text-anchor="middle" font-family="Great Vibes, cursive" font-size="40" fill="${C.vino}">Vendido</text>
</svg>`;
}

/* ───────── Fachada madrileña en línea fina ─────────
   plantas: número de plantas sobre el bajo. resaltar: número de planta (1..n) o 0 para el bajo. */
export function fachada({ plantas = 5, resaltar = null, ancho = 560, etiqueta = "" } = {}) {
  const W = 520, roofH = 64, corH = 22, floorH = 92, groundH = 120;
  const H = roofH + corH + plantas * floorH + groundH + 10;
  const col = C.vino, sw = 2;
  const cols = [125, 260, 395];
  const parts = [];
  // tejado abuhardillado con buhardillas
  parts.push(`<path d="M50 ${roofH} L80 8 L440 8 L470 ${roofH} Z" fill="rgba(255,255,255,.35)" stroke="${col}" stroke-width="${sw}"/>`);
  for (const x of cols) parts.push(`<path d="M${x - 20} ${roofH - 6} V30 a20 20 0 0 1 40 0 V${roofH - 6}" fill="none" stroke="${col}" stroke-width="${sw * 0.8}"/>`);
  // cornisa
  const yCor = roofH;
  parts.push(`<rect x="18" y="${yCor}" width="${W - 36}" height="${corH}" fill="rgba(255,255,255,.5)" stroke="${col}" stroke-width="${sw}"/>`);
  parts.push(`<path d="M30 ${yCor + corH + 6} H${W - 30}" stroke="${col}" stroke-width="1"/>`);
  // cuerpo
  const yBody = yCor + corH;
  const bodyH = plantas * floorH + groundH;
  parts.push(`<rect x="38" y="${yBody}" width="${W - 76}" height="${bodyH}" fill="rgba(255,255,255,.35)" stroke="${col}" stroke-width="${sw}"/>`);
  // plantas (de arriba a abajo: planta n ... 1)
  for (let i = 0; i < plantas; i++) {
    const planta = plantas - i;
    const y0 = yBody + i * floorH + 14;
    const on = resaltar === planta;
    for (const x of cols) {
      const fill = on ? C.rosaClaro : "none";
      parts.push(`<rect x="${x - 26}" y="${y0}" width="52" height="58" rx="2" fill="${fill}" stroke="${col}" stroke-width="${sw}"/>`);
      parts.push(`<path d="M${x} ${y0} V${y0 + 58}" stroke="${col}" stroke-width="1"/>`);
      parts.push(`<path d="M${x - 32} ${y0 - 6} H${x + 32}" stroke="${col}" stroke-width="${sw}"/>`);
      // balcón con barandilla
      const yb = y0 + 44;
      parts.push(`<rect x="${x - 36}" y="${yb}" width="72" height="20" fill="${on ? C.rosaClaro : "rgba(247,241,232,.6)"}" stroke="${col}" stroke-width="${sw * 0.8}"/>`);
      for (let b = x - 30; b <= x + 30; b += 8) parts.push(`<path d="M${b} ${yb + 3} V${yb + 17}" stroke="${col}" stroke-width=".9"/>`);
    }
    if (i < plantas - 1) parts.push(`<path d="M38 ${yBody + (i + 1) * floorH} H${W - 38}" stroke="${col}" stroke-width=".6" stroke-dasharray="2 6"/>`);
  }
  // bajo
  const yG = yBody + plantas * floorH;
  parts.push(`<path d="M38 ${yG} H${W - 38}" stroke="${col}" stroke-width="${sw}"/>`);
  const onG = resaltar === 0;
  parts.push(`<path d="M${260 - 30} ${yG + groundH} V${yG + 42} a30 30 0 0 1 60 0 V${yG + groundH}" fill="${C.rosaClaro}" stroke="${col}" stroke-width="${sw}"/>`);
  parts.push(`<path d="M260 ${yG + 42} V${yG + groundH}" stroke="${col}" stroke-width="1"/>`);
  for (const x of [125, 395]) {
    parts.push(`<rect x="${x - 50}" y="${yG + 22}" width="100" height="72" rx="2" fill="${onG ? C.rosaClaro : "none"}" stroke="${col}" stroke-width="${sw}"/>`);
    parts.push(`<path d="M${x - 50} ${yG + 40} H${x + 50}" stroke="${col}" stroke-width="1"/>`);
  }
  // suelo
  parts.push(`<path d="M0 ${yG + groundH} H${W}" stroke="${col}" stroke-width="${sw}"/>`);
  // etiqueta de planta
  if (resaltar !== null && resaltar !== undefined && etiqueta) {
    const yL = resaltar === 0 ? yG + 58 : yBody + (plantas - resaltar) * floorH + 44;
    parts.push(`<path d="M${W - 38} ${yL} H${W + 6}" stroke="${C.dorado}" stroke-width="2"/>`);
    parts.push(`<circle cx="${W - 38}" cy="${yL}" r="4" fill="${C.dorado}"/>`);
  }
  const alto = Math.round((ancho * H) / W);
  return { svg: `<svg viewBox="0 0 ${W + 10} ${H}" width="${ancho}" height="${alto}" overflow="visible">${parts.join("")}</svg>`, alto, yRel: resaltar === null || resaltar === undefined ? null : (resaltar === 0 ? (yBody + plantas * floorH + 58) / H : (yBody + (plantas - resaltar) * floorH + 44) / H) };
}

/* ───────── Piezas comunes ───────── */
const contador = (n, total) => (n && total ? `<div class="display suave" style="position:absolute;top:84px;right:80px;font-size:32px;letter-spacing:.12em">${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}</div>` : "");
const pie = ({ desliza = false, script = "" } = {}) => `<div style="position:absolute;bottom:72px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:end">
  ${handle()}
  ${desliza ? `<span class="suave" style="font-size:28px;letter-spacing:.22em;text-transform:uppercase">Desliza →</span>` : script ? `<span class="script vino" style="font-size:52px">${esc(script)}</span>` : ""}
</div>`;
const cuerpo = (top = 210, bottom = 190) => `position:absolute;left:80px;right:80px;top:${top}px;bottom:${bottom}px;display:flex;flex-direction:column;justify-content:center`;
const marco = (oscuro = false) => `<div style="position:absolute;inset:36px;border:1.5px solid ${oscuro ? "rgba(247,241,232,.35)" : "rgba(110,42,70,.28)"};border-radius:6px;pointer-events:none"></div>`;

/* 1 · Vendido v2: fachada + sello + datos */
export function vendidoFachada({ zona, distrito = "", calle, datos = [], detalles = "", plantas = 5, resaltar = null, etiquetaPlanta = "", formato = "feed", n, total, script = "Casos reales" }) {
  const { w, h } = FORMATOS[formato];
  // La fachada se escala para que el texto quepa siempre entre ella y el pie.
  const altoMax = 610, baseW = 530;
  const altoNatural = 64 + 22 + plantas * 92 + 120 + 10;
  const anchoF = Math.min(470, Math.round((altoMax * baseW) / altoNatural));
  const f = fachada({ plantas, resaltar, ancho: anchoF, etiqueta: etiquetaPlanta });
  const top = 200;
  const xF = Math.round((w - anchoF) / 2) - 20;
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
${n ? contador(n, total) : `<div class="eyebrow vino" style="position:absolute;top:84px;right:80px;font-size:22px">Vivienda vendida</div>`}
<div style="position:absolute;top:${top}px;left:${xF}px">${f.svg}</div>
${f.yRel !== null && etiquetaPlanta ? `<div class="display" style="position:absolute;top:${top + Math.round(f.yRel * f.alto) - 30}px;left:${xF + anchoF + 8}px;font-style:italic;font-size:46px;color:${C.dorado}">${esc(etiquetaPlanta)}</div>` : ""}
<div style="position:absolute;top:${top + f.alto - 190}px;left:46px">${sello(200, -10)}</div>
<div style="position:absolute;left:80px;right:80px;top:${top + f.alto + 46}px">
  <p class="eyebrow vino" style="font-size:22px">${esc(zona)}${distrito ? ` · ${esc(distrito)}` : ""}</p>
  <h1 class="display vino" style="font-size:76px;line-height:1.05;margin-top:12px;font-weight:500">${esc(calle)}</h1>
  <p style="font-size:34px;margin-top:18px;color:${C.tinta}">${datos.map(esc).join(` <span style="color:${C.dorado}">·</span> `)}</p>
  ${detalles ? `<p class="suave" style="font-size:30px;margin-top:8px">${esc(detalles)}</p>` : ""}
</div>
${pie({ script })}`,
  });
}

/* 2 · Mapa de ventas: dónde he vendido */
export function mapaVentas({ titulo, intro = "", zonas = [], formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const filas = zonas
    .map(
      (z) => `<div style="display:flex;align-items:center;gap:26px;padding:16px 0;border-bottom:1px solid rgba(110,42,70,.18)">
  ${icono("llave", 46, C.dorado, 1.6)}
  <div style="flex:1"><p class="display vino" style="font-size:40px;line-height:1.1">${esc(z.zona)}</p>${z.sub ? `<p class="suave" style="font-size:24px;margin-top:2px">${esc(z.sub)}</p>` : ""}</div>
  <p class="display" style="font-size:40px;font-style:italic;color:${C.vino}">${esc(z.n)}</p>
</div>`,
    )
    .join("");
  return base({
    w, h,
    body: `${marco()}
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
<div style="position:absolute;top:220px;left:80px;right:80px">
  <p class="eyebrow vino" style="font-size:22px">Viviendas vendidas</p>
  <h1 class="display vino" style="font-size:74px;line-height:1.06;margin-top:16px;font-weight:500">${rich(titulo)}</h1>
  ${intro ? `<p class="suave" style="font-size:32px;line-height:1.4;margin-top:22px">${rich(intro)}</p>` : ""}
  <div style="margin-top:24px">${filas}</div>
</div>
${pie({ script: "Cada piso tiene su comprador" })}`,
  });
}

/* 3 · Portada sin foto (tipo tarjeta de invitación) */
export function portadaTexto({ eyebrow, titulo, sub = "", icono: ic = "casa", oscuro = false, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const col = oscuro ? C.crema : C.vino;
  return base({
    w, h, fondo: oscuro ? "vino" : "papel",
    body: `${marco(oscuro)}
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s", claro: oscuro })}</div>
<div style="${cuerpo(200, 200)}">
  <div style="width:120px;height:120px;border-radius:50%;border:1.5px solid ${oscuro ? "rgba(247,241,232,.5)" : "rgba(110,42,70,.35)"};display:flex;align-items:center;justify-content:center">${icono(ic, 60, oscuro ? C.rosa : C.vino)}</div>
  <p class="eyebrow" style="margin-top:46px;font-size:24px;color:${oscuro ? C.rosa : C.vino}">${esc(eyebrow)}</p>
  <h1 class="display" style="font-size:100px;line-height:1.04;margin-top:18px;font-weight:500;color:${col}">${rich(titulo)}</h1>
  ${sub ? `<p style="font-size:36px;line-height:1.4;margin-top:30px;color:${oscuro ? "rgba(247,241,232,.85)" : C.tintaSuave}">${rich(sub)}</p>` : ""}
</div>
<div style="position:absolute;bottom:72px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:end">
  ${handle(oscuro)}
  <span style="font-size:28px;letter-spacing:.22em;text-transform:uppercase;color:${oscuro ? "rgba(247,241,232,.7)" : C.tintaSuave}">Desliza →</span>
</div>`,
  });
}

/* 4 · Comparativa: por tu cuenta vs. conmigo (una fila por slide) */
export function comparativa({ n, total, tema, solo, conmigo, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const x = `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="${C.tintaSuave}" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`;
  const ok = `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="${C.blanco}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>`;
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
${contador(n, total)}
<div style="${cuerpo(210, 190)}">
  <p class="eyebrow vino" style="font-size:22px">Vender tu piso</p>
  <h2 class="display vino" style="font-size:84px;line-height:1.05;margin-top:14px;margin-bottom:56px;font-weight:500">${rich(tema)}</h2>
<div style="display:flex;flex-direction:column;gap:26px">
  <div style="background:rgba(255,255,255,.55);border:1.5px solid ${C.linea ?? "#e6dbcd"};border-radius:22px;padding:36px 40px;display:flex;gap:28px;align-items:flex-start">
    <div style="flex:none;width:64px;height:64px;border-radius:50%;border:1.5px solid rgba(95,82,87,.4);display:flex;align-items:center;justify-content:center">${x}</div>
    <div><p class="eyebrow suave" style="font-size:20px">Por tu cuenta</p><p class="suave" style="font-size:38px;line-height:1.3;margin-top:10px">${rich(solo)}</p></div>
  </div>
  <div style="background:${C.vino};border-radius:22px;padding:36px 40px;display:flex;gap:28px;align-items:flex-start">
    <div style="flex:none;width:64px;height:64px;border-radius:50%;background:${C.vinoOscuro};display:flex;align-items:center;justify-content:center">${ok}</div>
    <div><p class="eyebrow" style="font-size:20px;color:${C.rosa}">Conmigo</p><p style="font-size:38px;line-height:1.3;margin-top:10px;color:${C.crema}">${rich(conmigo)}</p></div>
  </div>
</div>
</div>
${pie({ desliza: n < total })}`,
  });
}

/* 5 · Mito / realidad */
export function mito({ n, total, mito: m, realidad, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
${contador(n, total)}
<div style="${cuerpo(210, 190)}">
  <div><span style="display:inline-block;border:2px solid ${C.tintaSuave};color:${C.tintaSuave};font-weight:700;letter-spacing:.24em;font-size:24px;padding:10px 18px;border-radius:8px">MITO</span></div>
  <p class="display" style="font-size:60px;line-height:1.18;margin-top:26px;color:${C.tintaSuave};font-style:italic">«${rich(m)}»</p>
  <div style="height:2px;background:${C.dorado};width:120px;margin:56px 0"></div>
  <div><span style="display:inline-block;background:${C.vino};color:${C.crema};font-weight:700;letter-spacing:.24em;font-size:24px;padding:12px 20px;border-radius:8px">REALIDAD</span></div>
  <p class="display vino" style="font-size:54px;line-height:1.2;margin-top:26px;font-weight:500">${rich(realidad)}</p>
</div>
${pie({ desliza: n < total })}`,
  });
}

/* 6 · Checklist (documentos, preparar la casa…) */
export function checklist({ n, total, eyebrow = "Para propietarios", titulo, items = [], nota = "", formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const caja = `<svg viewBox="0 0 24 24" width="46" height="46" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="${C.vino}" stroke-width="1.6"/><path d="m7 12.5 3.2 3.2L17 8.5" stroke="${C.vino}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const lista = items
    .map(
      (it) => `<div style="display:flex;gap:26px;align-items:flex-start;padding:20px 0;border-bottom:1px solid rgba(110,42,70,.15)">
  <div style="flex:none;margin-top:4px">${caja}</div>
  <div><p class="display vino" style="font-size:40px;line-height:1.15;font-weight:500">${rich(it.t)}</p>${it.d ? `<p class="suave" style="font-size:28px;line-height:1.35;margin-top:6px">${rich(it.d)}</p>` : ""}</div>
</div>`,
    )
    .join("");
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
${contador(n, total)}
<div style="${cuerpo(200, 190)}">
  <p class="eyebrow vino" style="font-size:22px">${esc(eyebrow)}</p>
  <h2 class="display vino" style="font-size:72px;line-height:1.06;margin-top:14px;font-weight:500">${rich(titulo)}</h2>
  <div style="margin-top:30px">${lista}</div>
  ${nota ? `<p class="suave" style="font-size:24px;line-height:1.4;margin-top:22px;font-style:italic">${rich(nota)}</p>` : ""}
</div>
${pie({ desliza: n && n < total })}`,
  });
}

/* 7 · Glosario: un término por slide */
export function glosario({ n, total, termino, definicion, importa = "", formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
${contador(n, total)}
<div style="${cuerpo(210, 190)}">
  <p class="eyebrow vino" style="font-size:22px">Glosario para vender tu piso</p>
  <h2 class="display vino" style="font-size:118px;line-height:1;margin-top:22px;font-style:italic;font-weight:500">${esc(termino)}</h2>
  <div style="height:2px;background:${C.dorado};width:120px;margin:42px 0"></div>
  <p style="font-size:40px;line-height:1.42;color:${C.tinta}">${rich(definicion)}</p>
  ${importa ? `<div style="margin-top:44px;background:${C.rosaClaro};border-radius:20px;padding:30px 36px"><p class="eyebrow vino" style="font-size:20px">Por qué te importa</p><p class="suave" style="font-size:32px;line-height:1.4;margin-top:10px">${rich(importa)}</p></div>` : ""}
</div>
${pie({ desliza: n < total })}`,
  });
}

/* 8 · Valor: por qué contar conmigo (sin foto) */
export function valor({ eyebrow = "Por qué conmigo", titulo, texto, icono: ic = "persona", oscuro = false, formato = "feed", firma = "Ester" }) {
  const { w, h } = FORMATOS[formato];
  const col = oscuro ? C.crema : C.vino;
  return base({
    w, h, fondo: oscuro ? "vino" : "papel",
    body: `${marco(oscuro)}
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s", claro: oscuro })}</div>
<div style="position:absolute;top:84px;right:80px" class="eyebrow"><span style="font-size:22px;color:${oscuro ? C.rosa : C.vino}">${esc(eyebrow)}</span></div>
<div style="${cuerpo(210, 190)}">
  ${icono(ic, 96, oscuro ? C.rosa : C.vino, 1.2)}
  <h1 class="display" style="font-size:96px;line-height:1.05;margin-top:40px;font-weight:500;color:${col}">${rich(titulo)}</h1>
  <div style="height:2px;background:${C.dorado};width:120px;margin:44px 0"></div>
  <p style="font-size:40px;line-height:1.42;color:${oscuro ? "rgba(247,241,232,.86)" : C.tintaSuave}">${rich(texto)}</p>
</div>
<div style="position:absolute;bottom:72px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:end">
  ${handle(oscuro)}
  <span class="script" style="font-size:64px;color:${col}">${esc(firma)}</span>
</div>`,
  });
}

/* 9 · Pregunta frecuente (me lo preguntan mucho) */
export function pregunta({ pregunta: q, respuesta, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
<div style="position:absolute;top:84px;right:80px" class="eyebrow vino"><span style="font-size:22px">Me lo preguntan mucho</span></div>
<div style="${cuerpo(200, 190)}">
  <p class="display" style="font-size:260px;line-height:.7;color:${C.rosa};height:140px">“</p>
  <h1 class="display vino" style="font-size:78px;line-height:1.1;font-style:italic;font-weight:500">${rich(q)}</h1>
  <div style="height:2px;background:${C.dorado};width:120px;margin:46px 0"></div>
  <p style="font-size:38px;line-height:1.45;color:${C.tinta}">${rich(respuesta)}</p>
</div>
${pie({ script: "Te contesto yo" })}`,
  });
}

/* 10 · Iceberg: lo que no se ve */
export function iceberg({ titulo, visible, ocultos = [], formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const agua = 470;
  const lista = ocultos.map((t) => `<li style="display:flex;gap:18px;align-items:baseline;margin:14px 0"><span style="flex:none;width:10px;height:10px;border-radius:50%;background:${C.dorado};transform:translateY(-6px)"></span><span>${rich(t)}</span></li>`).join("");
  return base({
    w, h,
    body: `
<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to bottom, transparent ${agua}px, ${C.vinoNoche} ${agua}px)"></div>
<svg style="position:absolute;top:0;left:0" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <path d="M770 ${agua} L835 340 L885 368 L935 300 L1010 ${agua} Z" fill="${C.blanco}" stroke="${C.vino}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M770 ${agua} L705 650 L745 870 L870 1020 L1030 960 L1075 770 L1050 610 L1010 ${agua} Z" fill="rgba(247,241,232,.07)" stroke="${C.rosa}" stroke-width="2" stroke-dasharray="6 8" stroke-linejoin="round"/>
  <path d="M0 ${agua} C 120 ${agua - 10}, 240 ${agua + 10}, 360 ${agua} S 600 ${agua - 10}, 720 ${agua} S 960 ${agua + 10}, ${w} ${agua}" stroke="${C.rosa}" stroke-width="2" fill="none"/>
</svg>
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
<div style="position:absolute;top:220px;left:80px;width:560px">
  <h1 class="display vino" style="font-size:60px;line-height:1.08;font-weight:500">${rich(titulo)}</h1>
</div>
<div style="position:absolute;top:120px;left:700px;width:330px">
  <p class="eyebrow vino" style="font-size:18px">Lo que ves</p>
  <p class="display vino" style="font-size:38px;line-height:1.15;margin-top:8px;font-style:italic">${rich(visible)}</p>
</div>
<div style="position:absolute;top:${agua + 50}px;left:80px;width:590px;color:${C.crema};font-size:32px;line-height:1.3">
  <p class="eyebrow" style="font-size:18px;color:${C.rosa}">Lo que no se ve</p>
  <ul style="list-style:none;margin-top:10px">${lista}</ul>
</div>
<div style="position:absolute;bottom:64px;left:80px">${handle(true)}</div>`,
  });
}

/* 11 · Guárdalo (cierre educativo) */
export function guardalo({ titulo = "Guárdalo para cuando lo necesites", texto = "", cta = "Escríbeme por mensaje", formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h, fondo: "vino",
    body: `${marco(true)}
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s", claro: true })}</div>
<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 90px">
  ${icono("marcador", 90, C.rosa, 1.4)}
  <h2 class="display crema" style="font-size:88px;line-height:1.06;margin-top:34px;font-weight:500">${rich(titulo)}</h2>
  ${texto ? `<p style="font-size:38px;line-height:1.42;margin-top:30px;color:rgba(247,241,232,.86)">${rich(texto)}</p>` : ""}
  <div style="margin-top:50px"><span class="btn outline">${esc(cta)}</span></div>
  <p style="font-size:28px;margin-top:22px;color:rgba(247,241,232,.7)">Te respondo en menos de 24 horas.</p>
</div>
<div style="position:absolute;bottom:72px;left:80px">${handle(true)}</div>`,
  });
}

export const PLANTILLAS_V2 = { vendidoFachada, mapaVentas, portadaTexto, comparativa, mito, checklist, glosario, valor, pregunta, iceberg, guardalo };
