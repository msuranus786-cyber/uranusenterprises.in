"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authenticate, logout, getSession } from "@/lib/auth";

// ─── Auth ──────────────────────────────────────────────

export async function loginAction(form: FormData) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const user = await authenticate(email, password);
  if (!user) return { error: "Invalid email or password" };
  return { success: true };
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ─── Services ──────────────────────────────────────────

export async function createService(form: FormData) {
  await requireAdmin();
  const data = parseServiceForm(form);
  await prisma.service.create({ data });
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: number, form: FormData) {
  await requireAdmin();
  const data = parseServiceForm(form);
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/admin/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
}

function parseServiceForm(form: FormData) {
  return {
    title: form.get("title") as string,
    slug: form.get("slug") as string,
    category: form.get("category") as string,
    icon: form.get("icon") as string,
    gradient: form.get("gradient") as string,
    tagline: form.get("tagline") as string,
    description: form.get("description") as string,
    startingPrice: Number(form.get("startingPrice")),
    available: form.get("available") === "on",
    features: splitLines(form.get("features") as string),
    offerings: splitLines(form.get("offerings") as string),
    sortOrder: Number(form.get("sortOrder") || 0),
  };
}

// ─── Packages ──────────────────────────────────────────

export async function createPackage(form: FormData) {
  await requireAdmin();
  const data = parsePackageForm(form);
  await prisma.package.create({ data });
  revalidatePath("/admin/packages");
  revalidatePath("/");
  redirect("/admin/packages");
}

export async function updatePackage(id: number, form: FormData) {
  await requireAdmin();
  const data = parsePackageForm(form);
  await prisma.package.update({ where: { id }, data });
  revalidatePath("/admin/packages");
  revalidatePath("/");
  redirect("/admin/packages");
}

export async function deletePackage(id: number) {
  await requireAdmin();
  await prisma.package.delete({ where: { id } });
  revalidatePath("/admin/packages");
  revalidatePath("/");
}

function parsePackageForm(form: FormData) {
  return {
    name: form.get("name") as string,
    serviceSlug: form.get("serviceSlug") as string,
    cameras: form.get("cameras") as string,
    recorder: form.get("recorder") as string,
    storage: form.get("storage") as string,
    installation: form.get("installation") as string || "Included",
    warranty: form.get("warranty") as string,
    price: Number(form.get("price")),
    popular: form.get("popular") === "on",
    features: splitLines(form.get("features") as string),
    sortOrder: Number(form.get("sortOrder") || 0),
  };
}

// ─── Reviews ───────────────────────────────────────────

export async function approveReview(id: number) {
  await requireAdmin();
  await prisma.review.update({ where: { id }, data: { approved: true } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function rejectReview(id: number) {
  await requireAdmin();
  await prisma.review.update({ where: { id }, data: { approved: false } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function deleteReview(id: number) {
  await requireAdmin();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

// ─── Enquiries ─────────────────────────────────────────

export async function updateEnquiryStatus(id: number, status: string) {
  await requireAdmin();
  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(id: number) {
  await requireAdmin();
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/admin/enquiries");
}

// ─── Settings ──────────────────────────────────────────

export async function updateSettings(form: FormData) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      name: form.get("name") as string,
      brand: form.get("brand") as string,
      owner: form.get("owner") as string,
      city: form.get("city") as string,
      tagline: form.get("tagline") as string,
      phoneDisplay: form.get("phoneDisplay") as string,
      whatsappNumber: form.get("whatsappNumber") as string,
      email: form.get("email") as string,
      address: form.get("address") as string,
      hours: form.get("hours") as string,
      yearsExperience: Number(form.get("yearsExperience")),
      customers: Number(form.get("customers")),
      projects: Number(form.get("projects")),
    },
    create: {
      name: form.get("name") as string,
      brand: form.get("brand") as string,
      owner: form.get("owner") as string,
      city: form.get("city") as string,
      tagline: form.get("tagline") as string,
      phoneDisplay: form.get("phoneDisplay") as string,
      whatsappNumber: form.get("whatsappNumber") as string,
      email: form.get("email") as string,
      address: form.get("address") as string,
      hours: form.get("hours") as string,
      yearsExperience: Number(form.get("yearsExperience")),
      customers: Number(form.get("customers")),
      projects: Number(form.get("projects")),
    },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

// ─── Helpers ───────────────────────────────────────────

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}
