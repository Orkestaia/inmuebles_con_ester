// Convierte las fotos originales de Ester a JPEG optimizado (≤ 300 KB) y genera OG + favicon.
// Uso: node scripts/optimize-images.mjs "<carpeta origen>"
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const src = process.argv[2];
if (!src) { console.error("Falta la carpeta de origen"); process.exit(1); }
const out = path.resolve("public/img");
await mkdir(path.join(out, "ester"), { recursive: true });
await mkdir(path.join(out, "pisos"), { recursive: true });

async function toJpeg(input, output, { width, maxKB, height }) {
  let q = 82;
  for (;;) {
    await sharp(input).rotate().resize({ width, height, fit: height ? "cover" : "inside", withoutEnlargement: true })
      .jpeg({ quality: q, mozjpeg: true }).toFile(output);
    const kb = (await stat(output)).size / 1024;
    if (kb <= maxKB || q <= 50) { console.log(`${path.basename(output)}: ${kb.toFixed(0)} KB (q${q})`); return; }
    q -= 6;
  }
}

const E = (f) => path.join(src, f);
await toJpeg(E("WhatsApp Image 2026-10-09 at 12.34.00.jpeg"), path.join(out, "ester/ester-hero.jpg"), { width: 1100, maxKB: 300 });
await toJpeg(E("WhatsApp Image 2026-10-09 at 12.20.54.jpeg"), path.join(out, "ester/ester-sobre.jpg"), { width: 1100, maxKB: 300 });
await toJpeg(E("ester2.jpeg"), path.join(out, "ester/ester-sonrisa.jpg"), { width: 1100, maxKB: 300 });
await toJpeg(E("Pisos vendidos/Piso2/WhatsApp Image 2026-10-08 at 13.13.53.jpeg"), path.join(out, "pisos/finisterre-antes.jpg"), { width: 900, maxKB: 150 });

// Open Graph 1200x630: crema + retrato a la derecha
const portrait = await sharp(E("ester2.jpeg")).rotate().resize({ width: 520, height: 630, fit: "cover", position: "top" }).toBuffer();
const ogText = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FAF6F2"/>
  <rect x="0" y="0" width="14" height="630" fill="#7A1F5C"/>
  <text x="80" y="200" font-family="Georgia, serif" font-size="30" fill="#7A1F5C" letter-spacing="4">INMUEBLES CON ESTER</text>
  <text x="80" y="290" font-family="Georgia, serif" font-size="54" fill="#1D1A1F">Vendo pisos en Madrid</text>
  <text x="80" y="355" font-family="Georgia, serif" font-size="54" fill="#1D1A1F">que llevan meses</text>
  <text x="80" y="420" font-family="Georgia, serif" font-size="54" fill="#1D1A1F">sin venderse.</text>
  <text x="80" y="500" font-family="Arial, sans-serif" font-size="26" fill="#5A5560">Te digo en 24 horas qué está fallando. Sin compromiso.</text>
</svg>`);
await sharp(ogText).composite([{ input: portrait, left: 680, top: 0 }]).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(out, "og.jpg"));
console.log("og.jpg listo");

// Favicon / icono: E en círculo ciruela
const icon = (size) => Buffer.from(`<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" fill="#7A1F5C"/>
  <text x="50" y="68" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="600" fill="#FAF6F2">E</text>
</svg>`);
await sharp(icon(512)).png().toFile(path.join("public", "icon-512.png"));
await sharp(icon(192)).png().toFile(path.join("public", "icon-192.png"));
await sharp(icon(180)).png().toFile(path.join("public", "apple-icon.png"));
await sharp(icon(64)).png().toFile(path.join("src/app", "icon.png"));
console.log("iconos listos");
