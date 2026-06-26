import { cookies } from "next/headers";
import type { AdminUser, Session, AdminRole } from "./types";

export function serializeSession(user: AdminUser, permissions: string[]): string {
  const session: Session = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions,
  };
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export function deserializeSession(raw: string): Session | null {
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("yonihon_admin")?.value;
  if (!raw) return null;
  return deserializeSession(raw);
}

export function hasAccess(
  session: Session | null,
  allowedRoles: AdminRole[]
): boolean {
  if (!session) return false;
  return allowedRoles.includes(session.role);
}

export function hasPermission(
  session: Session | null,
  permission: string
): boolean {
  if (!session) return false;
  return session.permissions.includes(permission);
}
