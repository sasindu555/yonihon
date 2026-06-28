import { getUserByEmail, getRoles, updateUser } from "./db";
import { hashPassword } from "./hash";
import { serializeSession } from "./session";
import type { AdminUser } from "./types";
import type { RoleDefinition } from "./permissions";

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: AdminUser; session: string } | null> {
  const user = await getUserByEmail(email);
  if (!user || !user.active) return null;
  const hashed = await hashPassword(password);
  if (hashed !== user.password) return null;
  const now = new Date().toISOString();
  await updateUser(user.id, { lastLogin: now });
  const roles = await getRoles();
  const roleDef = roles.find((r) => r.role === user.role);
  const session = serializeSession({ ...user, lastLogin: now }, roleDef?.permissions || []);
  return { user: { ...user, lastLogin: now }, session };
}

export { serializeSession, deserializeSession, getSession, hasAccess, hasPermission } from "./session";
