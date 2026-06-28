"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/lib/use-session";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploader from "@/components/ImageUploader";
interface Props { id?: string }

const emptyGuide: Record<string, unknown> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Travel Planning",
  categorySlug: "travel-planning",
  image: "",
  author: "Yonihon",
  date: "",
  readTime: "",
  featured: false,
  tableOfContents: [] as { title: string; anchor: string }[],
};

const inputClass =
  "w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600";

const categoryOptions = [
  { name: "Food & Restaurants", slug: "food-restaurants" },
  { name: "Hidden Gems", slug: "hidden-gems" },
  { name: "Japanese Culture", slug: "japanese-culture" },
  { name: "Things to Do in Japan", slug: "things-to-do-in-japan" },
  { name: "Tokyo Travel Guide", slug: "tokyo-travel-guide" },
  { name: "Travel Planning", slug: "travel-planning" },
  { name: "Travel Tips", slug: "travel-tips" },
  { name: "Unique Experiences", slug: "unique-experiences" },
];

export default function GuideForm({ id }: Props) {
  const router = useRouter();
  const session = useAdminSession();
  const isSupport = session?.role === "support";
  const [form, setForm] = useState(emptyGuide);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/guides/${id}`).then((r) => r.json()).then((d) => { setForm(d as Record<string, unknown>); setLoading(false); });
  }, [id]);

  function set<K extends keyof typeof emptyGuide>(key: K, value: (typeof emptyGuide)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function handleCategoryChange(name: string) {
    const cat = categoryOptions.find((c) => c.name === name);
    set("category", name);
    set("categorySlug", cat?.slug || "");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSupport) return;
    setSaving(true);
    await fetch(id ? `/api/guides/${id}` : "/api/guides", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    router.push("/admin/guides");
    router.refresh();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900">{id ? "Edit Guide" : "New Guide"}</h1>
        {isSupport ? (
          <span className="text-xs text-zinc-500">Read-only view</span>
        ) : (
          <button type="submit" disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      <div className={isSupport ? "pointer-events-none opacity-80" : ""}>
      <Section title="Basic Info">
        <div className="md:col-span-2">
          <Label>Title *</Label>
          <input required value={form.title as string} onChange={(e) => set("title", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Slug</Label>
          <input value={form.slug as string} onChange={(e) => set("slug", e.target.value)} className={inputClass} placeholder="auto" />
        </div>
        <div>
          <Label>Category</Label>
          <select value={form.category as string} onChange={(e) => handleCategoryChange(e.target.value)} className={inputClass}>
            {categoryOptions.map((c) => <option key={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <Label>Excerpt</Label>
          <textarea value={form.excerpt as string} onChange={(e) => set("excerpt", e.target.value)} className={inputClass} rows={2} />
        </div>
      </Section>

      <Section title="Meta">
        <div>
          <Label>Author</Label>
          <input value={form.author as string} onChange={(e) => set("author", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Date</Label>
          <input value={form.date as string} onChange={(e) => set("date", e.target.value)} className={inputClass} placeholder="e.g. June 23, 2026" />
        </div>
        <div>
          <Label>Read Time</Label>
          <input value={form.readTime as string} onChange={(e) => set("readTime", e.target.value)} className={inputClass} placeholder="e.g. 10 min read" />
        </div>
        <div className="md:col-span-2">
          <Label>Image</Label>
          <ImageUploader value={form.image as string} onChange={(v) => set("image", v)} label="Guide Image" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured as boolean} onChange={(e) => set("featured", e.target.checked)} />
            Featured
          </label>
        </div>
      </Section>

      <Section title="Content">
        <div className="md:col-span-2">
          <RichTextEditor value={form.content as string} onChange={(v) => set("content", v)} placeholder="Start writing..." />
        </div>
      </Section>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-zinc-600 mb-1">{children}</label>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
      <h2 className="font-semibold text-zinc-900">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
