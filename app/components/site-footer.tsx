import Link from 'next/link';
import { InstagramIcon, LinkedInIcon } from './social-icons';
import { siteContent } from '../lib/content';

export function SiteFooter() {
  const copy = siteContent.general;
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="footer-brand-logo" href="/" aria-label="ASSEL SpA, ir al inicio">
            <img src="/brand/logo-assel-oficial.png" alt="ASSEL SpA — Asesoría en Salud y Seguridad Laboral" />
          </Link>
          <p>{copy.footer.description}</p>
        </div>
        <div className="footer-certification" aria-label="ASSEL es proveedor del Estado a través de ChileCompra">
          <small>{copy.footer.publicRecord}</small>
          <img src="/brand/chilecompra-proveedores-estado.jpeg" alt="Somos proveedores del Estado, Dirección ChileCompra" />
        </div>
        <div className="footer-nav"><small>{copy.footer.navigationTitle}</small><Link href="/nosotros">{copy.navigation.about}</Link><Link href="/servicios">{copy.navigation.services}</Link><Link href="/ventas-de-epp">{copy.navigation.epp}</Link><Link href="/casos-de-exito">{copy.navigation.cases}</Link><Link href="/contacto">{copy.navigation.contact}</Link></div>
        <div><small>{copy.footer.contactTitle}</small><a href="tel:+56971401031">{siteContent.contact.info.phone}</a><a href={`mailto:${siteContent.contact.info.email}`}>{siteContent.contact.info.email}</a><p>{siteContent.contact.info.location}</p></div>
        <div><small>{copy.footer.followTitle}</small><a className="footer-social-link" href="https://www.linkedin.com/in/crist%C3%B3bal-vald%C3%A9s-85a6b81a5/" target="_blank" rel="noopener noreferrer" aria-label="Visitar el perfil de LinkedIn"><span className="footer-social-icon linkedin"><LinkedInIcon /></span><span>{siteContent.contact.info.linkedinLabel}</span></a><a className="footer-social-link" href="https://www.instagram.com/assel_asesorias/" target="_blank" rel="noopener noreferrer" aria-label="Visitar el perfil de Instagram de ASSEL Asesorías"><span className="footer-social-icon instagram"><InstagramIcon /></span><span>{siteContent.contact.info.instagramLabel}</span></a><Link href="/admin">{copy.footer.panelLink}</Link></div>
      </div>
      <div className="footer-base"><p>{copy.footer.copyright}</p><p>{copy.footer.claim}</p></div>
    </footer>
  );
}
