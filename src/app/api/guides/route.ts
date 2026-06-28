import { NextResponse } from "next/server";
import { getGuides, createGuide } from "@/lib/db";
import { getSession, hasAccess } from "@/lib/admin-auth";

export async function GET() {
  const data = await getGuides();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = (await request.json()) as any;
  const newItem = await createGuide(body);
  return NextResponse.json(newItem, { status: 201 });
}
