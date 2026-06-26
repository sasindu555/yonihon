import Image from "next/image";
import Link from "next/link";
import { Experience } from "@/lib/types";

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-zinc-100 transition-shadow hover:shadow-md">
      <Link href={`/experience/${experience.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.title}
            width={600}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {experience.popular && (
            <span className="absolute top-3 left-3 bg-accent text-black text-xs font-bold px-2.5 py-1 rounded">
              POPULAR
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs text-zinc-500 mb-1.5">
          {experience.duration} &middot; {experience.groupSize} &middot;{" "}
          {experience.location}
        </div>
        <Link href={`/experience/${experience.slug}`}>
          <h3 className="font-semibold text-base leading-snug text-zinc-900 hover:text-primary transition-colors">
            {experience.title}
          </h3>
        </Link>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            {experience.currency}{experience.price.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-500">/ person</span>
        </div>
      </div>
    </div>
  );
}
