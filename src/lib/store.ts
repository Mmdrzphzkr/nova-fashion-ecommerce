"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Overlay = "none" | "cart" | "search" | "menu" | "account";

export interface CartLine {
  id: string;
  qty: number;
}

interface State {
  wish: string[];
  cart: CartLine[];
  overlay: Overlay;
  quickView: string | null;
  phone: string | null;
  toasts: { id: number; msg: string }[];
}

const EMPTY_ARR: string[] = [];
const EMPTY_CART: CartLine[] = [];
const EMPTY_TOASTS: { id: number; msg: string }[] = [];

let state: State = {
  wish: EMPTY_ARR,
  cart: EMPTY_CART,
  overlay: "none",
  quickView: null,
  phone: null,
  toasts: EMPTY_TOASTS,
};

const listeners = new Set<() => void>();
let inited = false;

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(
      "noa-store",
      JSON.stringify({ wish: state.wish, cart: state.cart, phone: state.phone })
    );
  } catch {
    /* storage unavailable */
  }
}

function ensureInit() {
  if (inited || typeof window === "undefined") return;
  inited = true;
  try {
    const raw = localStorage.getItem("noa-store");
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        ...state,
        wish: Array.isArray(parsed.wish) ? parsed.wish : EMPTY_ARR,
        cart: Array.isArray(parsed.cart) ? parsed.cart : EMPTY_CART,
        phone: typeof parsed.phone === "string" ? parsed.phone : null,
      };
    }
  } catch {
    /* ignore */
  }
}

function subscribe(cb: () => void) {
  ensureInit();
  listeners.add(cb);
  emit();
  return () => listeners.delete(cb);
}

/* ---------------- actions ---------------- */

export function toggleWish(id: string) {
  const has = state.wish.includes(id);
  state = {
    ...state,
    wish: has ? state.wish.filter((w) => w !== id) : [...state.wish, id],
  };
  persist();
  emit();
  return !has;
}

export function addToCart(id: string, qty = 1) {
  const line = state.cart.find((l) => l.id === id);
  const cart = line
    ? state.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(9, l.qty + qty) } : l))
    : [...state.cart, { id, qty }];
  state = { ...state, cart };
  persist();
  emit();
}

export function setQty(id: string, qty: number) {
  const cart =
    qty <= 0
      ? state.cart.filter((l) => l.id !== id)
      : state.cart.map((l) => (l.id === id ? { ...l, qty } : l));
  state = { ...state, cart };
  persist();
  emit();
}

export function clearCart() {
  state = { ...state, cart: EMPTY_CART };
  persist();
  emit();
}

export function openOverlay(overlay: Overlay) {
  state = { ...state, overlay };
  emit();
}

let presetQuery = "";

/** Open the search overlay pre-filled with a query (e.g. from a category tile). */
export function openSearch(q = "") {
  presetQuery = q;
  state = { ...state, overlay: "search" };
  emit();
}

export function consumePresetQuery() {
  const q = presetQuery;
  presetQuery = "";
  return q;
}

export function closeOverlay() {
  state = { ...state, overlay: "none" };
  emit();
}

export function openQuickView(id: string | null) {
  state = { ...state, quickView: id };
  emit();
}

export function signIn(phone: string) {
  state = { ...state, phone, overlay: "none" };
  persist();
  emit();
}

export function signOut() {
  state = { ...state, phone: null };
  persist();
  emit();
}

let toastSeq = 0;
export function pushToast(msg: string) {
  const t = { id: ++toastSeq, msg };
  state = { ...state, toasts: [...state.toasts, t] };
  emit();
  setTimeout(() => {
    state = { ...state, toasts: state.toasts.filter((x) => x.id !== t.id) };
    emit();
  }, 2600);
}

/* ---------------- hooks ---------------- */

export function useWishCount() {
  return useSyncExternalStore(subscribe, () => state.wish.length, () => 0);
}

export function useWished(id: string) {
  return useSyncExternalStore(
    subscribe,
    () => state.wish.includes(id),
    () => false
  );
}

export function useCartCount() {
  return useSyncExternalStore(
    subscribe,
    () => state.cart.reduce((n, l) => n + l.qty, 0),
    () => 0
  );
}

export function useCartLines(): CartLine[] {
  return useSyncExternalStore(subscribe, () => state.cart, () => EMPTY_CART);
}

export function useWishIds(): string[] {
  return useSyncExternalStore(subscribe, () => state.wish, () => EMPTY_ARR);
}

export function useOverlay(): Overlay {
  return useSyncExternalStore(subscribe, () => state.overlay, () => "none");
}

export function useQuickViewId(): string | null {
  return useSyncExternalStore(subscribe, () => state.quickView, () => null);
}

export function usePhone(): string | null {
  return useSyncExternalStore(subscribe, () => state.phone, () => null);
}

export function useToasts() {
  return useSyncExternalStore(subscribe, () => state.toasts, () => EMPTY_TOASTS);
}

/* lock body scroll while overlays are open */
export function useOverlayLock(open: boolean) {
  const cb = useCallback(() => {
    if (typeof document === "undefined") return () => {};
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (open) el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
  }, [open]);
  return cb;
}
