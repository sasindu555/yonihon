import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deserializeSession, hasPermission } from "@/lib/session";

const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

const PERMISSION_GATES: Record<string, string[]> = {
  "/admin/users": ["users:read"],
  "/admin/roles": ["users:read"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  if (PUBLIC_ADMIN_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  const raw = request.cookies.get("yonihon_admin")?.value;
  if (!raw) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const session = deserializeSession(raw);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const gate = Object.entries(PERMISSION_GATES).find(([prefix]) =>
    pathname.startsWith(prefix)
  );
  if (gate && !gate[1].some((perm) => hasPermission(session, perm))) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
