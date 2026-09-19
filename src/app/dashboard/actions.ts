"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { employees } from "@/lib/db/schema";

export type EmployeeInput = {
  name: string;
  startDate: string;
  reviewDueDate: string;
};

export type ActionResult = { error: string } | { success: true };

function validate(input: EmployeeInput): string | null {
  if (!input.name.trim() || !input.startDate || !input.reviewDueDate) {
    return "กรุณากรอกข้อมูลให้ครบทั้ง 3 ช่อง";
  }
  if (input.reviewDueDate <= input.startDate) {
    return "วันครบกำหนด review ต้องอยู่หลังวันเริ่มงาน";
  }
  return null;
}

export async function createEmployee(
  input: EmployeeInput
): Promise<ActionResult> {
  const error = validate(input);
  if (error) return { error };

  await db.insert(employees).values({
    name: input.name.trim(),
    startDate: input.startDate,
    reviewDueDate: input.reviewDueDate,
  });

  revalidatePath("/dashboard");
  revalidatePath("/summary");
  return { success: true };
}

export async function updateEmployee(
  id: string,
  input: EmployeeInput
): Promise<ActionResult> {
  const error = validate(input);
  if (error) return { error };

  await db
    .update(employees)
    .set({
      name: input.name.trim(),
      startDate: input.startDate,
      reviewDueDate: input.reviewDueDate,
    })
    .where(eq(employees.id, id));

  revalidatePath("/dashboard");
  revalidatePath("/summary");
  return { success: true };
}
