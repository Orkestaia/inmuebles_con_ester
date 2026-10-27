// Plantillas HTML para Instagram de Inmuebles con Ester.
// Cada función devuelve el HTML completo de una pieza. Los estilos salen de la web (paleta vino/crema papel).
// Fuentes: Google Fonts (necesita red al renderizar). Fotos: rutas file:// que pasa render.mjs.

const C = {
  crema: "#f7f1e8",
  cremaOscuro: "#efe5d8",
  vino: "#6e2a46",
  vinoOscuro: "#4e1b31",
  vinoNoche: "#3d1424",
  rosa: "#d9a3b5",
  rosaClaro: "#f5e6ec",
  dorado: "#c9a46a",
  tinta: "#2a1f24",
  tintaSuave: "#5f5257",
  blanco: "#ffffff",
};

const PAPEL = `background-color:${C.crema};background-image:radial-gradient(ellipse at 20% 10%, rgba(255,255,255,.7), transparent 55%),radial-gradient(ellipse at 80% 90%, rgba(201,164,106,.14), transparent 55%),url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");`;

export const FORMATOS = {
  feed: { w: 1080, h: 1350 },
  cuadrado: { w: 1080, h: 1080 },
  reel: { w: 1080, h: 1920 },
};

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** *cursiva* → <em>, **negrita** → <strong>, \n → <br> */
const rich = (s = "") =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");

function base({ w, h, fondo = "papel", body, extraCss = "" }) {
  const bg = fondo === "vino" ? `background:${C.vinoNoche};` : fondo === "blanco" ? `background:${C.blanco};` : PAPEL;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:${w}px;height:${h}px;overflow:hidden}
  body{${bg}color:${C.tinta};font-family:"Source Sans 3",system-ui,sans-serif;-webkit-font-smoothing:antialiased;position:relative}
  .display{font-family:"Playfair Display",Georgia,serif}
  .script{font-family:"Great Vibes",cursive}
  .vino{color:${C.vino}} .crema{color:${C.crema}} .blanco{color:${C.blanco}} .suave{color:${C.tintaSuave}} .dorado{color:${C.dorado}} .rosa{color:${C.rosa}}
  .eyebrow{font-weight:600;letter-spacing:.28em;text-transform:uppercase;font-size:26px}
  .logo{display:inline-block;line-height:1;text-decoration:none}
  .logo .l1{display:block;font-family:"Playfair Display",serif;font-weight:600;letter-spacing:.22em;text-transform:uppercase}
  .logo .l2{display:flex;align-items:baseline;gap:8px}
  .logo .con{letter-spacing:.3em;text-transform:uppercase;font-weight:600}
  .logo .ester{font-family:"Great Vibes",cursive;line-height:.9}
  .logo .l3{display:flex;align-items:center;justify-content:flex-end;gap:6px;letter-spacing:.28em;text-transform:uppercase;font-weight:600}
  .logo.s .l1{font-size:26px} .logo.s .con{font-size:15px} .logo.s .ester{font-size:66px} .logo.s .l3{font-size:14px;margin-top:-6px}
  .logo.m .l1{font-size:38px} .logo.m .con{font-size:20px} .logo.m .ester{font-size:96px} .logo.m .l3{font-size:19px;margin-top:-8px}
  .llave{display:inline-block}
  .badge{display:inline-block;background:${C.vino};color:${C.blanco};font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:24px;padding:12px 20px;border-radius:10px}
  .btn{display:inline-block;background:${C.vino};color:${C.blanco};font-weight:700;font-size:34px;padding:26px 44px;border-radius:14px}
  .btn.outline{background:transparent;color:${C.blanco};border:3px solid rgba(255,255,255,.8)}
  .foto{position:absolute;object-fit:cover;object-position:top}
  .papel{${PAPEL}}
  .linea{height:2px;background:${C.dorado};width:120px}
  .handle{font-weight:600;font-size:30px;letter-spacing:.04em}
  ${extraCss}
</style></head><body>${body}</body></html>`;
}

function logo({ size = "s", claro = false } = {}) {
  const col = claro ? C.crema : C.vino;
  const llave = `<svg class="llave" viewBox="0 0 48 24" width="${size === "m" ? 44 : 30}" height="${size === "m" ? 22 : 15}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="12" r="6"/><path d="M16 12h28M38 12v5M32 12v4"/></svg>`;
  return `<div class="logo ${size}" style="color:${col}"><span class="l1">Inmuebles</span><span class="l2"><span class="con">con</span><span class="ester">Ester</span></span><span class="l3">${llave}Madrid</span></div>`;
}

const handle = (claro = false) => `<div class="handle" style="color:${claro ? C.crema : C.vino}">@inmueblesconester</div>`;

/* ───────── Plantillas ───────── */

/** Cita o lema sobre papel, logo arriba, handle abajo. */
export function cita({ texto, firma = "", formato = "cuadrado" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:0 110px">
  <div style="text-align:center">
    <p class="display" style="font-style:italic;font-size:${formato === "cuadrado" ? 84 : 92}px;line-height:1.15;color:${C.vinoOscuro}">${rich(texto)}</p>
    ${firma ? `<p class="script vino" style="font-size:64px;margin-top:40px">${esc(firma)}</p>` : ""}
  </div>
</div>
<div style="position:absolute;bottom:72px;left:0;right:0;text-align:center">${handle()}</div>`,
  });
}

/** Consejo numerado: número grande, titular, texto corto. */
export function consejo({ numero, eyebrow = "Para propietarios", titulo, texto, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
<div style="position:absolute;top:72px;right:80px" class="eyebrow vino">${esc(eyebrow)}</div>
<div style="position:absolute;left:80px;right:80px;top:300px">
  ${numero ? `<p class="display" style="font-style:italic;font-size:150px;line-height:1;color:${C.dorado}">${esc(numero)}</p>` : ""}
  <h1 class="display vino" style="font-size:88px;line-height:1.08;margin-top:24px;font-weight:500">${rich(titulo)}</h1>
  <div class="linea" style="margin:44px 0"></div>
  <p class="suave" style="font-size:42px;line-height:1.4">${rich(texto)}</p>
</div>
<div style="position:absolute;bottom:72px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:end">
  ${handle()}
  <span class="script vino" style="font-size:54px">Tu piso, en las mejores manos</span>
</div>`,
  });
}

/** Vivienda vendida: foto o papel con el barrio, datos y VENDIDO. */
export function vendido({ zona, calle, datos, detalles = "", foto = "", formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const altoFoto = 760;
  const cabecera = foto
    ? `<img class="foto" src="${foto}" style="top:0;left:0;width:${w}px;height:${altoFoto}px">`
    : `<div class="papel" style="position:absolute;top:0;left:0;width:${w}px;height:${altoFoto}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px">
         <svg viewBox="0 0 48 24" width="140" height="70" fill="none" stroke="${C.vino}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".8"><circle cx="10" cy="12" r="6"/><path d="M16 12h28M38 12v5M32 12v4"/></svg>
         <p class="display" style="letter-spacing:.26em;text-transform:uppercase;font-size:44px;color:${C.vino};text-align:center;padding:0 80px;line-height:1.3">${esc(zona)}</p>
       </div>`;
  return base({
    w, h, fondo: "blanco",
    body: `
${cabecera}
<div style="position:absolute;top:40px;left:40px" class="badge">Vendido</div>
<div style="position:absolute;top:40px;right:40px;background:rgba(255,255,255,.92);padding:14px 18px;border-radius:14px">${logo({ size: "s" })}</div>
<div style="position:absolute;top:${altoFoto}px;left:0;right:0;bottom:0;padding:64px 80px">
  <p class="eyebrow vino">Vivienda vendida</p>
  <h1 class="display vino" style="font-size:84px;line-height:1.05;margin-top:18px;font-weight:500">${esc(zona)}</h1>
  <p class="suave" style="font-size:40px;margin-top:14px">${esc(calle)}</p>
  <p style="font-size:40px;margin-top:40px;color:${C.tinta}">${esc(datos)}</p>
  ${detalles ? `<p class="suave" style="font-size:36px;margin-top:10px">${esc(detalles)}</p>` : ""}
  <div style="position:absolute;bottom:64px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:end">
    ${handle()}
    <span class="script vino" style="font-size:52px">Casos reales</span>
  </div>
</div>`,
  });
}

/** Ester con texto grande encima de papel y la foto a la derecha. Sirve para «¿Hablamos?» y anuncios. */
export function ester({ eyebrow = "", titulo, texto = "", cta = "", nota = "", foto, formato = "feed", oscuro = false }) {
  const { w, h } = FORMATOS[formato];
  const esReel = formato === "reel";
  const xFoto = Math.round(w * 0.47);
  const altoFoto = esReel ? Math.round(h * 0.52) : h;
  const fondoCol = oscuro ? C.vinoNoche : C.crema;
  const col = oscuro ? C.crema : C.vino;
  const textoCol = oscuro ? "rgba(247,241,232,.88)" : C.tintaSuave;
  const fotoCss = esReel ? `top:0;left:0;width:${w}px;height:${altoFoto}px` : `top:0;left:${xFoto}px;width:${w - xFoto}px;height:${h}px`;
  const velo = esReel
    ? `<div style="position:absolute;top:${altoFoto - 240}px;left:0;width:${w}px;height:241px;background:linear-gradient(to bottom, transparent, ${fondoCol})"></div>`
    : `<div style="position:absolute;top:0;left:${xFoto}px;width:240px;height:${h}px;background:linear-gradient(to right, ${fondoCol} 0%, ${fondoCol} 35%, transparent)"></div>`;
  const bloque = esReel
    ? `position:absolute;top:${altoFoto - 60}px;left:80px;right:80px;bottom:300px;display:flex;flex-direction:column;justify-content:flex-start`
    : `position:absolute;top:300px;left:80px;width:${xFoto + 140}px;bottom:200px;display:flex;flex-direction:column;justify-content:center`;
  const tam = esReel ? 92 : formato === "cuadrado" ? 64 : 70;
  return base({
    w, h, fondo: oscuro ? "vino" : "papel",
    body: `
<img class="foto" src="${foto}" style="${fotoCss}">
${velo}
<div style="position:absolute;top:72px;left:80px;${esReel ? `background:${oscuro ? "rgba(61,20,36,.6)" : "rgba(247,241,232,.9)"};padding:14px 18px;border-radius:14px` : ""}">${logo({ size: "s", claro: oscuro })}</div>
<div style="${bloque}">
  ${eyebrow ? `<p class="eyebrow" style="color:${oscuro ? C.rosa : C.vino}">${esc(eyebrow)}</p>` : ""}
  <h1 class="display" style="font-size:${tam}px;line-height:1.08;margin-top:20px;font-weight:500;color:${col}">${rich(titulo)}</h1>
  ${texto ? `<p style="font-size:${esReel ? 40 : 34}px;line-height:1.4;margin-top:30px;color:${textoCol}">${rich(texto)}</p>` : ""}
  ${cta ? `<div style="margin-top:44px"><span class="btn ${oscuro ? "outline" : ""}" style="font-size:${esReel ? 34 : 30}px;padding:${esReel ? "26px 44px" : "22px 36px"}">${esc(cta)}</span></div>` : ""}
  ${nota ? `<p style="font-size:${esReel ? 30 : 26}px;margin-top:20px;color:${textoCol}">${esc(nota)}</p>` : ""}
</div>
<div style="position:absolute;bottom:72px;left:80px">${handle(oscuro)}</div>`,
  });
}

/** Portada de carrusel: foto arriba, título abajo, «desliza». */
export function portada({ eyebrow, titulo, foto, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  const altoFoto = 700;
  return base({
    w, h,
    body: `
<img class="foto" src="${foto}" style="top:0;left:0;width:${w}px;height:${altoFoto}px">
<div style="position:absolute;top:${altoFoto - 200}px;left:0;width:${w}px;height:201px;background:linear-gradient(to bottom, transparent, ${C.crema})"></div>
<div style="position:absolute;top:56px;left:80px;background:rgba(247,241,232,.9);padding:14px 18px;border-radius:14px">${logo({ size: "s" })}</div>
<div style="position:absolute;top:${altoFoto - 20}px;left:80px;right:80px">
  <p class="eyebrow vino">${esc(eyebrow)}</p>
  <h1 class="display vino" style="font-size:92px;line-height:1.06;margin-top:20px;font-weight:500">${rich(titulo)}</h1>
</div>
<div style="position:absolute;bottom:72px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center">
  ${handle()}
  <span class="suave" style="font-size:30px;letter-spacing:.2em;text-transform:uppercase">Desliza →</span>
</div>`,
  });
}

/** Slide interior de carrusel: número, titular, texto. */
export function slide({ numero, total, titulo, texto, formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h,
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s" })}</div>
<div class="display suave" style="position:absolute;top:84px;right:80px;font-size:34px;letter-spacing:.1em">${esc(numero)} / ${esc(total)}</div>
<div style="position:absolute;left:80px;right:80px;top:330px">
  <p class="display" style="font-style:italic;font-size:140px;line-height:1;color:${C.dorado}">${String(numero).padStart(2, "0")}</p>
  <h2 class="display vino" style="font-size:84px;line-height:1.08;margin-top:20px;font-weight:500">${rich(titulo)}</h2>
  <div class="linea" style="margin:40px 0"></div>
  <p class="suave" style="font-size:42px;line-height:1.42">${rich(texto)}</p>
</div>
<div style="position:absolute;bottom:72px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center">
  ${handle()}
  <span class="suave" style="font-size:30px;letter-spacing:.2em;text-transform:uppercase">${Number(numero) < Number(total) ? "Desliza →" : ""}</span>
</div>`,
  });
}

/** Cierre de carrusel o pieza de CTA en vino noche. */
export function cierre({ titulo, texto = "", cta = "Escríbeme por mensaje", formato = "feed" }) {
  const { w, h } = FORMATOS[formato];
  return base({
    w, h, fondo: "vino",
    body: `
<div style="position:absolute;top:72px;left:80px">${logo({ size: "s", claro: true })}</div>
<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 90px">
  <p class="eyebrow rosa">Tu casa merece el mejor cuidado</p>
  <h2 class="display crema" style="font-size:92px;line-height:1.08;margin-top:24px;font-weight:500">${rich(titulo)}</h2>
  ${texto ? `<p style="font-size:40px;line-height:1.4;margin-top:34px;color:rgba(247,241,232,.85)">${rich(texto)}</p>` : ""}
  <div style="margin-top:56px"><span class="btn outline">${esc(cta)}</span></div>
  <p style="font-size:30px;margin-top:24px;color:rgba(247,241,232,.7)">Te respondo en menos de 24 horas.</p>
</div>
<div style="position:absolute;bottom:72px;left:80px">${handle(true)}</div>`,
  });
}

/** Overlay transparente para reels (texto en área segura). Fondo transparente: se superpone al vídeo con ffmpeg. */
export function overlayReel({ titulo, subtitulo = "", pos = "abajo" }) {
  const { w, h } = FORMATOS.reel;
  const top = pos === "arriba" ? 260 : pos === "centro" ? 760 : 1150;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=Great+Vibes&family=Source+Sans+3:wght@600&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;background:transparent;overflow:hidden}
.card{position:absolute;left:70px;right:70px;top:${top}px;background:rgba(247,241,232,.94);border-radius:28px;padding:54px 60px}
.t{font-family:"Playfair Display",serif;font-weight:500;font-size:74px;line-height:1.1;color:#6e2a46}
.s{font-family:"Source Sans 3",sans-serif;font-weight:600;font-size:38px;line-height:1.35;color:#5f5257;margin-top:22px}
.h{position:absolute;right:70px;top:200px;font-family:"Source Sans 3",sans-serif;font-weight:600;font-size:32px;color:#f7f1e8;text-shadow:0 2px 12px rgba(0,0,0,.6)}
.logo{position:absolute;top:150px;left:70px;color:#f7f1e8;text-shadow:0 2px 14px rgba(0,0,0,.55);line-height:1}
.logo .l1{display:block;font-family:"Playfair Display",serif;font-weight:600;letter-spacing:.22em;text-transform:uppercase;font-size:28px}
.logo .ester{font-family:"Great Vibes",cursive;font-size:76px;line-height:.9}
</style></head><body>
<div class="logo"><span class="l1">Inmuebles</span><span class="ester">con Ester</span></div>
<div class="card"><p class="t">${rich(titulo)}</p>${subtitulo ? `<p class="s">${rich(subtitulo)}</p>` : ""}</div>
<div class="h">@inmueblesconester</div>
</body></html>`;
}

export const PLANTILLAS = { cita, consejo, vendido, ester, portada, slide, cierre, overlayReel };

/* Helpers compartidos con templates-v2.mjs */
export { C, PAPEL, base, logo, handle, rich, esc };
