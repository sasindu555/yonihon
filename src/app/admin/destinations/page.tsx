"use client";

import { useEffect, useState, FormEvent } from "react";
import type { Destination } from "@/lib/types";
import { useAdminSession } from "@/lib/use-session";

export default function AdminDestinationsPage() {
  const session = useAdminSession();
  const perms = session?.permissions || [];
  const canWrite = perms.includes("destinations:write");
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");

  function load() {
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const res = await fetch("/api/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), slug }),
    });
    if (res.ok) {
      setNewName("");
      load();
    }
  }

  async function handleRemove(slug: string) {
    if (!confirm("Remove this destination?")) return;
    await fetch("/api/destinations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([slug]),
    });
    load();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-zinc-900 mb-1">Destinations</h1>
      <p className="text-sm text-zinc-500 mb-6">Manage destination locations used across the site.</p>

      {canWrite && (
      <form onSubmit={handleAdd} className="flex gap-2 mb-6 max-w-md">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New destination name"
          className="flex-1 border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold">
          Add
        </button>
      </form>
      )}

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Slug</th>
              <th className="text-right px-4 py-3 font-semibold text-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map((item) => (
              <tr key={item.slug} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-900">{item.name}</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">{item.slug}</td>
                <td className="px-4 py-3 text-right">
                  {canWrite ? (
                    <button onClick={() => handleRemove(item.slug)} className="text-red-500 hover:underline text-xs font-semibold">Remove</button>
                  ) : (
                    <span className="text-xs text-zinc-400">View only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
