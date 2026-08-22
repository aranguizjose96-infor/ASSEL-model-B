import type { Metadata } from 'next';
import { AdminPanel } from '../components/admin-panel';

export const metadata: Metadata = { title: 'Panel de demostración | ASSEL SpA', robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminPanel />; }
