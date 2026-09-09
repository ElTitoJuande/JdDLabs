import { identity, enlaces } from './identity';

// Textos legales. Razon social, NIF y domicilio NO se escriben aqui: se leen de
// identity.js, que es la fuente unica (research.md R-009). Asi el domicilio del Aviso
// Legal no puede diferir del que publica el JSON-LD ni del de constitution.md.
//
// NOTA: redactados sobre el tratamiento real que hace el sitio (un formulario de
// contacto, sin analitica, sin cookies propias ni de terceros). Conviene que el
// propietario los revise antes de publicar.

const AUTORIDAD = 'Agencia Española de Protección de Datos (www.aepd.es)';

export const avisoLegal = {
  titulo: 'Aviso legal',
  descripcion: `Información general y datos identificativos de ${identity.nombreComercial}, conforme al artículo 10 de la LSSI.`,
  actualizado: '8 de septiembre de 2026',
  secciones: [
    {
      titulo: 'Datos identificativos del prestador',
      parrafos: [
        `En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa de que el titular de este sitio web es:`,
      ],
      datos: [
        { clave: 'Titular', valor: identity.razonSocial },
        { clave: 'Nombre comercial', valor: identity.nombreComercial },
        { clave: 'NIF', valor: identity.nif },
        { clave: 'Domicilio', valor: identity.domicilio },
        { clave: 'Correo electrónico', valor: identity.email, href: enlaces.email },
        { clave: 'Teléfono', valor: identity.telefono, href: enlaces.telefono },
        { clave: 'Sitio web', valor: identity.dominio, href: enlaces.sitio },
      ],
    },
    {
      titulo: 'Objeto del sitio',
      parrafos: [
        `Este sitio web tiene por objeto presentar los servicios de desarrollo web de ${identity.nombreComercial} y ofrecer vías de contacto a quien esté interesado en contratarlos. No se realizan ventas ni contrataciones en línea.`,
      ],
    },
    {
      titulo: 'Condiciones de uso',
      parrafos: [
        'El acceso a este sitio es gratuito y no requiere registro previo. La persona usuaria se compromete a hacer un uso conforme a la ley y a no emplear el formulario de contacto con fines distintos de los previstos.',
        `${identity.razonSocial} no se responsabiliza del contenido de los sitios de terceros a los que se pueda acceder mediante enlaces publicados en estas páginas.`,
      ],
    },
    {
      titulo: 'Propiedad intelectual e industrial',
      parrafos: [
        `Los textos, el diseño y el código de este sitio son titularidad de ${identity.razonSocial}, salvo los elementos identificativos de terceros, que pertenecen a sus respectivos titulares y se muestran únicamente a efectos de referencia de trabajos realizados.`,
      ],
    },
    {
      titulo: 'Protección de datos',
      parrafos: [
        'El tratamiento de los datos personales facilitados a través del formulario de contacto se describe en la política de privacidad de este mismo sitio.',
      ],
    },
    {
      titulo: 'Legislación aplicable',
      parrafos: [
        'Las presentes condiciones se rigen por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a la normativa aplicable.',
      ],
    },
  ],
};

export const privacidad = {
  titulo: 'Política de privacidad',
  descripcion: `Cómo trata ${identity.nombreComercial} los datos que se envían a través del formulario de contacto, conforme al RGPD.`,
  actualizado: '8 de septiembre de 2026',
  secciones: [
    {
      titulo: 'Responsable del tratamiento',
      parrafos: [
        'El responsable del tratamiento de los datos recogidos en este sitio es:',
      ],
      datos: [
        { clave: 'Responsable', valor: identity.razonSocial },
        { clave: 'NIF', valor: identity.nif },
        { clave: 'Domicilio', valor: identity.domicilio },
        { clave: 'Correo electrónico', valor: identity.email, href: enlaces.email },
      ],
    },
    {
      titulo: 'Qué datos se recogen y con qué finalidad',
      parrafos: [
        'A través del formulario de contacto se recogen el nombre, la dirección de correo electrónico, el teléfono (opcional) y el contenido del mensaje. La única finalidad de ese tratamiento es atender y responder la consulta enviada.',
        'No se elaboran perfiles, no se toman decisiones automatizadas y los datos no se utilizan para enviar comunicaciones comerciales no solicitadas.',
      ],
    },
    {
      titulo: 'Base jurídica',
      parrafos: [
        'La base jurídica del tratamiento es el consentimiento explícito de la persona interesada, que se recaba mediante una casilla no premarcada antes de permitir el envío del formulario (artículo 6.1.a del RGPD).',
      ],
    },
    {
      titulo: 'Destinatarios y encargados del tratamiento',
      parrafos: [
        'Este sitio no vende ni cede datos personales a terceros. Para su funcionamiento intervienen los siguientes proveedores, que actúan como encargados del tratamiento:',
      ],
      lista: [
        'Cloudflare, Inc. — alojamiento del sitio y ejecución de la función que procesa el formulario.',
        'Resend (Plus Five Five, Inc.) — envío del correo electrónico que contiene el mensaje del formulario.',
      ],
      parrafosFinales: [
        'Ambos proveedores pueden tratar datos fuera del Espacio Económico Europeo, amparados en las garantías previstas en el capítulo V del RGPD.',
      ],
    },
    {
      titulo: 'Conservación',
      parrafos: [
        'El sitio web no almacena copia de los mensajes: el contenido del formulario se entrega por correo electrónico y no queda registrado en ninguna base de datos de este sitio.',
        'El mensaje recibido se conserva en el buzón de correo del responsable durante el tiempo necesario para atender la consulta y, en su caso, durante los plazos exigidos por la legislación aplicable.',
      ],
    },
    {
      titulo: 'Derechos de la persona interesada',
      parrafos: [
        `Cualquier persona puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${identity.email}, indicando el derecho que desea ejercer.`,
        `Asimismo puede retirar el consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento previo, y presentar una reclamación ante la ${AUTORIDAD}.`,
      ],
    },
    {
      titulo: 'Cookies y seguimiento',
      parrafos: [
        'Este sitio no instala cookies propias ni de terceros con fines analíticos, publicitarios o de seguimiento. No utiliza ninguna herramienta de analítica web.',
        'Las tipografías se sirven desde el propio dominio, de modo que la carga de las páginas no transfiere la dirección IP de quien navega a servicios de terceros.',
      ],
    },
  ],
};
