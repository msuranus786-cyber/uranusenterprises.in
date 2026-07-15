"use server";

import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validation";
import { allowEnquiry } from "@/lib/rate-limit";

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
