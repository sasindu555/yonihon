"use client";

import { useEffect, useState } from "react";
import { useAdminSession } from "@/lib/use-session";

interface RoleEntry {
  role: string;
  label: string;
  permissions: string[];
}

export default function AdminRolesPage() {
  const session = useAdminSession();
  const canWrite = session?.permissions?.includes("users:write") ?? false;
  const [roles, setRoles] = useState<RoleEntry[]>([]);
  const [allPermissions, setAllPermissions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  function load() {
    fetch("/api/roles")
      .then((r) => r.json())
      .then((data) => {
        const d = data as { roles: RoleEntry[]; allPermissions: Record<string, string> };
        setRoles(d.roles);
        setAllPermissions(d.allPermissions);
        setLoading(false);
      });
  }

  useEffect(() => { load(); }, []);

  function toggle(roleName: string, perm: string) {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.role !== roleName) return r;
        const has = r.permissions.includes(perm);
        return {
          ...r,
          permissions: has
            ? r.permissions.filter((p) => p !== perm)
            : [...r.permissions, perm],
        };
      })
    );
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/roles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roles),
    });
    setDirty(false);
    setSaving(false);
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Role Permissions</h1>
          <p className="text-sm text-zinc-500">Configure what each role can do.</p>
        </div>
        {dirty && canWrite && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700 w-40">Permission</th>
              {roles.map((r) => (
                <th key={r.role} className="text-center px-3 py-3 font-semibold text-zinc-700">
                  {r.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {Object.entries(allPermissions).map(([perm, label]) => (
              <tr key={perm} className="hover:bg-zinc-50">
                <td className="px-4 py-2.5 text-zinc-800">{label}</td>
                {roles.map((r) => (
                  <td key={r.role} className="text-center px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={r.permissions.includes(perm)}
                      onChange={() => toggle(r.role, perm)}
                      disabled={!canWrite}
                      className="accent-primary w-4 h-4"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dirty && (
        <p className="text-xs text-zinc-500 mt-3">Unsaved changes. Click &ldquo;Save Changes&rdquo; to apply.</p>
      )}
    </div>
  );
}
