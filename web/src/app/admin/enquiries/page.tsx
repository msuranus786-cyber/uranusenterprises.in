import { prisma } from "@/lib/prisma";
import { EnquiryActions } from "./enquiry-actions";

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-700",
  completed: "bg-green-50 text-green-700",
  closed: "bg-slate-100 text-slate-500",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: { select: { title: true } } },
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
      <p className="mt-1 text-sm text-slate-500">
        {enquiries.length} total · {enquiries.filter((e) => e.status === "new").length} new
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Customer</th>
              <th className="px-4 py-3 font-medium text-slate-600">Phone</th>
              <th className="px-4 py-3 font-medium text-slate-600">Service</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">Date</th>
              <th className="px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No enquiries yet. They&apos;ll appear here when customers submit the contact form.
                </td>
              </tr>
            )}
            {enquiries.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{e.customerName}</p>
                  {e.email && <p className="text-xs text-slate-400">{e.email}</p>}
                </td>
                <td className="px-4 py-3 text-slate-600">{e.phone}</td>
                <td className="px-4 py-3 text-slate-600">{e.service?.title ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    statusColors[e.status] ?? statusColors.new
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {e.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <EnquiryActions id={e.id} currentStatus={e.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
