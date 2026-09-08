<!--
Sync Impact Report
- Cambio de versión: 1.0.0 → 2.0.0
- Motivo del MAJOR: el principio I se redefine. La sección Governance tipifica expresamente
  "cambiar el stack fijo del principio I" como enmienda MAJOR, y eso es lo que ocurre al
  admitir funciones serverless. En abstracto podría defenderse un MINOR, porque relajar una
  restricción no invalida artefactos previos; se aplica la regla tal como está escrita.
- Principios modificados: I. Stack fijo (antes prohibía cualquier servidor; ahora admite
  funciones serverless en Cloudflare Pages Functions, acotadas al envío del formulario de
  contacto vía Resend, sin base de datos ni backend persistente).
- Principios añadidos: XII. Transparencia legal y RGPD.
- Principios eliminados: ninguno.
- Secciones modificadas: "Referencia de tokens y assets" (nuevos bloques de servicios externos
  y datos de contacto canónicos); "Puertas de calidad y flujo de trabajo" (nueva comprobación
  de credenciales).
- Placeholders diferidos: ninguno.
- Templates dependientes: sin cambios; plan-template.md, spec-template.md y tasks-template.md
  leen esta constitución en tiempo de ejecución.

Historial
- 1.0.0 (2026-09-08): primera ratificación formal, once principios.
-->

# Constitución del Portfolio JdDLabs

## Core Principles

### I. Stack fijo

React + Vite + Tailwind CSS, en JavaScript. El frontend se sirve como assets estáticos: NO SE
DEBE introducir un framework meta (Next.js o equivalentes) ni React Router. El enrutado es el
multi-página nativo de Vite, declarando las entradas de build en `vite.config.js`.

Se admiten **funciones serverless puntuales** en Cloudflare Pages Functions, usadas
**únicamente** para el envío del formulario de contacto vía Resend. NO DEBE haber base de datos
ni backend persistente, ni ninguna otra función serverless con un propósito distinto de ese
envío. Cambiar cualquiera de estas piezas es una enmienda MAJOR de esta constitución.

Racional: un portfolio de una sola persona no necesita hidratación de servidor ni enrutado en
cliente, y cada capa añadida es peso de bundle que compite con el principio VI. La excepción
del formulario se acota de forma expresa para que no sea la grieta por la que acabe entrando un
backend completo.

### II. Fuentes auto-alojadas (RGPD, NO NEGOCIABLE)

Fraunces para titulares, servida como `.woff2` desde `/public/fonts`. Inter para el cuerpo, vía
el paquete `@fontsource/inter`. NO DEBE existir ninguna petición a `fonts.googleapis.com` ni a
`fonts.gstatic.com` en ninguna página publicada.

Racional: esa carga transfiere la IP del visitante a Google sin consentimiento previo y ha sido
sancionada por tribunales europeos. Es un riesgo legal, no una preferencia técnica.

### III. Paleta cerrada

Solo se usan los siete colores de la tabla de la sección "Referencia de tokens y assets". NO SE
DEBE añadir ningún color fuera de esa lista; la única excepción son las capturas de pantalla de
proyectos de cliente, que conservan sus colores originales. Los tokens viven en
`tailwind.config.js` como única fuente de verdad: quedan prohibidos los literales de color
sueltos en JSX, CSS o SVG inline.

### IV. Integridad del logo

El monograma `JdDLogo_marca.svg` se usa siempre en negro puro o en blanco puro. NO SE DEBE
recolorear el propio logo con el acento ni con ningún otro tono de la paleta.

### V. Cero datos inventados (NO NEGOCIABLE)

Ninguna métrica de resultado, testimonio o cifra de cliente entra en el sitio sin que el usuario
la haya verificado explícitamente en el momento de implementar esa tarea. Si no hay dato
verificado, el bloque se omite entero: NO SE DEBE rellenar con un placeholder que pueda leerse
como un dato real (ni "+40 % de visitas", ni nombres de cliente ficticios, ni estrellas de
valoración de ejemplo).

Racional: un dato inventado en un portfolio de captación es una afirmación comercial falsa
frente a negocios reales de Rute.

### VI. Rendimiento y puntuación Lighthouse

Lighthouse DEBE puntuar 90 o más en Performance, Accessibility, Best Practices y SEO, tanto en
desktop como en móvil, antes de dar por completada cualquier tarea de UI. Una tarea con
cualquiera de las cuatro categorías por debajo de 90 no está terminada, en ninguna de las dos
plataformas.

### VII. Accesibilidad

Todo texto DEBE cumplir el contraste mínimo AA (el acento sobre el fondo está verificado en
8,76:1, nivel AAA). Todo control interactivo DEBE ser alcanzable y operable por teclado, con
foco visible. Las animaciones de scroll DEBEN respetar `prefers-reduced-motion`.

### VIII. Despliegue automático

El despliegue es Cloudflare Pages conectado a un repositorio Git, con auto-deploy en cada push a
`main`. NO SE DEBEN usar comandos de despliegue manual: si el sitio en producción no se puede
reproducir desde `main`, el despliegue es inválido.

### IX. Sin analítica en el lanzamiento

En v1 no se instala ninguna herramienta de analítica. Cloudflare Web Analytics queda aparcado
para v2 y NO SE DEBE activar a medias por presión de plazo.

Racional: una analítica mal configurada añade superficie de cumplimiento RGPD sin aportar datos
fiables.

### X. Sin suite de tests automatizada

Al tratarse de un sitio estático de bajo riesgo, no se crea suite de tests. La puerta de calidad
es Lighthouse (principio VI) más la validación manual contra los criterios de aceptación de la
spec de cada feature. Añadir una suite de tests requiere enmienda MINOR.

### XI. Fecha límite dura: 2026-09-21

El sitio DEBE estar en producción el 21 de septiembre de 2026. Ante cualquier conflicto de
tiempo se recorta alcance —empezando por lo marcado como "opcional" en `tasks.md`— antes que
mover la fecha. Las puertas de calidad de los principios VI y VII no son recortables.

### XII. Transparencia legal y RGPD

El sitio DEBE publicar una política de privacidad y un aviso legal accesibles desde el pie de
todas las páginas. El formulario de contacto DEBE exigir el consentimiento explícito del
visitante antes de permitir el envío, e informar del responsable, la finalidad del tratamiento,
los destinatarios y los derechos del interesado. Todos los encargados del tratamiento
—Cloudflare y Resend— DEBEN aparecer nombrados en la política de privacidad. Las credenciales
de Resend NO DEBEN viajar nunca al cliente.

Racional: es el mismo criterio que motiva el principio II, aplicado esta vez a los datos que el
propio sitio recoge. Un formulario de contacto sin esta información incumple el RGPD (art. 13) y
la LSSI desde el primer mensaje recibido.

## Referencia de tokens y assets

Valores canónicos. Los principios los referencian en lugar de repetirlos.

| Rol | Valor |
|---|---|
| Fondo | `#FAF9F6` |
| Texto | `#1A1A18` |
| Banda oscura (solo hero) | `#15040D` |
| Acento | `#93002c` |
| Acento hover | `#780024` |
| Acento tenue (tags/badges) | `#f4e5e9` |
| Texto secundario | `#6B6B66` |

- **Titulares**: Fraunces, `.woff2` auto-alojado en `/public/fonts`.
- **Cuerpo**: Inter, vía `@fontsource/inter`.
- **Logo**: `JdDLogo_marca.svg`, en negro o blanco puro.
- **Entradas de build Vite**: `index.html` y, si se construyen, `caso-cristaleria.html`,
  `privacidad.html` y `aviso-legal.html`.

**Servicios externos** (los únicos admitidos; añadir otro es enmienda MINOR):

| Servicio | Uso |
|---|---|
| Cloudflare Pages | Hosting estático y auto-deploy desde `main` |
| Cloudflare Pages Functions | Endpoint del formulario de contacto, y nada más |
| Resend | Envío transaccional del mensaje del formulario |

**Datos de contacto canónicos** (verificados por el propietario; ninguna tarea debe adivinarlos
ni sustituirlos por un placeholder):

| Canal | Valor |
|---|---|
| Teléfono | `+34 666 67 78 38` |
| WhatsApp | `+34 666 67 78 38` |
| Domicilio | `Calle Francisco Salto 29, 1 Rute (Córdoba)` |
| Razón social | `Juan de Dios Pérez Moreno` |
| NIF | `50627812M` |
| Email | `hola@jddlabs.dev` |

## Puertas de calidad y flujo de trabajo

Definición de "hecho" para una tarea de UI. Se cumplen las cinco, en orden:

1. `npm run build` termina sin errores ni warnings nuevos.
2. Lighthouse ≥ 90 en las cuatro categorías, en desktop y en móvil.
3. Repaso manual contra los criterios de aceptación de la spec de la feature.
4. La pestaña Red no muestra ninguna petición a dominios de Google Fonts.
5. Todo dato mostrado está verificado por el usuario (principio V).
6. Ninguna credencial de Resend ni de ningún otro servicio aparece en el bundle del cliente ni
   en el repositorio: el bundle publicado se inspecciona para confirmarlo.

Reglas de proceso:

- El gate Constitution Check de `plan-template.md` DEBE evaluarse contra los once principios
  antes de Phase 0 y de nuevo tras Phase 1.
- Toda violación consciente va a la tabla Complexity Tracking del plan, con la alternativa más
  simple descartada y el motivo. Sin fila, no hay violación admisible.
- Toda la comunicación del proyecto y todo el contenido del sitio, en español.
- Ante presión de plazo se recorta alcance, nunca una puerta de calidad.

## Governance

Esta constitución prevalece sobre cualquier otra práctica del proyecto.

**Procedimiento de enmienda**: la modificación se propone sobre este fichero, se documenta en el
Sync Impact Report de la cabecera, la aprueba Juan explícitamente y se aplica en un único commit.

**Política de versionado** (semántico):

- **MAJOR**: eliminar o redefinir un principio de forma incompatible, incluido cambiar el stack
  fijo del principio I o abrir la paleta del principio III.
- **MINOR**: añadir un principio o una sección, o ampliar la guía de forma material (por
  ejemplo, introducir una suite de tests).
- **PATCH**: aclaraciones de redacción, correcciones tipográficas y refinamientos no semánticos.

**Revisión de cumplimiento**: en cada ejecución de `/speckit-plan` y de `/speckit-analyze`.

**Version**: 2.0.0 | **Ratified**: 2026-09-08 | **Last Amended**: 2026-09-08
