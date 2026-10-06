'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Award, Flame, BookOpen, Target, Compass } from 'lucide-react';

export function StudentProfileView() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <User className="h-6 w-6 text-emerald-600" /> Оқушы Профилі (Айдос)
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Жеке деректер, геймификация мен оқу деңгейі.
        </p>
      </div>

      <Card className="rounded-3xl p-6 sm:p-8 shadow-soft-xs border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-3xl shadow-soft-xs">
            👦
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-xl">Айдос Нұрланұлы</h4>
            <p className="text-xs text-slate-400 font-semibold">2-А Сынып оқушысы • №15 Мектеп</p>
          </div>
        </div>

        <div className="space-y-3 text-xs font-semibold">
          <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <span className="text-slate-500">Жинаған Ұпайы (XP):</span>
            <span className="font-black text-indigo-600 text-sm">850 XP</span>
          </div>
          <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <span className="text-slate-500">Үздіксіз Стрик:</span>
            <span className="font-black text-amber-600 text-sm">7 Күн 🔥</span>
          </div>
          <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <span className="text-slate-500">Ағымдағы ZPD Деңгейі:</span>
            <span className="font-black text-emerald-600 text-sm">3-Деңгей (Контекстік)</span>
          </div>
          <div className="flex justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <span className="text-slate-500">Қазіргі Жаттығу Маршруты:</span>
            <span className="font-black text-purple-600 text-sm">Разрядтан аттап қосу</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
