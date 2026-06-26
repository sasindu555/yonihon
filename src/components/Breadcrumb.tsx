import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="container-site py-3 text-xs text-zinc-500">
      {crumbs.map((crumb, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">›</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-primary transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-zinc-800 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
