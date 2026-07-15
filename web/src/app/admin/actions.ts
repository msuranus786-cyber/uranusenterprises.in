"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authenticate, logout, requireAdmin } from "@/lib/auth";
import {
  loginSchema,
  serviceSchema,
  packageSchema,
  settingsSchema,
  enquiryStatusSchema,
} from "@/lib/validation";
import { allowLogin } from "@/lib/rate-limit";

// ─── Auth ──────────────────────────────────────────────

export async function loginAction(form: FormData) {
  if (!(await allowLogin())) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }
  const parsed = loginSchema.safeParse({
    email: form.get("email"),
    password: form.get("password"),
  });
  if (!parsed.success) return { error: "Invalid email or password" };

  const user = await authenticate(parsed.data.email, parsed.data.password);
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
  return serviceSchema.parse({
    title: form.get("title"),
    slug: form.get("slug"),
    category: form.get("category"),
    icon: form.get("icon"),
    gradient: form.get("gradient"),
    tagline: form.get("tagline"),
    description: form.get("description"),
    startingPrice: Number(form.get("startingPrice")),
    available: form.get("available") === "on",
    features: splitLines(form.get("features") as string),
    offerings: splitLines(form.get("offerings") as string),
    sortOrder: Number(form.get("sortOrder") || 0),
  });
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
  return packageSchema.parse({
    name: form.get("name"),
    serviceSlug: form.get("serviceSlug"),
    cameras: form.get("cameras"),
    recorder: form.get("recorder"),
    storage: form.get("storage"),
    installation: (form.get("installation") as string) || "Included",
    warranty: form.get("warranty"),
    price: Number(form.get("price")),
    popular: form.get("popular") === "on",
    features: splitLines(form.get("features") as string),
    sortOrder: Number(form.get("sortOrder") || 0),
  });
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
  const parsed = enquiryStatusSchema.parse(status);
  await prisma.enquiry.update({ where: { id }, data: { status: parsed } });
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
  const data = settingsSchema.parse({
    name: form.get("name"),
    brand: form.get("brand"),
    owner: form.get("owner"),
    city: form.get("city"),
    tagline: form.get("tagline"),
    phoneDisplay: form.get("phoneDisplay"),
    whatsappNumber: form.get("whatsappNumber"),
    email: form.get("email"),
    address: form.get("address"),
    hours: form.get("hours"),
    yearsExperience: Number(form.get("yearsExperience")),
    customers: Number(form.get("customers")),
    projects: Number(form.get("projects")),
  });
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: data,
  });
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}

// ─── Helpers ───────────────────────────────────────────

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
