# Feature Specification: Portfolio de una página JdDLabs

**Feature Branch**: `001-portfolio-landing`

**Created**: 2026-09-08

**Status**: Draft — clarificaciones resueltas 2026-09-08; FR-004 reformulado y US5 pasada a
alcance comprometido el 2026-09-11

**Input**: User description: "Portfolio de una sola página para JdDLabs (Juan de Dios Pérez Moreno, desarrollador Full Stack, Rute, Andalucía), dirigido a PYMEs y autónomos locales que necesitan una web profesional."

## Clarifications

### Session 2026-09-08

Decisiones aportadas por el propietario sin necesidad de pregunta (ya reflejadas en la
constitución v2.0.0 y en los requisitos de esta spec):

- Q: ¿TypeScript o JavaScript? → A: JavaScript; cero curva de aprendizaje nueva bajo este plazo.
- Q: ¿Qué resuelve el envío del formulario? → A: Resend más una Cloudflare Pages Function en
  `/functions/api/contact.js`; herramienta ya conocida por el propietario. `jddlabs.dev`
  verificado como dominio propio en Resend (no se reutiliza el de Cristalería Ruteña) y
  `RESEND_API_KEY` guardada como variable de entorno en Cloudflare Pages, nunca en el
  repositorio.
- Q: ¿Se incluye analítica? → A: Ninguna; Cloudflare Web Analytics se aparca a v2.
- Q: ¿Se escriben tests automatizados? → A: No para este lanzamiento (principio X).
- Q: ¿Entra la página de caso de estudio? → A: Opcional; es la primera tarea que se recorta si
  el calendario se tensa (US5, prioridad P4).

Preguntas planteadas y resueltas en esta sesión:

- Q: ¿En qué dominio se publica el sitio en producción? → A: `jddlabs.dev`, el mismo dominio ya
  verificado en Resend.
- Q: ¿Cómo navega el visitante entre las cinco secciones? → A: Cabecera fija con logo, enlaces a
  las secciones y CTA; en móvil, menú hamburguesa.
- Q: ¿Cómo se protege el buzón frente a envíos automatizados? → A: Campo trampa oculto, rechazo
  de envíos inmediatos y validación de longitudes en el servidor. Sin terceros ni captcha.
- Q: ¿Está resuelta la identificación fiscal del aviso legal? → A: Sí; el propietario facilitará
  nombre fiscal, NIF y domicilio al implementar las páginas legales. El lanzamiento del
  2026-09-21 incluye el formulario.
- Q: ¿Qué nivel de metadatos y datos estructurados lleva el sitio? → A: Metadatos básicos,
  Open Graph y datos estructurados de negocio local con ámbito en Rute.

### Corrección 2026-09-09

El propietario aportó el copy definitivo (`copy-portfolio.md`) y corrigió dos datos de
esta especificación:

- **Stack de Cristalería Ruteña**: el original decía "React, Vite, Tailwind, PHP,
  MySQL". Es incorrecto. El proyecto **no usa PHP ni MySQL**, y no tiene base de datos
  ni CMS. El stack real es React, Vite, Tailwind y Cloudflare (Pages Functions, R2 y
  Resend para el formulario). Lo que se publica es solo la forma corta,
  `React · Vite · Tailwind · Cloudflare`, por el principio 70/30. **Corregido el
  2026-09-11**: esa lista no se pinta en la tarjeta de la portada sino en la sección
  "Tecnología utilizada" de la página de caso (FR-004a), y el stack ampliado con Pages
  Functions, R2 y Resend no se publica en ninguna de las dos páginas.
- **Titular de Inicio**: pasa de "Desarrollo web para empresas" a "Desarrollo web para
  pymes y autónomos". El subtítulo no cambia.

## User Scenarios & Testing *(mandatory)*

Las historias se han reordenado por valor de negocio. Entre corchetes se indica la
numeración original del usuario para no perder la trazabilidad.

### User Story 1 - Entender la oferta y pedir presupuesto (Priority: P1) [historia 1]

Un responsable de una PYME de Rute llega al sitio desde una búsqueda o una
recomendación. En los primeros segundos debe entender que JdDLabs hace desarrollo web
para empresas, qué tipos de proyecto cubre, y encontrar una llamada a la acción evidente
para pedir presupuesto.

**Why this priority**: Sin esto el sitio no cumple su única función comercial. Es el
mínimo viable: una página que explique la oferta y lleve al contacto ya genera
oportunidades, aunque no tenga proyecto destacado ni sobre mí.

**Independent Test**: Se puede probar entero cargando la página en frío y midiendo si una
persona ajena al proyecto sabe decir, sin ayuda, qué se vende y dónde se pide presupuesto.

**Acceptance Scenarios**:

1. **Given** un visitante que abre la página por primera vez, **When** la página termina
   de cargar, **Then** ve el titular "Desarrollo web para pymes y autónomos", el subtítulo
   descriptivo y el botón "Solicitar presupuesto" sin necesidad de hacer scroll.
2. **Given** un visitante en la parte superior de la página, **When** pulsa "Solicitar
   presupuesto", **Then** la vista se desplaza suavemente hasta la sección de contacto.
3. **Given** un visitante que hace scroll, **When** llega a la sección de servicios,
   **Then** ve tres tarjetas diferenciadas (Web corporativa, Tiendas online,
   Aplicaciones y soluciones web) con su descripción.
4. **Given** un visitante en cualquier punto de la página, **When** mira la parte superior,
   **Then** sigue viendo la cabecera con el logo, los enlaces de sección y la llamada a la
   acción.
5. **Given** un visitante en móvil con el menú desplegable abierto, **When** activa un enlace
   de sección, **Then** el menú se cierra y la vista se desplaza hasta esa sección con su
   encabezado visible.

---

### User Story 2 - Contactar por el canal preferido (Priority: P1) [historia 4]

El visitante decide dar el paso y quiere elegir cómo: unos prefieren WhatsApp, otros
llamar por teléfono, otros escribir un email y otros dejar un formulario y olvidarse.

**Why this priority**: Es la conversión. Un visitante convencido que no encuentra su canal
preferido se pierde. Junto con la historia 1 forma el par mínimo que justifica publicar.

**Independent Test**: Se prueba de forma aislada abriendo la sección de contacto y
ejercitando los cuatro canales: los tres directos deben abrir su aplicación
correspondiente y el formulario debe completar un envío válido y rechazar uno inválido.

**Acceptance Scenarios**:

1. **Given** un visitante en la sección de contacto, **When** pulsa el canal de WhatsApp,
   **Then** se abre una conversación con el número real de JdDLabs.
2. **Given** un visitante en la sección de contacto, **When** pulsa el teléfono desde un
   móvil, **Then** el dispositivo ofrece iniciar la llamada.
3. **Given** un visitante que ha rellenado todos los campos obligatorios con un email en
   formato válido, **When** envía el formulario, **Then** ve un mensaje de confirmación
   sin que la página se recargue.
4. **Given** un visitante que deja un campo obligatorio vacío o escribe un email inválido,
   **When** intenta enviar, **Then** ve un mensaje de error específico junto al campo
   afectado y conserva lo que ya había escrito en el resto de campos.
5. **Given** un visitante que ha rellenado bien todos los campos pero no ha marcado la casilla
   de consentimiento, **When** intenta enviar, **Then** el envío no se produce y ve un aviso
   que explica que debe aceptar el tratamiento de sus datos para continuar.

---

### User Story 3 - Evaluar la calidad con un proyecto real (Priority: P2) [historia 2]

El visitante quiere pruebas antes de contactar. Necesita ver un trabajo terminado, real y
visitable, no una maqueta.

**Why this priority**: Eleva mucho la credibilidad, pero el sitio convierte sin ello. Va
después de las dos historias P1.

**Independent Test**: Se prueba abriendo la sección de proyecto destacado y comprobando
que el enlace "Visitar en vivo" abre cristaleriarutena.es en una pestaña nueva.

**Acceptance Scenarios**:

1. **Given** un visitante en la sección de proyecto destacado, **When** la lee, **Then**
   ve una tarjeta con la imagen de portada del sitio del cliente, el título del proyecto,
   una línea de contexto y los dos enlaces "Visitar en vivo" y "Ver caso de estudio", sin
   lista de tecnologías ni firma de autoría dentro de la tarjeta.
2. **Given** un visitante que quiere saber con qué está construido el proyecto o quién lo
   firma, **When** pulsa "Ver caso de estudio", **Then** encuentra las tecnologías en la
   sección "Tecnología utilizada" y la autoría en el campo "Rol" del bloque de datos del
   cliente, y no las ha visto antes en la tarjeta.
3. **Given** un visitante interesado en el proyecto, **When** pulsa "Visitar en vivo",
   **Then** se abre https://cristaleriarutena.es en una pestaña nueva sin perder el
   portfolio.
4. **Given** que no existe un testimonio verificado del cliente en el momento de
   implementar, **When** se publica la sección, **Then** no aparece ningún bloque de
   testimonio, ni vacío ni con texto de relleno.

---

### User Story 4 - Saber quién está detrás (Priority: P3) [historia 3]

El visitante quiere saber si trata con una agencia anónima o con una persona concreta
antes de dar su teléfono.

**Why this priority**: Refuerza la confianza y diferencia frente a agencias, pero es
prescindible si el plazo aprieta.

**Independent Test**: Se prueba de forma aislada leyendo la sección Sobre mí y verificando
que identifica a la persona y su ámbito geográfico de trabajo.

**Acceptance Scenarios**:

1. **Given** un visitante que hace scroll hasta Sobre mí, **When** la lee, **Then**
   entiende que hay una persona concreta detrás, que trabaja desde Rute y que atiende a
   empresas de la localidad y alrededores.

---

### User Story 5 - Ver el caso de estudio ampliado (Priority: P4) [historia 5]

El visitante especialmente interesado en el proyecto destacado quiere más detalle: el
problema de partida, el enfoque y el resultado.

**Why this priority**: Nació marcada como opcional y **dejó de serlo el 2026-09-10**, por
decisión del propietario. Desde que la portada se quedó en formato tarjeta, esta página es
el único sitio donde se leen la descripción larga, el stack y la autoría: recortarla
incumpliría FR-004a y FR-004b. Ya no es candidata a recorte si peligra el 2026-09-21.

**Independent Test**: Se prueba abriendo la página de caso desde el proyecto destacado y
comprobando que se puede volver al portfolio.

**Acceptance Scenarios**:

1. **Given** un visitante en la sección de proyecto destacado, **When** pulsa el enlace al
   caso de estudio, **Then** llega a una página dedicada con más detalle del proyecto y un
   camino claro de vuelta al portfolio.
2. **Given** un visitante en la página de caso, **When** la recorre de arriba abajo,
   **Then** ve una sola imagen de apertura y, debajo, solo texto: datos del cliente, reto,
   solución, highlights y "Tecnología utilizada". No hay galería de capturas; para ver el
   sitio real está el enlace "Visitar en vivo".
3. **Given** un visitante en la página de caso, **When** lee el bloque de datos del
   cliente, **Then** encuentra la autoría en el campo "Rol" y no una firma suelta al pie.

---

### Edge Cases

- **Fallo del envío del formulario** (sin conexión, servicio de destino caído o
  respondiendo con error): el visitante debe ver un mensaje que distinga claramente el
  fallo del éxito, conservar lo escrito y disponer de una alternativa visible (WhatsApp,
  teléfono o email) para no perder el contacto.
- **Doble envío**: si el visitante pulsa enviar dos veces seguidas, no debe generarse un
  segundo mensaje duplicado.
- **JavaScript no disponible o script que falla al cargar**: los tres canales directos
  (teléfono, WhatsApp, email) deben seguir siendo utilizables aunque el formulario no
  funcione.
- **Preferencia de movimiento reducido activada**: no se ejecuta ninguna animación de
  aparición; el contenido se muestra directamente en su estado final, nunca invisible.
- **Ruta inexistente**: el visitante ve una página 404 sencilla con un enlace de vuelta al
  inicio, no un error del servidor ni una página en blanco.
- **Imagen del proyecto que no carga**: el hueco debe mostrar el texto alternativo
  descriptivo, sin romper el layout de la sección.
- **Sitio externo del cliente caído**: el enlace "Visitar en vivo" puede fallar por causas
  ajenas; no debe bloquear ni degradar ninguna otra parte del portfolio.
- **Pantallas muy estrechas (320px)**: el contenido se lee en una sola columna sin scroll
  horizontal ni texto cortado.
- **Menú desplegable abierto y giro de pantalla a horizontal**: al pasar del layout móvil al de
  escritorio el menú no debe quedar abierto y superpuesto sobre el contenido.
- **Ancla tapada por la cabecera fija**: al saltar a una sección, su encabezado debe quedar
  visible por debajo de la cabecera, no oculto tras ella.
- **Casilla de consentimiento sin marcar**: el envío queda bloqueado con un aviso claro; el
  visitante conserva todo lo escrito y puede recurrir a un canal directo si prefiere no aceptar.
- **Envío automatizado (spam de bots)**: el buzón de destino no debe quedar inutilizable por
  envíos automáticos. El campo trampa nunca debe ser perceptible ni enfocable por un visitante
  real, ni por lector de pantalla ni con el tabulador: un humano jamás debe poder rellenarlo y
  quedar descartado sin saberlo.
- **Visitante lento que tarda en escribir**: el intervalo mínimo antes de aceptar un envío solo
  descarta respuestas inmediatas; nunca debe penalizar a quien se toma su tiempo.

## Requirements *(mandatory)*

### Functional Requirements

**Estructura y contenido**

- **FR-001**: EL SISTEMA mostrará las cinco secciones (Inicio, Proyecto destacado,
  Servicios, Sobre mí, Contacto) en una sola página y en ese orden.
- **FR-002**: EL SISTEMA mostrará en Inicio el titular "Desarrollo web para pymes y autónomos", el
  subtítulo "Diseño y desarrollo de páginas web modernas, rápidas y adaptadas a las
  necesidades de cada negocio." y la llamada a la acción "Solicitar presupuesto", con ese
  texto exacto.
- **FR-003**: EL SISTEMA mostrará en Servicios exactamente tres tarjetas —Web corporativa,
  Tiendas online, Aplicaciones y soluciones web— cada una con su descripción cerrada.
- **FR-004**: EL SISTEMA mostrará en Proyecto destacado una tarjeta con cuatro elementos
  y solo esos cuatro: la imagen de portada del sitio del cliente, el título del proyecto,
  una línea de contexto y los dos enlaces "Visitar en vivo" y "Ver caso de estudio". La
  tarjeta **no** muestra la lista de tecnologías ni ninguna firma de autoría.
- **FR-004a**: EL SISTEMA mostrará la lista de tecnologías (React, Vite, Tailwind,
  Cloudflare) en la página de caso de estudio, en una sección propia titulada "Tecnología
  utilizada", y en ningún otro punto del sitio.
- **FR-004b**: EL SISTEMA mostrará la autoría del proyecto en la página de caso de
  estudio, como el campo "Rol" del bloque de datos del cliente, con el valor "Diseño y
  desarrollo completo — Juan de Dios Pérez Moreno". No existe una firma suelta al pie de
  ninguna de las dos páginas.
- **FR-005**: EL SISTEMA mostrará en Sobre mí el texto cerrado que identifica a la persona
  y su ámbito de trabajo desde Rute.
- **FR-006**: EL SISTEMA mostrará en Contacto el texto cerrado de invitación y los cuatro
  canales: teléfono, WhatsApp, email y formulario.
- **FR-007**: EL SISTEMA no mostrará ningún texto de relleno, dato numérico o testimonio
  que no haya sido verificado explícitamente por el propietario en el momento de
  implementar la tarea correspondiente.

**Navegación e interacción**

- **FR-008**: CUANDO el visitante active "Solicitar presupuesto", EL SISTEMA desplazará la
  vista suavemente hasta la sección de contacto.
- **FR-009**: CUANDO el visitante active "Visitar en vivo", EL SISTEMA abrirá
  https://cristaleriarutena.es en una pestaña nueva sin cerrar ni recargar el portfolio.
- **FR-009a**: EL SISTEMA mostrará una cabecera fija, visible en todo momento durante el
  scroll, con el logo de JdDLabs, enlaces a las cinco secciones y la llamada a la acción
  "Solicitar presupuesto".
- **FR-009b**: CUANDO el visitante active un enlace de la cabecera, EL SISTEMA desplazará la
  vista hasta la sección correspondiente, dejándola completamente visible y sin que la cabecera
  fija tape su encabezado.
- **FR-009c**: MIENTRAS el ancho de pantalla sea inferior a 768px, EL SISTEMA presentará los
  enlaces de sección dentro de un menú desplegable accionado por un botón de menú.
- **FR-009d**: EL SISTEMA anunciará el estado abierto o cerrado del menú desplegable a las
  tecnologías de asistencia, mantendrá el foco dentro del menú mientras esté abierto y lo
  devolverá al botón de menú al cerrarlo.
- **FR-009e**: CUANDO el visitante active un enlace del menú desplegable o pulse la tecla de
  escape, EL SISTEMA cerrará el menú.
- **FR-010**: CUANDO una sección entre en el área visible durante el scroll, EL SISTEMA
  aplicará una transición breve de aparición.
- **FR-011**: MIENTRAS el visitante tenga activada la preferencia de movimiento reducido
  del sistema operativo, EL SISTEMA no ejecutará ninguna animación y mostrará todo el
  contenido en su estado final.
- **FR-012**: MIENTRAS el ancho de la pantalla sea inferior a 768px, EL SISTEMA
  reorganizará el layout a una sola columna.
- **FR-013**: EL SISTEMA permitirá recorrer y activar por teclado todos los elementos
  interactivos, con el foco siempre visible.
- **FR-014**: SI el visitante accede a una ruta inexistente, ENTONCES EL SISTEMA mostrará
  una página 404 sencilla con un enlace de vuelta al inicio.

**Formulario de contacto**

- **FR-015**: CUANDO el visitante envíe el formulario con todos los campos obligatorios
  completos y el email en formato válido, EL SISTEMA mostrará un mensaje de confirmación
  sin recargar la página.
- **FR-016**: SI el visitante envía el formulario con campos obligatorios vacíos o con el
  email en formato inválido, ENTONCES EL SISTEMA mostrará un mensaje de error específico
  junto al campo afectado y conservará los datos ya introducidos en los demás campos.
- **FR-017**: SI el envío falla por un problema de red o del destinatario, ENTONCES EL
  SISTEMA mostrará un mensaje de error distinguible del de éxito, conservará lo escrito y
  ofrecerá al menos un canal directo alternativo.
- **FR-018**: EL SISTEMA impedirá que una segunda pulsación del botón de envío genere un
  mensaje duplicado mientras el primero está en curso.
- **FR-019**: EL SISTEMA entregará cada mensaje enviado al buzón de correo del propietario,
  incluyendo los datos introducidos por el visitante y una dirección de respuesta utilizable.
- **FR-019a**: EL SISTEMA no expondrá en el cliente ninguna credencial del servicio de envío:
  el visitante nunca debe poder extraerlas del código descargado.
- **FR-020**: EL SISTEMA incluirá en el formulario un campo trampa oculto a la vista y para las
  tecnologías de asistencia; SI ese campo llega relleno, ENTONCES EL SISTEMA descartará el envío
  sin entregarlo al buzón.
- **FR-020a**: SI un envío llega antes de que haya transcurrido un intervalo mínimo desde que el
  formulario se mostró, ENTONCES EL SISTEMA lo descartará por considerarlo automatizado.
- **FR-020b**: EL SISTEMA validará en el servidor la presencia, el formato y la longitud máxima
  de cada campo antes de entregar el mensaje, y rechazará el envío que no los cumpla.
- **FR-020c**: EL SISTEMA no empleará ningún captcha ni widget de verificación de terceros que
  añada fricción al visitante o transfiera sus datos sin consentimiento.
- **FR-020d**: CUANDO EL SISTEMA descarte un envío por sospecha de automatización, no revelará
  al remitente el motivo del descarte.

**Cumplimiento legal y privacidad**

- **FR-021**: EL SISTEMA exigirá que el visitante marque una casilla de consentimiento
  explícito, no premarcada, antes de permitir el envío del formulario.
- **FR-021a**: SI el visitante intenta enviar sin haber marcado el consentimiento, ENTONCES EL
  SISTEMA bloqueará el envío y mostrará un aviso que explique el motivo, conservando lo escrito.
- **FR-021b**: EL SISTEMA ofrecerá una política de privacidad y un aviso legal accesibles desde
  el pie de todas las páginas, que identifiquen al responsable, la finalidad del tratamiento,
  los destinatarios de los datos y los derechos del interesado, con el modo de ejercerlos.
- **FR-021c**: EL SISTEMA enlazará la política de privacidad desde el propio formulario, junto
  a la casilla de consentimiento, para que el visitante pueda leerla antes de aceptar.
- **FR-021d**: EL SISTEMA se publicará bajo el dominio `jddlabs.dev`, y las URLs canónicas de
  todas sus páginas apuntarán a ese dominio.
- **FR-022**: EL SISTEMA no realizará ninguna petición a dominios de Google Fonts ni
  cargará recursos de terceros que transfieran la IP del visitante sin su consentimiento.

**Descubrimiento y compartición**

- **FR-022a**: EL SISTEMA publicará en cada página un título y una descripción propios y
  descriptivos, y una URL canónica bajo `jddlabs.dev`.
- **FR-022b**: CUANDO alguien comparta el enlace del sitio en una aplicación de mensajería o
  red social, EL SISTEMA ofrecerá una previsualización con título, descripción e imagen.
- **FR-022c**: EL SISTEMA publicará datos estructurados de negocio local que identifiquen a
  JdDLabs, su ámbito geográfico en Rute y provincia de Córdoba, y sus canales de contacto,
  coherentes con los datos del aviso legal.
- **FR-022d**: EL SISTEMA declarará el idioma español en todas sus páginas.

**Rendimiento**

- **FR-023**: EL SISTEMA cargará de forma perezosa la imagen del proyecto destacado en la
  tarjeta de la portada. La misma imagen, cuando abre la página de caso, cae por encima
  del pliegue y es su elemento de mayor superficie: allí se carga con prioridad alta y
  nunca de forma perezosa.
- **FR-024**: EL SISTEMA mostrará un texto alternativo descriptivo para cada imagen con
  contenido informativo.

**Datos de contacto**

- **FR-025**: EL SISTEMA usará como canales directos el teléfono `+34 666 67 78 38`, el mismo
  número para WhatsApp, y la dirección de correo `hola@jddlabs.dev`. Estos son los valores
  verificados por el propietario y no se sustituyen por ningún otro ni por un placeholder.

### Key Entities

- **Mensaje de contacto**: lo que un visitante envía por el formulario. Atributos:
  nombre, email, teléfono (opcional), texto del mensaje, marca temporal y aceptación explícita
  del tratamiento de datos. No se almacena en el sitio: se entrega a un destinatario y el sitio
  no conserva copia.
- **Servicio**: cada una de las tres ofertas presentadas. Atributos: título y descripción.
  Conjunto cerrado y estático.
- **Proyecto destacado**: el trabajo real que se exhibe. Atributos: nombre del cliente,
  línea de contexto y descripción larga, industria, rol (que es donde se lee la autoría),
  lista de tecnologías, una única imagen de portada y enlace al sitio en vivo. Los
  atributos se reparten entre dos superficies: la tarjeta de la portada muestra imagen,
  título, contexto y enlaces; el resto solo se lee en la página de caso.
- **Testimonio** *(condicional)*: cita verificada del cliente. Solo existe como entidad si
  el propietario la ha verificado; en caso contrario no se representa de ninguna forma.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Tres personas ajenas al proyecto, tras cinco segundos viendo la página en
  frío, saben decir qué ofrece JdDLabs y dónde se pide presupuesto.
- **SC-002**: Desde la llegada a la página, un visitante alcanza un canal de contacto
  directo en dos interacciones o menos.
- **SC-003**: Lighthouse puntúa 90 o más en Performance, Accessibility, Best Practices y
  SEO, tanto en desktop como en móvil.
- **SC-003a**: Al compartir la dirección del sitio en WhatsApp se muestra una tarjeta con
  título, descripción e imagen, no un enlace desnudo.
- **SC-003b**: Los datos estructurados del sitio se validan sin errores en una herramienta de
  comprobación de resultados enriquecidos.
- **SC-004**: El formulario se ha probado con al menos un envío válido confirmado y al
  menos un caso de error mostrando el mensaje junto al campo afectado.
- **SC-004a**: Un envío legítimo completado con lector de pantalla y solo teclado llega al buzón
  sin ser descartado por la protección anti-spam.
- **SC-005**: El 100 % de los datos, cifras y citas publicados están verificados por el
  propietario; ninguna afirmación sin verificar llega a producción.
- **SC-006**: La página se lee sin scroll horizontal ni texto cortado desde 320px de ancho
  hasta escritorio.
- **SC-007**: El recorrido completo —abrir y cerrar el menú móvil, saltar a cada sección y
  enviar el formulario— se puede completar solo con teclado, con el foco visible en todo
  momento y sin quedar atrapado.
- **SC-008**: La revisión se ha hecho en un dispositivo móvil real, no solo en el
  emulador del navegador.
- **SC-009**: El sitio está publicado y accesible en `https://jddlabs.dev` el 2026-09-21.

## Assumptions

- El copy de las cinco secciones está cerrado y no se renegocia durante la
  implementación; solo se ajusta si el propietario lo pide de forma explícita.
- La línea alternativa de Sobre mí ("La misma persona que atenderá tu llamada, diseñará tu
  proyecto y escribirá cada línea de código.") se incorpora como refuerzo del texto
  principal, salvo que el propietario indique lo contrario al implementar esa sección.
- Los campos obligatorios del formulario son nombre, email y mensaje; el teléfono es
  opcional. No se ha especificado otra cosa y es el patrón estándar del sector.
- El sitio se publica en español, para público de Rute y alrededores; no se contempla
  versión en otro idioma.
- La imagen del proyecto destacado se obtiene del sitio real ya publicado del cliente, que
  está en producción y es accesible. Es un recorte de su portada exportado a las
  dimensiones en que se muestra, no una captura de página completa reencuadrada por CSS.
- El visitante tipo llega desde móvil con conexión móvil variable: móvil es el escenario
  principal de diseño y de medición, no un caso derivado.
- No se guarda ningún registro de los mensajes dentro del sitio: el sitio es estático y el
  mensaje viaja a un destinatario externo.
- La página 404 usa el mismo lenguaje visual que el resto del sitio y no requiere copy
  adicional aprobado.
- El envío del formulario se resuelve con una función serverless de Cloudflare Pages Functions
  que llama a Resend, según el principio I de la constitución v2.0.0. Es la única función
  serverless del proyecto y no existe base de datos.
- El sitio y el correo remitente comparten el dominio `jddlabs.dev`, ya que la recuperación de
  `jddlabs.com` está fuera de alcance. Los DNS de `jddlabs.dev` deben apuntar a Cloudflare Pages
  antes de la fecha de publicación.
- La política de privacidad nombra a Cloudflare y Resend como encargados del tratamiento.
- Los datos estructurados de negocio local reutilizan el domicilio y la denominación que se
  publiquen en el aviso legal, para no mantener dos versiones del mismo dato.
- Los mensajes del formulario se entregan a `hola@jddlabs.dev`, la misma dirección publicada
  como canal directo.

## Out of Scope

Explícitamente fuera de este lanzamiento, por decisión del propietario:

- Modo oscuro completo del sitio.
- Galería con más de un proyecto.
- Sección de Automatización e IA.
- Animaciones de scroll complejas (tipo GSAP).
- Recuperación del dominio jddlabs.com.
- Cloudflare Web Analytics y cualquier otra analítica (principio IX de la constitución).
- Suite de tests automatizada (principio X de la constitución).

Las páginas legales (política de privacidad y aviso legal) **sí entran** en alcance: son
requisito del principio XII y condición para publicar el formulario.

## Dependencies

- Fichero del logo `JdDLogo_marca.svg` disponible antes de implementar la cabecera.
- Ficheros `.woff2` de Fraunces disponibles para auto-alojarlos (principio II).
- Imagen de portada del sitio de Cristalería Ruteña, recortada a la proporción en que se muestra.
- Datos de contacto reales del propietario (ver Q3).
- Repositorio Git y proyecto de Cloudflare Pages conectado, para el despliegue automático
  exigido por el principio VIII.
- Cuenta de Resend con el dominio `jddlabs.dev` **ya verificado** (confirmado el 2026-09-08) y
  la clave `RESEND_API_KEY` guardada como variable de entorno del proyecto de Cloudflare Pages,
  nunca en el repositorio.
- **Datos identificativos para el aviso legal**: nombre fiscal, NIF y domicilio del prestador,
  exigidos por el artículo 10 de la LSSI. El propietario confirma que existen y los facilitará
  al implementar las páginas legales. El principio V prohíbe inventarlos o dejar un placeholder,
  de modo que la tarea de redactar el aviso legal no se cierra sin ellos, y el formulario no se
  publica sin aviso legal.
