import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, validMutationOrigin } from '../../../lib/admin-auth';

export async function POST(request: Request) {
  if (!validMutationOrigin(request)) return NextResponse.json({ error: 'Solicitud no autorizada.' }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}
