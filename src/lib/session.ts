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
  const enc = new TextEncoder();
  const bytes = enc.encode(JSON.stringify(session));
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function deserializeSession(raw: string): Session | null {
  try {
    const binary = atob(raw);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const dec = new TextDecoder();
    return JSON.parse(dec.decode(bytes));
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
