import { NextResponse } from "next/server";
import { products } from "@/data/products";

export function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim();
  const pool = q
    ? products.filter(
        (p) =>
          p.name.includes(q) ||
          p.category.includes(q) ||
          (p.fabric?.includes(q) ?? false)
      )
    : products;

  return NextResponse.json(
    pool.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      price: p.price,
      compareAt: p.compareAt,
      tag: p.tag,
      img: p.img,
      imgAlt: p.imgAlt,
    }))
  );
}
