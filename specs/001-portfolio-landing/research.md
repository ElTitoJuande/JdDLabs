# Phase 0 — Research: Portfolio de una página JdDLabs

**Fecha**: 2026-09-08 | **Plan**: [plan.md](./plan.md)

Decisiones técnicas tomadas antes de diseñar. Cada una responde a un hueco real del Technical
Context o a un requisito de la spec que admitía más de una implementación razonable.

---

## R-001 — Configuración multi-página de Vite

**Decisión**: declarar cada HTML de la raíz en `build.rollupOptions.input` de `vite.config.js`,
con `index`, `avisoLegal`, `privacidad`, `notFound` y, si se construye, `caso`. Cada entrada
carga su propio módulo de `src/entries/`.

**Rationale**: es el mecanismo nativo de Vite para MPA, no requiere plugin y produce un bundle
por página con el CSS crítico separado. El principio I lo exige explícitamente.

**Alternativas descartadas**: `vite-plugin-mpa` (dependencia innecesaria para algo que Vite ya
hace); una SPA con React Router (prohibido por el principio I y peor para SEO, porque las
páginas legales dejarían de ser URLs reales indexables).

---

## R-002 — Página 404 en Cloudflare Pages

**Decisión**: construir `404.html` como una entrada más. Cloudflare Pages sirve automáticamente
el fichero `404.html` de la raíz de `dist` ante cualquier ruta no encontrada, con el código de
estado correcto.

**Rationale**: cubre FR-014 sin configuración adicional ni fichero de redirecciones.

**Alternativas descartadas**: `_redirects` con una regla comodín a `index.html` — convertiría
cualquier error en un 200, que es exactamente lo que penaliza el SEO de Lighthouse.

---

## R-003 — Carga de tipografías

**Decisión**: Fraunces auto-alojada en `public/fonts/` como un único `.woff2` estático, en el
peso que usen los titulares y con subconjunto latino. Se declara con `@font-face` propio,
`font-display: swap` y una etiqueta `<link rel="preload">` en cada HTML. Inter llega por
`@fontsource/inter` importando solo los pesos que se usen y el subconjunto latino.

**Rationale**: una sola petición de fuente bloqueante es lo que permite sostener el
Performance ≥ 90 en móvil. El principio II prohíbe la alternativa cómoda.

**Alternativas descartadas**: Fraunces en versión variable —cubre todos los pesos pero pesa
bastante más que un corte estático y aquí solo hacen falta titulares—; y cargar Inter también
como `.woff2` manual, que duplica el trabajo que `@fontsource` ya hace bien.

---

## R-004 — Animación de aparición al hacer scroll

**Decisión**: componente `Reveal` sobre `IntersectionObserver` nativo, que añade una clase y
deja que Tailwind haga la transición de opacidad y desplazamiento. El observador ni siquiera se
crea si `matchMedia('(prefers-reduced-motion: reduce)')` da positivo; en ese caso el contenido
se renderiza directamente en su estado final.

**Rationale**: cubre FR-010 y FR-011 con cero dependencias. Es crítico que el estado por defecto
sea *visible* y que la animación lo oculte solo cuando procede: al revés, un fallo de JavaScript
dejaría la página en blanco.

**Alternativas descartadas**: `framer-motion` —unos 40 KB comprimidos por una transición de
opacidad, y compite directamente con el principio VI—; animaciones CSS puras con
`animation-timeline`, todavía con soporte irregular.

---

## R-005 — Accesibilidad del menú móvil

**Decisión**: el botón de menú lleva `aria-expanded` y `aria-controls`. Al abrir, el foco pasa
al primer enlace; mientras está abierto, un hook propio `useFocusTrap` cicla el tabulador entre
los elementos enfocables del panel; al cerrar, el foco vuelve al botón. Escape cierra. El resto
de la página se marca `inert` mientras el panel está abierto. Un listener sobre
`matchMedia('(min-width: 768px)')` cierra el menú al pasar a escritorio, lo que resuelve de paso
el caso del giro de pantalla.

**Rationale**: cubre FR-009c a FR-009e y el caso límite del giro. Escuchar el cambio de
`matchMedia` en lugar del evento `orientationchange` es más fiable, porque lo que importa es el
ancho, no la orientación declarada.

**Alternativas descartadas**: `focus-trap-react` (dependencia evitable, ver Complexity Tracking);
ocultar el panel solo con CSS en escritorio, que dejaría enlaces enfocables invisibles — un
fallo clásico de accesibilidad.

---

## R-006 — Anclas bajo la cabecera fija

**Decisión**: la altura de la cabecera vive en una variable CSS `--header-h` definida en
`:root`, y `section[id] { scroll-margin-top: var(--header-h); }` la consume. El desplazamiento
suave se resuelve con `scroll-behavior: smooth` en CSS, anulado dentro de la consulta de
`prefers-reduced-motion`.

**Rationale**: cubre FR-008, FR-009b y el caso límite del ancla tapada, sin una línea de
JavaScript de scroll. Un solo valor gobierna cabecera y compensación, así que no pueden
desincronizarse.

**Alternativas descartadas**: `scrollIntoView` calculando desplazamientos a mano — más código y
peor comportamiento cuando el usuario ya está desplazándose.

---

## R-007 — Umbral de la trampa temporal anti-spam

**Decisión**: **3 segundos** entre el momento en que el formulario se monta y la llegada del
envío al servidor. La marca de tiempo se genera en el cliente al montar, viaja en el cuerpo de
la petición y la Function la compara con la suya. Por debajo del umbral, la Function responde
como si el envío hubiera ido bien pero no envía nada (FR-020d).

**Rationale**: ningún humano rellena nombre, email, mensaje y casilla en menos de tres segundos,
ni siquiera pegando texto. Es el punto donde el filtro atrapa bots sin rozar a nadie real. La
comparación se hace en el servidor porque el cliente no es de fiar.

**Alternativas descartadas**: 10 segundos, que empieza a acercarse peligrosamente a un usuario
muy rápido con autorrelleno; validar el umbral solo en el cliente, trivial de saltar.

**Riesgo asumido**: un reloj de cliente muy desviado podría producir una diferencia negativa. La
Function trata cualquier diferencia negativa o superior a 24 horas como marca no fiable y aplica
solo el resto de filtros, en lugar de descartar el mensaje.

---

## R-008 — Campo trampa (honeypot) sin dañar la accesibilidad

**Decisión**: un campo de texto envuelto en un contenedor con posicionamiento fuera de pantalla
(no `display:none`, que algunos bots detectan), marcado con `aria-hidden="true"`, `tabindex="-1"`
y `autocomplete="off"`. Nunca se anuncia a un lector de pantalla ni se alcanza con el tabulador.

**Rationale**: es la razón de ser de SC-004a. Un honeypot mal montado descarta en silencio a
usuarios de lector de pantalla, y como el descarte es silencioso nadie se entera nunca. Por eso
la validación manual incluye una pasada real con lector de pantalla antes de cerrar la tarea.

**Alternativas descartadas**: `display:none` (detectable y, en algunos navegadores, aun así
rellenable por gestores de contraseñas); un captcha de terceros, prohibido por FR-020c.

---

## R-009 — Identidad legal y fuente única del domicilio

**Decisión**: un único módulo `src/content/identity.js` exporta razón social, NIF, domicilio,
teléfono, WhatsApp y email. De él beben la sección de Contacto, el Aviso Legal, la Política de
Privacidad y el JSON-LD de `LocalBusiness`. El domicilio se copia literalmente de
`constitution.md`, sin reformular.

**Rationale**: cumple tu requisito de fuente única y hace estructuralmente imposible que el
domicilio del Aviso Legal difiera del que se publica en los datos estructurados.

**BLOQUEO RESUELTO el 2026-09-08**: `constitution.md` ya contiene los tres datos que exige el
artículo 10 de la LSSI — razón social `Juan de Dios Pérez Moreno`, NIF `50627812M` y domicilio
`Calle Francisco Salto 29, 1 Rute (Córdoba)`. El Aviso Legal deja de estar bloqueado y sale del
camino crítico.

La salvaguarda de `identity.js` se mantiene igualmente: el módulo sigue debiendo romper el build
si alguna de esas claves desaparece o llega vacía. Su valor ya no es desbloquear nada, sino
impedir una regresión silenciosa que publique un Aviso Legal incompleto.

---

## R-010 — Llamada a Resend desde la Function

**Decisión**: `fetch` directo a la API HTTP de Resend desde `functions/api/contact.js`, leyendo
la clave de `env.RESEND_API_KEY`. Remitente en el dominio `jddlabs.dev` ya verificado;
destinatario `hola@jddlabs.dev`; el email del visitante se coloca como dirección de respuesta,
nunca como remitente.

**Rationale**: el runtime de Cloudflare Workers no es Node, y una llamada `fetch` evita
cualquier problema de compatibilidad del SDK. Poner el correo del visitante como remitente
rompería SPF y DKIM y mandaría los mensajes a spam.

**Alternativas descartadas**: el SDK oficial de Resend (dependencia y superficie extra para una
única petición); usar el dominio de Cristalería Ruteña como remitente, expresamente descartado
por el propietario.

---

## R-011 — Revisión de fallos de envío

**Decisión**: revisión manual desde el panel de logs de Resend. Sin webhook ni notificación
automática en este lanzamiento. La Function registra el fallo en `console.error`, visible en los
logs de Cloudflare.

**Rationale**: decisión explícita del propietario, aparcada a v2. Es coherente con el principio
IX, que ya renuncia a instrumentación en este lanzamiento.

**Riesgo asumido y aceptado**: si la Function o Resend fallan, el visitante ve el error de
FR-017 y puede recurrir a WhatsApp, pero el propietario no recibe aviso alguno. Conviene mirar
el panel de Resend los primeros días tras el lanzamiento.

---

## R-012 — Imágenes del proyecto destacado

**Decisión**: capturas exportadas a formato moderno con ancho y alto explícitos en el marcado,
`loading="lazy"` y `decoding="async"`. Ninguna imagen de la mitad superior de la página lleva
carga perezosa, para no penalizar el LCP.

**Rationale**: cubre FR-023 y FR-024 y protege el Performance de Lighthouse. Las dimensiones
explícitas son lo que evita el desplazamiento de layout que penaliza el CLS.

**Alternativas descartadas**: carga perezosa indiscriminada, que retrasaría precisamente el
elemento que Lighthouse mide como LCP.
