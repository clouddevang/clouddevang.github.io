import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import Skills from '@/components/Skills';

export const metadata: Metadata = {
  title: 'Skills | Devang Goyal',
  description: 'Technical skills across AWS, Azure, Kubernetes, Terraform, observability, and more.',
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        label="EXPERTISE"
        title="Technical Skills"
        titleHighlight="Skills"
        description="7 skill domains, 50+ technologies — built through years of hands-on production engineering."
      />
      <Skills />
    </>
  );
}
