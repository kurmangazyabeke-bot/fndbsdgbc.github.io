'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-2xl bg-slate-200/80 dark:bg-slate-800/80', className)}
      {...props}
    />
  );
}

/** Pre-built Card Skeleton */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-3xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-soft-xs', className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4 rounded-md" />
      <div className="pt-2 flex items-center gap-2">
        <Skeleton className="h-9 w-24 rounded-xl" />
        <Skeleton className="h-9 w-20 rounded-xl" />
      </div>
    </div>
  );
}

/** Pre-built Question Item Skeleton */
export function QuestionSkeleton() {
  return (
    <div className="rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 shadow-soft-xs">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-3 text-center py-4">
        <Skeleton className="h-8 w-3/4 mx-auto rounded-xl" />
        <Skeleton className="h-4 w-1/2 mx-auto rounded-md" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
      </div>
    </div>
  );
}

/** Pre-built Table Skeleton */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-soft-xs">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
        <Skeleton className="h-5 w-40 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-16 rounded-md hidden sm:block" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Pre-built Chart Skeleton */
export function ChartSkeleton() {
  return (
    <div className="rounded-3xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-soft-xs">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-48 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="h-64 flex items-end justify-between gap-3 pt-4 px-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full rounded-t-xl"
            style={{ height: `${Math.max(25, (i + 1) * 12 + 15)}%` }}
          />
        ))}
      </div>
    </div>
  );
}
