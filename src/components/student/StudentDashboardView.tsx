'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Flame,
  Trophy,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Lock,
  Compass,
  Award,
  Star,
  Target,
  Zap,
  CalendarCheck
} from 'lucide-react';

interface StudentDashboardViewProps {
  onNavigate: (tab: 'today_tasks' | 'practice' | 'explainer' | 'my_route' | 'achievements') => void;
}

export function StudentDashboardView({ onNavigate }: StudentDashboardViewProps) {
  // Step 10: 5-step today's learning route (Child-friendly simplified titles)
  const todayRouteSteps = [
    { stepNumber: 1, title: 'Сан құрамы', status: 'completed', icon: CheckCircle2, desc: 'Сабақ толық аяқталды' },
    { stepNumber: 2, title: 'Ондықты толықтыру', status: 'completed', icon: CheckCircle2, desc: 'Сабақ толық аяқталды' },
    { stepNumber: 3, title: 'Модельмен қосу', status: 'current', icon: Sparkles, desc: 'Бүгінгі негізгі жаттығу' },
    { stepNumber: 4, title: 'Санмен есептеу', status: 'locked', icon: Lock, desc: '3-қадамнан кейін ашылады' },
    { stepNumber: 5, title: 'Мәтіндік есеп', status: 'locked', icon: Lock, desc: '4-қадамнан кейін ашылады' },
  ];

  // Gamification Badges (Child-friendly icons and simple words)
  const badges = [
    { title: '7 Күндік Стрик 🔥', icon: '🔥', desc: '7 күн үзбей жаттығу орындадың!', unlocked: true },
    { title: 'Разряд Білгірі ⭐', icon: '⭐', desc: 'Ондықтарды қосуды меңгердің', unlocked: true },
    { title: 'Визуал Шебері 🧩', icon: '🧩', desc: 'Блок моделін 100% аяқтадың', unlocked: true },
    { title: 'Есеп Тапқыш 👑', icon: '👑', desc: 'Мәтіндік есептерді шешу', unlocked: false },
  ];

  return (
    <div className="space-y-6" role="region" aria-label="Оқушының басты парақшасы">
      
      {/* 1. Header Greeting & Streak Callout with Ambient Glow */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-6 sm:p-8 text-white shadow-soft-lg">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/25 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-black backdrop-blur-md border border-white/20 shadow-soft-xs">
              <span aria-hidden="true">👋</span>
              <span>Оқушы Кабинеті</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
              <span className="text-amber-300 font-extrabold">4-Сынып</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
              «Сәлем, Бекарыс!»
            </h1>

            <p className="text-sm sm:text-base text-emerald-50 font-bold leading-relaxed">
              Бүгінгі математикалық қадамыңды жасап, жұлдызды ұпайлар жинауға дайынсың ба?
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('practice')}
                aria-label="Бүгінгі жаттығуды бастау"
                className="bg-white text-emerald-950 hover:bg-emerald-50 rounded-2xl font-black shadow-glow-emerald text-sm sm:text-base min-h-[48px] px-8 transition-transform hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-white border-0"
              >
                <Play className="h-5 w-5 mr-2 fill-emerald-950 text-emerald-950" aria-hidden="true" />
                Бүгінгі Жаттығуды Бастау ➔
              </Button>
            </div>
          </div>

          {/* Big Gamified Streak Callout Box */}
          <div
            className="rounded-3xl bg-white/25 backdrop-blur-md p-5 border border-white/30 text-center space-y-2 shrink-0 self-start md:self-auto min-w-[220px] shadow-soft-md hover:scale-105 transition-transform"
            aria-live="polite"
            aria-label="Үздіксіз 7 күндік жаттығу орындау нәтижесі"
          >
            <div className="flex items-center justify-center gap-2 text-amber-300 font-black text-2xl sm:text-3xl drop-shadow-sm">
              <Flame className="h-8 w-8 text-amber-300 fill-amber-300 animate-bounce" aria-hidden="true" />
              <span>7 Күн Стрик!</span>
            </div>
            <p className="text-xs sm:text-sm font-black text-white leading-snug">
              «7 күн қатарынан жаттықтың!»
            </p>
            <Badge variant="warning" className="bg-amber-300 text-amber-950 font-black text-xs uppercase px-3 py-1 shadow-sm">
              🔥 Өрттей Қарқын!
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. 4 Key Cards (Бүгінгі мақсат, Осы аптадағы нәтиже, Қазіргі деңгей, Қазіргі маршрут) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list" aria-label="Басты көрсеткіштер">
        
        {/* Карточка 1: Бүгінгі мақсат */}
        <Card
          tabIndex={0}
          role="listitem"
          aria-label="Бүгінгі мақсат: 3 тапсырманың 2-еуі орындалды"
          className="rounded-3xl p-5 border-2 border-emerald-200 bg-emerald-50/70 shadow-soft-xs dark:border-emerald-900 dark:bg-emerald-950/20 focus-visible:ring-4 focus-visible:ring-emerald-500"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase text-emerald-900 dark:text-emerald-300">
              Бүгінгі мақсат
            </span>
            <Target className="h-5 w-5 text-emerald-700" aria-hidden="true" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 mt-1">
            3 есеп
          </div>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-extrabold mt-1">
            Орындалғаны: 2 / 3 ✓
          </p>
        </Card>

        {/* Карточка 2: Осы аптадағы нәтиже */}
        <Card
          tabIndex={0}
          role="listitem"
          aria-label="Осы аптадағы нәтиже: 82 пайыз, тамаша өсім"
          className="rounded-3xl p-5 border-2 border-indigo-200 bg-indigo-50/70 shadow-soft-xs dark:border-indigo-900 dark:bg-indigo-950/20 focus-visible:ring-4 focus-visible:ring-indigo-500"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase text-indigo-900 dark:text-indigo-300">
              Осы аптадағы нәтиже
            </span>
            <Trophy className="h-5 w-5 text-indigo-700" aria-hidden="true" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-indigo-100 mt-1">
            82%
          </div>
          <p className="text-xs text-indigo-800 dark:text-indigo-300 font-extrabold mt-1">
            Тамаша өсім (+18% ⭐)
          </p>
        </Card>

        {/* Карточка 3: Қазіргі деңгей */}
        <Card
          tabIndex={0}
          role="listitem"
          aria-label="Қазіргі деңгей: 3-деңгей"
          className="rounded-3xl p-5 border-2 border-amber-200 bg-amber-50/70 shadow-soft-xs dark:border-amber-900 dark:bg-amber-950/20 focus-visible:ring-4 focus-visible:ring-amber-500"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase text-amber-900 dark:text-amber-300">
              Қазіргі деңгей
            </span>
            <Zap className="h-5 w-5 text-amber-700" aria-hidden="true" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-100 mt-1">
            3-Деңгей
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 font-extrabold mt-1">
            Қолдаумен есептеу
          </p>
        </Card>

        {/* Карточка 4: Қазіргі маршрут */}
        <Card
          tabIndex={0}
          role="listitem"
          aria-label="Қазіргі маршрут тақырыбы: Разрядтан аттап қосу, 3-кезең"
          className="rounded-3xl p-5 border-2 border-purple-200 bg-purple-50/70 shadow-soft-xs dark:border-purple-900 dark:bg-purple-950/20 focus-visible:ring-4 focus-visible:ring-purple-500"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase text-purple-900 dark:text-purple-300">
              Қазіргі маршрут
            </span>
            <Compass className="h-5 w-5 text-purple-700" aria-hidden="true" />
          </div>
          <div className="text-sm sm:text-base font-black text-purple-950 dark:text-purple-100 mt-1 leading-tight">
            Разрядтан аттап қосу
          </div>
          <p className="text-xs text-purple-800 dark:text-purple-300 font-extrabold mt-1">
            3-кезең орындалуда
          </p>
        </Card>

      </div>

      {/* 3. Бүгінгі Маршрут (Step-by-Step Interactive Roadmap) */}
      <Card className="rounded-3xl p-6 sm:p-8 shadow-soft-xs border border-slate-200/80 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="h-6 w-6 text-indigo-600" aria-hidden="true" /> Бүгінгі оқу қадамым
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold">
              Қадамдарды ретімен орындап, жаңа деңгейлердің құлпын аш!
            </p>
          </div>
          <Badge variant="purple" className="self-start sm:self-auto font-black text-xs px-3 py-1">
            5 Қадамдық Бағыт
          </Badge>
        </div>

        {/* Step List Card Layout with full keyboard access */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3" role="list" aria-label="Бүгінгі 5 қадамдық жоспар">
          {todayRouteSteps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isLocked = step.status === 'locked';

            return (
              <div
                key={step.stepNumber}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !isLocked) {
                    e.preventDefault();
                    onNavigate('practice');
                  }
                }}
                aria-label={`Қадам ${step.stepNumber}: ${step.title}, күйі: ${
                  isCompleted ? 'Орындалды' : isCurrent ? 'Қазіргі тапсырма' : 'Бұғатталған'
                }`}
                className={`p-4 rounded-3xl border-2 flex flex-col justify-between text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/90 ring-4 ring-indigo-400/30 shadow-soft-xs dark:bg-indigo-950/40'
                    : isCompleted
                    ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-slate-50/60 opacity-60 dark:border-slate-800 dark:bg-slate-800/30 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Қадам {step.stepNumber}
                  </span>
                  {isCompleted && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-black shadow-sm" aria-label="Орындалды">
                      ✓
                    </span>
                  )}
                  {isCurrent && (
                    <Badge variant="purple" className="px-2.5 py-0.5 text-xs font-black animate-pulse">
                      қазір ➔
                    </Badge>
                  )}
                  {isLocked && (
                    <span className="text-slate-400 text-sm font-black flex items-center gap-0.5" aria-label="Бұғатталған">
                      🔒
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-black text-slate-950 dark:text-white text-base mb-1 leading-snug">
                    {step.title}
                  </h4>
                  <span className={`text-xs font-black ${
                    isCompleted ? 'text-emerald-800' : isCurrent ? 'text-indigo-800' : 'text-slate-500'
                  }`}>
                    {isCompleted ? 'Орындалды ✓' : isCurrent ? 'Бастауға дайын 🚀' : 'Бұғатталған 🔒'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="accent"
            size="lg"
            onClick={() => onNavigate('practice')}
            aria-label="3-қадам модельмен қосу есебін орындау"
            className="rounded-2xl font-black text-sm min-h-[48px] px-6 shadow-soft-xs"
          >
            3-Қадам: Модельмен қосуды орындау <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </Card>

      {/* 4. Gamification: XP, Деңгей, Бейдждер, Күнделікті мақсат */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* XP & Деңгей & Күнделікті мақсат Progress */}
        <Card className="rounded-3xl p-6 sm:p-8 shadow-soft-xs border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-500" aria-hidden="true" /> Жұлдыздар мен Ұпайлар (XP)
            </h4>
            <Badge variant="success" className="font-black text-xs sm:text-sm px-3 py-1">850 XP ⭐</Badge>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 mb-2">
                <span>Күнделікті мақсат (2 / 3 есеп)</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-black">67%</span>
              </div>
              <Progress value={67} indicatorColor="bg-emerald-500" />
            </div>

            <div>
              <div className="flex justify-between text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 mb-2">
                <span>Келесі деңгейге дейін (850 / 1000 XP)</span>
                <span className="text-indigo-700 dark:text-indigo-400 font-black">85%</span>
              </div>
              <Progress value={85} indicatorColor="bg-indigo-600" />
            </div>
          </div>
        </Card>

        {/* Badges Showcase */}
        <Card className="rounded-3xl p-6 sm:p-8 shadow-soft-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
              <Award className="h-6 w-6 text-indigo-600" aria-hidden="true" /> Бекарыстың Бейдждері
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('achievements')}
              aria-label="Барлық бейдждерді ашу"
              className="text-xs sm:text-sm font-black text-indigo-600 hover:text-indigo-700"
            >
              Барлығын көру ➔
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3" role="list" aria-label="Бейдждер тізімі">
            {badges.map((b, idx) => (
              <div
                key={idx}
                role="listitem"
                tabIndex={0}
                aria-label={`${b.title}: ${b.desc}. Күйі: ${b.unlocked ? 'Ашылған' : 'Бұғатталған'}`}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                  b.unlocked
                    ? 'border-amber-300 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20'
                    : 'border-slate-200 bg-slate-50 opacity-50 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="text-3xl shrink-0" aria-hidden="true">{b.icon}</div>
                <div>
                  <h5 className="font-black text-slate-950 dark:text-white text-xs sm:text-sm leading-tight">
                    {b.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-bold">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}
