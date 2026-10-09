# Inmuebles con Ester · landing de captación (v1)

Landing para **Ester**, agente inmobiliaria independiente en Madrid. Objetivo: que un propietario
con el piso meses en los portales deje nombre, teléfono y enlace del anuncio, y que Ester reciba el
aviso al instante.

- **Producción (con `noindex` hasta tener dominio):** https://inmueblesconester.vercel.app
- **Repo:** https://github.com/Orkestaia/inmuebles_con_ester (rama `main` = producción; cada push despliega)
- **Vercel:** proyecto `inmuebles_con_ester` (`prj_3vJhdwQjtBaZsvjQDbUjzzusgDz3`, equipo orkesta-automation)
- **n8n:** workflow `Inmuebles con Ester · Lead v1` (`jgX75H6kva4jbCo6`) en el n8n personal de Aitor
- **Hoja de leads:** https://docs.google.com/spreadsheets/d/1sJ-h4GjozoxYF_QsjnJOWG7vEn3J453IhZKVweMcYqw/edit (pestaña `Leads`)
- **Brief que manda:** `ORKESTA - JARVIS/02_CLIENTS/PROFESSIONAL_SERVICES/pisos-wito/technical/2026-10-09_brief-builds_landing-inmuebles-con-ester_v1.md`

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind 4 · `next/image` · `next/font` (Fraunces +
Source Sans 3) · zod · Cloudflare Turnstile · n8n Cloud. Sin base de datos: todo el contenido vive en
`content/*.json` y las páginas se generan estáticas en el build. Solo `/api/lead` y `/gracias` son dinámicas.

## Mapa

| Ruta | Qué es |
|---|---|
| `/` | Landing para propietarios: hero, problema, cómo trabaja, formulario, vendidos, sobre Ester, compradores, FAQ, cierre |
| `/vender-mi-piso` | Misma oferta sin menú ni distracciones. Destino de anuncios |
| `/comprar` | Personal shopper inmobiliario + formulario "qué busco" |
| `/vendidos` | Las 7 ventas (sin número de portal) |
| `/sobre-ester` | Su historia (texto de Ester recortado) |
| `/guia-por-que-no-se-vende` | 7 errores en formato pregunta-respuesta + formulario para el PDF |
| `/gracias` | Tras enviar un formulario (`noindex`) |
| `/aviso-legal`, `/privacidad`, `/cookies` | Legal (LSSI, RGPD, cookies) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Generados en el build |

## Cómo ejecutar

```bash
npm install
cp .env.example .env.local   # rellenar (ver abajo)
npm run dev                  # http://localhost:3000
```

Build y comprobaciones:

```bash
npm run build
npx tsc --noEmit
npx eslint src
```

## Variables de entorno

Ver `.env.example`. Resumen:

| Variable | Dónde | Para qué |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel + local | URL pública (canonical, sitemap, OG, JSON-LD) |
| `NEXT_PUBLIC_NOINDEX` | Vercel | `true` mientras no haya dominio propio: `noindex` en todas las páginas y `robots.txt` cerrado. Poner `false` al estrenar `inmueblesconester.com` |
| `N8N_LEAD_WEBHOOK_URL` | Vercel (secreto) | Webhook de n8n al que reenvía `/api/lead` |
| `N8N_LEAD_SECRET` | Vercel (secreto) + credencial de n8n | Cabecera `X-Lead-Secret`. En n8n vive en la credencial «Ester lead - X-Lead-Secret» |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET` | Vercel | Antispam invisible de Cloudflare. **Sin configurar todavía**: sin ellas el servidor no verifica (solo honeypot + límite por IP) |
| `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GA4_ID` | Vercel | Solo cargan tras aceptar cookies. Vacías = no se cargan |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Vercel | Número de Ester (34…). Vacío = los botones de WhatsApp enlazan al mensaje directo de Instagram |

Las variables ya están cargadas en Vercel (Production y Preview) salvo Turnstile, píxel, GA4 y WhatsApp.

## Cómo cambiar textos, pisos y marcadores

Todo el copy está en `content/`:

- `site.json`: nombre, contacto, **datos legales** (titular, NIF, dirección), zonas, menú, mensaje de WhatsApp.
- `home.json`: hero, tarjetas del problema, pasos, textos del formulario, FAQ, cierre.
- `pisos.json`: los pisos vendidos. `mostrarPrecios: true` enseña el precio de venta (pendiente de permiso de Ester).
- `sobre-ester.json`, `comprar.json`, `guia.json`.

**Marcadores:** cualquier texto entre corchetes (`[Apellidos]`, `[NIF]`, `[Solo cobro si vendo]`) se pinta
resaltado en amarillo en la web para que no se escape ninguno. Se sustituyen aquí y desaparece el resalte.
`llms.txt` y el JSON-LD los omiten automáticamente.

### Añadir un piso vendido

En `content/pisos.json`, añadir un objeto al array `pisos`:

```json
{
  "slug": "calle-ejemplo-barrio",
  "zona": "Barrio", "distrito": "Distrito (opcional)", "calle": "Calle Ejemplo",
  "m2": 80, "dormitorios": 3, "banos": 1, "detalles": "Exterior, terraza",
  "precio": 300000, "mesesAntes": 8, "mesesConEster": 2,
  "foto": "/img/pisos/ejemplo.jpg", "fotoAlt": "Salón reformado", "fotoEtiqueta": "Después"
}
```

Foto: ≤ 150 KB en `public/img/pisos/`. Con `node scripts/optimize-images.mjs "<carpeta>"` se
convierten las originales (se puede adaptar). `mesesAntes`/`mesesConEster` en `null` hasta que Ester los pase.
La home enseña los 4 primeros del array.

## Flujo del formulario

1. El navegador valida y manda `POST /api/lead` con `origen` (`home|vender|comprar|guia`), campos,
   consentimientos, UTM/referrer (capturados en la primera visita), `event_id` y, solo con cookies
   aceptadas, `fbp`/`fbc`.
2. `src/app/api/lead/route.ts` valida con zod, descarta el honeypot, limita 5 envíos / 10 min por IP,
   verifica Turnstile (si hay clave) y reenvía a n8n con `X-Lead-Secret`. Nunca expone el webhook.
3. n8n (`docs/n8n/ester-lead-v1.workflow.ts` es la spec exacta): normaliza teléfono a E.164, detecta
   repetidos en 24 h, guarda fila en la hoja, avisa a Ester por email y a Aitor por Telegram, manda la
   guía por email si la pidió, y dispara **alerta a Aitor con el lead completo** si falla la hoja o el email.
   El nodo de Meta CAPI está creado y desactivado hasta tener píxel y token.
4. Si todo va bien, la web dispara `Lead` en píxel y GA4 (mismo `event_id` que CAPI) y lleva a `/gracias`.

### Probar el formulario

- Local: con `.env.local` rellenado, `npm run dev`, enviar el formulario y mirar la hoja, el correo y Telegram.
- Directo al webhook:

```bash
curl -X POST "$N8N_LEAD_WEBHOOK_URL" -H "Content-Type: application/json" -H "X-Lead-Secret: $N8N_LEAD_SECRET" \
  -d '{"origen":"home","nombre":"Prueba","telefono":"600123456","zona_tipo":"Tetuán, 2 dorm.","tiempo_en_venta":"mas-6-meses","consiente_contacto":true,"event_id":"prueba-1","consent_marketing":false,"utm":{},"ts":"2026-10-09T10:00:00Z"}'
```

Sin la cabecera responde 403. Las ejecuciones se ven en n8n.

## Desplegar

Cada push a `main` despliega en Vercel (integración con GitHub). Manual: `vercel deploy --prod`.
Para estrenar el dominio: añadirlo en Vercel, cambiar `NEXT_PUBLIC_SITE_URL`, poner
`NEXT_PUBLIC_NOINDEX=false`, rellenar los marcadores legales y redesplegar.

## Pendiente (lo que falta de Ester o de configuración)

Ver `docs/informe-entrega-2026-10-09.md`.
