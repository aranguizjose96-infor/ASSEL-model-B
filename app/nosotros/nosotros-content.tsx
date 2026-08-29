'use client';

import { useEffect, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '../components/page-hero';

const methodSteps = [
  ['01', 'Escuchar', 'Comprendemos la operación, sus personas y prioridades reales.'],
  ['02', 'Diagnosticar', 'Identificamos brechas, riesgos y oportunidades de mejora.'],
  ['03', 'Diseñar', 'Construimos una solución proporcional, clara y aplicable.'],
  ['04', 'Acompañar', 'Implementamos, medimos y ajustamos junto a cada equipo.'],
];

const scales = [
  ['01', 'Personas', 'Orientación directa para profesionales y responsables de pequeñas operaciones.'],
  ['02', 'Micro y pequeñas empresas', 'Bases preventivas simples, ordenadas y preparadas para crecer.'],
  ['03', 'Pymes', 'Gestión continua que conecta cumplimiento, operación y cultura.'],
  ['04', 'Organizaciones globales', 'Trazabilidad y criterios consistentes entre sedes, procesos y equipos.'],
];

export function NosotrosContent() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-about-reveal]'));
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
    <PageHero index="02" eyebrow="Quiénes somos" title="Aliados presentes." accent="Valor que permanece." intro="Integramos prevención, gestión y acompañamiento para proteger a las personas y fortalecer el negocio." image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=84" />

    <section className="about-story">
      <div className="about-lead" data-about-reveal><p className="eyebrow dark"><span /> 01 · Propuesta de valor</p><h2>La prevención es una inversión que protege, ordena y permite avanzar.</h2></div>
      <div className="about-copy" data-about-reveal><p>ASSEL transforma exigencias legales y riesgos operativos en decisiones comprensibles, controles utilizables y capacidades que permanecen dentro de la organización.</p><p>Más que entregar documentos, colaboramos para reducir incertidumbre, cuidar a las personas y agregar valor sostenible al negocio.</p><div className="signature"><span>AS</span><p><strong>Colaboración estratégica ASSEL</strong><small>Criterio técnico · Presencia activa · Valor sostenible</small></p></div></div>
    </section>

    <section className="about-team">
      <div className="about-team-heading" data-about-reveal><p className="eyebrow"><span /> 02 · Quiénes forman ASSEL</p><h2>Dos miradas.<br />Un mismo compromiso.</h2><p>ASSEL reúne criterio estratégico y acompañamiento técnico para conectar la prevención con la realidad de cada organización.</p><small>Perfiles e imágenes provisionales · Se reemplazarán con información oficial.</small></div>
      <div className="team-profiles">
        <article data-about-reveal><div className="team-portrait"><Image src="/images/perfil-provisorio-01.png" alt="Retrato provisional del integrante 01 de ASSEL" width={500} height={500} sizes="(max-width: 760px) 230px, 250px" /><span>01</span></div><div className="team-profile-copy"><small>Integrante 01 · Nombre por confirmar</small><h3>Dirección y estrategia preventiva</h3><p>Conecta la gestión de seguridad con los objetivos del negocio, orientando prioridades, decisiones y relaciones de colaboración de largo plazo.</p><b>Perfil profesional en preparación</b></div></article>
        <article data-about-reveal><div className="team-portrait"><Image src="/images/perfil-provisorio-02.png" alt="Retrato provisional del integrante 02 de ASSEL" width={500} height={500} sizes="(max-width: 760px) 230px, 250px" /><span>02</span></div><div className="team-profile-copy"><small>Integrante 02 · Nombre por confirmar</small><h3>Gestión técnica y acompañamiento</h3><p>Transforma necesidades y brechas en acciones aplicables, acompañando la implementación y el aprendizaje de los equipos.</p><b>Perfil profesional en preparación</b></div></article>
      </div>
    </section>

    <section className="about-evidence">
      <div className="about-section-heading" data-about-reveal><p className="eyebrow dark"><span /> 03 · Experiencia y respaldo</p><h2>Confianza que se construye con evidencia.</h2><p>Este espacio está preparado para incorporar antecedentes verificables de ASSEL sin promesas genéricas ni cifras inventadas.</p></div>
      <div className="evidence-grid"><article data-about-reveal><span>Experiencia</span><strong>Trayectoria profesional</strong><p>Años de experiencia y proyectos ejecutados se incorporarán cuando sean confirmados.</p><small>Dato por validar</small></article><article data-about-reveal><span>Credenciales</span><strong>Competencias demostrables</strong><p>Títulos, registros y certificaciones del equipo tendrán respaldo verificable.</p><small>Dato por validar</small></article><article data-about-reveal><span>Sectores</span><strong>Aplicación multisectorial</strong><p>Servicios, industria, logística, comercio y organizaciones con realidades diversas.</p><small>Cobertura por confirmar</small></article></div>
    </section>

    <section className="about-method">
      <div className="about-section-heading" data-about-reveal><p className="eyebrow"><span /> 04 · Método de colaboración</p><h2>Trabajamos con tu empresa, no alrededor de ella.</h2><p>Un proceso continuo que convierte el diagnóstico en acción y la acción en mejora demostrable.</p></div>
      <div className="about-method-track">{methodSteps.map(([number, title, copy]) => <article data-about-reveal key={number}><span>{number}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="scale-band about-scale">
      <div data-about-reveal><p className="eyebrow"><span /> 05 · Alcance adaptable</p><h2>La misma cercanía.<br />Una escala diferente.</h2><p className="scale-intro">La solución crece en profundidad y alcance según la complejidad de cada organización.</p></div>
      <div className="scale-progression">{scales.map(([number, title, copy], index) => <article data-about-reveal key={number}><div className="scale-level" style={{ '--scale-level': `${25 + index * 25}%` } as CSSProperties}><span>{number}</span><i /></div><div><strong>{title}</strong><p>{copy}</p></div></article>)}</div>
    </section>

    <section className="purpose-section">
      <div className="about-section-heading" data-about-reveal><p className="eyebrow dark"><span /> 06 · Nuestra dirección</p><h2>Un propósito común, tres compromisos claros.</h2></div>
      <div className="purpose-grid purpose-grid-balanced"><article className="purpose-card-featured" data-about-reveal><small>01 / Propósito</small><h3>Co-crear entornos seguros, éticos y confiables que conviertan la seguridad y el bienestar en valor para las personas y el negocio.</h3></article><article data-about-reveal><small>02 / Misión</small><h3>Acompañar a nuestros clientes en la gestión de riesgos, fortaleciendo su operación y construyendo culturas de trabajo seguras y saludables.</h3></article><article data-about-reveal><small>03 / Visión</small><h3>Ser referentes en prevención y bienestar laboral por transformar organizaciones mediante colaboración, confianza y excelencia.</h3></article></div>
    </section>

    <section className="commercial-strategy">
      <div className="strategy-heading" data-about-reveal><p className="eyebrow dark"><span /> 07 · Estrategia integral</p><h2>Entornos seguros.<br />Negocios más sólidos.</h2><p>La seguridad deja de ser un gasto aislado cuando responde de forma simultánea a las necesidades legales, operativas y humanas.</p></div>
      <div className="strategy-body" data-about-reveal><blockquote>Una sola relación de colaboración para proteger personas, asegurar continuidad y demostrar cumplimiento.</blockquote><div className="strategy-pillars"><article><span>01</span><h3>Valor legal</h3><p>Obligaciones vigentes, evidencia disponible y menor exposición.</p></article><article><span>02</span><h3>Valor operacional</h3><p>Controles aplicables, menos interrupciones y mejores decisiones.</p></article><article><span>03</span><h3>Valor humano</h3><p>Equipos protegidos, involucrados y capaces de sostener mejoras.</p></article></div></div>
    </section>

    <section className="inner-cta"><div><p className="eyebrow"><span /> Conversemos</p><h2>Diseñemos una prevención proporcional a tu realidad.</h2><p>Partimos escuchando tu operación, sus riesgos y sus objetivos.</p></div><Link className="button-primary" href="/contacto">Iniciar una conversación <span>→</span></Link></section>
  </main>;
}
