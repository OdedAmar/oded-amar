/**
 * Session helpers using HMAC-SHA256 via Web Crypto API.
 * Cookie value format: base64(payload):base64(signature)
 * payload = JSON { sub: "admin", iat: timestamp }
 */

export const SESSION_COOKIE = "oded_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "dev-insecure-secret";
}

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(): Promise<string> {
  const payload = JSON.stringify({ sub: "admin", iat: Date.now() });
  const b64Payload = Buffer.from(payload).toString("base64url");
  const key = await getKey(getSecret());
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(b64Payload)
  );
  const b64Sig = Buffer.from(sig).toString("base64url");
  return `${b64Payload}.${b64Sig}`;
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [b64Payload, b64Sig] = parts;
  try {
    const key = await getKey(getSecret());
    const sigBytes = Buffer.from(b64Sig, "base64url");
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(b64Payload)
    );
    if (!valid) return false;
    const payload = JSON.parse(Buffer.from(b64Payload, "base64url").toString());
    const age = (Date.now() - payload.iat) / 1000;
    return age < MAX_AGE;
  } catch {
    return false;
  }
}

export function cookieOptions(maxAge = MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}
