import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "../components";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { sortOrder: "asc" },
    include: { service: { select: { title: true } } },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Packages</h1>
          <p className="mt-1 text-sm text-slate-500">{packages.length} packages</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
        >
          + Add package
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Name</th>
              <th className="px-4 py-3 font-medium text-slate-600">Service</th>
              <th className="px-4 py-3 font-medium text-slate-600">Cameras</th>
              <th className="px-4 py-3 font-medium text-slate-600">Price</th>
              <th className="px-4 py-3 font-medium text-slate-600">Popular</th>
              <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packages.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3 text-slate-600">{p.service.title}</td>
                <td className="px-4 py-3 text-slate-600">{p.cameras}</td>
                <td className="px-4 py-3 text-slate-600">
                  {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p.price)}
                </td>
                <td className="px-4 py-3">
                  {p.popular && (
                    <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                      Popular
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/packages/${p.id}`}
                      className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={p.id} type="package" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
