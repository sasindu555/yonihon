import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SearchInput from "@/components/SearchInput";
import ArticleCard from "@/components/ArticleCard";
import { guides, guideCategories } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

function formatContent(content: string) {
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      const text = line.replace("## ", "");
      const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      html.push(`<h2 id="${anchor}" class="text-xl font-bold text-zinc-900 mt-8 mb-3">${text}</h2>`);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<p class="text-zinc-700 leading-relaxed mb-4">${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`);
    } else if (line.startsWith("- **")) {
      if (!inList) { html.push('<ul class="space-y-1.5 mb-4">'); inList = true; }
      const processed = line
        .replace(/^- \*\*(.*?):\*\*/g, '<li class="flex items-start gap-2 text-zinc-700"><span class="text-primary mt-1 shrink-0">•</span><strong>$1:</strong>')
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html.push(`${processed}</li>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { html.push('<ul class="space-y-1.5 mb-4">'); inList = true; }
      const processed = line.replace(/^- /, '<li class="flex items-start gap-2 text-zinc-700"><span class="text-zinc-400 mt-1 shrink-0">•</span>');
      html.push(`${processed}</li>`);
    } else if (line.trim() === "") {
      if (inList) { html.push("</ul>"); inList = false; }
    } else if (line.startsWith("#")) {
      if (inList) { html.push("</ul>"); inList = false; }
      const text = line.replace(/^#+ /, "");
      if (text.length > 0) {
        html.push(`<p class="text-zinc-700 leading-relaxed mb-4">${text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`);
      }
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      if (line.trim().length > 0) {
        html.push(`<p class="text-zinc-700 leading-relaxed mb-4">${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`);
      }
    }
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const relatedGuides = guides.filter((g) => g.slug !== slug).slice(0, 2);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Travel Guide", href: "/travel-guide" },
          { label: guide.category, href: `/travel-guide?category=${guide.categorySlug}` },
          { label: guide.title },
        ]}
      />

      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <Link
              href={`/travel-guide?category=${guide.categorySlug}`}
              className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
            >
              {guide.category}
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-3">
              {guide.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-zinc-500 mt-3">
              <span>{guide.author}</span>
              <span>&middot;</span>
              <span>{guide.date}</span>
              <span>&middot;</span>
              <span>{guide.readTime}</span>
            </div>

            <div className="mt-6 rounded-lg overflow-hidden">
              <Image
                src={guide.image}
                alt={guide.title}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              className="mt-8 prose prose-zinc max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(guide.content) }}
            />

            <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center gap-4">
              <span className="text-sm text-zinc-500">Share this guide</span>
              <button className="text-sm text-primary font-semibold hover:underline">
                Share
              </button>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
                  Search
                </h3>
                <SearchInput />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {guideCategories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/travel-guide?category=${cat.slug}`}
                        className="text-sm text-zinc-600 hover:text-primary transition-colors"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-50 rounded-lg border border-zinc-200 p-5">
                <h3 className="text-sm font-semibold text-zinc-900 mb-2">
                  Plan Your Trip
                </h3>
                <p className="text-xs text-zinc-600">
                  Discover hand-picked Japan workshops curated by our local team.
                </p>
                <Link
                  href="/experience"
                  className="mt-3 inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded text-xs font-semibold transition-colors"
                >
                  Explore Experiences
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {relatedGuides.length > 0 && (
        <section className="py-12 bg-zinc-50">
          <div className="container-site">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900">Keep Reading</h2>
              <Link
                href="/travel-guide"
                className="text-sm text-primary font-semibold hover:underline"
              >
                All guides
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
