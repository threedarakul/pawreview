"use server";

import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function signUpOwner(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (email.trim().toLowerCase() !== process.env.OWNER_EMAIL?.toLowerCase()) {
    return {
      error: "ระบบนี้เปิดให้เฉพาะอีเมลเจ้าของระบบเท่านั้น ไม่สามารถสมัครด้วยอีเมลอื่นได้",
    };
  }

  const { error } = await auth.signUp.email({ email, name, password });

  if (error) {
    return { error: error.message || "สร้างบัญชีไม่สำเร็จ ลองใหม่อีกครั้ง" };
  }

  redirect("/dashboard");
}
