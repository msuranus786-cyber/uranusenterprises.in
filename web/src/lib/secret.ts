// Single source of truth for the session-signing secret.
// Imported by both lib/auth.ts (node) and src/proxy.ts (edge) — keep it dependency-free.
//
// Resolved lazily (not at module load) so `next build`'s page-data collection,
// which imports this module without ever signing/verifying a token, doesn't
// fail just because ADMIN_SECRET isn't set in the build environment.

let cached: Uint8Array | null = null;

export function getAdminSecret(): Uint8Array {
  if (cached) return cached;

  const raw = process.env.ADMIN_SECRET;
  if (!raw && process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SECRET environment variable must be set in production. " +
        "Generate one with: openssl rand -base64 32",
    );
  }

  cached = new TextEncoder().encode(raw || "dev-only-insecure-secret");
  return cached;
}
