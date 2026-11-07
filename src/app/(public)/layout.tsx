import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { getLocale } from "@/i18n/server";
import { prisma } from "@/server/db";
import { getPublicSettings } from "@/server/services/settings";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const [settings, sampleCount] = await Promise.all([
    getPublicSettings(locale),
    prisma.pioneer.count({ where: { isPublished: true, dataOrigin: { not: "PRODUCTION" } } }),
  ]);
  return (
    <>
      <SiteHeader siteName={settings.name} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter hasSample={sampleCount > 0} />
    </>
  );
}
