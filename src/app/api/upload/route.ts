import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSession, hasAccess } from "@/lib/admin-auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getSession();
  if (!hasAccess(session, ["super_admin", "editor"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size: ${MAX_SIZE / 1024 / 1024}MB` },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { env } = getCloudflareContext();
  const bucket = env.UPLOADS as R2Bucket;
  await bucket.put(key, bytes, {
    httpMetadata: { contentType: file.type },
  });

  return NextResponse.json({ url: `/${key}` });
}
