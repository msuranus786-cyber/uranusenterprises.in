"use client";

import { useState } from "react";
import type { Service } from "@/lib/data";
import { submitFeedback } from "@/app/actions";
import { StarPicker } from "./star-picker";
import { CheckIcon, CloseIcon } from "./icons";

type Errors = Partial<Record<"name" | "rating" | "comment" | "photos", string>>;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

const MAX_PHOTOS = 3;

type Photo = { blob: Blob; previewUrl: string };

async function compressImage(file: File, maxDim = 1280, quality = 0.75): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
      "image/jpeg",
      quality,
    );
  });
}

export function FeedbackForm({ services }: { services: Service[] }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    serviceSlug: "",
    comment: "",
  });
  const [rating, setRating] = useState(5);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const addPhotos = async (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).slice(0, MAX_PHOTOS - photos.length);
    if (files.length === 0) return;

    setErrors((er) => ({ ...er, photos: undefined }));
    try {
      const compressed = await Promise.all(
        files.map(async (file) => ({
          blob: await compressImage(file),
          previewUrl: "",
        })),
      );
      const withPreviews = compressed.map((p) => ({
        ...p,
        previewUrl: URL.createObjectURL(p.blob),
      }));
      setPhotos((prev) => [...prev, ...withPreviews].slice(0, MAX_PHOTOS));
    } catch {
      setErrors((er) => ({ ...er, photos: "Couldn't read one of those photos. Try a different file." }));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (rating < 1) next.rating = "Please choose a rating";
    if (form.comment.trim().length < 10) next.comment = "Tell us a bit more (at least 10 characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("location", form.location);
    fd.set("phone", form.phone);
    fd.set("serviceSlug", form.serviceSlug);
    fd.set("rating", String(rating));
    fd.set("comment", form.comment);
    photos.forEach((p) => fd.append("photos", p.blob, "photo.jpg"));

    setPending(true);
    try {
      const result = await submitFeedback(fd);
      if (result.success) {
        setSent(true);
      } else {
        setServerError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Your photos may be too large — try smaller or fewer photos.");
    } finally {
      setPending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-7 w-7 text-green-600" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-brand-950">Thank you!</h3>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ve received your feedback. It&apos;ll appear on the site once our team
          reviews and approves it.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", location: "", phone: "", serviceSlug: "", comment: "" });
            setRating(5);
            setPhotos([]);
            setSent(false);
          }}
          className="mt-5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Share another experience
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. Ravi Kumar"
            className={inputClass}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Location <span className="text-slate-400">(optional)</span>
          </label>
          <input
            value={form.location}
            onChange={set("location")}
            placeholder="e.g. Anna Nagar, Chennai"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone <span className="text-slate-400">(optional, not published)</span>
          </label>
          <input
            value={form.phone}
            onChange={set("phone")}
            inputMode="tel"
            placeholder="e.g. 98765 43210"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Which service? <span className="text-slate-400">(optional)</span>
          </label>
          <select value={form.serviceSlug} onChange={set("serviceSlug")} className={inputClass}>
            <option value="">General feedback</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Your rating <span className="text-red-500">*</span>
        </label>
        <StarPicker value={rating} onChange={setRating} />
        {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Your experience <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.comment}
          onChange={set("comment")}
          rows={4}
          placeholder="Tell us how the service went…"
          className={`${inputClass} resize-none`}
        />
        {errors.comment && <p className="mt-1 text-xs text-red-500">{errors.comment}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Photos <span className="text-slate-400">(optional, up to {MAX_PHOTOS})</span>
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {photos.map((p, i) => (
            <div key={p.previewUrl} className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview, not an optimizable asset */}
              <img src={p.previewUrl} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <CloseIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 text-slate-400 transition-colors hover:border-brand-400 hover:text-brand-600">
              <span className="text-2xl leading-none">+</span>
              <span className="text-[10px] font-medium">Add photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
        {errors.photos && <p className="mt-1 text-xs text-red-500">{errors.photos}</p>}
      </div>

      {serverError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand-700/20 transition-all hover:bg-brand-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Share Your Feedback"}
      </button>
      <p className="text-center text-xs text-slate-400">
        Your feedback is reviewed by our team before it appears on the site.
      </p>
    </form>
  );
}
