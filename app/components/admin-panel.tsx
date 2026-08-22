'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { type CaseStudy, type Service } from '../lib/content';
import { useSiteContent } from './content-provider';

export function AdminPanel() {
  const { content, updateHero, saveService, removeService, saveCase, removeCase, resetContent } = useSiteContent();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<'textos' | 'servicios' | 'casos'>('textos');
  const [notice, setNotice] = useState('');

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('usuario') === 'admin' && data.get('clave') === 'admin') { setAuthenticated(true); setLoginError(''); }
    else setLoginError('Las credenciales no coinciden con las de demostración.');
  }

  function flash(message: string) { setNotice(message); window.setTimeout(() => setNotice(''), 2200); }

  if (!authenticated) return (
    <main className="admin-login-page">
      <section className="admin-login-card"><Link className="brand brand-dark" href="/"><span className="brand-mark"><i /></span><span className="brand-copy"><strong>ASSEL</strong><small>Panel de demostración</small></span></Link><div><p className="eyebrow dark"><span /> Acceso restringido</p><h1>Gestiona el contenido<br />sin tocar el código.</h1><p>Este acceso funciona únicamente en este navegador y será reemplazado por autenticación segura en la etapa de publicación.</p></div><form onSubmit={login}><label>Usuario<input name="usuario" autoComplete="username" /></label><label>Contraseña<input name="clave" type="password" autoComplete="current-password" /></label>{loginError && <p className="login-error">{loginError}</p>}<button className="button-dark" type="submit">Ingresar al panel <span>→</span></button><small>Demostración: usuario admin · clave admin</small></form></section>
    </main>
  );

  return (
    <main className="admin-page">
      <aside className="admin-sidebar"><Link className="brand" href="/"><span className="brand-mark"><i /></span><span className="brand-copy"><strong>ASSEL</strong><small>Administración</small></span></Link><nav><button className={tab === 'textos' ? 'active' : ''} onClick={() => setTab('textos')}><span>01</span>Textos del sitio</button><button className={tab === 'servicios' ? 'active' : ''} onClick={() => setTab('servicios')}><span>02</span>Servicios</button><button className={tab === 'casos' ? 'active' : ''} onClick={() => setTab('casos')}><span>03</span>Casos de éxito</button></nav><div className="admin-sidebar-foot"><p><i /> Modo demostración local</p><Link href="/">Ver sitio público ↗</Link><button onClick={() => setAuthenticated(false)}>Cerrar sesión</button></div></aside>
      <section className="admin-workspace"><header><div><small>Panel de contenidos</small><h1>{tab === 'textos' ? 'Textos del sitio' : tab === 'servicios' ? 'Gestión de servicios' : 'Gestión de casos'}</h1></div><button className="reset-button" onClick={() => { if (window.confirm('¿Restaurar todo el contenido de demostración?')) { resetContent(); flash('Contenido restaurado.'); } }}>Restaurar demo</button></header><div className="demo-warning"><b>Demostración local</b><span>Los cambios se guardan en este navegador y se reflejan en el sitio público. No equivale a una base de datos de producción.</span></div>{notice && <div className="admin-notice" role="status">{notice}</div>}
        {tab === 'textos' && <HeroEditor title={content.heroTitle} accent={content.heroAccent} intro={content.heroIntro} onSave={(values) => { updateHero(values); flash('Textos de Inicio actualizados.'); }} />}
        {tab === 'servicios' && <div className="admin-list"><div className="admin-section-head"><p>{content.services.length} servicios publicados</p><button onClick={() => { const id = `servicio-${Date.now()}`; saveService({ id, number: String(content.services.length + 1).padStart(2, '0'), tag: 'Nuevo', title: 'Nuevo servicio', summary: 'Resumen del nuevo servicio.', description: 'Descripción detallada del nuevo servicio.', scope: ['Alcance por definir'], benefits: ['Beneficio por definir'], audience: 'Público objetivo por definir.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=82' }); flash('Nuevo servicio agregado.'); }}>＋ Agregar servicio</button></div>{content.services.map((service) => <ServiceEditor key={service.id} service={service} onSave={(item) => { saveService(item); flash('Servicio guardado.'); }} onDelete={() => { removeService(service.id); flash('Servicio eliminado.'); }} />)}</div>}
        {tab === 'casos' && <div className="admin-list"><div className="admin-section-head"><p>{content.cases.length} casos publicados</p><button onClick={() => { const id = `caso-${Date.now()}`; saveCase({ id, title: 'Nuevo caso de éxito', sector: 'Sector', date: '2026', challenge: 'Desafío por definir.', result: 'Resultado por definir.', metric: 'Indicador por definir', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=82', gallery: [] }); flash('Nuevo caso agregado.'); }}>＋ Agregar caso</button></div>{content.cases.map((item) => <CaseEditor key={item.id} item={item} onSave={(value) => { saveCase(value); flash('Caso guardado.'); }} onDelete={() => { removeCase(item.id); flash('Caso eliminado.'); }} />)}</div>}
      </section>
    </main>
  );
}

function HeroEditor({ title, accent, intro, onSave }: { title: string; accent: string; intro: string; onSave: (values: { heroTitle: string; heroAccent: string; heroIntro: string }) => void }) {
  const [values, setValues] = useState({ heroTitle: title, heroAccent: accent, heroIntro: intro });
  return <form className="admin-editor" onSubmit={(event) => { event.preventDefault(); onSave(values); }}><div className="editor-title"><div><span>Inicio / Hero</span><h2>Mensaje principal</h2></div><button type="submit">Guardar cambios</button></div><label>Título principal<input value={values.heroTitle} onChange={(event) => setValues({ ...values, heroTitle: event.target.value })} /></label><label>Frase destacada<input value={values.heroAccent} onChange={(event) => setValues({ ...values, heroAccent: event.target.value })} /></label><label>Texto de apoyo<textarea rows={4} value={values.heroIntro} onChange={(event) => setValues({ ...values, heroIntro: event.target.value })} /></label><div className="editor-preview"><small>Vista previa</small><h3>{values.heroTitle}<br /><em>{values.heroAccent}</em></h3><p>{values.heroIntro}</p></div></form>;
}

function ServiceEditor({ service, onSave, onDelete }: { service: Service; onSave: (service: Service) => void; onDelete: () => void }) {
  const [item, setItem] = useState(service);
  return <details className="admin-item"><summary><span>{item.number}</span><div><b>{item.title}</b><small>{item.tag}</small></div><i>＋</i></summary><form onSubmit={(event) => { event.preventDefault(); onSave(item); }}><div className="field-row"><label>Título<input value={item.title} onChange={(event) => setItem({ ...item, title: event.target.value })} /></label><label>Categoría<input value={item.tag} onChange={(event) => setItem({ ...item, tag: event.target.value })} /></label></div><label>Resumen<textarea rows={2} value={item.summary} onChange={(event) => setItem({ ...item, summary: event.target.value })} /></label><label>Descripción<textarea rows={4} value={item.description} onChange={(event) => setItem({ ...item, description: event.target.value })} /></label><label>URL de imagen<input value={item.image} onChange={(event) => setItem({ ...item, image: event.target.value })} /></label><div className="editor-actions"><button type="button" className="delete-button" onClick={() => { if (window.confirm('¿Eliminar este servicio?')) onDelete(); }}>Eliminar</button><button type="submit">Guardar servicio</button></div></form></details>;
}

function CaseEditor({ item: initial, onSave, onDelete }: { item: CaseStudy; onSave: (item: CaseStudy) => void; onDelete: () => void }) {
  const [item, setItem] = useState(initial);
  return <details className="admin-item"><summary><span>{item.date}</span><div><b>{item.title}</b><small>{item.sector}</small></div><i>＋</i></summary><form onSubmit={(event) => { event.preventDefault(); onSave(item); }}><div className="field-row"><label>Título<input value={item.title} onChange={(event) => setItem({ ...item, title: event.target.value })} /></label><label>Sector<input value={item.sector} onChange={(event) => setItem({ ...item, sector: event.target.value })} /></label></div><label>Desafío<textarea rows={3} value={item.challenge} onChange={(event) => setItem({ ...item, challenge: event.target.value })} /></label><label>Resultado<textarea rows={3} value={item.result} onChange={(event) => setItem({ ...item, result: event.target.value })} /></label><label>Indicador destacado<input value={item.metric} onChange={(event) => setItem({ ...item, metric: event.target.value })} /></label><label>URL de imagen<input value={item.image} onChange={(event) => setItem({ ...item, image: event.target.value })} /></label><div className="editor-actions"><button type="button" className="delete-button" onClick={() => { if (window.confirm('¿Eliminar este caso?')) onDelete(); }}>Eliminar</button><button type="submit">Guardar caso</button></div></form></details>;
}
