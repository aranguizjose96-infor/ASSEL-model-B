import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '../components/page-hero';

export const metadata: Metadata = { title: 'Productos', description: 'Soluciones preventivas paquetizadas de ASSEL para personas, pymes y empresas con operaciones complejas.' };

const products = [
  {
    number: '01',
    audience: 'Personas y microempresas',
    name: 'ASSEL Esencial',
    description: 'La base preventiva necesaria para comenzar bien, entender las obligaciones y tomar decisiones sin burocracia innecesaria.',
    includes: ['Diagnóstico preventivo inicial', 'Mapa simple de obligaciones', 'Matriz de riesgos priorizada', 'Plan de acción de 90 días'],
    outcome: 'Claridad para actuar y una base preparada para crecer.',
  },
  {
    number: '02',
    audience: 'Pequeñas empresas',
    name: 'ASSEL Empresa Segura',
    description: 'Un sistema práctico para ordenar documentación, controles y responsabilidades sin perder de vista la operación diaria.',
    includes: ['Sistema documental esencial', 'Protocolos y procedimientos', 'Capacitación de responsables', 'Seguimiento trimestral'],
    outcome: 'Cumplimiento demostrable y controles que el equipo puede utilizar.',
  },
  {
    number: '03',
    audience: 'Pymes en crecimiento',
    name: 'ASSEL Continuidad 360',
    description: 'Acompañamiento recurrente para integrar prevención, bienestar y continuidad operacional en la gestión del negocio.',
    includes: ['Asesoría mensual continua', 'Indicadores y tablero ejecutivo', 'Visitas y verificación en terreno', 'Plan anual de mejora'],
    outcome: 'Menos incertidumbre y una gestión preventiva que evoluciona con la empresa.',
  },
  {
    number: '04',
    audience: 'Corporaciones y multi-sede',
    name: 'ASSEL Global',
    description: 'Gobernanza preventiva para organizaciones que necesitan estándares consistentes, trazabilidad y control entre múltiples equipos.',
    includes: ['Marco corporativo común', 'Diagnóstico comparativo por sede', 'Estándares y auditorías internas', 'Reporte ejecutivo consolidado'],
    outcome: 'Una visión común del riesgo con capacidad de gestión local.',
  },
];

export default function ProductosPage() {
  return <main className="inner-page"><PageHero index="04" eyebrow="Productos ASSEL" title="Soluciones claras." accent="Impacto medible." intro="Convertimos nuestra experiencia en productos preventivos definidos, escalables y fáciles de contratar para cada etapa de tu organización." image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=84" />
    <section className="products-intro"><p className="eyebrow dark"><span /> Una inversión a tu medida</p><div><h2>El nivel correcto de apoyo.<br />Sin pagar por lo que no necesitas.</h2><p>Cada producto combina entregables, acompañamiento y resultados esperados. Comenzamos con una estructura clara y la adaptamos a la realidad de tu negocio.</p></div></section>
    <section className="product-suite">{products.map((product) => <article className="product-card" key={product.number}><div className="product-card-head"><span>{product.number}</span><small>{product.audience}</small></div><h2>{product.name}</h2><p className="product-description">{product.description}</p><div className="product-includes"><small>Incluye</small><ul>{product.includes.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="product-outcome"><small>Resultado esperado</small><p>{product.outcome}</p></div><Link href="/contacto">Consultar este producto <span>↗</span></Link></article>)}</section>
    <section className="product-value-band"><div><p className="eyebrow"><span /> Retorno integral</p><h2>Una decisión.<br />Tres dimensiones de valor.</h2></div><div className="product-value-grid"><article><span>01</span><h3>Legal</h3><p>Menor exposición, documentación vigente y capacidad de demostrar cumplimiento.</p></article><article><span>02</span><h3>Operacional</h3><p>Continuidad, controles efectivos y decisiones basadas en riesgos reales.</p></article><article><span>03</span><h3>Humano</h3><p>Bienestar, confianza y equipos que participan activamente en la prevención.</p></article></div></section>
    <section className="product-process"><div><p className="eyebrow dark"><span /> Cómo comenzar</p><h2>Una ruta breve para elegir bien.</h2></div><div><article><span>01</span><h3>Conversamos</h3><p>Conocemos tu tamaño, actividad, riesgos y principal desafío.</p></article><article><span>02</span><h3>Recomendamos</h3><p>Seleccionamos el producto adecuado y definimos los ajustes necesarios.</p></article><article><span>03</span><h3>Implementamos</h3><p>Trabajamos con tu equipo, dejamos evidencia y medimos avances.</p></article></div></section>
    <section className="inner-cta"><div><p className="eyebrow"><span /> ¿Cuál es para ti?</p><h2>Te ayudamos a elegir el producto adecuado para tu empresa.</h2><p>La conversación inicial no tiene costo y te entrega una recomendación clara.</p></div><Link className="button-primary" href="/contacto">Recibir recomendación <span>→</span></Link></section>
  </main>;
}
