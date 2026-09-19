import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/pawreview/status-badge";
import { cn } from "@/lib/utils";

const PREVIEW_ROWS = [
  { name: "ณัฏฐ์ ริมทะเล", due: "27 ม.ค. 2568", status: "upcoming" as const },
  { name: "ธัญวัฒน์ สุขสำราญ", due: "10 ก.พ. 2568", status: "overdue" as const },
  { name: "เมธาวี เงินตรา", due: "12 มี.ค. 2568", status: "normal" as const },
];

const FEATURES = [
  {
    icon: "🚦",
    title: "แจ้งเตือนสถานะ 3 ระดับ",
    desc: "ปกติ / ใกล้ครบกำหนด (≤7 วัน) / เกินกำหนด เห็นชัดด้วยสีทันทีที่เปิดหน้ารวม",
  },
  {
    icon: "📆",
    title: "นับวันอัตโนมัติ",
    desc: "ระบบคำนวณจำนวนวันตั้งแต่วันเริ่มงานให้เองทุกวัน ไม่ต้องนั่งนับเอง",
  },
  {
    icon: "📊",
    title: "สรุปภาพรวมรายเดือน",
    desc: "ดูว่าเดือนไหนมีใครครบกำหนด review บ้าง วางแผนล่วงหน้าได้ง่ายขึ้น",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="font-heading text-lg font-bold text-foreground">
            PawReview
          </span>
        </div>
        <Link href="/login" className={cn(buttonVariants(), "rounded-full")}>
          เข้าสู่ระบบ
        </Link>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-16 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 font-heading text-xs font-semibold text-primary">
            🐾 HR Probation &amp; Review Tracker
          </span>
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            บอกลาการตกหล่นวัน Review พนักงาน
            <br />
            ให้เจ้าเหมียวช่วยเตือนใจ 🐾
          </h1>
          <p className="max-w-xl text-muted-foreground">
            ระบบสำหรับ HR คนเดียว คอยดูแลวันครบกำหนด review ของพนักงานทุกคน
            เห็นสถานะและจำนวนวันที่ผ่านมาทันที ไม่ต้องมานั่งไล่เช็คเอง
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
            >
              เข้าสู่ระบบจัดการ HR
            </Link>
            <Link
              href="#features"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-full"
              )}
            >
              ดูฟีเจอร์คร่าวๆ
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-4 pb-16">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-status-overdue-foreground/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-upcoming-foreground/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-normal-foreground/60" />
              <span className="ml-2 text-xs text-muted-foreground">
                ตัวอย่างหน้ารวมพนักงาน (HR Live Preview)
              </span>
            </div>
            <ul className="divide-y divide-border">
              {PREVIEW_ROWS.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {row.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ครบกำหนด: {row.due}
                    </p>
                  </div>
                  <StatusBadge status={row.status} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="features" className="bg-muted/40 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">
              ทำงานง่าย สบายใจ ไม่ต้องกังวลเรื่องกำหนดวัน
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="mt-2 font-heading font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl bg-primary px-8 py-10 text-center text-primary-foreground">
            <h2 className="font-heading text-2xl font-bold">
              เริ่มต้นใช้งาน PawReview วันนี้
            </h2>
            <p className="text-primary-foreground/90">
              ให้ระบบช่วยดูแลวันครบกำหนด review แทนคุณ เพื่อไม่ให้พนักงานคนไหนถูกลืม
            </p>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "rounded-full"
              )}
            >
              เข้าสู่ระบบตอนนี้เลย
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        🐾 PawReview — ระบบติดตามการประเมินพนักงาน
      </footer>
    </div>
  );
}
