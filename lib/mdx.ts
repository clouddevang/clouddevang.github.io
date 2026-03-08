// filepath: lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function sanitizeSlugFromFilename(file: string): string {
  // Remove the .mdx extension if present
  const base = file.replace(/\.mdx$/i, '');
  // Allow only URL-safe characters (alphanumeric, hyphen, underscore)
  const sanitized = base.replace(/[^a-zA-Z0-9_-]+/g, '-');
  // Trim leading/trailing hyphens that may have been introduced
  return sanitized.replace(/^-+|-+$/g, '');
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = sanitizeSlugFromFilename(file);
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        summary: data.summary || '',
        tags: data.tags || [],
        readTime: data.readTime || '',
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    summary: data.summary || '',
    tags: data.tags || [],
    readTime: data.readTime || '',
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => sanitizeSlugFromFilename(file));
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  const posts = getAllPosts();
  return posts.slice(0, count);
}
