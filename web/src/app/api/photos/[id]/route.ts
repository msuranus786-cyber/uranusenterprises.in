import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return new Response(null, { status: 404 });

  const photo = await prisma.reviewPhoto.findUnique({
    where: { id },
    select: {
      data: true,
      contentType: true,
      review: { select: { approved: true } },
    },
  });
  if (!photo) return new Response(null, { status: 404 });

  // Unapproved submissions are only visible to a logged-in admin — a photo of
  // someone's home/shop shouldn't be publicly guessable before it's approved.
  if (!photo.review.approved) {
    const session = await getSession();
    if (!session) return new Response(null, { status: 404 });
  }

  // Only let shared caches (Netlify's CDN included) store this response once
  // the photo is actually public — otherwise an admin's authenticated view of
  // a pending photo would get cached under this same URL and replayed to
  // anonymous requesters afterward, bypassing the check above entirely.
  const cacheControl = photo.review.approved
    ? "public, max-age=31536000, immutable"
    : "private, no-store";

  return new Response(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": photo.contentType,
      "Cache-Control": cacheControl,
    },
  });
}
