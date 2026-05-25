import { kv } from "./kv";
import { defaultContent } from "./defaultContent";
import type { SiteContent } from "@/types/content";

const CONTENT_KEY = "site:content";

export async function getContent(): Promise<SiteContent> {
  try {
    const stored = await kv.get<SiteContent>(CONTENT_KEY);
    if (stored) return stored;
  } catch {
    // If KV is unavailable, use default content
  }
  return defaultContent;
}

export async function setContent(content: SiteContent): Promise<void> {
  await kv.set(CONTENT_KEY, content);
}
