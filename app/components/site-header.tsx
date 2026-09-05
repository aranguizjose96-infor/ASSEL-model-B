'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  ['/', 'Inicio'],
  ['/nosotros', 'Nosotros'],
  ['/servicios', 'Servicios'],
  ['/ventas-de-epp', 'Ventas de EPP'],
  ['/casos-de-exito', 'Casos de éxito'],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`global-header ${isHome && !scrolled ? 'is-transparent' : 'is-solid'} ${open ? 'menu-open' : ''}`}>
      <div className="header-inner">
        <Link className="header-brand-lockup" href="/" aria-label="ASSEL SpA, Asesoría en Salud y Seguridad Laboral, ir al inicio">
          <Image src="/brand/logo-assel-navbar-v3.png" alt="" width={1200} height={400} priority sizes="(max-width: 760px) 215px, 260px" />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([href, label]) => <Link className={pathname === href ? 'active' : ''} href={href} key={href}>{label}</Link>)}
        </nav>

        <Link className="header-cta" href="/contacto">Solicitar asesoría <span aria-hidden="true">↗</span></Link>
        <button className="menu-button" type="button" onClick={() => setOpenPath(open ? null : pathname)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          <span /><span />
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu">
        <nav aria-label="Navegación móvil">
          {links.map(([href, label], index) => <Link href={href} onClick={() => setOpenPath(null)} key={href}><small>0{index + 1}</small>{label}<span>↗</span></Link>)}
          <Link href="/contacto" onClick={() => setOpenPath(null)}><small>06</small>Contáctanos<span>↗</span></Link>
        </nav>
        <p>Santiago de Chile · Cobertura nacional</p>
      </div>
    </header>
  );
}
