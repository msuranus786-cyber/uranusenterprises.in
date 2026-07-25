"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { enquirySchema, feedbackSchema } from "@/lib/validation";
import { allowEnquiry, allowFeedback } from "@/lib/rate-limit";
import { processReviewPhoto } from "@/lib/image";

const MAX_PHOTOS = 3;

export async function submitEnquiry(data: {
  customerName: string;
  phone: string;
  email?: string;
  location?: string;
  serviceSlug?: string;
  requirement?: string;
}) {
  if (!(await allowEnquiry())) {
    return { success: false, error: "Too many enquiries. Please try again in a minute." };
  }

  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Please check your details and try again." };
  }

  const d = parsed.data;
  await prisma.enquiry.create({
    data: {
      customerName: d.customerName,
      phone: d.phone,
      email: d.email || null,
      location: d.location || null,
      requirement: d.requirement || null,
      serviceSlug: d.serviceSlug || null,
      status: "new",
    },
  });
  return { success: true };
}

export async function submitFeedback(formData: FormData) {
  if (!(await allowFeedback())) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  const parsed = feedbackSchema.safeParse({
    name: formData.get("name"),
    location: formData.get("location") ?? "",
    phone: formData.get("phone") ?? "",
    serviceSlug: formData.get("serviceSlug") ?? "",
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  });
  if (!parsed.success) {
    return { success: false, error: "Please check your details and try again." };
  }

  const files = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_PHOTOS) {
    return { success: false, error: `Please upload at most ${MAX_PHOTOS} photos.` };
  }

  const photos: { data: Buffer<ArrayBuffer>; contentType: string }[] = [];
  for (const file of files) {
    const result = await processReviewPhoto(file);
    if (!result.ok) {
      return { success: false, error: result.error };
    }
    photos.push({ data: result.data, contentType: result.contentType });
  }

  const d = parsed.data;
  await prisma.review.create({
    data: {
      name: d.name,
      location: d.location || null,
      phone: d.phone || null,
      serviceSlug: d.serviceSlug || null,
      rating: d.rating,
      comment: d.comment,
      approved: false,
      photos: { create: photos },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { success: true };
}
