/**
 * POST /api/contact — unica funcion serverless del proyecto (principio I).
 * Contrato completo en specs/001-portfolio-landing/contracts/contact-api.md
 *
 * El orden de comprobaciones importa: los filtros baratos y silenciosos van primero,
 * para no gastar una llamada a Resend en trafico automatizado.
 */

const UMBRAL_MS = 3000; // research.md R-007
const VENTANA_FIABLE_MS = 24 * 60 * 60 * 1000; // mas alla de esto, el reloj no es de fiar

const LIMITES = {
  nombre: { min: 2, max: 100 },
  email: { max: 254 },
  telefono: { max: 20 },
  mensaje: { min: 10, max: 2000 },
};

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DESTINATARIO = 'hola@jddlabs.dev';
const REMITENTE_POR_DEFECTO = 'JdDLabs <hola@jddlabs.dev>';

const json = (cuerpo, estado) =>
  new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

const ok = () => json({ ok: true }, 200);

const texto = (valor) => (typeof valor === 'string' ? valor.trim() : '');

const escaparHtml = (valor) =>
  valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Repite entera la validacion del cliente (FR-020b). El navegador es una comodidad
 * para el visitante, nunca una garantia.
 */
function validar(datos) {
  const errores = {};

  const nombre = texto(datos.nombre);
  if (nombre.length < LIMITES.nombre.min || nombre.length > LIMITES.nombre.max) {
    errores.nombre = `El nombre debe tener entre ${LIMITES.nombre.min} y ${LIMITES.nombre.max} caracteres.`;
  }

  const email = texto(datos.email);
  if (!FORMATO_EMAIL.test(email) || email.length > LIMITES.email.max) {
    errores.email = 'Escribe una dirección de correo válida.';
  }

  const telefono = texto(datos.telefono);
  if (telefono.length > LIMITES.telefono.max) {
    errores.telefono = `El teléfono no puede pasar de ${LIMITES.telefono.max} caracteres.`;
  }

  const mensaje = texto(datos.mensaje);
  if (mensaje.length < LIMITES.mensaje.min || mensaje.length > LIMITES.mensaje.max) {
    errores.mensaje = `El mensaje debe tener entre ${LIMITES.mensaje.min} y ${LIMITES.mensaje.max} caracteres.`;
  }

  if (datos.consentimiento !== true) {
    errores.consentimiento =
      'Debes aceptar el tratamiento de tus datos para poder enviar el formulario.';
  }

  return { errores, limpio: { nombre, email, telefono, mensaje } };
}

/**
 * Decide si la marca de tiempo delata un envio automatizado.
 *
 * Una diferencia negativa o superior a 24 horas significa que el reloj del cliente
 * esta desviado, no que sea un bot: en ese caso NO se descarta y se sigue con el resto
 * de filtros (research.md R-007). Descartar ahi expulsaria a personas reales, y como
 * el descarte es silencioso nadie se enteraria.
 */
function esEnvioInmediato(ts, ahora) {
  if (typeof ts !== 'number' || !Number.isFinite(ts)) return false;

  const diferencia = ahora - ts;
  if (diferencia < 0 || diferencia > VENTANA_FIABLE_MS) return false;

  return diferencia < UMBRAL_MS;
}

export async function onRequest(context) {
  const { request, env } = context;

  // 1. Metodo distinto de POST.
  if (request.method !== 'POST') {
    return json({ ok: false }, 405);
  }

  // 2. Cuerpo que no es JSON valido.
  let datos;
  try {
    datos = await request.json();
  } catch {
    return json({ ok: false, errores: { cuerpo: 'El cuerpo debe ser JSON válido.' } }, 400);
  }

  if (datos === null || typeof datos !== 'object') {
    return json({ ok: false, errores: { cuerpo: 'El cuerpo debe ser un objeto JSON.' } }, 400);
  }

  // 3. Campo trampa relleno: descarte silencioso con 200. Un 403 le diria al autor del
  //    bot que filtro ha saltado y como esquivarlo (FR-020, FR-020d).
  if (texto(datos.website) !== '') {
    return ok();
  }

  // 4. Envio inmediato: mismo descarte silencioso (FR-020a).
  if (esEnvioInmediato(datos.ts, Date.now())) {
    return ok();
  }

  // 5. Validacion de campos y de consentimiento.
  const { errores, limpio } = validar(datos);
  if (Object.keys(errores).length > 0) {
    return json({ ok: false, errores }, 400);
  }

  // 6. Entrega a Resend.
  const clave = env.RESEND_API_KEY;
  if (!clave) {
    // Nunca un envio perdido en silencio: se registra y se responde 500 para que el
    // visitante vea el error de FR-017 y pueda recurrir a WhatsApp.
    console.error('contact: falta RESEND_API_KEY en el entorno de Cloudflare Pages');
    return json({ ok: false }, 500);
  }

  const lineas = [
    ['Nombre', limpio.nombre],
    ['Email', limpio.email],
    ...(limpio.telefono ? [['Teléfono', limpio.telefono]] : []),
  ];

  const cuerpoHtml = [
    ...lineas.map(([etiqueta, valor]) => `<p><strong>${etiqueta}:</strong> ${escaparHtml(valor)}</p>`),
    '<hr />',
    `<p style="white-space: pre-wrap">${escaparHtml(limpio.mensaje)}</p>`,
  ].join('\n');

  const cuerpoTexto = [
    ...lineas.map(([etiqueta, valor]) => `${etiqueta}: ${valor}`),
    '',
    limpio.mensaje,
  ].join('\n');

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${clave}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // El correo del visitante va como reply_to y nunca como from: ponerlo de
        // remitente romperia SPF y DKIM y mandaria los mensajes a spam (R-010).
        from: env.RESEND_FROM || REMITENTE_POR_DEFECTO,
        to: [env.RESEND_TO || DESTINATARIO],
        reply_to: limpio.email,
        subject: `Nuevo mensaje del formulario web — ${limpio.nombre}`,
        html: cuerpoHtml,
        text: cuerpoTexto,
      }),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text().catch(() => '');
      console.error('contact: Resend respondió', respuesta.status, detalle);
      return json({ ok: false }, 500);
    }

    return ok();
  } catch (error) {
    console.error('contact: fallo al llamar a Resend', error);
    return json({ ok: false }, 500);
  }
}

export default { onRequest };
