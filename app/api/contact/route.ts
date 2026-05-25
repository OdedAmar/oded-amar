import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { kv } from "@/lib/kv";
import { sendLeadEmail } from "@/lib/resend";
import { checkRateLimit } from "@/lib/rateLimit";
import type { Lead } from "@/types/content";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  eventType: z.string().min(1),
  company: z.string().optional(),
  email: z.string().optional(),
  eventDate: z.string().optional(),
  participants: z.string().optional(),
  location: z.string().optional(),
  packageInterest: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
});

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification in dev");
    return true;
  }
  if (!token) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v1/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    }
  );
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "יותר מדי פניות. נסו שוב מאוחר יותר." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "אנא מלאו את כל השדות הנדרשים." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot check
  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Turnstile verification
  const turnstileOk = await verifyTurnstile(data.turnstileToken ?? "");
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "אימות אבטחה נכשל. רעננו את הדף ונסו שוב." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    handled: false,
    fullName: data.fullName,
    phone: data.phone,
    eventType: data.eventType,
    company: data.company,
    email: data.email,
    eventDate: data.eventDate,
    participants: data.participants,
    location: data.location,
    packageInterest: data.packageInterest,
    message: data.message,
    source: "אתר",
  };

  // Save to KV
  try {
    await kv.set(`lead:${lead.id}`, lead);
  } catch (err) {
    console.error("[contact] KV save failed:", err);
  }

  // Send email
  try {
    await sendLeadEmail(lead);
  } catch (err) {
    console.error("[contact] Email send failed:", err);
  }

  // Webhook
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("[contact] Webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
