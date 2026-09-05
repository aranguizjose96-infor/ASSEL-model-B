'use client';

import { useEffect, useState } from 'react';
import { siteContent, type CaseStudy } from '../lib/content';
import { useSiteContent } from './content-provider';

export function CaseGallery() {
  const { content } = useSiteContent();
  const copy = siteContent.cases;
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const [photo, setPhoto] = useState(0);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const open = (item: CaseStudy) => { setSelected(item); setPhoto(0); };

  return (
    <>
      <section className="case-gallery">
        {content.cases.map((item, index) => <button className={`case-card case-card-${index % 3}`} onClick={() => open(item)} key={item.id}><img src={item.image} alt="" /><div className="case-card-overlay" /><div className="case-card-top"><span>0{index + 1}</span><small>{item.sector}</small></div><div className="case-card-copy"><h2>{item.title}</h2><p>{item.metric}</p></div><i>↗</i></button>)}
      </section>
      <section className="testimonial-band"><span>“</span><blockquote>{copy.testimonial.quote}</blockquote><p>{copy.testimonial.author}</p></section>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}><article className="detail-modal case-modal" role="dialog" aria-modal="true" aria-labelledby="case-modal-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar caso">×</button><div className="case-modal-gallery"><img src={selected.gallery[photo] || selected.image} alt="Vista del proyecto" /><div>{selected.gallery.map((image, index) => <button key={image} className={index === photo ? 'active' : ''} onClick={() => setPhoto(index)}><img src={image} alt={`Vista ${index + 1}`} /></button>)}</div></div><div className="modal-content"><p className="eyebrow dark"><span /> {selected.sector} · {selected.date}</p><h2 id="case-modal-title">{selected.title}</h2><div className="case-story"><div><small>{copy.modal.challengeLabel}</small><p>{selected.challenge}</p></div><div><small>{copy.modal.responseLabel}</small><p>{selected.result}</p></div></div><div className="case-metric"><small>{copy.modal.metricLabel}</small><strong>{selected.metric}</strong></div><a className="button-dark" href="/contacto">{copy.modal.button} <span>↗</span></a></div></article></div>}
    </>
  );
}
