import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../components/page-hero';
import { ServiceExplorer } from '../components/service-explorer';

export const metadata: Metadata = { title: 'Servicios', description: 'Asesoría en gestión preventiva, documentación, capacitación, auditorías y seguridad de proyectos.' };

export default function ServiciosPage() {
  return <main className="inner-page"><PageHero index="03" eyebrow="Soluciones" title="Prevención diseñada" accent="para funcionar." intro="Desde una necesidad puntual hasta un sistema preventivo completo: combinamos diagnóstico, implementación y acompañamiento para producir avances sostenibles." image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=84" /><ServiceExplorer /><section className="inner-cta services-cta"><div><p className="eyebrow"><span /> Una solución a tu medida</p><h2>¿No encuentras exactamente lo que necesitas?</h2><p>Cuéntanos tu desafío y diseñaremos una ruta de trabajo adecuada a tu operación.</p></div><Link className="button-primary" href="/contacto">Diseñar una asesoría <span>→</span></Link></section></main>;
}
