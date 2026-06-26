import { createHash } from "crypto";

export function hashPassword(password: string): string {
  return createHash("sha256")
    .update(password + "yonihon-salt")
    .digest("hex");
}

export async function hashPasswordAsync(password: string): Promise<string> {
  return hashPassword(password);
}
