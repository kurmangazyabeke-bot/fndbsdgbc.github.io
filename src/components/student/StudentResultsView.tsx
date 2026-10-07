'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  TrendingUp,
  CheckCircle2,
  Brain,
  Flame,
  Star,
  Layers,
  Sparkles,
  Target
} from 'lucide-react';
import { DEMO_STUDENTS } from '@/lib/data/demoData';

export function StudentResultsView() {
  const currentStudent = DEMO_STUDENTS[0]; // Бекарыс Нұрланұлы

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" /> Менің Нәтижелерім & Статистика
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Бастапқы диагностикадан кейінгі сенің нақты математикалық өсімің және меңгерген дағдыларың.
        </p>
      </div>

      {/* Main KPI Cards - Vertical Stack on Mobile, Grid on Tablet/Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-3xl p-5 border border-slate-200/80 bg-white dark:bg-slate-900 shadow-soft-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Бастапқы Балл</span>
          <div className="text-3xl font-black text-slate-700 dark:text-slate-300 mt-2">
            {currentStudent.baselineScore}%
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Алғашқы Диагностика тесті</p>
        </Card>

        <Card className="rounded-3xl p-5 border border-indigo-100 bg-indigo-50/50 dark:bg-indigo-950/40 dark:border-indigo-900 shadow-soft-xs">
          <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Қазіргі Деңгей</span>
          <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300 mt-2">
            {currentStudent.currentScore}%
          </div>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">+{currentStudent.progressGrowthPct}% таза өсім!</p>
        </Card>

        <Card className="rounded-3xl p-5 border border-emerald-100 bg-emerald-50/50 dark:bg-emerald-950/40 dark:border-emerald-900 shadow-soft-xs">
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Жинаған Ұпайлар</span>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-2 flex items-center gap-1.5">
            {currentStudent.totalXp} XP <Star className="h-6 w-6 text-amber-500 fill-amber-400" />
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1 flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500" /> {currentStudent.dailyStreak} күн қатарынан оқу
          </p>
        </Card>
      </div>

      {/* 7 Skills Breakdown Card */}
      <Card className="rounded-3xl p-5 sm:p-6 border border-slate-200/80 bg-white dark:bg-slate-900 shadow-soft-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" /> 7 Базалық Дағдыны Меңгеру
          </h3>
          <Badge variant="purple" className="text-xs font-bold">
            Орташа: {currentStudent.overallMastery}%
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentStudent.skillScores.map((sk) => (
            <div
              key={sk.skillId}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-800 dark:text-slate-200">{sk.skillNameKaz}</span>
                <span className={
                  sk.score >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
                  sk.score >= 70 ? 'text-indigo-600 dark:text-indigo-400' :
                  sk.score >= 50 ? 'text-purple-600 dark:text-purple-400' : 'text-rose-600 dark:text-rose-400'
                }>
                  {sk.score}%
                </span>
              </div>
              <Progress
                value={sk.score}
                indicatorColor={
                  sk.score >= 85 ? 'bg-emerald-500' :
                  sk.score >= 70 ? 'bg-indigo-500' :
                  sk.score >= 50 ? 'bg-purple-500' : 'bg-rose-500'
                }
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                <span>Дәреже:</span>
                <span className="font-bold text-slate-600 dark:text-slate-300">{sk.statusTextKaz}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Pedagogical Summary for Student */}
      <Card className="rounded-3xl p-5 sm:p-6 border border-indigo-100 bg-gradient-to-r from-indigo-50/70 to-emerald-50/70 dark:from-indigo-950/40 dark:to-emerald-950/40 dark:border-indigo-900 shadow-soft-xs space-y-3">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-black text-sm">
          <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span>AI Тәлімгердің Сенімен Жұмыс Қорытындысы:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
          «{currentStudent.aiRecommendationKaz}»
        </p>
      </Card>
    </div>
  );
}
