import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { getSession, hasPermission } from "@/lib/session";
import { ALL_PERMISSIONS } from "@/lib/permissions";
import type { RoleDefinition } from "@/lib/permissions";

export async function GET() {
  const session = await getSession();
  if (!hasPermission(session, "users:read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const roles = readCollection<RoleDefinition>("roles");
  return NextResponse.json({ roles, allPermissions: ALL_PERMISSIONS });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!hasPermission(session, "users:write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const existing = readCollection<RoleDefinition>("roles");
  const updated = existing.map((r) => {
    const incoming = body.find((b: RoleDefinition) => b.role === r.role);
    return incoming ? { ...r, permissions: incoming.permissions } : r;
  });
  writeCollection("roles", updated);
  return NextResponse.json({ success: true });
}
