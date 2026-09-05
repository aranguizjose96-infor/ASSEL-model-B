'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSiteContent } from './content-provider';
import { HeroVideoRotator } from './hero-video-rotator';
import { siteContent } from '../lib/content';

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
  const copy = siteContent.home;
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
            <p className="eyebrow"><span /> {copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}<br /><em>{copy.hero.accent}</em></h1>
            <p className="hero-intro">{copy.hero.intro}</p>
            <div className="hero-actions"><Link className="button-primary" href="/contacto">{copy.hero.primaryCta} <span>→</span></Link><Link className="button-ghost" href="/servicios"><span className="play">＋</span> {copy.hero.secondaryCta}</Link></div>
          </div>
          <aside className="assurance-card" aria-label="Método de trabajo ASSEL">
            <div className="assurance-top"><span className="live-dot"><i /> {copy.assurance.status}</span><span className="card-code">{copy.assurance.code}</span></div>
            <div className="assurance-heading"><span className="orbit"><b>360°</b></span><div><small>{copy.assurance.kicker}</small><h2>{copy.assurance.title}</h2></div></div>
            <div className="assurance-list">{copy.assurance.steps.map((step, index) => <div key={step.title}><span>0{index + 1}</span><p><b>{step.title}</b><small>{step.detail}</small></p><i>✓</i></div>)}</div>
            <p className="assurance-foot">{copy.assurance.footer}</p>
          </aside>
        </div>
        <div className="hero-rail"><p><RailIcon type="evidence" /><strong>{copy.rail[0]}</strong></p><p><RailIcon type="anticipation" /><strong>{copy.rail[1]}</strong></p><p><RailIcon type="people" /><strong>{copy.rail[2]}</strong></p></div>
      </section>

      <section className="services-preview">
        <div className="solutions-intro">
          <div className="section-heading"><p className="eyebrow dark"><span /> {copy.solutions.eyebrow}</p><div><h2>{copy.solutions.title}</h2><p>{copy.solutions.intro}</p></div></div>
          <div className="solutions-video" data-reveal>
            <video autoPlay muted loop playsInline preload="metadata" aria-label="Video de soluciones preventivas ASSEL en terreno">
              <source src="/videos/soluciones-assel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="service-grid">{featuredServices.map((service, index) => <article className="service-card" data-reveal key={service.id}><div className="service-meta"><span>{service.number}</span><small>{service.tag}</small></div><ServiceIcon id={service.id} /><h3>{service.title}</h3><p>{service.summary}</p><p className="service-result"><span>{copy.solutions.resultLabel}</span>{copy.solutions.results[index] || service.benefits[0]}</p><Link href="/servicios">{copy.solutions.cardLink} <span>↗</span></Link></article>)}</div>
        <Link className="text-link section-link" href="/servicios">{copy.solutions.allLink} <span>→</span></Link>
      </section>

      <section className="why-section">
        <div className="why-image"><img src="/images/assel-inspeccion-prevencion.webp" alt="Profesional de prevención asesorando a un trabajador durante una inspección industrial" /><div className="image-note"><small>{copy.why.imageKicker}</small><strong>{copy.why.imageTitle}</strong></div></div>
        <div className="why-content"><p className="eyebrow dark"><span /> {copy.why.eyebrow}</p><h2>{copy.why.title}</h2><p>{copy.why.intro}</p><div className="why-list">{copy.why.attributes.map((attribute, index) => <div data-reveal key={attribute.title}><span>0{index + 1}</span><p><b>{attribute.title}</b><small>{attribute.detail}</small></p></div>)}</div><Link className="button-dark" href="/nosotros">{copy.why.cta} <span>↗</span></Link></div>
      </section>

      <section className="regulation-band" data-reveal><div className="regulation-mark"><span className="regulation-number">44</span><p><small>{copy.regulation.kicker}</small><strong>{copy.regulation.title}</strong></p></div><div className="regulation-copy"><span className="regulation-status">{copy.regulation.status}</span><p>{copy.regulation.copy}</p></div><Link href="/contacto">{copy.regulation.cta} <span>↗</span></Link></section>

      <section className="case-preview-section"><div className="case-preview-head"><div><p className="eyebrow dark"><span /> {copy.cases.eyebrow}</p><h2>{copy.cases.title}</h2></div><p>{copy.cases.intro}</p></div><div className="case-preview-grid">{featuredCases.map((item, index) => <Link href="/casos-de-exito" className="home-case" key={item.id}><img src={item.image} alt="" /><div className="home-case-overlay" /><span>0{index + 1} / {item.sector}</span><div><h3>{item.title}</h3><p>{item.metric}</p></div><b>↗</b></Link>)}</div></section>

      <section className="home-final-cta"><p className="eyebrow"><span /> {copy.finalCta.eyebrow}</p><h2>{copy.finalCta.title}</h2><Link className="button-primary" href="/contacto">{copy.finalCta.button} <span>→</span></Link></section>
    </main>
  );
}
