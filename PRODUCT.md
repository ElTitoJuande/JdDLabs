# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños de pymes y autónomos de Rute (Córdoba) y alrededores, poco técnicos. Llegan por boca a boca, Instagram o búsqueda local en Google, normalmente desde el móvil. Quieren saber rápido quién hay detrás, qué puede hacer por su negocio y cómo pedir presupuesto sin compromiso.

## Product Purpose

Portfolio de captación de JdDLabs, la marca de Juan de Dios Pérez Moreno, desarrollador web independiente. Existe para convertir visitas locales en solicitudes de presupuesto. Éxito: el visitante escribe por el formulario o el correo.

## Positioning

- **Una sola persona, de principio a fin.** Quien atiende la llamada es quien diseña y escribe cada línea de código; no hay intermediarios.
- **Cercanía local.** Trabaja desde Rute, con negocios del pueblo y la comarca, y puede ir en persona.
- **A medida, no plantillas.** Cada web se diseña y programa para ese negocio, sin plantillas genéricas («Tu negocio merece una web que venda, no una plantilla más»).
- **Mantenimiento continuo.** La relación no termina en la entrega: sigue ocupándose de la web después.

## Operating Context

- Oferta actual: web corporativa, tiendas online y aplicaciones/soluciones web (paneles de gestión, reservas, integraciones).
- Vías de contacto en la web: formulario (Cloudflare Pages Functions + Resend) y correo `hola@jddlabs.dev`.
- Páginas: portada, caso de estudio de Cristalería Ruteña, aviso legal, privacidad y 404.

## Capabilities and Constraints

- La constitución del proyecto (`.specify/memory/constitution.md`) es la autoridad sobre stack, rendimiento, accesibilidad, RGPD y datos verificados; este fichero no la repite.
- **Sistema visual: manda la web publicada, no la constitución.** El rediseño de `a5ca955` (Inter y Roboto, superficie clara con bandas oscuras, «Labs» en acento) contradecía la constitución 3.5.0. El propietario decidió el 2026-10-02 que la web actual es la buena: la tipografía ya está enmendada (3.6.0, Inter + Roboto); paleta y wordmark siguen pendientes de enmienda.
- Teléfono y WhatsApp existen (constitución), pero **de momento no se muestran en la web** (decisión del propietario, 2026-10-02).
- Todo el contenido del sitio, en español.
- Principio 70/30: la portada no usa jerga técnica; la profundidad técnica vive en el caso de estudio.
- **Automatizaciones: decisión abierta.** Es un posible servicio futuro, sin fecha. Hasta que el propietario diga lo contrario, la web no menciona automatizaciones, n8n ni flujos automatizados (decidido el 2026-10-02).

## Brand Commitments

- Nombre comercial JdDLabs; monograma `JdDLogo_marca.svg` siempre en blanco o negro puro, sin recolorear.
- Voz: tuteo, cercana y directa, sin tecnicismos en la capa principal. Ejemplo canónico: «De lo técnico me encargo yo; tú, de lo tuyo.»
- Todo el copy visible sale de `src/content/copy.js`, aprobado por el propietario; no se improvisa texto.

## Evidence on Hand

- Un proyecto publicable: Cristalería Ruteña (cristaleriarutena.es), 2026, 6-8 semanas, con caso de estudio completo. Imágenes en `public/img/` (fachada, capturas de escritorio y móvil).
- Foto real del propietario: `public/img/juan-de-dios-polo.webp`.
- **No existen** testimonios, cifras de resultado, métricas de analítica ni logos de otros clientes. No se inventan ni se sugieren con placeholders (principio V de la constitución).

## Product Principles

1. Pedir presupuesto debe costar lo mínimo, sobre todo desde el móvil.
2. Mostrar a la persona: la confianza nace de ver quién hace el trabajo.
3. Solo lo verificable. Un bloque sin dato real se omite entero.
4. Hablar el idioma del negocio, no el del desarrollador.
5. Ofrecer solo lo que hoy se vende; lo futuro no se anuncia.

## Accessibility & Inclusion

WCAG 2.x AA: contraste mínimo, teclado y foco visible, `prefers-reduced-motion`. Lighthouse ≥ 90 en las cuatro categorías, desktop y móvil.
