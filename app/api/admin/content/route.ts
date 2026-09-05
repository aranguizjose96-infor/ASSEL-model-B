import { NextResponse } from 'next/server';
import { requestHasAdminSession, validMutationOrigin } from '../../../lib/admin-auth';
import { readGitHubContent, writeGitHubContent } from '../../../lib/github-content';
import { validateSiteContent } from '../../../lib/content-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ error: 'Tu sesión venció. Vuelve a ingresar.' }, { status: 401 });
}

export async function GET(request: Request) {
  if (!requestHasAdminSession(request)) return unauthorized();
  try {
    const current = await readGitHubContent();
    const validation = validateSiteContent(current.content);
    if (!validation.valid) return NextResponse.json({ error: 'El archivo de contenido de GitHub tiene una estructura inválida.', details: validation.errors }, { status: 500 });
    return NextResponse.json(current, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No se pudo leer el contenido de GitHub.' }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  if (!requestHasAdminSession(request)) return unauthorized();
  if (!validMutationOrigin(request)) return NextResponse.json({ error: 'Solicitud no autorizada.' }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { content?: unknown; expectedSha?: string; message?: string };
  const validation = validateSiteContent(body.content);
  if (!validation.valid) return NextResponse.json({ error: 'Revisa los textos antes de publicar.', details: validation.errors }, { status: 400 });
  if (!body.expectedSha) return NextResponse.json({ error: 'Falta la versión de origen. Recarga el panel.' }, { status: 400 });

  try {
    const result = await writeGitHubContent(validation.content, body.expectedSha, body.message?.trim() || 'Actualiza textos desde el panel ASSEL');
    return NextResponse.json(result);
  } catch (error) {
    const status = (error as Error & { status?: number }).status;
    if (status === 409 || status === 422) return NextResponse.json({ error: 'El contenido cambió en GitHub mientras editabas. Recarga para evitar sobrescribir cambios.' }, { status: 409 });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'No se pudo publicar en GitHub.' }, { status: 502 });
  }
}
