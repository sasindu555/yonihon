"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Explore Experiences" },
  { href: "/travel-guide", label: "Travel Guide" },
  { href: "/event", label: "Events" },
  { href: "/about", label: "About YoNihon" },
  { href: "/partners", label: "For Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-dark text-white sticky top-0 z-50">
      <div className="container-site flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">YONIHON</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/experience"
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded text-sm font-semibold transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-dark border-t border-zinc-800">
          <div className="container-site py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-300 hover:text-white py-1 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/experience"
              className="bg-primary text-white px-5 py-2.5 rounded text-sm font-semibold text-center mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
