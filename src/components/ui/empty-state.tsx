'use client';

import React from 'react';
import {
  Inbox,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  History,
  Plus,
  Sparkles,
  SearchX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'success' | 'indigo' | 'amber';
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const variantStyles = {
    default: 'bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 space-y-4 shadow-soft-xs',
        className
      )}
    >
      <div className={cn('flex h-16 w-16 items-center justify-center rounded-3xl shadow-soft-xs', variantStyles[variant])}>
        <Icon className="h-8 w-8" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button
            onClick={onAction}
            className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-5 py-2.5 shadow-soft-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

/** Pre-configured Empty States */

export function NoStudentsEmptyState({ onAddStudent }: { onAddStudent?: () => void }) {
  return (
    <EmptyState
      icon={Users}
      title="Әзірге оқушылар қосылмаған"
      description="Бұл сыныпқа оқушы қосыңыз немесе жеке PIN-код арқылы шақырыңыз."
      actionLabel="Оқушы қосу"
      onAction={onAddStudent}
      variant="indigo"
    />
  );
}

export function NoClassesEmptyState({ onCreateClass }: { onCreateClass?: () => void }) {
  return (
    <EmptyState
      icon={GraduationCap}
      title="Сыныптар табылмады"
      description="Жаңа сынып ашып, оқушыларға математикалық даму траекториясын бастаңыз."
      actionLabel="Жаңа сынып құру"
      onAction={onCreateClass}
      variant="indigo"
    />
  );
}

export function NoAssignmentsEmptyState({ onCreateAssignment }: { onCreateAssignment?: () => void }) {
  return (
    <EmptyState
      icon={BookOpen}
      title="Тапсырмалар тізімі бос"
      description="Оқушыларға AI генераторы немесе жеке тақырыптар бойынша тапсырма беріңіз."
      actionLabel="Тапсырма құрастыру"
      onAction={onCreateAssignment}
      variant="default"
    />
  );
}

export function NoMistakesEmptyState() {
  return (
    <EmptyState
      icon={CheckCircle2}
      title="Қателер жоқ! Барлық дағдылар толық меңгерілген"
      description="Оқушы бұл тақырыптағы барлық есептерді 100% дұрыс орындады. Концептуалды алшақтық анықталмады."
      variant="success"
    />
  );
}

export function NoHistoryEmptyState() {
  return (
    <EmptyState
      icon={History}
      title="Диагностика тарихы әзірге бос"
      description="Алғашқы математикалық тестті бастап, жеке даму көрсеткіштерін қалыптастырыңыз."
      variant="amber"
    />
  );
}
