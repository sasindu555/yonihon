import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-zinc-400">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              YONIHON
            </Link>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
              Connecting travelers with authentic Japanese culture, one experience at a time.
            </p>
            <div className="flex gap-3 mt-4">
              {["#", "#", "#", "#"].map((href, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-colors text-xs"
                  aria-label="Social link"
                >
                  {["F", "X", "I", "Y"][i]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/experience", label: "Experiences" },
                { href: "/travel-guide", label: "Travel Guide" },
                { href: "/event", label: "Events" },
                { href: "/destination", label: "Destinations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about", label: "About YoNihon" },
                { href: "/partners", label: "For Partners" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:info.yonihon@gmail.com" className="hover:text-white transition-colors">
                  info.yonihon@gmail.com
                </a>
              </li>
              <li>+81-70-3527-3774</li>
              <li>2-1-1 Shibuya, Tokyo, Japan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-xs text-zinc-600">
          &copy; 2026 Yonihon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
