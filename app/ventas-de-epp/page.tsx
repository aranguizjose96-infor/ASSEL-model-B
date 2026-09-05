import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../components/page-hero';
import { siteContent } from '../lib/content';

export const metadata: Metadata = {
  title: 'Venta de EPP',
  description: 'ASSEL distribuye elementos de protección personal para empresas y clientes B2B, con orientación técnica para compras corporativas.',
};

const categoryImages = ['/images/epp-cabeza-vista-audicion.png', '/images/epp-manos-respiracion.png', '/images/epp-ropa-calzado.png'];

export default function VentasEppPage() {
  const copy = siteContent.epp;
  return (
    <main className="inner-page epp-page">
      <PageHero
        index="04"
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        accent={copy.hero.accent}
        intro={copy.hero.intro}
        image="/images/epp-elementos-proteccion-personal.png"
      />

      <section className="epp-intro">
        <p className="eyebrow dark"><span /> {copy.intro.eyebrow}</p>
        <div>
          <h2>{copy.intro.title}</h2>
          <p>{copy.intro.copy}</p>
        </div>
      </section>

      <section className="epp-category-grid" aria-label="Categorías de elementos de protección personal">
        {copy.categories.map((category, index) => (
          <article className="epp-category-card" key={category.title}>
            <img src={categoryImages[index]} alt="" />
            <div>
              <span>0{index + 1}</span>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="epp-b2b-band">
        <div>
          <p className="eyebrow"><span /> {copy.b2b.eyebrow}</p>
          <h2>{copy.b2b.title}</h2>
        </div>
        <div className="epp-b2b-list">
          {copy.b2b.points.map((point, index) => (
            <article key={point}>
              <span>0{index + 1}</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="epp-supply-note">
        <div>
          <p className="eyebrow dark"><span /> {copy.process.eyebrow}</p>
          <h2>{copy.process.title}</h2>
        </div>
        <p>{copy.process.copy}</p>
      </section>

      <section className="inner-cta">
        <div>
          <p className="eyebrow"><span /> {copy.cta.eyebrow}</p>
          <h2>{copy.cta.title}</h2>
          <p>{copy.cta.intro}</p>
        </div>
        <Link className="button-primary" href="/contacto">{copy.cta.button} <span>→</span></Link>
      </section>
    </main>
  );
}
