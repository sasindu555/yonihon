import { NextResponse } from "next/server";
import { getGuideCategories, createGuideCategory, replaceGuideCategories, deleteGuideCategories } from "@/lib/db";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { GuideCategory } from "@/lib/types";

export async function GET() {
  const data = await getGuideCategories();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: GuideCategory = await request.json();
  const created = await createGuideCategory(body);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: GuideCategory[] = await request.json();
  await replaceGuideCategories(body);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const slugs: string[] = await request.json();
  await deleteGuideCategories(slugs);
  return NextResponse.json({ success: true });
}
