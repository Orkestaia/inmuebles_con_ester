# Rediseño con el estilo de Ester · 26-oct-2026

> Material que pasó Ester el 15-oct (carpeta `info_ester/`, fuera del repo): dos retratos nuevos hechos por ella
> (traje crema en un sofá; americana ciruela sonriendo en un salón), dos creativos de Instagram con su logo, una
> maqueta de landing hecha con ChatGPT y dos capturas de ideas de anuncios de ChatGPT.

## Qué se ha cambiado en la web

| Antes (v1, 9-oct) | Ahora |
|---|---|
| Wordmark tipográfico «Inmuebles con **Ester**» | **Logo de Ester**: INMUEBLES / CON / *Ester* en caligrafía (Great Vibes) / MADRID con la llave. Componente `Logo` en cabecera, pie, banda del lema y `/vender-mi-piso` |
| Ciruela `#7A1F5C` + rosa + crema fría + Fraunces | **Vino `#6E2A46`**, vino noche `#3D1424`, **crema papel `#F7F1E8`** con textura, dorado `#C9A46A` discreto, **Playfair Display** (titulares, con cursiva) + Source Sans 3 |
| Hero: retrato con fondo blanco, H1 «Vendo pisos en Madrid que llevan meses sin venderse» | Hero como su maqueta: antetítulo «Venta de viviendas en Madrid», **H1 «¿Quieres vender tu casa en Madrid? Estoy aquí para ayudarte.»**, foto del sofá con el lema caligráfico «Tu vivienda en buenas manos ♡», botón «Quiero vender mi casa», enlace «Conoce mi forma de trabajar», «Te respondo en menos de 24 horas» |
| — | **Fila de cinco valores** con iconos de trazo fino (trato directo, estrategia a medida, máxima visibilidad, negociación experta, acompañamiento total) |
| — | Bloque **«Cómo te acompaño»** con la foto del salón y el texto de su maqueta |
| — | Banda con el lema **«Una experiencia tan personal como tu hogar»** sobre papel, con el logo |
| Cierre en crema | **Banda de cierre en vino** con foto desenfocada: «¿Hablamos de la venta de tu casa?» + botón perfilado + nota de 24 h |
| Menú Vender · Comprar · Vendidos · Sobre Ester | Menú de su maqueta: Inicio · Sobre mí · Servicios · Viviendas vendidas · Contacto + botón **«Hablemos»** con icono (Comprar queda en el pie y en el bloque de compradores) |
| Tarjetas de vendidos con «Vendido» verde | «Vendido» en vino; las tarjetas sin foto llevan el nombre del barrio con la llave sobre papel |
| Botones redondos | Botones rectos con esquinas suaves, como en su maqueta |

Se mantiene todo lo que no es estilo: la promesa de las 24 h, el formulario y su flujo en n8n, el bloque del problema,
los pasos (ahora bajo «Servicios»), la FAQ, las legales, los marcadores pendientes y el `noindex`.
La OG image y el favicon se han regenerado con la nueva paleta (`scripts/estilo-ester.mjs`).

## Decisiones que conviene que confirme JARVIS

1. **El H1 cambia de ángulo.** El brief fijaba «Vendo pisos en Madrid que llevan meses sin venderse»; la maqueta de Ester
   dice «¿Quieres vender tu casa en Madrid? Estoy aquí para ayudarte». He usado el suyo (es su marca y su tono) y he dejado
   el diagnóstico en 24 h en el subtítulo, el formulario y la banda de cierre. Si JARVIS prefiere el ángulo original, es
   cambiar dos líneas en `content/home.json` (`hero.h1`, `hero.sub`).
2. **Las ideas de anuncios de ChatGPT prometen «vender tu casa sin pagar honorarios de vendedor»** / «¿y si no tuvieras
   que pagar los honorarios de la inmobiliaria?». Eso contradice la FAQ 1 (comisión sobre el precio de venta) y el brief.
   **No lo he puesto en la web.** Antes de usarlo en anuncios hay que saber si Ester tiene de verdad ese modelo (cobrar al
   comprador, honorarios compartidos…) y, si lo tiene, cambiar la FAQ y el aviso legal. Es decisión de JARVIS con Ester.
3. **Las fotos nuevas parecen generadas o retocadas con IA** (el salón de estilo parisino). Son suyas y las ha pedido ella,
   así que se usan. Conviene que lo sepa: la FAQ y la web no dicen que sea su casa ni una vivienda vendida.
4. Los **testimonios de su maqueta son inventados** («Marta G., Javier L., Laura M.»): no se han puesto. El bloque de
   opiniones sigue esperando opiniones reales autorizadas.
5. El icono de «LinkedIn» del pie de su maqueta no se ha puesto porque no tiene perfil conocido.

## Cómo seguir

- Anuncios de Meta: el estilo de los creativos de Ester (uppercase, vino sobre crema o crema sobre vino, botón blanco)
  ya está reflejado en la paleta de la web; las landing de destino siguen siendo `/vender-mi-piso` y `/`.
- Cuando Ester pase fotos de pisos, las tarjetas de «Viviendas vendidas» quedan como en su maqueta (foto + VENDIDO).
