export const EXHIBITION_TZ = "Asia/Colombo";

/** Formats a UTC instant for display in Sri Lanka time. */
export function formatDateTime(iso: string | Date | null | undefined, locale: "en" | "si" = "en", withTime = true) {
  if (!iso) return "";
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat(locale === "si" ? "si-LK" : "en-LK", {
    timeZone: EXHIBITION_TZ,
    dateStyle: "long",
    ...(withTime ? { timeStyle: "short" } : {}),
  }).format(d);
}

export function formatTime(iso: string | Date, locale: "en" | "si" = "en") {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat(locale === "si" ? "si-LK" : "en-LK", {
    timeZone: EXHIBITION_TZ,
    timeStyle: "medium",
  }).format(d);
}

/** 12345 ms → "12.35 s" */
export function formatSeconds(ms: number) {
  return `${(ms / 1000).toFixed(2)} s`;
}
