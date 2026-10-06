'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Flame, Star, ShieldCheck, Zap } from 'lucide-react';

export function StudentAchievementsView() {
  const badges = [
    { title: 'Алғашқы Қадам', icon: '🚀', desc: 'Алғашқы AI диагностикадан сәтті өттің', unlocked: true },
    { title: 'Стрик Шебері', icon: '🔥', desc: 'Қатарынан 7 күн есеп шығардың', unlocked: true },
    { title: 'Визуал Гений', icon: '🧩', desc: 'Визуалды Блок әдісін толық меңгердің', unlocked: true },
    { title: 'Разряд Жұлдызы', icon: '⭐', desc: 'Ойдағы санды қосуда 10/10 жинадың', unlocked: true },
    { title: 'Бөлшек Гуруы', icon: '🍕', desc: 'Пицца бөлшектерін 100% түсіндің', unlocked: false },
    { title: 'Математика Сұңқары', icon: '👑', desc: 'Барлық деңгейлерді меңгеру', unlocked: false },
  ];

  return (
    <div className="space-y-6" role="region" aria-label="Жетістіктерім мен марапаттарым">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <Award className="h-7 w-7 text-amber-500" aria-hidden="true" /> Менің Жетістіктерім & Марапаттарым
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold mt-1">
          Есептерді орындап, жаңа жұлдызды бейдждер мен кубоктарды аш!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list" aria-label="Бейдждер тізімі">
        {badges.map((b, idx) => (
          <Card
            key={idx}
            role="listitem"
            tabIndex={0}
            aria-label={`${b.title}: ${b.desc}. Күйі: ${b.unlocked ? 'Ашылған' : 'Бұғатталған'}`}
            className={`rounded-3xl p-5 sm:p-6 border-2 text-center transition-all focus-visible:ring-4 focus-visible:ring-amber-500 ${
              b.unlocked
                ? 'border-amber-300 bg-amber-50/70 shadow-soft-xs dark:border-amber-900/60 dark:bg-amber-950/20'
                : 'border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <div className="text-5xl mb-2 drop-shadow-sm" aria-hidden="true">{b.icon}</div>
            <h4 className="font-black text-slate-950 dark:text-white text-sm sm:text-base mb-1">{b.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold leading-relaxed">{b.desc}</p>
            <Badge
              variant={b.unlocked ? 'warning' : 'default'}
              className="mt-3 text-xs font-black px-3 py-0.5"
            >
              {b.unlocked ? 'АШЫЛДЫ ⭐' : 'БҰҒАТТАЛҒАН 🔒'}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
