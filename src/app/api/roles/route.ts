import { NextResponse } from "next/server";
import { getRoles, updateRoles } from "@/lib/db";
import { getSession, hasPermission } from "@/lib/session";
import { ALL_PERMISSIONS } from "@/lib/permissions";
import type { RoleDefinition } from "@/lib/permissions";

export async function GET() {
  const session = await getSession();
  if (!hasPermission(session, "users:read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const roles = await getRoles();
  return NextResponse.json({ roles, allPermissions: ALL_PERMISSIONS });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!hasPermission(session, "users:write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: RoleDefinition[] = await request.json();
  await updateRoles(body);
  return NextResponse.json({ success: true });
}
