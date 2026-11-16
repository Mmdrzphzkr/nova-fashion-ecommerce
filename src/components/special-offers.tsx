"use client";

import { ArrowLeft } from "lucide-react";
import { specialOffers } from "@/data/products";
import { discountPercent, faDigits, faPrice } from "@/lib/format";
import { openQuickView } from "@/lib/store";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

/**
 * SECTION 06 — «انتخاب‌های ویژه»
 * Sticky burgundy spotlight banner + asymmetric discount grid.
 */
export function SpecialOffers() {
  const [spot, ...rest] = specialOffers;
  const pct = spot.compareAt ? discountPercent(spot.price, spot.compareAt) : 0;

  return (
    <section
      id="offers"
      aria-label="پیشنهادهای ویژه"
      className="scroll-mt-24 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1720px] px-[4vw] lg:px-[2.5vw]">
        <SectionHeading
          index={5}
          latin="SELECTED OFFERS"
          title="انتخاب‌های ویژه"
          sub="قیمت‌های استثنایی برای برگزیده‌های فصل"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* burgundy spotlight */}
          <Reveal className="lg:col-span-4">
            <div className="group lg:sticky lg:top-28">
              <button
                type="button"
                onClick={() => openQuickView(spot.id)}
                className="relative block aspect-[4/5] w-full overflow-hidden text-start"
                aria-label={`مشاهده ${spot.name}`}
              >
                <img
                  src={spot.img}
                  alt={spot.imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-wine via-wine/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-ivory">
                  <span>
                    <span className="micro-label text-ivory/70">EDITORIAL DEAL</span>
                    <span className="mt-1 block text-[20px] font-bold">{spot.name}</span>
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center border border-ivory/40 transition-colors duration-300 group-hover:bg-ivory group-hover:text-wine">
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                </span>
              </button>
              <div className="flex items-stretch justify-between bg-wine px-6 py-5 text-ivory">
                <span className="flex items-baseline gap-2">
                  <span className="text-[34px] font-black tabular-nums leading-none">
                    ٪{faDigits(pct)}−
                  </span>
                  <span className="text-[11px] text-ivory/70">تخفیف ویژه</span>
                </span>
                <span className="flex flex-col items-end justify-center">
                  <span className="text-[15px] font-bold tabular-nums">
                    {faPrice(spot.price)} تومان
                  </span>
                  <span className="text-[11.5px] tabular-nums text-ivory/60 line-through">
                    {spot.compareAt ? `${faPrice(spot.compareAt)} تومان` : ""}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* asymmetric discount grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:col-span-8 lg:grid-cols-4 lg:gap-x-8">
            <Reveal className="lg:col-span-2 lg:mt-14">
              <ProductCard product={rest[0]} />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2">
              <ProductCard product={rest[1]} />
            </Reveal>
            <Reveal delay={0.15} className="col-span-2 lg:-mt-6">
              <ProductCard product={rest[2]} ratio="aspect-[16/10] lg:aspect-[21/10]" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
