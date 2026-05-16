# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal portfolio website for Devang Goyal (SRE/DevOps/Cloud Engineer) built with Next.js and deployed to GitHub Pages at `clouddevang.github.io`.

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, static export)
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
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with fonts, metadata
│   ├── page.tsx               # Home page (Netflix-style: HomeBillboard + ContentRows)
│   ├── about/page.tsx         # About + Education full page
│   ├── experience/page.tsx    # Full career timeline page
│   ├── skills/page.tsx        # Full skills grid page
│   ├── projects/page.tsx      # Full projects gallery page
│   ├── certifications/page.tsx # Full certifications page
│   ├── contact/page.tsx       # Full contact page
│   └── blog/                  # Blog pages (unchanged)
│       ├── page.tsx           # Blog listing
│       └── [slug]/page.tsx    # Individual posts
├── components/
│   ├── shared/                # Shared layout components
│   │   ├── PageHero.tsx       # Reusable banner header for detail pages
│   │   ├── PageTransition.tsx # Framer Motion AnimatePresence wrapper
│   │   └── ClientProviders.tsx # 'use client' wrapper used in layout
│   ├── home/                  # Netflix home page components
│   │   ├── HomeBillboard.tsx  # Full-screen hero (typewriter, CTAs → /experience)
│   │   ├── ContentRow.tsx     # Horizontal snap-scroll row with "See All →" link
│   │   ├── ExperiencePreviewCard.tsx
│   │   ├── SkillPreviewCard.tsx
│   │   ├── ProjectPreviewCard.tsx
│   │   ├── CertPreviewCard.tsx
│   │   ├── BlogPreviewCard.tsx
│   │   └── ContactTeaser.tsx  # Full-width gradient CTA strip
│   ├── Navbar.tsx             # Fixed nav — page routes, pathname-based active state
│   ├── Hero.tsx               # Original hero (kept for reference, unused on home)
│   ├── About.tsx              # Bio, stats, specialty cards
│   ├── Skills.tsx             # 7-category skills grid + Emerging Tech
│   ├── Experience.tsx         # Work timeline (expandable achievements)
│   ├── Projects.tsx           # Project cards grid
│   ├── Education.tsx          # Education cards
│   ├── Certifications.tsx     # Cert badges (AWS/Azure/JLPT)
│   ├── Blog.tsx               # Blog preview cards (used standalone)
│   ├── Contact.tsx            # Contact form + quick actions
│   ├── Footer.tsx             # Site footer (page-route quicklinks)
│   ├── MilestoneNav.tsx       # Right-side dots (home only) → navigate to pages
│   ├── ScrollProgress.tsx     # Top scroll progress bar
│   └── CursorGlow.tsx         # Custom cursor glow effect
├── content/blog/              # MDX blog posts
├── data/resume.ts             # All resume data (single source of truth)
├── lib/mdx.ts                 # MDX utilities
├── public/                    # Static assets
│   └── Devang_Goyal_Resume_v4.pdf
└── styles/globals.css         # Global styles + Tailwind (includes .scrollbar-hide)
```

## Architecture Notes

- **Multi-page**: Each major section has its own route (`/about`, `/experience`, `/skills`, `/projects`, `/certifications`, `/contact`). No hash-based navigation.
- **Netflix home**: `app/page.tsx` renders `HomeBillboard` + 5 `ContentRow` components (horizontal scroll, snap) + `ContactTeaser`. Each row links to its detail page.
- **Detail pages**: Each page = `PageHero` banner + the matching full section component (e.g., `<Experience />`). Zero logic duplication.
- **Data-driven**: All content comes from `data/resume.ts`. Blog preview posts are duplicated inline in `app/page.tsx` and `components/Blog.tsx` (keep these in sync).
- **Static export**: `output: 'export'` + `trailingSlash: true` in `next.config.js`. All routes build as `out/[route]/index.html`. No `generateStaticParams` needed for non-dynamic routes.
- **Page transitions**: `ClientProviders` wraps `{children}` in `app/layout.tsx` with Framer Motion `AnimatePresence` (mode=wait, 350ms fade-up enter / 200ms exit).
- **Navbar**: Active state via `usePathname()` comparison — no scroll tracking. Mobile menu closes automatically on route change.
- **MilestoneNav**: Right-side dot nav (desktop only, home page only). Dots use `router.push()` to navigate to section pages.
- **Blog**: `/blog` and `/blog/[slug]` are unchanged from the original implementation.

## Design System

Colors defined in `tailwind.config.ts` and `styles/globals.css`:
- Background: `#0a0a0f`
- Card: `#111118`
- Border: `#1e293b`
- Accent Blue: `#00D4FF`
- Accent Green: `#00FF88`
- Text Primary: `#e2e8f0`
- Text Muted: `#64748b`
- AWS Orange: `#FF9900`
- Azure Blue: `#0078D4`
- JLPT Red: `#E63946`

## Adding Content

### New Blog Post
1. Create `content/blog/[slug].mdx` with frontmatter:
```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
summary: "Brief description"
tags: ["Tag1", "Tag2"]
readTime: "X min read"
---
```
2. Add the post to the `blogPosts` array in `app/page.tsx` (home ContentRow preview).
3. Also add to `components/Blog.tsx` `blogPosts` array if used elsewhere.

### Updating Resume Data
Edit `data/resume.ts` — all section pages pull from this file automatically.

### Adding a New Section Page
1. Create `app/[section]/page.tsx` with `PageHero` + the section component.
2. Add the route to `navLinks` in `components/Navbar.tsx`.
3. Add to `quickLinks` in `components/Footer.tsx`.
4. Add to `pages` in `components/MilestoneNav.tsx`.

## Deployment

Deployed via GitHub Actions (`.github/workflows/nextjs.yml`).

### SSH Config for Push
Uses a dedicated SSH key configured in `~/.ssh/config`. Push using the standard git push command.

## Known Patterns

- **ContentRow cards**: All `flex-shrink-0 snap-start`, widths: `w-72` (experience/project/blog), `w-52` (skill), `w-56` (cert).
- **PageHero**: `pt-28 pb-12`, mono label in `accent-green`, large h1 with `gradient-text` on `titleHighlight`.
- **Card hover**: `whileHover={{ scale: 1.03, y: -4 }}` with `type: 'spring'` in all preview cards.
- **Section component headers**: Each section component (About, Skills, etc.) still renders its own internal `<section>` header. On detail pages this produces a double header — acceptable; suppress with a `showHeader` prop if needed in future.
- **Animations**: Framer Motion `containerVariants` + `itemVariants` stagger pattern in full section components.
- **Skill category icons**: Defined in `categoryConfig` in both `Skills.tsx` and `SkillPreviewCard.tsx` — keep in sync if adding new skill categories.
