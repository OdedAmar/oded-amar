import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession, SESSION_COOKIE, cookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || body.password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await signSession();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, cookieOptions());

  return NextResponse.json({ ok: true });
}
