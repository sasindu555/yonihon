"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setLightboxOpen(true);
            }}
            className="aspect-square rounded-lg overflow-hidden relative"
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 text-white text-3xl hover:text-zinc-300"
            aria-label="Previous image"
          >
            &lsaquo;
          </button>
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1200}
            height={900}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex + 1) % images.length);
            }}
            className="absolute right-4 text-white text-3xl hover:text-zinc-300"
            aria-label="Next image"
          >
            &rsaquo;
          </button>
          <div className="absolute bottom-4 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
