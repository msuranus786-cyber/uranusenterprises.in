"use client";

import { createService, updateService } from "../actions";
import {
  FormField,
  TextAreaField,
  CheckboxField,
  SelectField,
  SubmitButton,
} from "../components";

const iconOptions = [
  { value: "cctv", label: "CCTV" },
  { value: "biometric", label: "Biometric" },
  { value: "computer", label: "Computer" },
  { value: "network", label: "Network" },
  { value: "home", label: "Home" },
];

const gradientOptions = [
  { value: "from-brand-700 to-brand-900", label: "Navy Deep" },
  { value: "from-brand-600 to-brand-800", label: "Navy Medium" },
  { value: "from-brand-700 to-brand-950", label: "Navy Dark" },
  { value: "from-brand-500 to-brand-800", label: "Navy Light" },
  { value: "from-brand-600 to-brand-900", label: "Navy Classic" },
];

type ServiceData = {
  id: number;
  title: string;
  slug: string;
  category: string;
  icon: string;
  gradient: string;
  tagline: string;
  description: string;
  startingPrice: number;
  available: boolean;
  features: string[];
  offerings: string[];
  sortOrder: number;
};

export function ServiceForm({ service }: { service?: ServiceData }) {
  const isEdit = !!service;

  async function handleSubmit(form: FormData) {
    if (isEdit) {
      await updateService(service!.id, form);
    } else {
      await createService(form);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Title" name="title" defaultValue={service?.title} required />
        <FormField label="Slug" name="slug" defaultValue={service?.slug} required placeholder="cctv-installation" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Category" name="category" defaultValue={service?.category} required placeholder="Security" />
        <FormField label="Starting Price (INR)" name="startingPrice" type="number" defaultValue={service?.startingPrice} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Icon" name="icon" options={iconOptions} defaultValue={service?.icon} required />
        <SelectField label="Gradient" name="gradient" options={gradientOptions} defaultValue={service?.gradient} required />
      </div>

      <FormField label="Tagline" name="tagline" defaultValue={service?.tagline} required placeholder="Short catchy tagline" />

      <TextAreaField label="Description" name="description" defaultValue={service?.description} rows={4} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextAreaField
          label="Features"
          name="features"
          defaultValue={service?.features.join("\n")}
          hint="One per line"
        />
        <TextAreaField
          label="Offerings"
          name="offerings"
          defaultValue={service?.offerings.join("\n")}
          hint="One per line"
        />
      </div>

      <div className="flex items-center gap-6">
        <FormField label="Sort Order" name="sortOrder" type="number" defaultValue={service?.sortOrder ?? 0} />
        <div className="pt-5">
          <CheckboxField label="Available" name="available" defaultChecked={service?.available ?? true} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-200 pt-5">
        <SubmitButton label={isEdit ? "Update service" : "Create service"} />
      </div>
    </form>
  );
}
