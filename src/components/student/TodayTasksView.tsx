'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, Play, CheckCircle2 } from 'lucide-react';

interface TodayTasksViewProps {
  onStartPractice: () => void;
}

export function TodayTasksView({ onStartPractice }: TodayTasksViewProps) {
  const tasks = [
    { title: 'Разрядпен қосу есептерін қайталау', levelKaz: '2-Деңгей (Қолдаумен)', status: 'ОРЫНДАЛДЫ', xp: '+50 XP ⭐' },
    { title: 'Ойдағы санды ескеру микро-тренажеры', levelKaz: '2-Деңгей (Базалық)', status: 'БЕЛСЕНДІ', xp: '+70 XP ⭐' },
    { title: 'Бөлшектерді пицца моделімен тану', levelKaz: '3-Деңгей (Контекстік)', status: 'КҮТУДЕ', xp: '+100 XP 👑' },
  ];

  return (
    <div className="space-y-6" role="region" aria-label="Бүгінгі жеке тапсырмалар">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <CalendarCheck className="h-7 w-7 text-emerald-600" aria-hidden="true" /> Бүгінгі Жеке Тапсырмаларың
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold mt-1">
          AI Тәлімгер сенің деңгейіңе арнайы таңдаған бүгінгі 3 жаттығу.
        </p>
      </div>

      <div className="space-y-3.5" role="list" aria-label="Тапсырмалар тізімі">
        {tasks.map((t, idx) => {
          const isDone = t.status === 'ОРЫНДАЛДЫ';
          const isActive = t.status === 'БЕЛСЕНДІ';

          return (
            <Card
              key={idx}
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onStartPractice();
                }
              }}
              aria-label={`${t.title}. Күйі: ${t.status}, Ұпайы: ${t.xp}`}
              className={`rounded-3xl p-5 sm:p-6 shadow-soft-xs border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all focus-visible:ring-4 focus-visible:ring-indigo-500 ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-950/30'
                  : isDone
                  ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                  : 'border-slate-200/90 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={isDone ? 'success' : isActive ? 'warning' : 'default'}
                    className="text-xs font-black px-2.5 py-0.5"
                  >
                    {t.status}
                  </Badge>
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-400">{t.levelKaz}</span>
                </div>
                
                <h4 className="font-black text-slate-950 dark:text-white text-base sm:text-lg leading-snug">
                  {t.title}
                </h4>

                <span className="text-xs sm:text-sm font-black text-amber-700 dark:text-amber-400 inline-block bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-xl border border-amber-200/80">
                  {t.xp}
                </span>
              </div>

              <Button
                variant={isDone ? 'outline' : 'primary'}
                size="lg"
                onClick={onStartPractice}
                aria-label={isDone ? `${t.title} тапсырмасын қайталау` : `${t.title} тапсырмасын бастау`}
                className="rounded-2xl w-full sm:w-auto shrink-0 font-black min-h-[48px] px-6 text-sm active:scale-95 shadow-soft-xs"
              >
                {isDone ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2" aria-hidden="true" />
                    Қайталау
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2 fill-white text-white" aria-hidden="true" />
                    Бастау ➔
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
