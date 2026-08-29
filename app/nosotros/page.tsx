import type { Metadata } from 'next';
import { NosotrosContent } from './nosotros-content';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce al equipo, el método y la propuesta de valor con que ASSEL convierte la prevención en una inversión para cada organización.',
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
