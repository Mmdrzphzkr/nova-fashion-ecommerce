import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { subscribers } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  if (
    typeof email !== "string" ||
    email.length > 320 ||
    !EMAIL_RE.test(email.trim())
  ) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  try {
    await getDb()
      .insert(subscribers)
      .values({ email: email.trim().toLowerCase() });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    // unique violation -> already subscribed
    if (typeof e === "object" && e !== null && (e as { code?: string }).code === "23505") {
      return NextResponse.json({ ok: false, reason: "duplicate" }, { status: 409 });
    }
    console.error("[newsletter] insert failed", e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
