import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About YoNihon"
        subtitle="Discover the story of how we connect international travelers with authentic Japanese workshops, festivals, and hidden cultural gems."
        image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />

      <section id="story" className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2">
                Preserving Culture Through Authentic Connections
              </h2>
              <p className="text-zinc-700 mt-4 leading-relaxed">
                YoNihon was born from a desire to share the hidden depths of Japan.
                We built this platform to connect international travelers with authentic
                local workshops, festivals, and craft traditions &mdash; all curated by
                our Tokyo-based team.
              </p>
              <div className="flex gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-zinc-600">Curated Experiences</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-zinc-600">Local Partners</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80"
                alt="Tokyo streets at night"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              Our Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2">
              Why We Focus on Local
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80"
                alt="Japanese garden"
                width={1200}
                height={800}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Sustainable Communities",
                  desc: "We work directly with artisans and family-run workshops to keep heritage trades alive.",
                },
                {
                  title: "Expert Curation",
                  desc: "Every experience is personally verified by our Tokyo team.",
                },
                {
                  title: "Authentic, Unmissable",
                  desc: "Real cultural moments, not curated tourist replicas.",
                },
                {
                  title: "Uncompromising Trust",
                  desc: "Customer support is hands-on, fast, and human.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900">{item.title}</h3>
                    <p className="text-sm text-zinc-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              The People
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2">
              Meet Our Team
            </h2>
            <p className="text-zinc-600 mt-2 max-w-xl mx-auto">
              Our small team is based in Tokyo and dedicated to making your trip authentic.
            </p>
          </div>
          <div className="text-center py-8 text-zinc-400">
            <p>Team profiles coming soon.</p>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-16">
        <div className="container-site text-center">
          <h2 className="text-3xl font-bold">Ready to Experience the Real Japan?</h2>
          <p className="text-zinc-400 mt-2">
            Join our community and start planning your journey into authentic Japanese
            culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              href="/experience"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors"
            >
              Browse Experiences
            </Link>
            <Link
              href="/partners"
              className="border border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-6 py-2.5 rounded text-sm font-semibold transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
