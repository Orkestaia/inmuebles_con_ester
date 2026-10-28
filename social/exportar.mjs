// Prepara la carpeta «publicar»: una subcarpeta por publicación, en orden, con las imágenes en JPG numeradas
// y el pie de foto listo para pegar (pie.txt). Lee el orden de publicar-orden.json y los pies de los .md de STUDIOS.
//
// Uso: node exportar.mjs [carpetaStudios] [salida]
//   carpetaStudios: ORKESTA-STUDIOS/clients/inmuebles-con-ester (por defecto)
//   salida:         C:/STUDIOS-MEDIA/inmuebles-con-ester/publicar (por defecto; media pesada fuera de OneDrive)
import sharp from "sharp";
import { readFile, writeFile, readdir, mkdir, rm, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const STUDIOS = process.argv[2] || "C:/Users/aitor/OneDrive/Escritorio/ORKESTA-STUDIOS/clients/inmuebles-con-ester";
const SALIDA = process.argv[3] || "C:/STUDIOS-MEDIA/inmuebles-con-ester/publicar";
const MEDIA_REELS = "C:/STUDIOS-MEDIA/inmuebles-con-ester/reels";
const BASE = "#inmueblesconester #vendermipiso #vendermicasamadrid #inmobiliariamadrid #agenteinmobiliariamadrid #pisosmadrid #vendercasa #madrid";
const FUENTES_PIES = ["calendario-noviembre-2026.md", "textos-lote-2.md", "textos-lote-3.md"];
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const DIAS_CARPETA = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
const SLUG_REELS = { R1: "R1-sin-honorarios", R2: "R2-meses-sin-venderse", R3: "R3-lo-primero-que-miro", R4: "R4-tres-cosas-antes-de-publicar" };

// ---------- pies de foto ----------
const RE_ID = /\b([PCKVSEQRA]\d{1,2})\b/;
function lineasAPie(lineas) {
  const parrafos = [];
  const extra = [];
  for (let l of lineas) {
    l = l.trim();
    if (!l) continue;
    if (l.startsWith("`#hashtags`")) {
      extra.push(...(l.match(/#[\p{L}\d_]+/gu) || []).filter((h) => h !== "#hashtags"));
      continue;
    }
    // hashtags sueltos al final de una línea: «texto. `#barrio #zona`»
    l = l.replace(/`(#[^`]+)`\s*$/u, (_, h) => {
      extra.push(...h.match(/#[\p{L}\d_]+/gu));
      return "";
    }).trim();
    if (l) parrafos.push(l);
  }
  const tags = [...new Set([...BASE.split(" "), ...extra])].join(" ");
  return `${parrafos.join("\n\n")}\n\n${tags}\n`;
}
async function leerPies() {
  const pies = {};
  const titulos = {};
  for (const f of FUENTES_PIES) {
    const lineas = (await readFile(path.join(STUDIOS, f), "utf8")).replace(/\r\n/g, "\n").split("\n");
    for (let i = 0; i < lineas.length; i++) {
      const m = lineas[i].match(/^\*\*(.+?)\*\*/);
      if (!m) continue;
      const id = m[1].match(RE_ID)?.[1];
      if (!id || pies[id]) continue;
      const cuerpo = [];
      let j = i + 1;
      while (j < lineas.length && lineas[j].startsWith(">")) cuerpo.push(lineas[j++].replace(/^>\s?/, ""));
      titulos[id] = m[1].split(" · ").filter((t) => !RE_ID.test(t) || t.length > 4).slice(-1)[0].replace(RE_ID, "").replace(/^[\s·:]+/, "").trim();
      if (cuerpo.length) pies[id] = lineasAPie(cuerpo);
    }
  }
  return { pies, titulos };
}

// ---------- origen de cada pieza ----------
async function buscar(dir, id) {
  if (!existsSync(dir)) return null;
  const hit = (await readdir(dir)).find((n) => n.startsWith(id + "-"));
  return hit ? path.join(dir, hit) : null;
}
async function origen(id) {
  const t = id[0];
  if (t === "R") {
    const n = Number(id.slice(1));
    if (n <= 2) return { tipo: "reel", archivos: [path.join(MEDIA_REELS, `${id}-final.mp4`)], slug: SLUG_REELS[id] };
    return { tipo: "guion", archivos: [path.join(STUDIOS, "reels", `${id}-guion.md`)], slug: SLUG_REELS[id] };
  }
  const candidatos = {
    P: ["posts"], C: ["carruseles"], K: ["v2/carruseles", "v3/carruseles"],
    V: ["v2/posts"], S: ["v2/posts"], Q: ["v2/posts"], E: ["v2/posts", "v3/posts"], A: ["ads"],
  }[t];
  for (const c of candidatos) {
    const p = await buscar(path.join(STUDIOS, c), id);
    if (!p) continue;
    if ((await stat(p)).isDirectory()) {
      const pngs = (await readdir(p)).filter((n) => n.endsWith(".png")).sort().map((n) => path.join(p, n));
      return { tipo: "carrusel", archivos: pngs, slug: path.basename(p) };
    }
    return { tipo: "post", archivos: [p], slug: path.basename(p, ".png") };
  }
  throw new Error(`No encuentro la pieza ${id}`);
}

// ---------- exportar una publicación ----------
async function aJpg(png, destino) {
  await sharp(png).jpeg({ quality: 92, chromaSubsampling: "4:4:4" }).toFile(destino);
}
async function exportar(dir, id, o, pie, aviso) {
  await mkdir(dir, { recursive: true });
  if (o.tipo === "carrusel") {
    for (let i = 0; i < o.archivos.length; i++) await aJpg(o.archivos[i], path.join(dir, `${String(i + 1).padStart(2, "0")}.jpg`));
  } else if (o.tipo === "post") {
    await aJpg(o.archivos[0], path.join(dir, "1.jpg"));
  } else if (o.tipo === "reel") {
    await copyFile(o.archivos[0], path.join(dir, "video.mp4"));
  } else if (o.tipo === "guion") {
    await copyFile(o.archivos[0], path.join(dir, "guion.md"));
  }
  if (pie) await writeFile(path.join(dir, "pie.txt"), pie, "utf8");
  if (aviso) await writeFile(path.join(dir, "AVISO - LEER ANTES.txt"), aviso + "\n", "utf8");
}

const TIPO_TXT = { carrusel: "Carrusel", post: "Post", reel: "Reel", guion: "Reel por grabar" };
function fechaLarga(f) {
  const d = new Date(f + "T12:00:00");
  return `${DIAS[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// ---------- principal ----------
const cfg = JSON.parse(await readFile(path.join(STUDIOS, "publicar-orden.json"), "utf8"));
const { pies, titulos } = await leerPies();
for (const [id, txt] of Object.entries(cfg.pies || {})) pies[id] = lineasAPie(txt.split("\n"));

if (existsSync(SALIDA)) {
  if (!existsSync(path.join(SALIDA, "00 - LEEME.txt"))) throw new Error(`${SALIDA} existe y no lo creó este script: no lo borro.`);
  await rm(SALIDA, { recursive: true });
}
await mkdir(SALIDA, { recursive: true });

const indice = [];
const faltan = [];
let n = 0;
for (const { fecha, id } of cfg.orden) {
  n++;
  const o = await origen(id);
  const aviso = cfg.avisos?.[id];
  const marca = o.tipo === "guion" ? "_POR-GRABAR" : aviso?.startsWith("NO PUBLICAR") ? "_ESPERA" : aviso ? "_REVISAR" : "";
  const d = new Date(fecha + "T12:00:00");
  const carpeta = `${String(n).padStart(2, "0")}_${fecha}_${DIAS_CARPETA[d.getDay()]}_${o.slug}${marca}`;
  if (!pies[id]) faltan.push(id);
  await exportar(path.join(SALIDA, carpeta), id, o, pies[id], aviso);
  const fotos = o.tipo === "carrusel" ? ` (${o.archivos.length} imágenes)` : "";
  indice.push(`${String(n).padStart(2, "0")}  ${fechaLarga(fecha).padEnd(20)} ${(TIPO_TXT[o.tipo] + fotos).padEnd(26)} ${id}  ${titulos[id] || o.slug}${marca ? "   ← " + marca.slice(1) : ""}`);
}

const extras = [];
for (const id of cfg.reserva || []) {
  const o = await origen(id);
  await exportar(path.join(SALIDA, "reserva", o.slug), id, o, pies[id], cfg.avisos?.[id]);
  extras.push(`reserva/${o.slug}: ${cfg.avisos?.[id] || ""}`);
}
for (const { id, motivo } of cfg.alternativas || []) {
  const o = await origen(id);
  await exportar(path.join(SALIDA, "alternativas", o.slug), id, o, pies[id], motivo);
  extras.push(`alternativas/${o.slug}: ${motivo}`);
}
// anuncios: se suben en el Administrador de anuncios de Meta, no en el feed
const ads = (await readdir(path.join(STUDIOS, "ads"))).filter((f) => f.endsWith(".png")).sort();
await mkdir(path.join(SALIDA, "anuncios"), { recursive: true });
for (const f of ads) await aJpg(path.join(STUDIOS, "ads", f), path.join(SALIDA, "anuncios", f.replace(/\.png$/, ".jpg")));
await writeFile(path.join(SALIDA, "anuncios", "LEEME.txt"),
  "Estos no se publican en el perfil: son para anuncios de pago (Administrador de anuncios de Meta).\n" +
  "Cada anuncio va en tres tamaños: cuadrado (1080x1080), feed (1080x1350) y story (1080x1920).\n\n" +
  `A1 (sin honorarios): ${cfg.avisos?.A1 || ""}\nA2 (24 horas): se puede usar ya. Enlace de destino: la página «Vender mi piso» de la web.\n`, "utf8");
extras.push("anuncios/: para anuncios de pago, no para el perfil (ver anuncios/LEEME.txt).");

const leeme = `INMUEBLES CON ESTER · PUBLICACIONES DE INSTAGRAM (@inmueblescon.ester)
Generado el ${new Date().toLocaleDateString("es-ES")}. No editar aquí: se regenera desde ORKESTA-STUDIOS.

CÓMO SE USA
- Cada carpeta numerada es UNA publicación, en el orden en que toca publicarla. La fecha es la sugerida.
- Post: subir 1.jpg.
- Carrusel: subir TODAS las imágenes de la carpeta en orden (01, 02, 03...). En Instagram, pulsar
  «Seleccionar varias» y tocarlas en ese orden.
- Reel: subir video.mp4 y añadir una música suave de la biblioteca de Instagram.
- Pie de foto: abrir pie.txt, copiar todo y pegarlo. Ya lleva los hashtags al final.
- Si la carpeta tiene «AVISO - LEER ANTES.txt», leerlo antes de publicar:
    _ESPERA      no se publica hasta que Ester confirme algo.
    _REVISAR     se puede publicar cuando se compruebe lo que dice el aviso.
    _POR-GRABAR  falta que Ester grabe el vídeo (hay un guion.md).

PARA PROGRAMARLO TODO DESDE EL ORDENADOR
Meta Business Suite (business.facebook.com) → Planificador → Crear publicación → Instagram.
Se suben las imágenes de cada carpeta, se pega el pie.txt y se elige fecha y hora. Necesita que la cuenta de
Instagram sea profesional y esté vinculada a una página de Facebook.

ORDEN
${indice.join("\n")}

OTRAS CARPETAS
${extras.map((e) => "- " + e).join("\n")}
`;
await writeFile(path.join(SALIDA, "00 - LEEME.txt"), leeme, "utf8");
console.log(`${n} publicaciones en ${SALIDA}`);
if (faltan.length) console.log("SIN PIE:", faltan.join(", "));
