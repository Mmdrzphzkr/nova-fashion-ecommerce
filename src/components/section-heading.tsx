import type { ReactNode } from "react";
import { faIndex } from "@/lib/format";

/** Editorial section header: numbered index + oversized Persian title. */
export function SectionHeading({
  index,
  latin,
  title,
  sub,
  dark = false,
  aside,
}: {
  index: number;
  latin: string;
  title: string;
  sub?: string;
  dark?: boolean;
  aside?: ReactNode;
}) {
  const tone = dark ? "text-ivory" : "text-ink";
  const line = dark ? "border-ivory/15" : "border-ink/15";
  return (
    <div>
      <div
        className={`flex items-center justify-between border-t ${line} pt-4`}
        aria-hidden
      >
        <span className={`micro-label ${dark ? "text-ivory/60" : "text-taupe"}`}>
          {latin}
        </span>
        <span className={`font-latin text-[11px] tabular-nums tracking-[0.3em] ${dark ? "text-ivory/60" : "text-taupe"}`}>
          {faIndex(index)} / {faIndex(10)}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 lg:mt-9">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <h2
            className={`text-[clamp(34px,4.6vw,68px)] font-extrabold leading-[1.08] tracking-tight ${tone}`}
          >
            {title}
          </h2>
          {sub && (
            <p className={`pb-2 text-[13.5px] leading-7 ${dark ? "text-ivory/60" : "text-taupe-2"}`}>
              {sub}
            </p>
          )}
        </div>
        {aside}
      </div>
    </div>
  );
}
