import QRCode from "qrcode";
import JSZip from "jszip";

export function pioneerUrl(baseUrl: string, slug: string) {
  return `${baseUrl.replace(/\/+$/, "")}/pioneers/${encodeURIComponent(slug)}`;
}

/** Flags base URLs that must not be printed on posters. */
export function baseUrlWarnings(baseUrl: string): string[] {
  const warnings: string[] = [];
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return ["The public base URL is not a valid URL."];
  }
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".local") || /^(10|192\.168|172\.(1[6-9]|2\d|3[01]))\./.test(host)) {
    warnings.push(`"${host}" is a local address. Phones scanning a printed poster cannot reach it.`);
  }
  if (/\.vercel\.app$|\.netlify\.app$|\.onrender\.com$|\.pages\.dev$|\.ngrok|preview|staging/.test(host)) {
    warnings.push(`"${host}" looks like a preview or temporary deployment URL. Use the final production domain for printing.`);
  }
  if (url.protocol !== "https:") warnings.push("The URL does not use HTTPS.");
  if (url.pathname !== "/" && url.pathname !== "") warnings.push("The base URL contains a path; check that this is intended.");
  return warnings;
}

const QR_OPTIONS = { errorCorrectionLevel: "Q" as const, margin: 2, color: { dark: "#241C20", light: "#FFFFFF" } };

export function qrSvg(url: string) {
  return QRCode.toString(url, { ...QR_OPTIONS, type: "svg" });
}

export function qrPng(url: string, width = 1024) {
  return QRCode.toBuffer(url, { ...QR_OPTIONS, type: "png", width });
}

export async function qrZip(baseUrl: string, pioneers: { slug: string; sortOrder: number; name: string }[]) {
  const zip = new JSZip();
  const manifest = ["number,slug,name,url"];
  for (const [i, p] of pioneers.entries()) {
    const url = pioneerUrl(baseUrl, p.slug);
    const prefix = `${String(i + 1).padStart(2, "0")}-${p.slug}`;
    zip.file(`svg/${prefix}.svg`, await qrSvg(url));
    zip.file(`png/${prefix}.png`, await qrPng(url));
    manifest.push(`${i + 1},${p.slug},"${p.name.replace(/"/g, '""')}",${url}`);
  }
  zip.file("manifest.csv", manifest.join("\r\n"));
  zip.file(
    "README.txt",
    `QR codes for ${pioneers.length} pioneer pages.\r\nBase URL: ${baseUrl}\r\nGenerated: ${new Date().toISOString()}\r\n` +
      "Test-scan every printed poster with at least two phones before the exhibition opens.\r\n",
  );
  return zip.generateAsync({ type: "nodebuffer" });
}
