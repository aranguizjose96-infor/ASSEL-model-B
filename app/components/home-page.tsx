'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSiteContent } from './content-provider';
import { HeroVideoRotator } from './hero-video-rotator';

const serviceResults: Record<string, string> = {
  'gestion-preventiva': 'Una hoja de ruta preventiva clara y aplicable.',
  'cumplimiento-documental': 'Evidencia ordenada, vigente y fácil de demostrar.',
  capacitacion: 'Equipos que comprenden y aplican la prevención.',
};

function ServiceIcon({ id }: { id: string }) {
  if (id === 'gestion-preventiva') {
    return <span className="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.3 8.1-8 10-4.7-1.9-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg></span>;
  }

  if (id === 'cumplimiento-documental') {
    return <span className="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 13h5M10 17h5"/><path d="m4 14 1.5 1.5L8 13"/></svg></span>;
  }

  return <span className="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.4-4.4 2.2-6.5 5.5-6.5s5.1 2.1 5.5 6.5M13.5 15c3.9-.8 6.5 1 7 5"/><path d="m16.5 3 .7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z"/></svg></span>;
}

function RailIcon({ type }: { type: 'evidence' | 'anticipation' | 'people' }) {
  if (type === 'evidence') {
    return <span className="rail-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.3 8.1-8 10-4.7-1.9-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg></span>;
  }

  if (type === 'anticipation') {
    return <span className="rail-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/></svg></span>;
  }

  return <span className="rail-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 19c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M14 14c3.8-.7 6 1 6.5 4.5"/></svg></span>;
}

export function HomePage() {
  const { content } = useSiteContent();
  const featuredServices = content.services.slice(0, 3);
  const featuredCases = content.cases.slice(0, 2);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [content]);

  return (
    <main>
      <section className="hero">
        <HeroVideoRotator />
        <div className="hero-wash" />
        <div className="hero-content" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Gestión preventiva para empresas y comunidades que avanzan</p>
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
        <div className="hero-rail"><p><RailIcon type="evidence" /><strong>Cumplimiento que se demuestra</strong></p><p><RailIcon type="anticipation" /><strong>Riesgos que se anticipan</strong></p><p><RailIcon type="people" /><strong>Equipos que se involucran</strong></p></div>
      </section>

      <section className="services-preview">
        <div className="solutions-intro">
          <div className="section-heading"><p className="eyebrow dark"><span /> Soluciones ASSEL</p><div><h2>Seguridad que se integra<br />a tu forma de trabajar.</h2><p>No entregamos documentos para archivar. Diseñamos sistemas preventivos claros, utilizables y sostenibles.</p></div></div>
          <div className="solutions-video" data-reveal>
            <video autoPlay muted loop playsInline preload="metadata" aria-label="Video de soluciones preventivas ASSEL en terreno">
              <source src="/videos/soluciones-assel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="service-grid">{featuredServices.map((service) => <article className="service-card" data-reveal key={service.id}><div className="service-meta"><span>{service.number}</span><small>{service.tag}</small></div><ServiceIcon id={service.id} /><h3>{service.title}</h3><p>{service.summary}</p><p className="service-result"><span>Resultado</span>{serviceResults[service.id] || service.benefits[0]}</p><Link href="/servicios">Conocer solución <span>↗</span></Link></article>)}</div>
        <Link className="text-link section-link" href="/servicios">Ver todas las soluciones <span>→</span></Link>
      </section>

      <section className="why-section">
        <div className="why-image"><img src="/images/assel-inspeccion-prevencion.webp" alt="Profesional de prevención asesorando a un trabajador durante una inspección industrial" /><div className="image-note"><small>Nuestro enfoque</small><strong>Presencia técnica.<br />Cercanía real.</strong></div></div>
        <div className="why-content"><p className="eyebrow dark"><span /> Por qué ASSEL</p><h2>La prevención funciona cuando las personas pueden usarla.</h2><p>Convertimos normativa y conocimiento técnico en decisiones claras que jefaturas y equipos pueden aplicar en terreno.</p><div className="why-list"><div data-reveal><span>01</span><p><b>Mirada operacional</b><small>Soluciones diseñadas para funcionar en terreno.</small></p></div><div data-reveal><span>02</span><p><b>Acompañamiento cercano</b><small>Presentes desde el diagnóstico hasta la verificación.</small></p></div><div data-reveal><span>03</span><p><b>Evidencia y trazabilidad</b><small>Avances respaldados y listos para ser demostrados.</small></p></div></div><Link className="button-dark" href="/nosotros">Conoce nuestra forma de trabajar <span>↗</span></Link></div>
      </section>

      <section className="regulation-band" data-reveal><div className="regulation-mark"><span className="regulation-number">44</span><p><small>Gestión preventiva actualizada</small><strong>DS N.º 44</strong></p></div><div className="regulation-copy"><span className="regulation-status">Normativa vigente</span><p>Apoyamos a tu empresa a construir una gestión preventiva participativa, documentada y orientada a la mejora continua.</p></div><Link href="/contacto">Evaluar mi situación <span>↗</span></Link></section>

      <section className="case-preview-section"><div className="case-preview-head"><div><p className="eyebrow dark"><span /> Experiencia aplicada</p><h2>Resultados que<br />se pueden explicar.</h2></div><p>Cada desafío requiere una respuesta distinta. Estos casos representan cómo convertimos brechas complejas en avances visibles.</p></div><div className="case-preview-grid">{featuredCases.map((item, index) => <Link href="/casos-de-exito" className="home-case" key={item.id}><img src={item.image} alt="" /><div className="home-case-overlay" /><span>0{index + 1} / {item.sector}</span><div><h3>{item.title}</h3><p>{item.metric}</p></div><b>↗</b></Link>)}</div></section>

      <section className="home-final-cta"><p className="eyebrow"><span /> Empecemos</p><h2>Tu próxima decisión preventiva<br />puede ser la más importante.</h2><Link className="button-primary" href="/contacto">Solicitar diagnóstico inicial <span>→</span></Link></section>
    </main>
  );
}
