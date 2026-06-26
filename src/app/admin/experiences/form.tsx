"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/lib/use-session";
interface Props {
  id?: string;
}

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  duration: "",
  groupSize: "",
  language: "",
  experienceType: "Authentic",
  location: "",
  destination: "",
  category: "Popular",
  price: 0,
  currency: "¥",
  image: "",
  images: [] as string[],
  featured: false,
  popular: false,
  meetingPoint: "",
  cancellationPolicy: "",
  highlights: [""],
  included: [""],
  notIncluded: [""],
  itinerary: [{ title: "", description: "" }],
  hostName: "",
  hostInstagram: "",
  bookingNote: "",
};

export default function ExperienceForm({ id }: Props) {
  const router = useRouter();
  const session = useAdminSession();
  const isSupport = session?.role === "support";
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/experiences/${id}`)
      .then((r) => r.json())
      .then((data) => { setForm(data); setLoading(false); });
  }, [id]);

  function set<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSupport) return;
    setSaving(true);
    const url = isEditing ? `/api/experiences/${id}` : "/api/experiences";
    const method = isEditing ? "PUT" : "POST";
    const body = {
      ...form,
      price: Number(form.price),
      featured: Boolean(form.featured),
      popular: Boolean(form.popular),
      highlights: (form.highlights as string[]).filter(Boolean),
      included: (form.included as string[]).filter(Boolean),
      notIncluded: (form.notIncluded as string[]).filter(Boolean),
      itinerary: (form.itinerary as { title: string; description: string }[]).filter(
        (i) => i.title || i.description
      ),
      images: (form.images as string).split("\n").map((s: string) => s.trim()).filter(Boolean),
      image: (form.image as string) || ((form.images as string).split("\n")[0] || "").trim(),
    };
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    router.push("/admin/experiences");
    router.refresh();
  }

  if (loading) return <p className="text-zinc-500">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900">
          {isEditing ? "Edit Experience" : "New Experience"}
        </h1>
        {isSupport ? (
          <span className="text-xs text-zinc-500">Read-only view</span>
        ) : (
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      <div className={isSupport ? "pointer-events-none opacity-80" : ""}>
      <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Title *</Label>
            <Input value={form.title as string} onChange={(v) => set("title", v)} required />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={form.slug as string} onChange={(v) => set("slug", v)} placeholder="leave blank to auto-generate" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category as string} onChange={(v) => set("category", v)} options={["Popular", "Cultural", "Craft", "Food", "Nature"]} />
          </div>
          <div className="md:col-span-2">
            <Label>Short Description</Label>
            <textarea value={form.shortDescription as string} onChange={(e) => set("shortDescription", e.target.value)} className={inputClass} rows={2} />
          </div>
          <div className="md:col-span-2">
            <Label>Full Description</Label>
            <textarea value={form.description as string} onChange={(e) => set("description", e.target.value)} className={inputClass} rows={5} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Duration</Label>
            <Input value={form.duration as string} onChange={(v) => set("duration", v)} />
          </div>
          <div>
            <Label>Group Size</Label>
            <Input value={form.groupSize as string} onChange={(v) => set("groupSize", v)} />
          </div>
          <div>
            <Label>Language</Label>
            <Input value={form.language as string} onChange={(v) => set("language", v)} />
          </div>
          <div>
            <Label>Price (JPY)</Label>
            <Input type="number" value={String(form.price)} onChange={(v) => set("price", Number(v))} />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={form.location as string} onChange={(v) => set("location", v)} />
          </div>
          <div>
            <Label>Destination</Label>
            <Input value={form.destination as string} onChange={(v) => set("destination", v)} />
          </div>
          <div>
            <Label>Host Name</Label>
            <Input value={form.hostName as string} onChange={(v) => set("hostName", v)} />
          </div>
          <div>
            <Label>Host Instagram</Label>
            <Input value={form.hostInstagram as string} onChange={(v) => set("hostInstagram", v)} />
          </div>
          <div>
            <Label>Meeting Point</Label>
            <Input value={form.meetingPoint as string} onChange={(v) => set("meetingPoint", v)} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900">Flags</h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured as boolean} onChange={(e) => set("featured", e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.popular as boolean} onChange={(e) => set("popular", e.target.checked)} />
            Popular
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900">Images</h2>
        <div>
          <Label>Main Image URL</Label>
          <Input value={form.image as string} onChange={(v) => set("image", v)} />
        </div>
        <div>
          <Label>Gallery Images (one URL per line)</Label>
          <textarea
            value={(form.images as string[])?.join("\n") || ""}
            onChange={(e) => set("images", e.target.value.split("\n"))}
            className={inputClass}
            rows={4}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900">Lists</h2>
        <div>
          <Label>Highlights (one per line)</Label>
          <textarea value={(form.highlights as string[])?.join("\n") || ""} onChange={(e) => set("highlights", e.target.value.split("\n"))} className={inputClass} rows={3} />
        </div>
        <div>
          <Label>Included (one per line)</Label>
          <textarea value={(form.included as string[])?.join("\n") || ""} onChange={(e) => set("included", e.target.value.split("\n"))} className={inputClass} rows={3} />
        </div>
        <div>
          <Label>Not Included (one per line)</Label>
          <textarea value={(form.notIncluded as string[])?.join("\n") || ""} onChange={(e) => set("notIncluded", e.target.value.split("\n"))} className={inputClass} rows={3} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
        <h2 className="font-semibold text-zinc-900">Additional</h2>
        <div>
          <Label>Cancellation Policy</Label>
          <textarea value={form.cancellationPolicy as string} onChange={(e) => set("cancellationPolicy", e.target.value)} className={inputClass} rows={4} />
        </div>
        <div>
          <Label>Booking Note</Label>
          <textarea value={form.bookingNote as string} onChange={(e) => set("bookingNote", e.target.value)} className={inputClass} rows={3} />
        </div>
      </div>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-zinc-600 mb-1">{children}</label>;
}

const inputClass =
  "w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function Input({
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className={inputClass + (disabled ? " bg-zinc-100 text-zinc-500 cursor-not-allowed" : "")}
    />
  );
}

function Select({
  value,
  onChange,
  options,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}
      className={inputClass + (disabled ? " bg-zinc-100 text-zinc-500 cursor-not-allowed" : "")}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
