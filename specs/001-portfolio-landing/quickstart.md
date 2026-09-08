# Phase 1 — Quickstart: validación del Portfolio JdDLabs

**Fecha**: 2026-09-08 | **Plan**: [plan.md](./plan.md)

No hay suite de tests automatizada (principio X). Esta es, por tanto, **la** red de seguridad
del proyecto: los escenarios que hay que ejecutar a mano antes de dar una tarea por cerrada.

---

## Prerrequisitos

| Requisito | Estado |
|---|---|
| Node.js 20 LTS | — |
| Repositorio en GitHub conectado a Cloudflare Pages | Pendiente de crear |
| Dominio `jddlabs.dev` activo en Cloudflare | Confirmado |
| Dominio `jddlabs.dev` verificado como remitente en Resend | Confirmado el 2026-09-08 |
| `RESEND_API_KEY` en las variables de entorno de Cloudflare Pages | Pendiente |
| `JdDLogo_marca.svg` y capturas de Cristalería Ruteña | Pendientes de aportar |
| Razón social, NIF y domicilio | Confirmados el 2026-09-08 en `constitution.md` |

---

## Puesta en marcha

```bash
npm install
npm run dev          # Vite en local: la Function NO se ejecuta aquí
npm run build        # debe terminar sin errores ni warnings nuevos
npm run preview      # sirve dist/ para revisar el resultado del build
```

Para ejercitar el formulario de verdad hace falta el runtime de Cloudflare, porque
`functions/api/contact.js` no corre bajo el servidor de desarrollo de Vite:

```bash
npx wrangler pages dev dist --binding RESEND_API_KEY=<clave de pruebas>
```

**Configuración de Cloudflare Pages**: build `npm run build`, directorio de salida `dist`,
auto-deploy desde `main`.

---

## Escenarios de validación

Cada escenario cita el criterio de la spec que cierra.

### V-1 · Estructura y navegación (US1, FR-001 a FR-009b)

1. Abrir la página en frío: se ven titular, subtítulo y llamada a la acción sin hacer scroll.
2. Bajar hasta el final: las cinco secciones aparecen en el orden de FR-001.
3. La cabecera sigue visible en todo momento, con logo, enlaces y llamada a la acción.
4. Pulsar cada enlace de la cabecera: la sección queda visible **con su encabezado por debajo de
   la cabecera fija, no tapado**. Cierra el caso límite del ancla.
5. Pulsar "Solicitar presupuesto": desplazamiento suave hasta Contacto (FR-008).

### V-2 · Menú móvil accesible (FR-009c a FR-009e, SC-007)

Con el navegador a menos de 768px de ancho, **solo con teclado**:

1. Tabular hasta el botón de menú y activarlo con Intro.
2. Comprobar con el inspector que `aria-expanded` pasa de `false` a `true`.
3. Tabular por todo el panel: el foco **no debe escaparse** al contenido de detrás.
4. Pulsar Escape: el menú se cierra y el foco vuelve al botón de menú.
5. Reabrir y activar un enlace: el menú se cierra y salta a la sección.
6. Con el menú abierto, ensanchar la ventana por encima de 768px: **el menú se cierra solo**.
   Cierra el caso límite del giro de pantalla.

### V-3 · Formulario, camino feliz (US2, FR-015)

1. Rellenar nombre, email válido y mensaje; marcar el consentimiento.
2. Esperar más de 3 segundos desde que cargó la página antes de enviar.
3. Enviar: aparece la confirmación **sin recarga** y llega el correo a `hola@jddlabs.dev`.
4. Responder a ese correo: la respuesta debe ir al visitante, no a uno mismo (R-010).

### V-4 · Formulario, caminos de error (FR-016 a FR-018, FR-021a)

1. Enviar con el nombre vacío → error junto a ese campo, el resto de lo escrito se conserva.
2. Enviar con email inválido → error junto al email.
3. Enviar sin marcar el consentimiento → envío bloqueado con aviso explicativo.
4. Pulsar enviar dos veces seguidas → llega **un solo** correo.
5. Con el modo sin conexión del navegador, enviar → mensaje de error distinguible del de éxito,
   datos conservados y canal alternativo visible.

### V-5 · Anti-spam sin daños colaterales (SC-004a) — **no omitir**

1. Rellenar y enviar el formulario **usando solo teclado y con un lector de pantalla activo**,
   sin tocar el ratón.
2. El correo debe llegar. Si no llega, el campo trampa o el umbral temporal están expulsando a
   usuarios legítimos, y eso ocurre en silencio: nadie se enteraría en producción.
3. Comprobar que el lector de pantalla **nunca menciona** el campo trampa y que el tabulador no
   pasa por él.
4. Enviar por consola una petición con `website` relleno → responde `200` y no llega correo.
5. Enviar una petición con `ts` de hace un segundo → responde `200` y no llega correo.

### V-6 · Legal y privacidad (FR-021b, FR-021c, principio XII)

1. Los enlaces a Aviso Legal y Política de Privacidad están en el pie de **todas** las páginas.
2. La política se enlaza también junto a la casilla del formulario.
3. La política nombra a Cloudflare y a Resend como encargados del tratamiento.
4. El domicilio del Aviso Legal coincide **carácter a carácter** con el del JSON-LD y con el de
   `constitution.md`.

### V-7 · Rendimiento y SEO (SC-003, SC-003a, SC-003b)

1. Lighthouse en modo móvil **y** en escritorio sobre la URL publicada: 90 o más en las cuatro
   categorías. Es la puerta del principio VI.
2. Pestaña Red: **cero** peticiones a `fonts.googleapis.com` o `fonts.gstatic.com` (principio II).
3. Pegar la dirección del sitio en un chat de WhatsApp: debe salir tarjeta con título,
   descripción e imagen.
4. Validar el JSON-LD en una herramienta de resultados enriquecidos: sin errores.
5. Buscar `RESEND` en los ficheros de `dist/`: **ninguna** coincidencia con la clave. Puerta de
   calidad número 6 de la constitución.

### V-8 · Accesibilidad y responsive (FR-011 a FR-013, SC-006)

1. Activar la reducción de movimiento del sistema y recargar: ninguna animación, y **todo el
   contenido visible** — nada debe quedarse invisible esperando un observador que no corre.
2. A 320px de ancho: una sola columna, sin scroll horizontal ni texto cortado.
3. Recorrer la página entera con el tabulador: foco siempre visible, sin trampas.
4. Revisar en un **móvil real**, no solo en el emulador (SC-008).

### V-9 · Página 404 (FR-014)

1. Visitar una ruta inventada en el sitio publicado.
2. Aparece la 404 con enlace de vuelta al inicio, y el navegador recibe un código 404 real, no
   un 200.

---

## Criterio de salida

Ninguna tarea de UI se cierra sin las seis puertas de la constitución: build limpio, Lighthouse
≥ 90 en cuatro categorías y dos plataformas, repaso contra los criterios de aceptación, cero
peticiones a Google Fonts, todos los datos verificados y ninguna credencial en el bundle.

Sin Aviso Legal y Política de Privacidad publicados no debe publicarse el formulario
(principio XII). Con los datos fiscales ya confirmados, esa dependencia deja de ser un bloqueo y
pasa a ser un simple orden de tareas.
