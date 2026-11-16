import { ArrowLeft } from "lucide-react";
import { ParallaxImg, Reveal } from "@/components/reveal";

const TICKER = ["SIMPLICITY", "BOLDER THAN EVER", "NOĀ STUDIO", "FW CAMPAIGN", "TEHRAN"];

function Marquee() {
  const row = (
    <>
      {Array.from({ length: 5 }).flatMap((_, r) =>
        TICKER.map((t) => (
          <span key={`${r}-${t}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="micro-label text-ivory/60">{t}</span>
            <span className="h-1 w-1 rounded-full bg-wine-2" />
          </span>
        ))
      )}
    </>
  );
  return (
    <div dir="ltr" className="overflow-hidden border-b border-ivory/10 py-3" aria-hidden>
      <div className="animate-marquee flex w-max gap-8">
        <div className="flex gap-8">{row}</div>
        <div className="flex gap-8">{row}</div>
      </div>
    </div>
  );
}

/**
 * SECTION 05 — campaign statement.
 * Full-bleed dark spread: parallax photography + oversized outline typography.
 */
export function Campaign() {
  return (
    <section
      id="campaign"
      aria-label="کمپین فصل"
      className="scroll-mt-24 bg-ink text-ivory"
    >
      <Marquee />
      <div className="relative flex min-h-[88svh] items-center overflow-hidden">
        {/* parallax image occupying the end side */}
        <div className="absolute inset-y-0 end-0 w-full md:w-[58%]">
          <ParallaxImg
            src="/images/campaign.jpg"
            alt="سایه‌نمای مدل با پالتو شرابی در نور نمایشی"
            className="h-full w-full opacity-70 md:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/40 to-transparent md:bg-gradient-to-r md:from-ink md:via-ink/55 md:to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1720px] px-[4vw] py-24 lg:px-[2.5vw]">
          <Reveal>
            <p className="micro-label text-ivory/60">CAMPAIGN — NOĀ ATELIER</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-6 max-w-[12ch] text-[clamp(44px,7.5vw,124px)] font-black leading-[1.1] tracking-tight">
              سادگی،
              <br />
              <span className="text-outline-ivory font-extrabold">جسورانه‌تر از همیشه</span>
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[400px] text-[14.5px] leading-8 text-ivory/70">
              کمد لباسی که کمتر می‌گوید و بیشتر نشان می‌دهد؛
              فرم‌های پاک، رنگ‌های عمیق و سکوتی که جلب توجه می‌کند.
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <a
              href="#offers"
              className="group mt-10 inline-flex items-center gap-3 border border-ivory/35 px-8 py-4 text-[13px] font-medium transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-ink"
            >
              مشاهده انتخاب‌ها
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5"
                strokeWidth={1.6}
              />
            </a>
          </Reveal>
        </div>

        {/* index ghost */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-8 end-[3vw] hidden select-none font-latin text-[11px] tracking-[0.5em] text-ivory/40 md:block"
        >
          04 / STATEMENT
        </span>
      </div>
    </section>
  );
}
