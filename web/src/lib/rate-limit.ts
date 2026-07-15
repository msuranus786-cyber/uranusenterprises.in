import { headers } from "next/headers";

// In-memory sliding window. State is per server instance, so on serverless
// hosting each warm instance keeps its own counters — good enough to stop
// casual brute-force/spam at this traffic level without a paid store.
const buckets = new Map<string, number[]>();

const MAX_BUCKETS = 10_000;

function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t > cutoff);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  if (buckets.size >= MAX_BUCKETS && !buckets.has(key)) buckets.clear();
  buckets.set(key, hits);
  return true;
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/** 5 attempts per 15 minutes per IP. */
export async function allowLogin(): Promise<boolean> {
  const ip = await clientIp();
  return allow(`login:${ip}`, 5, 15 * 60 * 1000);
}

/** 3 per minute and 10 per hour per IP. */
export async function allowEnquiry(): Promise<boolean> {
  const ip = await clientIp();
  return (
    allow(`enq-m:${ip}`, 3, 60 * 1000) &&
    allow(`enq-h:${ip}`, 10, 60 * 60 * 1000)
  );
}
