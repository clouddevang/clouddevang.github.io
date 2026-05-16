import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { certifications } from '@/data/resume';
import CertDetail from '@/components/CertDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return certifications.map((cert) => ({ slug: cert.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cert = certifications.find((c) => c.slug === slug);
  if (!cert) return {};
  return {
    title: `${cert.name} | Devang Goyal`,
    description: `${cert.name} — issued by ${cert.issuer} in ${cert.year}.`,
  };
}

export default async function CertDetailPage({ params }: Props) {
  const { slug } = await params;
  const certIndex = certifications.findIndex((c) => c.slug === slug);
  if (certIndex === -1) notFound();

  return (
    <CertDetail
      cert={certifications[certIndex]}
      prev={certifications[certIndex - 1] ?? null}
      next={certifications[certIndex + 1] ?? null}
    />
  );
}
