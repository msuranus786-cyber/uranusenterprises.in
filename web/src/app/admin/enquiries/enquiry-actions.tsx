"use client";

import { useRouter } from "next/navigation";
import { updateEnquiryStatus, deleteEnquiry } from "../actions";

const statuses = ["new", "contacted", "completed", "closed"] as const;

export function EnquiryActions({
  id,
  currentStatus,
}: {
  id: number;
  currentStatus: string;
}) {
  const router = useRouter();

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateEnquiryStatus(id, e.target.value);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this enquiry permanently?")) return;
    await deleteEnquiry(id);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-700 focus:border-brand-500 focus:outline-none"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
      <button
        onClick={handleDelete}
        className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  );
}
