/**
 * Cross-posts MDX blog posts to Dev.to via their API.
 *
 * - On startup: fetches your existing Dev.to articles and matches them by
 *   canonical_url, so re-runs never create duplicates even if the tracking
 *   file is empty or stale.
 * - New posts  → created; Dev.to article ID saved to .devto-articles.json
 * - Existing   → updated in-place using the stored article ID
 * - 1.5 s delay between requests to avoid rate limiting
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

// ─── Config ───────────────────────────────────────────────────────────────────

const BLOG_DIR       = './content/blog';
const TRACKING_FILE  = '.devto-articles.json';
const DEVTO_API      = 'https://dev.to/api/articles';
const CANONICAL_BASE = 'https://clouddevang.github.io/blog';
const DELAY_MS       = 1500; // 1.5 s between requests — stays well under rate limit

// ─── Validate env ─────────────────────────────────────────────────────────────

const apiKey = process.env.DEVTO_API_KEY;
if (!apiKey) {
  console.error('❌  DEVTO_API_KEY environment variable is not set.');
  console.error('    Get your key at https://dev.to/settings/extensions');
  process.exit(1);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function devtoRequest(method, path, body) {
  const res = await fetch(`${DEVTO_API}${path}`, {
    method,
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.forem.api-v1+json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { error: text }; }

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${json.error ?? text}`);
  return json;
}

/**
 * Dev.to tag rules: lowercase, alphanumeric only, max 4 tags.
 */
function normaliseTags(tags = []) {
  return tags
    .map(t => t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .slice(0, 4);
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

const saveTracking = () =>
  writeFileSync(TRACKING_FILE, JSON.stringify(tracking, null, 2) + '\n');

// ─── Sync tracking with existing Dev.to articles ──────────────────────────────
// Fetches all your published articles and matches by canonical_url.
// This prevents duplicates even when the tracking file is empty or stale.

console.log('🔍  Fetching your existing Dev.to articles…');
try {
  const existing = await devtoRequest('GET', '/me?per_page=100&state=all');
  let synced = 0;
  for (const article of existing) {
    if (!article.canonical_url) continue;
    // Match https://clouddevang.github.io/blog/{slug}
    const match = article.canonical_url.match(/\/blog\/([^/?#]+)\/?$/);
    if (!match) continue;
    const slug = match[1];
    if (!tracking[slug]) {
      tracking[slug] = article.id;
      synced++;
    }
  }
  if (synced > 0) {
    console.log(`    Synced ${synced} article(s) from Dev.to into tracking file.`);
    saveTracking();
  } else {
    console.log('    Tracking file already up to date.');
  }
} catch (err) {
  console.warn(`⚠️  Could not fetch existing articles: ${err.message}`);
  console.warn('    Proceeding with local tracking file only.');
}

// ─── Collect MDX files ────────────────────────────────────────────────────────

const targetSlugs = process.argv.slice(2);

const files = readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.mdx'))
  .filter(f => targetSlugs.length === 0 || targetSlugs.includes(basename(f, '.mdx')));

if (files.length === 0) {
  console.log('\nNo matching MDX files found.');
  process.exit(0);
}

// ─── Post / update each article ───────────────────────────────────────────────

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
      console.log(`\n🔄  Updating  "${fm.title}" (ID: ${existingId}) …`);
      await devtoRequest('PUT', `/${existingId}`, { article });
      console.log(`    ✓ Updated`);
      updated++;
    } else {
      console.log(`\n🚀  Publishing "${fm.title}" …`);
      const data = await devtoRequest('POST', '', { article });
      tracking[slug] = data.id;
      saveTracking(); // save immediately after each create
      console.log(`    ✓ Published → ${data.url}  (ID: ${data.id})`);
      created++;
    }
  } catch (err) {
    console.error(`    ✗ Failed for "${slug}": ${err.message}`);
    failed++;
  }

  // Delay between requests to avoid rate limiting
  await sleep(DELAY_MS);
}

// ─── Final save + summary ─────────────────────────────────────────────────────

saveTracking();

console.log('');
console.log(`Done — ${created} created, ${updated} updated, ${failed} failed.`);
if (failed > 0) process.exit(1);
