"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Experience } from "@/lib/types";
import { useAdminSession } from "@/lib/use-session";

export default function AdminExperiencesPage() {
  const session = useAdminSession();
  const perms = session?.permissions || [];
  const canWrite = perms.includes("experiences:write");
  const canDelete = perms.includes("experiences:delete");
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/experiences")
      .then((r) => r.json())
      .then((data) => { setItems(data as Experience[]); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Experiences</h1>
        {canWrite && (
          <Link
            href="/admin/experiences/new"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            + New Experience
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg border border-zinc-200 p-8 text-center text-zinc-500">
          <p>No experiences yet.</p>
          {canWrite && (
            <Link href="/admin/experiences/new" className="text-primary text-sm font-semibold hover:underline mt-2 inline-block">
              Create your first experience
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden md:table-cell">Location</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden md:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden sm:table-cell">Featured</th>
                <th className="text-right px-4 py-3 font-semibold text-zinc-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">{item.title}</td>
                  <td className="px-4 py-3 text-zinc-600 hidden md:table-cell">{item.location}</td>
                  <td className="px-4 py-3 text-zinc-600 hidden md:table-cell">
                    {item.currency}{item.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {item.featured ? <span className="text-green-600 text-xs font-semibold">Yes</span> : <span className="text-zinc-400 text-xs">No</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canWrite && (
                        <Link
                          href={`/admin/experiences/${item.id}`}
                          className="text-primary hover:underline text-xs font-semibold"
                        >
                          Edit
                        </Link>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:underline text-xs font-semibold"
                        >
                          Delete
                        </button>
                      )}
                      {!canWrite && !canDelete && (
                        <span className="text-xs text-zinc-400">View only</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
