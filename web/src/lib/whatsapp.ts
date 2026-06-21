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

/** wa.me deep link with the pre-filled message. */
export function whatsappLink(parts: EnquiryParts = {}): string {
  const text = encodeURIComponent(buildEnquiryMessage(parts));
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
