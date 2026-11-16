"use client";

import { ArrowUpLeft, Plus } from "lucide-react";
import { editorPicks } from "@/data/products";
import { faDigits, faPrice } from "@/lib/format";
import { openQuickView, openSearch } from "@/lib/store";
import { Reveal, RevealImg } from "@/components/reveal";

/**
 * SECTION 09 — «انتخاب سردبیر»
 * A magazine spread: dominant photography, overlapping type panel,
 * and a ledger of hand-placed products.
 */
export function EditorialCurated() {
  return (
    <section
      id="editorial"
      aria-label="انتخاب سردبیر"
      className="scroll-mt-24 overflow-hidden py-20 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1720px] grid-cols-1 gap-10 px-[4vw] lg:grid-cols-12 lg:gap-0 lg:px-[2.5vw]">
        {/* dominant photograph (start side) */}
        <div className="relative lg:col-span-7 lg:col-start-1">
          <RevealImg
            src="/images/editorial.jpg"
            alt="مدل نشسته بر سکوی سنگی با ست کرم — تصویر کمپین انتخاب سردبیر"
            className="aspect-[4/5] w-full bg-stone lg:aspect-auto lg:h-[880px]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 start-6 select-none font-latin text-[120px] font-black leading-none text-outline opacity-30 lg:text-[160px]"
          >
            ۰۸
          </span>
          <span className="vertical-text micro-label absolute -end-2 top-24 hidden origin-center rotate-180 text-taupe lg:block">
            CURATED EDIT — WEEK {faDigits(12)}
          </span>
        </div>

        {/* overlapping text panel (end side) */}
        <Reveal className="relative z-10 lg:col-span-6 lg:col-start-7 lg:self-end">
          <div className="border border-ink/10 bg-ivory p-7 lg:-mt-40 lg:p-12">
            <p className="micro-label text-wine">EDITOR'S PICK</p>
            <h2 className="mt-4 text-[clamp(30px,3.6vw,54px)] font-extrabold leading-[1.18]">
              ترکیب‌هایی که
              <br />
              این هفته را می‌سازند
            </h2>
            <p className="mt-5 max-w-[420px] text-[13.5px] leading-8 text-taupe-2">
              هر هفته تیم استایل نُوا چند قطعه را کنار هم می‌چیند؛ نه بر اساس الگوریتم،
              بلکه با چشمی که بافت، رنگ و فرم را می‌شناسد. این سه انتخابِ فصل جاری‌اند.
            </p>

            <ul className="mt-8">
              {editorPicks.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => openQuickView(p.id)}
                    className="group flex w-full items-center gap-4 border-t border-ink/10 py-4 text-start transition-colors hover:bg-stone/50"
                  >
                    <span className="font-latin text-[10px] tracking-[0.3em] text-taupe">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={p.img}
                      alt={p.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-[68px] w-[54px] object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold">{p.name}</span>
                      <span className="mt-1 block text-[12px] tabular-nums text-taupe-2">
                        {faPrice(p.price)} تومان
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 transition-all duration-300 group-hover:border-wine group-hover:bg-wine group-hover:text-ivory">
                      <Plus className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openSearch("")}
              className="group mt-6 inline-flex items-center gap-2.5 text-[13px] font-semibold text-wine"
            >
              <span className="link-line">دیدن همه انتخاب‌ها</span>
              <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" strokeWidth={1.8} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
