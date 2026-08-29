import type { Metadata } from 'next';
import './globals.css';
import { ContentProvider } from './components/content-provider';
import { SiteChrome } from './components/site-chrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://assel.cl'),
  title: { default: 'ASSEL SpA | Prevención y seguridad laboral', template: '%s · ASSEL SpA' },
  description: 'Asesoría estratégica en prevención de riesgos, cumplimiento documental y cultura de seguridad para empresas en Chile.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'ASSEL SpA | Prevenir con criterio. Avanzar con confianza.',
    description: 'Prevención y seguridad laboral para empresas que quieren avanzar con confianza.',
    url: '/',
    siteName: 'ASSEL SpA',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'ASSEL SpA — Prevención y seguridad laboral' }],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'ASSEL SpA | Prevención y seguridad laboral', description: 'Prevenir con criterio. Avanzar con confianza.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body><ContentProvider><SiteChrome>{children}</SiteChrome></ContentProvider></body>
    </html>
  );
}
