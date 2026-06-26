import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { Guide } from "@/lib/types";

export async function GET() {
  const data = readCollection<Guide>("guides");
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const data = readCollection<Guide>("guides");
  const newItem: Guide = { ...body, id: String(Date.now()) };
  data.push(newItem);
  writeCollection("guides", data);
  return NextResponse.json(newItem, { status: 201 });
}
