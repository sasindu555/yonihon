import Image from "next/image";
import Hero from "@/components/Hero";
import PartnerForm from "@/components/PartnerForm";

export default function PartnersPage() {
  return (
    <>
      <Hero
        title="Partner with YoNihon"
        subtitle="Grow your workshop business by reaching thousands of international travelers seeking authentic Japanese experiences."
        image="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=80"
        size="medium"
      >
        <a
          href="#start"
          className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors"
        >
          Become a Partner
        </a>
      </Hero>

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              The Benefits
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2">
              Why Partner with Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Reach",
                desc: "Connect with travelers from 80+ countries who are actively looking for authentic Japanese experiences.",
              },
              {
                title: "Seamless Booking",
                desc: "Our easy booking platform handles all the details so you can focus on your craft.",
              },
              {
                title: "Trusted Brand",
                desc: "Leverage YoNihon's reputation for premium, trustworthy Japan travel experiences.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <h3 className="font-bold text-lg text-zinc-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Submit Your Workshop", desc: "Tell us about your workshop, traditions, and what makes your offering unique." },
              { step: "2", title: "We Review & Curate", desc: "Our curation team checks every workshop in person before listing." },
              { step: "3", title: "Go Live", desc: "Get featured on YoNihon, start receiving bookings, and grow your business." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-zinc-900 mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80"
              alt="Japanese craft workshop"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-zinc-500 font-medium">Join Free</p>
            <p className="text-xs text-zinc-400">No listing fees</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">What We Look For</h2>
              <p className="text-zinc-600 mb-6">
                We work with hosts who care deeply about their craft and the people they share it with.
              </p>
              <ul className="space-y-3">
                {[
                  "Deep expertise in a Japanese craft or tradition",
                  "Ability to host in English or provide interpretation",
                  "Central location or unique historical setting",
                  "Commitment to authentic, sustainable hospitality",
                  "High-quality tools and consumables",
                  "Passionate storytelling and great character",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-green-600 text-lg shrink-0">&#10003;</span>
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="start" className="bg-zinc-50 rounded-lg border border-zinc-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Start Your Journey</h3>
              <p className="text-sm text-zinc-600 mb-6">
                Tell us about your workshop and we&apos;ll be in touch within 48 hours.
              </p>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
