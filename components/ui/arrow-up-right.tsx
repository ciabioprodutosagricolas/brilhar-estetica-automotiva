"use client";

// Adapted from AnimateIcons / Lucide, Avijit Dey (MIT).
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
export interface ArrowUpRightIconHandle { startAnimation: () => void; stopAnimation: () => void; }
export const ArrowUpRightIcon = forwardRef<ArrowUpRightIconHandle, { size?: number; duration?: number; isAnimated?: boolean; color?: string; className?: string }>(function ArrowUpRightIcon({ size = 22, duration = 1, isAnimated = true, color, className = "" }, ref) {
  const element = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const reduced = useReducedMotion();
  useImperativeHandle(ref, () => ({ startAnimation: () => { if (!reduced && isAnimated) void controls.start("animate"); }, stopAnimation: () => { void controls.start("normal"); } }), [controls, reduced, isAnimated]);
  useEffect(() => {
    const parent = element.current?.closest("a, button");
    if (!parent) return;
    const start = () => { if (isAnimated && !reduced) void controls.start("animate"); };
    const stop = () => { void controls.start("normal"); };
    parent.addEventListener("pointerenter", start); parent.addEventListener("focus", start);
    parent.addEventListener("pointerleave", stop); parent.addEventListener("blur", stop);
    return () => { parent.removeEventListener("pointerenter", start); parent.removeEventListener("focus", start); parent.removeEventListener("pointerleave", stop); parent.removeEventListener("blur", stop); };
  }, [controls, isAnimated, reduced]);
  return <span ref={element} className={`animated-arrow ${className}`} aria-hidden="true" style={{ color }}><motion.svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial="normal" animate={controls} variants={{ normal: { x: 0, y: 0 }, animate: { x: [0, -1.5, 3, 0], y: [0, 1.5, -3, 0], transition: { duration: .6 * duration, times: [0, .2, .6, 1], ease: "easeInOut" } } }}><path d="M7 7h10v10M7 17 17 7" /></motion.svg></span>;
});
