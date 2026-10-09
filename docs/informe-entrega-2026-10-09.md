# Inmuebles con Ester · informe técnico de entrega (landing v1)

> **De:** BUILDS. **Para:** Aitor / JARVIS. **Fecha:** 9-oct-2026.
> Responde al brief `technical/2026-10-09_brief-builds_landing-inmuebles-con-ester_v1.md`.
> Este informe es técnico: las propuestas, precios y lo que se le cuenta a Ester los decide JARVIS.

## 1. Qué hay en producción

- **Web:** https://inmueblesconester.vercel.app (con `noindex` y `robots.txt` cerrado hasta tener dominio).
- **Repo:** https://github.com/Orkestaia/inmuebles_con_ester · rama `main` → producción en Vercel (integración Git activa).
- **Flujo de leads:** n8n «Inmuebles con Ester · Lead v1» (`jgX75H6kva4jbCo6`), publicado y activo.
- **Hoja de leads:** https://docs.google.com/spreadsheets/d/1sJ-h4GjozoxYF_QsjnJOWG7vEn3J453IhZKVweMcYqw/edit (pestaña `Leads`, 24 columnas; en el Drive de aitor@orkestaia.com, pendiente de compartir con Ester cuando dé su correo).
- **Documentación:** `README.md` (ejecutar, variables, cambiar textos y pisos, probar, desplegar), `CLAUDE.md`, `docs/guia-de-uso-ester.md` (1 página para Ester), `docs/n8n/ester-lead-v1.workflow.ts` (spec exacta del workflow).

## 2. Páginas construidas (todas del §4 del brief)

`/` · `/vender-mi-piso` (sin menú, destino de anuncios) · `/comprar` · `/vendidos` (7 ventas, sin número de portal, precios ocultos hasta permiso) · `/sobre-ester` · `/guia-por-que-no-se-vende` (7 errores en pregunta-respuesta + formulario) · `/gracias` (`noindex`) · `/aviso-legal` · `/privacidad` · `/cookies`.
Técnico: `sitemap.xml`, `robots.txt` (permite GPTBot, ClaudeBot, PerplexityBot, etc. cuando se quite el noindex), `llms.txt`, `llms-full.txt`, `manifest`, OG image 1200×630, favicon «E» ciruela, JSON-LD `RealEstateAgent` + `Person` + `FAQPage` (home y guía) + `BreadcrumbList`.

Copy v1 del brief aplicado literal en `content/*.json`. Lo que falta de Ester va entre corchetes y se pinta resaltado en amarillo en la web (se ve a simple vista qué queda por rellenar).

## 3. Criterios de aceptación (§11) · estado

| # | Criterio | Estado |
|---|---|---|
| 1 | Preview en Vercel con `noindex` | ✅ Producción en `*.vercel.app` con `X-Robots-Tag: noindex` y `robots.txt` cerrado. Pendiente revisión de Aitor y de Ester en móvil |
| 2 | Formulario probado de punta a punta | ✅ Envío real desde el navegador → `/api/lead` → n8n → **fila en la hoja** → **email a Ester** (de momento a aitor@orkestaia.com) → **Telegram a Aitor** → `/gracias`. Probados también: repetido en 24 h (no vuelve a avisar), guía (email al propietario con enlace), fallo de un paso (alerta a Aitor con el lead completo, verificada: saltó cuando la hoja no tenía la pestaña). ⚠️ WhatsApp a Ester y CAPI: ver §4 |
| 3 | Lighthouse móvil ≥ 90 en las 4 categorías, LCP < 2,5 s | ⚠️ `/vender-mi-piso` (la de anuncios): **94 / 100 / 100 / 69**. Home: 86-92 / 97→100 (contraste del pie corregido en el último commit) / 100 / 69. El 69 de SEO es solo por el `noindex` (sube a ~100 al quitarlo). LCP simulado en 4G lento: 2,7 s (vender) y 3,1-3,2 s (home), por el retrato del hero. Ver §5 |
| 4 | Banner de cookies con rechazo en un clic; píxel y GA4 no cargan antes de aceptar | ✅ Botones Aceptar/Rechazar del mismo tamaño; Consent Mode v2; sin ID de píxel/GA4 no se carga nada (comprobado en Network: cero peticiones a Google/Meta) |
| 5 | Rich Results sin errores; sitemap, robots, llms.txt accesibles | ✅ Accesibles (200). Rich Results Test no se puede pasar con `noindex`: pendiente al estrenar dominio. El JSON-LD omite los marcadores |
| 6 | Legales completas con datos reales antes de quitar el `noindex` | ⚠️ Textos completos (LSSI, RGPD con encargados reales: Vercel, Cloudflare, n8n, Google, Resend, Meta, Orkesta). **Faltan titular, NIF, dirección y teléfono de Ester** (marcadores) |
| 7 | README con cómo cambiar textos/pisos, variables y probar el formulario | ✅ |
| 8 | Guía de uso de 1 página para Ester | ✅ `docs/guia-de-uso-ester.md` (pendiente de revisión de JARVIS antes de enviarla) |

## 4. Desviaciones respecto al brief y por qué

- **Autorespuesta al propietario por email (§6.5):** el formulario de propietarios no pide email (§5.4), así que no hay a quién enviársela. Solo el formulario de la guía la tiene (y funciona). Para propietarios la única vía es WhatsApp saliente, que requiere la API. Decidir en JARVIS si se añade un campo email opcional.
- **Email a Ester vía Gmail de Orkesta (no Resend):** Resend no tiene cuenta todavía. El workflow usa la credencial «Orkesta Gmail». Cambiar a Resend cuando exista el dominio (`hola@inmueblesconester.com`) es un nodo.
- **Aviso a Ester:** email + copia a Aitor por Telegram. WhatsApp API queda para cuando haya número verificado (nodo por añadir).
- **Meta CAPI:** nodo construido (`Lead`, `event_id` compartido con el píxel, teléfono/email hasheados, `fbp/fbc` solo con consentimiento) pero **desactivado** hasta tener píxel y token.
- **Secreto del webhook:** comprobación por cabecera `X-Lead-Secret` con credencial de n8n, como estaba previsto. Hubo que desactivar la opción «ignorar bots» del nodo Webhook: la librería que usa n8n marca como bot el `fetch` de Node/Vercel y devolvía 403. El antispam va en la web (Turnstile + honeypot + límite de 5 envíos/10 min por IP).
- **Hoja de leads:** una sola pestaña `Leads` con columna `origen` (el brief pedía pestaña `Guia` aparte). Más simple para Ester; se puede separar con un filtro.
- **Guía «7 errores»:** redactada por BUILDS a partir del brief, marcada como borrador en `content/guia.json`. Ester tiene que validarla con su audio. El PDF no existe: el email manda el enlace a la página web.
- **Sin imágenes de pisos** salvo el collage «antes» de Finisterre (etiquetado como «Antes»).

## 5. Rendimiento

Lighthouse móvil (simulado 4G lento) sobre producción, dos pasadas:

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 92 → 86 (variación entre pasadas) | 97 (pie con poco contraste, corregido después) | 100 | 69 (noindex) | 3,1-3,2 s | 0 | 100-240 ms |
| `/vender-mi-piso` | 94 | 100 | 100 | 69 (noindex) | 2,7 s | 0 | 160 ms |

Corregidos tras la primera pasada: contraste de numerales decorativos, placeholders y pie; calidad del retrato del hero a 72. Repetir la medición al quitar el `noindex` (SEO) y guardar el JSON en `docs/lighthouse/`.

Para bajar LCP por debajo de 2,5 s en 4G lento: recortar el retrato del hero a formato vertical 3:4 real (ahora se sirve ~750 px de ancho en móvil) o mostrar en móvil la versión con menos píxeles. Es un cambio de 10 minutos; no se hizo para no tocar la foto sin validar la marca con Ester.

## 6. Lo que hace falta para publicar con dominio (en orden)

1. **De Ester:** apellidos, teléfono, correo que quiere mostrar, nombre fiscal, NIF, dirección, autónoma/red, «solo cobro si vendo» y exclusiva (FAQ 1 y 2), permiso para precios, tiempos de cada piso (meses antes / meses con ella), fotos, 2-3 opiniones autorizadas, audio para la guía. Todo esto son marcadores en `content/site.json`, `home.json`, `pisos.json`.
2. **Dominio:** comprar `inmueblesconester.com` a su nombre, añadirlo al proyecto en Vercel, `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_NOINDEX=false`, redesplegar. Comprobar Rich Results y enviar sitemap a Search Console y Bing (IndexNow).
3. **Turnstile:** crear el sitio en Cloudflare (dominio + `vercel.app`), poner `NEXT_PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET` en Vercel. Hasta entonces el servidor no verifica el reto (solo honeypot y límite por IP).
4. **Meta y GA4:** píxel y propiedad a nombre de Ester → `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA4_ID`; token de CAPI en la credencial de n8n y activar el nodo.
5. **WhatsApp a Ester:** número de API (YCloud/Meta) → nodo nuevo en n8n; `NEXT_PUBLIC_WHATSAPP_NUMBER` con su número para los botones (hoy enlazan al mensaje directo de Instagram).
6. **Correo del dominio** y cambiar Gmail → Resend; cambiar `cfg_email_ester` en el nodo Config de n8n al correo de Ester.
7. **Compartir la hoja de leads** con Ester (editora) y pasar la propiedad a su Drive si JARVIS lo decide.

## 7. Horas

Construcción + pruebas + documentación: ~5 h efectivas de sesión (dentro de las 10-14 h estimadas en el brief).
