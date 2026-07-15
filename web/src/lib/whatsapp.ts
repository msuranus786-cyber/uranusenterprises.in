import { site } from "./data";

type EnquiryParts = {
  service?: string;
  packageName?: string;
  name?: string;
  phone?: string;
  location?: string;
  requirement?: string;
};

/** Build the pre-filled enquiry message exactly as specified in the brief. */
export function buildEnquiryMessage(parts: EnquiryParts = {}): string {
  const lines = [
    `Hello ${site.name},`,
    "",
    "I am interested in:",
    `Service: ${parts.service ?? ""}`,
    `Package: ${parts.packageName ?? ""}`,
    "",
    `Customer Name: ${parts.name ?? ""}`,
    `Phone: ${parts.phone ?? ""}`,
    `Location: ${parts.location ?? ""}`,
    "",
    `Requirement: ${parts.requirement ?? ""}`,
  ];
  return lines.join("\n");
}

/** wa.me deep link with the pre-filled message.
 *  Pass the number from SiteSettings (DB) wherever it is available so admin
 *  edits take effect; the static fallback is only for DB-less rendering. */
export function whatsappLink(
  parts: EnquiryParts = {},
  whatsappNumber: string = site.whatsappNumber,
): string {
  const text = encodeURIComponent(buildEnquiryMessage(parts));
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
