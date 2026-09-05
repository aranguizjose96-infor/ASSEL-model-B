import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../components/page-hero';

export const metadata: Metadata = {
  title: 'Ventas de EPP',
  description: 'ASSEL distribuye elementos de protección personal para empresas y clientes B2B, con orientación técnica para compras corporativas.',
};

const eppCategories = [
  {
    number: '01',
    title: 'Protección personal',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=82',
    description: 'Cascos, lentes, guantes, calzado de seguridad, ropa de trabajo y equipos para labores operativas.',
  },
  {
    number: '02',
    title: 'Control de riesgos',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=82',
    description: 'Productos orientados a disminuir exposiciones en terreno, bodegas, plantas y faenas.',
  },
  {
    number: '03',
    title: 'Apoyo operacional',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=82',
    description: 'Suministros para continuidad, reposición programada y estandarización de compras por área.',
  },
];

const b2bPoints = [
  'Atención para empresas, instituciones y compras corporativas.',
  'Selección de productos según actividad, exposición y necesidad operativa.',
  'Cotizaciones y abastecimiento pensados para volumen, reposición y trazabilidad.',
];

export default function VentasEppPage() {
  return (
    <main className="inner-page epp-page">
      <PageHero
        index="04"
        eyebrow="Ventas de EPP"
        title="Distribución B2B."
        accent="Protección para empresas."
        intro="ASSEL también abastece elementos de protección personal para clientes empresariales, integrando criterio técnico, disponibilidad y acompañamiento preventivo."
        image="https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=2200&q=84"
      />

      <section className="epp-intro">
        <p className="eyebrow dark"><span /> Abastecimiento corporativo</p>
        <div>
          <h2>Productos de seguridad para operaciones que necesitan continuidad.</h2>
          <p>
            Esta página informa la línea de distribución de EPP de ASSEL. No funciona como tienda online: el objetivo es orientar a empresas que requieren cotizar, planificar compras o estandarizar sus elementos de protección personal.
          </p>
        </div>
      </section>

      <section className="epp-category-grid" aria-label="Categorías de elementos de protección personal">
        {eppCategories.map((category) => (
          <article className="epp-category-card" key={category.number}>
            <img src={category.image} alt="" />
            <div>
              <span>{category.number}</span>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="epp-b2b-band">
        <div>
          <p className="eyebrow"><span /> Clientes B2B</p>
          <h2>Distribución para empresas, no venta minorista.</h2>
        </div>
        <div className="epp-b2b-list">
          {b2bPoints.map((point, index) => (
            <article key={point}>
              <span>0{index + 1}</span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="epp-supply-note">
        <div>
          <p className="eyebrow dark"><span /> Como trabajamos</p>
          <h2>Primero entendemos la operación, luego recomendamos el abastecimiento.</h2>
        </div>
        <p>
          La venta de EPP se coordina mediante contacto directo. Revisamos rubro, cantidad, uso esperado y condiciones de trabajo para apoyar una compra coherente con la realidad de cada empresa.
        </p>
      </section>

      <section className="inner-cta">
        <div>
          <p className="eyebrow"><span /> Solicitud empresarial</p>
          <h2>Conversemos sobre los EPP que necesita tu equipo.</h2>
          <p>Podemos apoyar compras puntuales, reposicion periodica o levantamientos por area de trabajo.</p>
        </div>
        <Link className="button-primary" href="/contacto">Solicitar cotización B2B <span>→</span></Link>
      </section>
    </main>
  );
}
