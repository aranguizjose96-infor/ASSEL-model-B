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
    title: 'Cabeza, vista y audición',
    image: '/images/epp-elementos-proteccion-personal.png',
    focus: '44% 46%',
    description: 'Cascos, lentes de seguridad y protectores auditivos para labores en terreno, plantas y zonas operativas.',
  },
  {
    number: '02',
    title: 'Manos y respiración',
    image: '/images/epp-elementos-proteccion-personal.png',
    focus: '50% 86%',
    description: 'Guantes de trabajo, mascarillas y respiradores para disminuir exposición a polvo, partículas y contacto directo.',
  },
  {
    number: '03',
    title: 'Ropa y calzado',
    image: '/images/epp-elementos-proteccion-personal.png',
    focus: '18% 50%',
    description: 'Calzado de seguridad, ropa de trabajo y prendas de alta visibilidad para continuidad operacional.',
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
        image="/images/epp-elementos-proteccion-personal.png"
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
            <img src={category.image} alt="" style={{ objectPosition: category.focus }} />
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
