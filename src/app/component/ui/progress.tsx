"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/app/lib/utils";

function getProgressColor(progress: number) {
  if (progress === 100) return "bg-[#3b82f6]";         // Green
  if (progress >= 75) return "bg-[#10b981]";           // Light Green
  if (progress >= 50) return "bg-[#eab308]";           // Orange
  if (progress >= 25) return "bg-[#f97316]";           // Red
  return "bg-[#ef4444]";                               // Dark Red
}


interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value: number;
}

function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all",
          getProgressColor(value)
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
