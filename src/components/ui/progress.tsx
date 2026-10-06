import * as React from 'react';
import { cn } from './card';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorColor?: string;
}

export function Progress({ className, value = 0, max = 100, indicatorColor = 'bg-emerald-500', ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('relative h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', className)} {...props}>
      <div
        className={cn('h-full w-full flex-1 transition-all duration-500 ease-out', indicatorColor)}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
