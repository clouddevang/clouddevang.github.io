// filepath: components/Testimonials.tsx
'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// Update these with real testimonials from colleagues/managers
const testimonials = [
  {
    quote:
      "Devang completely transformed our observability stack. His implementation of OpenTelemetry gave us visibility we never had before, cutting our incident response time in half.",
    author: 'Engineering Manager',
    company: 'BitFlyer',
    // Add LinkedIn URL if they consent: linkedin: 'https://linkedin.com/in/...'
  },
  {
    quote:
      "His deep expertise in both AWS and Azure made our cross-cloud architecture possible. Devang doesn't just solve problems—he anticipates them.",
    author: 'Tech Lead',
    company: 'Accenture Japan',
  },
  {
    quote:
      "One of the most reliable engineers I've worked with. Devang's Terraform modules and CI/CD pipelines are still the gold standard on our team.",
    author: 'Senior SRE',
    company: 'Accenture Japan',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-accent-green font-mono text-sm mb-2 tracking-wider">
              TESTIMONIALS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              What <span className="gradient-text">Colleagues Say</span>
            </h2>
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Feedback from people I&apos;ve worked with
            </p>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-card border border-border rounded-2xl p-6 sm:p-8"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 p-2 bg-accent-blue/10 rounded-lg">
                  <Quote size={20} className="text-accent-blue" />
                </div>

                {/* Quote Text */}
                <blockquote className="text-text-primary/90 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-green flex items-center justify-center text-background font-bold text-sm">
                    {testimonial.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-text-primary font-medium text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-text-muted text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note for authenticity */}
          <motion.p
            variants={itemVariants}
            className="text-center text-text-muted text-sm mt-8"
          >
            Want to verify? Connect with me on{' '}
            <a
              href="https://linkedin.com/in/devang20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              LinkedIn
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
