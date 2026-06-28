import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/Hero";
import SearchInput from "@/components/SearchInput";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import Breadcrumb from "@/components/Breadcrumb";
import { getGuides, getGuideCategories } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getGuideCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return { title: `${cat.name} — Travel Guide | Yonihon`, description: `Browse our ${cat.name} travel guides.` };
}

export default async function GuideCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [guides, categories] = await Promise.all([getGuides(), getGuideCategories()]);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const filtered = guides.filter((g) => g.categorySlug === slug);

  return (
    <>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Travel Guide", href: "/travel-guide" },
        { label: cat.name },
      ]} />

      <section className="py-12 md:py-16 bg-zinc-50">
        <div className="container-site text-center">
          <span className="text-4xl mb-3 block">{cat.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">{cat.name}</h1>
          <p className="text-zinc-500 mt-2">{cat.count} Articles</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-site">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((guide) => <ArticleCard key={guide.id} article={guide} />)}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <p>No articles in this category yet.</p>
              <Link href="/travel-guide" className="text-primary font-semibold hover:underline mt-2 inline-block">Browse all guides</Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-zinc-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-zinc-900 mb-4">Other Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.filter((c) => c.slug !== slug).map((c) => (
                  <Link key={c.slug} href={`/travel-guide/category/${c.slug}`}
                    className="bg-white border border-zinc-200 hover:border-primary rounded-lg p-3 text-center transition-colors">
                    <span className="text-xl block">{c.icon}</span>
                    <span className="text-xs font-medium text-zinc-700 mt-1 block">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white rounded-xl border border-zinc-200 p-5">
                  <h3 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">Search</h3>
                  <SearchInput placeholder="Search guides..." />
                </div>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
