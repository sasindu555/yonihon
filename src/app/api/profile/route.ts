import { NextResponse } from "next/server";
import { getUser, updateUser } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { getSession } from "@/lib/admin-auth";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as any;
  const user = await getUser(session.id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updates: Record<string, unknown> = {};
  if (body.currentPassword) {
    const currentHashed = await hashPassword(body.currentPassword);
    if (currentHashed !== user.password) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }
    if (body.newPassword) {
      updates.password = await hashPassword(body.newPassword);
    }
  }
  if (body.name) updates.name = body.name;
  await updateUser(session.id, updates as Parameters<typeof updateUser>[1]);
  return NextResponse.json({ success: true });
}
