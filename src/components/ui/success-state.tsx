'use client';

import React from 'react';
import { CheckCircle2, Award, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface SuccessStateProps {
  title?: string;
  message?: string;
  earnedXp?: number;
  unlockedBadge?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function SuccessState({
  title = 'Тамаша нәтиже!',
  message = 'Тапсырма сәтті орындалды және білім деңгейіңіз артты.',
  earnedXp,
  unlockedBadge,
  primaryActionLabel = 'Келесі қадам',
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/30 dark:to-slate-900 space-y-5 shadow-soft-md animate-in zoom-in-95 duration-300',
        className
      )}
    >
      {/* Background celebration glow */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

      {/* Animated Check Icon */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-glow-emerald">
        <CheckCircle2 className="h-10 w-10 animate-bounce" />
        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-amber-300 animate-spin" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {message}
        </p>
      </div>

      {/* XP or Badge Chips */}
      {(earnedXp || unlockedBadge) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          {earnedXp && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-500 text-white font-black text-xs shadow-soft-xs">
              <Flame className="h-4 w-4 text-amber-100" />
              <span>+{earnedXp} XP Ұпай</span>
            </div>
          )}
          {unlockedBadge && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-soft-xs">
              <Award className="h-4 w-4 text-indigo-200" />
              <span>Жетістік: {unlockedBadge}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        {onPrimaryAction && (
          <Button
            onClick={onPrimaryAction}
            className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-6 py-3 shadow-glow-emerald"
          >
            {primaryActionLabel}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="outline"
            onClick={onSecondaryAction}
            className="rounded-2xl text-xs font-black px-5 py-3"
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
