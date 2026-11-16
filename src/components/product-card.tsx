"use client";

import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { discountPercent, faDigits, faPrice } from "@/lib/format";
import {
  addToCart,
  openQuickView,
  pushToast,
  toggleWish,
  useWished,
} from "@/lib/store";

const TAG_LABEL: Record<string, string> = {
  new: "تازه رسیده",
  bestseller: "پرفروش",
  limited: "موجودی محدود",
};

export function ProductCard({
  product,
  priority = false,
  ratio = "aspect-[3/4]",
}: {
  product: Product;
  priority?: boolean;
  ratio?: string;
}) {
  const wished = useWished(product.id);
  const pct =
    product.compareAt != null
      ? discountPercent(product.price, product.compareAt)
      : null;

  const tagLabel =
    product.tag === "sale" && pct
      ? `٪${faDigits(pct)}−`
      : product.tag
        ? TAG_LABEL[product.tag]
        : null;

  return (
    <article className="group relative flex flex-col">
      {/* ---------- media ---------- */}
      <div
        className={`relative ${ratio} cursor-pointer overflow-hidden bg-stone`}
        onClick={() => openQuickView(product.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter") openQuickView(product.id);
        }}
        role="button"
        tabIndex={0}
        aria-label={`مشاهده سریع ${product.name}`}
      >
        <img
          src={product.img}
          alt={product.imgAlt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="img-zoom absolute inset-0 h-full w-full object-cover"
        />
        {product.hover && (
          <img
            src={product.hover}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        )}

        {/* badge */}
        {tagLabel && (
          <span
            className={`absolute start-3 top-3 px-2 py-1 text-[10px] font-medium tracking-wide ${
              product.tag === "sale"
                ? "bg-wine text-ivory"
                : product.tag === "limited"
                  ? "bg-ink text-ivory"
                  : "bg-ivory/90 text-ink backdrop-blur-sm"
            }`}
          >
            {tagLabel}
          </span>
        )}

        {/* wishlist */}
        <button
          type="button"
          aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          onClick={(e) => {
            e.stopPropagation();
            const added = toggleWish(product.id);
            pushToast(added ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد");
          }}
          className={`absolute end-3 top-3 flex h-9 w-9 items-center justify-center border border-ink/10 transition-all duration-300 ${
            wished
              ? "bg-wine text-ivory"
              : "bg-ivory/85 text-ink backdrop-blur-sm hover:bg-ink hover:text-ivory"
          }`}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.6}
            fill={wished ? "currentColor" : "none"}
          />
        </button>

        {/* quick add — reveals on hover (desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id);
            pushToast("به سبد خرید اضافه شد");
          }}
          className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-center gap-2 bg-ink/95 py-3 text-[12px] font-medium text-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 md:flex"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
          افزودن به سبد
        </button>
      </div>

      {/* ---------- meta ---------- */}
      <div className="flex flex-col gap-1.5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="micro-label text-taupe">{product.category}</span>
          <div className="flex items-center gap-1.5" aria-hidden>
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c}
                className="h-2.5 w-2.5 rounded-full border border-ink/15"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="self-start text-start"
        >
          <h3 className="text-[15px] font-medium leading-snug transition-colors duration-300 group-hover:text-wine">
            {product.name}
          </h3>
        </button>

        <div className="flex items-baseline gap-2.5">
          <span className="text-[15px] font-semibold tabular-nums">
            {faPrice(product.price)}
            <span className="ms-1 text-[11px] font-normal text-taupe-2">تومان</span>
          </span>
          {product.compareAt != null && (
            <span className="text-[12px] tabular-nums text-taupe line-through">
              {faPrice(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
