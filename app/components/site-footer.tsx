import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <div>
          <p className="eyebrow"><span /> El siguiente paso</p>
          <h2>Una operación más segura<br />comienza con una conversación.</h2>
        </div>
        <Link className="footer-circle" href="/contacto"><span>Hablemos</span><b>↗</b></Link>
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand-mark"><i /></span><span className="brand-copy"><strong>ASSEL</strong><small>Prevención · Seguridad</small></span>
          </Link>
          <p>Asesoría técnica con mirada humana para construir entornos de trabajo más seguros, saludables y sostenibles.</p>
        </div>
        <div><small>Navegación</small><Link href="/nosotros">Nosotros</Link><Link href="/servicios">Servicios</Link><Link href="/casos-de-exito">Casos de éxito</Link><Link href="/contacto">Contacto</Link></div>
        <div><small>Contacto</small><a href="tel:+56920510214">+56 9 2051 0214</a><a href="mailto:aranguizjose96@gmail.com">aranguizjose96@gmail.com</a><p>Santiago de Chile</p></div>
        <div><small>Síguenos</small><span className="social-disabled">LinkedIn · Próximamente</span><span className="social-disabled">Instagram · Próximamente</span><Link href="/admin">Panel de demostración</Link></div>
      </div>
      <div className="footer-base"><p>© 2026 ASSEL SpA. Todos los derechos reservados.</p><p>Prevención con criterio · Gestión con evidencia</p></div>
    </footer>
  );
}
