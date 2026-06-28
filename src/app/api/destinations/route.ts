import { NextResponse } from "next/server";
import { getDestinations, createDestination, replaceDestinations, deleteDestinations } from "@/lib/db";
import { getSession, hasAccess } from "@/lib/admin-auth";
import type { Destination } from "@/lib/types";

export async function GET() {
  const data = await getDestinations();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: Destination = await request.json();
  const created = await createDestination(body);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body: Destination[] = await request.json();
  await replaceDestinations(body);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const slugs: string[] = await request.json();
  await deleteDestinations(slugs);
  return NextResponse.json({ success: true });
}
