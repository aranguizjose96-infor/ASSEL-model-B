import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminIsConfigured, createAdminSession, validMutationOrigin, verifyAdminCredentials } from '../../../lib/admin-auth';

export const runtime = 'nodejs';

const attempts = new Map<string, { count: number; blockedUntil: number }>();

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return NextResponse.json({ error: 'Solicitud no autorizada.' }, { status: 403 });
  if (!adminIsConfigured()) return NextResponse.json({ error: 'El acceso todavía no está configurado en Vercel.' }, { status: 503 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const current = attempts.get(ip);
  if (current && current.blockedUntil > Date.now()) {
    return NextResponse.json({ error: 'Demasiados intentos. Espera unos minutos antes de volver a intentar.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({})) as { username?: string; password?: string };
  if (!verifyAdminCredentials(String(body.username || ''), String(body.password || ''))) {
    const count = (current?.count || 0) + 1;
    attempts.set(ip, { count, blockedUntil: count >= 5 ? Date.now() + 10 * 60 * 1000 : 0 });
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 });
  }

  attempts.delete(ip);
  const session = createAdminSession(String(body.username));
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: session.maxAge,
    priority: 'high',
  });
  return response;
}
