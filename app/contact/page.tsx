import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact | Devang Goyal',
  description: 'Get in touch with Devang Goyal — available for SRE, DevOps, and Cloud Engineering opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="GET IN TOUCH"
        title="Contact Me"
        titleHighlight="Me"
        description="Open to new opportunities, collaborations, and interesting conversations."
      />
      <Contact />
    </>
  );
}
