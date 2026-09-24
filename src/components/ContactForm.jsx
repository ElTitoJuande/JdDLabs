import { useRef, useState } from 'react';
import { Boton } from './Boton';
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

  // El filete del campo va a `fg-mute` y no a `border`: un borde a rgba(255,255,255,.08)
  // sobre `bg-3` no llega al 3:1 que WCAG 1.4.11 exige a un control de formulario.
  const claseCampo =
    'mt-2.5 block w-full rounded-lg border border-fg-mute bg-bg-3 px-4 py-3.5 text-fs-300 text-fg placeholder:text-fg-mute transition-colors duration-fast ease-out-soft focus:border-accent motion-reduce:transition-none';

  // Etiqueta mono en versalitas, el mismo tratamiento que los eyebrows de seccion.
  const claseEtiqueta =
    'block font-mono text-fs-100 uppercase tracking-[0.16em] text-fg-mute';

  // El texto de error va en `accent-2` y nunca en `accent`: sobre `bg-3` el acento de
  // relleno se queda en 4,4:1 y no pasa AA (principio VII).
  const mensajeError = (clave) =>
    errores[clave] ? (
      <p id={`error-${clave}`} className="mt-2 text-fs-200 text-accent-2">
        {errores[clave]}
      </p>
    ) : null;

  const atributosError = (clave) =>
    errores[clave]
      ? { 'aria-invalid': true, 'aria-describedby': `error-${clave}` }
      : {};

  return (
    <form
      ref={formularioRef}
      onSubmit={alEnviar}
      className="rounded-lg2 border border-border bg-bg-3 p-6 md:p-11"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={claseEtiqueta}>
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
          <label htmlFor="email" className={claseEtiqueta}>
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
      </div>

      <div className="mt-5">
        <label htmlFor="telefono" className={claseEtiqueta}>
          Teléfono (opcional)
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

      <div className="mt-5">
        <label htmlFor="mensaje" className={claseEtiqueta}>
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          minLength={LIMITES.mensaje.min}
          maxLength={LIMITES.mensaje.max}
          className={`${claseCampo} resize-none`}
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

      <div className="mt-7">
        <div className="flex items-start gap-3">
          <input
            id="consentimiento"
            name="consentimiento"
            type="checkbox"
            required
            className="mt-1 h-[18px] w-[18px] shrink-0 rounded border-border accent-accent"
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
          <label htmlFor="consentimiento" className="text-fs-200 leading-relaxed text-fg-dim">
            {/* Nombre comercial por decision del propietario (2026-09-24). El responsable
                del tratamiento con nombre fiscal sigue identificado en la politica de
                privacidad enlazada aqui mismo (principio XII). */}
            Acepto que {identity.nombreComercial} trate mis datos para responder a esta
            consulta, según la{' '}
            <a href="/privacidad" className="text-accent-2 underline underline-offset-2">
              política de privacidad
            </a>
            .
          </label>
        </div>
        {mensajeError('consentimiento')}
      </div>

      {/* Sin `href`, `Boton` rinde un <button type="submit">: la pill de envio no
          replica las clases del boton solido a mano. */}
      <Boton disabled={enviando} className="mt-8 w-full">
        {enviando ? 'Enviando…' : 'Enviar mensaje'}
      </Boton>

      {/* Un solo punto de anuncio para los dos desenlaces, para que el lector de
          pantalla lea el resultado sin que el visitante tenga que buscarlo. */}
      <div aria-live="polite" className="empty:hidden">
        {estado === 'enviado' && (
          <p className="mt-6 rounded-lg border border-border-accent bg-accent-dim px-4 py-3 text-fs-200 text-fg">
            Mensaje enviado. Te respondo lo antes posible.
          </p>
        )}

        {estado === 'error' && (
          <p className="mt-6 rounded-lg border border-border-accent px-4 py-3 text-fs-200 leading-relaxed text-fg">
            No se ha podido enviar el mensaje. Lo escrito sigue aquí: puedes reintentarlo
            o escribirme directamente por{' '}
            <a
              href={enlaces.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-2 underline underline-offset-2"
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
