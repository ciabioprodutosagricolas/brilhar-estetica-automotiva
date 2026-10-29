"use client";

import { useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { ShaderMount } from "@paper-design/shaders";

type Props = { children: ReactNode; className?: string } & ((AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }));
export function LiquidMetalButton({ children, className = "", ...props }: Props) {
  const surface = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let mount: ShaderMount | undefined;
    let cancelled = false;
    let inView = false;
    let loading = false;
    const update = async () => {
      if (preference.matches) { mount?.dispose(); mount = undefined; return; }
      if (!inView || document.hidden) { mount?.setSpeed(0); return; }
      if (mount) { mount.setSpeed(.6); return; }
      if (loading) return;
      loading = true;
      try {
        const { ShaderMount, liquidMetalFragmentShader } = await import("@paper-design/shaders");
        if (cancelled || preference.matches || !inView) return;
        mount = new ShaderMount(element, liquidMetalFragmentShader, {
          u_colorBack: [0.04, .15, .15, 1], u_colorTint: [.2, .95, .8, 1],
          u_repetition: 4, u_softness: .5, u_shiftRed: .1, u_shiftBlue: .1, u_distortion: 0, u_contour: 0,
          u_angle: 45, u_scale: 8, u_shape: 1, u_offsetX: .1, u_offsetY: -.1,
        }, { alpha: true }, .6, 0, 1, 100000);
      } catch { element.replaceChildren(); } finally { loading = false; }
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; void update(); });
    observer.observe(element);
    const refresh = () => { void update(); };
    preference.addEventListener("change", refresh); document.addEventListener("visibilitychange", refresh);
    return () => { cancelled = true; observer.disconnect(); preference.removeEventListener("change", refresh); document.removeEventListener("visibilitychange", refresh); mount?.dispose(); };
  }, []);
  const content = <><span className="metal-shader" ref={surface} aria-hidden="true" /><span className="metal-label">{children}</span></>;
  return "href" in props && props.href ? <a {...props as AnchorHTMLAttributes<HTMLAnchorElement>} className={`liquid-metal-button ${className}`}>{content}</a> : <button {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={`liquid-metal-button ${className}`}>{content}</button>;
}
