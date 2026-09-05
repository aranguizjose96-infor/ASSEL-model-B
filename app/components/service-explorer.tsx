'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteContent, type Service } from '../lib/content';
import { useSiteContent } from './content-provider';

export function ServiceExplorer() {
  const { content } = useSiteContent();
  const copy = siteContent.services;
  const [selected, setSelected] = useState<Service | null>(null);
  const services = content.services;

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      <section className="service-explorer">
        <div className="services-list-head"><p>{copy.explorer.heading}</p><span>{String(services.length).padStart(2, '0')} {copy.explorer.available}</span></div>
        <div className="services-card-grid">
          {services.map((service) => (
            <article className="service-tile" key={service.id}>
              <img src={service.image} alt="" />
              <div className="service-tile-overlay" />
              <div className="service-tile-content"><div><span>{service.number}</span><small>{service.tag}</small></div><h2>{service.title}</h2><p>{service.summary}</p><button onClick={() => setSelected(service)}>{copy.explorer.detailButton} <span>↗</span></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="service-plans" aria-labelledby="service-plans-title">
        <div className="service-plans-heading">
          <p className="eyebrow"><span /> {copy.plans.eyebrow}</p>
          <h2 id="service-plans-title">{copy.plans.title}</h2>
          <p>{copy.plans.intro}</p>
        </div>
        <div className="service-plans-grid">
          {copy.plans.items.map((plan, index) => (
            <article className={`service-plan-card${index === 1 ? ' is-featured' : ''}`} key={plan.name}>
              <div className="service-plan-title">
                <div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                {index === 1 && <span>{copy.plans.featuredLabel}</span>}
              </div>
              <ul>
                {plan.features.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className="service-plan-cta" href="/contacto">{copy.plans.button} <span>→</span></Link>
            </article>
          ))}
        </div>
        <p className="service-plans-note">{copy.plans.note}</p>
      </section>

      <section className="method-section">
        <div><p className="eyebrow dark"><span /> {copy.method.eyebrow}</p><h2>{copy.method.title}</h2></div>
        <div className="method-steps">{copy.method.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
      </section>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}><article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar detalle">×</button><div className="modal-image"><img src={selected.image} alt="" /><span>{selected.number} / {selected.tag}</span></div><div className="modal-content"><p className="eyebrow dark"><span /> {copy.explorer.solutionLabel}</p><h2 id="service-modal-title">{selected.title}</h2><p className="modal-description">{selected.description}</p><div className="modal-columns"><div><h3>{copy.explorer.scopeLabel}</h3><ul>{selected.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{copy.explorer.benefitsLabel}</h3><ul>{selected.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div className="audience-note"><small>{copy.explorer.audienceLabel}</small><p>{selected.audience}</p></div><a className="button-dark" href="/contacto">{copy.explorer.contactButton} <span>↗</span></a></div></article></div>}
    </>
  );
}
