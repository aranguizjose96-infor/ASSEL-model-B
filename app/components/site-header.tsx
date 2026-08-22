'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  ['/', 'Inicio'],
  ['/nosotros', 'Nosotros'],
  ['/servicios', 'Servicios'],
  ['/casos-de-exito', 'Casos de éxito'],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`global-header ${isHome && !scrolled ? 'is-transparent' : 'is-solid'} ${open ? 'menu-open' : ''}`}>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="ASSEL SpA, ir al inicio">
          <span className="brand-mark"><i /></span>
          <span className="brand-copy"><strong>ASSEL</strong><small>Prevención · Seguridad</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([href, label]) => <Link className={pathname === href ? 'active' : ''} href={href} key={href}>{label}</Link>)}
        </nav>

        <Link className="header-cta" href="/contacto">Solicitar asesoría <span aria-hidden="true">↗</span></Link>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          <span /><span />
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu">
        <nav aria-label="Navegación móvil">
          {links.map(([href, label], index) => <Link href={href} key={href}><small>0{index + 1}</small>{label}<span>↗</span></Link>)}
          <Link href="/contacto"><small>05</small>Contáctanos<span>↗</span></Link>
        </nav>
        <p>Santiago de Chile · Cobertura nacional</p>
      </div>
    </header>
  );
}
