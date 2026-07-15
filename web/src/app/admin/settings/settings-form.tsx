"use client";

import { useState } from "react";
import { updateSettings } from "../actions";
import { FormField, SubmitButton } from "../components";

type Settings = {
  name: string;
  brand: string;
  owner: string;
  city: string;
  tagline: string;
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  address: string;
  hours: string;
  yearsExperience: number;
  customers: number;
  projects: number;
} | null;

export function SettingsForm({ settings }: { settings: Settings }) {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(form: FormData) {
    await updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Business Info
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Business Name" name="name" defaultValue={settings?.name} required />
          <FormField label="Brand Name" name="brand" defaultValue={settings?.brand} required />
          <FormField label="Owner Name" name="owner" defaultValue={settings?.owner} required />
          <FormField label="City" name="city" defaultValue={settings?.city} required />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Tagline
        </legend>
        <FormField label="Tagline" name="tagline" defaultValue={settings?.tagline} required />
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Contact Details
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Phone (display)" name="phoneDisplay" defaultValue={settings?.phoneDisplay} required />
          <FormField label="WhatsApp Number" name="whatsappNumber" defaultValue={settings?.whatsappNumber} required placeholder="919841770013" />
          <FormField label="Email" name="email" type="email" defaultValue={settings?.email} />
          <FormField label="Address" name="address" defaultValue={settings?.address} required />
        </div>
        <div className="mt-5">
          <FormField label="Business Hours" name="hours" defaultValue={settings?.hours} required />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Stats (shown on website)
        </legend>
        <div className="grid gap-5 sm:grid-cols-3">
          <FormField label="Years Experience" name="yearsExperience" type="number" defaultValue={settings?.yearsExperience} required />
          <FormField label="Happy Customers" name="customers" type="number" defaultValue={settings?.customers} required />
          <FormField label="Projects Delivered" name="projects" type="number" defaultValue={settings?.projects} required />
        </div>
      </fieldset>

      <div className="flex items-center gap-4 border-t border-slate-200 pt-5">
        <SubmitButton label="Save settings" />
        {saved && (
          <span className="text-sm font-medium text-green-600">Settings saved!</span>
        )}
      </div>
    </form>
  );
}
