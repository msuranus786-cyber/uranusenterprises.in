"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/services", label: "Services", icon: "🔧" },
  { href: "/admin/packages", label: "Packages", icon: "📦" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "💬" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <Link href="/admin" className="text-base font-bold text-brand-900">
          Uranus Admin
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-auto p-3">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <Link
          href="/"
          className="mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700"
        >
          ← View site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
