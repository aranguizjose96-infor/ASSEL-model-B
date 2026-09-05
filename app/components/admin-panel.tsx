'use client';

import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import type { EditableSiteContent } from '../lib/content';

type TabKey = 'general' | 'home' | 'about' | 'services' | 'epp' | 'cases' | 'contact' | 'history';
type PublishStage = 'idle' | 'github' | 'deploying' | 'live' | 'error';
type HistoryItem = { sha: string; url: string; message: string; author: string; date: string };

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'general', label: 'General' },
  { key: 'home', label: 'Inicio' },
  { key: 'about', label: 'Nosotros' },
  { key: 'services', label: 'Servicios' },
  { key: 'epp', label: 'Venta de EPP' },
  { key: 'cases', label: 'Casos de éxito' },
  { key: 'contact', label: 'Contacto' },
  { key: 'history', label: 'Historial' },
];

const labels: Record<string, string> = {
  navigation: 'Navegación', footer: 'Pie de página', hero: 'Encabezado principal', assurance: 'Método 360°', rail: 'Franja de beneficios', solutions: 'Soluciones ASSEL', why: 'Por qué ASSEL', regulation: 'DS N.º 44', finalCta: 'Llamado final',
  value: 'Propuesta de valor', team: 'Quiénes forman ASSEL', evidence: 'Experiencia y respaldo', method: 'Método de colaboración', scale: 'Alcance adaptable', purpose: 'Propósito, misión y visión', strategy: 'Estrategia integral', cta: 'Llamado a la acción',
  explorer: 'Explorador de servicios', items: 'Elementos', plans: 'Planes', intro: 'Introducción', categories: 'Categorías', b2b: 'Clientes B2B', process: 'Cómo trabajamos', testimonial: 'Testimonio', modal: 'Detalle emergente', info: 'Datos de contacto', hours: 'Horario', form: 'Formulario', map: 'Cobertura', attributes: 'Atributos', steps: 'Etapas', pillars: 'Pilares', members: 'Integrantes', paragraphs: 'Párrafos', results: 'Resultados', features: 'Características', points: 'Puntos',
  home: 'Inicio', about: 'Nosotros', services: 'Servicios', epp: 'Venta de EPP', cases: 'Casos de éxito', contact: 'Contacto', title: 'Título', accent: 'Frase destacada', eyebrow: 'Etiqueta superior', copy: 'Texto', introText: 'Introducción', description: 'Descripción', summary: 'Resumen', detail: 'Detalle', label: 'Etiqueta', button: 'Texto del botón', primaryCta: 'Botón principal', secondaryCta: 'Enlace secundario', cardLink: 'Enlace de tarjeta', allLink: 'Enlace general', resultLabel: 'Etiqueta del resultado', imageKicker: 'Etiqueta sobre imagen', imageTitle: 'Texto sobre imagen', status: 'Estado', kicker: 'Texto superior', footerText: 'Texto inferior', role: 'Cargo', name: 'Nombre', credentials: 'Credenciales', email: 'Correo', note: 'Nota', quote: 'Cita', author: 'Autor', tag: 'Categoría', audience: 'Público objetivo', scope: 'Alcance', benefits: 'Beneficios', heading: 'Encabezado', available: 'Disponibilidad', detailButton: 'Botón de detalle', solutionLabel: 'Etiqueta de solución', scopeLabel: 'Etiqueta de alcance', benefitsLabel: 'Etiqueta de beneficios', audienceLabel: 'Etiqueta de público', contactButton: 'Botón de consulta', featuredLabel: 'Distintivo destacado', responseTime: 'Tiempo de respuesta', company: 'Empresa', phone: 'Teléfono', message: 'Mensaje', placeholder: 'Texto de ejemplo', sending: 'Estado enviando', success: 'Confirmación de envío', days: 'Días', time: 'Horario', city: 'Ciudad', coverage: 'Cobertura', claim: 'Frase de cierre', copyright: 'Derechos reservados', whatsappLabel: 'WhatsApp', panelLink: 'Enlace al panel', publicRecord: 'Registro público', navigationTitle: 'Título de navegación', contactTitle: 'Título de contacto', followTitle: 'Título de redes', descriptionText: 'Descripción', metric: 'Resultado destacado', challenge: 'Desafío', result: 'Respuesta', sector: 'Sector', date: 'Fecha', challengeLabel: 'Etiqueta del desafío', responseLabel: 'Etiqueta de la respuesta', metricLabel: 'Etiqueta del resultado'
};

function humanize(key: string) {
  if (labels[key]) return labels[key];
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (char) => char.toUpperCase());
}

function displayName(value: unknown, index: number) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    return String(record.title || record.name || record.label || record.role || `Elemento ${index + 1}`);
  }
  return `Texto ${index + 1}`;
}

function setAtPath(root: EditableSiteContent, path: Array<string | number>, value: string) {
  const clone = structuredClone(root) as unknown as Record<string | number, unknown>;
  let current = clone;
  path.slice(0, -1).forEach((segment) => { current = current[segment] as Record<string | number, unknown>; });
  current[path[path.length - 1]] = value;
  return clone as unknown as EditableSiteContent;
}

function TextField({ label, value, path, onChange }: { label: string; value: string; path: Array<string | number>; onChange: (path: Array<string | number>, value: string) => void }) {
  const multiline = value.length > 90 || /intro|copy|summary|description|quote|challenge|result|credentials|coverage/i.test(String(path.at(-1)));
  return <label className="admin-copy-field"><span>{label}</span>{multiline ? <textarea rows={Math.min(6, Math.max(3, Math.ceil(value.length / 85)))} value={value} onChange={(event) => onChange(path, event.target.value)} /> : <input value={value} onChange={(event) => onChange(path, event.target.value)} />}</label>;
}

function NodeEditor({ value, path, onChange }: { value: unknown; path: Array<string | number>; onChange: (path: Array<string | number>, value: string) => void }) {
  if (typeof value === 'string') return <TextField label={humanize(String(path.at(-1)))} value={value} path={path} onChange={onChange} />;
  if (Array.isArray(value)) {
    return <div className="admin-array-list">{value.map((item, index) => typeof item === 'string'
      ? <TextField key={index} label={`${humanize(String(path.at(-1)))} ${index + 1}`} value={item} path={[...path, index]} onChange={onChange} />
      : <details className="admin-item" key={index}><summary><span>{String(index + 1).padStart(2, '0')}</span><b>{displayName(item, index)}</b><i>＋</i></summary><div className="admin-item-fields"><NodeEditor value={item} path={[...path, index]} onChange={onChange} /></div></details>
    )}</div>;
  }
  if (value && typeof value === 'object') {
    return <div className="admin-object-fields">{Object.entries(value as Record<string, unknown>).filter(([key]) => key !== 'id').map(([key, child]) => (
      typeof child === 'string'
        ? <TextField key={key} label={humanize(key)} value={child} path={[...path, key]} onChange={onChange} />
        : <div className="admin-nested-group" key={key}><h3>{humanize(key)}</h3><NodeEditor value={child} path={[...path, key]} onChange={onChange} /></div>
    ))}</div>;
  }
  return null;
}

function PageEditor({ pageKey, content, onChange }: { pageKey: Exclude<TabKey, 'history'>; content: EditableSiteContent; onChange: (path: Array<string | number>, value: string) => void }) {
  const page = content[pageKey] as unknown as Record<string, unknown>;
  return <div className="admin-page-editor">{Object.entries(page).map(([section, value]) => (
    <section className="admin-editor" key={section}>
      <div className="editor-title"><div><span>{humanize(pageKey)}</span><h2>{humanize(section)}</h2></div></div>
      <NodeEditor value={value} path={[pageKey, section]} onChange={onChange} />
    </section>
  ))}</div>;
}

export function AdminPanel() {
  const [authState, setAuthState] = useState<'loading' | 'login' | 'ready'>('loading');
  const [configured, setConfigured] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<TabKey>('home');
  const [content, setContent] = useState<EditableSiteContent | null>(null);
  const [sha, setSha] = useState('');
  const [dirty, setDirty] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [publishStage, setPublishStage] = useState<PublishStage>('idle');
  const [notice, setNotice] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const currentTab = useMemo(() => tabs.find((item) => item.key === tab)?.label || 'Contenido', [tab]);

  const loadContent = useCallback(async () => {
    setLoadingContent(true);
    setNotice('');
    try {
      const response = await fetch('/api/admin/content', { cache: 'no-store' });
      const result = await response.json();
      if (response.status === 401) { setAuthState('login'); return; }
      if (!response.ok) throw new Error(result.error || 'No se pudo cargar el contenido.');
      setContent(result.content);
      setSha(result.sha);
      setDirty(false);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No se pudo cargar el contenido.');
    } finally {
      setLoadingContent(false);
    }
  }, []);

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' }).then((response) => response.json()).then((result) => {
      setConfigured(Boolean(result.configured));
      setAuthState(result.authenticated ? 'ready' : 'login');
      if (result.authenticated) void loadContent();
    }).catch(() => setAuthState('login'));
  }, [loadContent]);

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const response = await fetch('/api/admin/history', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No se pudo cargar el historial.');
      setHistory(result.commits);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No se pudo cargar el historial.');
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: form.get('usuario'), password: form.get('clave') }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setLoginError(result.error || 'No fue posible iniciar sesión.'); return; }
    setAuthState('ready');
    await loadContent();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setContent(null);
    setAuthState('login');
  }

  async function waitForDeployment(commitSha: string) {
    if (window.location.hostname === 'localhost') {
      setPublishStage('github');
      setNotice('Los textos ya están en GitHub. La confirmación automática del despliegue se verá desde el panel publicado.');
      return;
    }
    setPublishStage('deploying');
    setNotice('GitHub recibió los cambios. Vercel está actualizando assel.cl…');
    for (let attempt = 0; attempt < 30; attempt += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 5000));
      const response = await fetch(`/api/version?check=${attempt}`, { cache: 'no-store' }).catch(() => null);
      if (!response?.ok) continue;
      const version = await response.json();
      if (version.commitSha === commitSha) {
        setPublishStage('live');
        setNotice('Publicación completada. Los nuevos textos ya están visibles en assel.cl.');
        return;
      }
    }
    setPublishStage('github');
    setNotice('Los cambios están en GitHub. Vercel sigue procesando la actualización; revisa nuevamente en unos minutos.');
  }

  async function publish() {
    if (!content || !sha || !dirty) return;
    setPublishStage('github');
    setNotice('Guardando una nueva versión en GitHub…');
    const response = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, expectedSha: sha, message: `Actualiza textos de ${currentTab} desde el panel ASSEL` }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setPublishStage('error');
      setNotice(result.error || 'No se pudo publicar.');
      return;
    }
    setSha(result.contentSha);
    setDirty(false);
    await waitForDeployment(result.commitSha);
  }

  async function restore(item: HistoryItem) {
    if (!sha || !window.confirm(`¿Restaurar los textos de la versión del ${new Date(item.date).toLocaleString('es-CL')}? Se guardará como una nueva versión.`)) return;
    setPublishStage('github');
    setNotice('Recuperando la versión seleccionada…');
    const response = await fetch('/api/admin/history', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ restoreSha: item.sha, expectedSha: sha }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setPublishStage('error'); setNotice(result.error || 'No se pudo restaurar la versión.'); return; }
    setContent(result.content);
    setSha(result.contentSha);
    setDirty(false);
    await waitForDeployment(result.commitSha);
    await loadHistory();
  }

  if (authState === 'loading') return <main className="admin-login-page"><div className="admin-loading">Preparando acceso seguro…</div></main>;

  if (authState === 'login') return (
    <main className="admin-login-page">
      <section className="admin-login-card"><Link className="brand brand-dark" href="/"><span className="brand-mark"><i /></span><span className="brand-copy"><strong>ASSEL</strong><small>Administración</small></span></Link><div><p className="eyebrow dark"><span /> Acceso restringido</p><h1>Actualiza los textos<br />sin tocar el código.</h1><p>Los cambios se publican como versiones en GitHub y Vercel actualiza el sitio automáticamente.</p></div><form onSubmit={login}><label>Usuario<input name="usuario" autoComplete="username" required /></label><label>Contraseña<input name="clave" type="password" autoComplete="current-password" required /></label>{!configured && <p className="login-error">Falta configurar las credenciales seguras en Vercel.</p>}{loginError && <p className="login-error">{loginError}</p>}<button className="button-dark" type="submit" disabled={!configured}>Ingresar al panel <span>→</span></button></form></section>
    </main>
  );

  return (
    <main className="admin-page">
      <aside className="admin-sidebar"><Link className="brand" href="/"><span className="brand-mark"><i /></span><span className="brand-copy"><strong>ASSEL</strong><small>Administración</small></span></Link><nav>{tabs.map((item, index) => <button className={tab === item.key ? 'active' : ''} onClick={() => { setTab(item.key); if (item.key === 'history') void loadHistory(); }} key={item.key}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}</nav><div className="admin-sidebar-foot"><p><i /> Conectado a GitHub</p><Link href="/" target="_blank">Ver sitio público ↗</Link><button onClick={logout}>Cerrar sesión</button></div></aside>
      <section className="admin-workspace">
        <header><div><small>Panel de contenidos</small><h1>{currentTab}</h1></div><div className="admin-header-actions"><button className="reset-button" onClick={loadContent} disabled={loadingContent || publishStage === 'deploying'}>Descartar cambios</button><button className="admin-publish-button" onClick={publish} disabled={!dirty || publishStage === 'deploying'}>{publishStage === 'deploying' ? 'Publicando…' : 'Publicar cambios'}</button></div></header>
        <div className={`admin-publish-status is-${publishStage}`} role="status"><span /> <div><b>{dirty ? 'Cambios pendientes' : publishStage === 'live' ? 'Sitio actualizado' : 'Contenido sincronizado'}</b><p>{notice || (dirty ? 'Revisa los textos y publícalos cuando estén listos.' : 'Edita cualquier texto para preparar una nueva versión.')}</p></div></div>
        {loadingContent && <div className="admin-loading">Cargando textos desde GitHub…</div>}
        {!loadingContent && content && tab !== 'history' && <PageEditor pageKey={tab} content={content} onChange={(path, value) => { setContent((current) => current ? setAtPath(current, path, value) : current); setDirty(true); setPublishStage('idle'); setNotice(''); }} />}
        {tab === 'history' && <section className="admin-history"><div className="admin-history-intro"><h2>Versiones publicadas</h2><p>Cada publicación queda guardada. Restaurar una versión no borra el historial: crea una nueva publicación con esos textos.</p></div>{historyLoading ? <div className="admin-loading">Consultando versiones…</div> : <div className="admin-history-list">{history.map((item) => <article key={item.sha}><div><b>{item.message}</b><span>{new Date(item.date).toLocaleString('es-CL')} · {item.author}</span><a href={item.url} target="_blank" rel="noopener noreferrer">Ver en GitHub ↗</a></div><button onClick={() => restore(item)}>Restaurar esta versión</button></article>)}</div>}</section>}
      </section>
    </main>
  );
}
