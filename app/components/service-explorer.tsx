'use client';

import { useEffect, useState } from 'react';
import { type Service } from '../lib/content';
import { useSiteContent } from './content-provider';

export function ServiceExplorer() {
  const { content } = useSiteContent();
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
        <div className="services-list-head"><p>Explora nuestras soluciones</p><span>{String(services.length).padStart(2, '0')} servicios disponibles</span></div>
        <div className="services-card-grid">
          {services.map((service) => (
            <article className="service-tile" key={service.id}>
              <img src={service.image} alt="" />
              <div className="service-tile-overlay" />
              <div className="service-tile-content"><div><span>{service.number}</span><small>{service.tag}</small></div><h2>{service.title}</h2><p>{service.summary}</p><button onClick={() => setSelected(service)}>Ver detalle <span>↗</span></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="method-section">
        <div><p className="eyebrow dark"><span /> Método de trabajo</p><h2>Una ruta clara.<br />Sin soluciones de papel.</h2></div>
        <div className="method-steps"><article><span>01</span><h3>Escuchamos y observamos</h3><p>Conocemos la operación, sus personas, exigencias y puntos de tensión.</p></article><article><span>02</span><h3>Priorizamos lo importante</h3><p>Ordenamos brechas según riesgo, urgencia y capacidad real de implementación.</p></article><article><span>03</span><h3>Implementamos contigo</h3><p>Diseñamos controles, documentos y rutinas junto a quienes deben utilizarlos.</p></article><article><span>04</span><h3>Verificamos y mejoramos</h3><p>Medimos avances y ajustamos antes de que una desviación se transforme en incidente.</p></article></div>
      </section>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}><article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar detalle">×</button><div className="modal-image"><img src={selected.image} alt="" /><span>{selected.number} / {selected.tag}</span></div><div className="modal-content"><p className="eyebrow dark"><span /> Solución ASSEL</p><h2 id="service-modal-title">{selected.title}</h2><p className="modal-description">{selected.description}</p><div className="modal-columns"><div><h3>Alcance</h3><ul>{selected.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Beneficios</h3><ul>{selected.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div className="audience-note"><small>¿A quién está dirigido?</small><p>{selected.audience}</p></div><a className="button-dark" href="/contacto">Consultar por este servicio <span>↗</span></a></div></article></div>}
    </>
  );
}
