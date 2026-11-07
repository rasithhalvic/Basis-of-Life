import { cookies } from "next/headers";
import { translate, type Locale, type MessageKey } from "./messages";

export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get("lang")?.value;
  return v === "si" ? "si" : "en";
}

export async function getT() {
  const locale = await getLocale();
  return { locale, t: (key: MessageKey, vars?: Record<string, string | number>) => translate(locale, key, vars) };
}
