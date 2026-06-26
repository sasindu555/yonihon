interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "5,000+", label: "Happy Travelers" },
  { value: "Based in Tokyo", label: "Trusted local team" },
  { value: "Local Workshop Partners", label: "Authentic experiences" },
  { value: "Personal Booking Support", label: "We answer fast" },
];

export default function StatBand() {
  return (
    <section className="bg-dark text-white py-8 md:py-10">
      <div className="container-site">
        <p className="text-center text-sm text-zinc-400 mb-6 font-medium">
          Trusted by travelers in Japan since 2018
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg md:text-xl font-bold">{stat.value}</div>
              <div className="text-xs md:text-sm text-zinc-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
