import type { Metadata } from 'next';
import { ContactForm } from '../components/contact-form';
import { PageHero } from '../components/page-hero';
import { ClockIcon, GoogleMapsIcon, InstagramIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '../components/social-icons';
import { siteContent } from '../lib/content';

export const metadata: Metadata = { title: 'Contacto', description: 'Solicita una asesoría en prevención de riesgos y seguridad laboral con ASSEL SpA.' };

export default function ContactoPage() {
  const copy = siteContent.contact;
  return <main className="inner-page contact-page"><PageHero index="06" eyebrow={copy.hero.eyebrow} title={copy.hero.title} accent={copy.hero.accent} intro={copy.hero.intro} />
    <section className="contact-layout"><div className="contact-info"><p className="eyebrow dark"><span /> {copy.info.eyebrow}</p><h2>{copy.info.title}</h2><p>{copy.info.intro}</p><div className="contact-options"><a href="https://wa.me/56971401031?text=Hola%20ASSEL%2C%20quiero%20solicitar%20una%20asesor%C3%ADa" target="_blank" rel="noopener noreferrer" aria-label={`Conversar con ASSEL por WhatsApp al ${copy.info.phone}`}><span className="whatsapp-contact-icon"><WhatsAppIcon /></span><p><small>{copy.info.whatsappLabel}</small><strong>{copy.info.phone}</strong></p><b>↗</b></a><a href={`mailto:${copy.info.email}`}><span className="email-contact-icon"><MailIcon /></span><p><small>{copy.info.emailLabel}</small><strong>{copy.info.email}</strong></p><b>↗</b></a><div><span className="google-maps-contact-icon"><GoogleMapsIcon /></span><p><small>{copy.info.locationLabel}</small><strong>{copy.info.location}</strong></p></div><a href="https://www.linkedin.com/in/crist%C3%B3bal-vald%C3%A9s-85a6b81a5/" target="_blank" rel="noopener noreferrer" aria-label="Visitar el perfil de LinkedIn de Cristóbal Valdés"><span className="contact-social-icon linkedin"><LinkedInIcon /></span><p><small>{copy.info.linkedinLabel}</small><strong>{copy.info.linkedinName}</strong></p><b>↗</b></a><a href="https://www.instagram.com/assel_asesorias/" target="_blank" rel="noopener noreferrer" aria-label="Visitar el perfil de Instagram de ASSEL Asesorías"><span className="contact-social-icon instagram"><InstagramIcon /></span><p><small>{copy.info.instagramLabel}</small><strong>{copy.info.instagramName}</strong></p><b>↗</b></a></div><div className="contact-hours"><span className="contact-hours-icon"><ClockIcon /></span><div className="contact-hours-copy"><small>{copy.hours.label}</small><p><strong>{copy.hours.days}</strong><span>{copy.hours.time}</span></p></div><div className="contact-hours-status"><i aria-hidden="true" />{copy.hours.status}</div></div></div><ContactForm /></section>
    <section className="contact-map"><div><span>SCL</span><p>{copy.map.city}</p><small>{copy.map.coverage}</small></div></section>
  </main>;
}
