import { NextResponse } from "next/server";
import { getEvents, createEvent } from "@/lib/db";
import { getSession, hasAccess } from "@/lib/admin-auth";

export async function GET() {
  const data = await getEvents();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = (await request.json()) as any;
  const newItem = await createEvent(body);
  return NextResponse.json(newItem, { status: 201 });
}
