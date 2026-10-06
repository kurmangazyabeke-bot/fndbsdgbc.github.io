'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export function StudentRouteView() {
  const steps = [
    { title: '1-Қадам: Оңай Қосу & Азайту', status: 'COMPLETED', desc: 'Разрядсыз 100 көлемінде қосу және азайтуды толық меңгердің' },
    { title: '2-Қадам: Разрядпен Қосу (Ойдағы Сан)', status: 'ACTIVE', desc: '28 + 15 сияқты 1 ондық ауысуы бар есептермен жаттығу' },
    { title: '3-Қадам: Көршіден Разряд Алу (Азайту)', status: 'LOCKED', desc: '52 – 18 сияқты ондықтан қарыз алу әдісін үйрену' },
    { title: '4-Қадам: Жай Бөлшектер & Пицца Моделі', status: 'LOCKED', desc: 'Көрнекі модельдермен бөлшектерді тану' },
  ];

  return (
    <div className="space-y-6 max-w-3xl" role="region" aria-label="Менің оқу маршрутым">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <MapPin className="h-7 w-7 text-emerald-600" aria-hidden="true" /> Менің Оқу Маршрутым
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold mt-1">
          AI саған арнайы құрастырған даму жолы. Қадамдарды біртіндеп ашып, шыңға жет!
        </p>
      </div>

      <div
        className="relative space-y-6 before:absolute before:inset-0 before:left-6 before:w-1.5 before:bg-slate-200 dark:before:bg-slate-800"
        role="list"
        aria-label="Даму баспалдақтары"
      >
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'COMPLETED';
          const isActive = step.status === 'ACTIVE';
          const isLocked = step.status === 'LOCKED';

          return (
            <div key={idx} className="relative flex items-start gap-4 pl-2" role="listitem">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-black text-sm z-10 shadow-soft-xs ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isActive
                    ? 'bg-amber-500 text-white animate-bounce'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                }`}
                aria-hidden="true"
              >
                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : isActive ? <Sparkles className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
              </div>

              <Card
                tabIndex={0}
                aria-label={`${step.title}. Күйі: ${
                  isCompleted ? 'Өтілді' : isActive ? 'Ағымдағы қадам' : 'Бұғатталған'
                }. ${step.desc}`}
                className={`flex-1 rounded-3xl p-5 sm:p-6 shadow-soft-xs border-2 transition-all focus-visible:ring-4 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'border-amber-400 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-75'
                }`}
              >
                <div className="flex flex-wrap justify-between items-center gap-2 mb-1.5">
                  <h4 className="font-black text-slate-950 dark:text-white text-base sm:text-lg">{step.title}</h4>
                  <Badge
                    variant={isCompleted ? 'success' : isActive ? 'warning' : 'default'}
                    className="text-xs font-black px-2.5 py-0.5"
                  >
                    {isCompleted ? 'ӨТІЛДІ ✓' : isActive ? 'АҒЫМДАҒЫ ҚАДАМ 🚀' : 'БҰҒАТТАЛҒАН 🔒'}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed">{step.desc}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
