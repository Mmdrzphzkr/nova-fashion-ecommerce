"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { faDigits } from "@/lib/format";

const EASE = [0.16, 1, 0.3, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="معرفی کالکشن"
    >
      {/* ghost latin wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[2vw] left-0 select-none font-latin text-[26vw] font-black leading-none tracking-tighter text-outline opacity-[0.06]"
      >
        NOĀ
      </div>

      <div className="relative mx-auto grid w-full max-w-[1720px] flex-1 grid-cols-1 items-center gap-y-10 px-[4vw] pb-20 pt-10 lg:grid-cols-12 lg:gap-0 lg:px-[2.5vw] lg:pb-0 lg:pt-0">
        {/* ---- typography column ---- */}
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-ink" />
            <span className="micro-label text-ink/70">FW {faDigits(1404)} — NEW COLLECTION</span>
          </motion.div>

          <h1 className="text-[clamp(42px,7.2vw,116px)] font-black leading-[1.12] tracking-tight">
            <Line delay={0.25}>
              <span className="font-extralight">فراتر از یک انتخاب،</span>
            </Line>
            <Line delay={0.38}>
              <span className="text-wine">امضای استایل تو</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-7 max-w-[420px] text-[15px] leading-8 text-taupe-2 lg:text-[16px]"
          >
            برای روزهایی که استایل، بخشی از شخصیت توست؛ کالکشنی
            از فرم‌های مینیمال، پارچه‌های باوقار و جزئیاتی که دیده می‌شوند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <a
              href="#new"
              className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[13.5px] font-medium text-ivory transition-colors duration-300 hover:bg-wine"
            >
              کشف کالکشن
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5"
                strokeWidth={1.6}
              />
            </a>
            <a href="#categories" className="link-line text-[13px] font-medium">
              دنیای استایل
            </a>
          </motion.div>

          {/* vertical editorial note */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="vertical-text micro-label absolute -end-2 top-1/2 hidden origin-center -translate-y-1/2 rotate-180 text-taupe xl:block"
            aria-hidden
          >
            EDITORIAL — {faDigits(1404)}
          </motion.span>
        </motion.div>

        {/* ---- image column ---- */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
            className="relative ms-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden lg:me-[6%] lg:ms-auto"
          >
            <motion.img
              src="/images/hero.jpg"
              alt="مدل با مانتوی بلند کرم در حیاط معماری بتنی — کمپین نُوا"
              className="h-[112%] w-full object-cover"
              style={{ y: imgY, scale: 1.05 }}
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>

          {/* offset architectural frame */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="pointer-events-none absolute inset-y-[6%] end-[4%] hidden w-[44%] border border-ink/20 lg:block"
          />

          {/* floating campaign card */}
          <motion.a
            href="#seasonal"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="group absolute -bottom-6 start-[2%] flex max-w-[280px] items-center gap-4 border border-ink/10 bg-ivory/90 p-4 backdrop-blur-md lg:-bottom-2 lg:start-[8%]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-stone font-latin text-[11px] font-semibold text-ink">
              FW
            </span>
            <span className="text-[12px] leading-5">
              کالکشن پاییزه؛
              <br />
              <span className="text-taupe-2">روایتی از فرم‌های آرام</span>
            </span>
            <ArrowLeft className="ms-auto h-4 w-4 shrink-0 text-wine transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.6} />
          </motion.a>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <span className="micro-label text-taupe">SCROLL</span>
        <span className="block h-12 w-px overflow-hidden bg-ink/15">
          <span className="animate-scroll-line block h-full w-full bg-wine" />
        </span>
      </motion.div>
    </section>
  );
}
