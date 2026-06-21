import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [services, packages, reviews, pendingReviews, enquiries, newEnquiries] =
    await Promise.all([
      prisma.service.count(),
      prisma.package.count(),
      prisma.review.count(),
      prisma.review.count({ where: { approved: false } }),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "new" } }),
    ]);
  return { services, packages, reviews, pendingReviews, enquiries, newEnquiries };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Services",
      value: stats.services,
      href: "/admin/services",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Packages",
      value: stats.packages,
      href: "/admin/packages",
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Reviews",
      value: stats.reviews,
      badge: stats.pendingReviews > 0 ? `${stats.pendingReviews} pending` : undefined,
      href: "/admin/reviews",
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Enquiries",
      value: stats.enquiries,
      badge: stats.newEnquiries > 0 ? `${stats.newEnquiries} new` : undefined,
      href: "/admin/enquiries",
      color: "bg-green-50 text-green-700",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Overview of your site content.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{c.value}</p>
            {c.badge && (
              <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.color}`}>
                {c.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/admin/services/new"
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            + Add service
          </Link>
          <Link
            href="/admin/packages/new"
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            + Add package
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Site settings
          </Link>
        </div>
      </div>
    </>
  );
}
