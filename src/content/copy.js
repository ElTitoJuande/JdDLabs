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
  descripcion:
    'Cristalería Ruteña lleva desde 1977 trabajando el vidrio y el aluminio en Rute: carpintería de aluminio, vidrio a medida, toldos y persianas para vivienda, negocio y proyectos técnicos. Diseñé y desarrollé su web desde cero — una página que presenta sus servicios, su proceso de trabajo y los proyectos ya realizados en Sevilla, Estepona y Marbella, con un objetivo claro: que pedir presupuesto sea tan fácil como escribir por WhatsApp.',
  // Badge simplificado a proposito (principio 70/30). El proyecto NO usa PHP ni MySQL:
  // no tiene base de datos ni CMS. El stack ampliado solo aparece en el caso de estudio.
  tecnologias: ['React', 'Vite', 'Tailwind', 'Cloudflare'],
  firma: 'Proyecto realizado por Juan de Dios.',
  url: 'https://cristaleriarutena.es',
  textoEnlace: 'Visitar en vivo',
  // Vacio a proposito: las capturas reales del sitio del cliente todavia no se han
  // aportado. La seccion no renderiza ninguna imagen mientras esta lista este vacia,
  // en lugar de dejar un hueco o un marcador (principio V).
  capturas: [],
};

// Stack ampliado y narrativa del proyecto. Solo para caso-cristaleria.html (Fase 8,
// opcional): esa pagina si admite profundidad tecnica. No se usa en la portada.
export const casoEstudio = {
  cliente: 'Cristalería Ruteña',
  rol: 'Diseño y desarrollo completo (frontend + backend serverless)',
  stack: [
    'React',
    'Vite',
    'Tailwind',
    'Cloudflare Pages Functions',
    'Resend (formulario de contacto)',
    'Cloudflare R2 (gestión de imágenes)',
  ],
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
