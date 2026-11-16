import { CreditCard, Headset, Truck, Undo2 } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const ITEMS = [
  {
    icon: Truck,
    title: "ارسال",
    latin: "SHIPPING",
    text: "جزئیات هزینه و زمان ارسال، متناسب با مقصد، در مرحله تسویه‌حساب نمایش داده می‌شود.",
  },
  {
    icon: Undo2,
    title: "تعویض و مرجوع",
    latin: "RETURNS",
    text: "شرایط بازگشت و تعویض هر کالا در صفحه محصول و فاکتور خرید به‌روشنی درج می‌شود.",
  },
  {
    icon: CreditCard,
    title: "پرداخت",
    latin: "PAYMENT",
    text: "پرداخت آنلاین از طریق درگاه بانکی امن انجام می‌شود؛ هیچ اطلاعات کارتی نزد ما نمی‌ماند.",
  },
  {
    icon: Headset,
    title: "پشتیبانی",
    latin: "SUPPORT",
    text: "تیم پشتیبانی از طریق فرم تماس و شبکه‌های اجتماعی پاسخ‌گوی پرسش‌های شماست.",
  },
];

/** SECTION 11 — service information, stated neutrally. */
export function InfoStrip() {
  return (
    <section
      id="info"
      aria-label="اطلاعات خدمات"
      className="scroll-mt-24 border-b border-ink/10 bg-cream py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1720px] px-[4vw] lg:px-[2.5vw]">
        <SectionHeading
          index={10}
          latin="SERVICE NOTES"
          title="خیالت راحت باشد"
          sub="شفاف، به‌روز و بدون ادعای بزرگ"
        />

        <div className="mt-12 grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="bg-cream">
              <div className="group flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:bg-ivory lg:p-8">
                <span className="flex h-11 w-11 items-center justify-center border border-ink/15 transition-colors duration-300 group-hover:border-wine group-hover:text-wine">
                  <item.icon className="h-[18px] w-[18px]" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="text-[15px] font-bold">{item.title}</p>
                  <p className="micro-label mt-1 text-taupe">{item.latin}</p>
                </div>
                <p className="text-[12.5px] leading-6 text-taupe-2">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group mt-6 flex flex-wrap items-center justify-between gap-4 border border-ink/10 bg-stone px-7 py-6 transition-colors duration-300 hover:bg-ink hover:text-ivory lg:px-10"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center border border-ink/15 bg-cream text-ink transition-colors duration-300 group-hover:border-ivory/30 group-hover:bg-ink group-hover:text-ivory">
                <InstagramIcon className="h-5 w-5" strokeWidth={1.4} />
              </span>
              <span>
                <span className="block text-[15px] font-bold">نُوا در اینستاگرام</span>
                <span className="mt-1 block text-[12px] text-taupe-2 transition-colors group-hover:text-ivory/70">
                  پشت‌صحنه استودیو، استایل‌های روزانه و خبرهای کالکشن
                </span>
              </span>
            </span>
            <span className="font-latin text-[13px] tracking-[0.2em] text-wine transition-colors group-hover:text-ivory">
              @NOA.TEHRAN
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
