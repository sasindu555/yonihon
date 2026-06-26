"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  permission: string;
}

const allNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "D", permission: "" },
  { href: "/admin/experiences", label: "Experiences", icon: "E", permission: "experiences:read" },
  { href: "/admin/events", label: "Events", icon: "V", permission: "events:read" },
  { href: "/admin/guides", label: "Travel Guides", icon: "G", permission: "guides:read" },
  { href: "/admin/destinations", label: "Destinations", icon: "D", permission: "destinations:read" },
  { href: "/admin/categories", label: "Categories", icon: "C", permission: "categories:read" },
  { href: "/admin/users", label: "Users", icon: "U", permission: "users:read" },
  { href: "/admin/roles", label: "Roles", icon: "R", permission: "users:read" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session] = useState<{ name: string; permissions?: string[] } | null>(() => {
    if (typeof document === "undefined") return null;
    const raw = document.cookie
      .split("; ")
      .find((r) => r.startsWith("yonihon_admin="))
      ?.split("=")[1];
    if (!raw) return null;
    try {
      return JSON.parse(atob(raw));
    } catch {
      return null;
    }
  });

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const perms = session?.permissions || [];
  const navItems = allNavItems.filter(
    (item) => !item.permission || perms.includes(item.permission)
  );

  function handleLogout() {
    document.cookie = "yonihon_admin=; path=/; max-age=0";
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-zinc-50">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark text-white transform transition-transform md:translate-x-0 md:static md:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-zinc-800">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            YONIHON
          </Link>
          <p className="text-xs text-zinc-500 mt-0.5">Admin Panel</p>
          {session && (
            <p className="text-xs text-zinc-400 mt-1">
              {session.name}
            </p>
          )}
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <span className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center text-xs font-bold shrink-0">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 space-y-1">
          <Link
            href="/admin/profile"
            className={`block text-xs transition-colors ${
              pathname === "/admin/profile" ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Profile Settings
          </Link>
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-zinc-500 hover:text-zinc-300"
          >
            View Site &rarr;
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-zinc-200 h-14 flex items-center px-4 md:px-6">
          <button
            className="md:hidden mr-3 text-zinc-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-sm font-semibold text-zinc-700">
            {navItems.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"))?.label || "Admin"}
          </h2>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
