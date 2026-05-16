import HomeBillboard from '@/components/home/HomeBillboard';
import ContentRow from '@/components/home/ContentRow';
import ExperiencePreviewCard from '@/components/home/ExperiencePreviewCard';
import SkillPreviewCard from '@/components/home/SkillPreviewCard';
import ProjectPreviewCard from '@/components/home/ProjectPreviewCard';
import CertPreviewCard from '@/components/home/CertPreviewCard';
import BlogPreviewCard from '@/components/home/BlogPreviewCard';
import ContactTeaser from '@/components/home/ContactTeaser';
import { experience, skills, projects, certifications } from '@/data/resume';

// Static blog posts for preview row
const blogPosts = [
  {
    slug: 'nginx-to-f5-ingress-migration',
    title: 'Migrating from Community ingress-nginx to F5 NGINX Ingress Controller Across 3 AKS Clusters',
    date: '2026-05-16',
    summary: 'A production war story covering the IngressClass immutability trap, WebSocket keepalive surprises, rate limiting rewrites, and zero-downtime service patching.',
    tags: ['Kubernetes', 'NGINX', 'AKS', 'SRE'],
    readTime: '14 min read',
  },
  {
    slug: 'slos-slis-error-budgets',
    title: 'SLOs, SLIs, and Error Budgets: A Practical Guide for SREs',
    date: '2025-01-20',
    summary: 'A practical guide to implementing Service Level Objectives, Indicators, and Error Budgets—the foundation of modern SRE practices.',
    tags: ['SRE', 'Observability', 'Reliability'],
    readTime: '12 min read',
  },
  {
    slug: 'zero-trust-azure',
    title: 'Building Zero-Trust Infrastructure on Azure: A Production Story',
    date: '2024-12-15',
    summary: 'How we redesigned our entire backend infrastructure with VNet integration, private endpoints, and RBAC-enforced Key Vault access.',
    tags: ['Azure', 'Security', 'SRE'],
    readTime: '8 min read',
  },
];

export default function Home() {
  return (
    <>
      <HomeBillboard />

      <ContentRow label="CAREER" title="Work Experience" href="/experience">
        {experience.map((job) => (
          <ExperiencePreviewCard key={job.slug} job={job} />
        ))}
      </ContentRow>

      <ContentRow label="EXPERTISE" title="Technical Skills" href="/skills">
        {skills.map((group) => (
          <SkillPreviewCard key={group.category} group={group} />
        ))}
      </ContentRow>

      <ContentRow label="PORTFOLIO" title="Featured Projects" href="/projects">
        {projects.map((project, i) => (
          <ProjectPreviewCard key={project.title} project={project} index={i} />
        ))}
      </ContentRow>

      <ContentRow label="CREDENTIALS" title="Certifications" href="/certifications">
        {certifications.map((cert) => (
          <CertPreviewCard key={cert.name} cert={cert} />
        ))}
      </ContentRow>

      <ContentRow label="INSIGHTS" title="From The Blog" href="/blog">
        {blogPosts.map((post) => (
          <BlogPreviewCard key={post.slug} post={post} />
        ))}
      </ContentRow>

      <ContactTeaser />
    </>
  );
}
