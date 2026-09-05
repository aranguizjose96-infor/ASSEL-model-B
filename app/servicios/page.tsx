import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../components/page-hero';
import { ServiceExplorer } from '../components/service-explorer';
import { siteContent } from '../lib/content';

export const metadata: Metadata = { title: 'Servicios', description: 'Asesoría en gestión preventiva, documentación, capacitación, auditorías y seguridad de proyectos.' };

export default function ServiciosPage() {
  const copy = siteContent.services;
  return <main className="inner-page"><PageHero index="03" eyebrow={copy.hero.eyebrow} title={copy.hero.title} accent={copy.hero.accent} intro={copy.hero.intro} image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=84" /><ServiceExplorer /><section className="inner-cta services-cta"><div><p className="eyebrow"><span /> {copy.cta.eyebrow}</p><h2>{copy.cta.title}</h2><p>{copy.cta.intro}</p></div><Link className="button-primary" href="/contacto">{copy.cta.button} <span>→</span></Link></section></main>;
}
