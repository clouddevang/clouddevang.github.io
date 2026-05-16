'use client';

import PageTransition from '@/components/shared/PageTransition';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
