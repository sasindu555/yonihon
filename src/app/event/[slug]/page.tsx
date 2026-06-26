import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Gallery from "@/components/Gallery";
import { events } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={event.heroImage}
          alt={event.title}
          width={1920}
          height={900}
          className="w-full h-full object-cover"
        />
      </div>

      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/event" },
          { label: event.category, href: `/event?type=${event.category.toLowerCase().replace(/\s+/g, "-")}` },
          { label: event.title },
        ]}
      />

      <div className="container-site py-8">
        <div className="text-sm text-zinc-600 mb-2">
          {event.startDate} &ndash; {event.endDate} &middot; {event.location}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
          {event.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {event.highlightTitle && (
              <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Festival Highlight</h2>
                <p className="text-zinc-700 leading-relaxed">{event.highlightTitle}</p>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-zinc-900 mb-3">About</h2>
              <div className="text-zinc-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {event.whyPeopleLoveIt && (
              <div className="bg-zinc-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Why People Love It</h2>
                <p className="text-zinc-700 leading-relaxed">{event.whyPeopleLoveIt}</p>
              </div>
            )}

            {event.tipsForVisitors.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Tips for Visitors</h2>
                <ul className="space-y-1.5">
                  {event.tipsForVisitors.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-700 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.tags.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Tags</h2>
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
              </div>
            )}

            {event.images.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Event Gallery</h2>
                <Gallery images={event.images} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-zinc-50 rounded-lg border border-zinc-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-900">Event Details</h2>

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Category</div>
                <div className="text-sm font-medium text-zinc-900">{event.category}</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">When</div>
                <div className="text-sm font-medium text-zinc-900">
                  {event.startDate} &ndash; {event.endDate}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Area</div>
                <div className="text-sm font-medium text-zinc-900">{event.area}</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Prefecture</div>
                <div className="text-sm font-medium text-zinc-900">{event.prefecture}</div>
              </div>

              {event.nearestStation && (
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Nearest Station</div>
                  <div className="text-sm font-medium text-zinc-900">{event.nearestStation}</div>
                </div>
              )}

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Admission</div>
                <div className="text-sm font-medium text-green-700">{event.admission}</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Best For</div>
                <div className="text-sm font-medium text-zinc-900">{event.bestFor}</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Good For</div>
                <div className="text-sm font-medium text-zinc-900">{event.goodFor}</div>
              </div>

              {event.officialSite && (
                <a
                  href={event.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary text-sm font-semibold hover:underline"
                >
                  Visit website &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
