"use client";

import { useEffect, useRef } from "react";

export function ServiceLoop({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && !reduced.matches) {
        video.muted = true;
        void video.play().catch(() => { /* Poster remains visible if autoplay is blocked. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .15 });
    observer.observe(video);
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); reduced.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); video.pause(); };
  }, []);
  return <video ref={ref} className="service-loop" src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}
