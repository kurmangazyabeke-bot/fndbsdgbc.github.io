'use client';

import React, { useEffect, useState } from 'react';
import { Brain, Sparkles, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export type AIProcessingStatus =
  | 'analyzing_answer' // «AI оқушы жауабын талдап жатыр…»
  | 'calculating_adaptive' // «AI келесі адаптивті деңгейді есептеп жатыр…»
  | 'generating_explanation' // «AI түсіндіру тәсілін генерациялауда…»
  | 'diagnosing_mistake' // «AI қате үлгісін диагностикалауда…»
  | 'synthesizing_pedagogy' // «AI педагогикалық синтез құруда…»
  | 'custom';

interface AILoadingIndicatorProps {
  status?: AIProcessingStatus;
  customStatusText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusMessages: Record<AIProcessingStatus, string> = {
  analyzing_answer: 'AI оқушы жауабын талдап жатыр…',
  calculating_adaptive: 'AI келесі адаптивті деңгейді есептеп жатыр…',
  generating_explanation: 'AI түсіндіру тәсілін генерациялауда…',
  diagnosing_mistake: 'AI қате үлгісін диагностикалауда…',
  synthesizing_pedagogy: 'AI педагогикалық синтез құруда…',
  custom: 'AI өңдеуде…',
};

export function AILoadingIndicator({
  status = 'analyzing_answer',
  customStatusText,
  size = 'md',
  className,
}: AILoadingIndicatorProps) {
  const [pulseState, setPulseState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseState((prev) => (prev + 1) % 3);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const displayText = customStatusText || statusMessages[status];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-6 text-center space-y-4 rounded-3xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-soft-xs',
        className
      )}
    >
      {/* Animated Brain with Glowing Orbs */}
      <div className="relative">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-30 blur-lg animate-pulse" />
        
        <div
          className={cn(
            'relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 text-white shadow-soft-md transition-transform duration-500',
            size === 'sm' && 'h-10 w-10',
            size === 'md' && 'h-14 w-14',
            size === 'lg' && 'h-20 w-20'
          )}
        >
          <Brain
            className={cn(
              'animate-pulse',
              size === 'sm' && 'h-5 w-5',
              size === 'md' && 'h-7 w-7',
              size === 'lg' && 'h-10 w-10'
            )}
          />
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-300 animate-spin" />
        </div>
      </div>

      {/* Dynamic Status Text */}
      <div className="space-y-1">
        <p className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5">
          <span>{displayText}</span>
          <span className="inline-flex">
            <span className={cn('transition-opacity', pulseState >= 0 ? 'opacity-100' : 'opacity-20')}>.</span>
            <span className={cn('transition-opacity', pulseState >= 1 ? 'opacity-100' : 'opacity-20')}>.</span>
            <span className={cn('transition-opacity', pulseState >= 2 ? 'opacity-100' : 'opacity-20')}>.</span>
          </span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          EdTech AI моделі ең тиімді оқыту шешімін таңдауда
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5 pt-1">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

/** Generic Simple Spinner */
export function LoadingSpinner({
  size = 'md',
  className,
  label,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-2 p-4 text-slate-600 dark:text-slate-300', className)}>
      <Loader2
        className={cn(
          'animate-spin text-emerald-600',
          size === 'sm' && 'h-4 w-4',
          size === 'md' && 'h-6 w-6',
          size === 'lg' && 'h-8 w-8'
        )}
      />
      {label && <span className="text-xs font-bold">{label}</span>}
    </div>
  );
}
