# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal portfolio website for Devang Goyal (SRE/DevOps/Cloud Engineer) built with Next.js 14 and deployed to GitHub Pages at `clouddevang.github.io`.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Blog**: MDX via `next-mdx-remote` + `gray-matter`
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Fonts**: Next/font with Inter + JetBrains Mono
- **Deployment**: Static export for GitHub Pages

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# Build and prepare for GitHub Pages deployment
npm run deploy
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts, metadata
│   ├── page.tsx           # Home page (renders all sections)
│   └── blog/              # Blog pages
│       ├── page.tsx       # Blog listing
│       └── [slug]/page.tsx # Individual posts
├── components/            # React components
│   ├── Navbar.tsx        # Sticky navigation
│   ├── Hero.tsx          # Hero section with typewriter
│   ├── About.tsx         # Bio and stats
│   ├── Skills.tsx        # Skill badges by category
│   ├── Experience.tsx    # Work timeline
│   ├── Projects.tsx      # Project cards
│   ├── Education.tsx     # Education cards
│   ├── Certifications.tsx # Cert badges
│   ├── Blog.tsx          # Blog preview cards
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Site footer
├── content/blog/          # MDX blog posts
├── data/resume.ts         # All resume data (single source of truth)
├── lib/mdx.ts            # MDX utilities
└── styles/globals.css     # Global styles + Tailwind
```

## Architecture Notes

- **Data-driven**: All content comes from `data/resume.ts` - components import from here
- **Static export**: Configured with `output: 'export'` for GitHub Pages compatibility
- **Framer Motion**: Used for scroll animations and hover effects
- **MDX blog**: Posts in `content/blog/` with frontmatter for metadata

## Design System

Colors defined in `tailwind.config.ts`:
- Background: `#0a0a0f`
- Card: `#111118`
- Accent Blue: `#00D4FF`
- Accent Green: `#00FF88`
- AWS Orange: `#FF9900`
- Azure Blue: `#0078D4`

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

### Updating Resume Data
Edit `data/resume.ts` - all sections pull from this file.
