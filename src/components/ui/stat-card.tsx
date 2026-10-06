import React from 'react';
import { Card } from './card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  variant?: 'default' | 'success' | 'accent' | 'purple';
}

export function StatCard({ title, value, subtitle, icon, trend, variant = 'default' }: StatCardProps) {
  const borderVariants = {
    default: 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900',
    success: 'border-emerald-100 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20',
    accent: 'border-indigo-100 bg-indigo-50/40 dark:border-indigo-900 dark:bg-indigo-950/20',
    purple: 'border-purple-100 bg-purple-50/40 dark:border-purple-900 dark:bg-purple-950/20',
  };

  return (
    <Card className={`rounded-3xl p-5 shadow-soft-xs transition-all hover:shadow-soft-md ${borderVariants[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          {trend}
        </div>
      )}
    </Card>
  );
}
