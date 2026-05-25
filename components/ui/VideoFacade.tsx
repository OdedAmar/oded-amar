"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  youtubeId: string;
  title: string;
}

export default function VideoFacade({ youtubeId, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (loaded) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-turquoise"
      aria-label={`הפעל וידאו: ${title}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/30 transition-colors" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-brand-turquoise/90 group-hover:bg-brand-turquoise flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-2xl shadow-brand-turquoise/30">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-brand-black ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* YouTube branding */}
      <div className="absolute bottom-4 left-4 text-brand-gray/60 text-xs">
        YouTube
      </div>
    </button>
  );
}
