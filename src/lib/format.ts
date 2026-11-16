const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits inside any string/number to Persian digits. */
export function faDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

const priceFmt = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 });

/** «۱٬۴۹۰٬۰۰۰ تومان» style formatting for Toman prices. */
export function faPrice(value: number): string {
  return priceFmt.format(value);
}

/** Zero-padded latin editorial index, e.g. 3 -> "03". */
export function ediIndex(n: number): string {
  return String(n).padStart(2, "0");
}

/** Persian zero-padded index, e.g. 3 -> «۰۳». */
export function faIndex(n: number): string {
  return faDigits(String(n).padStart(2, "0"));
}

export function discountPercent(price: number, compareAt: number): number {
  return Math.round(((compareAt - price) / compareAt) * 100);
}
