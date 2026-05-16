import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import Experience from '@/components/Experience';

export const metadata: Metadata = {
  title: 'Experience | Devang Goyal',
  description: 'Work history as an SRE & Cloud Engineer at BitFlyer and Accenture Japan — 5+ years of production impact.',
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        label="CAREER"
        title="Work Experience"
        titleHighlight="Experience"
        description="5+ years building and operating mission-critical infrastructure across fintech and enterprise."
      />
      <Experience />
    </>
  );
}
