import { NextResponse } from 'next/server';
import { adminIsConfigured, adminLocalPreviewMode, requestHasAdminSession } from '../../../lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return NextResponse.json(
    { authenticated: requestHasAdminSession(request), configured: adminIsConfigured(), localPreview: adminLocalPreviewMode() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
