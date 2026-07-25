import sharp from "sharp";

const MAX_RAW_BYTES = 8 * 1024 * 1024;
const MAX_DIMENSION = 1280;

type ProcessResult =
  | { ok: true; data: Buffer<ArrayBuffer>; contentType: string }
  | { ok: false; error: string };

/** Re-encodes an uploaded photo to a bounded JPEG, auto-orienting from EXIF
 *  and stripping it. Also doubles as the real file-type check — if sharp
 *  can't decode it, it isn't a usable image regardless of what the browser
 *  claimed its MIME type was. */
export async function processReviewPhoto(file: File): Promise<ProcessResult> {
  if (file.size > MAX_RAW_BYTES) {
    return { ok: false, error: `${file.name || "One of your photos"} is too large.` };
  }

  const input = Buffer.from(await file.arrayBuffer());
  try {
    const data = await sharp(input)
      .rotate()
      .resize({ width: MAX_DIMENSION, withoutEnlargement: true })
      .jpeg({ quality: 72 })
      .toBuffer();
    return { ok: true, data: Buffer.from(data), contentType: "image/jpeg" };
  } catch {
    return { ok: false, error: "One of your photos couldn't be processed. Please use a JPG or PNG." };
  }
}
