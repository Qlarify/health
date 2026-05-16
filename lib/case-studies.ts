// Case-study MDX loader. Mirrors `lib/insights.ts` but for `/work`.
// Each case study lives in `content/case-studies/*.mdx` and represents a
// single hospital engagement — outcome, approach, deliverables.

import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { StageVideo } from "@/content/specialties";

export type CaseStudyFrontmatter = {
  title: string;
  description: string;
  client: string;
  clientType: string; // "Multi-speciality, 1,200 beds"
  city: string;
  date: string; // ISO yyyy-mm-dd
  practices: readonly string[]; // ["YouTube Management", "Channel Strategy"]
  metric: { value: string; label: string };
  duration: string; // "18 months"
  videos?: readonly StageVideo[]; // Four-stage YouTube pathway, when applicable
};

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

async function readDir(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_DIR);
    return entries.filter((e) => e.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const files = await readDir();
  const records = await Promise.all(
    files.map(async (file): Promise<CaseStudy> => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      return { slug, body: content, ...(data as CaseStudyFrontmatter) };
    })
  );
  return records.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const { data, content } = matter(raw);
    return { slug, body: content, ...(data as CaseStudyFrontmatter) };
  } catch {
    return null;
  }
}
