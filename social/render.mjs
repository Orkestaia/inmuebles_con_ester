// Renderiza las piezas de un plan JSON a PNG con Chrome (puppeteer-core).
// Uso: node render.mjs --plan <plan.json> --out <carpeta> [--solo id1,id2]
// El plan es una lista de piezas: { id, plantilla, formato, salida, datos }.
// En `datos.foto` se puede usar "@ester/<archivo>" para las fotos de la web (public/img/ester).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { FORMATOS, PLANTILLAS as P1 } from "./templates.mjs";
import { PLANTILLAS_V2 } from "./templates-v2.mjs";

const PLANTILLAS = { ...P1, ...PLANTILLAS_V2 };

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith("--") ? [...a, [x.slice(2), arr[i + 1]]] : a), []));
if (!args.plan || !args.out) {
  console.error("Uso: node render.mjs --plan plan.json --out carpeta [--solo id1,id2]");
  process.exit(1);
}
const solo = args.solo ? new Set(args.solo.split(",")) : null;
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FOTOS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/img/ester");

const plan = JSON.parse(await readFile(args.plan, "utf8"));
const piezas = (plan.piezas ?? plan).filter((p) => !solo || solo.has(p.id));
await mkdir(args.out, { recursive: true });

// Las fotos van embebidas en base64: Chrome no deja cargar file:// desde una página creada con setContent.
async function resolverFoto(f) {
  if (!f) return f;
  let ruta = f;
  if (f.startsWith("@ester/")) ruta = path.join(FOTOS, f.slice(7));
  else if (!/^[A-Za-z]:|^\//.test(f)) return f;
  const buf = await readFile(ruta);
  const mime = /\.png$/i.test(ruta) ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files", "--disable-web-security"] });
const page = await browser.newPage();
let n = 0;
for (const p of piezas) {
  const fn = PLANTILLAS[p.plantilla];
  if (!fn) { console.error(`✗ ${p.id}: plantilla desconocida ${p.plantilla}`); continue; }
  const formato = p.formato ?? "feed";
  const { w, h } = p.plantilla === "overlayReel" ? FORMATOS.reel : FORMATOS[formato];
  const datos = { ...p.datos, formato, foto: await resolverFoto(p.datos?.foto) };
  const html = fn(datos);
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((im) => im.complete ? null : new Promise((r) => { im.onload = r; im.onerror = r; })));
  });
  const salida = path.join(args.out, p.salida ?? `${p.id}.png`);
  await mkdir(path.dirname(salida), { recursive: true });
  await page.screenshot({ path: salida, type: "png", omitBackground: p.plantilla === "overlayReel" });
  n++;
  console.log(`✓ ${p.id} → ${path.relative(args.out, salida)}`);
}
await browser.close();
await writeFile(path.join(args.out, "_render.log"), `${new Date().toISOString()} · ${n} piezas\n`, { flag: "a" });
console.log(`${n} piezas renderizadas en ${args.out}`);
