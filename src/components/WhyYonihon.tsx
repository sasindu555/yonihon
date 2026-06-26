const reasons = [
  {
    title: "Authentic Local Partners",
    description:
      "Hand-picked workshop hosts across Japan, vetted by our Tokyo team.",
  },
  {
    title: "Personal Support",
    description:
      "A human on the other side of every booking — no chatbots, ever.",
  },
  {
    title: "Real Stories",
    description:
      "Reviewed by travelers who actually went. No paid placements.",
  },
  {
    title: "Local Experiences",
    description:
      "Hidden gems and seasonal favourites you won't find on big platforms.",
  },
];

export default function WhyYonihon() {
  return (
    <section className="py-16 md:py-20 bg-zinc-50">
      <div className="container-site">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Why YoNihon
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-2">
            The Best Way to Experience Japan
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white p-6 rounded-lg border border-zinc-100 text-center"
            >
              <h3 className="font-bold text-lg text-zinc-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
