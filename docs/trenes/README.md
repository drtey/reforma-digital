# Trenes: propuesta para la experiencia pública de Renfe

Propuesta de investigación para [#15](https://github.com/samuelcorsan/reforma-digital/issues/15). Las fuentes se consultaron el 19/10/2026.

| Documento                          | Contenido                                                                                                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Este brief                         | Contexto, inventario de flujos críticos, encaje y alcance                                                |
| [Mapa de pantallas](pantallas.md)  | Mapa actual de Renfe, pantallas de la fase 1 y concepto de compra y billete                              |
| [Arquitectura](arquitectura.md)    | Arquitectura de la información, arquitectura técnica, sistema de diseño, accesibilidad, rendimiento e IA |
| [Criterios de éxito](criterios.md) | Objetivos medibles y línea base medida en renfe.com                                                      |

No está vinculada a Renfe ni a Adif.

## Resumen

- Renfe estrena un sistema de venta nuevo el **28/10/2026**. Desde ese día se compran en él los viajes con salida a partir del 25/01/2027, los anteriores siguen en el sistema actual y el 25/01/2027 toda la venta pasa al nuevo ([nota de prensa](https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/09/renfe-transforma-sistema-de-venta)). Construir ahora otra compra sería trabajo que caduca en semanas y, además, nunca la podríamos operar: el pago, el CAPTCHA y los datos del viajero son de Renfe.
- Lo que ese anuncio no cubre es lo que más se consulta cuando algo falla: si mi tren va bien, qué incidencias hay en mi línea, qué me corresponde si llega tarde y cómo pido asistencia. Renfe publica datos abiertos oficiales con licencia CC BY 4.0 para resolverlo sin cuentas, pagos ni datos personales.
- Proponemos dos entregas:
  - **Fase 1:** una sección pública de información en `apps/web` (horarios, estado en tiempo real, incidencias, derechos y accesibilidad) que enlaza a renfe.com para comprar y reclamar.
  - **Concepto de compra y billete:** diseño de referencia, no construido. Sirve para evaluar el sistema nuevo de Renfe a partir del 25/01/2027 y para proponérselo.

## Contexto que condiciona la propuesta

- **Sistema de venta nuevo.** Durante la transición hay una sola puerta de entrada que lleva a un sistema u otro según la fecha del viaje. Renfe promete comparar trenes por precio, duración, servicios y ocupación, mostrar las condiciones antes de confirmar y gestionar cambios, facturas e indemnizaciones desde el propio billete. Todo eso está anunciado, no verificado.
- **Incidente de ciberseguridad.** Renfe informa de un acceso no autorizado del 24/09/2026 a sistemas de venta, con posible exposición de datos identificativos, DNI/NIE, viajes y contraseñas cifradas, y avisa del riesgo de suplantación ([comunicado](https://www.renfe.com/es/es/ayuda/notificacion-personas-afectadas)). Cualquier interfaz que se parezca a Renfe o pida un localizador refuerza ese riesgo. Por eso esta propuesta no usa su marca ni pide datos.
- **Accesibilidad declarada.** renfe.com se declara «parcialmente conforme» con el [RD 1112/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-12699) y enumera 22 incumplimientos de la UNE-EN 301549, entre ellos el zoom, el foco, las etiquetas y los mensajes de estado. La declaración se revisó por última vez el 29/09/2024 ([declaración](https://www.renfe.com/es/es/ayuda/informacion-legal-viajeros/accesibilidad-web)). Además, la [Ley 11/2023](https://www.boe.es/buscar/act.php?id=BOE-A-2023-11022) (art. 2.2.c) exige accesibilidad a webs, apps, billetes electrónicos e información en tiempo real del transporte ferroviario desde el 28/06/2025. Para los servicios urbanos, suburbanos y regionales solo exige los terminales interactivos, y hay un régimen transitorio hasta 2030.
- **Rodalies.** La nueva empresa mixta Renfe–Generalitat y el posible cambio de marca pueden mover enlaces y canales en Catalunya. Lo revisaremos antes de enlazar.

## Encaje en Reforma Digital

El issue la plantea como proyecto hermano, separado del chat de trámites. Proponemos que sea una sección de `apps/web`, igual que El Congreso y Elecciones, y no una app nueva ni un portal de la extensión:

| Opción                                 | A favor                                                                                                                  | En contra                                                                                 | Decisión                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Sección `/trenes` en `apps/web`        | Reutiliza Sol, el despliegue, Postgres y el patrón de ingesta de El Congreso. Es una iniciativa visible desde la portada | Comparte despliegue con el resto de la web                                                | **Recomendada**                                      |
| App independiente                      | Ciclo de vida propio                                                                                                     | Duplica diseño, despliegue, datos y revisión de seguridad                                 | Solo si crece más allá de una sección                |
| Portal de la extensión sobre renfe.com | Mejora la web oficial en su sitio                                                                                        | La compra cambia el 28/10 y el 25/01. Cubriría CAPTCHA y pago, que no se pueden sustituir | Reevaluar en la fase 2, solo para pantallas públicas |
| Chat de trámites o app de escritorio   | Ya existen                                                                                                               | Comprar un billete no es un trámite administrativo y el issue lo excluye                  | Descartada                                           |

## Inventario de flujos críticos

Observado el 19/10/2026 en móvil (390 px). El método y las cifras están en [criterios.md](criterios.md#línea-base), y el mapa de pantallas actual, en [pantallas.md](pantallas.md#mapa-actual-de-renfe).

| Flujo                | Dónde vive hoy                                                                                                                                                                                                                                                                                        | Qué observamos                                                                                                                                                                                                                                                                                                                                                                                                                      | ¿Lo cambia el sistema nuevo? | Oportunidad                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| Buscar               | Buscador en `www.renfe.com` → resultados en `venta.renfe.com/vol/*.do`. Horarios en iframes (`horarioscercanias.renfe.com` en Cercanías)                                                                                                                                                              | Viene preseleccionada ida y vuelta (hoy y mañana). Los resultados cargan reCAPTCHA, y un aviso sobre indemnizaciones ocupa casi toda la primera pantalla. A los 6 s seguía en «Estamos buscando tu viaje». Entrar directamente en `buscarTren.do` muestra «1 ERROR» sin explicación                                                                                                                                                 | Sí                           | Horarios y estado desde GTFS, sin pasar por la venta                                       |
| Comprar              | `venta.renfe.com`. Según las [condiciones de venta](https://www.renfe.com/es/es/ayuda/informacion-legal-viajeros/billetes-abonos/condiciones-legales-venta-billetes), en 7 pasos: búsqueda, disponibilidad, tarifas (con asistencia y mascotas), identificación, pago, selección de asiento y billete | No se recorrió más allá de los resultados: se detiene antes del CAPTCHA y de los datos personales. Según la documentación, el asiento se elige **después** de pagar, pero la ficha del [Básico](https://www.renfe.com/es/es/viajar/prepara-tu-viaje/billetes-ave-y-largadistancia/basico) lo vende como extra de 5 €. Se puede comprar hasta 15 min antes de la salida (30 min por teléfono). AVE y Larga Distancia son nominativos | Sí                           | [Concepto de compra](pantallas.md#concepto-compra-y-billete) para evaluar el sistema nuevo |
| Billete              | PDF impreso o impreso en la estación, «Billete en el Móvil», Wallet/PassBook o app Renfe. En Cercanías, tarjeta +Renfe&Tú, pago sin contacto en los tornos de Madrid o QR en la app                                                                                                                   | Sin cuenta no se puede recuperar el billete en la web: hay que ir a una máquina con la tarjeta de pago o llamar al 91 919 05 04 ([FAQ](https://www.renfe.com/es/es/ayuda/faqs/compra-billetes)). Los abonos exigen cuenta y «formalizar» cada viaje. En Cercanías Madrid, quien paga con tarjeta bancaria sin contacto y no valida a la salida paga la tarifa máxima                                                                | En parte (anunciado)         | Explicar qué soporte sirve en cada tren y cómo recuperarlo, sin pedir el localizador       |
| Posventa             | Menú «Gestiona tu billete», con cambiar, anular, factura, indemnización y reclamación                                                                                                                                                                                                                 | Las condiciones dependen de la tarifa (Básico, Elige, Prémium, Avant/MD, Cercanías) y están repartidas en varias páginas que se contradicen (ver abajo)                                                                                                                                                                                                                                                                             | Sí (anunciado)               | Explicar condiciones y plazos antes de entrar y enlazar el trámite oficial                 |
| Incidencias          | Avisos en la sala de prensa, WhatsApp (solo 2 líneas), apps separadas de Renfe, Cercanías y Adif, y datos abiertos                                                                                                                                                                                    | El feed abierto de avisos (`alerts.json`) solo cubre Cercanías y lleva sin actualizarse desde el 07/10/2026. Contiene obras ya terminadas («del 10 al 12 de octubre») sin fecha de fin, y el 11 % de sus referencias a líneas no existe en el GTFS. Los feeds de horarios y posiciones sí están al día                                                                                                                              | No consta                    | Una vista por tren y por línea que muestre la antigüedad del dato                          |
| Asistencia (PMR)     | Adif Acerca (antes Atendo), gestionado por Adif. Se puede pedir al comprar                                                                                                                                                                                                                            | 70 estaciones con servicio permanente (solicitud hasta 30 min antes) y 76 con servicio puntual (12 h)                                                                                                                                                                                                                                                                                                                               | No                           | Estación y tren accesibles (los GTFS lo incluyen) junto a cómo y cuándo pedir asistencia   |
| Derechos por retraso | Página «Compromiso de puntualidad» y formularios de `venta.renfe.com`                                                                                                                                                                                                                                 | Tres capas de normas en conflicto (ver abajo)                                                                                                                                                                                                                                                                                                                                                                                       | No consta                    | Explicar cada capa con su fuente sin decidir por la persona                                |

### Indemnizaciones: tres capas que no coinciden

| Capa        | Qué dice                                                                                                                                                                                                                                                               | Fuente                                                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UE (mínimo) | 25 % con retrasos de 60 a 119 min y 50 % desde 120 min. Las acciones del administrador de infraestructuras **no** eximen de indemnizar (art. 19.10). Formulario común voluntario                                                                                       | [Reglamento (UE) 2021/782](https://www.boe.es/doue/2021/172/L00001-00052.pdf), [Reglamento de Ejecución (UE) 2024/949](https://boe.gob.es/doue/2024/949/L00001-00007.pdf) |
| Renfe (hoy) | AVE y Larga Distancia: 50 % desde 60 min y 100 % desde 90 min. Media Distancia y Avant con tramos desde 15 min. Excluye los retrasos por limitaciones temporales de velocidad de Adif en billetes comprados desde el 31/01/2026. Plazo de 24 h a 3 meses tras el viaje | [Compromiso de puntualidad](https://www.renfe.com/es/es/ayuda/compromiso-puntualidad)                                                                                     |
| Ley 9/2025  | La DA 31.ª ordena recuperar, con efectos desde el 01/01/2026, el 50 % a los 15 min y el 100 % a los 30 min en Alta Velocidad y Larga Distancia. Renfe sostiene que está pendiente de desarrollo reglamentario                                                          | [BOE-A-2025-24545](https://www.boe.es/buscar/act.php?id=BOE-A-2025-24545)                                                                                                 |

La interfaz no resuelve el conflicto: muestra las tres capas, de dónde sale cada una y dónde reclamar.

### Páginas oficiales que se contradicen

| Tema              | Una página dice                                                                                                                                            | Otra dice                                                                                                                                                                                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anular un Básico  | «El billete Básico no admite anulaciones» ([anular](https://www.renfe.com/es/es/ayuda/anular-billete))                                                     | «Permite la anulación del billete, pero no incluye reembolso», y a la vez «todos nuestros billetes se pueden anular sin gastos dentro de las 2 horas siguientes a la compra» ([Básico](https://www.renfe.com/es/es/viajar/prepara-tu-viaje/billetes-ave-y-largadistancia/basico)) |
| Medios de pago    | Tarjeta o PayPal ([condiciones de venta](https://www.renfe.com/es/es/ayuda/informacion-legal-viajeros/billetes-abonos/condiciones-legales-venta-billetes)) | Tarjeta, Puntos Renfe, PayPal, Bizum, Google Pay y Apple Pay ([FAQ](https://www.renfe.com/es/es/ayuda/faqs/compra-billetes))                                                                                                                                                      |
| Comprar Cercanías | Solo en máquinas y taquillas ([FAQ Cercanías](https://www.renfe.com/es/es/ayuda/faqs/cercanias))                                                           | También en la app Renfe Cercanías en nueve ciudades ([apps](https://www.renfe.com/es/es/viajar/informacion-util/aplicaciones))                                                                                                                                                    |
| Teléfono de Renfe | 912 320 320 ([anular](https://www.renfe.com/es/es/ayuda/anular-billete), GTFS de Cercanías)                                                                | 91 320 320 ([asistencia](https://www.renfe.com/es/es/viajar/informacion-util/servicio-de-asistencia/que-es)) y 902 320 320 (GTFS de AV/LD/MD)                                                                                                                                     |
| Vigencia          | «Última actualización: 06/05/2026» ([abonos gratuitos](https://www.renfe.com/es/es/promociones/abonos-renfe/abonos-gratuitos))                             | La misma página conserva plazos que vencieron el 31/12/2023 y el 30/04/2024                                                                                                                                                                                                       |

Cuando dos fuentes oficiales no coinciden, la interfaz muestra las dos con su enlace y no elige.

## Alcance

**Fase 1, información pública (ahora):**

- Horarios por origen, destino y fecha; ficha de cada tren con su estado en tiempo real; avisos por línea de Cercanías.
- Accesibilidad de estaciones y trenes (`wheelchair_boarding` y `wheelchair_accessible` de los GTFS) y cómo pedir Adif Acerca.
- Derechos ante retrasos, condiciones de cambio y anulación por tarifa y qué soporte del billete sirve en cada tren, con fuentes y fecha.
- Cada acción (comprar, reclamar, pedir asistencia) termina en un enlace a la web oficial con el dominio visible.

**Concepto de compra y billete (diseño, no código):** pantallas de referencia en [pantallas.md](pantallas.md#concepto-compra-y-billete), con la lista de comprobación de [criterios.md](criterios.md#concepto-de-compra-y-billete). Desde el 25/01/2027 se aplicará al sistema nuevo y se publicarán los resultados. Solo si persisten problemas en pantallas públicas previas a la compra se valorará adaptarlas con la extensión, siguiendo CONTRIBUTING.md.

**Fuera de alcance:**

- Vender billetes o intermediar en la compra.
- Pedir o guardar localizador, DNI, cuenta o tarjeta.
- Sustituir el reCAPTCHA, el pago o el login.
- Consumir APIs internas (`wsrestcorp.renfe.es`, `venta.renfe.com`) o datos de Adif sin una licencia pública.
- Usar el logotipo, los colores o el nombre de Renfe como identidad propia.

## Fuentes

Datos abiertos ([data.renfe.com](https://data.renfe.com/dataset), CC BY 4.0, 44 conjuntos):

- GTFS de [Cercanías](https://data.renfe.com/dataset/horarios-cercanias): 767 rutas, 1.147 paradas, vigente del 19/10 al 17/11/2026.
- GTFS de [AV/LD/MD](https://data.renfe.com/dataset/horarios-de-alta-velocidad-larga-distancia-y-media-distancia): 658 rutas, 1.006 paradas, excepciones de calendario hasta el 24/01/2027.
- GTFS-RT: [horarios de Cercanías](https://data.renfe.com/dataset/horarios-viaje-cercanias), [horarios de AV/LD/MD](https://data.renfe.com/dataset/horarios-viaje-alta-velocidad-larga-media-distancia), [posiciones](https://data.renfe.com/dataset/ubicacion-vehiculos) y [avisos](https://data.renfe.com/dataset/incidencias-avisos).

Normativa:

- [Reglamento (UE) 2021/782](https://www.boe.es/doue/2021/172/L00001-00052.pdf), arts. 9, 10, 18, 19, 24 y 28.
- [Reglamento de Ejecución (UE) 2024/949](https://boe.gob.es/doue/2024/949/L00001-00007.pdf).
- [Ley 9/2025](https://www.boe.es/buscar/act.php?id=BOE-A-2025-24545), DA 31.ª.
- [Ley 11/2023](https://www.boe.es/buscar/act.php?id=BOE-A-2023-11022), art. 2.2.c y disposición transitoria única.
- [RD 1112/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-12699).

Páginas oficiales:

- [Cambiar billete](https://www.renfe.com/es/es/ayuda/cambiar-billete), [anular billete](https://www.renfe.com/es/es/ayuda/anular-billete), [compromiso de puntualidad](https://www.renfe.com/es/es/ayuda/compromiso-puntualidad) y [reclamaciones](https://www.renfe.com/es/es/ayuda/informacion-legal-viajeros/reclamaciones).
- [Condiciones de venta](https://www.renfe.com/es/es/ayuda/informacion-legal-viajeros/billetes-abonos/condiciones-legales-venta-billetes), [FAQ de compra](https://www.renfe.com/es/es/ayuda/faqs/compra-billetes), [FAQ de abonos](https://www.renfe.com/es/es/ayuda/faqs/abonos), [FAQ de Cercanías](https://www.renfe.com/es/es/ayuda/faqs/cercanias), [tarifas de Cercanías Madrid](https://www.renfe.com/es/es/cercanias/cercanias-madrid/tarifas/billetes) y [comparativa de billetes](https://www.renfe.com/es/es/viajar/prepara-tu-viaje/billetes-ave-y-largadistancia/todos-los-billetes).
- [Servicio de asistencia](https://www.renfe.com/es/es/viajar/informacion-util/servicio-de-asistencia/que-es) y [estaciones de Adif Acerca](https://www.adif.es/viajeros/accesibilidad-estaciones). Este último enlace sale de la página de Renfe, pero adif.es responde 403 al acceso automatizado y no pudimos comprobarlo.
- [Avisos por WhatsApp](https://www.renfe.com/es/es/ayuda/suscripcion-avisos-whatsapp).

Del [sitemap](https://www.renfe.com/sitemap.xml), 1.296 de las 1.871 URLs en castellano (69 %) son de inspiración o revista. 68 son de ayuda y gestión del billete, y 44 de ellas, de información legal.

## Decisiones abiertas

- Nombre y ruta de la sección. Proponemos `/trenes`, sin la marca Renfe.
- De dónde sacar la modalidad de Adif Acerca de cada estación: la lista de adif.es no se puede leer de forma automatizada. Hay que pedírsela a Adif o mantenerla a mano con su fecha.
- Otros operadores (Ouigo, Iryo): no hemos investigado sus datos, así que quedan fuera de la v1.
- Umbral de antigüedad por feed. Proponemos 2 min para horarios y posiciones y 15 min para avisos, pero hay que calibrarlo con datos reales.
- Si el proyecto comunica estos hallazgos a Renfe por su canal de accesibilidad, junto con el concepto de compra.
