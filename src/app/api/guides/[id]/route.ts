import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/storage";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { Guide } from "@/lib/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const data = readCollection<Guide>("guides");
  const item = data.find((g) => g.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const body = await request.json();
  const data = readCollection<Guide>("guides");
  const index = data.findIndex((g) => g.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[index] = { ...data[index], ...body, id };
  writeCollection("guides", data);
  return NextResponse.json(data[index]);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const data = readCollection<Guide>("guides");
  const filtered = data.filter((g) => g.id !== id);
  if (filtered.length === data.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeCollection("guides", filtered);
  return NextResponse.json({ success: true });
}
