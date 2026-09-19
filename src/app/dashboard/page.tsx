import { DashboardClient } from "@/components/pawreview/dashboard-client";
import { SiteHeader } from "@/components/pawreview/site-header";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!process.env.DATABASE_URL) {
    return (
      <div className="flex min-h-full flex-col bg-background">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="text-3xl">🐾</span>
          <p className="text-sm text-muted-foreground">
            ฐานข้อมูลยังไม่พร้อมใช้งาน กรุณาตั้งค่า Neon ก่อน
          </p>
        </main>
      </div>
    );
  }

  const { db } = await import("@/lib/db");
  const { employees } = await import("@/lib/db/schema");
  const rows = await db.select().from(employees);

  return <DashboardClient employees={rows} />;
}
