"use client";

import { useEffect, useState } from "react";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  lastLogin: string | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor", active: true });

  function load() {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => { setUsers(data); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setForm({ name: "", email: "", password: "", role: "editor", active: true });
    setEditId(null);
    setShowForm(false);
  }

  async function handleSave() {
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/users/${editId}` : "/api/users";
    if (!editId && !form.password) return alert("Password is required for new users");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...rest } = form;
    const body = editId && !form.password ? rest : { ...rest, password: form.password };
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to save");
      return;
    }
    resetForm();
    load();
  }

  async function handleEdit(user: UserRow) {
    setForm({ name: user.name, email: user.email, password: "", role: user.role, active: user.active });
    setEditId(user.id);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Users</h1>
          <p className="text-sm text-zinc-500">Manage admin accounts and roles.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          + New User
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6 max-w-lg space-y-4">
          <h2 className="font-semibold text-zinc-900">{editId ? "Edit User" : "New User"}</h2>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              Password {editId && "(leave blank to keep current)"}
            </label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm">
              <option value="super_admin">Super Admin</option>
              <option value="editor">Editor</option>
              <option value="support">Support</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Active
          </label>
          <div className="flex gap-2">
            <button onClick={handleSave}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Save
            </button>
            <button onClick={resetForm}
              className="border border-zinc-300 text-zinc-700 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-zinc-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden md:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700">Role</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-700 hidden sm:table-cell">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-900">{user.name}</td>
                <td className="px-4 py-3 text-zinc-600 hidden md:table-cell text-xs">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    user.role === "super_admin" ? "bg-red-100 text-red-800" :
                    user.role === "editor" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`text-xs ${user.active ? "text-green-600" : "text-zinc-400"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(user)}
                    className="text-primary hover:underline text-xs font-semibold mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline text-xs font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
