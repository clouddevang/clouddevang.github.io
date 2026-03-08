// filepath: components/Contact.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personal } from '@/data/resume';
import { Send, Github, Linkedin, Mail, MapPin, FileText } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const socialLinks = [
  {
    name: 'GitHub',
    icon: <Github size={24} />,
    href: `https://github.com/${personal.github}`,
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin size={24} />,
    href: `https://linkedin.com/in/${personal.linkedin}`,
  },
  {
    name: 'Email',
    icon: <Mail size={24} />,
    href: `mailto:${personal.email}`,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 sm:py-32 bg-card/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-accent-green font-mono text-sm mb-2 tracking-wider">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Contact <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Let&apos;s work together
                </h3>
                <p className="text-text-muted leading-relaxed">
                  I&apos;m always interested in hearing about new opportunities,
                  challenging infrastructure problems, or just connecting with
                  fellow engineers. Feel free to reach out!
                </p>
              </div>

              {/* Quick Actions for Recruiters */}
              <div className="space-y-3">
                <a
                  href={`mailto:${personal.email}?subject=Opportunity%20Discussion`}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-accent-green/50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-accent-green/10 text-accent-green">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium group-hover:text-accent-green transition-colors">
                      Email Directly
                    </p>
                    <p className="text-text-muted text-sm">
                      Usually respond within 24 hours
                    </p>
                  </div>
                </a>
                <a
                  href="/Devang_Goyal_Resume_v4.pdf"
                  download
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-accent-blue/50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium group-hover:text-accent-blue transition-colors">
                      Download Resume
                    </p>
                    <p className="text-text-muted text-sm">
                      PDF format, ATS-friendly
                    </p>
                  </div>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-text-muted">
                <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                  <MapPin size={20} />
                </div>
                <span>Based in {personal.location} 🇯🇵</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-card border border-border text-text-muted hover:text-accent-blue hover:border-accent-blue/50 transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
