import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuditCTA } from "@/components/home/AuditCTA";
import { getAllInsights, getInsightBySlug } from "@/lib/insights";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const all = await getAllInsights();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getInsightBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.title} — ${site.name}`,
    description: a.description,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      url: `${site.url}/insights/${a.slug}`,
      type: "article",
      publishedTime: a.date,
      authors: [a.author],
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-[-0.01em] mt-14 mb-6"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-serif text-2xl leading-[1.15] mt-10 mb-4"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-lg md:text-[19px] leading-[1.65] mb-6 text-ink"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-[1.6]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg leading-[1.6]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.6]" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-sage pl-6 my-8 font-serif italic text-2xl leading-[1.4] text-sage"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="font-serif italic text-sage" {...props} />
  ),
  hr: () => <hr className="border-line my-12" />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full border-collapse text-[15px] leading-[1.5]"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b-2 border-ink" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left font-mono text-[11px] uppercase tracking-[0.1em] text-muted py-3 pr-4 align-bottom"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-line" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="py-3 pr-4 align-top text-ink" {...props} />
  ),
};

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) notFound();

  const all = await getAllInsights();
  const idx = all.findIndex((a) => a.slug === slug);
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const prev = idx > 0 ? all[idx - 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    url: `${site.url}/insights/${article.slug}`,
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    articleSection: article.category,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${site.url}/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${site.url}/insights/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbs} />

      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10"
      >
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/insights" className="hover:text-ink transition-colors">
              Insights
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink truncate max-w-[40ch]">{article.category}</li>
        </ol>
      </nav>

      <article className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-20 md:pb-28">
        <Reveal>
          <header className="max-w-[820px] mb-14 md:mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-sage">
                {article.category}
              </span>
              <span aria-hidden="true" className="text-muted">·</span>
              <time
                dateTime={article.date}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
              >
                {formatDate(article.date)}
              </time>
              <span aria-hidden="true" className="text-muted">·</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                {article.readTime}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] mb-8">
              {article.title}
            </h1>
            <p className="text-xl md:text-[22px] leading-[1.5] text-muted mb-10">
              {article.description}
            </p>
            <div className="flex items-center gap-4 pt-8 border-t border-line">
              <span
                aria-hidden="true"
                className="w-10 h-10 rounded-full bg-sage-soft flex items-center justify-center font-mono text-[12px] text-sage"
              >
                {article.authorInitials}
              </span>
              <div>
                <div className="text-base font-medium">{article.author}</div>
                <div className="text-sm text-muted">{article.authorRole}</div>
              </div>
            </div>
          </header>
        </Reveal>

        <Reveal delay={120}>
          <div className="max-w-[720px]">
            <MDXRemote
              source={article.body}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </Reveal>
      </article>

      {(prev || next) && (
        <section
          aria-label="Continue reading"
          className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-16 md:pb-20 border-t border-line bg-surface"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {prev ? (
              <Link
                href={`/insights/${prev.slug}`}
                className="group block bg-paper border border-line rounded-[12px] p-6 md:p-8 hover:border-ink transition-colors duration-300"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
                  ← Previous
                </div>
                <div className="font-serif text-2xl md:text-3xl leading-[1.1] group-hover:text-sage transition-colors duration-300">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/insights/${next.slug}`}
                className="group block bg-paper border border-line rounded-[12px] p-6 md:p-8 hover:border-ink transition-colors duration-300 md:text-right"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
                  Next →
                </div>
                <div className="font-serif text-2xl md:text-3xl leading-[1.1] group-hover:text-sage transition-colors duration-300">
                  {next.title}
                </div>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        </section>
      )}

      <AuditCTA />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
