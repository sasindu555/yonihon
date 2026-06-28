import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { loginUser } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email: string; password: string };
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  const result = await loginUser(email, password);
  if (!result) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set("yonihon_admin", result.session, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ success: true, user: { name: result.user.name, role: result.user.role } });
}
