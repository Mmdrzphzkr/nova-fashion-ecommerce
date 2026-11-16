import { ArrowLeft } from "lucide-react";
import { newArrivals } from "@/data/products";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

/**
 * SECTION 04 — «تازه از راه رسیده‌اند»
 * Staggered cascade grid: each column sits at a different altitude.
 */
export function NewArrivals() {
  const offsets = ["lg:mt-0", "lg:mt-20", "lg:mt-8", "lg:mt-28"];
  const ratios = ["aspect-[3/4]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]"];

  return (
    <section
      id="new"
      aria-label="جدیدترین محصولات"
      className="scroll-mt-24 border-y border-ink/10 bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1720px] px-[4vw] lg:px-[2.5vw]">
        <SectionHeading
          index={3}
          latin="NEW ARRIVALS — JUST LANDED"
          title="تازه از راه رسیده‌اند"
          sub="انتخاب‌های تازه برای استایل امروز"
          aside={
            <a
              href="#categories"
              className="group inline-flex items-center gap-2.5 border border-ink/15 px-6 py-3 text-[12.5px] font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
            >
              مشاهده همه دسته‌ها
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={1.6}
              />
            </a>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className={offsets[i]}>
              <ProductCard product={p} ratio={ratios[i]} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
