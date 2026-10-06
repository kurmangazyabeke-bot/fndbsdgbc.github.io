'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Brain,
  X
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'ai';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  durationMs?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  ai: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, durationMs = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, message, durationMs };

      setToasts((prev) => [...prev, newToast]);

      if (durationMs > 0) {
        setTimeout(() => {
          removeToast(id);
        }, durationMs);
      }
    },
    [removeToast]
  );

  const success = useCallback((message: string, title?: string) => {
    showToast({ type: 'success', message, title });
  }, [showToast]);

  const error = useCallback((message: string, title?: string) => {
    showToast({ type: 'error', message, title });
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    showToast({ type: 'info', message, title });
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    showToast({ type: 'warning', message, title });
  }, [showToast]);

  const ai = useCallback((message: string, title?: string) => {
    showToast({ type: 'ai', message, title: title || 'MathQadam AI' });
  }, [showToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
        success,
        error,
        info,
        warning,
        ai,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const typeConfig = {
          success: {
            icon: CheckCircle2,
            bg: 'bg-emerald-950/90 border-emerald-600/60 text-emerald-100',
            iconColor: 'text-emerald-400',
          },
          error: {
            icon: XCircle,
            bg: 'bg-rose-950/90 border-rose-600/60 text-rose-100',
            iconColor: 'text-rose-400',
          },
          warning: {
            icon: AlertTriangle,
            bg: 'bg-amber-950/90 border-amber-600/60 text-amber-100',
            iconColor: 'text-amber-400',
          },
          info: {
            icon: Info,
            bg: 'bg-indigo-950/90 border-indigo-600/60 text-indigo-100',
            iconColor: 'text-indigo-400',
          },
          ai: {
            icon: Brain,
            bg: 'bg-slate-900/95 border-emerald-500/60 text-white',
            iconColor: 'text-emerald-400',
          },
        }[toast.type];

        const Icon = typeConfig.icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-soft-lg transition-all animate-in slide-in-from-bottom-3 duration-300 ${typeConfig.bg}`}
          >
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${typeConfig.iconColor}`} />
            
            <div className="flex-1 space-y-0.5">
              {toast.title && (
                <p className="text-xs font-black tracking-tight leading-tight">
                  {toast.title}
                </p>
              )}
              <p className="text-xs font-medium leading-relaxed opacity-90">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-white/60 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
