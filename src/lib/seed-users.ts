import { AdminUser } from "./types";

export const seedUsers: AdminUser[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@yonihon.com",
    password: "", // computed at runtime
    role: "super_admin",
    createdAt: "2026-01-01",
    lastLogin: null,
    active: true,
  },
  {
    id: "2",
    name: "Editor",
    email: "editor@yonihon.com",
    password: "",
    role: "editor",
    createdAt: "2026-01-01",
    lastLogin: null,
    active: true,
  },
  {
    id: "3",
    name: "Support",
    email: "support@yonihon.com",
    password: "",
    role: "support",
    createdAt: "2026-01-01",
    lastLogin: null,
    active: true,
  },
];

export function getDefaultPassword(email: string): string {
  const map: Record<string, string> = {
    "admin@yonihon.com": process.env.ADMIN_PASSWORD || "admin123",
    "editor@yonihon.com": "editor123",
    "support@yonihon.com": "support123",
  };
  return map[email] || "password123";
}
