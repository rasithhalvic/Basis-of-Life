import Image from "next/image";

/**
 * Pioneer portrait. Until a licensed image is supplied, renders a neutral
 * monogram placeholder (no invented likeness and no invented credit).
 */
export function Portrait({
  url,
  alt,
  name,
  size = "card",
  priority = false,
}: {
  url: string | null;
  alt: string;
  name: string;
  size?: "card" | "hero";
  priority?: boolean;
}) {
  const dims = size === "hero" ? "aspect-[4/5] w-full max-w-sm" : "aspect-[4/5] w-full";
  if (url) {
    const local = url.startsWith("/");
    return (
      <div className={`relative overflow-hidden rounded-2xl border-4 border-white bg-ivory shadow-md ring-1 ring-gold/50 ${dims}`}>
        {local ? (
          <Image src={url} alt={alt} fill sizes={size === "hero" ? "(max-width: 640px) 100vw, 384px" : "(max-width: 640px) 50vw, 240px"} className="object-cover" priority={priority} />
        ) : (
          // External licensed images: plain img to avoid proxying third-party hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
        )}
      </div>
    );
  }
  const initials = name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative grid place-items-center overflow-hidden rounded-2xl border-4 border-white bg-burgundy-deep shadow-md ring-1 ring-gold/50 ${dims}`}
    >
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 100 125" preserveAspectRatio="none">
        <defs>
          <pattern id="lattice" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 6h12M6 0v12" stroke="#C6A15B" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100" height="125" fill="url(#lattice)" />
      </svg>
      <span aria-hidden className={`relative grid place-items-center rounded-full border-2 border-gold font-display text-gold ${size === "hero" ? "h-32 w-32 text-5xl" : "h-20 w-20 text-3xl"}`}>
        {initials}
      </span>
    </div>
  );
}
