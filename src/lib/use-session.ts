"use client";

import { useState } from "react";
import type { Session } from "./types";

export function useAdminSession() {
  const [session] = useState<Session | null>(() => {
    if (typeof document === "undefined") return null;
    const raw = document.cookie
      .split("; ")
      .find((r) => r.startsWith("yonihon_admin="))
      ?.split("=")[1];
    if (!raw) return null;
    try {
      return JSON.parse(atob(raw));
    } catch {
      return null;
    }
  });
  return session;
}
