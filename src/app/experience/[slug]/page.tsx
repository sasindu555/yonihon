import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";
import { readCollection } from "@/lib/storage";
import type { Experience } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiences = readCollection<Experience>("experiences");
  const experience = experiences.find((e) => e.slug === slug);
  if (!experience) return { title: "Experience Not Found" };
  return {
    title: experience.title,
    description: experience.shortDescription,
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const experiences = readCollection<Experience>("experiences");
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) notFound();

  return (
    <>
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={experience.images[0] || experience.image}
          alt={experience.title}
          width={1920}
          height={900}
          className="w-full h-full object-cover"
        />
      </div>

      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Experiences", href: "/experience" },
          { label: experience.title },
        ]}
      />

      <div className="container-site py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900">
              {experience.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-600">
              <span>Duration: {experience.duration}</span>
              <span>Group Size: {experience.groupSize}</span>
              <span>Language: {experience.language}</span>
              <span>Type: {experience.experienceType}</span>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-3">Experience Overview</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-zinc-50 rounded-lg p-4 flex-1 min-w-[140px]">
                  <div className="font-semibold text-zinc-900">Duration</div>
                  <div className="text-zinc-600">{experience.duration}</div>
                </div>
                <div className="bg-zinc-50 rounded-lg p-4 flex-1 min-w-[140px]">
                  <div className="font-semibold text-zinc-900">Group Size</div>
                  <div className="text-zinc-600">{experience.groupSize}</div>
                </div>
                <div className="bg-zinc-50 rounded-lg p-4 flex-1 min-w-[140px]">
                  <div className="font-semibold text-zinc-900">Language</div>
                  <div className="text-zinc-600">{experience.language}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-3">What You&apos;ll Do</h2>
              <p className="text-zinc-700 leading-relaxed">{experience.description}</p>
            </div>

            {experience.highlights.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Highlights</h2>
                <ul className="space-y-2">
                  {experience.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-700">
                      <span className="text-primary mt-0.5">&#10003;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-3">What&apos;s Included</h2>
              <ul className="space-y-1 text-zinc-700">
                {experience.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {experience.notIncluded.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-zinc-900 mb-3">What&apos;s Not Included</h2>
                <ul className="space-y-1 text-zinc-700">
                  {experience.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">&#10007;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {experience.itinerary.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Itinerary</h2>
                {experience.itinerary.map((item, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                    <p className="text-zinc-700 text-sm mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-3">Meeting Point</h2>
              <p className="text-zinc-700">{experience.meetingPoint}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(experience.meetingPoint)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-semibold hover:underline mt-2 inline-block"
              >
                View on Google Maps
              </a>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-3">Cancellation Policy</h2>
              <div className="text-zinc-700 text-sm leading-relaxed whitespace-pre-line">
                {experience.cancellationPolicy}
              </div>
              <p className="text-sm text-green-700 font-medium mt-2">
                Free cancellation up to 24 h before
              </p>
            </div>

            {experience.images.length > 1 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-zinc-900 mb-3">Workshop Gallery</h2>
                <Gallery images={experience.images} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-zinc-50 rounded-lg border border-zinc-200 p-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {experience.currency}{experience.price.toLocaleString()}
                </div>
                <div className="text-sm text-zinc-500">/ person</div>

                <div className="mt-4 space-y-2 text-sm text-zinc-600 text-left">
                  <p className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Free cancellation up to 24 h before
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Reserve now, pay nothing today
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600">&#10003;</span>
                    Personal booking support
                  </p>
                </div>

                <a
                  href="#booking"
                  className="mt-4 block w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg text-sm font-semibold text-center transition-colors"
                >
                  Book Now
                </a>
              </div>

              <div id="booking">
                <BookingForm hostName={experience.hostName} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
