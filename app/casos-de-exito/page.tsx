import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseGallery } from '../components/case-gallery';
import { PageHero } from '../components/page-hero';

export const metadata: Metadata = { title: 'Casos de éxito', description: 'Ejemplos demostrativos de proyectos de prevención y seguridad laboral desarrollados por ASSEL.' };

export default function CasosPage() {
  return <main className="inner-page"><PageHero index="05" eyebrow="Experiencia aplicada" title="Desafíos reales." accent="Resultados visibles." intro="Casos demostrativos que muestran nuestra forma de abordar una necesidad, construir una solución junto al cliente y dejar capacidades instaladas." image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=84" /><div className="cases-intro"><p className="eyebrow dark"><span /> Casos seleccionados</p><div><h2>La confianza se construye<br />mostrando cómo trabajamos.</h2><p>Los nombres y resultados presentados son demostrativos y serán reemplazados por experiencias autorizadas de ASSEL.</p></div></div><CaseGallery /><section className="inner-cta"><div><p className="eyebrow"><span /> Tu desafío puede ser el próximo</p><h2>Conversemos sobre el resultado que necesitas alcanzar.</h2></div><Link className="button-primary" href="/contacto">Iniciar conversación <span>→</span></Link></section></main>;
}
