"use client";

import { ArrowUpLeft } from "lucide-react";
import { categories } from "@/data/products";
import { faDigits, faIndex } from "@/lib/format";
import { openSearch } from "@/lib/store";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * SECTION 03 — «دنیای استایل»
 * Asymmetric editorial index: horizontal snap-scroll on mobile,
 * staggered 12-column collage on desktop.
 */
export function CategoryIndex() {
  return (
    <section id="categories" aria-label="دسته‌بندی‌ها" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-[1720px] px-[4vw] lg:px-[2.5vw]">
        <SectionHeading
          index={2}
          latin="THE STYLE INDEX"
          title="دنیای استایل"
          sub="هر دسته، یک فصل از روایت کمد لباس تو"
        />

        <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto no-scrollbar lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible">
          {categories.map((cat, i) => {
            const offsets = [
              "lg:col-span-5 lg:h-[520px]",
              "lg:col-span-3 lg:h-[420px] lg:mt-24",
              "lg:col-span-4 lg:h-[400px] lg:mt-40",
              "lg:col-span-4 lg:h-[440px] lg:-mt-8",
              "lg:col-span-4 lg:h-[380px] lg:mt-24",
              "lg:col-span-4 lg:h-[460px] lg:mt-8",
            ];
            return (
              <Reveal
                key={cat.id}
                delay={(i % 3) * 0.1}
                className={`w-[72vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto ${offsets[i]}`}
              >
                <button
                  type="button"
                  onClick={() => openSearch(cat.title)}
                  className="group relative block h-[340px] w-full overflow-hidden bg-stone text-start lg:h-full"
                  aria-label={`کاوش در دسته ${cat.title}`}
                >
                  <img
                    src={cat.img}
                    alt={`دسته ${cat.title}`}
                    loading="lazy"
                    decoding="async"
                    className="img-zoom absolute inset-0 h-full w-full object-cover"
                  />
                  {/* legibility veil */}
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/80" />

                  <span className="absolute end-4 top-4 border border-ivory/40 px-2 py-1 font-latin text-[10px] tracking-[0.25em] text-ivory/90">
                    {faIndex(i + 1)}
                  </span>

                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 lg:p-6">
                    <span>
                      <span className="micro-label block text-ivory/70">{cat.latin}</span>
                      <span className="mt-1.5 block text-[24px] font-bold text-ivory lg:text-[28px]">
                        {cat.title}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 translate-y-2 items-center justify-center bg-ivory text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpLeft className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </span>

                  <span className="absolute bottom-0 start-0 h-0.5 w-0 bg-wine transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                </button>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 flex items-center gap-3 text-[12px] text-taupe lg:hidden">
          <span className="h-px w-8 bg-taupe" />
          برای دیدن دسته‌ها بکشید — {faDigits(6)} دسته
        </p>
      </div>
    </section>
  );
}
