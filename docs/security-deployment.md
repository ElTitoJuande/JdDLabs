# Seguridad y publicación

Ejecutar npm run build: genera HTML prerenderizado y hashes CSP. Publicar dist y functions.
Configurar RESEND_API_KEY como secreto en Cloudflare Pages Functions. No se requiere captcha.
El formulario valida origen, tipo de contenido, tamaño máximo de 16 KiB, campos y consentimiento. Escapa HTML, limita tiempo del proveedor y mantiene honeypot y tiempo de envío.
Estos filtros no impiden bots que repliquen peticiones legítimas. Configurar en Cloudflare una regla de rate limiting para POST /api/contact (p. ej. 5 solicitudes/minuto/IP). No se ha configurado esa regla desde el repositorio.
Tras publicar: comprobar CSP/HSTS, HTTPS y dominio canónico, respuestas 404 y correo con Resend real. No publicar el servidor de desarrollo.
