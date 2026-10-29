"use client";

import { useEffect, useRef } from "react";

// Accessible CSS adaptation of the Animated Shiny Text reference.
export function AnimatedText({ text, textClassName = "" }: { text: string; textClassName?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("shiny-text-visible");
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <span ref={ref} className={`animated-shiny-text ${textClassName}`}>{text}</span>;
}
