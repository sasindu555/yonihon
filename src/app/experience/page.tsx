import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import SearchInput from "@/components/SearchInput";
import ExperienceCard from "@/components/ExperienceCard";
import { readCollection } from "@/lib/storage";
import { destinations, experienceCategories } from "@/lib/data";
import type { Experience } from "@/lib/types";

export default async function ExperiencesPage() {
  const experiences = readCollection<Experience>("experiences");
  return (
    <>
      <Hero
        title="Explore Experiences"
        subtitle="Authentic workshops, cultural classes, and local activities — handpicked by our Tokyo team."
        image="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />

      <section className="py-8 bg-zinc-50 border-b border-zinc-200">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="w-full lg:w-64">
              <SearchInput placeholder="Find Experiences" />
            </div>
            <div className="flex flex-wrap gap-3 w-full">
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>All Locations</option>
                {destinations.map((d) => (
                  <option key={d.slug}>{d.name}</option>
                ))}
              </select>
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>All Categories</option>
                {experienceCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>Any Price</option>
                <option>Under ¥5,000</option>
                <option>¥5,000 – ¥10,000</option>
                <option>¥10,000 – ¥20,000</option>
                <option>Over ¥20,000</option>
              </select>
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>Any Duration</option>
                <option>&lt; 2 hours</option>
                <option>2 – 4 hours</option>
                <option>Half day +</option>
              </select>
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>Any Language</option>
                <option>English</option>
                <option>Japanese</option>
              </select>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Featured Experiences</h2>
            <select className="border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Popular</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
              <option>Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <p className="text-lg">No experiences found matching your criteria.</p>
              <p className="text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      <StatBand />
    </>
  );
}
