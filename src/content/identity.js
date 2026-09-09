// Fuente unica de verdad de la identidad (research.md R-009).
// Cuatro consumidores: seccion de Contacto, Aviso Legal, Politica de Privacidad y
// JSON-LD de SEO. El domicilio se copia literalmente de constitution.md: aqui se
// escribe una vez y aparece identico en los cuatro sitios.

export const identity = {
  nombreComercial: 'JdDLabs',
  razonSocial: 'Juan de Dios Pérez Moreno',
  nif: '50627812M',
  domicilio: 'Calle Francisco Salto 29, 1 Rute (Córdoba)',
  localidad: 'Rute',
  provincia: 'Córdoba',
  pais: 'España',
  telefono: '+34 666 67 78 38',
  whatsapp: '+34 666 67 78 38',
  email: 'hola@jddlabs.dev',
  dominio: 'jddlabs.dev',
};

// Formas listas para usar en href, derivadas de los valores canonicos de arriba para
// que no exista una segunda copia del numero ni del correo.
const soloDigitos = (t) => t.replace(/[^\d+]/g, '');

export const enlaces = {
  telefono: `tel:${soloDigitos(identity.telefono)}`,
  whatsapp: `https://wa.me/${soloDigitos(identity.whatsapp).replace('+', '')}`,
  email: `mailto:${identity.email}`,
  sitio: `https://${identity.dominio}`,
};

// Claves sin las cuales el Aviso Legal incumple el articulo 10 de la LSSI.
const CLAVES_OBLIGATORIAS = ['razonSocial', 'nif', 'domicilio'];

/**
 * Salvaguarda del principio V (data-model.md §2). Se invoca desde vite.config.js en
 * buildStart, de modo que un Aviso Legal incompleto rompe el build en lugar de
 * publicarse. No desbloquea nada: existe para impedir una regresion silenciosa.
 */
export function verificarIdentidad(datos = identity) {
  const faltantes = CLAVES_OBLIGATORIAS.filter(
    (clave) => typeof datos[clave] !== 'string' || datos[clave].trim() === ''
  );

  if (faltantes.length > 0) {
    throw new Error(
      `identity.js: faltan datos obligatorios del Aviso Legal (LSSI art. 10): ${faltantes.join(', ')}. ` +
        'El build se detiene a proposito: publicar un Aviso Legal incompleto incumple la ley ' +
        'y el principio V de la constitucion.'
    );
  }

  return datos;
}

verificarIdentidad();
