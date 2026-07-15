import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/auth";
import { SettingsForm } from "./settings-form";

export default async function AdminSettingsPage() {
  await requireAdminPage();
  const settings = await prisma.siteSettings.findFirst();

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Update your business details. Changes appear on the website immediately.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <SettingsForm settings={settings} />
      </div>
    </>
  );
}
