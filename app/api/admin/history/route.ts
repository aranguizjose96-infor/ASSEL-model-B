import { NextResponse } from 'next/server';
import { requestHasAdminSession, validMutationOrigin } from '../../../lib/admin-auth';
import { readContentHistory, readGitHubContent, writeGitHubContent } from '../../../lib/github-content';
import { validateSiteContent } from '../../../lib/content-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!requestHasAdminSession(request)) return NextResponse.json({ error: 'Tu sesión venció.' }, { status: 401 });
  try {
    return NextResponse.json({ commits: await readContentHistory() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No se pudo consultar el historial.' }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!requestHasAdminSession(request)) return NextResponse.json({ error: 'Tu sesión venció.' }, { status: 401 });
  if (!validMutationOrigin(request)) return NextResponse.json({ error: 'Solicitud no autorizada.' }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { restoreSha?: string; expectedSha?: string };
  if (!body.restoreSha || !body.expectedSha) return NextResponse.json({ error: 'Falta identificar la versión a recuperar.' }, { status: 400 });
  try {
    const historical = await readGitHubContent(body.restoreSha);
    const validation = validateSiteContent(historical.content);
    if (!validation.valid) return NextResponse.json({ error: 'La versión elegida no es compatible con el panel actual.' }, { status: 400 });
    const result = await writeGitHubContent(validation.content, body.expectedSha, `Restaura textos desde ${body.restoreSha.slice(0, 7)}`);
    return NextResponse.json({ ...result, content: validation.content });
  } catch (error) {
    const status = (error as Error & { status?: number }).status;
    if (status === 409 || status === 422) return NextResponse.json({ error: 'La versión actual cambió. Recarga el panel antes de restaurar.' }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No se pudo restaurar la versión.' }, { status: 502 });
  }
}
