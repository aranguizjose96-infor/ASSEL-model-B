'use client';

import { useEffect, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '../components/page-hero';
import { siteContent } from '../lib/content';

export function NosotrosContent() {
  const copy = siteContent.about;
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-about-reveal], [data-about-method]'));
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
    }, { threshold: 0.16 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="inner-page about-page">
    <PageHero index="02" eyebrow={copy.hero.eyebrow} title={copy.hero.title} accent={copy.hero.accent} intro={copy.hero.intro} image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=84" />

    <section className="about-story">
      <div className="about-lead" data-about-reveal><p className="eyebrow dark"><span /> {copy.value.eyebrow}</p><h2>{copy.value.title}</h2></div>
      <div className="about-copy" data-about-reveal>{copy.value.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="signature"><span>AS</span><p><strong>{copy.value.signatureTitle}</strong><small>{copy.value.signatureDetail}</small></p></div></div>
    </section>

    <section className="about-team">
      <div className="about-team-heading" data-about-reveal><p className="eyebrow"><span /> {copy.team.eyebrow}</p><h2>{copy.team.title}</h2><p>{copy.team.intro}</p><small>{copy.team.note}</small></div>
      <div className="team-profiles">
        <article data-about-reveal>
          <div className="team-portrait"><Image src="/images/perfil-provisorio-01.png" alt="Retrato provisional de Cristóbal Andrés Valdés Navarrete" width={500} height={500} sizes="(max-width: 760px) 230px, 250px" /><span>01</span></div>
          <div className="team-profile-copy"><small>{copy.team.members[0].role}</small><h3>{copy.team.members[0].name}</h3><p>{copy.team.members[0].credentials}</p><a className="team-profile-email" href={`mailto:${copy.team.members[0].email}`}>{copy.team.members[0].email}</a></div>
        </article>
        <article data-about-reveal>
          <div className="team-portrait"><Image src="/images/perfil-provisorio-01.png" alt="Retrato provisional de Hernán Patricio Valdés Chacón" width={500} height={500} sizes="(max-width: 760px) 230px, 250px" /><span>02</span></div>
          <div className="team-profile-copy"><small>{copy.team.members[1].role}</small><h3>{copy.team.members[1].name}</h3><p>{copy.team.members[1].credentials}</p><a className="team-profile-email" href={`mailto:${copy.team.members[1].email}`}>{copy.team.members[1].email}</a></div>
        </article>
      </div>
    </section>

    <section className="about-evidence">
      <div className="about-section-heading" data-about-reveal><p className="eyebrow dark"><span /> {copy.evidence.eyebrow}</p><h2>{copy.evidence.title}</h2><p>{copy.evidence.intro}</p></div>
      <div className="evidence-grid">{copy.evidence.items.map((item) => <article data-about-reveal key={item.label}><span>{item.label}</span><strong>{item.title}</strong><p>{item.copy}</p><small>{item.note}</small></article>)}</div>
    </section>

    <section className="about-method">
      <div className="about-section-heading" data-about-reveal><p className="eyebrow"><span /> {copy.method.eyebrow}</p><h2>{copy.method.title}</h2><p>{copy.method.intro}</p></div>
      <div className="about-method-track" data-about-method>{copy.method.steps.map((step, index) => <article data-about-reveal key={step.title}><span>0{index + 1}</span><i /><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
    </section>

    <section className="scale-band about-scale">
      <div data-about-reveal><p className="eyebrow"><span /> {copy.scale.eyebrow}</p><h2>{copy.scale.title}</h2><p className="scale-intro">{copy.scale.intro}</p></div>
      <div className="scale-progression">{copy.scale.items.map((item, index) => <article data-about-reveal key={item.title}><div className="scale-level" style={{ '--scale-level': `${25 + index * 25}%` } as CSSProperties}><span>0{index + 1}</span><i /></div><div><strong>{item.title}</strong><p>{item.copy}</p></div></article>)}</div>
    </section>

    <section className="purpose-section">
      <div className="about-section-heading" data-about-reveal><p className="eyebrow dark"><span /> {copy.purpose.eyebrow}</p><h2>{copy.purpose.title}</h2></div>
      <div className="purpose-grid purpose-grid-balanced">{copy.purpose.items.map((item, index) => <article className={index === 0 ? 'purpose-card-featured' : ''} data-about-reveal key={item.label}><small>{item.label}</small><h3>{item.copy}</h3></article>)}</div>
    </section>

    <section className="commercial-strategy">
      <div className="strategy-heading" data-about-reveal><p className="eyebrow dark"><span /> {copy.strategy.eyebrow}</p><h2>{copy.strategy.title}</h2><p>{copy.strategy.intro}</p></div>
      <div className="strategy-body" data-about-reveal><blockquote>{copy.strategy.quote}</blockquote><div className="strategy-pillars">{copy.strategy.pillars.map((pillar, index) => <article key={pillar.title}><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>)}</div></div>
    </section>

    <section className="inner-cta"><div><p className="eyebrow"><span /> {copy.cta.eyebrow}</p><h2>{copy.cta.title}</h2><p>{copy.cta.intro}</p></div><Link className="button-primary" href="/contacto">{copy.cta.button} <span>→</span></Link></section>
  </main>;
}
