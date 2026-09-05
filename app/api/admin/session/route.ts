import { NextResponse } from 'next/server';
import { adminIsConfigured, requestHasAdminSession } from '../../../lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return NextResponse.json(
    { authenticated: requestHasAdminSession(request), configured: adminIsConfigured() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
