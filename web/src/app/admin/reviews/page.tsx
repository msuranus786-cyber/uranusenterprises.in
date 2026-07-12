import { prisma } from "@/lib/prisma";
import { ReviewActions } from "./review-actions";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: { select: { title: true } } },
  });

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
      <p className="mt-1 text-sm text-slate-500">
        {reviews.length} total · {pending.length} pending approval
      </p>

      {pending.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-600">
            Pending Approval ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-amber-200 bg-amber-50/50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{r.name}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{r.location}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">&quot;{r.comment}&quot;</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <span>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                      <span>{r.service.title}</span>
                    </div>
                  </div>
                  <ReviewActions id={r.id} status="pending" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-600">
          Approved ({approved.length})
        </h2>
        <div className="space-y-3">
          {approved.map((r) => (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{r.name}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{r.location}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">&quot;{r.comment}&quot;</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                    <span>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    <span>{r.service.title}</span>
                  </div>
                </div>
                <ReviewActions id={r.id} status="approved" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
