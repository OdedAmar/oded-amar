import { NextRequest, NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import type { Lead } from "@/types/content";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: { handled?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const key = `lead:${id}`;
  const lead = await kv.get<Lead>(key);
  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated: Lead = { ...lead, handled: body.handled ?? lead.handled };
  await kv.set(key, updated);
  return NextResponse.json(updated);
}
