"use client";

import { ArrowUpLeft } from "lucide-react";
import { limitedStock } from "@/data/products";
import { faDigits, faIndex, faPrice } from "@/lib/format";
import { openQuickView } from "@/lib/store";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * SECTION 07 — «آخرین فرصت انتخاب»
 * Stock index: an editorial ledger of genuinely scarce pieces.
 */
export function LimitedStock() {
  return (
    <section
      id="limited"
      aria-label="موجودی محدود"
      className="scroll-mt-24 border-y border-ink/10 bg-stone py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1720px] px-[4vw] lg:px-[2.5vw]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                index={6}
                latin="ALMOST GONE"
                title="آخرین فرصت انتخاب"
                sub="قطعاتی اندک؛ بدون شارژ مجدد"
              />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-[300px] text-[13px] leading-7 text-taupe-2">
                  موجودی این فهرست مستقیماً از انبار خوانده می‌شود و با فروش هر قطعه،
                  شماره‌ها کمتر می‌شوند.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {limitedStock.map((p, i) => (
                <li key={p.id}>
                  <Reveal delay={i * 0.08}>
                    <StockRow product={p} index={i} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StockRow({
  product,
  index,
}: {
  product: (typeof limitedStock)[number];
  index: number;
}) {
  const stock = product.stock ?? 1;
  const fill = Math.min(100, (stock / 10) * 100);
  return (
    <button
      type="button"
      onClick={() => openQuickView(product.id)}
      className="group grid w-full grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-ink/15 py-5 text-start transition-colors duration-300 first:border-t hover:bg-ivory/50 sm:grid-cols-[48px_88px_1fr_auto] sm:gap-6"
      aria-label={`مشاهده ${product.name}`}
    >
      <span className="hidden font-latin text-[11px] tracking-[0.3em] text-taupe sm:block">
        {faIndex(index + 1)}
      </span>

      <span className="relative h-full min-h-20 w-16 overflow-hidden bg-ivory sm:w-[88px]">
        <img
          src={product.img}
          alt={product.imgAlt}
          loading="lazy"
          decoding="async"
          className="img-zoom absolute inset-0 h-full w-full object-cover"
        />
      </span>

      <span className="min-w-0">
        <span className="block truncate text-[15px] font-semibold sm:text-[18px]">
          {product.name}
        </span>
        <span className="micro-label mt-1.5 block text-taupe">{product.category}</span>
        <span className="mt-3 flex items-center gap-3">
          <span className="h-[3px] w-20 overflow-hidden bg-ink/10 sm:w-28">
            <span
              className="block h-full bg-wine transition-all duration-700"
              style={{ width: `${fill}%` }}
            />
          </span>
          <span className="text-[11px] font-medium text-wine">
            تنها {faDigits(stock)} عدد مانده
          </span>
        </span>
      </span>

      <span className="flex flex-col items-end gap-2">
        <span className="text-[13px] font-bold tabular-nums sm:text-[15px]">
          {faPrice(product.price)}
          <span className="ms-1 hidden text-[10px] font-normal text-taupe-2 sm:inline">تومان</span>
        </span>
        <span className="flex h-9 w-9 items-center justify-center border border-ink/15 transition-all duration-300 group-hover:border-wine group-hover:bg-wine group-hover:text-ivory">
          <ArrowUpLeft className="h-4 w-4" strokeWidth={1.6} />
        </span>
      </span>
    </button>
  );
}
