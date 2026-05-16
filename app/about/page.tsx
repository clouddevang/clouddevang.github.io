import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import About from '@/components/About';
import Education from '@/components/Education';

export const metadata: Metadata = {
  title: 'About | Devang Goyal',
  description: 'SRE & Cloud Engineer from IIT Kanpur — 5+ years building resilient infrastructure across Azure and AWS.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="INTRODUCTION"
        title="About Me"
        titleHighlight="Me"
        description="SRE and Cloud Engineer passionate about building systems that scale reliably."
      />
      <About />
      <Education />
    </>
  );
}
