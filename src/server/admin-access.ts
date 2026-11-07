/**
 * Optional "local-only admin" mode for temporary public previews (tunnels).
 *
 * When ADMIN_LOCAL_ONLY=true, administrator pages, admin APIs and the login
 * endpoint answer only requests made directly to localhost. Anything that
 * arrives through a tunnel or proxy is refused. Pure function: no Next.js or
 * database imports, so it can run in proxy.ts as well as in route handlers
 * and layouts.
 */

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
const LOOPBACK_IPS = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);
// Set by tunnels/CDNs (cloudflared, ngrok, proxies). Next.js itself only adds x-forwarded-*.
const TUNNEL_HEADERS = ["cf-connecting-ip", "cf-ray", "cdn-loop", "forwarded", "x-real-ip", "true-client-ip", "ngrok-trace-id"];

function hostnameOf(host: string) {
  const h = host.trim().toLowerCase();
  return h.startsWith("[") ? h.slice(0, h.indexOf("]") + 1) : h.split(":")[0];
}

export function adminLocalOnly() {
  return process.env.ADMIN_LOCAL_ONLY === "true";
}

export function isDirectLocalRequest(headers: Headers) {
  if (!LOCAL_HOSTNAMES.has(hostnameOf(headers.get("host") ?? ""))) return false;
  const fwdHost = headers.get("x-forwarded-host");
  if (fwdHost && fwdHost.split(",").some((h) => !LOCAL_HOSTNAMES.has(hostnameOf(h)))) return false;
  const fwdFor = headers.get("x-forwarded-for");
  if (fwdFor && fwdFor.split(",").some((ip) => !LOOPBACK_IPS.has(ip.trim()))) return false;
  return TUNNEL_HEADERS.every((h) => !headers.has(h));
}

/** True when the admin area must be hidden from this request. */
export function adminBlocked(headers: Headers) {
  return adminLocalOnly() && !isDirectLocalRequest(headers);
}
