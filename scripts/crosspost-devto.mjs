/**
 * Cross-posts MDX blog posts to Dev.to via their API.
 *
 * - New posts  → created and their Dev.to article ID saved to .devto-articles.json
 * - Existing   → updated in-place using the stored article ID
 * - canonical_url is always set to https://clouddevang.github.io/blog/{slug}
 *   so Dev.to signals your portfolio as the original source.
 *
 * Usage:
 *   DEVTO_API_KEY=<key> node scripts/crosspost-devto.mjs
 *
 * Optional: only process specific slugs
 *   DEVTO_API_KEY=<key> node scripts/crosspost-devto.mjs slos-slis-error-budgets
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

// ─── Config ──────────────────────────────────────────────────────────────────

const BLOG_DIR      = './content/blog';
const TRACKING_FILE = '.devto-articles.json';
const DEVTO_API     = 'https://dev.to/api/articles';
const CANONICAL_BASE = 'https://clouddevang.github.io/blog';

// ─── Validate env ─────────────────────────────────────────────────────────────

const apiKey = process.env.DEVTO_API_KEY;
if (!apiKey) {
  console.error('❌  DEVTO_API_KEY environment variable is not set.');
  console.error('    Get your key at https://dev.to/settings/extensions');
  process.exit(1);
}

// ─── Load tracking file ───────────────────────────────────────────────────────

let tracking = {};
if (existsSync(TRACKING_FILE)) {
  try {
    tracking = JSON.parse(readFileSync(TRACKING_FILE, 'utf-8'));
  } catch {
    console.warn('⚠️  Could not parse .devto-articles.json — starting fresh.');
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Dev.to tag rules: lowercase, alphanumeric only, max 4 tags.
 * "SRE" → "sre", "CI/CD" → "cicd", "Node.js" → "nodejs"
 */
function normaliseTags(tags = []) {
  return tags
    .map(t => t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .slice(0, 4);
}

async function devtoRequest(method, path, body) {
  const res = await fetch(`${DEVTO_API}${path}`, {
    method,
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.forem.api-v1+json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { error: text }; }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${json.error || text}`);
  }
  return json;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

// Optional: filter to specific slugs passed as CLI args
const targetSlugs = process.argv.slice(2);

const files = readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.mdx'))
  .filter(f => targetSlugs.length === 0 || targetSlugs.includes(basename(f, '.mdx')));

if (files.length === 0) {
  console.log('No matching MDX files found.');
  process.exit(0);
}

let created = 0;
let updated = 0;
let failed  = 0;

for (const file of files) {
  const slug = basename(file, '.mdx');
  const raw  = readFileSync(join(BLOG_DIR, file), 'utf-8');
  const { data: fm, content: body } = matter(raw);

  const article = {
    title:         fm.title,
    body_markdown: body.trim(),
    published:     true,
    tags:          normaliseTags(fm.tags),
    description:   fm.summary ?? '',
    canonical_url: `${CANONICAL_BASE}/${slug}`,
  };

  const existingId = tracking[slug];

  try {
    if (existingId) {
      // ── Update ────────────────────────────────────────────────────────────
      console.log(`🔄  Updating  "${fm.title}" (ID: ${existingId}) …`);
      await devtoRequest('PUT', `/${existingId}`, { article });
      console.log(`    ✓ Updated  → https://dev.to/clouddevang/${slug}`);
      updated++;
    } else {
      // ── Create ────────────────────────────────────────────────────────────
      console.log(`🚀  Publishing "${fm.title}" …`);
      const data = await devtoRequest('POST', '', { article });
      tracking[slug] = data.id;
      console.log(`    ✓ Published → ${data.url}  (ID: ${data.id})`);
      created++;
    }
  } catch (err) {
    console.error(`    ✗ Failed for "${slug}": ${err.message}`);
    failed++;
  }
}

// ─── Save tracking file ───────────────────────────────────────────────────────

writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2) + '\n');

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('');
console.log(`Done — ${created} created, ${updated} updated, ${failed} failed.`);
if (failed > 0) process.exit(1);
