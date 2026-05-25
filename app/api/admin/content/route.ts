import { NextRequest, NextResponse } from "next/server";
import { getContent, setContent } from "@/lib/content";
import type { SiteContent } from "@/types/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  let body: SiteContent;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  await setContent(body);
  return NextResponse.json({ ok: true });
}
