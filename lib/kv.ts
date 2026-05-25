/**
 * Thin KV wrapper.
 * When UPSTASH_REDIS_REST_URL is set, delegates to @upstash/redis.
 * Otherwise falls back to an in-memory Map so the app runs locally without credentials.
 */

const store = new Map<string, unknown>();

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({ url, token });
}

export const kv = {
  async get<T>(key: string): Promise<T | null> {
    const redis = await getRedis();
    if (redis) return redis.get<T>(key);
    return (store.get(key) as T) ?? null;
  },

  async set(key: string, value: unknown): Promise<void> {
    const redis = await getRedis();
    if (redis) {
      await redis.set(key, value);
      return;
    }
    store.set(key, value);
  },

  async keys(pattern: string): Promise<string[]> {
    const redis = await getRedis();
    if (redis) return redis.keys(pattern);
    const regex = new RegExp(
      "^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$"
    );
    return Array.from(store.keys()).filter((k) => regex.test(k));
  },

  async del(key: string): Promise<void> {
    const redis = await getRedis();
    if (redis) {
      await redis.del(key);
      return;
    }
    store.delete(key);
  },
};
