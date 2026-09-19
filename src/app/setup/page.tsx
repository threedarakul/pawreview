"use client";

import { useActionState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpOwner } from "./actions";

export default function SetupPage() {
  const [state, formAction, isPending] = useActionState(signUpOwner, null);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-2">
        <span className="text-5xl">🐾</span>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          ตั้งค่าบัญชีเจ้าของระบบ
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          ทำครั้งเดียวตอนเริ่มใช้งาน PawReview
        </p>
      </div>

      <form
        action={formAction}
        className="mt-8 flex w-full max-w-md flex-col gap-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">ชื่อของคุณ</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" name="name" placeholder="เช่น คุณแพรวา" className="pl-9" required />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">อีเมลเจ้าของระบบ</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="hr.admin@company.com"
              className="pl-9"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">ตั้งรหัสผ่าน</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="อย่างน้อย 8 ตัวอักษร"
              className="pl-9"
              minLength={8}
              required
            />
          </div>
        </div>

        {state?.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button type="submit" size="lg" className="rounded-full" disabled={isPending}>
          {isPending ? "กำลังสร้างบัญชี..." : "สร้างบัญชีเจ้าของระบบ"}
        </Button>
      </form>
    </div>
  );
}
