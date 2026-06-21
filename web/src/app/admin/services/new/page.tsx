import Link from "next/link";
import { ServiceForm } from "../service-form";

export default function NewServicePage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/admin/services" className="text-sm text-brand-600 hover:underline">
          ← Back to services
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Add Service</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <ServiceForm />
      </div>
    </>
  );
}
