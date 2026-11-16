import { Mail, Send } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { faDigits } from "@/lib/format";

const SHOP_LINKS = [
  { label: "جدیدترین‌ها", href: "#new" },
  { label: "دسته‌بندی‌ها", href: "#categories" },
  { label: "انتخاب‌های ویژه", href: "#offers" },
  { label: "موجودی محدود", href: "#limited" },
  { label: "پرفروش‌ترین‌ها", href: "#bestsellers" },
];

const SERVICE_LINKS = [
  { label: "راهنمای ارسال", href: "#info" },
  { label: "تعویض و مرجوع", href: "#info" },
  { label: "پرداخت امن", href: "#info" },
  { label: "پشتیبانی", href: "#info" },
];

/** SECTION 12 — signature footer. */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory" aria-label="پانوشت">
      {/* wordmark + newsletter */}
      <div className="mx-auto max-w-[1720px] px-[4vw] pb-14 pt-20 lg:px-[2.5vw] lg:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-12">
          <div>
            <p className="micro-label text-ivory/50">NOĀ — HOUSE OF CONTEMPORARY WOMENSWEAR</p>
            <p className="mt-2 text-[clamp(96px,17vw,270px)] font-black leading-[0.9] tracking-tight">
              نُوا
              <span className="text-wine-2">.</span>
            </p>
          </div>
          <div className="w-full max-w-[400px] pb-4">
            <h3 className="text-[22px] font-bold">خبرنامه نُوا</h3>
            <p className="mb-5 mt-2 text-[13px] leading-7 text-ivory/60">
              اولین نفر از کالکشن‌های تازه، انتخاب‌های سردبیر و موجودی‌های محدود باخبر شوید.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* link columns */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto grid max-w-[1720px] grid-cols-2 gap-x-6 gap-y-12 px-[4vw] py-14 sm:grid-cols-4 lg:px-[2.5vw] lg:py-20">
          <div className="col-span-2 sm:col-span-1">
            <p className="micro-label text-ivory/45">ABOUT</p>
            <p className="mt-5 max-w-[260px] text-[13px] leading-8 text-ivory/70">
              نُوا خانه مدِ معاصر زنانه است؛ جایی که هر فصل، روایتی تازه از فرم،
              بافت و رنگ نوشته می‌شود. این یک متن معرفی جایگزین است.
            </p>
          </div>

          <nav aria-label="پیوندهای فروشگاه">
            <p className="micro-label text-ivory/45">SHOP</p>
            <ul className="mt-5 space-y-3.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-line text-[13.5px] text-ivory/80 hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="خدمات مشتریان">
            <p className="micro-label text-ivory/45">CARE</p>
            <ul className="mt-5 space-y-3.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-line text-[13.5px] text-ivory/80 hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="micro-label text-ivory/45">CONTACT</p>
            <p className="mt-5 text-[13.5px] leading-8 text-ivory/70">
              استودیو نُوا — تهران
              <br />
              نشانی دقیق و تلفن استودیو
              <br />
              به‌زودی در این بخش درج می‌شود.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام"
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 transition-colors hover:border-wine-2 hover:bg-wine"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="تلگرام"
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 transition-colors hover:border-wine-2 hover:bg-wine"
              >
                <Send className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:hello@noa.example"
                aria-label="ایمیل"
                className="flex h-11 w-11 items-center justify-center border border-ivory/20 transition-colors hover:border-wine-2 hover:bg-wine"
              >
                <Mail className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* legal bar */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1720px] flex-wrap items-center justify-between gap-4 px-[4vw] py-6 lg:px-[2.5vw]">
          <p className="text-[11.5px] text-ivory/50">
            © {faDigits(1404)} نُوا — تمامی حقوق این وب‌سایت محفوظ است.
          </p>
          <p className="micro-label text-ivory/40">DESIGNED IN TEHRAN</p>
          <div className="flex gap-6 text-[11.5px] text-ivory/60">
            <a href="#info" className="link-line hover:text-ivory">
              حریم خصوصی
            </a>
            <a href="#info" className="link-line hover:text-ivory">
              شرایط استفاده
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
