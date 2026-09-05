'use client';

import { FormEvent, useState } from 'react';
import { siteContent } from '../lib/content';

export function ContactForm() {
  const copy = siteContent.contact.form;
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const nextErrors: Record<string, string> = {};
    if (!String(form.get('nombre') || '').trim()) nextErrors.nombre = 'Ingresa tu nombre.';
    if (!/^\S+@\S+\.\S+$/.test(String(form.get('correo') || ''))) nextErrors.correo = 'Ingresa un correo válido.';
    if (!String(form.get('mensaje') || '').trim()) nextErrors.mensaje = 'Cuéntanos brevemente qué necesitas.';
    setErrors(nextErrors);
    setStatusMessage('');
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setStatusMessage('Revisa los campos marcados antes de continuar.');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.get('nombre'),
          empresa: form.get('empresa'),
          correo: form.get('correo'),
          telefono: form.get('telefono'),
          mensaje: form.get('mensaje'),
          website: form.get('website'),
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.error || 'No pudimos enviar el mensaje.');

      formElement.reset();
      setErrors({});
      setStatus('success');
      setStatusMessage(copy.success);
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'No pudimos enviar el mensaje. Inténtalo nuevamente.');
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate aria-busy={status === 'sending'}>
      <div className="form-heading"><p className="eyebrow dark"><span /> {copy.eyebrow}</p><span>{copy.responseTime}</span></div>
      <div className="field-row"><label>{copy.name}<input name="nombre" autoComplete="name" maxLength={120} aria-invalid={!!errors.nombre} />{errors.nombre && <small>{errors.nombre}</small>}</label><label>{copy.company}<input name="empresa" autoComplete="organization" maxLength={160} /></label></div>
      <div className="field-row"><label>{copy.email}<input name="correo" type="email" autoComplete="email" maxLength={254} aria-invalid={!!errors.correo} />{errors.correo && <small>{errors.correo}</small>}</label><label>{copy.phone}<input name="telefono" type="tel" autoComplete="tel" maxLength={50} /></label></div>
      <label>{copy.message}<textarea name="mensaje" rows={5} maxLength={4000} placeholder={copy.placeholder} aria-invalid={!!errors.mensaje} />{errors.mensaje && <small>{errors.mensaje}</small>}</label>
      <label className="contact-honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? copy.sending : copy.button} <span>→</span></button>
      <div className={`form-status ${status}`} role="status" aria-live="polite">{statusMessage}</div>
    </form>
  );
}
