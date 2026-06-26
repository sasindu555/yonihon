import Image from "next/image";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact YoNihon"
        subtitle="Have questions about your trip, an experience, or a partnership? Our team in Tokyo answers every message personally."
        image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2 mb-8">
                We&apos;d Love to Hear From You
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">HR</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">Support Hours</h3>
                    <p className="text-sm text-zinc-600 mt-0.5">
                      Monday &ndash; Friday 9:00 &ndash; 18:00 JST
                    </p>
                    <p className="text-sm text-zinc-600">
                      Saturday 10:00 &ndash; 16:00 JST
                    </p>
                    <p className="text-sm text-zinc-500">Sunday Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">@</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">Email Us</h3>
                    <a
                      href="mailto:info.yonihon@gmail.com"
                      className="text-sm text-primary hover:underline"
                    >
                      info.yonihon@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">T</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">Call Us</h3>
                    <p className="text-sm text-zinc-600">+81-70-3527-3774</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">W</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">WhatsApp</h3>
                    <p className="text-sm text-zinc-600">+81-70-3527-3774</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xs">B</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">Office</h3>
                    <p className="text-sm text-zinc-600">2-1-1 Shibuya, Tokyo, Japan</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-zinc-900 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {["F", "X", "I", "Y"].map((label) => (
                    <a
                      key={label}
                      href="#"
                      className="w-9 h-9 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 hover:bg-primary hover:text-white transition-colors text-xs font-bold"
                      aria-label={`${label} link`}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-zinc-50 rounded-lg border border-zinc-200 p-6 md:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80"
                alt="Tokyo cityscape"
                width={1600}
                height={600}
                className="w-full h-64 object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Visit Us in Tokyo
              </h2>
              <p className="text-zinc-600 mt-2">
                Experience our hospitality firsthand at our Tokyo office.
              </p>
              <a
                href="https://maps.google.com/?q=2-1-1+Shibuya+Tokyo+Japan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded text-sm font-semibold transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
