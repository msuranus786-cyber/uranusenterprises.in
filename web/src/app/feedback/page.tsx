import type { Metadata } from "next";
import { getServices } from "@/lib/db";
import { PageHeader } from "@/components/page-header";
import { FeedbackForm } from "@/components/feedback-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description:
    "Had a service done by Uranus Enterprises in Chennai? Share your experience and a few photos — it helps other customers and our team.",
  alternates: { canonical: "/feedback" },
};

export default async function FeedbackPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Feedback" }]}
        title="Share your experience"
        subtitle="Tell us how it went — your feedback (and photos, if you have them) help other customers and our team. It's reviewed before it goes live."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <FeedbackForm services={services} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
