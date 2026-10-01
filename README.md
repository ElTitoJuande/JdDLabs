# JdDLabs

Portfolio React + Vite con páginas estáticas prerenderizadas. Componentes compartidos de cabecera, menú móvil, botones y footer; caso de estudio de Cristalería Ruteña y mapa responsive de tecnologías.

## Desarrollo

Node 22.12 o posterior. Ejecutar npm ci y npm run dev.

## Verificación y publicación

- npm test: ocho pruebas del formulario (validación, XSS, inyección de cabeceras, origen, tamaño y proveedor simulado). No envía correos reales.
- npm run build: compila y prerenderiza las cinco páginas en dist; genera los hashes CSP de los datos estructurados.
- npm audit: auditoría de dependencias.

Publicar dist en Cloudflare Pages con functions. Usar npm run build, no solamente vite build. .node-version fija la familia Node 22 para el entorno de compilación.

Verificado en navegador entre 320 y 1440 px: imágenes, ausencia de overflow, menú y foco, navegación entre páginas, scroll, movimiento reducido y envío simulado. Comprobado el HTML sin JavaScript y la hidratación con CSP.

## Contacto

Configurar RESEND_API_KEY como secreto de Pages Functions; admite RESEND_FROM y RESEND_TO. Vite no ejecuta esas funciones. No se usa Turnstile. El formulario conserva los datos ante un fallo y ofrece correo directo.

La API limita el cuerpo a 16 KiB, exige JSON y origen propio, valida campos y consentimiento, escapa HTML y limita el tiempo de respuesta del proveedor. Honeypot y tiempo de envío reducen spam, pero no sustituyen un límite de solicitudes en Cloudflare. Detalles en docs/security-deployment.md.

La entrega real y las cabeceras de producción deben verificarse tras desplegar. No publicar el servidor de desarrollo.

## Contenido

- src/content/copy.js: textos y tecnologías.
- src/content/identity.js: identidad y correo.
- src/styles/index.css: diseño responsive.
- La escena de escritorio es una imagen ilustrativa generada. El logo y la fotografía de Cristalería son los originales del proyecto.
- specs/ conserva especificaciones históricas, anteriores a esta revisión visual.
