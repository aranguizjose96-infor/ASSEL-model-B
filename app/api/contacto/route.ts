import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ContactPayload = Record<string, unknown>;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'La solicitud no tiene un formato válido.' }, { status: 400 });
  }

  const nombre = clean(payload.nombre, 120);
  const empresa = clean(payload.empresa, 160);
  const correo = clean(payload.correo, 254).toLowerCase();
  const telefono = clean(payload.telefono, 50);
  const mensaje = clean(payload.mensaje, 4000);
  const website = clean(payload.website, 200);

  // Los bots suelen completar este campo oculto. Se responde sin enviar correo.
  if (website) return NextResponse.json({ ok: true });

  if (!nombre || !/^\S+@\S+\.\S+$/.test(correo) || !mensaje) {
    return NextResponse.json({ error: 'Revisa los campos obligatorios.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'El servicio de correo aún no está configurado.' }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const safeNombre = escapeHtml(nombre);
  const safeEmpresa = escapeHtml(empresa || 'No indicada');
  const safeCorreo = escapeHtml(correo);
  const safeTelefono = escapeHtml(telefono || 'No indicado');
  const safeMensaje = escapeHtml(mensaje).replace(/\n/g, '<br />');

  try {
    const { error } = await resend.emails.send({
      from: 'ASSEL Sitio Web <contacto@formularios.assel.cl>',
      to: ['contacto@assel.cl', 'aranguizjose96@gmail.com'],
      replyTo: correo,
      subject: `Nueva solicitud web — ${nombre}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#071d24;line-height:1.6;max-width:640px;margin:0 auto">
          <div style="background:#071d24;color:#fff;padding:24px 28px">
            <p style="margin:0;color:#adff2f;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Formulario de contacto</p>
            <h1 style="margin:8px 0 0;font-size:25px">Nueva solicitud para ASSEL</h1>
          </div>
          <div style="padding:28px;border:1px solid #d9e0dc;border-top:0">
            <p><strong>Nombre:</strong> ${safeNombre}</p>
            <p><strong>Empresa:</strong> ${safeEmpresa}</p>
            <p><strong>Correo:</strong> <a href="mailto:${safeCorreo}">${safeCorreo}</a></p>
            <p><strong>Teléfono:</strong> ${safeTelefono}</p>
            <hr style="border:0;border-top:1px solid #d9e0dc;margin:24px 0" />
            <p style="margin-bottom:8px"><strong>Mensaje:</strong></p>
            <p style="margin-top:0">${safeMensaje}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend rechazó el correo del formulario:', error.name);
      return NextResponse.json({ error: 'No pudimos enviar el mensaje. Inténtalo nuevamente.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error al enviar el formulario:', error instanceof Error ? error.name : 'desconocido');
    return NextResponse.json({ error: 'No pudimos enviar el mensaje. Inténtalo nuevamente.' }, { status: 500 });
  }
}
