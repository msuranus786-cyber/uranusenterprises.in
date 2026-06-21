import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-7xl font-extrabold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-950">Page not found</h1>
      <p className="mt-3 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-800 active:scale-95"
      >
        Back to home
        <ArrowRightIcon className="h-5 w-5" />
      </Link>
    </section>
  );
}
