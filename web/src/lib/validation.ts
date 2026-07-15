import { z } from "zod";

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug")
  .max(80);

export const enquirySchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,20}$/, "Invalid phone number"),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  serviceSlug: slug.optional().or(z.literal("")),
  requirement: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug,
  category: z.string().trim().min(2).max(60),
  icon: z.enum(["cctv", "biometric", "computer", "network", "home"]),
  gradient: z.string().trim().max(80),
  tagline: z.string().trim().max(160),
  description: z.string().trim().min(10).max(4000),
  startingPrice: z.number().int().min(0).max(10_000_000),
  available: z.boolean(),
  features: z.array(z.string().trim().max(160)).max(20),
  offerings: z.array(z.string().trim().max(160)).max(20),
  sortOrder: z.number().int().min(0).max(1000),
});

export const packageSchema = z.object({
  name: z.string().trim().min(1).max(80),
  serviceSlug: slug,
  cameras: z.string().trim().max(80),
  recorder: z.string().trim().max(80),
  storage: z.string().trim().max(80),
  installation: z.string().trim().max(80),
  warranty: z.string().trim().max(80),
  price: z.number().int().min(0).max(10_000_000),
  popular: z.boolean(),
  features: z.array(z.string().trim().max(160)).max(20),
  sortOrder: z.number().int().min(0).max(1000),
});

export const enquiryStatusSchema = z.enum([
  "new",
  "contacted",
  "completed",
  "closed",
]);

export const settingsSchema = z.object({
  name: z.string().trim().min(2).max(120),
  brand: z.string().trim().max(120),
  owner: z.string().trim().max(120),
  city: z.string().trim().max(80),
  tagline: z.string().trim().max(200),
  phoneDisplay: z.string().trim().max(30),
  whatsappNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10,15}$/, "Digits only, with country code (e.g. 9198xxxxxxx)"),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  address: z.string().trim().max(300),
  hours: z.string().trim().max(120),
  yearsExperience: z.number().int().min(0).max(100),
  customers: z.number().int().min(0).max(10_000_000),
  projects: z.number().int().min(0).max(10_000_000),
});
