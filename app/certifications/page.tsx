import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import Certifications from '@/components/Certifications';

export const metadata: Metadata = {
  title: 'Certifications | Devang Goyal',
  description: '7 professional certifications across AWS, Azure, and JLPT — validating cloud and language expertise.',
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        label="CREDENTIALS"
        title="Professional Certifications"
        titleHighlight="Certifications"
        description="Industry-recognized credentials spanning AWS, Azure, and Japanese language proficiency."
      />
      <Certifications />
    </>
  );
}
