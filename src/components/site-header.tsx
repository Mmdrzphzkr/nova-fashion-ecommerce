"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { openOverlay, useCartCount, useWishCount } from "@/lib/store";
import { faDigits } from "@/lib/format";

const NAV = [
  { label: "خانه", href: "#top" },
  { label: "جدیدترین‌ها", href: "#new" },
  { label: "لباس زنانه", href: "#categories", mega: true },
  { label: "کالکشن‌ها", href: "#seasonal" },
  { label: "پیشنهادهای ویژه", href: "#offers" },
];

const MEGA_CATS = [
  "تاپ و تی‌شرت",
  "شومیز و بلوز",
  "شلوار",
  "کت",
  "مانتو و پالتو",
  "مانتو سبک",
  "روسری",
  "ست لباس",
  "کالکشن فصل",
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartCount();
  const wishCount = useWishCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-ivory/85 backdrop-blur-md"
            : "border-b border-transparent bg-ivory"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1720px] items-center justify-between gap-4 px-[4vw] transition-all duration-500 lg:px-[2.5vw] ${
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
          }`}
        >
          {/* start: burger + brand */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label="باز کردن منو"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <a href="#top" className="group flex flex-col leading-none" aria-label="نُوا — بازگشت به بالا">
              <span className="text-[26px] font-extrabold tracking-tight lg:text-[30px]">
                نُوا
              </span>
              <span className="micro-label mt-1 text-taupe transition-colors duration-300 group-hover:text-wine">
                NOĀ — TEHRAN
              </span>
            </a>
          </div>

          {/* center: nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="ناوبری اصلی">
            {NAV.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                  onFocus={() => setMega(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setMega(false);
                  }}
                >
                  <a
                    href={item.href}
                    className="link-line flex items-center gap-1.5 text-[13.5px] font-medium"
                  >
                    {item.label}
                    <span
                      className={`inline-block h-1 w-1 rounded-full bg-wine transition-transform duration-300 ${mega ? "scale-150" : "scale-0"}`}
                    />
                  </a>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="link-line text-[13.5px] font-medium"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* end: actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="جستجو"
              onClick={() => openOverlay("search")}
              className="flex h-10 w-10 items-center justify-center transition-colors hover:text-wine"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="حساب کاربری"
              onClick={() => openOverlay("account")}
              className="hidden h-10 w-10 items-center justify-center transition-colors hover:text-wine sm:flex"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="علاقه‌مندی‌ها"
              onClick={() => openOverlay("cart")}
              className="relative flex h-10 w-10 items-center justify-center transition-colors hover:text-wine"
              data-tab="wish"
              id="wish-btn"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {wishCount > 0 && (
                <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-wine px-1 text-[9px] font-bold text-ivory tabular-nums">
                  {faDigits(wishCount)}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="سبد خرید"
              onClick={() => openOverlay("cart")}
              className="relative flex h-10 w-10 items-center justify-center transition-colors hover:text-wine"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-wine px-1 text-[9px] font-bold text-ivory tabular-nums">
                  {faDigits(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
              className="absolute inset-x-0 top-full hidden border-y border-ink/10 bg-ivory lg:block"
            >
              <div className="mx-auto grid max-w-[1720px] grid-cols-12 gap-10 px-[2.5vw] py-10">
                <div className="col-span-4 border-e border-ink/10 pe-10">
                  <p className="micro-label text-taupe">CATEGORIES</p>
                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    لباس زنانه؛
                    <br />
                    از ایده تا قفسه‌تان
                  </h3>
                  <a
                    href="#categories"
                    onClick={() => setMega(false)}
                    className="link-line mt-6 inline-block text-[13px] font-medium text-wine"
                  >
                    مشاهده همه دسته‌ها
                  </a>
                </div>
                <ul className="col-span-4 columns-2 gap-8">
                  {MEGA_CATS.map((c, i) => (
                    <li key={c} className="mb-3 break-inside-avoid">
                      <a
                        href="#categories"
                        onClick={() => setMega(false)}
                        className="group flex items-baseline gap-3"
                      >
                        <span className="font-latin text-[10px] tabular-nums text-taupe">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[14px] transition-colors group-hover:text-wine">
                          {c}
                        </span>
                        <span className="h-px flex-1 bg-ink/10 transition-colors group-hover:bg-wine/40" />
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#new"
                  onClick={() => setMega(false)}
                  className="group relative col-span-4 block overflow-hidden"
                >
                  <img
                    src="https://images.pexels.com/photos/39202950/pexels-photo-39202950.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900"
                    alt="کالکشن تازه نُوا"
                    loading="lazy"
                    className="img-zoom h-56 w-full object-cover"
                  />
                  <span className="absolute bottom-3 start-3 bg-ivory/90 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm">
                    تازه‌های هفته
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink text-ivory"
            role="dialog"
            aria-label="منوی موبایل"
          >
            <div className="flex h-16 items-center justify-between px-[4vw]">
              <span className="text-[26px] font-extrabold">نُوا</span>
              <button
                type="button"
                aria-label="بستن منو"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-[6vw]" aria-label="ناوبری موبایل">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b border-ivory/10 py-4"
                >
                  <span className="font-latin text-[10px] tabular-nums text-ivory/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[30px] font-bold transition-colors group-hover:text-taupe">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="px-[6vw] pb-10">
              <div className="flex items-center justify-between border-t border-ivory/15 pt-5">
                <span className="micro-label text-ivory/50">NOĀ — WOMENSWEAR</span>
                <div className="flex gap-5 text-[12px] text-ivory/70">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-ivory">
                    اینستاگرام
                  </a>
                  <button type="button" onClick={() => { setMobileOpen(false); openOverlay("account"); }}>
                    ورود
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
