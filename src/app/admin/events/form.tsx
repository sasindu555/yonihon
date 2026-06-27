"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/lib/use-session";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploader from "@/components/ImageUploader";
interface Props { id?: string }

const emptyEvent: Record<string, unknown> = {
  title: "",
  slug: "",
  excerpt: "",
  description: "",
  heroImage: "",
  images: [] as string[],
  startDate: "",
  endDate: "",
  location: "",
  area: "",
  prefecture: "Tokyo",
  category: "Cultural Events",
  tags: [""],
  admission: "Free",
  bestFor: "",
  goodFor: "English, Families",
  nearestStation: "",
  officialSite: "",
  whyPeopleLoveIt: "",
  tipsForVisitors: [""],
  highlightTitle: "",
};

const inputClass =
  "w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600";

export default function EventForm({ id }: Props) {
  const router = useRouter();
  const session = useAdminSession();
  const isSupport = session?.role === "support";
  const [form, setForm] = useState(emptyEvent);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/events/${id}`).then((r) => r.json()).then((d) => { setForm(d); setLoading(false); });
  }, [id]);

  function set<K extends keyof typeof emptyEvent>(key: K, value: (typeof emptyEvent)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSupport) return;
    setSaving(true);
    const body = {
      ...form,
      tags: (form.tags as string[]).filter(Boolean),
      tipsForVisitors: (form.tipsForVisitors as string[]).filter(Boolean),
      images: (form.images as string[]).filter(Boolean),
    };
    await fetch(id ? `/api/events/${id}` : "/api/events", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    router.push("/admin/events");
    router.refresh();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900">{id ? "Edit Event" : "New Event"}</h1>
        {isSupport ? (
          <span className="text-xs text-zinc-500">Read-only view</span>
        ) : (
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
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
          <select value={form.category as string} onChange={(e) => set("category", e.target.value)} className={inputClass}>
            {["Cultural Events", "Festivals", "Fireworks", "Flowers", "Nature", "Seasonal Events"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <Label>Excerpt</Label>
          <textarea value={form.excerpt as string} onChange={(e) => set("excerpt", e.target.value)} className={inputClass} rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label>Description</Label>
          <RichTextEditor value={form.description as string} onChange={(v) => set("description", v)} placeholder="Describe the event..." />
        </div>
      </Section>

      <Section title="Date & Location">
        <div>
          <Label>Start Date</Label>
          <input value={form.startDate as string} onChange={(e) => set("startDate", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>End Date</Label>
          <input value={form.endDate as string} onChange={(e) => set("endDate", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Location</Label>
          <input value={form.location as string} onChange={(e) => set("location", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Area</Label>
          <input value={form.area as string} onChange={(e) => set("area", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Prefecture</Label>
          <input value={form.prefecture as string} onChange={(e) => set("prefecture", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Nearest Station</Label>
          <input value={form.nearestStation as string} onChange={(e) => set("nearestStation", e.target.value)} className={inputClass} />
        </div>
      </Section>

      <Section title="Details">
        <div>
          <Label>Admission</Label>
          <input value={form.admission as string} onChange={(e) => set("admission", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Best For</Label>
          <input value={form.bestFor as string} onChange={(e) => set("bestFor", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Good For</Label>
          <input value={form.goodFor as string} onChange={(e) => set("goodFor", e.target.value)} className={inputClass} />
        </div>
        <div>
          <Label>Official Site URL</Label>
          <input value={form.officialSite as string} onChange={(e) => set("officialSite", e.target.value)} className={inputClass} />
        </div>
      </Section>

      <Section title="Content">
        <div className="md:col-span-2">
          <Label>Hero Image</Label>
          <ImageUploader value={form.heroImage as string} onChange={(v) => set("heroImage", v)} label="Hero Image" />
        </div>
        <div className="md:col-span-2">
          <Label>Event Gallery</Label>
          <GalleryUploader
            images={form.images as string[]}
            onChange={(v) => set("images", v)}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Highlight Title</Label>
          <input value={form.highlightTitle as string} onChange={(e) => set("highlightTitle", e.target.value)} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <Label>Why People Love It</Label>
          <textarea value={form.whyPeopleLoveIt as string} onChange={(e) => set("whyPeopleLoveIt", e.target.value)} className={inputClass} rows={3} />
        </div>
        <div className="md:col-span-2">
          <Label>Tips for Visitors (one per line)</Label>
          <textarea value={(form.tipsForVisitors as string[]).join("\n")} onChange={(e) => set("tipsForVisitors", e.target.value.split("\n"))} className={inputClass} rows={3} />
        </div>
        <div className="md:col-span-2">
          <Label>Tags (one per line)</Label>
          <textarea value={(form.tags as string[]).join("\n")} onChange={(e) => set("tags", e.target.value.split("\n"))} className={inputClass} rows={3} />
        </div>
      </Section>
      </div>
    </form>
  );
}

function GalleryUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Upload failed");
        return;
      }
      const data = await res.json();
      onChange([...images, data.url]);
    } catch (e) {
      console.error("Upload error:", e);
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
    setFailedImages((prev) => { const next = new Set(prev); next.delete(idx); return next; });
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        onChange={handleUpload}
        className="hidden"
      />
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-zinc-200">
              {failedImages.has(i) ? (
                <div className="w-full h-24 bg-zinc-50 flex items-center justify-center">
                  <span className="text-xs text-zinc-400">Failed to load</span>
                </div>
              ) : (
                <img
                  src={url}
                  alt=""
                  className="w-full h-24 object-cover bg-zinc-100"
                  onError={() => setFailedImages((prev) => { const next = new Set(prev); next.add(i); return next; })}
                />
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-sm border border-dashed border-zinc-300 rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 transition-colors w-full"
      >
        {uploading ? "Uploading..." : "+ Add Image"}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
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
