import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experience } from '@/data/resume';
import ExperienceDetail from '@/components/ExperienceDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experience.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = experience.find((e) => e.slug === slug);
  if (!job) return {};
  return {
    title: `${job.role} at ${job.company} | Devang Goyal`,
    description: `${job.role} at ${job.company} (${job.startDate} – ${job.endDate}). ${job.bullets[0]?.text.slice(0, 120)}...`,
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const jobIndex = experience.findIndex((e) => e.slug === slug);
  if (jobIndex === -1) notFound();

  const job = experience[jobIndex];
  const prev = experience[jobIndex - 1] ?? null;
  const next = experience[jobIndex + 1] ?? null;

  return <ExperienceDetail job={job} prev={prev} next={next} />;
}
