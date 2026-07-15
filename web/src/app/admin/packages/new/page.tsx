import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/auth";
import { PackageForm } from "../package-form";

export default async function NewPackagePage() {
  await requireAdminPage();
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.title }));

  return (
    <>
      <div className="mb-6">
        <Link href="/admin/packages" className="text-sm text-brand-600 hover:underline">
          ← Back to packages
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Add Package</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <PackageForm serviceOptions={serviceOptions} />
      </div>
    </>
  );
}
