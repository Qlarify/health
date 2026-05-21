#!/usr/bin/env node
/**
 * scripts/fetch-sanity.js
 *
 * Pre-build step: fetches published insight articles from Sanity and writes
 * them to `sanity-articles.json` in the project root.
 *
 * build.js then reads that file synchronously during the main build.
 *
 * Usage (automatically called by the Vercel build command):
 *   node scripts/fetch-sanity.js && node build.js
 *
 * Local usage:
 *   SANITY_API_TOKEN=sk... node scripts/fetch-sanity.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'sanity-articles.json');

async function main() {
  const { fetchSanityInsights } = require('../lib/sanity-build');

  // If SANITY_API_TOKEN is not set, write an empty array so build.js
  // continues cleanly without Sanity articles.
  if (!process.env.SANITY_API_TOKEN) {
    console.log('  ℹ️  SANITY_API_TOKEN not set — writing empty sanity-articles.json');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  let articles;
  try {
    articles = await fetchSanityInsights();
  } catch (err) {
    console.error('  ✗ fetchSanityInsights failed:', err.message);
    // Write empty file so build.js can continue
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    process.exit(0); // Don't fail the build for a CMS fetch error
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2));
  console.log(`  ✓ Wrote ${articles.length} Sanity article(s) to sanity-articles.json`);
}

main().catch(err => {
  console.error('fetch-sanity failed:', err);
  // Write empty fallback so build.js still runs
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
  process.exit(0);
});
