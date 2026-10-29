"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: "letters" | "words";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  initialY?: number;
  initialOpacity?: number;
  animateY?: number;
  animateOpacity?: number;
}
export default function AnimatedText({ text, className = "", animationType = "words", duration = .6, delay = 0, staggerDelay = .05, initialY = 10, initialOpacity = 0, animateY = 0, animateOpacity = 1 }: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .15 });
  const reduced = useReducedMotion();
  let index = 0;
  const count = animationType === "letters" ? Array.from(text).length : text.split(/\s+/).length;
  const stagger = Math.min(staggerDelay, .55 / Math.max(count, 1));
  return <span ref={ref} className={`animated-heading ${className}`}><span className="sr-only">{text}</span>
    {text.split(/(\s+)/).map((word, wordIndex) => /^\s+$/.test(word) ? <span key={wordIndex} aria-hidden="true">{word}</span> :
      <span className="animated-heading-word" key={wordIndex} aria-hidden="true">{(animationType === "letters" ? Array.from(word) : [word]).map((part, partIndex) => {
        const order = index++;
        return <motion.span key={partIndex} className="animated-heading-part" initial={false}
          animate={visible && !reduced ? { y: [initialY, animateY], opacity: [initialOpacity, animateOpacity] } : { y: 0, opacity: 1 }}
          transition={{ duration: reduced ? 0 : duration, delay: delay + order * stagger, ease: "easeOut" }}>{part}</motion.span>;
      })}</span>)}
  </span>;
}
