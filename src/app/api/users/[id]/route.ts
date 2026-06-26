import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { hashPassword } from "@/lib/hash";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { AdminUser } from "@/lib/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const users = readCollection<AdminUser>("users");
  const user = users.find((u) => u.id === id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...safe } = user;
  return NextResponse.json(safe);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const body = await request.json();
  const users = readCollection<AdminUser>("users");
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (body.email && body.email !== users[index].email) {
    if (users.some((u) => u.email === body.email && u.id !== id)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
  }
  users[index] = {
    ...users[index],
    name: body.name ?? users[index].name,
    email: body.email ?? users[index].email,
    role: body.role ?? users[index].role,
    active: body.active ?? users[index].active,
  };
  if (body.password) {
    users[index].password = hashPassword(body.password);
  }
  writeCollection("users", users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...safe } = users[index];
  return NextResponse.json(safe);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const users = readCollection<AdminUser>("users");
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeCollection("users", filtered);
  return NextResponse.json({ success: true });
}
