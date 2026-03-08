# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal portfolio website for Devang Goyal (SRE/DevOps/Cloud Engineer) built with Next.js and deployed to GitHub Pages at `clouddevang.github.io`.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, static export)
- **Styling**: Tailwind CSS v3
- **Blog**: MDX via `next-mdx-remote` v6 + `gray-matter`
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Fonts**: Google Fonts (Inter + JetBrains Mono) via CDN
- **Deployment**: GitHub Actions → GitHub Pages

## Requirements

- **Node.js 20+** (required by Next.js 16)
- Use `nvm use 20` if needed

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# Lint
npm run lint
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts, metadata
│   ├── page.tsx           # Home page (renders all sections)
│   └── blog/              # Blog pages
│       ├── page.tsx       # Blog listing
│       └── [slug]/page.tsx # Individual posts (async params)
├── components/            # React components
│   ├── Navbar.tsx        # Fixed navigation with scroll handling
│   ├── Hero.tsx          # Hero section with typewriter effect
│   ├── About.tsx         # Bio and stats
│   ├── Skills.tsx        # Skill badges + Emerging Tech section
│   ├── Experience.tsx    # Work timeline (expandable achievements)
│   ├── Projects.tsx      # Project cards with blog links
│   ├── Education.tsx     # Education cards
│   ├── Certifications.tsx # Cert badges (AWS/Azure/JLPT)
│   ├── Testimonials.tsx  # Colleague testimonials
│   ├── Blog.tsx          # Blog preview cards (clickable)
│   ├── Contact.tsx       # Contact form + quick actions
│   └── Footer.tsx        # Site footer
├── content/blog/          # MDX blog posts
├── data/resume.ts         # All resume data (single source of truth)
├── lib/mdx.ts            # MDX utilities
├── public/               # Static assets
│   └── Devang_Goyal_Resume_v4.pdf
└── styles/globals.css     # Global styles + Tailwind
```

## Architecture Notes

- **Data-driven**: All content comes from `data/resume.ts`
- **Static export**: Configured with `output: 'export'` in `next.config.js`
- **Navbar scroll**: Uses `window.scrollTo` with 64px offset for fixed navbar
- **Blog cards**: Clickable via `onClick` + `router.push()`
- **Experience**: Expandable achievements (shows first 5, click to expand)

## Design System

Colors defined in `tailwind.config.ts` and `styles/globals.css`:
- Background: `#0a0a0f`
- Card: `#111118`
- Border: `#1e293b`
- Accent Blue: `#00D4FF`
- Accent Green: `#00FF88`
- Text Primary: `#e2e8f0`
- Text Muted: `#64748b`

## Adding Content

### New Blog Post
Create `content/blog/[slug].mdx` with frontmatter:
```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
summary: "Brief description"
tags: ["Tag1", "Tag2"]
readTime: "X min read"
---
```

Also add to `components/Blog.tsx` blogPosts array for homepage preview.

### Updating Resume Data
Edit `data/resume.ts` - all sections pull from this file.

### Updating Testimonials
Edit `components/Testimonials.tsx` - update the testimonials array.

## Deployment

Deployed via GitHub Actions (`.github/workflows/nextjs.yml`).

### SSH Config for Push
Uses `github-clouddevang` host with dedicated SSH key:
```bash
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_ed25519_clouddevang -o IdentitiesOnly=yes" git push origin main
```

## Known Patterns

- Section padding: `pt-6 pb-16 sm:pt-8 sm:pb-20` (minimal top, more bottom)
- Card hover: Uses `card-hover` class from globals.css
- Animations: Framer Motion `containerVariants` + `itemVariants` pattern
- Active nav detection: Checks `getBoundingClientRect().top <= 100`
