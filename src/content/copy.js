// Copy cerrado de las cinco secciones (data-model.md §3).
// Ninguna seccion improvisa texto: todo lo que se lee en pantalla sale de aqui.
//
// Fuente: copy-portfolio.md, version definitiva aportada por el propietario el
// 2026-09-09. Sustituye por completo al copy provisional anterior. Se transcribe
// literalmente, sin reescrituras.
//
// Principio 70/30: en la capa principal no entra jerga tecnica. La version ampliada
// del stack vive solo en la pagina opcional de caso de estudio.

export const hero = {
  // Eyebrow del hero: quien hace el trabajo (propietario, 2026-09-24). Se lee "Juan de
  // Dios · Desarrollador independiente"; en dos piezas para poder partirlo por el punto
  // en movil. Acompaña al lugar, que se lee de identity.js. Las versalitas, del CSS.
  eyebrow: { nombre: 'Juan de Dios', rol: 'Desarrollador independiente' },
  // El h1 se lee entero como "Desarrollo web para pymes y autónomos": los segmentos
  // solo marcan que palabras van en la serif de enfasis (constitucion 3.1.0).
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
    resto: 'Diseño y desarrollo a medida, de principio a fin. De lo técnico me encargo yo; tú, de lo tuyo.',
  },
  cta: 'Solicitar presupuesto',
  // Compromisos bajo el hero. Principio V: cifras dadas y verificadas explicitamente por
  // el propietario el 2026-09-23. No son metricas de resultado sino como trabaja: un solo
  // interlocutor, ninguna plantilla, respuesta por WhatsApp en menos de 24 h. Si alguna
  // deja de ser cierta, se quita el item; no se sustituye por otra cifra.
  // `lectura` es lo que oye el lector de pantalla cuando la cifra lleva simbolos.
  compromisos: [
    { cifra: '1', texto: 'Interlocutor, del primer café al lanzamiento' },
    { cifra: '0', texto: 'Plantillas. Código escrito para tu negocio' },
    { cifra: '<24 h', lectura: 'Menos de 24 horas', texto: 'Respuesta por WhatsApp' },
  ],
  // Segunda accion del hero, introducida por la maqueta v2: lleva al unico proyecto
  // publicable que hay. Es navegacion, no una afirmacion sobre el negocio.
  ctaSecundario: 'Ver trabajo',
};

// Pie (2026-09-24). `eyebrow` es copy nuevo, tomado de la referencia visual con el visto
// bueno pendiente del propietario. `descripcion` NO es nueva: es la del JSON-LD de negocio
// local de index.html, literal.
export const pie = {
  eyebrow: '¿Listo para empezar?',
  descripcion: 'Desarrollo web para pymes y autónomos en Rute y alrededores.',
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
      'Páginas para presentar tu negocio con una imagen profesional: quiénes sois, qué ofrecéis y cómo contactar, lista para generar confianza desde el primer segundo.',
    // Claves: el trabajo que hay detras de cada servicio (propietario, 2026-09-24), no un
    // resumen de la descripcion.
    claves: ['Diseño a medida', 'UI/UX', 'Responsive', 'SEO on-page'],
  },
  {
    id: 'tiendas-online',
    titulo: 'Tiendas online',
    descripcion:
      'Tiendas funcionales y fáciles de gestionar, pensadas para vender sin fricciones ni complicaciones técnicas.',
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
    'Cristalería Ruteña lleva desde 1977 trabajando el vidrio y el aluminio en Rute: carpintería de aluminio, vidrio a medida, toldos y persianas para vivienda, negocio y proyectos técnicos. Diseñé y desarrollé su web desde cero — una página que presenta sus servicios, su proceso de trabajo y los proyectos ya realizados en Sevilla, Estepona y Marbella, con un objetivo claro: que pedir presupuesto sea tan fácil como escribir por WhatsApp.',
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
  // estudio leen esta misma clave. Es un recorte real de la portada del cliente,
  // exportado a 1356x904 desde la captura de pagina completa de 5441px que ya no vive
  // en el repositorio. El corte cae justo en el borde inferior de la franja del hero,
  // asi que la imagen entra entera en un marco 3:2 y el navegador no recorta nada por
  // CSS. Si esta clave vuelve a null no se dibuja imagen ni marco vacio (principio V).
  captura: {
    src: '/img/portadaCRutena.webp',
    alt: 'Portada de cristaleriarutena.es sobre una fotografía de la fachada del taller, con el titular “Rediseñamos espacios con vidrio, aluminio y soluciones a medida” y los botones de WhatsApp y de llamada.',
    ancho: 1356,
    alto: 904,
  },
};

// Stack ampliado y narrativa del proyecto. Solo para caso-cristaleria.html: esa pagina
// si admite profundidad tecnica. No se usa en la portada.
//
// Desde el 2026-09-10 la Fase 8 deja de ser opcional y pasa a alcance comprometido, por
// decision del propietario: la portada ya solo muestra la tarjeta, asi que sin esta
// pagina el proyecto destacado se queda sin ningun sitio donde demostrarse.
export const casoEstudio = {
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
  rol: 'Diseño y desarrollo completo — Juan de Dios Pérez Moreno',
  reto:
    'La web anterior de Cristalería Ruteña tenía más de diez años y ya no reflejaba la experiencia y calidad real del negocio. El objetivo era trasladar esa calidad al entorno digital: presentar servicios y proyectos de forma clara y visual, mejorar la experiencia en móvil y facilitar las consultas y solicitudes de presupuesto.',
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
    'Soy desarrollador web y trabajo con empresas que necesitan una presencia digital profesional o soluciones web adaptadas a su negocio. Trabajo desde Rute con empresas de la localidad y alrededores.',
  refuerzo:
    'La misma persona que atenderá tu llamada, diseñará tu proyecto y escribirá cada línea de código.',
  // Foto del propietario (2026-09-24), 571x571 en WebP (13,2 KB) con el fondo
  // recortado: va sin marco, sobre el fondo de la seccion. Nombre de archivo nuevo para
  // que ninguna cache sirva la version con fondo. Si se retira, la seccion vuelve a una
  // sola columna sin hueco (null = sin imagen).
  foto: {
    src: '/img/juan-de-dios-recorte.webp',
    alt: 'Juan de Dios, desarrollador de JdDLabs, con polo negro y los brazos cruzados.',
    ancho: 571,
    alto: 571,
  },
};

export const contacto = {
  // Desde la v2 el copy del propietario se lee partido en dos: la pregunta es el
  // titular de seccion y el resto la invitacion que va debajo. Ni una palabra
  // reescrita ni añadida respecto a la version anterior.
  titular: '¿Hablamos de tu proyecto?',
  invitacion:
    'Escríbeme por WhatsApp, llama o rellena el formulario — te respondo en menos de 24 horas.',
};

// Herramientas de trabajo, agrupadas como en la maqueta aprobada por el propietario.
//
// No confundir con `proyecto.tecnologias`, que es el stack del sitio de Cristaleria
// Ruteña y solo se lee en el caso de estudio. Esto es el utillaje propio, y no es una
// metrica ni un dato de cliente: es una descripcion de con que trabaja Juan.
// Herramientas de trabajo: lista aportada por el propietario el 2026-09-24, transcrita
// sin añadir ni quitar ninguna (principio V: es lo que usa, no una afirmacion sobre
// resultados). Nueve categorias; el orden es el suyo.
export const stack = [
  { id: 'lenguajes', categoria: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML5', 'CSS'] },
  { id: 'frameworks', categoria: 'Frameworks', items: ['React', 'Next.js', 'Express'] },
  { id: 'estilos', categoria: 'Estilos', items: ['Tailwind CSS', 'DaisyUI', 'CSS Modules', 'Bootstrap', 'Framer Motion'] },
  { id: 'runtime', categoria: 'Runtime & server', items: ['Node.js', 'Vercel', 'Cloudflare Workers'] },
  { id: 'datos', categoria: 'Bases de datos', items: ['MongoDB', 'MySQL', 'Firebase', 'Supabase'] },
  { id: 'cloud', categoria: 'Cloud & DevOps', items: ['Cloudflare', 'Cloudflare Pages', 'Docker', 'GitHub'] },
  { id: 'ia', categoria: 'IA & APIs', items: ['OpenAI', 'Anthropic Claude', 'Stripe', 'Resend', 'Formspree'] },
  { id: 'agentes', categoria: 'Agentes & automatización', items: ['Claude Code', 'OpenCode', 'n8n'] },
  { id: 'herramientas', categoria: 'Herramientas', items: ['Git', 'VS Code', 'Cursor', 'Windsurf', 'Vite', 'npm', 'pnpm'] },
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
