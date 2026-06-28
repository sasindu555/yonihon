"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const err: { error?: string } = await res.json();
        setError(err.error || "Upload failed");
        return;
      }
      const data: { url: string } = await res.json();
      setImgError(false);
      onChange(data.url);
    } catch (e) {
      console.error("Upload error:", e);
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {value && !imgError && (
        <div className="relative group rounded-lg overflow-hidden border border-zinc-200">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover bg-zinc-100"
            onError={() => setImgError(true)}
          />
          <button
            type="button"
            onClick={() => { onChange(""); setImgError(false); }}
            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remove
          </button>
        </div>
      )}
      {value && imgError && (
        <div className="relative group rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 flex items-center justify-center h-40">
          <span className="text-xs text-zinc-400">Image failed to load</span>
          <button
            type="button"
            onClick={() => { onChange(""); setImgError(false); }}
            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-sm border border-zinc-300 rounded-lg px-3 py-1.5 text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
        >
          {uploading ? "Uploading..." : value ? "Change Image" : `Upload ${label}`}
        </button>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline"
          >
            View
          </a>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
