'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, HelpCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Қателік орын алды',
  message = 'Сервермен байланыс кезінде немесе деректерді өңдеуде кедергі пайда болды. Қайта көріңіз.',
  errorCode,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-4 shadow-soft-xs',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-400 shadow-soft-xs">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base font-black text-rose-950 dark:text-rose-200">
          {title}
        </h3>
        <p className="text-xs text-rose-700 dark:text-rose-300 font-medium leading-relaxed">
          {message}
        </p>
        {errorCode && (
          <p className="text-[10px] font-mono text-rose-400 dark:text-rose-500 pt-1">
            Код: {errorCode}
          </p>
        )}
      </div>

      {onRetry && (
        <div className="pt-2">
          <Button
            onClick={onRetry}
            className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-5 py-2.5 shadow-soft-xs"
          >
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Қайта көру
          </Button>
        </div>
      )}
    </div>
  );
}
