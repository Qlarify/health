"use client";

import { useState } from "react";
import type { StageVideo } from "@/content/specialties";

export function VideoCarousel({
  videos,
  brand,
}: {
  videos: readonly StageVideo[];
  brand: string;
}) {
  const [active, setActive] = useState(0);
  const v = videos[active];

  return (
    <div>
      {/* Stage pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {videos.map((vid, i) => (
          <button
            key={vid.youtubeId}
            onClick={() => setActive(i)}
            className={[
              "font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border transition-colors duration-200",
              i === active
                ? "bg-ink text-paper border-ink"
                : "border-line text-muted hover:border-ink hover:text-ink",
            ].join(" ")}
          >
            {vid.stageLabel}
          </button>
        ))}
      </div>

      {/* Video */}
      <div className="aspect-video w-full rounded-[16px] overflow-hidden border border-line bg-surface">
        <iframe
          key={v.youtubeId}
          src={`https://www.youtube.com/embed/${v.youtubeId}`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full h-full"
        />
      </div>

      {/* Meta + nav */}
      <div className="flex items-start justify-between gap-6 mt-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage mb-1">
            Stage {String(active + 1).padStart(2, "0")} · {v.stageLabel}
          </div>
          <p className="text-[15px] leading-[1.5] text-ink font-medium mb-1">
            {v.title}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {brand}
          </p>
        </div>
        <div className="flex gap-2 shrink-0 mt-1">
          <button
            onClick={() => setActive((active - 1 + videos.length) % videos.length)}
            aria-label="Previous stage"
            className="w-9 h-9 flex items-center justify-center border border-line rounded-full text-muted hover:border-ink hover:text-ink transition-colors duration-200 font-mono text-[13px]"
          >
            ←
          </button>
          <button
            onClick={() => setActive((active + 1) % videos.length)}
            aria-label="Next stage"
            className="w-9 h-9 flex items-center justify-center border border-line rounded-full text-muted hover:border-ink hover:text-ink transition-colors duration-200 font-mono text-[13px]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
