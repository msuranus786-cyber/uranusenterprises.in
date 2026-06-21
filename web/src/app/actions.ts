"use server";

import { prisma } from "@/lib/prisma";

export async function submitEnquiry(data: {
  customerName: string;
  phone: string;
  email?: string;
  location?: string;
  serviceSlug?: string;
  requirement?: string;
}) {
  await prisma.enquiry.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || null,
      location: data.location || null,
      requirement: data.requirement || null,
      serviceSlug: data.serviceSlug || null,
      status: "new",
    },
  });
  return { success: true };
}
