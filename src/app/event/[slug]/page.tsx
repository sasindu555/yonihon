import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { formatContent } from "@/lib/markdown";
import { readCollection } from "@/lib/storage";
import type { Event } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const events = readCollection<Event>("events");
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const events = readCollection<Event>("events");
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={event.heroImage}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end pb-12 md:pb-16"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))" }}
        >
          <div className="container-site w-full">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">›</span>
              <Link href="/event" className="hover:text-white transition-colors">Events</Link>
              <span className="text-white/40">›</span>
              <span className="text-white">{event.category}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80 mb-3">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {event.startDate} &ndash; {event.endDate}
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {event.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            {event.highlightTitle && (
              <section>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">Festival Highlight</span>
                <h2 className="text-2xl font-bold text-zinc-900 mt-2">{event.highlightTitle}</h2>
              </section>
            )}

            {event.description && (
              <div
                className="text-zinc-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContent(event.description) }}
              />
            )}

            {event.whyPeopleLoveIt && (
              <section className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">Why People Love It</h3>
                <p className="text-zinc-700 leading-relaxed">{event.whyPeopleLoveIt}</p>
              </section>
            )}

            {event.tipsForVisitors.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">Tips for Visitors</h3>
                <div className="text-zinc-700 leading-relaxed space-y-1">
                  {event.tipsForVisitors.map((tip, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      {tip}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/event?tag=${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-zinc-600 bg-zinc-100 hover:bg-zinc-200 px-3 py-1 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              {event.images.length > 0 && (
                <section className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                  <div className="p-4 pb-0">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Event Gallery</h3>
                  </div>
                  <Gallery images={event.images} variant="sidebar" />
                </section>
              )}

              <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                <div className="p-5">
                  <h3 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-wider">Event Details</h3>
                  <div className="space-y-0">
                    <InfoRow label="Category" value={event.category} />
                    <InfoRow label="When" value={`${event.startDate} – ${event.endDate}`} />
                    <InfoRow label="Area" value={event.area} />
                    <InfoRow label="Prefecture" value={event.prefecture} />
                    {event.nearestStation && <InfoRow label="Nearest Station" value={event.nearestStation} />}
                    <InfoRow label="Admission" value={event.admission} chip />
                    <InfoRow label="Best For" value={event.bestFor} />
                    <InfoRow label="Good For" value={event.goodFor} />
                    {event.officialSite && (
                      <div className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-b-0">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">Official Site</span>
                        <a
                          href={event.officialSite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary font-medium hover:underline text-right"
                        >
                          Visit website &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {event.nearestStation && (
                <div className="rounded-xl overflow-hidden border border-zinc-200 aspect-[4/3]">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240!2d139.75!3d35.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQyJzAwLjAiTiAxMznCsDQ1JzAwLjAiRQ!5e0!3m2!1sen!2sjp!4v1!5m2!1sen!2sjp&q=${encodeURIComponent(event.nearestStation)}}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing ${event.nearestStation}`}
                  />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value, chip }: { label: string; value: string; chip?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-b-0">
      <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
      {chip ? (
        <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{value}</span>
      ) : (
        <span className="text-sm text-zinc-900 text-right max-w-[60%]">{value}</span>
      )}
    </div>
  );
}
