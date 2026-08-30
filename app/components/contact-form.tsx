'use client';

import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    if (!String(form.get('nombre') || '').trim()) nextErrors.nombre = 'Ingresa tu nombre.';
    if (!/^\S+@\S+\.\S+$/.test(String(form.get('correo') || ''))) nextErrors.correo = 'Ingresa un correo válido.';
    if (!String(form.get('mensaje') || '').trim()) nextErrors.mensaje = 'Cuéntanos brevemente qué necesitas.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setStatus('error'); return; }
    setStatus('sending');
    window.setTimeout(() => { setStatus('success'); (event.target as HTMLFormElement).reset(); }, 850);
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading"><p className="eyebrow dark"><span /> Solicitud de contacto</p><span>Respondemos habitualmente dentro de un día hábil.</span></div>
      <div className="field-row"><label>Nombre y apellido *<input name="nombre" aria-invalid={!!errors.nombre} />{errors.nombre && <small>{errors.nombre}</small>}</label><label>Empresa<input name="empresa" /></label></div>
      <div className="field-row"><label>Correo electrónico *<input name="correo" type="email" aria-invalid={!!errors.correo} />{errors.correo && <small>{errors.correo}</small>}</label><label>Teléfono<input name="telefono" type="tel" /></label></div>
      <label>Mensaje *<textarea name="mensaje" rows={5} placeholder="Cuéntanos sobre tu empresa, proyecto o necesidad..." aria-invalid={!!errors.mensaje} />{errors.mensaje && <small>{errors.mensaje}</small>}</label>
      <button className="submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitud'} <span>→</span></button>
      <div className={`form-status ${status}`} role="status" aria-live="polite">{status === 'success' && 'Tu mensaje fue registrado correctamente. Esta demostración quedará lista para conectarse a EmailJS con las credenciales definitivas.'}{status === 'error' && Object.keys(errors).length > 0 && 'Revisa los campos marcados antes de continuar.'}</div>
    </form>
  );
}
