// filepath: components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { personal } from '@/data/resume';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  {
    name: 'GitHub',
    icon: <Github size={20} />,
    href: `https://github.com/${personal.github}`,
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={20} />,
    href: `https://linkedin.com/in/${personal.linkedin}`,
  },
  {
    name: 'Email',
    icon: <Mail size={20} />,
    href: `mailto:${personal.email}`,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-1 text-xl font-bold mb-4">
              <span className="text-accent-blue">&lt;</span>
              <span className="text-text-primary">DG</span>
              <span className="text-accent-blue">/&gt;</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              SRE & Cloud Engineer architecting mission-critical infrastructure
              at scale across Azure and AWS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className="text-text-muted hover:text-accent-blue transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background border border-border text-text-muted hover:text-accent-blue hover:border-accent-blue/50 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {personal.name} &middot;{' '}
            <span className="text-accent-blue">SRE</span> |{' '}
            <span className="text-accent-blue">DevOps</span> |{' '}
            <span className="text-accent-blue">Cloud Engineer</span>
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-background transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
