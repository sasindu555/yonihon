import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { Experience } from "@/lib/types";

export async function GET() {
  const data = readCollection<Experience>("experiences");
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const data = readCollection<Experience>("experiences");
  const newItem: Experience = { ...body, id: String(Date.now()) };
  data.push(newItem);
  writeCollection("experiences", data);
  return NextResponse.json(newItem, { status: 201 });
}
