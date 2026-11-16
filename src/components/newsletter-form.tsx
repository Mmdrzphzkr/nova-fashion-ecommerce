"use client";

import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export function NewsletterForm({ dark = true }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err" | "dup">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("err");
      return;
    }
    setState("busy");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) setState("ok");
      else if (res.status === 409) setState("dup");
      else setState("err");
    } catch {
      setState("err");
    }
  }

  if (state === "ok" || state === "dup") {
    return (
      <div className="flex items-center gap-3 border border-ivory/25 px-5 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine text-ivory">
          <Check className="h-4 w-4" strokeWidth={2} />
        </span>
        <p className="text-[13px] leading-6 text-ivory/90">
          {state === "ok"
            ? "عضویت شما ثبت شد؛ شمارش معکوس برای شماره بعدی خبرنامه آغاز شد."
            : "این نشانی قبلاً در فهرست خبرنامه ثبت شده است."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div
        className={`flex items-stretch border transition-colors ${
          state === "err" ? "border-wine-2" : dark ? "border-ivory/25 focus-within:border-ivory" : "border-ink/25 focus-within:border-ink"
        }`}
      >
        <input
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "err") setState("idle");
          }}
          placeholder="you@email.com"
          aria-label="نشانی ایمیل"
          disabled={state === "busy"}
          className={`w-full min-w-0 bg-transparent px-5 py-3.5 text-left text-[13.5px] tracking-wide outline-none disabled:opacity-50 ${
            dark ? "text-ivory placeholder:text-ivory/40" : "text-ink placeholder:text-taupe"
          }`}
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className="group flex shrink-0 items-center gap-2 bg-wine px-6 text-[12.5px] font-medium text-ivory transition-colors hover:bg-wine-2 disabled:opacity-60"
        >
          {state === "busy" ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
          ) : (
            <>
              عضویت
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.6} />
            </>
          )}
        </button>
      </div>
      {state === "err" && (
        <p className="mt-2.5 text-[11.5px] text-[#c98a96]">
          نشانی ایمیل معتبر نیست یا ثبت نام‌وفا ماند؛ دوباره تلاش کنید.
        </p>
      )}
      <p className={`mt-3 text-[11px] leading-5 ${dark ? "text-ivory/45" : "text-taupe"}`}>
        فقط خبر کالکشن‌ها و انتخاب‌های تحریریه؛ بدون مزاحمت.
      </p>
    </form>
  );
}
