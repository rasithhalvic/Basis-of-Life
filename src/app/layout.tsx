import type { Metadata, Viewport } from "next";
import { Noto_Sans_Sinhala, Noto_Serif_Sinhala, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { getLocale } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
import { translate } from "@/i18n/messages";

const heading = Playfair_Display({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const body = Source_Sans_3({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const sinhala = Noto_Sans_Sinhala({ variable: "--font-sinhala", subsets: ["sinhala"], display: "swap" });
const sinhalaSerif = Noto_Serif_Sinhala({ variable: "--font-sinhala-serif", subsets: ["sinhala"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Pioneers of Medicine — Exhibition", template: "%s — Exhibition" },
  description: "Exhibition guide to pioneers of medicine and a general knowledge quiz.",
};

export const viewport: Viewport = {
  themeColor: "#4A0012",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${heading.variable} ${body.variable} ${sinhala.variable} ${sinhalaSerif.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-50 rounded-lg bg-white p-3 font-semibold text-burgundy focus:not-sr-only focus:absolute focus:left-3 focus:top-3">
          {translate(locale, "site.skip")}
        </a>
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
