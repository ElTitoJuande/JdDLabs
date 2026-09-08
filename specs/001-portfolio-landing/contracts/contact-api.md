# Contrato: `POST /api/contact`

**Implementación**: `functions/api/contact.js` (Cloudflare Pages Function)
**Consumidor**: `src/components/ContactForm.jsx`
**Función**: única superficie no estática del sitio (principio I de la constitución).

---

## Petición

```text
POST /api/contact
Content-Type: application/json
```

```json
{
  "nombre": "María López",
  "email": "maria@ejemplo.es",
  "telefono": "600112233",
  "mensaje": "Necesito una web para mi tienda de Rute.",
  "consentimiento": true,
  "website": "",
  "ts": 1789200000000
}
```

Campos, límites y significado: ver [data-model.md](../data-model.md#1-mensaje-de-contacto-entidad-en-tránsito).
`website` es el campo trampa y debe llegar vacío. `ts` es la marca de tiempo del montaje del
formulario.

---

## Respuestas

| Código | Cuerpo | Cuándo | Qué hace la interfaz |
|---|---|---|---|
| `200` | `{"ok": true}` | Mensaje entregado a Resend **o** descartado por filtro anti-spam | Muestra la confirmación de FR-015 |
| `400` | `{"ok": false, "errores": {"campo": "motivo"}}` | Validación de servidor fallida | Muestra el error junto a cada campo afectado (FR-016) |
| `405` | `{"ok": false}` | Método distinto de POST | No debería ocurrir desde la interfaz |
| `500` | `{"ok": false}` | Resend responde con error o la petición falla | Muestra el error de FR-017 y ofrece WhatsApp como alternativa |

### Por qué un bot recibe `200`

FR-020d exige no revelar el motivo del descarte. Un `403` le diría al autor del bot exactamente
qué filtro ha saltado y cómo evitarlo en el siguiente intento. Devolver el mismo `200` que un
envío legítimo no le da ninguna información. El mensaje, sencillamente, no se envía.

---

## Orden de comprobaciones en el servidor

El orden importa: los filtros baratos y silenciosos van primero, para no gastar una llamada a
Resend en tráfico automatizado.

1. Método distinto de POST → `405`.
2. Cuerpo no es JSON válido → `400`.
3. `website` llega con contenido → descarte silencioso, `200`.
4. `ts` indica menos de 3 segundos → descarte silencioso, `200`.
   Si la diferencia es negativa o supera 24 horas, la marca se considera no fiable y **no** se
   descarta: se sigue con el resto de comprobaciones (ver R-007).
5. Validación de campos y de `consentimiento` → `400` con el detalle por campo.
6. Llamada a Resend → `200` si acepta, `500` si no.

---

## Contrato de entorno

| Variable | Dónde vive | Notas |
|---|---|---|
| `RESEND_API_KEY` | Variable de entorno del proyecto de Cloudflare Pages | Nunca en el repositorio, nunca en el bundle del cliente. Su ausencia debe producir un `500` registrado, jamás un envío silenciosamente perdido |

**Invariante de seguridad**: la clave se lee exclusivamente desde `env` dentro de la Function.
Ninguna variable con prefijo `VITE_` puede contenerla: Vite incrusta esas en el bundle público.
La puerta de calidad número 6 de la constitución exige inspeccionar el bundle publicado para
confirmarlo.

---

## Lo que este contrato NO hace

- No almacena el mensaje en ningún sitio (sin base de datos, principio I).
- No devuelve identificador de seguimiento: no hay nada que consultar después.
- No notifica al propietario si Resend falla; la revisión es manual desde su panel (R-011).
- No aplica límite por IP: los dos filtros anti-spam son el campo trampa y el umbral temporal.
