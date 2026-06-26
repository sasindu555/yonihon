import { readCollection, writeCollection } from "./storage";
import { hashPassword } from "./hash";
import { serializeSession } from "./session";
import type { AdminUser } from "./types";
import type { RoleDefinition } from "./permissions";

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: AdminUser; session: string } | null> {
  const users = readCollection<AdminUser>("users");
  const user = users.find(
    (u) => u.email === email && u.active && hashPassword(password) === u.password
  );
  if (!user) return null;
  user.lastLogin = new Date().toISOString();
  writeCollection("users", users);
  const roles = readCollection<RoleDefinition>("roles");
  const roleDef = roles.find((r) => r.role === user.role);
  const session = serializeSession(user, roleDef?.permissions || []);
  return { user, session };
}

export { serializeSession, deserializeSession, getSession, hasAccess, hasPermission } from "./session";
