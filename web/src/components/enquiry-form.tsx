"use client";

import { useState } from "react";
import type { Service } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";
import { submitEnquiry } from "@/app/actions";
import { track } from "./analytics";
import { WhatsAppIcon, CheckIcon } from "./icons";

type Errors = Partial<Record<"name" | "phone" | "service" | "requirement", string>>;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function EnquiryForm({
  services,
  whatsappNumber,
  defaultService,
}: {
  services: Service[];
  whatsappNumber: string;
  defaultService?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: defaultService ?? "",
    requirement: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number";
    if (!form.service) next.service = "Please choose a service";
    if (!form.requirement.trim()) next.requirement = "Tell us a little about what you need";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const serviceSlug = services.find((s) => s.title === form.service)?.slug;

    try {
      await submitEnquiry({
        customerName: form.name,
        phone: form.phone,
        email: form.email || undefined,
        location: form.location || undefined,
        serviceSlug,
        requirement: form.requirement,
      });
    } catch {}

    track("enquiry_submit", { service: form.service });

    const link = whatsappLink(
      {
        service: form.service,
        name: form.name,
        phone: form.phone,
        location: form.location,
        requirement: form.requirement,
      },
      whatsappNumber,
    );
    window.open(link, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-7 w-7 text-green-600" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-brand-950">WhatsApp is opening…</h3>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ve pre-filled your enquiry. Just press send in WhatsApp and our team
          will get back to you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Ravi Kumar"
            className={inputClass}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            value={form.phone}
            onChange={set("phone")}
            inputMode="tel"
            placeholder="e.g. 98765 43210"
            className={inputClass}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Email <span className="text-slate-400">(optional)</span>
          </label>
          <input
            value={form.email}
            onChange={set("email")}
            type="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Location <span className="text-slate-400">(optional)</span>
          </label>
          <input
            value={form.location}
            onChange={set("location")}
            placeholder="e.g. Anna Nagar, Chennai"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Service you&apos;re interested in <span className="text-red-500">*</span>
        </label>
        <select value={form.service} onChange={set("service")} className={inputClass}>
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Your requirement <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.requirement}
          onChange={set("requirement")}
          rows={4}
          placeholder="Tell us what you need — e.g. 4 CCTV cameras for my shop."
          className={`${inputClass} resize-none`}
        />
        {errors.requirement && (
          <p className="mt-1 text-xs text-red-500">{errors.requirement}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-whatsapp-dark active:scale-[0.98]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send Enquiry via WhatsApp
      </button>
      <p className="text-center text-xs text-slate-400">
        No payment online — we&apos;ll confirm everything over WhatsApp.
      </p>
    </form>
  );
}
