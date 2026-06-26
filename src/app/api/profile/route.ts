import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { hashPassword } from "@/lib/hash";
import { getSession } from "@/lib/admin-auth";
import type { AdminUser } from "@/lib/types";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const users = readCollection<AdminUser>("users");
  const index = users.findIndex((u) => u.id === session.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (body.currentPassword) {
    if (hashPassword(body.currentPassword) !== users[index].password) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }
    if (body.newPassword) {
      users[index].password = hashPassword(body.newPassword);
    }
  }
  if (body.name) {
    users[index].name = body.name;
  }
  writeCollection("users", users);
  return NextResponse.json({ success: true });
}
