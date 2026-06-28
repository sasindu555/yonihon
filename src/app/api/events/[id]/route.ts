import { NextResponse } from "next/server";
import { getEvent, updateEvent, deleteEvent } from "@/lib/db";
import { getSession, hasAccess } from "@/lib/admin-auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const item = await getEvent(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const body = (await request.json()) as any;
  const updated = await updateEvent(id, { ...body, id });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const ok = await deleteEvent(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
