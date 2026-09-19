"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Employee } from "@/lib/db/schema";
import { EmployeeInput } from "@/app/dashboard/actions";

type EmployeeFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  onSave: (employee: EmployeeInput) => void;
  externalError?: string;
  saving?: boolean;
};

const emptyForm = { name: "", startDate: "", reviewDueDate: "" };

export function EmployeeFormDialog({
  open,
  onOpenChange,
  employee,
  onSave,
  externalError,
  saving,
}: EmployeeFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {open && (
          <EmployeeFormFields
            key={employee?.id ?? "new"}
            employee={employee}
            onSave={onSave}
            onClose={() => onOpenChange(false)}
            externalError={externalError}
            saving={saving}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function EmployeeFormFields({
  employee,
  onSave,
  onClose,
  externalError,
  saving,
}: {
  employee?: Employee;
  onSave: (employee: EmployeeInput) => void;
  onClose: () => void;
  externalError?: string;
  saving?: boolean;
}) {
  const [form, setForm] = useState(
    employee
      ? {
          name: employee.name,
          startDate: employee.startDate,
          reviewDueDate: employee.reviewDueDate,
        }
      : emptyForm
  );
  const [error, setError] = useState("");

  function handleSave() {
    if (!form.name || !form.startDate || !form.reviewDueDate) {
      setError("กรุณากรอกข้อมูลให้ครบทั้ง 3 ช่อง");
      return;
    }
    if (form.reviewDueDate <= form.startDate) {
      setError("วันครบกำหนด review ต้องอยู่หลังวันเริ่มงาน");
      return;
    }
    setError("");
    onSave(form);
  }

  const shownError = error || externalError;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading">
          {employee ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มพนักงานใหม่"}
        </DialogTitle>
        <DialogDescription>
          บันทึกข้อมูลเพื่อเริ่มคำนวณสถานะ review อัตโนมัติ
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="empName">
            ชื่อ-นามสกุลพนักงาน <span className="text-destructive">*</span>
          </Label>
          <Input
            id="empName"
            placeholder="เช่น สมชาย สายขยัน"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="empStartDate">
            วันเริ่มงาน <span className="text-destructive">*</span>
          </Label>
          <Input
            id="empStartDate"
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="empReviewDate">
            วันครบกำหนด Review <span className="text-destructive">*</span>
          </Label>
          <Input
            id="empReviewDate"
            type="date"
            value={form.reviewDueDate}
            onChange={(e) =>
              setForm({ ...form, reviewDueDate: e.target.value })
            }
          />
        </div>

        {shownError && <p className="text-sm text-destructive">{shownError}</p>}
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          ยกเลิก
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </Button>
      </DialogFooter>
    </>
  );
}
