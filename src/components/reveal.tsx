"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Cinematic image reveal: clip-path wipe + inner slow zoom settle. */
export function RevealImg({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  eager?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{ overflow: "hidden" }}
      initial={{ clipPath: reduce ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName ?? "h-full w-full object-cover"}
        initial={reduce ? undefined : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </motion.div>
  );
}

/** Slow scroll parallax for full-bleed imagery. */
export function ParallaxImg({
  src,
  alt,
  className,
  speed = 0.12,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-[116%] w-full object-cover"
        initial={false}
        whileInView={reduce ? undefined : { y: ["-6%", "-14%"] }}
        viewport={{ once: false }}
        transition={{ ease: "linear", duration: speed * 100 }}
      />
    </div>
  );
}
