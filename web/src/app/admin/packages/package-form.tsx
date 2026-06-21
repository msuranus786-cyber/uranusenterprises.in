"use client";

import { createPackage, updatePackage } from "../actions";
import {
  FormField,
  TextAreaField,
  CheckboxField,
  SelectField,
  SubmitButton,
} from "../components";

type PackageData = {
  id: number;
  name: string;
  serviceSlug: string;
  cameras: string;
  recorder: string;
  storage: string;
  installation: string;
  warranty: string;
  price: number;
  popular: boolean;
  features: string[];
  sortOrder: number;
};

type ServiceOption = { value: string; label: string };

export function PackageForm({
  pkg,
  serviceOptions,
}: {
  pkg?: PackageData;
  serviceOptions: ServiceOption[];
}) {
  const isEdit = !!pkg;

  async function handleSubmit(form: FormData) {
    if (isEdit) {
      await updatePackage(pkg!.id, form);
    } else {
      await createPackage(form);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Package Name" name="name" defaultValue={pkg?.name} required placeholder="Standard" />
        <SelectField label="Service" name="serviceSlug" options={serviceOptions} defaultValue={pkg?.serviceSlug} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Cameras" name="cameras" defaultValue={pkg?.cameras} required placeholder="4 HD Cameras" />
        <FormField label="Recorder" name="recorder" defaultValue={pkg?.recorder} required placeholder="8-Channel DVR" />
        <FormField label="Storage" name="storage" defaultValue={pkg?.storage} required placeholder="1 TB" />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Installation" name="installation" defaultValue={pkg?.installation ?? "Included"} />
        <FormField label="Warranty" name="warranty" defaultValue={pkg?.warranty} required placeholder="2 Years" />
        <FormField label="Price (INR)" name="price" type="number" defaultValue={pkg?.price} required />
      </div>

      <TextAreaField
        label="Features"
        name="features"
        defaultValue={pkg?.features.join("\n")}
        hint="One per line"
      />

      <div className="flex items-center gap-6">
        <FormField label="Sort Order" name="sortOrder" type="number" defaultValue={pkg?.sortOrder ?? 0} />
        <div className="pt-5">
          <CheckboxField label="Mark as Popular" name="popular" defaultChecked={pkg?.popular ?? false} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-200 pt-5">
        <SubmitButton label={isEdit ? "Update package" : "Create package"} />
      </div>
    </form>
  );
}
