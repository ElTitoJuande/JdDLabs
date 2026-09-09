// Copy cerrado de las cinco secciones (data-model.md §3).
// Ninguna seccion improvisa texto: todo lo que se lee en pantalla sale de aqui.
//
// NOTA DE VERIFICACION (principio V): los textos marcados con [EXACTO SPEC] estan
// copiados literalmente de spec.md. Los marcados con [PENDIENTE APROBACION] son
// descripciones que spec.md da por "cerradas" pero que no llegan a transcribir en
// ningun artefacto; se han redactado sin cifras, sin metricas y sin afirmaciones
// verificables, y estan pendientes de que el propietario las confirme o las sustituya.
// Ninguno de ellos afirma un resultado, un dato de cliente ni un testimonio.

export const hero = {
  // [EXACTO SPEC] FR-002
  titular: 'Desarrollo web para empresas',
  subtitulo:
    'Diseño y desarrollo de páginas web modernas, rápidas y adaptadas a las necesidades de cada negocio.',
  cta: 'Solicitar presupuesto',
};

export const servicios = [
  {
    id: 'web-corporativa',
    // [EXACTO SPEC] FR-003 (titulo)
    titulo: 'Web corporativa',
    // [PENDIENTE APROBACION]
    descripcion:
      'La web que presenta tu negocio: quién eres, qué ofreces y cómo contactar contigo. Diseño propio, carga rápida y pensada para leerse bien en el móvil.',
  },
  {
    id: 'tiendas-online',
    titulo: 'Tiendas online',
    // [PENDIENTE APROBACION]
    descripcion:
      'Catálogo, carrito y pasarela de pago para vender por internet, con un panel desde el que puedas gestionar tú los productos y los pedidos.',
  },
  {
    id: 'aplicaciones',
    titulo: 'Aplicaciones y soluciones web',
    // [PENDIENTE APROBACION]
    descripcion:
      'Herramientas a medida para lo que tu negocio hace cada día: reservas, presupuestos, inventario o gestión interna.',
  },
];

export const proyecto = {
  // [EXACTO SPEC] FR-004
  cliente: 'Cristalería Ruteña',
  // [PENDIENTE APROBACION]
  descripcion:
    'Sitio web completo para una cristalería de Rute: presentación de la empresa, catálogo de servicios y formulario de contacto. Interfaz en React con Vite y Tailwind, y una capa de servidor en PHP sobre MySQL.',
  // [EXACTO SPEC] FR-004
  tecnologias: ['React', 'Vite', 'Tailwind', 'PHP', 'MySQL'],
  firma: 'Proyecto realizado por Juan de Dios.',
  url: 'https://cristaleriarutena.es',
  textoEnlace: 'Visitar en vivo',
  // Vacio a proposito: las capturas reales del sitio del cliente todavia no se han
  // aportado (dependencia de spec.md). La seccion no renderiza ninguna imagen mientras
  // esta lista este vacia, en lugar de dejar un hueco o un marcador (principio V).
  capturas: [],
};

export const sobreMi = {
  // [PENDIENTE APROBACION] FR-005
  parrafo:
    'Soy Juan de Dios, desarrollador full stack. Trabajo desde Rute con empresas y autónomos de la localidad y de los alrededores, de principio a fin de cada proyecto.',
  // [EXACTO SPEC] Assumptions
  refuerzo:
    'La misma persona que atenderá tu llamada, diseñará tu proyecto y escribirá cada línea de código.',
};

export const contacto = {
  // [PENDIENTE APROBACION] FR-006
  invitacion:
    'Cuéntame qué necesitas y te respondo. Puedes llamarme, escribirme por WhatsApp o por correo, o dejarme un mensaje en el formulario.',
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
