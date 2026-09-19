"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/pawreview/site-header";
import { StatusBadge } from "@/components/pawreview/status-badge";
import { EmployeeFormDialog } from "@/components/pawreview/employee-form-dialog";
import { DeleteEmployeeDialog } from "@/components/pawreview/delete-employee-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee, SAMPLE_EMPLOYEES } from "@/lib/sample-data";
import { ReviewStatus, daysSince, formatThaiDate, getReviewStatus } from "@/lib/status";

type FilterTab = "all" | ReviewStatus;

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>(SAMPLE_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | undefined>();

  const withStatus = useMemo(
    () =>
      employees.map((emp) => ({
        ...emp,
        status: getReviewStatus(new Date(emp.reviewDueDate)),
      })),
    [employees]
  );

  const counts = useMemo(
    () => ({
      all: withStatus.length,
      normal: withStatus.filter((e) => e.status === "normal").length,
      upcoming: withStatus.filter((e) => e.status === "upcoming").length,
      overdue: withStatus.filter((e) => e.status === "overdue").length,
    }),
    [withStatus]
  );

  const visibleEmployees = useMemo(() => {
    return withStatus
      .filter((emp) => (filter === "all" ? true : emp.status === filter))
      .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.reviewDueDate.localeCompare(b.reviewDueDate));
  }, [withStatus, filter, search]);

  function openAddForm() {
    setEditingEmployee(undefined);
    setFormOpen(true);
  }

  function openEditForm(emp: Employee) {
    setEditingEmployee(emp);
    setFormOpen(true);
  }

  function handleSave(data: Omit<Employee, "id">) {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editingEmployee.id ? { ...e, ...data } : e))
      );
    } else {
      setEmployees((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
    }
  }

  function handleDeleteConfirm() {
    if (!deletingEmployee) return;
    setEmployees((prev) => prev.filter((e) => e.id !== deletingEmployee.id));
    setDeletingEmployee(undefined);
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              หน้ารวมพนักงานที่ต้อง Review 📋
            </h1>
            <p className="text-sm text-muted-foreground">
              เห็นสถานะของแต่ละคนพร้อมจำนวนวันที่ผ่านมา อัปเดตอัตโนมัติทุกวัน
            </p>
          </div>
          <Button onClick={openAddForm} className="gap-2 self-start">
            <Plus className="h-4 w-4" />
            เพิ่มพนักงาน
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="พนักงานทั้งหมด" value={counts.all} />
          <StatCard
            label="เกินกำหนด"
            value={counts.overdue}
            tone="overdue"
          />
          <StatCard
            label="ใกล้ครบกำหนด"
            value={counts.upcoming}
            tone="upcoming"
          />
          <StatCard label="ปกติ" value={counts.normal} tone="normal" />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
            <TabsList>
              <TabsTrigger value="all">ทั้งหมด ({counts.all})</TabsTrigger>
              <TabsTrigger value="overdue">
                เกินกำหนด ({counts.overdue})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                ใกล้ครบกำหนด ({counts.upcoming})
              </TabsTrigger>
              <TabsTrigger value="normal">ปกติ ({counts.normal})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="ค้นหาชื่อพนักงาน..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {visibleEmployees.length === 0 ? (
            <EmptyState hasAnyEmployee={employees.length > 0} onAdd={openAddForm} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อพนักงาน</TableHead>
                  <TableHead>วันเริ่มงาน</TableHead>
                  <TableHead>วันครบกำหนด Review</TableHead>
                  <TableHead>วันที่ผ่านมา</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium text-foreground">
                      {emp.name}
                    </TableCell>
                    <TableCell>{formatThaiDate(new Date(emp.startDate))}</TableCell>
                    <TableCell>
                      {formatThaiDate(new Date(emp.reviewDueDate))}
                    </TableCell>
                    <TableCell>
                      {daysSince(new Date(emp.startDate))} วัน
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={emp.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(emp)}
                          aria-label="แก้ไข"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingEmployee(emp)}
                          aria-label="ลบ"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        employee={editingEmployee}
        onSave={handleSave}
      />
      <DeleteEmployeeDialog
        open={!!deletingEmployee}
        onOpenChange={(open) => !open && setDeletingEmployee(undefined)}
        employeeName={deletingEmployee?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: ReviewStatus;
}) {
  const toneClass = tone
    ? {
        normal: "border-status-normal-foreground/20",
        upcoming: "border-status-upcoming-foreground/20",
        overdue: "border-status-overdue-foreground/20",
      }[tone]
    : "border-border";

  return (
    <div
      className={`rounded-xl border bg-card p-4 ${toneClass}`}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-heading text-2xl font-bold text-foreground">
        {value} <span className="text-sm font-normal text-muted-foreground">คน</span>
      </p>
    </div>
  );
}

function EmptyState({
  hasAnyEmployee,
  onAdd,
}: {
  hasAnyEmployee: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="text-3xl">🐾</span>
      {hasAnyEmployee ? (
        <p className="text-sm text-muted-foreground">
          ไม่พบพนักงานที่ตรงกับเงื่อนไขที่เลือก
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            ยังไม่มีพนักงานในระบบ กด + เพื่อเพิ่มคนแรก
          </p>
          <Button onClick={onAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            เพิ่มพนักงาน
          </Button>
        </>
      )}
    </div>
  );
}
