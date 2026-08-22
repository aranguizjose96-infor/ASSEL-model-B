import type { Metadata } from 'next';
import { ContactForm } from '../components/contact-form';
import { PageHero } from '../components/page-hero';

export const metadata: Metadata = { title: 'Contacto | ASSEL SpA', description: 'Solicita una asesoría en prevención de riesgos y seguridad laboral con ASSEL SpA.' };

export default function ContactoPage() {
  return <main className="inner-page contact-page"><PageHero index="05" eyebrow="Conversemos" title="Cuéntanos el desafío." accent="Diseñemos la respuesta." intro="Una conversación inicial puede ayudarnos a entender tu contexto, ordenar prioridades y recomendar el mejor siguiente paso." />
    <section className="contact-layout"><div className="contact-info"><p className="eyebrow dark"><span /> Contacto directo</p><h2>Estamos disponibles para escuchar.</h2><p>Escríbenos mediante el formulario o utiliza WhatsApp si necesitas una respuesta más directa.</p><div className="contact-options"><a href="https://wa.me/56920510214?text=Hola%20ASSEL%2C%20quiero%20solicitar%20una%20asesor%C3%ADa"><span>WA</span><p><small>WhatsApp</small><strong>+56 9 2051 0214</strong></p><b>↗</b></a><a href="mailto:aranguizjose96@gmail.com"><span>@</span><p><small>Correo</small><strong>aranguizjose96@gmail.com</strong></p><b>↗</b></a><div><span>CL</span><p><small>Ubicación</small><strong>Santiago de Chile</strong></p></div></div><div className="contact-hours"><small>Horario de atención</small><p>Lunes a viernes<br /><b>09:00 — 18:00</b></p></div><p className="provisional-note">Los datos de contacto son provisorios y se reemplazarán antes de la publicación definitiva.</p></div><ContactForm /></section>
    <section className="contact-map"><div><span>SCL</span><p>Santiago de Chile</p><small>Cobertura presencial en la Región Metropolitana y acompañamiento a nivel nacional.</small></div></section>
  </main>;
}
