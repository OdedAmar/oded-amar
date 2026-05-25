import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import type { Lead } from "@/types/content";

export async function GET() {
  try {
    const keys = await kv.keys("lead:*");
    const leads = await Promise.all(
      keys.map((k) => kv.get<Lead>(k))
    );
    const sorted = leads
      .filter((l): l is Lead => l !== null)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return NextResponse.json(sorted);
  } catch (err) {
    console.error("[leads] GET failed:", err);
    return NextResponse.json([], { status: 200 });
  }
}
