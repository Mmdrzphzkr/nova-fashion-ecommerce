"use client";

import { ArrowLeft } from "lucide-react";
import { faDigits } from "@/lib/format";
import { openSearch } from "@/lib/store";
import { ParallaxImg, Reveal } from "@/components/reveal";

/**
 * SECTION 10 — seasonal collection.
 * Full-bleed cinematic frame; coordinates + quiet typography.
 */
export function Seasonal() {
  return (
    <section
      id="seasonal"
      aria-label="کالکشن فصل"
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink text-ivory"
    >
      <ParallaxImg
        src="/images/seasonal.jpg"
        alt="زنی با پالتو شتری در میدان سنگی غروب — کالکشن پاییزه نُوا"
        className="absolute inset-0 h-full w-full"
        speed={0.16}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/30" />

      {/* coordinates */}
      <span className="absolute end-[4vw] top-24 micro-label text-ivory/60 lg:end-[2.5vw]" aria-hidden>
        {faDigits("35.69")}° N — TEHRAN
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-[4vw] pb-20 pt-40 lg:px-[2.5vw] lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div>
            <Reveal>
              <p className="micro-label flex items-center gap-3 text-ivory/70">
                <span className="h-px w-10 bg-ivory/50" />
                SEASONAL — AUTUMN {faDigits(1404)}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-[clamp(40px,6.4vw,104px)] font-black leading-[1.1] tracking-tight">
                فصل تازه،
                <br />
                روایت <span className="text-outline-ivory">تازه</span>
              </h2>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 max-w-[440px] text-[14px] leading-8 text-ivory/75">
                پاییز نُوا درباره لایه‌هاست؛ پالتویی که سایه‌ات را بلندتر می‌کند و
                روسری‌ای که رنگ رست را به چهره برمی‌گرداند.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <button
              type="button"
              onClick={() => openSearch("پالتو")}
              className="group inline-flex items-center gap-3 bg-ivory px-8 py-4 text-[13px] font-semibold text-ink transition-colors duration-300 hover:bg-wine hover:text-ivory"
            >
              کشف کالکشن پاییزه
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
