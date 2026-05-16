// filepath: app/layout.tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';
import MilestoneNav from '@/components/MilestoneNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://clouddevang.github.io'),
  title: 'Devang Goyal | SRE · DevOps · Cloud Engineer',
  description:
    'Results-driven SRE & Cloud Engineer with extensive experience architecting, automating, and operating mission-critical infrastructure at scale across Azure and AWS. Expertise in container orchestration, infrastructure as code, CI/CD pipelines, and distributed observability.',
  keywords: [
    'SRE',
    'Site Reliability Engineer',
    'DevOps',
    'Cloud Engineer',
    'Azure',
    'AWS',
    'Kubernetes',
    'Terraform',
    'Infrastructure as Code',
    'Platform Engineer',
    'Devang Goyal',
  ],
  authors: [{ name: 'Devang Goyal' }],
  creator: 'Devang Goyal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clouddevang.github.io',
    siteName: 'Devang Goyal Portfolio',
    title: 'Devang Goyal | SRE · DevOps · Cloud Engineer',
    description:
      'Results-driven SRE & Cloud Engineer architecting mission-critical infrastructure at scale across Azure and AWS.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devang Goyal - SRE & Cloud Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devang Goyal | SRE · DevOps · Cloud Engineer',
    description:
      'Results-driven SRE & Cloud Engineer architecting mission-critical infrastructure at scale across Azure and AWS.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        <ScrollProgress />
        <CursorGlow />
        <MilestoneNav />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
