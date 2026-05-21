/**
 * Sanity schema: insight (blog/editorial article)
 *
 * Maps to the <div id="page-insights-[slug]"> structure in index.html.
 * Each published insight automatically becomes a built page at
 * /insights/[slug] on the next Vercel deployment.
 */

export default {
  name: 'insight',
  title: 'Insight Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'SEO & Meta' },
    { name: 'author', title: 'Author' },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'content',
      description: 'Full H1 title shown on the page (e.g. "AEO/GEO: Optimising Hospital Content for AI Search in 2026")',
      validation: (R) => R.required().min(10).max(120),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'meta',
      description: 'URL path: /insights/[slug]. Must match the page ID format used in build.js.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-'),
      },
      validation: (R) => R.required(),
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'meta',
      description: 'Used in <meta name="description"> and OG tags. 120–160 chars recommended.',
      validation: (R) => R.required().min(80).max(200),
    },

    // ── Taxonomy ──────────────────────────────────────────────────────────────
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      description: 'Shown in the orange pill at the top of the article (e.g. "SEO · JUN 2026").',
      options: {
        list: [
          { title: 'SEO', value: 'SEO' },
          { title: 'YouTube', value: 'YouTube' },
          { title: 'Social', value: 'Social' },
          { title: 'Performance', value: 'Performance' },
          { title: 'Editorial', value: 'Editorial' },
          { title: 'Patient Journey', value: 'Patient Journey' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    },
    {
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      group: 'content',
      description: 'Shown as "JUN 2026" in the article header.',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (R) => R.required(),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Used in <meta name="keywords"> tag.',
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Pin this article at the top of the /insights listing.',
    },
    {
      name: 'draft',
      title: 'Draft (Do not build)',
      type: 'boolean',
      group: 'meta',
      initialValue: true,
      description: 'When enabled, this article is fetched but skipped during build.',
    },

    // ── Author ────────────────────────────────────────────────────────────────
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      group: 'author',
      initialValue: 'Qlarify Health Team',
      validation: (R) => R.required(),
    },
    {
      name: 'authorRole',
      title: 'Author Role / Credentials',
      type: 'string',
      group: 'author',
      description: 'e.g. "Healthcare Marketing Specialist" — shown in byline',
    },
    {
      name: 'authorInitials',
      title: 'Author Initials (for avatar)',
      type: 'string',
      group: 'author',
      description: '2–3 letters, e.g. "QH"',
      validation: (R) => R.max(3),
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      group: 'content',
      description: 'e.g. "12 min"',
      initialValue: '8 min',
    },

    // ── Body ─────────────────────────────────────────────────────────────────
    {
      name: 'tldr',
      title: 'TL;DR Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown in the orange-bordered callout at the top of the article.',
      validation: (R) => R.required().max(400),
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      group: 'content',
      description: 'Main article content. Use H2 for section headings.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External / Internal Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description: 'Full URL for external links. Use /path for internal links.',
                  },
                  {
                    name: 'pageId',
                    type: 'string',
                    title: 'Internal Page ID (optional)',
                    description: 'If linking to another page in the SPA, enter its page ID (e.g. "blog-hospital-seo") so the JS router can handle it.',
                  },
                ],
              },
            ],
          },
        },
      ],
    },

    // ── FAQs ──────────────────────────────────────────────────────────────────
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      description: 'Displayed as expandable <details> blocks below the article body. Also generates FAQPage schema.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (R) => R.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (R) => R.required(),
            },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────────
    {
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'content',
      description: 'Bold heading inside the beige CTA box at the article bottom.',
      initialValue: 'Ready to grow your hospital\'s patient volume?',
    },
    {
      name: 'ctaBody',
      title: 'CTA Body',
      type: 'text',
      rows: 2,
      group: 'content',
      initialValue: 'We build hospital marketing systems that convert — from search to OPD appointment.',
    },
    {
      name: 'ctaButton',
      title: 'CTA Button Label',
      type: 'string',
      group: 'content',
      initialValue: 'Book a discovery call',
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      draft: 'draft',
    },
    prepare({ title, subtitle, draft }) {
      return {
        title: `${draft ? '✏️ DRAFT · ' : ''}${title}`,
        subtitle,
      };
    },
  },
};
