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
  titular: 'Desarrollo web para pymes y autónomos',
  subtitulo:
    'Diseño y desarrollo de páginas web modernas, rápidas y adaptadas a las necesidades de cada negocio.',
  cta: 'Solicitar presupuesto',
};

export const servicios = [
  {
    id: 'web-corporativa',
    titulo: 'Web corporativa',
    descripcion:
      'Páginas para presentar tu negocio con una imagen profesional: quiénes sois, qué ofrecéis y cómo contactar, lista para generar confianza desde el primer segundo.',
  },
  {
    id: 'tiendas-online',
    titulo: 'Tiendas online',
    descripcion:
      'Tiendas funcionales y fáciles de gestionar, pensadas para vender sin fricciones ni complicaciones técnicas.',
  },
  {
    id: 'aplicaciones',
    titulo: 'Aplicaciones y soluciones web',
    descripcion:
      'Herramientas a medida cuando una plantilla se queda corta: paneles de gestión, reservas, integraciones con lo que ya usas.',
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
};

export const contacto = {
  invitacion:
    '¿Hablamos de tu proyecto? Escríbeme por WhatsApp, llama o rellena el formulario — te respondo en menos de 24 horas.',
};

// La clave `testimonio` NO existe a proposito (FR-007, principio V). El bloque de
// testimonio solo se construye si el propietario aporta una cita verificada. No se
// declara vacia ni comentada con texto de ejemplo.

export const secciones = [
  { id: 'inicio', nombre: 'Inicio' },
  { id: 'proyecto', nombre: 'Proyecto destacado' },
  { id: 'servicios', nombre: 'Servicios' },
  { id: 'sobre-mi', nombre: 'Sobre mí' },
  { id: 'contacto', nombre: 'Contacto' },
];
