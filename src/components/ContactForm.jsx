import { useRef, useState } from "react";
import { Boton } from "./Boton";
import { LabelInput } from "./LabelInput";
import { identity, enlaces } from "../content/identity";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function ContactForm() {
  const [ts] = useState(() => Date.now());
  const [state, setState] = useState("idle");
  const [errors, setErrors] = useState({});
  const [largo, setLargo] = useState(0);
  const formRef = useRef(null);
  const sending = useRef(false);
  function showErrors(next) {
    setErrors(next);
    setState("idle");
    formRef.current?.elements.namedItem(Object.keys(next)[0])?.focus();
  }
  /* al corregir un campo su error deja de valer: se retira ya, sin esperar al
     siguiente envío. El contador del mensaje sigue al texto real. */
  function editar(event) {
    const { name, value } = event.target;
    if (name === "mensaje") setLargo(value.length);
    if (errors[name])
      setErrors(({ [name]: _, ...resto }) => resto);
  }
  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (k) => String(data.get(k) ?? "").trim();
    const body = {
      nombre: read("nombre"),
      email: read("email"),
      mensaje: read("mensaje"),
      consentimiento: data.get("consentimiento") === "on",
      website: read("website"),
      ts,
    };
    const next = {};
    if (body.nombre.length < 2 || body.nombre.length > 100)
      next.nombre = "El nombre debe tener entre 2 y 100 caracteres.";
    if (!EMAIL.test(body.email) || body.email.length > 254)
      next.email = "Escribe una dirección de correo válida.";
    if (body.mensaje.length < 10 || body.mensaje.length > 2000)
      next.mensaje = "El mensaje debe tener entre 10 y 2000 caracteres.";
    if (!body.consentimiento)
      next.consentimiento =
        "Debes aceptar el tratamiento de tus datos para enviar el mensaje.";
    if (Object.keys(next).length) {
      showErrors(next);
      return;
    }
    sending.current = true;
    setErrors({});
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        form.reset();
        setLargo(0);
        setState("sent");
      } else if (response.status === 400) {
        const detail = await response.json().catch(() => ({}));
        if (detail.errores && Object.keys(detail.errores).length)
          showErrors(detail.errores);
        else setState("error");
      } else setState("error");
    } catch {
      setState("error");
    } finally {
      sending.current = false;
    }
  }
  const invalid = (key, ayuda) => {
    const ids = [errors[key] && "error-" + key, ayuda].filter(Boolean);
    return {
      ...(errors[key] && { "aria-invalid": true }),
      ...(ids.length && { "aria-describedby": ids.join(" ") }),
    };
  };
  const error = (key) =>
    errors[key] ? (
      <p className="form-error" id={"error-" + key}>
        {errors[key]}
      </p>
    ) : null;
  return (
    <form
      method="post"
      action="/api/contact"
      ref={formRef}
      onSubmit={submit}
      onChange={editar}
      className="contact-form"
      noValidate
      aria-label="Formulario de contacto"
      aria-busy={state === "sending"}
    >
      <div className="form-fields">
        <div>
          <LabelInput
            etiqueta="Nombre"
            id="nombre"
            name="nombre"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            {...invalid("nombre")}
          />
          {error("nombre")}
        </div>
        <div>
          <LabelInput
            etiqueta="Correo electrónico"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            {...invalid("email")}
          />
          {error("email")}
        </div>
        <div>
          <LabelInput
            etiqueta="Mensaje"
            id="mensaje"
            name="mensaje"
            multilinea
            rows={5}
            required
            minLength={10}
            maxLength={2000}
            {...invalid("mensaje", "ayuda-mensaje")}
          />
          <p className="form-hint" id="ayuda-mensaje">
            <span>Mínimo 10 caracteres.</span>
            <span data-lleno={largo >= 2000}>{largo}/2000</span>
          </p>
          {error("mensaje")}
        </div>
      </div>
      <div className="campo-trampa" aria-hidden="true">
        <label htmlFor="website">No rellenes este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-consent">
        <input
          id="consentimiento"
          name="consentimiento"
          type="checkbox"
          required
          {...invalid("consentimiento")}
        />
        <label htmlFor="consentimiento">
          Acepto que {identity.nombreComercial} trate mis datos para responder a
          esta consulta, según la{" "}
          <a href="/privacidad">política de privacidad</a>.
        </label>
      </div>
      {error("consentimiento")}
      <Boton className="form-submit" disabled={state === "sending"}>
        {state === "sending" ? "Enviando…" : "Enviar mensaje"}
      </Boton>
      <div role="status" aria-live="polite">
        {state === "sent" && (
          <p className="form-status">
            Mensaje enviado. Te respondo lo antes posible.
          </p>
        )}
        {state === "error" && (
          <p className="form-status">
            No se ha podido enviar el mensaje. Lo escrito sigue aquí: puedes
            reintentarlo o escribirme a{" "}
            <a href={enlaces.email}>{identity.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
export default ContactForm;
