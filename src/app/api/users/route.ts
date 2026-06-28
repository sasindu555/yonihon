import { NextResponse } from "next/server";
import { getUsers, createUser, getUserByEmail } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { getSession, hasAccess } from "@/lib/admin-auth";

export async function GET() {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const users = await getUsers();
  const safe = users.map(({ password: _pw, ...u }) => u);
  return NextResponse.json(safe);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = (await request.json()) as any;
  const existing = await getUserByEmail(body.email);
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }
  const newUser = {
    id: String(Date.now()),
    name: body.name,
    email: body.email,
    password: await hashPassword(body.password),
    role: body.role || "editor",
    createdAt: new Date().toISOString(),
    lastLogin: null,
    active: body.active !== false,
  };
  await createUser(newUser);
  const { password: _pw, ...safe } = newUser;
  return NextResponse.json(safe, { status: 201 });
}
