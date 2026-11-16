"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { byId, type Product } from "@/data/products";
import { discountPercent, faDigits, faPrice } from "@/lib/format";
import {
  addToCart,
  clearCart,
  closeOverlay,
  consumePresetQuery,
  openQuickView,
  pushToast,
  setQty,
  signIn,
  signOut,
  toggleWish,
  useCartLines,
  useOverlay,
  usePhone,
  useQuickViewId,
  useToasts,
  useWishIds,
} from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CommerceOverlays() {
  const overlay = useOverlay();
  const quickView = useQuickViewId();
  const anyOpen = overlay !== "none" || quickView !== null;

  useEffect(() => {
    document.documentElement.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [anyOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        openQuickView(null);
        closeOverlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SearchOverlay open={overlay === "search"} />
      <Drawer open={overlay === "cart"} />
      <AccountDialog open={overlay === "account"} />
      <QuickView id={quickView} />
      <ToastHost />
    </>
  );
}

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label="بستن"
      onClick={onClick}
      className="fixed inset-0 z-[70] cursor-default bg-ink/55 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

/* ================================ SEARCH ================================ */

function SearchOverlay({ open }: { open: boolean }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const preset = consumePresetQuery();
    setQ(preset);
    setResults([]);
    if (!preset) {
      // browse-all mode: load the full catalogue
      fetch("/api/search?q=").then(async (r) => setResults(await r.json())).catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        setResults(await res.json());
      } catch {
        setResults([]);
      } finally {
        setBusy(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] flex flex-col bg-ivory"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: EASE }}
          role="dialog"
          aria-label="جستجو"
        >
          <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between px-[4vw] py-6 lg:px-[2.5vw]">
            <span className="micro-label text-taupe">SEARCH — نُوا</span>
            <button
              type="button"
              aria-label="بستن جستجو"
              onClick={() => closeOverlay()}
              className="flex h-11 w-11 items-center justify-center border border-ink/15 transition-colors hover:bg-ink hover:text-ivory"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mx-auto w-full max-w-[1720px] flex-1 overflow-y-auto px-[4vw] pb-16 lg:px-[2.5vw]">
            <div className="flex items-center gap-4 border-b-2 border-ink pb-4">
              <Search className="h-6 w-6 shrink-0 text-taupe" strokeWidth={1.5} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="نام محصول، دسته یا کالکشن…"
                className="w-full bg-transparent text-[clamp(22px,4vw,44px)] font-bold outline-none placeholder:text-taupe/60"
                aria-label="عبارت جستجو"
              />
            </div>

            {!q.trim() && (
              <div className="mt-10">
                <p className="micro-label text-taupe">POPULAR</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {["شومیز", "پالتو", "شلوار", "ست لباس", "روسری", "مانتو"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setQ(t)}
                      className="border border-ink/15 px-4 py-2 text-[13px] transition-colors hover:border-wine hover:text-wine"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.trim() && (
              <div className="mt-8">
                <p className="micro-label text-taupe">
                  {busy ? "SEARCHING…" : `${faDigits(results.length)} RESULTS`}
                </p>
                {!busy && results.length === 0 && (
                  <p className="mt-6 text-[15px] text-taupe-2">
                    چیزی پیدا نشد؛ عبارت کوتاه‌تری را امتحان کنید.
                  </p>
                )}
                <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        className="group block w-full text-start"
                        onClick={() => {
                          closeOverlay();
                          openQuickView(p.id);
                        }}
                      >
                        <span className="block aspect-[3/4] overflow-hidden bg-stone">
                          <img
                            src={p.img}
                            alt={p.imgAlt}
                            loading="lazy"
                            className="img-zoom h-full w-full object-cover"
                          />
                        </span>
                        <span className="mt-3 block text-[13px] font-medium group-hover:text-wine">
                          {p.name}
                        </span>
                        <span className="mt-1 block text-[12px] tabular-nums text-taupe-2">
                          {faPrice(p.price)} تومان
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================ CART / WISHLIST ============================ */

function Drawer({ open }: { open: boolean }) {
  const [tab, setTab] = useState<"cart" | "wish">("cart");
  const [done, setDone] = useState(false);
  const cart = useCartLines();
  const wish = useWishIds();

  const total = cart.reduce((sum, l) => sum + byId(l.id).price * l.qty, 0);

  useEffect(() => {
    if (open) setDone(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={() => closeOverlay()} />
          <motion.aside
            className="fixed bottom-0 left-0 top-0 z-[80] flex w-full max-w-[440px] flex-col bg-ivory shadow-[-24px_0_80px_rgba(23,23,23,0.12)]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            role="dialog"
            aria-label="سبد خرید و علاقه‌مندی‌ها"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setTab("cart")}
                  data-active={tab === "cart"}
                  className="link-line text-[14px] font-semibold"
                >
                  سبد خرید {cart.length > 0 && `(${faDigits(cart.length)})`}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("wish")}
                  data-active={tab === "wish"}
                  className="link-line text-[14px] font-semibold"
                >
                  علاقه‌مندی‌ها {wish.length > 0 && `(${faDigits(wish.length)})`}
                </button>
              </div>
              <button
                type="button"
                aria-label="بستن"
                onClick={() => closeOverlay()}
                className="flex h-10 w-10 items-center justify-center transition-colors hover:text-wine"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {done ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-wine/30 text-wine">
                  <Check className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <p className="text-lg font-bold">سفارش آزمایشی شما ثبت شد</p>
                <p className="text-[13px] leading-6 text-taupe-2">
                  این یک پیش‌نمایش طراحی است؛ در نسخه نهایی به درگاه پرداخت متصل می‌شوید.
                </p>
                <button
                  type="button"
                  onClick={() => closeOverlay()}
                  className="mt-2 bg-ink px-8 py-3 text-[13px] font-medium text-ivory transition-colors hover:bg-wine"
                >
                  ادامه خرید
                </button>
              </div>
            ) : tab === "cart" ? (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {cart.length === 0 ? (
                    <EmptyState
                      icon={<ShoppingBag className="h-6 w-6" strokeWidth={1.4} />}
                      text="سبد خرید شما خالی است"
                    />
                  ) : (
                    <ul className="divide-y divide-ink/8">
                      {cart.map((l) => {
                        const p = byId(l.id);
                        return (
                          <li key={l.id} className="flex gap-4 py-5">
                            <img
                              src={p.img}
                              alt={p.imgAlt}
                              className="h-28 w-[84px] shrink-0 object-cover"
                            />
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-[13.5px] font-medium leading-snug">{p.name}</p>
                                  <p className="micro-label mt-1 text-taupe">{p.category}</p>
                                </div>
                                <button
                                  type="button"
                                  aria-label="حذف از سبد"
                                  onClick={() => setQty(l.id, 0)}
                                  className="text-taupe transition-colors hover:text-wine"
                                >
                                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                </button>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3">
                                <div className="flex items-center border border-ink/15">
                                  <button
                                    type="button"
                                    aria-label="افزایش تعداد"
                                    onClick={() => setQty(l.id, l.qty + 1)}
                                    className="flex h-8 w-8 items-center justify-center hover:bg-stone"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="w-8 text-center text-[13px] tabular-nums">
                                    {faDigits(l.qty)}
                                  </span>
                                  <button
                                    type="button"
                                    aria-label="کاهش تعداد"
                                    onClick={() => setQty(l.id, l.qty - 1)}
                                    className="flex h-8 w-8 items-center justify-center hover:bg-stone"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <span className="text-[13.5px] font-semibold tabular-nums">
                                  {faPrice(p.price * l.qty)} تومان
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="border-t border-ink/10 px-6 py-5">
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-taupe-2">جمع سبد</span>
                      <span className="text-[16px] font-bold tabular-nums">
                        {faPrice(total)} تومان
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setDone(true);
                      }}
                      className="group mt-4 flex w-full items-center justify-center gap-2 bg-wine py-3.5 text-[13.5px] font-medium text-ivory transition-colors hover:bg-wine-2"
                    >
                      تکمیل خرید
                      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.6} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-6">
                {wish.length === 0 ? (
                  <EmptyState
                    icon={<Heart className="h-6 w-6" strokeWidth={1.4} />}
                    text="هنوز محصولی را نشان نکرده‌اید"
                  />
                ) : (
                  <ul className="divide-y divide-ink/8">
                    {wish.map((id) => {
                      const p = byId(id);
                      return (
                        <li key={id} className="flex gap-4 py-5">
                          <img
                            src={p.img}
                            alt={p.imgAlt}
                            className="h-24 w-[72px] shrink-0 cursor-pointer object-cover"
                            onClick={() => {
                              closeOverlay();
                              openQuickView(id);
                            }}
                          />
                          <div className="flex flex-1 flex-col">
                            <p className="text-[13.5px] font-medium leading-snug">{p.name}</p>
                            <p className="mt-1 text-[12.5px] tabular-nums text-taupe-2">
                              {faPrice(p.price)} تومان
                            </p>
                            <div className="mt-auto flex items-center gap-4 pt-2 text-[12px]">
                              <button
                                type="button"
                                onClick={() => {
                                  addToCart(id);
                                  toggleWish(id);
                                  pushToast("به سبد خرید منتقل شد");
                                }}
                                className="font-medium text-wine hover:underline"
                              >
                                انتقال به سبد
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleWish(id)}
                                className="text-taupe hover:text-ink"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-taupe">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/10">
        {icon}
      </span>
      <p className="text-[13.5px]">{text}</p>
    </div>
  );
}

/* ================================ ACCOUNT ================================ */

function AccountDialog({ open }: { open: boolean }) {
  const phone = usePhone();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setValue("");
      setError("");
    }
  }, [open]);

  const valid = /^09\d{9}$/.test(value.trim());

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={() => closeOverlay()} />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[85] w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 bg-ivory p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="dialog"
            aria-label="حساب کاربری"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="micro-label text-taupe">ACCOUNT</p>
                <h3 className="mt-2 text-xl font-bold">
                  {phone ? "حساب من" : "ورود به نُوا"}
                </h3>
              </div>
              <button
                type="button"
                aria-label="بستن"
                onClick={() => closeOverlay()}
                className="flex h-9 w-9 items-center justify-center transition-colors hover:text-wine"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            {phone ? (
              <div className="mt-6">
                <p className="text-[14px] leading-7 text-taupe-2">
                  با شماره <span className="font-semibold tabular-nums text-ink">{faDigits(phone)}</span> وارد
                  شده‌اید.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    pushToast("از حساب خارج شدید");
                  }}
                  className="mt-6 w-full border border-ink/20 py-3 text-[13px] font-medium transition-colors hover:border-wine hover:text-wine"
                >
                  خروج از حساب
                </button>
              </div>
            ) : (
              <form
                className="mt-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!valid) {
                    setError("شماره همراه را کامل وارد کنید؛ مثلاً 0912…");
                    return;
                  }
                  signIn(value.trim());
                  pushToast("خوش آمدید؛ ورود ثبت شد");
                }}
              >
                <label htmlFor="phone" className="micro-label text-taupe">
                  MOBILE
                </label>
                <input
                  id="phone"
                  inputMode="numeric"
                  dir="ltr"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError("");
                  }}
                  placeholder="09 — — — — — — — — —"
                  className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-left text-[15px] tracking-[0.2em] outline-none transition-colors focus:border-wine"
                />
                {error && <p className="mt-2 text-[12px] text-wine">{error}</p>}
                <p className="mt-3 text-[11.5px] leading-5 text-taupe">
                  ورود آزمایشی است و هیچ پیامکی ارسال نمی‌شود.
                </p>
                <button
                  type="submit"
                  className="mt-5 w-full bg-ink py-3.5 text-[13.5px] font-medium text-ivory transition-colors hover:bg-wine"
                >
                  ورود
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* =============================== QUICK VIEW =============================== */

function QuickView({ id }: { id: string | null }) {
  const product = id ? byId(id) : null;
  const [color, setColor] = useState(0);

  useEffect(() => {
    setColor(0);
  }, [id]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <Backdrop onClick={() => openQuickView(null)} />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[90] grid max-h-[88vh] w-[min(94vw,880px)] -translate-x-1/2 -translate-y-1/2 grid-cols-1 overflow-y-auto bg-ivory md:grid-cols-2"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            role="dialog"
            aria-label={`مشاهده سریع ${product.name}`}
          >
            <div className="relative min-h-[320px] bg-stone">
              <img
                src={product.img}
                alt={product.imgAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {product.tag === "sale" && product.compareAt && (
                <span className="absolute start-4 top-4 bg-wine px-2.5 py-1.5 text-[11px] font-medium text-ivory">
                  ٪{faDigits(discountPercent(product.price, product.compareAt))}− تخفیف
                </span>
              )}
            </div>
            <div className="relative flex flex-col p-7 md:p-9">
              <button
                type="button"
                aria-label="بستن"
                onClick={() => openQuickView(null)}
                className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center transition-colors hover:text-wine"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
              <p className="micro-label text-taupe">{product.category}</p>
              <h3 className="mt-2 pe-8 text-[22px] font-bold leading-snug">{product.name}</h3>
              <p className="mt-2 text-[12.5px] text-taupe-2">
                {product.fabric ? `جنس: ${product.fabric}` : "پارچه درجه یک"}
              </p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-[20px] font-bold tabular-nums">
                  {faPrice(product.price)}
                  <span className="ms-1.5 text-[12px] font-normal text-taupe-2">تومان</span>
                </span>
                {product.compareAt && (
                  <span className="text-[13px] tabular-nums text-taupe line-through">
                    {faPrice(product.compareAt)}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <p className="micro-label text-taupe">COLOR</p>
                <div className="mt-2.5 flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`رنگ ${faDigits(i + 1)}`}
                      onClick={() => setColor(i)}
                      className={`h-7 w-7 rounded-full border-2 transition-all ${
                        color === i ? "border-wine p-0.5" : "border-ink/15"
                      }`}
                    >
                      <span
                        className="block h-full w-full rounded-full"
                        style={{ backgroundColor: c }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {product.tag === "limited" && product.stock != null && (
                <p className="mt-5 flex items-center gap-2 text-[12.5px] font-medium text-wine">
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-wine" />
                  تنها {faDigits(product.stock)} عدد در انبار باقی مانده
                </p>
              )}

              <div className="mt-auto flex gap-3 pt-7">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product.id);
                    pushToast("به سبد خرید اضافه شد");
                    openQuickView(null);
                  }}
                  className="group flex flex-1 items-center justify-center gap-2 bg-ink py-3.5 text-[13.5px] font-medium text-ivory transition-colors hover:bg-wine"
                >
                  افزودن به سبد خرید
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.6} />
                </button>
                <WishButton id={product.id} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function WishButton({ id }: { id: string }) {
  const wished = useWishIds().includes(id);
  return (
    <button
      type="button"
      aria-label="علاقه‌مندی"
      onClick={() => {
        const added = toggleWish(id);
        pushToast(added ? "به علاقه‌مندی‌ها اضافه شد" : "حذف شد");
      }}
      className={`flex h-[50px] w-[50px] items-center justify-center border transition-colors ${
        wished ? "border-wine bg-wine text-ivory" : "border-ink/20 hover:border-wine hover:text-wine"
      }`}
    >
      <Heart className="h-4.5 w-4.5" strokeWidth={1.6} fill={wished ? "currentColor" : "none"} />
    </button>
  );
}

/* ================================ TOASTS ================================ */

function ToastHost() {
  const toasts = useToasts();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-2.5 bg-ink px-5 py-3 text-[12.5px] font-medium text-ivory shadow-[0_16px_40px_rgba(23,23,23,0.25)]"
          >
            <Check className="h-3.5 w-3.5 text-stone" strokeWidth={2} />
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
