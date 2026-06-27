import Link from "next/link";
import { redirect } from "next/navigation";
import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import SearchInput from "@/components/SearchInput";
import EventCard from "@/components/EventCard";
import { readCollection } from "@/lib/storage";
import { destinations, eventTypes } from "@/lib/data";
import type { Event } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  if (params.tag && typeof params.tag === "string") {
    redirect(`/event/tag/${params.tag}`);
  }
  const events = readCollection<Event>("events");
  return (
    <>
      <Hero
        title="Japan Events & Festivals"
        subtitle="Discover cultural events, festivals, and seasonal happenings across Japan."
        image="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />

      <section className="py-8 bg-zinc-50 border-b border-zinc-200">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="w-full lg:w-64">
              <SearchInput placeholder="Search events" />
            </div>
            <div className="flex flex-wrap gap-3 w-full">
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>All Locations</option>
                {destinations.map((d) => (
                  <option key={d.slug}>{d.name}</option>
                ))}
              </select>
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>All Types</option>
                {eventTypes.filter((t) => t !== "All Events").map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <select className="border border-zinc-300 rounded-lg px-3 py-2.5 text-sm bg-white">
                <option>Any Month</option>
                {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-zinc-200">
        <div className="container-site">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {eventTypes.map((type) => (
              <Link
                key={type}
                href={type === "All Events" ? "/event" : `/event?type=${type.toLowerCase().replace(/\s+/g, "-")}`}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  type === "All Events"
                    ? "bg-primary text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Upcoming Events</h2>
            <select className="border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Date: Soonest</option>
              <option>Name (A → Z)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <p className="text-lg">No events found matching your criteria.</p>
              <p className="text-sm mt-1">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </section>

      <StatBand />
    </>
  );
}
