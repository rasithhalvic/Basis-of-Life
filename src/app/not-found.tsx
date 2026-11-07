import Link from "next/link";
import { getT } from "@/i18n/server";

export default async function NotFound() {
  const { t } = await getT();
  return (
    <main id="main" className="grid min-h-[60dvh] place-items-center px-4 py-16 text-center">
      <div>
        <h1 className="text-4xl font-bold text-burgundy-deep">{t("common.notFound")}</h1>
        <span className="gold-rule mx-auto mt-3" aria-hidden />
        <p className="mt-4 text-muted">{t("common.notFoundLead")}</p>
        <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-burgundy px-5 font-semibold text-white">
          {t("nav.home")}
        </Link>
      </div>
    </main>
  );
}
