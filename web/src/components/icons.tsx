import type { SVGProps } from "react";
import type { IconKey } from "@/lib/data";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function CctvIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7l13-3 1.2 4.2L4.2 11.2z" />
      <path d="M4.2 11.2 6 16" />
      <circle cx="5" cy="18" r="1.4" />
      <path d="M16.2 8.2 21 9.6" />
      <path d="M12 20h8" />
      <path d="M16 20v-3" />
    </svg>
  );
}

export function BiometricIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c-3.6 0-6.5 2.6-6.5 6v2.5" />
      <path d="M18.5 12v-2.5c0-1.5-.6-2.9-1.6-3.9" />
      <path d="M8.5 10.5a3.5 3.5 0 0 1 7 0v2c0 2.2.6 3.5 1.5 4.8" />
      <path d="M12 10.5v3.5c0 2.6-1 4.4-2.5 6" />
      <path d="M6.5 14.5c.4 1.8.2 3.6-.8 5.3" />
      <path d="M12 14.2c0 3.4-.8 4.9-1 5.6" />
    </svg>
  );
}

export function ComputerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="12" rx="1.6" />
      <path d="M2 20h20" />
      <path d="M9.5 16.5 9 20" />
      <path d="M14.5 16.5 15 20" />
      <path d="M7 8.5l-2 1.5 2 1.5" />
      <path d="M11 8l-1.2 4" />
    </svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="3" width="6" height="4.5" rx="1" />
      <rect x="3" y="16.5" width="6" height="4.5" rx="1" />
      <rect x="15" y="16.5" width="6" height="4.5" rx="1" />
      <path d="M12 7.5V12" />
      <path d="M6 16.5V12h12v4.5" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.7V20h13V9.7" />
      <path d="M10 20v-4.5a2 2 0 0 1 4 0V20" />
      <circle cx="12" cy="9.5" r="0.6" />
    </svg>
  );
}

export function ElectricalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

const map: Record<IconKey, (p: IconProps) => React.JSX.Element> = {
  cctv: CctvIcon,
  biometric: BiometricIcon,
  computer: ComputerIcon,
  network: NetworkIcon,
  home: HomeIcon,
  electrical: ElectricalIcon,
};

export function ServiceIcon({
  name,
  ...props
}: { name: IconKey } & IconProps) {
  const Cmp = map[name];
  return <Cmp {...props} />;
}

/* ---- UI / utility icons ---- */

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 6.5" />
    </svg>
  );
}

export function StarIcon({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.477-.911zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16v11H8l-4 4V5z" />
      <path d="M8 9.5h8" />
      <path d="M8 12.5h5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5c0 8.3 6.7 15 15 15v-3.2l-3.8-1.3-1.7 1.7a11.3 11.3 0 0 1-5.4-5.4l1.7-1.7L8.2 5H4z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.3 3 8.2 7 9.5 4-1.3 7-5.2 7-9.5V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 5.5a3 3 0 0 0 4 4l-7.8 7.8a2 2 0 0 1-2.8-2.8z" />
      <path d="m5 19 2-2" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
      <path d="M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" />
    </svg>
  );
}
