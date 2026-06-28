"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Guide } from "@/lib/types";
import { useAdminSession } from "@/lib/use-session";

export default function AdminGuidesPage() {
  const session = useAdminSession();
  const perms = session?.permissions || [];
  const canWrite = perms.includes("guides:write");
  const canDelete = perms.includes("guides:delete");
  const [items, setItems] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/guides")
      .then((r) => r.json())
      .then((data) => { setItems(data as Guide[]); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this guide?")) return;
    await fetch(`/api/guides/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Travel Guides</h1>
        {canWrite && (
          <Link
            href="/admin/guides/new"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            + New Guide
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <div className="bg-white rounded-lg border border-zinc-200 p-8 text-center text-zinc-500">
          <p>No guides yet.</p>
          {canWrite && (
            <Link href="/admin/guides/new" className="text-emerald-600 text-sm font-semibold hover:underline mt-2 inline-block">
              Create your first guide
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden md:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-semibold text-zinc-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">{item.title}</td>
                  <td className="px-4 py-3 text-zinc-600 hidden md:table-cell">{item.category}</td>
                  <td className="px-4 py-3 text-zinc-600 hidden md:table-cell text-xs">{item.date}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canWrite && (
                        <Link href={`/admin/guides/${item.id}`} className="text-emerald-600 hover:underline text-xs font-semibold">Edit</Link>
                      )}
                      {canDelete && (
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline text-xs font-semibold">Delete</button>
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
