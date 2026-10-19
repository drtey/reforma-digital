# Trenes: criterios de éxito

La fase 1 del [brief](README.md) está terminada cuando cumple todos los criterios anteriores a «Concepto de compra y billete». Esa sección es una lista para evaluar la compra, nuestra y de Renfe. Los objetivos se comparan con la línea base medida en renfe.com, pero no pretenden puntuar a Renfe: sirven para saber si nuestra propuesta mejora algo.

## Tareas con personas

Prueba moderada con 5 personas: al menos una usa lector de pantalla y otra tiene más de 65 años. Hay éxito si al menos 4 de las 5 terminan la tarea sin ayuda.

| Tarea                                                                 | Objetivo                                                                                                                 |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| «¿A qué hora sale el próximo tren de A a B y va con retraso?»         | Respuesta en 3 interacciones o menos desde `/trenes`                                                                     |
| «Mi AVE comprado en febrero llegó 75 min tarde, ¿qué me corresponde?» | Llega al importe de cada capa y al enlace para reclamar en 4 interacciones o menos y sabe decir de dónde sale cada cifra |
| «¿Hay incidencias en mi línea de Cercanías?»                          | 2 interacciones o menos, y sabe decir cuándo se actualizó el dato                                                        |
| «Voy en silla de ruedas, ¿cómo pido ayuda y con cuánta antelación?»   | 2 interacciones o menos hasta el canal y el plazo de su estación                                                         |
| «He perdido el correo con mi billete, ¿cómo viajo?»                   | Sabe qué opciones tiene según cómo compró (cuenta, máquina con tarjeta, teléfono) sin que la web le pida ningún dato     |

## Accesibilidad

- axe-core sin infracciones WCAG 2.2 A ni AA en ninguna pantalla.
- El zoom nunca se bloquea: nada de `user-scalable=no` ni `maximum-scale` por debajo de 5.
- Objetivos táctiles de 44 px, foco visible y controles nativos, según [DESIGN.md](../../DESIGN.md).
- Recorridos manuales completos con teclado, VoiceOver en iOS y TalkBack en Android.
- Los avisos de estado (dato desactualizado, retraso) se anuncian sin mover el foco.

## Rendimiento

En un móvil de 390 px y primera visita:

- 150 KiB de JavaScript comprimido o menos por ruta.
- 500 KiB transferidos en total o menos.
- Ningún dominio de terceros.
- LCP de 2,5 s o menos en el p75 de la red móvil simulada de Lighthouse.

## Fuentes y frescura

- Cada cifra, plazo o condición enlaza a su fuente oficial con la fecha de consulta.
- Cada dato en tiempo real muestra su antigüedad. Si supera el umbral del brief, se muestra como desactualizado.
- Con fixtures que reproducen el feed de avisos del 19/10/2026 (`header.timestamp` del 07/10 y avisos sin fecha de fin), la pantalla de línea muestra «sin actualizar desde…» y nunca «sin incidencias».
- Los conflictos entre normas y entre páginas oficiales se muestran con todas sus fuentes, nunca con una sola cifra.
- La ingesta diaria tiene tests con fixtures de los GTFS reales: cabeceras con espacios de relleno, ausencia de `feed_info.txt` y un día fuera de `calendar`.
- El cruce entre el tiempo real y el GTFS (viajes, paradas y líneas de los avisos) se mide en cada ingesta. Si baja de lo medido el 19/10/2026 (100 % en viajes y paradas y 89 % en avisos), se publica una alerta en el workflow.

## Privacidad e identidad

- Sin cookies ni cuentas, y sin más analítica que la que ya carga toda la web (`@vercel/analytics` en `apps/web/app/layout.tsx`). No se piden localizador, DNI, importe ni datos de pago.
- No se usan el logotipo, los colores ni el nombre de Renfe como marca propia, y aparece la etiqueta de proyecto independiente.
- Los enlaces salientes solo van a los dominios oficiales de la lista del [mapa de pantallas](pantallas.md#estados-comunes).
- La atribución CC BY 4.0 de Renfe Data es visible donde se usan sus datos.

## Concepto de compra y billete

Lista para evaluar el sistema de venta de Renfe a partir del 25/01/2027 y para validar el [concepto](pantallas.md#concepto-compra-y-billete). Cada punto se marca como cumple, no cumple o no comprobable, con una captura y la fecha. Siempre se para antes de los datos personales, el CAPTCHA y el pago.

| #   | Criterio                                                                                           | Hoy (19/10/2026)                                                                                              |
| --- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| C1  | La búsqueda no preselecciona ida y vuelta                                                          | No cumple: ida y vuelta, hoy y mañana                                                                         |
| C2  | El precio total por trayecto se ve en la comparación                                               | No comprobable (CAPTCHA)                                                                                      |
| C3  | Cambiar y anular se expresan en euros para el billete elegido, antes de introducir datos           | No comprobable. Las páginas de ayuda se contradicen                                                           |
| C4  | El asiento se elige antes de pagar                                                                 | No cumple según las condiciones de venta (paso 6, después del pago)                                           |
| C5  | La asistencia PMR se ofrece en el mismo paso que el asiento                                        | Cumple según las condiciones de venta (paso 3, tarifas), pero el asiento llega después del pago               |
| C6  | Se puede comprar y recuperar el billete sin cuenta                                                 | Comprar sí. Para recuperarlo sin cuenta hay que ir a una máquina con la tarjeta de pago o llamar por teléfono |
| C7  | Una pantalla de revisión muestra todo lo que se va a pagar, con sus condiciones                    | No comprobable                                                                                                |
| C8  | Un error conserva lo introducido y explica qué hacer                                               | No cumple en la entrada directa a `buscarTren.do` («1 ERROR»)                                                 |
| C9  | El zoom no se bloquea en ningún paso                                                               | No cumple: `user-scalable=no` y `maximum-scale=1`                                                             |
| C10 | El billete incluye QR accesible, Wallet y PDF etiquetado, y dice si incluye el Combinado Cercanías | No comprobable                                                                                                |
| C11 | Cambio, anulación, factura e indemnización se hacen desde el propio billete                        | Anunciado por Renfe para el sistema nuevo                                                                     |

## Línea base

Medido el 19/10/2026 con Playwright 1.63 (Chromium) y axe-core 4.10.2, en un iPhone emulado de 390 × 844 px. Hubo una visita por página, con un contexto nuevo y sin login. axe detecta solo una parte de los problemas de accesibilidad y no entra en iframes de otro origen.

| Página                                              | Peticiones | Transferido | JavaScript | Dominios | Reglas axe incumplidas (críticas) |
| --------------------------------------------------- | ---------: | ----------: | ---------: | -------: | --------------------------------- |
| Portada `www.renfe.com/es/es`                       |        100 |   4.570 KiB |  1.514 KiB |        5 | 4 (1)                             |
| Inicio de venta `venta.renfe.com/vol/buscarTren.do` |         67 |   2.168 KiB |  1.786 KiB |        8 | 5 (2)                             |
| Horarios                                            |         70 |   1.593 KiB |  1.305 KiB |        5 | 4 (3)                             |
| Horarios de Cercanías Madrid                        |         78 |   5.393 KiB |  4.340 KiB |        8 | 5 (4)                             |
| Compromiso de puntualidad                           |         58 |   1.641 KiB |  1.328 KiB |        5 | 2 (1)                             |
| Servicio de asistencia                              |         62 |   1.680 KiB |  1.368 KiB |        5 | 2 (1)                             |

- **Zoom.** En renfe.com, el HTML servido declara un viewport correcto, pero después se sustituye por otro con `user-scalable=no`. Los resultados de `venta.renfe.com` declaran dos viewports, uno de ellos con `maximum-scale=1`. Las dos cosas impiden ampliar con los dedos.
- **Errores repetidos.** Hay 10 controles interactivos anidados (`nested-interactive`) en todas las páginas de renfe.com medidas.
- **Idioma.** El iframe de horarios de la versión en castellano tiene el título en euskera («Trenen ordutegiak…»).
- **Recorrido.** El de búsqueda (Madrid → Barcelona) se detuvo en los resultados, que cargan reCAPTCHA. No se probaron la compra, el login ni los datos personales.

En la fase 2 se repetirá esta medición sobre el sistema de venta nuevo.
