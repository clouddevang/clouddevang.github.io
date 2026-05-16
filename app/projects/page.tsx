import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: 'Projects | Devang Goyal',
  description: 'Featured engineering projects spanning full-stack apps, networking, and robotics control systems.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="PORTFOLIO"
        title="Featured Projects"
        titleHighlight="Projects"
        description="A selection of engineering work — from distributed systems to robotics."
      />
      <Projects />
    </>
  );
}
