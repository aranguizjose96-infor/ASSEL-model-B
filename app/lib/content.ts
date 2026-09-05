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
    id: 'planes-emergencia', number: '01', tag: 'Emergencias', title: 'Planes de Emergencia y GRD',
    summary: 'Preparación práctica para anticipar amenazas y responder de manera coordinada ante situaciones críticas.',
    description: 'Diseñamos y actualizamos planes de emergencia y herramientas de Gestión del Riesgo de Desastres (GRD), ajustados a las amenazas, instalaciones y personas de cada organización o comunidad.',
    scope: ['Identificación de amenazas y escenarios', 'Planes, procedimientos y rutas de evacuación', 'Roles, brigadas y puntos de encuentro', 'Capacitación, simulacros y mejora del plan'],
    benefits: ['Respuesta coordinada', 'Roles y recursos conocidos', 'Mayor protección y continuidad operacional'],
    audience: 'Empresas, industrias, oficinas, centros logísticos, establecimientos educacionales, edificios y comunidades.',
    image: '/images/servicio-emergencias.jpg',
  },
  {
    id: 'sistemas-contra-incendios', number: '02', tag: 'Incendios', title: 'Mantenimiento de Sistemas Contra Incendios',
    summary: 'Inspección y mantenimiento planificado para conservar operativos los sistemas de protección contra incendios.',
    description: 'Coordinamos la revisión, el mantenimiento y la trazabilidad de los sistemas contra incendios, priorizando su disponibilidad, el registro de las intervenciones y la corrección oportuna de hallazgos.',
    scope: ['Levantamiento e inventario de sistemas y equipos', 'Inspección y mantenimiento preventivo', 'Pruebas operativas y registros de intervención', 'Informe de hallazgos y plan de acciones correctivas'],
    benefits: ['Mayor disponibilidad de los sistemas', 'Intervenciones y hallazgos trazables', 'Respuesta más confiable ante emergencias'],
    audience: 'Edificios, condominios, bodegas, industrias, comercios e instalaciones que requieren mantener operativos sus sistemas de protección contra incendios.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=82',
  },
  {
    id: 'capacitacion', number: '03', tag: 'Personas', title: 'Capacitación y desarrollo de una Cultura Preventiva',
    summary: 'Formación práctica para que la prevención se convierta en una conducta cotidiana.',
    description: 'Diseñamos experiencias breves, aplicadas y conectadas con riesgos reales. Medimos comprensión y apoyamos a jefaturas para sostener los cambios.',
    scope: ['Charlas y talleres presenciales', 'Inducciones y derecho a saber', 'Campañas de cultura preventiva', 'Entrenamiento a supervisores'],
    benefits: ['Mayor participación', 'Mensajes comprensibles', 'Liderazgo visible'],
    audience: 'Equipos operativos, supervisores y organizaciones que buscan activar una cultura preventiva real.',
    image: '/images/capacitacion-cultura.jpg',
  },
  {
    id: 'implementacion-ds44', number: '04', tag: 'Normativa', title: 'Cumplimiento del DS N.º 44',
    summary: 'Una gestión preventiva actualizada, proporcional al tamaño y a la realidad de tu organización.',
    description: 'Acompañamos el diagnóstico y cumplimiento de los instrumentos preventivos establecidos por el Decreto Supremo N.º 44, conectando responsabilidades, participación de las personas trabajadoras y seguimiento en una ruta aplicable.',
    scope: ['Diagnóstico de cumplimiento y brechas', 'Matriz de peligros y evaluación de riesgos', 'Programa de trabajo preventivo', 'Estructura, responsabilidades y seguimiento'],
    benefits: ['Cumplimiento trazable', 'Riesgos mejor priorizados', 'Gestión preventiva sostenible'],
    audience: 'Empresas, PYMES y organizaciones que necesitan implementar, actualizar o fortalecer su gestión preventiva conforme al DS N.º 44.',
    image: '/images/assel-inspeccion-prevencion.webp',
  },
  {
    id: 'resoluciones-sanitarias', number: '05', tag: 'Permisos', title: 'Resoluciones Sanitarias ante la SEREMI de Salud',
    summary: 'Acompañamiento técnico y documental para gestionar autorizaciones sanitarias con mayor claridad.',
    description: 'Orientamos la preparación, revisión y seguimiento de antecedentes para solicitudes de resoluciones sanitarias ante la SEREMI de Salud, considerando los requisitos aplicables a cada actividad e instalación.',
    scope: ['Revisión inicial de requisitos y antecedentes', 'Preparación y orden del expediente documental', 'Seguimiento de observaciones de la autoridad', 'Apoyo durante las etapas de la tramitación'],
    benefits: ['Expedientes más completos', 'Menos reprocesos', 'Mayor visibilidad del estado de la gestión'],
    audience: 'Emprendimientos, PYMES y empresas que necesitan iniciar, regularizar o ampliar actividades sujetas a autorización sanitaria.',
    image: '/images/servicio-tramites.jpg',
  },
  {
    id: 'ley-karin', number: '06', tag: 'Convivencia', title: 'Implementación de la Ley Karin',
    summary: 'Protocolos, capacitación y acompañamiento para construir ambientes laborales respetuosos.',
    description: 'Apoyamos a la organización en la prevención del acoso laboral, el acoso sexual y la violencia en el trabajo, mediante herramientas claras, formación y orientación documental alineada con la Ley N.º 21.643.',
    scope: ['Diagnóstico de cumplimiento', 'Protocolo de prevención y canales de denuncia', 'Actualización del reglamento interno', 'Capacitación y orientación en procesos internos'],
    benefits: ['Procedimientos claros', 'Mayor confianza de los equipos', 'Menor exposición organizacional'],
    audience: 'Empresas, PYMES, instituciones y organizaciones que requieren implementar o fortalecer sus medidas preventivas y procedimientos internos.',
    image: '/images/servicio-ley-karin.jpg',
  },
  {
    id: 'organismos-administradores', number: '07', tag: 'Acompañamiento', title: 'Asesoría técnica ante organismos administradores',
    summary: 'Apoyo para coordinar requerimientos y acciones preventivas con ACHS, Mutual de Seguridad e ISL.',
    description: 'Acompañamos a la organización en la coordinación técnica con su organismo administrador del Seguro de la Ley N.º 16.744, ayudando a ordenar requerimientos, asistencia técnica, medidas prescritas y evidencias de cumplimiento.',
    scope: ['Revisión de requerimientos y medidas prescritas', 'Coordinación de asistencia técnica y evaluaciones', 'Seguimiento de compromisos y acciones preventivas', 'Preparación de antecedentes y evidencias de cumplimiento'],
    benefits: ['Interlocución técnica más clara', 'Compromisos y plazos trazables', 'Cierre oportuno de requerimientos'],
    audience: 'Entidades empleadoras afiliadas a ACHS, Mutual de Seguridad o ISL que requieren apoyo para gestionar solicitudes, medidas y asistencia preventiva.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82',
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
