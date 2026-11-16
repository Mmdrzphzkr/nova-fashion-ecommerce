import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "نُوا — خانه مدِ معاصر زنانه",
  description:
    "نُوا؛ تجربه‌ای تحریریه‌ای از خرید مد زنانه. کالکشن‌های معاصر، شومیز، شلوار، کت و پالتو، روسری و ست‌های لباس با روایتی مینیمال و جسورانه.",
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-ivory font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
