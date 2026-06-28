import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import EventCard from "@/components/EventCard";
import { getEvents } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug.replace(/-/g, " ");
  return { title: `#${tag} — Events | Yonihon`, description: `Browse events tagged with #${tag}.` };
}

export default async function EventTagPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug.replace(/-/g, " ");
  const events = await getEvents();
  const filtered = events.filter((e) =>
    e.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === slug)
  );
  if (filtered.length === 0) notFound();

  return (
    <>
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/event" }, { label: `#${tag}` }]} />
      <section className="py-12 md:py-16 bg-zinc-50">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
            Events tagged with <span className="text-primary">#{tag}</span>
          </h1>
          <p className="text-zinc-500 mt-2">{filtered.length} {filtered.length === 1 ? "event" : "events"} found</p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((evt) => <EventCard key={evt.id} event={evt} />)}
          </div>
        </div>
      </section>
    </>
  );
}
