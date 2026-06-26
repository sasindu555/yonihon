import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { GuideCategory } from "@/lib/types";

export async function GET() {
  const data = readCollection<GuideCategory>("guideCategories");
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const data = readCollection<GuideCategory>("guideCategories");
  data.push(body);
  writeCollection("guideCategories", data);
  return NextResponse.json(body, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  writeCollection("guideCategories", body);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const slugs: string[] = await request.json();
  const data = readCollection<GuideCategory>("guideCategories");
  const filtered = data.filter((c) => !slugs.includes(c.slug));
  writeCollection("guideCategories", filtered);
  return NextResponse.json({ success: true });
}
