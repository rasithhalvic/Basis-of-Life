// Server-only environment access. Never import this from client components.

function required(name: string, minLength = 1): string {
  const value = process.env[name];
  if (!value || value.length < minLength) {
    throw new Error(`Environment variable ${name} is missing or too short (min ${minLength}).`);
  }
  return value;
}

export const env = {
  get isProduction() {
    return process.env.NODE_ENV === "production" && process.env.APP_ENV !== "development";
  },
  get appEnv(): "development" | "test" | "production" {
    const v = process.env.APP_ENV;
    return v === "development" || v === "test" ? v : "production";
  },
  get participantSecret() {
    return required("PARTICIPANT_TOKEN_SECRET", 32);
  },
  /** Fallback public URL used when the admin has not configured one in settings. */
  get publicBaseUrl() {
    return process.env.PUBLIC_BASE_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  },
  /** Additional allowed origins for state-changing requests (comma separated). */
  get allowedOrigins(): string[] {
    return (process.env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  },
  /** Only trust X-Forwarded-For when running behind a known reverse proxy. */
  get trustProxy() {
    return process.env.TRUST_PROXY === "true";
  },
  get secureCookies() {
    return process.env.NODE_ENV === "production" && process.env.INSECURE_COOKIES !== "true";
  },
};
