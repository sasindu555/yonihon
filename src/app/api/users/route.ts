import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { hashPassword } from "@/lib/hash";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { AdminUser } from "@/lib/types";

export async function GET() {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const users = readCollection<AdminUser>("users");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const safe = users.map(({ password: _pw, ...u }) => u);
  return NextResponse.json(safe);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const users = readCollection<AdminUser>("users");
  if (users.some((u) => u.email === body.email)) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }
  const newUser: AdminUser = {
    id: String(Date.now()),
    name: body.name,
    email: body.email,
    password: hashPassword(body.password),
    role: body.role || "editor",
    createdAt: new Date().toISOString(),
    lastLogin: null,
    active: body.active !== false,
  };
  users.push(newUser);
  writeCollection("users", users);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...safe } = newUser;
  return NextResponse.json(safe, { status: 201 });
}
