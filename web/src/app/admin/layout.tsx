import type { Metadata } from "next";
import { connection } from "next/server";
import { AdminSidebar } from "./sidebar";

export const metadata: Metadata = {
  title: { default: "Admin · Uranus Enterprises", template: "%s · Admin" },
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connection();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
