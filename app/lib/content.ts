export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  scope: string[];
  benefits: string[];
  audience: string;
  tag: string;
  image: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  sector: string;
  date: string;
  challenge: string;
  result: string;
  metric: string;
  image: string;
  gallery: string[];
};

export type SiteContent = {
  heroTitle: string;
  heroAccent: string;
  heroIntro: string;
  services: Service[];
  cases: CaseStudy[];
};

export const defaultServices: Service[] = [
  {
    id: 'gestion-preventiva', number: '01', tag: 'Estrategia', title: 'Gestión preventiva integral',
    summary: 'Diagnóstico, matrices de riesgo y planes de trabajo conectados con tu operación.',
    description: 'Diseñamos un sistema preventivo que transforma obligaciones en decisiones concretas, prioriza brechas y asigna responsables, plazos e indicadores.',
    scope: ['Diagnóstico de situación preventiva', 'Matriz de identificación de peligros y evaluación de riesgos', 'Programa de trabajo y seguimiento', 'Apoyo a Comités Paritarios'],
    benefits: ['Prioridades claras', 'Trazabilidad de avances', 'Mejora continua'],
    audience: 'Empresas que necesitan ordenar, actualizar o fortalecer su gestión de seguridad y salud en el trabajo.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82',
  },
  {
    id: 'cumplimiento-documental', number: '02', tag: 'Control', title: 'Cumplimiento documental',
    summary: 'Reglamentos, protocolos y registros consistentes, disponibles y fáciles de demostrar.',
    description: 'Levantamos, ordenamos y actualizamos la documentación preventiva para que cada documento tenga un propósito operativo y una evidencia asociada.',
    scope: ['Reglamento interno y procedimientos', 'Obligaciones de informar', 'Registros y respaldos preventivos', 'Carpetas de arranque y acreditación'],
    benefits: ['Evidencia disponible', 'Menor exposición documental', 'Información centralizada'],
    audience: 'Organizaciones con documentación dispersa, desactualizada o exigencias de mandantes y fiscalizadores.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=82',
  },
  {
    id: 'capacitacion', number: '03', tag: 'Personas', title: 'Capacitación y cultura',
    summary: 'Formación práctica para que la prevención se convierta en una conducta cotidiana.',
    description: 'Diseñamos experiencias breves, aplicadas y conectadas con riesgos reales. Medimos comprensión y apoyamos a jefaturas para sostener los cambios.',
    scope: ['Charlas y talleres presenciales', 'Inducciones y derecho a saber', 'Campañas de cultura preventiva', 'Entrenamiento a supervisores'],
    benefits: ['Mayor participación', 'Mensajes comprensibles', 'Liderazgo visible'],
    audience: 'Equipos operativos, supervisores y organizaciones que buscan activar una cultura preventiva real.',
    image: '/images/capacitacion-cultura.jpg',
  },
  {
    id: 'auditorias', number: '04', tag: 'Verificación', title: 'Auditorías e inspecciones',
    summary: 'Revisiones en terreno que convierten hallazgos en planes de mejora accionables.',
    description: 'Evaluamos condiciones, prácticas y controles críticos con una mirada independiente. Entregamos evidencia visual, responsables y fechas de cierre.',
    scope: ['Inspecciones planeadas', 'Auditorías de cumplimiento', 'Observaciones de conducta', 'Seguimiento de acciones correctivas'],
    benefits: ['Brechas visibles', 'Acciones priorizadas', 'Seguimiento verificable'],
    audience: 'Faenas, instalaciones, centros logísticos, oficinas y proyectos que requieren control periódico.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=82',
  },
  {
    id: 'investigacion', number: '05', tag: 'Aprendizaje', title: 'Investigación de incidentes',
    summary: 'Análisis de causas para evitar repeticiones y recuperar el control de la operación.',
    description: 'Facilitamos investigaciones estructuradas, identificamos causas organizacionales y apoyamos la implementación de medidas correctivas eficaces.',
    scope: ['Levantamiento de antecedentes', 'Análisis causal', 'Informe y plan correctivo', 'Verificación de eficacia'],
    benefits: ['Aprendizaje organizacional', 'Causas mejor comprendidas', 'Controles sostenibles'],
    audience: 'Empresas que necesitan investigar incidentes de manera rigurosa y traducir resultados en prevención.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=82',
  },
  {
    id: 'proyectos', number: '06', tag: 'Proyectos', title: 'Gestión HSE para proyectos',
    summary: 'Acompañamiento preventivo desde la planificación hasta el cierre del proyecto.',
    description: 'Integramos seguridad, salud y ambiente a la programación del proyecto, coordinando requisitos, contratistas, terreno y reportabilidad.',
    scope: ['Plan de seguridad del proyecto', 'Acreditación de contratistas', 'Coordinación preventiva en terreno', 'Indicadores e informes ejecutivos'],
    benefits: ['Inicio ordenado', 'Coordinación transversal', 'Continuidad operacional'],
    audience: 'Proyectos de construcción, montaje, mantenimiento, logística y servicios técnicos.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=82',
  },
  {
    id: 'implementacion-ds44', number: '07', tag: 'Normativa', title: 'Implementación del DS N.º 44',
    summary: 'Una gestión preventiva actualizada, proporcional al tamaño y realidad de tu organización.',
    description: 'Acompañamos la implementación y mejora de los instrumentos preventivos establecidos por el Decreto Supremo N.º 44, conectando diagnóstico, responsabilidades, participación de las personas trabajadoras y seguimiento en una ruta aplicable.',
    scope: ['Diagnóstico de cumplimiento y brechas', 'Matriz de peligros y evaluación de riesgos', 'Programa de trabajo preventivo', 'Estructura, responsabilidades y seguimiento'],
    benefits: ['Cumplimiento trazable', 'Riesgos mejor priorizados', 'Gestión preventiva sostenible'],
    audience: 'Empresas, PYMES y organizaciones que necesitan implementar, actualizar o fortalecer su gestión preventiva conforme al DS N.º 44.',
    image: '/images/assel-inspeccion-prevencion.webp',
  },
  {
    id: 'ley-karin', number: '08', tag: 'Convivencia', title: 'Implementación de la Ley Karin',
    summary: 'Protocolos, capacitación y acompañamiento para construir ambientes laborales respetuosos.',
    description: 'Apoyamos a la organización en la prevención del acoso laboral, el acoso sexual y la violencia en el trabajo, mediante herramientas claras, formación y orientación documental alineada con la Ley N.º 21.643.',
    scope: ['Diagnóstico de cumplimiento', 'Protocolo de prevención y canales de denuncia', 'Actualización del reglamento interno', 'Capacitación y orientación en procesos internos'],
    benefits: ['Procedimientos claros', 'Mayor confianza de los equipos', 'Menor exposición organizacional'],
    audience: 'Empresas, PYMES, instituciones y organizaciones que requieren implementar o fortalecer sus medidas preventivas y procedimientos internos.',
    image: '/images/servicio-ley-karin.jpg',
  },
  {
    id: 'planes-emergencia', number: '09', tag: 'Emergencias', title: 'Planes de emergencia y evacuación',
    summary: 'Preparación práctica para responder de manera coordinada ante situaciones críticas.',
    description: 'Diseñamos y actualizamos planes de emergencia ajustados a las amenazas, instalaciones y personas de cada organización o comunidad, definiendo procedimientos, roles y recursos para una respuesta oportuna.',
    scope: ['Identificación de amenazas y escenarios', 'Procedimientos y rutas de evacuación', 'Roles, brigadas y puntos de encuentro', 'Capacitación, simulacros y mejora del plan'],
    benefits: ['Respuesta coordinada', 'Roles conocidos', 'Mayor protección de personas e infraestructura'],
    audience: 'Empresas, industrias, oficinas, centros logísticos, establecimientos educacionales, edificios y comunidades.',
    image: '/images/servicio-emergencias.jpg',
  },
  {
    id: 'patentes-seremi', number: '10', tag: 'Permisos', title: 'Patentes y trámites sanitarios',
    summary: 'Acompañamiento documental para ordenar permisos municipales y gestiones ante la autoridad sanitaria.',
    description: 'Orientamos la preparación, revisión y seguimiento de antecedentes para patentes comerciales, resoluciones sanitarias y trámites ante la SEREMI de Salud, considerando los requisitos aplicables a cada actividad.',
    scope: ['Revisión inicial de requisitos y antecedentes', 'Preparación del expediente documental', 'Gestión y seguimiento de observaciones', 'Coordinación de trámites municipales y sanitarios'],
    benefits: ['Expedientes más ordenados', 'Menos reprocesos', 'Visibilidad del estado de cada gestión'],
    audience: 'Emprendimientos, PYMES y empresas que necesitan iniciar, regularizar o ampliar actividades sujetas a permisos municipales o sanitarios.',
    image: '/images/servicio-tramites.jpg',
  },
];

export const defaultCases: CaseStudy[] = [
  {
    id: 'logistica-metropolitana', title: 'Centro logístico metropolitano', sector: 'Logística', date: 'Marzo 2026',
    challenge: 'Documentación dispersa, controles distintos por turno y baja trazabilidad de hallazgos operacionales.',
    result: 'Se implementó una ruta preventiva única, tablero de acciones y estándares visuales para supervisores.',
    metric: '100% de áreas críticas con control asignado',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=82',
    gallery: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=82', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=82'],
  },
  {
    id: 'montaje-industrial', title: 'Montaje industrial sin improvisación', sector: 'Ingeniería', date: 'Noviembre 2025',
    challenge: 'Proyecto de alta coordinación con contratistas, tareas simultáneas y cambios frecuentes de planificación.',
    result: 'ASSEL integró permisos, análisis de trabajo y reuniones de coordinación en una rutina operacional simple.',
    metric: '12 semanas de acompañamiento en terreno',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=82',
    gallery: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=82', 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1400&q=82'],
  },
  {
    id: 'servicios-tecnicos', title: 'Cultura preventiva para equipos móviles', sector: 'Servicios técnicos', date: 'Agosto 2025',
    challenge: 'Equipos distribuidos con criterios diferentes para evaluar riesgos antes de cada intervención.',
    result: 'Se co-diseñó una pauta móvil, microcapacitaciones y conversaciones de seguridad lideradas por supervisores.',
    metric: '4 sedes operando bajo un mismo estándar',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=82',
    gallery: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=82', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=82'],
  },
];

export const defaultContent: SiteContent = {
  heroTitle: 'Prevenir con criterio.',
  heroAccent: 'Avanzar con confianza.',
  heroIntro: 'Convertimos la seguridad laboral en una ventaja operacional: menos incertidumbre, mejores decisiones y equipos que saben cómo actuar.',
  services: defaultServices,
  cases: defaultCases,
};
