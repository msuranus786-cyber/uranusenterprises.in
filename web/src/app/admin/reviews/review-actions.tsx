"use client";

import { useRouter } from "next/navigation";
import { approveReview, rejectReview, deleteReview } from "../actions";

export function ReviewActions({
  id,
  status,
}: {
  id: number;
  status: "pending" | "approved";
}) {
  const router = useRouter();

  async function handleAction(action: "approve" | "reject" | "delete") {
    if (action === "delete" && !confirm("Delete this review permanently?")) return;
    if (action === "approve") await approveReview(id);
    else if (action === "reject") await rejectReview(id);
    else await deleteReview(id);
    router.refresh();
  }

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {status === "pending" && (
        <button
          onClick={() => handleAction("approve")}
          className="rounded bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
        >
          Approve
        </button>
      )}
      {status === "approved" && (
        <button
          onClick={() => handleAction("reject")}
          className="rounded bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 hover:bg-amber-200"
        >
          Hide
        </button>
      )}
      <button
        onClick={() => handleAction("delete")}
        className="rounded bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  );
}
