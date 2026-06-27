import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SearchInput from "@/components/SearchInput";
import ArticleCard from "@/components/ArticleCard";
import { formatContent, extractToc } from "@/lib/markdown";
import { readCollection } from "@/lib/storage";
import type { Guide, GuideCategory } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guides = readCollection<Guide>("guides");
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guides = readCollection<Guide>("guides");
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const guideCategories = readCollection<GuideCategory>("guideCategories");
  const relatedGuides = guides.filter((g) => g.slug !== slug).slice(0, 3);
  const toc = extractToc(guide.content);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Travel Guide", href: "/travel-guide" },
          { label: guide.category, href: `/travel-guide/category/${guide.categorySlug}` },
          { label: guide.title },
        ]}
      />

      <section className="bg-white border-b border-zinc-100">
        <div className="container-site py-8 md:py-12">
          <Link
            href={`/travel-guide/category/${guide.categorySlug}`}
            className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 hover:bg-primary/20 transition-colors"
          >
            {guide.category}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight max-w-3xl">
            {guide.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-zinc-500 mt-4">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {guide.date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {guide.readTime}
            </span>
            {guide.author && (
              <span>By {guide.author}</span>
            )}
          </div>
        </div>
      </section>

      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <article className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-8">
              <Image
                src={guide.image}
                alt={guide.title}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>

            {toc.length > 0 && (
              <aside className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 mb-8">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-3">
                  Table of Contents
                </h3>
                <ol className="space-y-1.5">
                  {toc.map((entry, i) => (
                    <li key={entry.anchor}>
                      <a
                        href={`#${entry.anchor}`}
                        className="text-sm text-zinc-600 hover:text-primary transition-colors"
                      >
                        {i + 1}. {entry.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </aside>
            )}

            <div
              className="guide-content text-zinc-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatContent(guide.content) }}
            />

            <footer className="mt-10 pt-6 border-t border-zinc-200 flex items-center gap-4">
              <span className="text-sm text-zinc-500">Share this guide</span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-primary transition-colors font-medium"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
            </footer>
          </article>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">
                  Search
                </h3>
                <SearchInput placeholder="Search guides..." />
              </div>

              <div className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {guideCategories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/travel-guide/category/${cat.slug}`}
                        className="flex items-center justify-between text-sm text-zinc-600 hover:text-primary transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-zinc-400">{cat.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary rounded-xl p-5 text-white">
                <h3 className="text-sm font-bold mb-2 uppercase tracking-wider">
                  Plan Your Trip
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  Discover hand-picked Japan workshops curated by our local team.
                </p>
                <Link
                  href="/experience"
                  className="inline-block bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-zinc-100 w-full text-center"
                >
                  Explore Experiences
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {relatedGuides.length > 0 && (
        <section className="py-12 md:py-16 bg-zinc-50">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">Keep Reading</span>
                <h2 className="text-2xl font-bold text-zinc-900 mt-1">More Travel Guides</h2>
              </div>
              <Link
                href="/travel-guide"
                className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
              >
                All guides
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuides.map((g) => (
                <ArticleCard key={g.id} article={g} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
