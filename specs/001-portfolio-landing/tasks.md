---

description: "Task list for 001-portfolio-landing"
---

# Tasks: Portfolio de una página JdDLabs

**Input**: Design documents from `/specs/001-portfolio-landing/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: NO se generan tareas de test automatizado. El principio X de la constitución lo
prohíbe expresamente para este lanzamiento. La validación es `quickstart.md` más Lighthouse.

**Organization**: las tareas se agrupan por historia de usuario, para que cada una se pueda
implementar y validar por separado. La columna de calendario mapea cada fase a los grupos de
fechas del propietario.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: puede ir en paralelo (ficheros distintos, sin dependencias pendientes)
- **[Story]**: historia de usuario a la que sirve (US1…US5)
- Cada tarea incluye la ruta exacta del fichero

## Path Conventions

Sitio Vite multi-página en la raíz del repositorio: `index.html` y demás entradas en la raíz,
código en `src/`, la única función serverless en `functions/`, estáticos en `public/`.

---

## Calendario y mapeo de fases

| Fase | Historia | Grupo del propietario | Ventana |
|---|---|---|---|
| 1 — Setup | — | Grupo 1 | 7–8 sept |
| 2 — Foundational | — | Grupo 1b | 8–9 sept |
| 3 — US1 (P1) | Entender la oferta | Grupo 2 (contenido) + Grupo 3 (navegación) | 9–16 sept |
| 4 — US2 (P1) | Contactar | Grupo 2 (función) + Grupo 2b (legal) | 10–16 sept |
| 5 — US3 (P2) | Proyecto real | Grupo 2 | 9–13 sept |
| 6 — US4 (P3) | Sobre mí | Grupo 2 | 9–13 sept |
| 7 — Polish | — | Grupo 4 + Grupo 5 | 17–20 sept |
| 8 — US5 (P4) | Caso de estudio | Grupo 6 — OPCIONAL | Solo si sobra tiempo |

**Producción confirmada: 21 sept** (principio XI).

> **Dos correcciones sobre el estado que diste.** El repositorio **no** está inicializado: no hay
> `.git`, ni `package.json`, ni `src/`, ni `tailwind.config.js`. Solo existen `.claude/`,
> `.impeccable/`, `.specify/`, `specs/` y un `node_modules/` obsoleto de 20 paquetes que ni
> siquiera contiene React. Los dos ítems marcados `[HECHO]` del Grupo 1 están por hacer y
> aparecen abajo como T001–T006. En cambio, razón social y NIF **sí** están ya en
> `constitution.md`, así que el Grupo 1b deja de ser bloqueante.

---

---

## Estado de la implementación — 2026-09-09

61 de 84 tareas cerradas. Cada una se marcó solo tras ejecutar su comprobación; el
build (`npm run build`) termina sin errores ni warnings.

**Las 25 pendientes se agrupan en cuatro causas, ninguna de código:**

| Causa | Tareas | Qué hace falta |
|---|---|---|
| Assets que aún no se han aportado | T057, T060, T061 | Solo las capturas de Cristalería Ruteña; el logo ya está |
| Panel de Cloudflare / GitHub | T002, T012, T013, T078, T079 | Rama `main`, `RESEND_API_KEY` y conexión del proyecto de Pages |
| Validación manual en navegador o móvil real | T035, T056, T069, T070, T072–T077 | Recorrido de `quickstart.md`, Lighthouse, envío real de correo |
| Fase 8, opcional | T080–T084 | Solo si el calendario lo permite; T083 exige un testimonio verificado |

**Notas de implementación**

- El logo real llegó el 2026-09-09. Cabecera y pie usan `JdDLogo_marca.svg` con
  `currentColor`, que dentro de un `<img>` resuelve a negro puro. El favicon se
  construye con ese mismo trazo en blanco puro sobre la banda oscura, y la imagen de
  Open Graph usa la versión blanca en PNG. En ningún sitio se recolorea (principio IV).
- El copy de las cinco secciones ya no es provisional: se sustituyó por el definitivo
  de `copy-portfolio.md`, transcrito literalmente. Se retiraron las marcas
  `[PENDIENTE APROBACION]`.
- Corrección de dato: Cristalería Ruteña **no usa PHP ni MySQL**. El badge de la capa
  principal es `React · Vite · Tailwind · Cloudflare` (principio 70/30). El stack
  ampliado queda en `copy.js` bajo `casoEstudio`, listo para la Fase 8.
- El `<title>` y la meta descripción siguen diciendo "Desarrollo web para empresas en
  Rute", tal como fija T065, mientras el H1 ya dice "pymes y autónomos". Queda a
  decisión del propietario alinear las dos cadenas.
- La rama del repositorio es `master`, no `main`. El principio VIII y la configuración
  de Cloudflare Pages hablan de `main`: hay que decidir cuál de las dos se cambia.
- T051 se cerró contra el runtime real: `npx wrangler pages dev dist` responde 405, 400,
  200 silencioso por campo trampa, 200 silencioso por envío inmediato, 400 con detalle
  por campo y 500 con clave inválida. Falta un envío real con la clave de producción.
- Cloudflare Pages sirve las páginas sin extensión y devuelve un 308 desde `.html`. Los
  enlaces internos y las URL canónicas apuntan ya a `/aviso-legal` y `/privacidad`, sin
  extensión, para que ninguna navegación pase por un redirect.
- T069 queda abierta solo por su comprobación en producción. En el runtime local de
  Cloudflare una ruta inexistente ya devuelve un 404 real, no un 200.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: dejar el proyecto arrancable y desplegable. Grupo 1, 7–8 sept.

- [X] T001 Eliminar el directorio obsoleto `node_modules/` del repositorio (20 paquetes del proyecto anterior, sin React) antes de instalar nada nuevo
- [ ] T002 Inicializar el repositorio Git en la raíz y crear el repositorio remoto privado en GitHub con rama `main`
- [X] T003 Crear `.gitignore` en la raíz con `node_modules/`, `dist/`, `.env*` y `.wrangler/`
- [X] T004 Crear `package.json` en la raíz con React 18, react-dom, Vite 5, Tailwind CSS 3, postcss, autoprefixer y `@fontsource/inter`, y los scripts `dev`, `build` y `preview`
- [X] T005 Crear `vite.config.js` en la raíz con `build.rollupOptions.input` declarando las entradas `index.html`, `aviso-legal.html`, `privacidad.html` y `404.html` (ver research.md R-001)
- [X] T006 [P] Crear `tailwind.config.js` en la raíz con `theme.extend.colors` conteniendo los siete colores de la constitución (`bg` `#FAF9F6`, `ink` `#1A1A18`, `dark` `#15040D`, `accent` `#93002c`, `accentHover` `#780024`, `accentTint` `#f4e5e9`, `muted` `#6B6B66`) y `fontFamily` para Fraunces e Inter
- [X] T007 [P] Crear `postcss.config.js` en la raíz con tailwindcss y autoprefixer
- [X] T008 [P] Descargar el corte estático de Fraunces con subconjunto latino a `public/fonts/` y declarar su `@font-face` con `font-display: swap` en `src/styles/index.css` (ver research.md R-003)
- [X] T009 [P] Importar los pesos latinos necesarios de `@fontsource/inter` desde `src/styles/index.css`
- [X] T010 Añadir `<link rel="preload" as="font" type="font/woff2" crossorigin>` de Fraunces en el `<head>` de cada entrada HTML
- [X] T011 Verificar con la pestaña Red que no existe ninguna petición a `fonts.googleapis.com` ni `fonts.gstatic.com` (principio II, puerta de calidad 4)
- [ ] T012 Guardar `RESEND_API_KEY` como variable de entorno del proyecto en el panel de Cloudflare Pages, sin escribirla nunca en el repositorio (ver contracts/contact-api.md)
- [ ] T013 Conectar el repositorio de GitHub a Cloudflare Pages con build `npm run build`, salida `dist` y dominio `jddlabs.dev`, y comprobar que un push a `main` dispara el despliegue (principio VIII)

**Checkpoint**: `npm run build` termina limpio y un push a `main` publica en `jddlabs.dev`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: piezas compartidas por todas las historias. Grupo 1b, 8–9 sept.

**⚠️ Ninguna historia de usuario puede empezar hasta que esta fase esté completa.**

- [X] T014 Crear `src/content/identity.js` exportando `nombreComercial`, `razonSocial` (`Juan de Dios Pérez Moreno`), `nif` (`50627812M`), `domicilio` (`Calle Francisco Salto 29, 1 Rute (Córdoba)`, literal de `constitution.md`), `telefono`, `whatsapp`, `email` y `dominio`
- [X] T015 Añadir a `src/content/identity.js` la salvaguarda que lanza un error en tiempo de build si `razonSocial`, `nif` o `domicilio` faltan o llegan vacíos, de modo que un Aviso Legal incompleto rompa el build en lugar de publicarse (data-model.md §2, principio V)
- [X] T016 [P] Crear `src/content/copy.js` con el copy cerrado de las cinco secciones tomado literalmente de spec.md, **sin** clave `testimonio` (data-model.md §3)
- [X] T017 [P] Crear `src/styles/index.css` con las directivas de Tailwind, la variable `--header-h`, `section[id] { scroll-margin-top: var(--header-h) }` y `scroll-behavior: smooth` anulado dentro de `prefers-reduced-motion` (research.md R-006)
- [X] T018 [P] Colocar `JdDLogo_marca.svg` en `public/` en sus variantes negro y blanco puros, sin recolorear (principio IV)
- [X] T019 Crear `index.html`, `aviso-legal.html`, `privacidad.html` y `404.html` en la raíz, cada uno con `lang="es"`, su contenedor de montaje y su script de entrada
- [X] T020 [P] Crear los puntos de montaje `src/entries/main.jsx`, `src/entries/legal.jsx` y `src/entries/notfound.jsx`
- [X] T021 Crear `src/components/Footer.jsx` con los enlaces a Aviso Legal y Política de Privacidad, presente en las cuatro entradas (FR-021b, principio XII)

**Checkpoint**: las cuatro páginas cargan, comparten pie y tipografías, y el build sigue limpio.

---

## Phase 3: US1 — Entender la oferta y pedir presupuesto (P1)

**Goal**: que un visitante entienda en segundos qué ofrece JdDLabs y encuentre cómo pedir
presupuesto. Grupos 2 y 3, 9–16 sept.

**Independent Test**: cargar la página en frío y comprobar que se ve el titular, el subtítulo y
la llamada a la acción sin hacer scroll, que los tres servicios se leen, y que tanto el botón
como los enlaces de cabecera llevan a su sección. Escenarios V-1 y V-2 de `quickstart.md`.

- [X] T022 [P] [US1] Crear `src/sections/Hero.jsx` con el titular "Desarrollo web para pymes y autónomos", el subtítulo y el botón "Solicitar presupuesto", con el texto exacto de `copy.js` (FR-002)
- [X] T023 [P] [US1] Crear `src/sections/Servicios.jsx` con exactamente las tres tarjetas de `copy.js` (FR-003)
- [X] T024 [US1] Crear `src/components/Header.jsx` con cabecera fija, logo, enlaces de ancla a las cinco secciones y la llamada a la acción (FR-009a)
- [X] T025 [US1] Crear `src/hooks/useFocusTrap.js` que cicle el tabulador entre los elementos enfocables de un contenedor, sin dependencias externas (research.md R-005)
- [X] T026 [US1] Crear `src/components/MobileMenu.jsx` con `aria-expanded` y `aria-controls` en el botón, foco al primer enlace al abrir, foco contenido mediante `useFocusTrap`, retorno del foco al botón al cerrar y cierre con Escape (FR-009c, FR-009d, FR-009e)
- [X] T027 [US1] Marcar el resto de la página como `inert` mientras el panel móvil está abierto, en `src/components/MobileMenu.jsx`
- [X] T028 [US1] Cerrar el menú al cruzar el punto de ruptura escuchando `matchMedia('(min-width: 768px)')` en `src/components/MobileMenu.jsx`, lo que resuelve el caso límite del giro de pantalla (research.md R-005)
- [X] T029 [US1] Sincronizar `--header-h` con la altura real de la cabecera en `src/components/Header.jsx`, para que ningún ancla quede tapada (FR-009b)
- [X] T030 [US1] Cablear el botón "Solicitar presupuesto" al ancla de Contacto con desplazamiento suave, sin JavaScript de scroll (FR-008)
- [X] T031 [P] [US1] Crear `src/hooks/useReveal.js` con `IntersectionObserver`, que **no se cree siquiera** si `prefers-reduced-motion` está activo (research.md R-004)
- [X] T032 [US1] Crear `src/components/Reveal.jsx` cuyo estado inicial sea **visible**, de forma que un fallo de JavaScript deje la página legible en lugar de en blanco (FR-010, FR-011)
- [X] T033 [US1] Montar Hero y Servicios en `src/entries/main.jsx` dentro de la estructura de la página
- [X] T034 [US1] Verificar el layout de una sola columna por debajo de 768px en Hero y Servicios (FR-012)
- [ ] T035 [US1] Ejecutar los escenarios V-1 y V-2 de `quickstart.md`, incluido el recorrido del menú móvil solo con teclado

**Checkpoint**: US1 entregable por sí sola. Ya hay una página que explica la oferta y navega.

---

## Phase 4: US2 — Contactar por el canal preferido (P1)

**Goal**: que el visitante contacte por el canal que prefiera, incluido un formulario que
funcione de verdad. Grupos 2 y 2b, 10–16 sept.

**Independent Test**: ejercitar los cuatro canales; los tres directos abren su aplicación y el
formulario completa un envío válido y rechaza uno inválido. Escenarios V-3 a V-6.

**⚠️ El cumplimiento legal de esta fase no se recorta bajo ninguna circunstancia (principio XII).**

### Sección y canales directos

- [X] T036 [US2] Crear `src/sections/Contacto.jsx` con el texto de invitación de `copy.js` y los tres canales directos leídos de `identity.js` (FR-006, FR-025)
- [X] T037 [US2] Verificar que teléfono, WhatsApp y email funcionan sin depender del formulario ni de JavaScript

### Formulario

- [X] T038 [US2] Crear `src/components/ContactForm.jsx` como formulario nativo con `required` y `type="email"`, y los campos nombre, email, teléfono opcional y mensaje (data-model.md §1)
- [X] T039 [US2] Añadir al formulario la casilla de consentimiento no premarcada, con enlace a la Política de Privacidad a su lado, que bloquea el envío mientras no se marque (FR-021, FR-021a, FR-021c)
- [X] T040 [US2] Añadir el campo trampa `website` fuera de pantalla, con `aria-hidden="true"`, `tabindex="-1"` y `autocomplete="off"` — nunca con `display:none` (research.md R-008)
- [X] T041 [US2] Registrar la marca de tiempo `ts` al montar el formulario y enviarla en el cuerpo de la petición (research.md R-007)
- [X] T042 [US2] Implementar los cuatro estados de envío (inactivo, enviando, enviado, error) en `src/components/ContactForm.jsx`, deshabilitando el botón mientras se envía para impedir el duplicado (FR-015, FR-018, data-model.md §4)
- [X] T043 [US2] Mostrar los errores devueltos por el servidor junto a cada campo afectado, conservando lo ya escrito en el resto (FR-016)
- [X] T044 [US2] Mostrar en caso de fallo un mensaje distinguible del de éxito y ofrecer WhatsApp como alternativa visible (FR-017)

### Función serverless

- [X] T045 [US2] Crear `functions/api/contact.js` rechazando con `405` cualquier método distinto de POST y con `400` un cuerpo que no sea JSON válido (contracts/contact-api.md)
- [X] T046 [US2] Implementar en `functions/api/contact.js` el descarte silencioso con respuesta `200` cuando `website` llega con contenido, sin revelar el motivo (FR-020, FR-020d)
- [X] T047 [US2] Implementar el umbral temporal de 3 segundos en `functions/api/contact.js`, tratando como **no fiable** —y por tanto sin descartar— cualquier diferencia negativa o superior a 24 horas (FR-020a, research.md R-007)
- [X] T048 [US2] Implementar en `functions/api/contact.js` la validación completa de servidor de nombre, email, teléfono, mensaje y consentimiento con los límites de data-model.md §1, devolviendo `400` con el detalle por campo (FR-020b)
- [X] T049 [US2] Implementar en `functions/api/contact.js` la llamada `fetch` a la API de Resend leyendo `env.RESEND_API_KEY`, con remitente en `jddlabs.dev`, destinatario `hola@jddlabs.dev` y el email del visitante como dirección de respuesta (research.md R-010)
- [X] T050 [US2] Registrar los fallos de envío con `console.error` en `functions/api/contact.js` y devolver `500`, sin perder nunca un mensaje en silencio (research.md R-011)
- [X] T051 [US2] Verificar con `npx wrangler pages dev dist` que el endpoint responde según el contrato en los seis casos de la tabla de respuestas

### Cumplimiento legal — no recortable

- [X] T052 [P] [US2] Redactar `src/content/legal.js` con el Aviso Legal, tomando razón social, NIF y domicilio de `identity.js` (LSSI art. 10, FR-021b)
- [X] T053 [P] [US2] Redactar en `src/content/legal.js` la Política de Privacidad identificando responsable, finalidad, derechos y nombrando a Cloudflare y Resend como encargados del tratamiento (RGPD art. 13, principio XII)
- [X] T054 [US2] Montar ambos textos en `aviso-legal.html` y `privacidad.html` a través de `src/entries/legal.jsx`
- [X] T055 [US2] Comprobar que el domicilio coincide carácter a carácter entre `constitution.md`, el Aviso Legal y `identity.js`
- [ ] T056 [US2] Ejecutar los escenarios V-3, V-4 y V-6 de `quickstart.md`

**Checkpoint**: US2 completa y legalmente publicable. El formulario **no debe publicarse** sin
T052–T055 terminadas.

---

## Phase 5: US3 — Evaluar la calidad con un proyecto real (P2)

**Goal**: dar prueba de trabajo real con Cristalería Ruteña. Grupo 2, 9–13 sept.

**Independent Test**: abrir la sección y comprobar que "Visitar en vivo" abre
cristaleriarutena.es en pestaña nueva. Escenario V-1 punto 2.

- [ ] T057 [P] [US3] Recopilar las capturas del sitio de Cristalería Ruteña y exportarlas a formato moderno en `public/img/`, con dimensiones conocidas (research.md R-012)
- [X] T058 [US3] Crear `src/sections/ProyectoDestacado.jsx` con la descripción cerrada, las tecnologías (React, Vite, Tailwind, Cloudflare) y la firma "Proyecto realizado por Juan de Dios." (FR-004)
- [X] T059 [US3] Añadir el enlace "Visitar en vivo" a `https://cristaleriarutena.es` abriendo en pestaña nueva con `rel="noopener"` (FR-009)
- [ ] T060 [US3] Aplicar `loading="lazy"`, `decoding="async"` y ancho y alto explícitos a las capturas, sin aplicar carga perezosa a nada de la mitad superior de la página (FR-023, research.md R-012)
- [ ] T061 [US3] Escribir texto alternativo descriptivo para cada captura (FR-024)
- [X] T062 [US3] Confirmar que el bloque de testimonio **no se renderiza** al no existir la clave `testimonio` en `copy.js`, sin dejar hueco ni marcador (FR-007, principio V)

**Checkpoint**: la sección da credibilidad sin un solo dato sin verificar.

---

## Phase 6: US4 — Saber quién está detrás (P3)

**Goal**: poner cara y lugar al proyecto. Grupo 2, 9–13 sept.

**Independent Test**: leer la sección y comprobar que identifica a la persona y su ámbito.

- [X] T063 [P] [US4] Crear `src/sections/SobreMi.jsx` con el párrafo principal y la línea de refuerzo de `copy.js` (FR-005)
- [X] T064 [US4] Montar las cinco secciones en `src/entries/main.jsx` en el orden exacto de FR-001 y verificar el layout de una columna por debajo de 768px en todas (FR-012)

**Checkpoint**: las cinco secciones completas y en orden.

---

## Phase 7: Polish, calidad y despliegue

**Purpose**: Grupos 4 y 5, 17–20 sept. Nada de desarrollo nuevo a partir del 19.

- [X] T065 [P] Añadir `<title>` y `<meta name="description">` con "Desarrollo web para empresas en Rute" y URL canónica bajo `jddlabs.dev` en las cuatro entradas HTML (FR-022a, FR-021d)
- [X] T066 [P] Añadir las etiquetas Open Graph y crear `public/og-image.png` para la previsualización al compartir (FR-022b)
- [X] T067 [P] Generar `public/favicon.svg` a partir del monograma JdD, respetando el negro o blanco puros (principio IV)
- [X] T068 Añadir en `index.html` el JSON-LD de tipo `LocalBusiness` con nombre comercial, domicilio literal de `identity.js`, ámbito Rute y provincia de Córdoba, y canales de contacto — **sin NIF** (FR-022c)
- [ ] T069 Implementar el contenido de `404.html` con enlace de vuelta al inicio y comprobar en producción que devuelve un código 404 real, no un 200 (FR-014, research.md R-002)
- [ ] T070 Ejecutar Lighthouse en desktop y móvil sobre la URL publicada y corregir hasta alcanzar 90 o más en las cuatro categorías (principio VI, SC-003)
- [X] T071 Buscar la cadena de la clave de Resend en todos los ficheros de `dist/` y confirmar cero coincidencias (puerta de calidad 6, FR-019a)
- [ ] T072 **Ejecutar el escenario V-5 completo**: enviar el formulario usando solo teclado y con lector de pantalla activo, y confirmar que el correo llega a Resend sin caer en ninguno de los dos filtros anti-spam (SC-004a) — **no omitible**
- [ ] T073 Probar el formulario en un móvil real, no en el emulador del navegador (SC-008)
- [ ] T074 Validar el JSON-LD en una herramienta de resultados enriquecidos y comprobar la tarjeta al compartir el enlace por WhatsApp (SC-003a, SC-003b)
- [ ] T075 Verificar a 320px de ancho que no hay scroll horizontal ni texto cortado (SC-006)
- [ ] T076 Recorrer la página entera con el tabulador comprobando foco siempre visible y sin trampas (FR-013, SC-007)
- [ ] T077 Activar la reducción de movimiento del sistema y confirmar que no hay animación y que **todo el contenido queda visible** (FR-011)
- [ ] T078 Primer despliegue a producción en `jddlabs.dev`, sin anunciarlo (17–18 sept)
- [ ] T079 Ventana de contingencia 19–20 sept: corregir únicamente lo que falle del despliegue, sin desarrollo nuevo (principio XI)

**Checkpoint**: las seis puertas de calidad de la constitución pasan. Producción el 21 sept.

---

## Phase 8: US5 — Caso de estudio ampliado (P4, OPCIONAL)

**Goal**: detalle del proyecto destacado. Grupo 6. **Primera candidata a recorte** ante cualquier
conflicto de calendario (principio XI).

**Independent Test**: abrir la página de caso desde el proyecto destacado y volver al portfolio.

- [ ] T080 [US5] Crear `caso-cristaleria.html` en la raíz y añadirlo a `rollupOptions.input` de `vite.config.js`
- [ ] T081 [US5] Crear `src/entries/caso.jsx` y la página con los bloques Cliente, Rol, Stack, Reto, Solución y Highlights, reutilizando `Header` y `Footer`
- [ ] T082 [US5] Enlazar la página desde `src/sections/ProyectoDestacado.jsx` y ofrecer camino de vuelta al portfolio
- [ ] T083 [US5] Insertar el testimonio de Cristalería Ruteña **solo si** el cliente ya ha respondido y el propietario lo ha verificado; si no, no se añade el bloque (FR-007, principio V)
- [ ] T084 [US5] Ejecutar Lighthouse sobre la nueva página hasta 90 o más en las cuatro categorías

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Fase 1)**: sin dependencias, empieza ya.
- **Foundational (Fase 2)**: depende de la Fase 1. **Bloquea todas las historias.**
- **US1, US3 y US4**: dependen solo de la Fase 2. Independientes entre sí.
- **US2**: depende de la Fase 2, y de T012 y T013 de la Fase 1 para poder probar el envío real.
- **Polish (Fase 7)**: depende de US1, US2, US3 y US4.
- **US5 (Fase 8)**: depende de US3. Opcional.

### Dependencias críticas dentro de las historias

- T015 antes que T052: la salvaguarda debe existir antes de redactar el Aviso Legal.
- T052–T055 antes que T078: **el formulario no se publica sin páginas legales** (principio XII).
- T024 y T029 antes que T030: el desplazamiento a un ancla necesita la altura de cabecera.
- T025 antes que T026: el focus trap es prerrequisito del menú.
- T045–T048 antes que T049: no se llama a Resend hasta haber filtrado y validado.
- T057 antes que T058: no se maqueta la sección sin las capturas reales.

### Parallel Opportunities

- Fase 1: T006, T007, T008 y T009 en paralelo tras T004.
- Fase 2: T016, T017, T018 y T020 en paralelo tras T014.
- Una vez cerrada la Fase 2, **US1, US3 y US4 pueden avanzar en paralelo**; son secciones en
  ficheros distintos que no se tocan entre sí.
- Dentro de US2, el formulario (T038–T044) y la función (T045–T050) son ficheros distintos y
  avanzan a la vez; solo convergen en T051.
- Los textos legales T052 y T053 son paralelos entre sí.
- Fase 7: T065, T066 y T067 en paralelo.

---

## Implementation Strategy

### MVP

**US1 + US2** es el mínimo publicable: una página que explica la oferta y permite contactar.
US3 y US4 elevan la conversión, pero el sitio ya funciona sin ellas.

### Entrega incremental

1. Fases 1 y 2 → esqueleto desplegable.
2. US1 → página que explica y navega. Ya se puede enseñar.
3. US2 → conversión completa, con su cumplimiento legal. **Aquí está el listón de publicación.**
4. US3 y US4 → credibilidad y confianza.
5. Fase 7 → puertas de calidad y producción.
6. US5 → solo si el calendario lo permite.

### Orden de recorte ante presión de plazo

Se recorta en este orden, nunca al revés (principio XI):

1. US5 completa (Fase 8).
2. US4, la sección Sobre mí.
3. Capturas adicionales del proyecto destacado, dejando una sola.

**Nunca recortable**: las páginas legales (T052–T055), las puertas de Lighthouse (T070), la
accesibilidad del menú (T025–T028) y la verificación V-5 (T072).
