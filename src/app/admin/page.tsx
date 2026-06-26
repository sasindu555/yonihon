import Link from "next/link";

const tiles = [
  { href: "/admin/experiences", label: "Experiences", count: "—", color: "bg-primary" },
  { href: "/admin/events", label: "Events", count: "—", color: "bg-blue-600" },
  { href: "/admin/guides", label: "Travel Guides", count: "—", color: "bg-emerald-600" },
  { href: "/admin/destinations", label: "Destinations", count: "—", color: "bg-amber-600" },
  { href: "/admin/categories", label: "Categories", count: "—", color: "bg-purple-600" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Dashboard</h1>
      <p className="text-sm text-zinc-500 mb-6">
        Manage your site content from here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="bg-white rounded-lg border border-zinc-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${tile.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
              {tile.label[0]}
            </div>
            <h3 className="font-semibold text-zinc-900 mt-3">{tile.label}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{tile.count} items</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
