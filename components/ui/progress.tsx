// @/components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  indicatorClassName?: string;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, indicatorClassName, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className={cn("h-full w-full flex-1 transition-all bg-primary", indicatorClassName)}
        style={{ width: `${value}%` }}
      />
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress };