# Phase 1 — Data Model: Portfolio de una página JdDLabs

**Fecha**: 2026-09-08 | **Plan**: [plan.md](./plan.md)

El sitio no tiene base de datos. "Modelo de datos" significa aquí dos cosas: el mensaje que
viaja del navegador a Resend, y el contenido estático que se declara una sola vez en módulos de
`src/content/` para que no se duplique entre secciones y páginas legales.

---

## 1. Mensaje de contacto (entidad en tránsito)

Se construye en el navegador, viaja a `POST /api/contact` y muere al entregarse a Resend. **No
se persiste en ningún punto.**

| Campo | Tipo | Obligatorio | Validación cliente | Validación servidor |
|---|---|---|---|---|
| `nombre` | texto | Sí | `required`, no vacío tras recortar espacios | 2–100 caracteres |
| `email` | texto | Sí | `required`, `type="email"` | formato válido, ≤ 254 caracteres |
| `telefono` | texto | No | ninguna | ≤ 20 caracteres si viene |
| `mensaje` | texto largo | Sí | `required`, no vacío | 10–2000 caracteres |
| `consentimiento` | booleano | Sí | `required` en la casilla | debe ser verdadero |
| `website` | texto | — | campo trampa, oculto | **debe llegar vacío** |
| `ts` | entero | Sí | marca de tiempo al montar | diferencia ≥ 3 s (ver R-007) |

**Reglas transversales**

- La validación del servidor repite entera la del cliente. El navegador es una comodidad para el
  visitante, nunca una garantía (FR-020b).
- `website` y `ts` no son datos del visitante: son los dos filtros anti-spam. Nunca se muestran,
  nunca se envían en el email.
- El consentimiento es la única condición sin la cual el mensaje no puede salir (FR-021).

**Ciclo de vida**

```text
montaje del formulario ──> se registra ts
        │
        v
visitante rellena ──> validación del navegador ──> POST /api/contact
        │                                              │
        │                                              v
        │                            validación del servidor + filtros anti-spam
        │                                              │
        │                        ┌─────────────────────┴─────────────────────┐
        │                        v                                           v
        │                  entrega a Resend                        descarte silencioso
        │                        │                                  (bot: 200 igualmente)
        │                        v
        └──────────── confirmación en pantalla, sin recargar
```

**Correo generado**

- Remitente: dirección del dominio verificado `jddlabs.dev`.
- Destinatario: `hola@jddlabs.dev`.
- Responder a: el email del visitante — así una respuesta directa le llega sin copiar nada.
- Asunto y cuerpo: nombre, email, teléfono si viene, y el mensaje.

---

## 2. Identidad (`src/content/identity.js`)

Fuente única de verdad. Cuatro consumidores: sección de Contacto, Aviso Legal, Política de
Privacidad y JSON-LD de SEO.

| Clave | Valor | Estado |
|---|---|---|
| `nombreComercial` | JdDLabs | Confirmado |
| `telefono` | `+34 666 67 78 38` | Confirmado |
| `whatsapp` | `+34 666 67 78 38` | Confirmado |
| `email` | `hola@jddlabs.dev` | Confirmado |
| `domicilio` | `Calle Francisco Salto 29, 1 Rute (Córdoba)` | Confirmado, literal de `constitution.md` |
| `dominio` | `jddlabs.dev` | Confirmado |
| `razonSocial` | `Juan de Dios Pérez Moreno` | Confirmado el 2026-09-08 |
| `nif` | `50627812M` | Confirmado el 2026-09-08 |

El módulo valida en tiempo de build que ninguna de estas claves esté ausente o vacía, y lanza si
lo está. Con los datos ya disponibles, esa comprobación no desbloquea nada: existe para impedir
que una edición futura publique un Aviso Legal incompleto sin que nadie se dé cuenta. Es la
traducción a código del principio V.

---

## 3. Contenido estático (`src/content/copy.js`)

Conjuntos cerrados, copiados literalmente de la spec. Ninguna sección improvisa texto.

- **`hero`**: titular, subtítulo, texto de la llamada a la acción.
- **`servicios`**: exactamente tres entradas, cada una con `titulo` y `descripcion`.
- **`proyecto`**: nombre del cliente, título, línea de contexto, descripción larga, lista de
  tecnologías, URL del sitio en vivo, texto de los dos enlaces y una única `captura` con su
  texto alternativo y sus dimensiones reales. No existe clave de firma: desde el 2026-09-11 la
  autoría se lee en el campo `rol` de `casoEstudio` (FR-004b).
- **`casoEstudio`**: datos del cliente (`cliente`, `industria`, `rol`, y `anio`, `duracion` y
  `servicios` cuando el propietario los aporte), los textos de `reto`, `solucion` y
  `highlights`, y los encabezados de los bloques. La lista de tecnologías no se duplica aquí:
  la página lee `proyecto.tecnologias`. Tampoco hay lista de capturas, porque la página no
  tiene galería (FR-004a).
- **`sobreMi`**: párrafo principal y línea de refuerzo.
- **`contacto`**: texto de invitación.
- **`testimonio`**: **ausente por defecto**. La sección de proyecto solo renderiza el bloque si
  esta clave existe y contiene una cita verificada (FR-007, principio V). No se declara vacía ni
  comentada con texto de ejemplo.

---

## 4. Estado de interfaz

No hay estado global ni gestor de estado. Tres estados locales, y nada más:

| Dónde | Estado | Valores |
|---|---|---|
| `MobileMenu` | apertura del panel | abierto / cerrado |
| `ContactForm` | envío | inactivo / enviando / enviado / error |
| `Reveal` | visibilidad | pendiente / visible (siempre *visible* si se pide movimiento reducido) |

El estado `enviando` es el que cumple FR-018: mientras está activo, el botón queda deshabilitado
y una segunda pulsación no produce un segundo mensaje.
