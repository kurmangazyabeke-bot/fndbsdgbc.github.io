'use client';

import React from 'react';
import { AlertTriangle, Info, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info' | 'primary';
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Иә, растаймын',
  cancelLabel = 'Бас тарту',
  variant = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: AlertTriangle,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
      confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
      confirmBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    info: {
      icon: Info,
      iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
      confirmBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    primary: {
      icon: HelpCircle,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
      confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  }[variant];

  const Icon = variantStyles.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-soft-lg space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Top Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${variantStyles.iconBg}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-2xl text-xs font-black px-4 py-2.5"
          >
            {cancelLabel}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-2xl text-xs font-black px-5 py-2.5 shadow-soft-xs ${variantStyles.confirmBtn}`}
          >
            {isLoading ? 'Өңделуде…' : confirmLabel}
          </Button>
        </div>

      </div>
    </div>
  );
}
