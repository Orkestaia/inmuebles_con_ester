// Fotos nuevas de Ester (info_ester/), OG e iconos con la paleta vino. Uso: node scripts/estilo-ester.mjs
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const src = "info_ester";
const VINO = "#6e2a46";
const CREMA = "#f7f1e8";

async function toJpeg(input, output, { width, maxKB }) {
  let q = 84;
  for (;;) {
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality: q, mozjpeg: true }).toFile(output);
    const kb = (await stat(output)).size / 1024;
    if (kb <= maxKB || q <= 50) { console.log(`${path.basename(output)}: ${kb.toFixed(0)} KB (q${q})`); return; }
    q -= 6;
  }
}

await toJpeg(path.join(src, "WhatsApp Image 2026-10-15 at 12.27.32.jpeg"), "public/img/ester/ester-salon-sofa.jpg", { width: 1200, maxKB: 300 });
await toJpeg(path.join(src, "WhatsApp Image 2026-10-15 at 12.26.04.jpeg"), "public/img/ester/ester-salon-sonrisa.jpg", { width: 1200, maxKB: 300 });
// Fondo desenfocado para la banda de cierre (muy comprimido)
await sharp(path.join(src, "WhatsApp Image 2026-10-15 at 12.26.04.jpeg")).rotate().resize({ width: 1400, height: 700, fit: "cover", position: "top" }).blur(18).modulate({ brightness: 0.55, saturation: 0.7 }).jpeg({ quality: 55, mozjpeg: true }).toFile("public/img/fondo-cierre.jpg");
console.log("fondo-cierre listo");

// OG 1200x630 con el retrato del sofá
const retrato = await sharp(path.join(src, "WhatsApp Image 2026-10-15 at 12.27.32.jpeg")).rotate().resize({ width: 560, height: 630, fit: "cover", position: "top" }).toBuffer();
const base = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${CREMA}"/>
  <text x="70" y="110" font-family="Georgia, serif" font-size="20" fill="${VINO}" letter-spacing="5">INMUEBLES CON ESTER · MADRID</text>
  <text x="70" y="210" font-family="Georgia, serif" font-size="50" fill="${VINO}">¿Quieres vender</text>
  <text x="70" y="272" font-family="Georgia, serif" font-size="50" fill="${VINO}">tu casa en Madrid?</text>
  <text x="70" y="340" font-family="Georgia, serif" font-size="44" fill="#2a1f24">Estoy aquí</text>
  <text x="70" y="396" font-family="Georgia, serif" font-size="44" fill="#2a1f24">para ayudarte.</text>
  <text x="70" y="460" font-family="Arial, sans-serif" font-size="22" fill="#5f5257">Te respondo en menos de 24 horas.</text>
  <text x="70" y="540" font-family="Georgia, serif" font-style="italic" font-size="26" fill="${VINO}">Una experiencia tan personal</text>
  <text x="70" y="574" font-family="Georgia, serif" font-style="italic" font-size="26" fill="${VINO}">como tu hogar</text>
</svg>`);
await sharp(base).composite([{ input: retrato, left: 640, top: 0 }]).jpeg({ quality: 85, mozjpeg: true }).toFile("public/img/og.jpg");
console.log("og.jpg listo");

const icon = (size) => Buffer.from(`<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" fill="${VINO}"/>
  <text x="50" y="68" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="58" fill="${CREMA}">E</text>
</svg>`);
await sharp(icon(512)).png().toFile("public/icon-512.png");
await sharp(icon(192)).png().toFile("public/icon-192.png");
await sharp(icon(180)).png().toFile("public/apple-icon.png");
await sharp(icon(64)).png().toFile("src/app/icon.png");
console.log("iconos listos");
