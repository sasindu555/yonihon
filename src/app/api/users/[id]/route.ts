import { NextResponse } from "next/server";
import { getUser, getUsers, updateUser, deleteUser, getUserByEmail } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { getSession, hasAccess } from "@/lib/admin-auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const user = await getUser(id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { password: _pw, ...safe } = user;
  return NextResponse.json(safe);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const body = (await request.json()) as any;
  const user = await getUser(id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (body.email && body.email !== user.email) {
    const existing = await getUserByEmail(body.email);
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
  }
  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.email !== undefined) updates.email = body.email;
  if (body.role !== undefined) updates.role = body.role;
  if (body.active !== undefined) updates.active = body.active;
  if (body.password) updates.password = await hashPassword(body.password);
  const updated = await updateUser(id, updates as Parameters<typeof updateUser>[1]);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { password: _pw, ...safe } = updated;
  return NextResponse.json(safe);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const ok = await deleteUser(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
