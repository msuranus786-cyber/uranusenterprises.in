import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../service-form";

export default async function EditServicePage(props: PageProps<"/admin/services/[id]">) {
  const { id } = await props.params;
  const service = await prisma.service.findUnique({ where: { id: Number(id) } });
  if (!service) notFound();

  return (
    <>
      <div className="mb-6">
        <Link href="/admin/services" className="text-sm text-brand-600 hover:underline">
          ← Back to services
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Edit: {service.title}</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <ServiceForm service={service} />
      </div>
    </>
  );
}
