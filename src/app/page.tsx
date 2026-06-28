import Link from "next/link";
import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import ExperienceCard from "@/components/ExperienceCard";
import EventCard from "@/components/EventCard";
import ArticleCard from "@/components/ArticleCard";
import WhyYonihon from "@/components/WhyYonihon";
import { getExperiences, getEvents, getGuides } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [experiences, events, guides] = await Promise.all([
    getExperiences(),
    getEvents(),
    getGuides(),
  ]);
  const featuredExperiences = experiences.filter((e) => e.featured);
  const upcomingEvents = events.slice(0, 3);
  const latestGuides = guides.slice(0, 3);

  return (
    <>
      <Hero
        title="Discover Unique Experiences in Japan"
        subtitle="Book local workshops, hidden gems, and unforgettable activities curated by our Japan team."
        image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/experience"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded text-sm font-semibold transition-colors"
          >
            Explore Experiences
          </Link>
          <Link
            href="/travel-guide"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 px-6 py-3 rounded text-sm font-semibold transition-colors"
          >
            Read Travel Guide
          </Link>
        </div>
      </Hero>

      <StatBand />

      {featuredExperiences.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider">Featured</p>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-1">Handpicked Just for You</h2>
              </div>
              <Link href="/experience" className="text-sm font-semibold text-primary hover:underline hidden sm:block">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExperiences.map((exp) => <ExperienceCard key={exp.id} experience={exp} />)}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/experience" className="text-sm font-semibold text-primary hover:underline">View all experiences</Link>
            </div>
          </div>
        </section>
      )}

      {upcomingEvents.length > 0 && (
        <section className="py-16 md:py-20 bg-zinc-50">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider">This Season</p>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-1">Japan Festivals & Seasonal Highlights</h2>
              </div>
              <Link href="/event" className="text-sm font-semibold text-primary hover:underline hidden sm:block">See all events</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((evt) => <EventCard key={evt.id} event={evt} />)}
            </div>
          </div>
        </section>
      )}

      <WhyYonihon />

      {latestGuides.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider">Travel Guide</p>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-1">Tips, Inspiration & Local Insights</h2>
              </div>
              <Link href="/travel-guide" className="text-sm font-semibold text-primary hover:underline hidden sm:block">Read all guides</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestGuides.map((guide) => <ArticleCard key={guide.id} article={guide} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-dark text-white py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">Are You a Workshop Owner in Japan?</h3>
              <p className="text-zinc-400 mt-2 text-sm">List your workshop on YoNihon and reach international travelers.</p>
              <Link href="/partners" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors">Become a Partner</Link>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">Ready to Explore Japan?</h3>
              <p className="text-zinc-400 mt-2 text-sm">Browse handcrafted experiences and start planning your trip.</p>
              <Link href="/experience" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors">Browse Experiences</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
