'use client';

import Link from 'next/link';
import { useSiteContent } from './content-provider';
import { HeroVideoRotator } from './hero-video-rotator';

export function HomePage() {
  const { content } = useSiteContent();
  const featuredServices = content.services.slice(0, 3);
  const featuredCases = content.cases.slice(0, 2);

  return (
    <main>
      <section className="hero">
        <HeroVideoRotator />
        <div className="hero-wash" />
        <div className="hero-content" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Gestión preventiva para empresas que avanzan</p>
            <h1>{content.heroTitle}<br /><em>{content.heroAccent}</em></h1>
            <p className="hero-intro">{content.heroIntro}</p>
            <div className="hero-actions"><Link className="button-primary" href="/contacto">Conversemos de tu empresa <span>→</span></Link><Link className="button-ghost" href="/servicios"><span className="play">＋</span> Explorar servicios</Link></div>
          </div>
          <aside className="assurance-card" aria-label="Método de trabajo ASSEL">
            <div className="assurance-top"><span className="live-dot"><i /> Acompañamiento activo</span><span className="card-code">ASL / 360</span></div>
            <div className="assurance-heading"><span className="orbit"><b>360°</b></span><div><small>Una mirada integral</small><h2>De la obligación<br />a la acción.</h2></div></div>
            <div className="assurance-list"><div><span>01</span><p><b>Diagnosticar</b><small>Entender brechas y prioridades</small></p><i>✓</i></div><div><span>02</span><p><b>Implementar</b><small>Construir controles aplicables</small></p><i>✓</i></div><div><span>03</span><p><b>Acompañar</b><small>Medir, corregir y mejorar</small></p><i>✓</i></div></div>
            <p className="assurance-foot">Santiago · Cobertura nacional</p>
          </aside>
        </div>
        <div className="hero-rail"><p><span>01</span> Cumplimiento que se demuestra</p><p><span>02</span> Riesgos que se anticipan</p><p><span>03</span> Equipos que se involucran</p><div className="scroll-cue"><i /> Descubre cómo</div></div>
      </section>

      <section className="services-preview">
        <div className="section-heading"><p className="eyebrow dark"><span /> Soluciones ASSEL</p><div><h2>Seguridad que se integra<br />a tu forma de trabajar.</h2><p>No entregamos documentos para archivar. Diseñamos sistemas preventivos claros, utilizables y sostenibles.</p></div></div>
        <div className="service-grid">{featuredServices.map((service) => <article className="service-card" key={service.id}><div className="service-meta"><span>{service.number}</span><small>{service.tag}</small></div><h3>{service.title}</h3><p>{service.summary}</p><Link href="/servicios">Conocer solución <span>↗</span></Link></article>)}</div>
        <Link className="text-link section-link" href="/servicios">Ver todas las soluciones <span>→</span></Link>
      </section>

      <section className="why-section">
        <div className="why-image"><img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1500&q=82" alt="Profesional de seguridad revisando una operación industrial" /><div className="image-note"><small>Nuestro enfoque</small><strong>Presencia técnica.<br />Cercanía real.</strong></div></div>
        <div className="why-content"><p className="eyebrow dark"><span /> Por qué ASSEL</p><h2>La prevención funciona cuando las personas pueden usarla.</h2><p>Traducimos la normativa y el conocimiento técnico en herramientas simples para jefaturas, supervisores y equipos de trabajo.</p><div className="why-list"><div><span>01</span><p><b>Mirada operacional</b><small>Soluciones diseñadas para funcionar en terreno.</small></p></div><div><span>02</span><p><b>Acompañamiento cercano</b><small>Estamos presentes desde el diagnóstico hasta la verificación.</small></p></div><div><span>03</span><p><b>Evidencia y trazabilidad</b><small>Cada avance queda respaldado y listo para ser demostrado.</small></p></div></div><Link className="button-dark" href="/nosotros">Conoce nuestra forma de trabajar <span>↗</span></Link></div>
      </section>

      <section className="regulation-band"><div><span className="regulation-number">44</span><p><small>Gestión preventiva actualizada</small><strong>DS N.º 44</strong></p></div><p>Apoyamos a tu empresa a construir una gestión preventiva participativa, documentada y orientada a la mejora continua.</p><Link href="/contacto">Evaluar mi situación <span>↗</span></Link></section>

      <section className="case-preview-section"><div className="case-preview-head"><div><p className="eyebrow dark"><span /> Experiencia aplicada</p><h2>Resultados que<br />se pueden explicar.</h2></div><p>Cada desafío requiere una respuesta distinta. Estos casos representan cómo convertimos brechas complejas en avances visibles.</p></div><div className="case-preview-grid">{featuredCases.map((item, index) => <Link href="/casos-de-exito" className="home-case" key={item.id}><img src={item.image} alt="" /><div className="home-case-overlay" /><span>0{index + 1} / {item.sector}</span><div><h3>{item.title}</h3><p>{item.metric}</p></div><b>↗</b></Link>)}</div></section>

      <section className="home-final-cta"><p className="eyebrow"><span /> Empecemos</p><h2>Tu próxima decisión preventiva<br />puede ser la más importante.</h2><Link className="button-primary" href="/contacto">Solicitar diagnóstico inicial <span>→</span></Link></section>
      <a className="whatsapp-float" href="https://wa.me/56920510214?text=Hola%20ASSEL%2C%20quiero%20conocer%20sus%20servicios" aria-label="Contactar a ASSEL por WhatsApp"><span>WA</span><b>¿Hablamos?</b></a>
    </main>
  );
}
