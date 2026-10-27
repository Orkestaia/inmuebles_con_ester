// Hoja de contacto: node contactos.mjs <carpeta|lista de png> <salida.jpg> [columnas=4]
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
const [entrada, salida, colsArg] = process.argv.slice(2);
const cols = Number(colsArg || 4);
let files = [];
if ((await stat(entrada)).isDirectory()) files = (await readdir(entrada)).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(entrada, f));
else files = entrada.split(",");
const tw = 360, th = 450, gap = 16;
const rows = Math.ceil(files.length / cols);
const W = cols * tw + (cols + 1) * gap, H = rows * th + (rows + 1) * gap;
const comps = await Promise.all(files.map(async (f, i) => ({ input: await sharp(f).resize(tw, th, { fit: "contain", background: "#ddd" }).toBuffer(), left: gap + (i % cols) * (tw + gap), top: gap + Math.floor(i / cols) * (th + gap) })));
await sharp({ create: { width: W, height: H, channels: 3, background: "#cfc8c2" } }).composite(comps).jpeg({ quality: 82 }).toFile(salida);
console.log(salida, files.length);
