import { useRef, useState } from 'react';
import { identity, enlaces } from '../content/identity';

const LIMITES = {
  nombre: { min: 2, max: 100 },
  email: { max: 254 },
  telefono: { max: 20 },
  mensaje: { min: 10, max: 2000 },
};

const AVISO_CONSENTIMIENTO =
  'Debes aceptar el tratamiento de tus datos para poder enviar el formulario.';

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Espejo en cliente de las reglas de data-model.md §1. El servidor las repite enteras:
// esta copia es una comodidad para el visitante, nunca una garantia (FR-020b).
function validarEnCliente(datos) {
  const errores = {};

  if (datos.nombre.length < LIMITES.nombre.min || datos.nombre.length > LIMITES.nombre.max) {
    errores.nombre = `El nombre debe tener entre ${LIMITES.nombre.min} y ${LIMITES.nombre.max} caracteres.`;
  }

  if (!FORMATO_EMAIL.test(datos.email) || datos.email.length > LIMITES.email.max) {
    errores.email = 'Escribe una dirección de correo válida.';
  }

  if (datos.telefono && datos.telefono.length > LIMITES.telefono.max) {
    errores.telefono = `El teléfono no puede pasar de ${LIMITES.telefono.max} caracteres.`;
  }

  if (datos.mensaje.length < LIMITES.mensaje.min || datos.mensaje.length > LIMITES.mensaje.max) {
    errores.mensaje = `El mensaje debe tener entre ${LIMITES.mensaje.min} y ${LIMITES.mensaje.max} caracteres.`;
  }

  if (!datos.consentimiento) {
    errores.consentimiento = AVISO_CONSENTIMIENTO;
  }

  return errores;
}

/**
 * Formulario de contacto (FR-015 a FR-018, FR-020, FR-021).
 *
 * Los campos van sin controlar a proposito: si el envio falla o el servidor devuelve
 * errores, lo que el visitante ya habia escrito sigue donde estaba sin que haya que
 * reponerlo a mano (FR-016, FR-017).
 */
export function ContactForm() {
  // Marca de tiempo del montaje. Viaja en el cuerpo y la Function la compara con la
  // suya para descartar envios inmediatos (research.md R-007).
  const [ts] = useState(() => Date.now());
  const [estado, setEstado] = useState('inactivo');
  const [errores, setErrores] = useState({});
  const formularioRef = useRef(null);

  const enviando = estado === 'enviando';

  const enfocarPrimerError = (clavesError) => {
    const primera = clavesError[0];
    if (!primera || !formularioRef.current) return;
    const campo = formularioRef.current.elements.namedItem(primera);
    if (campo && typeof campo.focus === 'function') campo.focus();
  };

  async function alEnviar(evento) {
    evento.preventDefault();
    if (enviando) return;

    const formulario = evento.currentTarget;
    const datosFormulario = new FormData(formulario);
    const leer = (clave) => String(datosFormulario.get(clave) ?? '').trim();

    const cuerpo = {
      nombre: leer('nombre'),
      email: leer('email'),
      telefono: leer('telefono'),
      mensaje: leer('mensaje'),
      consentimiento: datosFormulario.get('consentimiento') === 'on',
      website: String(datosFormulario.get('website') ?? ''),
      ts,
    };

    const erroresCliente = validarEnCliente(cuerpo);
    if (Object.keys(erroresCliente).length > 0) {
      setErrores(erroresCliente);
      setEstado('inactivo');
      enfocarPrimerError(Object.keys(erroresCliente));
      return;
    }

    setErrores({});
    setEstado('enviando');

    try {
      const respuesta = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo),
      });

      if (respuesta.ok) {
        formulario.reset();
        setEstado('enviado');
        return;
      }

      if (respuesta.status === 400) {
        const detalle = await respuesta.json().catch(() => ({}));
        const erroresServidor = detalle.errores ?? {};
        setErrores(erroresServidor);
        setEstado('inactivo');
        enfocarPrimerError(Object.keys(erroresServidor));
        return;
      }

      setEstado('error');
    } catch {
      // Sin conexion o peticion abortada: mismo camino que un 500.
      setEstado('error');
    }
  }

  const claseCampo =
    'mt-2 block w-full rounded-md border border-ink/20 bg-bg px-3 py-2 text-base text-ink placeholder:text-muted';

  const mensajeError = (clave) =>
    errores[clave] ? (
      <p id={`error-${clave}`} className="mt-2 text-sm text-accent">
        {errores[clave]}
      </p>
    ) : null;

  const atributosError = (clave) =>
    errores[clave]
      ? { 'aria-invalid': true, 'aria-describedby': `error-${clave}` }
      : {};

  return (
    <form ref={formularioRef} onSubmit={alEnviar} className="mt-8 space-y-6">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-ink">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          maxLength={LIMITES.nombre.max}
          autoComplete="name"
          className={claseCampo}
          {...atributosError('nombre')}
        />
        {mensajeError('nombre')}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={LIMITES.email.max}
          autoComplete="email"
          className={claseCampo}
          {...atributosError('email')}
        />
        {mensajeError('email')}
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-ink">
          Teléfono <span className="text-muted">(opcional)</span>
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          maxLength={LIMITES.telefono.max}
          autoComplete="tel"
          className={claseCampo}
          {...atributosError('telefono')}
        />
        {mensajeError('telefono')}
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-ink">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          minLength={LIMITES.mensaje.min}
          maxLength={LIMITES.mensaje.max}
          className={claseCampo}
          {...atributosError('mensaje')}
        />
        {mensajeError('mensaje')}
      </div>

      {/*
        Campo trampa (research.md R-008). Fuera de pantalla y nunca display:none, que
        algunos bots detectan. Con aria-hidden y tabindex -1 no lo alcanza ni el
        tabulador ni el lector de pantalla: un visitante real no puede rellenarlo y
        quedar descartado sin enterarse.
      */}
      <div className="campo-trampa" aria-hidden="true">
        <label htmlFor="website">No rellenes este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consentimiento"
            name="consentimiento"
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 rounded border-ink/30 text-accent"
            onInvalid={(evento) => {
              evento.target.setCustomValidity(AVISO_CONSENTIMIENTO);
              setErrores((previos) => ({ ...previos, consentimiento: AVISO_CONSENTIMIENTO }));
            }}
            onChange={(evento) => {
              evento.target.setCustomValidity('');
              setErrores((previos) => {
                const { consentimiento, ...resto } = previos;
                return resto;
              });
            }}
            {...atributosError('consentimiento')}
          />
          <label htmlFor="consentimiento" className="text-sm leading-relaxed text-muted">
            Acepto que {identity.razonSocial} trate mis datos para responder a esta
            consulta, según la{' '}
            <a href="/privacidad" className="text-accent underline">
              política de privacidad
            </a>
            .
          </label>
        </div>
        {mensajeError('consentimiento')}
      </div>

      <div>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg hover:bg-accentHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Enviando…' : 'Enviar mensaje'}
        </button>
      </div>

      {/* Un solo punto de anuncio para los dos desenlaces, para que el lector de
          pantalla lea el resultado sin que el visitante tenga que buscarlo. */}
      <div aria-live="polite" className="min-h-[1.5rem]">
        {estado === 'enviado' && (
          <p className="rounded-md bg-accentTint px-4 py-3 text-base text-accent">
            Mensaje enviado. Te respondo lo antes posible.
          </p>
        )}

        {estado === 'error' && (
          <p className="rounded-md border border-accent px-4 py-3 text-base text-ink">
            No se ha podido enviar el mensaje. Lo escrito sigue aquí: puedes reintentarlo
            o escribirme directamente por{' '}
            <a
              href={enlaces.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline"
            >
              WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
