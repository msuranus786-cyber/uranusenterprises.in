import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PackageForm } from "../package-form";

export default async function EditPackagePage(props: PageProps<"/admin/packages/[id]">) {
  const { id } = await props.params;
  const [pkg, services] = await Promise.all([
    prisma.package.findUnique({ where: { id: Number(id) } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!pkg) notFound();

  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.title }));

  return (
    <>
      <div className="mb-6">
        <Link href="/admin/packages" className="text-sm text-brand-600 hover:underline">
          ← Back to packages
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Edit: {pkg.name}</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <PackageForm pkg={pkg} serviceOptions={serviceOptions} />
      </div>
    </>
  );
}
