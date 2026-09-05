import siteContentJson from '../../content/site-content.json';

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

export type EditableSiteContent = typeof siteContentJson;
export const siteContent = siteContentJson as EditableSiteContent;

const serviceImages: Record<string, string> = {
  'planes-emergencia': '/images/servicio-emergencias.jpg',
  'sistemas-contra-incendios': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=82',
  capacitacion: '/images/capacitacion-cultura.jpg',
  'implementacion-ds44': '/images/assel-inspeccion-prevencion.webp',
  'resoluciones-sanitarias': '/images/servicio-tramites.jpg',
  'ley-karin': '/images/servicio-ley-karin.jpg',
  'organismos-administradores': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82',
};

const caseImages: Record<string, { image: string; gallery: string[] }> = {
  'logistica-metropolitana': {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=82',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=82',
    ],
  },
  'montaje-industrial': {
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=82',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1400&q=82',
    ],
  },
  'servicios-tecnicos': {
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=82',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=82',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=82',
    ],
  },
};

export const defaultServices: Service[] = siteContent.services.items.map((service, index) => ({
  ...service,
  number: String(index + 1).padStart(2, '0'),
  image: serviceImages[service.id],
}));

export const defaultCases: CaseStudy[] = siteContent.cases.items.map((item) => ({
  ...item,
  ...caseImages[item.id],
}));

export const defaultContent: SiteContent = {
  heroTitle: siteContent.home.hero.title,
  heroAccent: siteContent.home.hero.accent,
  heroIntro: siteContent.home.hero.intro,
  services: defaultServices,
  cases: defaultCases,
};
