import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";
const variants = {
  primary: "bg-burgundy text-white hover:bg-burgundy-deep shadow-sm",
  secondary: "border-2 border-burgundy text-burgundy bg-white hover:bg-ivory",
  ghost: "text-burgundy underline-offset-4 hover:underline",
  danger: "bg-danger text-white hover:bg-burgundy-deep",
  gold: "bg-gold text-burgundy-deep hover:bg-[#d4b273] shadow-sm",
};
export type Variant = keyof typeof variants;

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Card({ className = "", children, ...props }: ComponentProps<"div">) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(36,28,32,0.06)] sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "gold" | "success" | "danger" | "burgundy"; children: ReactNode }) {
  const tones = {
    neutral: "bg-ivory text-muted border-line",
    gold: "bg-[#f6ecd9] text-gold-ink border-gold",
    success: "bg-[#e6f3ea] text-success border-[#9fcdb0]",
    danger: "bg-[#fbe9eb] text-danger border-[#efb4bb]",
    burgundy: "bg-burgundy text-white border-burgundy",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Alert({ tone = "info", children, role }: { tone?: "info" | "warning" | "error" | "success"; children: ReactNode; role?: string }) {
  const tones = {
    info: "border-line bg-white text-ink",
    warning: "border-gold bg-[#fbf3e3] text-ink",
    error: "border-[#efb4bb] bg-[#fbe9eb] text-danger",
    success: "border-[#9fcdb0] bg-[#e6f3ea] text-success",
  };
  return (
    <div role={role ?? (tone === "error" ? "alert" : "status")} className={`rounded-xl border-l-4 border p-4 ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, id, as: Tag = "h2" }: { children: ReactNode; id?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <div className="mb-4">
      <Tag id={id} className={Tag === "h1" ? "text-3xl font-bold text-burgundy-deep sm:text-4xl" : "text-2xl font-bold text-burgundy-deep"}>
        {children}
      </Tag>
      <span className="gold-rule mt-2" aria-hidden />
    </div>
  );
}

export const inputClass =
  "block w-full min-h-12 rounded-xl border-2 border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-burgundy focus:outline-none";

export function Field({ label, hint, error, htmlFor, children }: { label: string; hint?: string; error?: string | null; htmlFor: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && <p id={`${htmlFor}-hint`} className="text-sm text-muted">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm font-semibold text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
