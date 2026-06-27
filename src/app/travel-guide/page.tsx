import Link from "next/link";
import { redirect } from "next/navigation";
import Hero from "@/components/Hero";
import SearchInput from "@/components/SearchInput";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { readCollection } from "@/lib/storage";
import { guideCategories, popularTags } from "@/lib/data";
import type { Guide } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TravelGuidePage({ searchParams }: PageProps) {
  const params = await searchParams;
  if (params.category && typeof params.category === "string") {
    redirect(`/travel-guide/category/${params.category}`);
  }
  const guides = readCollection<Guide>("guides");
  const featuredGuides = guides.filter((g) => g.featured);

  return (
    <>
      <Hero
        title="Your Guide to Japan."
        subtitle="Travel tips, destination guides, cultural insights, and local experiences to help you discover the best of Japan."
        image="https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1920&q=80"
        size="medium"
      >
        <div className="max-w-md mx-auto">
          <SearchInput placeholder="Search guides..." />
        </div>
      </Hero>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {guideCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/travel-guide/category/${cat.slug}`}
                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg p-4 text-center transition-colors"
              >
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <span className="text-sm font-medium text-zinc-800">{cat.name}</span>
                <span className="text-xs text-zinc-500 block mt-0.5">
                  {cat.count} Articles
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/travel-guide"
              className="text-sm text-primary font-semibold hover:underline"
            >
              View all categories
            </Link>
          </div>
        </div>
      </section>

      {featuredGuides.length > 0 && (
        <section className="py-12 bg-zinc-50">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => (
                <ArticleCard key={guide.id} article={guide} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Latest Articles</h2>
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <ArticleCard key={guide.id} article={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <p>No articles yet. New stories drop every week.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-zinc-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-zinc-900 mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/travel-guide?tag=${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-white border border-zinc-200 hover:border-primary hover:text-primary px-3 py-1.5 rounded-full text-sm text-zinc-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="lg:sticky lg:top-24">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
