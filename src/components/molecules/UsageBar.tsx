import React from "react";
import Progress from "../atoms/Progress/Progress";
import { cn } from "@/lib/utils";

export interface UsageBarProps {
  label: string;
  used: number;
  total: number;
  unit?: string;
  className?: string;
  thresholds?: {
    warning: number;
    danger: number;
  };
}

/**
 * UsageBar molecule that displays usage vs entitlement with a progress bar and textual details.
 */
const UsageBar: React.FC<UsageBarProps> = ({
  label,
  used,
  total,
  unit = "units",
  className,
  thresholds = { warning: 70, danger: 90 },
}) => {
  const percentage = Math.min((used / total) * 100, 100);

  let indicatorColor = "bg-primary";
  if (percentage >= thresholds.danger) {
    indicatorColor = "bg-destructive";
  } else if (percentage >= thresholds.warning) {
    indicatorColor = "bg-orange-500";
  }

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <div className="flex justify-between items-end">
        <span className="text-sm font-medium text-zinc-700">{label}</span>
        <span className="text-xs text-zinc-500">
          {used.toLocaleString()} / {total.toLocaleString()} {unit}
        </span>
      </div>
      <Progress
        value={percentage}
        indicatorColor={indicatorColor}
        label={`${percentage.toFixed(1)}% used`}
        labelColor={
          percentage >= thresholds.warning ? "text-zinc-600" : "text-zinc-400"
        }
      />
    </div>
  );
};

export default UsageBar;
