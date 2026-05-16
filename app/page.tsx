// filepath: app/page.tsx
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';

const Skills = dynamic(() => import('@/components/Skills'));
const Experience = dynamic(() => import('@/components/Experience'));
const Projects = dynamic(() => import('@/components/Projects'));
const Education = dynamic(() => import('@/components/Education'));
const Certifications = dynamic(() => import('@/components/Certifications'));
const Blog = dynamic(() => import('@/components/Blog'));
const Contact = dynamic(() => import('@/components/Contact'));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Blog />
      <Contact />
    </>
  );
}
