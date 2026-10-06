import * as React from 'react';
import { cn } from './card';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'purple' | 'blue';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}
