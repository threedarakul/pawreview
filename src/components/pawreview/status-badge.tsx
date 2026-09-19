import { ReviewStatus, STATUS_LABEL } from "@/lib/status";
import { cn } from "@/lib/utils";

const STATUS_CLASSES: Record<ReviewStatus, string> = {
  normal: "bg-status-normal text-status-normal-foreground",
  upcoming: "bg-status-upcoming text-status-upcoming-foreground",
  overdue: "bg-status-overdue text-status-overdue-foreground",
};

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-heading text-xs font-semibold",
        STATUS_CLASSES[status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}
