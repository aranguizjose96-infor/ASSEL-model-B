import Link from 'next/link';
import { InstagramIcon, LinkedInIcon } from './social-icons';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="footer-brand-logo" href="/" aria-label="ASSEL SpA, ir al inicio">
            <img src="/brand/logo-assel-oficial.png" alt="ASSEL SpA — Asesoría en Salud y Seguridad Laboral" />
          </Link>
          <p>Asesoría técnica con mirada humana para construir entornos de trabajo más seguros, saludables y sostenibles.</p>
          <div className="footer-certification" aria-label="ASSEL es proveedor del Estado a través de ChileCompra">
            <span>Registro público</span>
            <img src="/brand/chilecompra-proveedores-estado.jpeg" alt="Somos proveedores del Estado, Dirección ChileCompra" />
          </div>
        </div>
        <div className="footer-nav"><small>Navegación</small><Link href="/nosotros">Nosotros</Link><Link href="/servicios">Servicios</Link><Link href="/productos">Productos</Link><Link href="/casos-de-exito">Casos de éxito</Link><Link href="/contacto">Contacto</Link></div>
        <div><small>Contacto</small><a href="tel:+56971401031">+56 9 7140 1031</a><a href="mailto:contacto@assel.cl">contacto@assel.cl</a><p>Santiago de Chile</p></div>
        <div><small>Síguenos</small><a className="footer-social-link" href="https://www.linkedin.com/in/crist%C3%B3bal-vald%C3%A9s-85a6b81a5/" target="_blank" rel="noopener noreferrer" aria-label="Visitar el perfil de LinkedIn"><span className="footer-social-icon linkedin"><LinkedInIcon /></span><span>LinkedIn</span></a><a className="footer-social-link" href="https://www.instagram.com/assel_asesorias/" target="_blank" rel="noopener noreferrer" aria-label="Visitar el perfil de Instagram de ASSEL Asesorías"><span className="footer-social-icon instagram"><InstagramIcon /></span><span>Instagram</span></a><Link href="/admin">Panel de demostración</Link></div>
      </div>
      <div className="footer-base"><p>© 2026 ASSEL SpA. Todos los derechos reservados.</p><p>Prevención con criterio · Gestión con evidencia</p></div>
    </footer>
  );
}
