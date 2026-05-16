import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { skills } from '@/data/resume';
import SkillDetail from '@/components/SkillDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return skills.map((group) => ({ slug: group.icon }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = skills.find((g) => g.icon === slug);
  if (!group) return {};
  return {
    title: `${group.category} Skills | Devang Goyal`,
    description: `${group.category} expertise: ${group.skills.map((s) => s.name).join(', ')}.`,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const groupIndex = skills.findIndex((g) => g.icon === slug);
  if (groupIndex === -1) notFound();

  return (
    <SkillDetail
      group={skills[groupIndex]}
      prev={skills[groupIndex - 1] ?? null}
      next={skills[groupIndex + 1] ?? null}
    />
  );
}
