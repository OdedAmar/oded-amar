import { NextRequest, NextResponse } from "next/server";
import { uploadBlob } from "@/lib/blob";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "File too large (max 5MB)" },
      { status: 400 }
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const url = await uploadBlob(filename, buffer, file.type);
  return NextResponse.json({ url });
}
