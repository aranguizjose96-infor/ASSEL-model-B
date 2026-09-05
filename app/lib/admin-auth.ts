import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'assel_admin_session';
const SESSION_SECONDS = 60 * 60 * 8;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  if (process.env.ADMIN_PASSWORD && process.env.GITHUB_CONTENT_TOKEN) {
    return createHash('sha256').update(`${process.env.ADMIN_PASSWORD}:${process.env.GITHUB_CONTENT_TOKEN}`).digest('hex');
  }
  return '';
}

export function adminIsConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && sessionSecret().length >= 32);
}

export function verifyAdminCredentials(username: string, password: string) {
  if (!adminIsConfigured()) return false;
  return safeEqual(username, process.env.ADMIN_USERNAME || '') && safeEqual(password, process.env.ADMIN_PASSWORD || '');
}

export function createAdminSession(username: string) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ username, expires })).toString('base64url');
  const signature = createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
  return { token: `${payload}.${signature}`, maxAge: SESSION_SECONDS };
}

export function verifyAdminSession(token?: string) {
  if (!token || !adminIsConfigured()) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
  if (!safeEqual(signature, expected)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { username?: string; expires?: number };
    return parsed.username === process.env.ADMIN_USERNAME && Number(parsed.expires) > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function requestHasAdminSession(request: Request) {
  const cookies = request.headers.get('cookie') || '';
  const token = cookies.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return verifyAdminSession(token);
}

export function validMutationOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
