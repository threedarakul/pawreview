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
import { Employee } from "@/lib/sample-data";

type EmployeeFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  onSave: (employee: Omit<Employee, "id">) => void;
};

const emptyForm = { name: "", startDate: "", reviewDueDate: "" };

export function EmployeeFormDialog({
  open,
  onOpenChange,
  employee,
  onSave,
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
}: {
  employee?: Employee;
  onSave: (employee: Omit<Employee, "id">) => void;
  onClose: () => void;
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
    onSave(form);
    onClose();
  }

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

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>
          ยกเลิก
        </Button>
        <Button onClick={handleSave}>บันทึกข้อมูล</Button>
      </DialogFooter>
    </>
  );
}
