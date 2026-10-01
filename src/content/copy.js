// Copy cerrado de las cinco secciones (data-model.md §3).
// Ninguna seccion improvisa texto: todo lo que se lee en pantalla sale de aqui.
//
// Fuente: copy-portfolio.md, version definitiva aportada por el propietario el
// 2026-09-09. Sustituye por completo al copy provisional anterior. Se transcribe
// literalmente, sin reescrituras. El 2026-09-30 el propietario revisa y aprueba una pasada
// de estilo sobre hero, servicios, proyecto, sobre mi, contacto y pie.
//
// Principio 70/30: en la capa principal no entra jerga tecnica. La version ampliada
// del stack vive solo en la pagina opcional de caso de estudio.

export const hero = {
  // Eyebrow del hero: quien hace el trabajo (propietario, 2026-09-24). Se lee "Juan de
  // Dios · Desarrollador independiente"; en dos piezas para poder partirlo por el punto
  // en movil. Acompaña al lugar, que se lee de identity.js. Las versalitas, del CSS.
  eyebrow: { nombre: 'Juan de Dios', rol: 'Desarrollador independiente' },
  // El h1 se lee entero como "Desarrollo web para pymes y autónomos": los segmentos
  // marcan las palabras destacadas.
  titular: [
    { texto: 'Desarrollo web ' },
    { texto: 'para', enfasis: 'enlace' },
    { texto: ' ' },
    { texto: 'pymes y autónomos', enfasis: 'clave' },
  ],
  // Copy del propietario (2026-09-23), sustituye al subtitulo literal de FR-002 de la
  // spec 001.
  // `destacado` va en `fg` y el resto en `fg-dim`: la primera frase es la tesis.
  subtitulo: {
    destacado: 'Tu negocio merece una web que venda, no una plantilla más.',
    resto: 'Diseño y programo tu web a medida. De lo técnico me encargo yo; tú, de lo tuyo.',
  },
  cta: 'Solicitar presupuesto',
  // Segunda accion del hero, introducida por la maqueta v2: lleva al unico proyecto
  // publicable que hay. Es navegacion, no una afirmacion sobre el negocio.
  ctaSecundario: 'Ver trabajo',
};

// Pie (2026-09-24). `eyebrow` elegido por el propietario el 2026-09-30. `descripcion` NO es nueva: es la del JSON-LD de negocio
// local de index.html, literal.
export const pie = {
  eyebrow: '¿Empezamos?',
  descripcion: 'Desarrollo a medida para pymes y autónomos en Rute y alrededores.',
  propuesta: 'Desarrollo soluciones a medida para tu negocio: aplicaciones, automatizaciones y webs que te ayuden a ahorrar tiempo y trabajar mejor. Yo me encargo de la tecnología; tú, de tu negocio.',
};

// CTA de la cabecera, en escritorio y en el menu movil. Mas corto que `hero.cta`: en
// la barra compite con la navegacion y tiene que caber en un boton de ~40px.
export const cabecera = {
  cta: 'Hablemos',
};

// Terminos de la banda en bucle (seccion 2 de la portada v2).
//
// Los ocho primeros salen de los tres `servicios` de abajo y de su propio texto
// ("paneles de gestion, reservas, integraciones con lo que ya usas"). Los seis
// intercalados (CMS, Mantenimiento, Desarrollo a medida, SEO, Presencia digital,
// Landing pages) los añade el propietario el 2026-09-23. Son capacidades, no clientes
// ni cifras: no hay nada que verificar y no hay ni un termino inventado (principio V).
export const capacidades = [
  'Web corporativa',
  'Landing pages',
  'Tiendas online',
  'CMS',
  'Aplicaciones web',
  'Desarrollo a medida',
  'Paneles de gestión',
  'Reservas',
  'Integraciones',
  'SEO',
  'Rendimiento',
  'Presencia digital',
  'Accesibilidad',
  'Mantenimiento',
];

// Aperturas de seccion de la portada v2: eyebrow mono + titular con punto final.
// Transcritas de la maqueta aprobada por el propietario. Viven aqui y no en el JSX
// por el mismo motivo que el resto del fichero: ninguna seccion improvisa texto en
// pantalla. El titular de Contacto no esta aqui porque ya existia dentro de
// `contacto`, y no se duplica.
//
// `enfasis`: el cierre del titular que va en la serif `accent-2` (constitucion 3.2.0,
// aceptado por el propietario el 2026-09-24). Tiene que ser el final literal del titulo.
export const titulares = {
  proyecto: { eyebrow: 'Trabajo seleccionado', titulo: 'Un proyecto, contado entero.', enfasis: 'contado entero.' },
  servicios: { eyebrow: 'Servicios', titulo: 'Lo que hago.', enfasis: 'hago.' },
  stack: { eyebrow: 'Tecnología', titulo: 'Las herramientas que uso.', enfasis: 'que uso.' },
  sobreMi: { eyebrow: 'Sobre mí', titulo: 'La misma persona, de principio a fin.', enfasis: 'de principio a fin.' },
  contacto: { eyebrow: 'Contacto', enfasis: 'tu proyecto?' },
};

export const servicios = [
  {
    id: 'web-corporativa',
    titulo: 'Web corporativa',
    descripcion:
      'La web que presenta tu negocio: quiénes sois, qué ofrecéis y cómo contactaros, con una imagen profesional que dé confianza.',
    // Claves: el trabajo que hay detras de cada servicio (propietario, 2026-09-24), no un
    // resumen de la descripcion.
    claves: ['Diseño a medida', 'UI/UX', 'Responsive', 'SEO on-page'],
  },
  {
    id: 'tiendas-online',
    titulo: 'Tiendas online',
    descripcion:
      'Tu tienda, fácil de gestionar en el día a día y con una compra sencilla para tus clientes.',
    claves: ['Catálogo y carrito', 'Pagos con Stripe', 'Gestión de pedidos', 'Emails automáticos'],
  },
  {
    id: 'aplicaciones',
    titulo: 'Aplicaciones y soluciones web',
    descripcion:
      'Herramientas a medida cuando una plantilla se queda corta: paneles de gestión, reservas, integraciones con lo que ya usas.',
    claves: ['Paneles de gestión', 'Sistemas de reservas', 'APIs e integraciones', 'Bases de datos'],
  },
];

export const proyecto = {
  eyebrow: 'Proyecto destacado',
  titulo: 'Nueva presencia digital para Cristalería Ruteña',
  cliente: 'Cristalería Ruteña',
  // Parrafo completo. Desde el rediseño en tarjeta ya no se lee en la portada: es la
  // entradilla de la pagina de caso de estudio.
  descripcion:
    'Cristalería Ruteña lleva desde 1977 trabajando el vidrio y el aluminio en Rute: carpintería de aluminio, vidrio a medida, toldos y persianas para vivienda, negocio y proyectos técnicos. Diseñé y desarrollé su web desde cero. Presenta sus servicios, cómo trabajan y los proyectos que han hecho en Sevilla, Estepona y Marbella. La idea era que consultar sus servicios y pedir presupuesto fuera sencillo.',
  // Linea de contexto de la tarjeta. NO es copy nuevo: es la primera frase de
  // `descripcion`, recortada literalmente y sin reescribir una sola palabra. Si el
  // propietario prefiere una linea propia, se sustituye aqui y solo aqui.
  contexto:
    'Cristalería Ruteña lleva desde 1977 trabajando el vidrio y el aluminio en Rute: carpintería de aluminio, vidrio a medida, toldos y persianas para vivienda, negocio y proyectos técnicos.',
  // Stack simplificado a proposito (principio 70/30). El proyecto NO usa PHP ni MySQL:
  // no tiene base de datos ni CMS. No se pinta en la tarjeta de la portada, que se
  // queda en imagen y los dos enlaces: es la lista que lee el bloque "Tecnologia
  // utilizada" del caso de estudio, y no hay una segunda copia en `casoEstudio`.
  tecnologias: ['React', 'Vite', 'Tailwind', 'Cloudflare'],
  // Categoria corta de la tarjeta de la portada. NO es copy nuevo: es el recorte de
  // `casoEstudio.industria` ('Vidrio, aluminio y carpinteria a medida') que usa la
  // maqueta. El año de la tarjeta no se declara aqui: se lee de `casoEstudio.anio`,
  // para que no existan dos copias del mismo dato.
  categoria: 'Vidrio y aluminio',
  url: 'https://cristaleriarutena.es',
  textoEnlace: 'Visitar en vivo',
  enlaceCaso: 'Ver caso de estudio',
  // Cloudflare Pages sirve sin extension y redirige 308 desde .html: se enlaza ya la
  // forma final para que ninguna navegacion pase por un redirect.
  urlCaso: '/caso-cristaleria',
  // Imagen unica del proyecto: la tarjeta de la portada y la apertura del caso de
  // estudio leen esta misma clave. Desde el 2026-09-24 es la foto de la fachada del
  // taller (la misma de cristaleriarutena.es), panoramica a 1024x468. La tarjeta la
  // encaja en su marco 3:2 recortando los laterales; el caso de estudio la muestra
  // entera. Si esta clave vuelve a null no se dibuja imagen ni marco vacio (principio V).
  captura: {
    src: '/img/fachada-cristaleria.webp',
    alt: 'Fachada blanca del taller de Cristalería Ruteña en Rute, con el rótulo “Cristalería Ruteña, S.L. — La industria más antigua del vidrio en Rute” y el logotipo CR en rojo.',
    ancho: 1024,
    alto: 468,
  },
};

// Stack ampliado y narrativa del proyecto. Solo para caso-cristaleria.html: esa pagina
// si admite profundidad tecnica. No se usa en la portada.
//
// Desde el 2026-09-10 la Fase 8 deja de ser opcional y pasa a alcance comprometido, por
// decision del propietario: la portada ya solo muestra la tarjeta, asi que sin esta
// pagina el proyecto destacado se queda sin ningun sitio donde demostrarse.
export const casoEstudio = {
  presentacion: 'Una nueva presencia digital para un negocio con historia.',
  objetivo: 'Mostrar sus servicios y proyectos con claridad, también desde el móvil, y facilitar la solicitud de presupuesto.',
  decisiones: [
    { icono: 'web', titulo: 'Servicios bien explicados', texto: 'Carpintería de aluminio, vidrio a medida, toldos y persianas: una presentación clara de lo que ofrece la empresa.' },
    { icono: 'grid', titulo: 'El trabajo, a la vista', texto: 'Un catálogo de proyectos propios con ubicación y detalle para mostrar trabajos realizados.' },
    { icono: 'mail', titulo: 'Un contacto sencillo', texto: 'Formulario, teléfono y WhatsApp como vías directas para consultar o solicitar presupuesto.' },
  ],
  desarrollo: 'Diseño y desarrollo completo de la web, desde la presentación de servicios hasta el catálogo de proyectos y las vías de contacto.',
  // Bloque de datos del cliente, en el orden del formato de referencia:
  // Cliente / Industria / Año / Duración / Servicios / Rol. Las seis filas estan
  // completas desde el 2026-09-11, con los tres ultimos valores aportados por el
  // propietario ese mismo dia. La pagina sigue filtrando los valores vacios, asi que si
  // alguna clave se retira su fila desaparece sin dejar hueco (principio V).
  cliente: 'Cristalería Ruteña',
  industria: 'Vidrio, aluminio y carpintería a medida',
  anio: '2026',
  duracion: '6-8 semanas',
  // Cadena y no lista: `Dato` pinta el valor tal cual dentro de un <dd>, y un array se
  // renderizaria con los tres servicios pegados y sin separador.
  servicios: 'Diseño web, Desarrollo a medida, Perfil de Google',
  // El Rol absorbe lo que antes era una firma suelta al pie de la pagina: la autoria se
  // lee aqui, dentro de los datos del proyecto, y no repetida en dos sitios (FR-004b).
  rol: 'Diseño y desarrollo completo · Juan de Dios Pérez',
  reto:
    'La web anterior de Cristalería Ruteña tenía más de diez años y ya no reflejaba la calidad del trabajo que hacen. Había que enseñar sus servicios y proyectos de forma clara y con imágenes, que la web funcionara bien en el móvil y que pedir presupuesto costara menos.',
  solucion:
    'Una web completa con presentación de servicios (carpintería de aluminio, vidrio a medida, toldos y persianas), catálogo de proyectos propios, proceso de trabajo en tres pasos y contacto directo por WhatsApp, formulario y teléfono.',
  highlights: [
    'Contacto directo por WhatsApp',
    'Catálogo de proyectos realizados con ubicación y detalle',
    'FAQ para resolver dudas antes de presupuestar',
  ],
  // Sin fila de resultados: no hay datos de analitica reales que citar (principio V).

  // Encabezados de los bloques de la pagina. Viven aqui y no en el JSX para que
  // ninguna seccion improvise texto en pantalla.
  encabezados: {
    reto: 'El reto',
    solucion: 'La solución',
    highlights: 'Highlights del proyecto',
    tecnologia: 'Tecnología utilizada',
  },
  volver: 'Volver al portfolio',
  // Imagen de apertura. `null` reutiliza `proyecto.captura`, que es justo lo que
  // interesa aqui: la misma portada del cliente que se ve en la tarjeta. Si tampoco la
  // hubiera no se dibuja nada.
  //
  // No hay galeria de capturas y no es un descuido: la pagina de detalle es una sola
  // imagen de apertura y despues texto. Quien quiera ver el sitio real tiene el enlace
  // "Visitar en vivo", que enseña mas que ninguna captura.
  imagenHero: null,
};

export const sobreMi = {
  parrafo:
    'Soy desarrollador web y trabajo desde Rute con empresas del pueblo y alrededores que necesitan una web profesional o una herramienta hecha para su negocio.',
  refuerzo:
    'Atiendo tu llamada, diseño tu proyecto y escribo cada línea de código.',
  // Foto del propietario (2026-09-30), vertical 594x1024 en WebP (38,6 KB) con el fondo
  // recortado, el polo con el logo JdD y el brillo blanco del flequillo retocado: va sin marco, sobre el fondo de la seccion y
  // centrada en el hueco cuadrado con `object-contain`. Nombre de archivo nuevo para que
  // ninguna cache sirva la version anterior. Si se retira, la seccion vuelve a una sola
  // columna sin hueco (null = sin imagen).
  foto: {
    src: '/img/juan-de-dios-polo.webp',
    alt: 'Juan de Dios, desarrollador de JdDLabs, con un polo negro con el logo JdD y los brazos cruzados.',
    ancho: 594,
    alto: 1024,
  },
};

export const contacto = {
  titular: '¿Hablamos de tu proyecto?',
  invitacion:
    'Cuéntame qué necesitas. Escríbeme por correo o utiliza el formulario y te responderé lo antes posible.',
};

// Herramientas de trabajo, agrupadas como en la maqueta aprobada por el propietario.
//
// No confundir con `proyecto.tecnologias`, que es el stack del sitio de Cristaleria
// Ruteña y solo se lee en el caso de estudio. Esto es el utillaje propio, y no es una
// metrica ni un dato de cliente: es una descripcion de con que trabaja Juan.
// Herramientas de trabajo: lista aportada por el propietario el 2026-09-24, transcrita
// sin añadir ni quitar ninguna (principio V: es lo que usa, no una afirmacion sobre
// resultados). El orden es el suyo. El 2026-10-01 "IA & APIs" pasa a "Integraciones" y
// se retira la fila "Herramientas" (propietario).
export const stack = [
  { id: 'lenguajes', categoria: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML5', 'CSS'] },
  { id: 'frameworks', categoria: 'Frameworks', items: ['React', 'Next.js', 'Express'] },
  { id: 'estilos', categoria: 'Estilos', items: ['Tailwind CSS', 'DaisyUI', 'CSS Modules', 'Bootstrap', 'Framer Motion'] },
  { id: 'runtime', categoria: 'Runtime & server', items: ['Node.js', 'Vercel', 'Cloudflare Workers'] },
  { id: 'datos', categoria: 'Bases de datos', items: ['MongoDB', 'MySQL', 'Firebase', 'Supabase'] },
  { id: 'cloud', categoria: 'Cloud & DevOps', items: ['Cloudflare', 'Cloudflare Pages', 'Docker', 'GitHub'] },
  { id: 'integraciones', categoria: 'Integraciones', items: ['OpenAI', 'Anthropic Claude', 'Stripe', 'Resend', 'Formspree'] },
  { id: 'agentes', categoria: 'Agentes & automatización', items: ['Claude Code', 'OpenCode', 'n8n'] },
];

// La clave `testimonio` NO existe a proposito (FR-007, principio V). El bloque de
// testimonio solo se construye si el propietario aporta una cita verificada. No se
// declara vacia ni comentada con texto de ejemplo.

export const secciones = [
  { id: 'inicio', nombre: 'Inicio' },
  { id: 'servicios', nombre: 'Servicios' },
  { id: 'proyecto', nombre: 'Proyecto destacado' },
  { id: 'sobre-mi', nombre: 'Sobre mí' },
  { id: 'contacto', nombre: 'Contacto' },
];
