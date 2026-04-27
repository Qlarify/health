// Insights MDX loader. Reads `content/insights/*.mdx`, parses frontmatter
// with gray-matter, returns typed records. Used by /insights index and the
// dynamic /insights/[slug] page.
//
// Server-only — relies on `fs` and `path`. The 'server-only' import below
// throws at build time if anything imports this from a client component.

import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type InsightCategory =
  | "YouTube"
  | "Social"
  | "SEO"
  | "Performance"
  | "Editorial"
  | "Patient journey";

export type InsightFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  category: InsightCategory;
  author: string;
  authorRole: string;
  authorInitials: string;
  readTime: string; // "9 min"
  featured?: boolean;
};

export type Insight = InsightFrontmatter & {
  slug: string;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

export const insightCategories: readonly InsightCategory[] = [
  "YouTube",
  "Social",
  "SEO",
  "Performance",
  "Editorial",
  "Patient journey",
];

async function readDir(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_DIR);
    return entries.filter((e) => e.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function getAllInsights(): Promise<Insight[]> {
  const files = await readDir();
  const records = await Promise.all(
    files.map(async (file): Promise<Insight> => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      return { slug, body: content, ...(data as InsightFrontmatter) };
    })
  );
  return records.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const { data, content } = matter(raw);
    return { slug, body: content, ...(data as InsightFrontmatter) };
  } catch {
    return null;
  }
}
