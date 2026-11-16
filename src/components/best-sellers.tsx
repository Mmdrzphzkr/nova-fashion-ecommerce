"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { bestSellers } from "@/data/products";
import { faIndex } from "@/lib/format";
import { openSearch } from "@/lib/store";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

/**
 * SECTION 08 — «انتخاب‌های محبوب»
 * Ranked horizontal runway (RTL-aware scroll controls).
 */
export function BestSellers() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<"start" | "end" | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // In RTL, scrolling "forward" (next) moves toward negative scrollLeft.
    const amount = el.clientWidth * 0.72;
    el.scrollBy({ left: dir * -amount, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    if (pos < 8) setEdge("start");
    else if (max - pos < 8) setEdge("end");
    else setEdge(null);
  };

  return (
    <section
      id="bestsellers"
      aria-label="پرفروش‌ترین‌ها"
      className="scroll-mt-24 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1720px] px-[4vw] lg:px-[2.5vw]">
        <SectionHeading
          index={7}
          latin="MOST LOVED"
          title="انتخاب‌های محبوب"
          sub="آنچه بیش از همه در کمدها جا گرفته"
          aside={
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  aria-label="قبلی"
                  onClick={() => scrollBy(-1)}
                  disabled={edge === "start"}
                  className="flex h-11 w-11 items-center justify-center border border-ink/15 transition-all hover:bg-ink hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  aria-label="بعدی"
                  onClick={() => scrollBy(1)}
                  disabled={edge === "end"}
                  className="flex h-11 w-11 items-center justify-center border border-ink/15 transition-all hover:bg-ink hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => openSearch("")}
                className="group inline-flex items-center gap-2.5 text-[12.5px] font-medium"
              >
                <span className="link-line">کاوش در همه محصولات</span>
                <ArrowLeft className="h-4 w-4 text-wine transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.6} />
              </button>
            </div>
          }
        />

        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto lg:mt-16 lg:gap-6"
        >
          {bestSellers.map((p, i) => (
            <div
              key={p.id}
              className="relative w-[64vw] shrink-0 snap-start pt-12 sm:w-[42vw] md:w-[30vw] lg:w-[calc(25%-18px)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 start-3 z-10 select-none font-latin text-[88px] font-black leading-none text-outline opacity-40 lg:text-[104px]"
              >
                {faIndex(i + 1)}
              </span>
              <ProductCard product={p} />
            </div>
          ))}

          {/* end card */}
          <div className="flex w-[64vw] shrink-0 snap-start items-center justify-center sm:w-[42vw] md:w-[30vw] lg:w-[calc(25%-18px)]">
            <button
              type="button"
              onClick={() => openSearch("")}
              className="group flex aspect-[3/4] w-full flex-col items-center justify-center gap-4 border border-ink/15 bg-cream transition-colors hover:border-wine"
            >
              <span className="micro-label text-taupe">VIEW ALL</span>
              <span className="text-[18px] font-bold">دیدن کل کمد</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-wine group-hover:bg-wine group-hover:text-ivory">
                <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
