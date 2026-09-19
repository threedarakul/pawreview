"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/pawreview/site-header";
import { StatusBadge } from "@/components/pawreview/status-badge";
import { Button } from "@/components/ui/button";
import { Employee } from "@/lib/db/schema";
import { formatThaiDate, getReviewStatus } from "@/lib/status";

const THAI_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function toBuddhistYear(year: number) {
  return year + 543;
}

export function SummaryClient({ employees }: { employees: Employee[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const employeesByMonth = useMemo(() => {
    const map = new Map<number, Employee[]>();
    for (let m = 0; m < 12; m++) map.set(m, []);
    employees.forEach((emp) => {
      const due = new Date(emp.reviewDueDate);
      if (due.getFullYear() === year) {
        map.get(due.getMonth())!.push(emp);
      }
    });
    return map;
  }, [employees, year]);

  const selectedEmployees = (employeesByMonth.get(month) ?? []).sort((a, b) =>
    a.reviewDueDate.localeCompare(b.reviewDueDate)
  );

  return (
    <div className="flex min-h-full flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              สรุปวันครบกำหนด Review รายเดือน 📅
            </h1>
            <p className="text-sm text-muted-foreground">
              ดูภาพรวมพนักงานที่ครบกำหนดในแต่ละเดือน เลือกดูเดือน/ปีย้อนหลังได้
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-border bg-card px-2 py-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setYear((y) => y - 1)}
              aria-label="ปีก่อนหน้า"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-heading text-sm font-semibold">
              ปี {toBuddhistYear(year)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setYear((y) => y + 1)}
              aria-label="ปีถัดไป"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-3">
          {THAI_MONTHS.map((label, idx) => {
            const count = employeesByMonth.get(idx)?.length ?? 0;
            const active = idx === month;
            return (
              <button
                key={label}
                onClick={() => setMonth(idx)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 text-xs ${
                    active ? "bg-primary-foreground/20" : "bg-card"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-heading text-lg font-bold text-foreground">
              รายชื่อพนักงานครบกำหนด Review เดือน {THAI_MONTHS[month]}{" "}
              {toBuddhistYear(year)}
            </h2>
            <p className="text-sm text-muted-foreground">
              มีทั้งหมด {selectedEmployees.length} คนในเดือนนี้
            </p>
          </div>

          {selectedEmployees.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
              <span className="text-3xl">🐾</span>
              <p className="text-sm text-muted-foreground">
                ไม่มีพนักงานครบกำหนด review ในเดือนนี้
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {selectedEmployees.map((emp) => (
                <li
                  key={emp.id}
                  className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">{emp.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ครบกำหนด: {formatThaiDate(new Date(emp.reviewDueDate))}
                    </p>
                  </div>
                  <StatusBadge
                    status={getReviewStatus(new Date(emp.reviewDueDate))}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
