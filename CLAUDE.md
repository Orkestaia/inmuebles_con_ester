# Inmuebles con Ester · landing (CLAUDE.md del proyecto)

## Qué es

Landing de captación para **Ester**, agente inmobiliaria independiente en Madrid (cliente referido por
Wito; carpeta en JARVIS: `02_CLIENTS/PROFESSIONAL_SERVICES/pisos-wito`). Público principal: propietarios
con el piso meses en los portales. Promesa: «te digo en 24 h por qué no se vende». Público secundario:
compradores (personal shopper inmobiliario).

## Relación con JARVIS

- **Brief que manda:** `technical/2026-10-09_brief-builds_landing-inmuebles-con-ester_v1.md` (stack, marca, mapa, copy, flujo de leads, SEO, criterios de aceptación).
- Contexto: `CLAUDE.md` del cliente, `client/2026-10-09_ester_texto-sobre-mi.md` (su voz), `client/2026-10-07_guia-arranque-ester.md`, `pricing/2026-10-07_pricing-interno.md`.
- Las propuestas y precios los hace JARVIS. BUILDS entrega el informe técnico (`docs/informe-entrega-*.md`).

## Stack y dónde está cada cosa

Next.js 16 + TS + Tailwind 4, SSG. Contenido en `content/*.json` (el copy nunca va en componentes).
`src/app/api/lead/route.ts` → n8n `jgX75H6kva4jbCo6` (spec en `docs/n8n/ester-lead-v1.workflow.ts`).
Producción: https://inmueblesconester.vercel.app (con `noindex` hasta tener dominio).
README.md: ejecutar, variables, cambiar textos/pisos, probar el formulario, desplegar.

## Reglas específicas

- **La voz es de Ester:** primera persona, frases cortas, sin exclamaciones. Palabras suyas: vivienda,
  propietario, acompañar, confianza. Nunca «lead», «funnel», «captación», «conversión» en la interfaz.
- **Prohibido en la web:** opiniones o cifras inventadas, «valoración oficial», promesas de plazo, fotos de
  pisos ajenos como propios, datos personales de propietarios (en vendidos: calle y barrio sin número).
- **Marcadores `[así]`** para todo lo que falta de Ester. Se pintan resaltados. No inventar el dato.
- El bloque de opiniones no existe hasta tener opiniones reales autorizadas por escrito.
- Secretos solo en Vercel env y en n8n. `.env.local` no se sube. El webhook de n8n nunca llega al navegador.
- Píxel y GA4 solo tras aceptar cookies (banner con Aceptar/Rechazar iguales). No tocar eso sin motivo legal.
- Todo a nombre de Ester (dominio, GBP, Meta). Orkesta entra como colaborador. «Web por Orkesta» en el pie.
- Fotos originales en `C:\Users\aitor\Downloads\Inmuebles con Ester\` (no se copian al repo sin optimizar).

## Cómo ejecutar / testear / desplegar

```bash
npm install && cp .env.example .env.local && npm run dev
npm run build && npx tsc --noEmit && npx eslint src
```

Preview en la app: entrada `inmuebles-con-ester` del `.claude/launch.json` del workspace (puerto 3019).
Deploy: push a `main`. Criterios de aceptación y pendientes: `docs/informe-entrega-2026-10-09.md`.
