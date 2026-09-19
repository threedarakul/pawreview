"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-2">
        <span className="text-5xl">🐰</span>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          เข้าสู่ระบบ PawReview
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          ระบบติดตามการประเมินพนักงานสำหรับ HR (เจ้าของระบบ)
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full max-w-md flex-col gap-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">อีเมล (Email)</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="hr.admin@company.com"
              className="pl-9"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">รหัสผ่าน (Password)</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="px-9"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" defaultChecked className="accent-primary" />
            จำฉันไว้ในระบบ
          </label>
          <Link href="#" className="font-medium text-primary hover:underline">
            ลืมรหัสผ่าน?
          </Link>
        </div>

        <Button type="submit" size="lg" className="rounded-full">
          เข้าสู่ระบบ 🐾
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          ข้อมูลปลอดภัย ยืนยันตัวตนด้วย Neon Auth เจ้าของระบบคนเดียว
        </p>
      </form>
    </div>
  );
}
