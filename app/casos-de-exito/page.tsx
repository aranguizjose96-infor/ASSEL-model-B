import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseGallery } from '../components/case-gallery';
import { PageHero } from '../components/page-hero';
import { siteContent } from '../lib/content';

export const metadata: Metadata = { title: 'Casos de éxito', description: 'Ejemplos demostrativos de proyectos de prevención y seguridad laboral desarrollados por ASSEL.' };

export default function CasosPage() {
  const copy = siteContent.cases;
  return <main className="inner-page"><PageHero index="05" eyebrow={copy.hero.eyebrow} title={copy.hero.title} accent={copy.hero.accent} intro={copy.hero.intro} image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=84" /><div className="cases-intro"><p className="eyebrow dark"><span /> {copy.intro.eyebrow}</p><div><h2>{copy.intro.title}</h2><p>{copy.intro.copy}</p></div></div><CaseGallery /><section className="inner-cta"><div><p className="eyebrow"><span /> {copy.cta.eyebrow}</p><h2>{copy.cta.title}</h2></div><Link className="button-primary" href="/contacto">{copy.cta.button} <span>→</span></Link></section></main>;
}
