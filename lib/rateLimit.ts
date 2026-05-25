/**
 * Simple in-memory per-IP rate limiter.
 * Allows max 10 requests per hour per IP.
 * Resets on server restart (fine for a landing page).
 */

interface BucketEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, BucketEntry>();

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = buckets.get(ip);

  if (!entry || now >= entry.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0 };
  }

  entry.count++;
  return { ok: true, remaining: MAX_REQUESTS - entry.count };
}
