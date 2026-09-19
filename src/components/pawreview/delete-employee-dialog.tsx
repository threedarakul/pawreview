"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteEmployeeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName?: string;
  onConfirm: () => void;
};

export function DeleteEmployeeDialog({
  open,
  onOpenChange,
  employeeName,
  onConfirm,
}: DeleteEmployeeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading">
            ลบข้อมูลพนักงานคนนี้เลยไหม
          </AlertDialogTitle>
          <AlertDialogDescription>
            {employeeName ? `"${employeeName}" ` : ""}
            จะถูกลบออกจากระบบทันที และกู้คืนไม่ได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            ลบเลย
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
