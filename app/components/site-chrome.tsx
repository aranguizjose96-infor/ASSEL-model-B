'use client';

import { usePathname } from 'next/navigation';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isContact = pathname.startsWith('/contacto');
  if (isAdmin) return <>{children}</>;
  return <><SiteHeader />{children}{!isContact && <a className="whatsapp-float" href="https://wa.me/56971401031?text=Hola%20ASSEL%2C%20quiero%20conocer%20sus%20servicios" target="_blank" rel="noopener noreferrer" aria-label="Contactar a ASSEL por WhatsApp al +56 9 7140 1031"><span>WA</span><b>¿Hablamos?</b></a>}<SiteFooter /></>;
}
