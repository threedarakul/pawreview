export type ReviewStatus = "normal" | "upcoming" | "overdue";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysSince(startDate: Date, today: Date = new Date()): number {
  const diff = startOfDay(today).getTime() - startOfDay(startDate).getTime();
  return Math.max(0, Math.round(diff / MS_PER_DAY));
}

export function daysUntil(dueDate: Date, today: Date = new Date()): number {
  const diff = startOfDay(dueDate).getTime() - startOfDay(today).getTime();
  return Math.round(diff / MS_PER_DAY);
}

export function getReviewStatus(
  dueDate: Date,
  today: Date = new Date()
): ReviewStatus {
  const remaining = daysUntil(dueDate, today);
  if (remaining < 0) return "overdue";
  if (remaining <= 7) return "upcoming";
  return "normal";
}

export const STATUS_LABEL: Record<ReviewStatus, string> = {
  normal: "ปกติ",
  upcoming: "ใกล้ครบกำหนด",
  overdue: "เกินกำหนด",
};

export function formatThaiDate(date: Date): string {
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
