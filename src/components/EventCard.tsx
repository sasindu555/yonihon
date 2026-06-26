import Image from "next/image";
import Link from "next/link";
import { Event } from "@/lib/types";

export default function EventCard({ event }: { event: Event }) {
  const isFree = event.admission?.toLowerCase() === "free";

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-100 transition-shadow hover:shadow-md">
      <Link href={`/event/${event.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={event.heroImage}
            alt={event.title}
            width={600}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1.5 rounded leading-tight text-center">
            {event.startDate}
            <br />
            {event.endDate}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs text-zinc-500 mb-1">{event.location}</div>
        <Link href={`/event/${event.slug}`}>
          <h3 className="font-semibold text-base leading-snug text-zinc-900 hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>
        <p className="text-sm text-zinc-600 mt-1.5 line-clamp-2">{event.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {isFree && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
              Free Entry
            </span>
          )}
          {event.goodFor?.includes("English") && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
              English Friendly
            </span>
          )}
          {event.goodFor?.includes("Families") && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-medium">
              Family Friendly
            </span>
          )}
          <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full font-medium">
            {event.category}
          </span>
        </div>
      </div>
    </div>
  );
}
