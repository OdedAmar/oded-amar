/**
 * Thin Blob wrapper.
 * When BLOB_READ_WRITE_TOKEN is set, delegates to @vercel/blob.
 * Otherwise returns a no-op stub so the app runs locally without credentials.
 */

export async function uploadBlob(
  filename: string,
  body: ArrayBuffer,
  contentType: string
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.warn("[blob] BLOB_READ_WRITE_TOKEN not set — skipping upload, returning placeholder URL");
    return `/assets/images/${filename}`;
  }
  const { put } = await import("@vercel/blob");
  const result = await put(filename, body, {
    access: "public",
    contentType,
    token,
  });
  return result.url;
}
