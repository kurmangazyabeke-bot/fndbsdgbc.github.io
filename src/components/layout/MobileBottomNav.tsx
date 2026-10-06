'use client';

import React from 'react';
import { useRole } from '@/lib/context/RoleContext';
import {
  Users,
  BarChart3,
  Activity,
  LayoutDashboard,
  Brain,
  CalendarCheck,
  MapPin,
  Lightbulb,
  Trophy,
  User,
  Home
} from 'lucide-react';

export function MobileBottomNav() {
  const { role, viewMode, setViewMode, teacherTab, setTeacherTab, studentTab, setStudentTab } = useRole();

  if (viewMode === 'landing') {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-4 py-2 flex items-center justify-around shadow-soft-lg">
        <button
          onClick={() => setViewMode('landing')}
          className="flex flex-col items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400"
        >
          <Home className="h-5 w-5" />
          <span>Басты бет</span>
        </button>

        <button
          onClick={() => {
            setViewMode('cabinet');
            setTeacherTab('students');
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-black text-slate-600 hover:text-indigo-600 dark:text-slate-400"
        >
          <Users className="h-5 w-5" />
          <span>Мұғалім</span>
        </button>

        <button
          onClick={() => {
            setViewMode('cabinet');
            setStudentTab('today_tasks');
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-black text-slate-600 hover:text-emerald-600 dark:text-slate-400"
        >
          <CalendarCheck className="h-5 w-5" />
          <span>Оқушы</span>
        </button>
      </div>
    );
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-soft-lg">
      {role === 'teacher' ? (
        /* Teacher Mobile Bottom Navigation: Оқушылар, Прогресс, Аналитика, Басқару, Диагност */
        <>
          <button
            onClick={() => setTeacherTab('students')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              teacherTab === 'students'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Оқушылар</span>
          </button>

          <button
            onClick={() => setTeacherTab('progress')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              teacherTab === 'progress'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Прогресс</span>
          </button>

          <button
            onClick={() => setTeacherTab('analyst')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              teacherTab === 'analyst'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Activity className="h-5 w-5" />
            <span>Аналитика</span>
          </button>

          <button
            onClick={() => setTeacherTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              teacherTab === 'dashboard'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Басқару</span>
          </button>

          <button
            onClick={() => setTeacherTab('diagnost')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              teacherTab === 'diagnost'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Brain className="h-5 w-5" />
            <span>Диагност</span>
          </button>
        </>
      ) : (
        /* Student Mobile Bottom Navigation: Тапсырма, Маршрут, Түсіндіру, Прогресс, Панель */
        <>
          <button
            onClick={() => setStudentTab('today_tasks')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              studentTab === 'today_tasks'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <CalendarCheck className="h-5 w-5" />
            <span>Тапсырма</span>
          </button>

          <button
            onClick={() => setStudentTab('my_route')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              studentTab === 'my_route'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span>Маршрут</span>
          </button>

          <button
            onClick={() => setStudentTab('explainer')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              studentTab === 'explainer'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Lightbulb className="h-5 w-5" />
            <span>Түсіндіру</span>
          </button>

          <button
            onClick={() => setStudentTab('my_results')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              studentTab === 'my_results'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Trophy className="h-5 w-5" />
            <span>Прогресс</span>
          </button>

          <button
            onClick={() => setStudentTab('my_dashboard')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-black transition-all ${
              studentTab === 'my_dashboard'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Кабинет</span>
          </button>
        </>
      )}
    </div>
  );
}
