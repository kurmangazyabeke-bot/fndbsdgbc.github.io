'use client';

import React from 'react';
import { TeacherTab, useRole } from '@/lib/context/RoleContext';
import {
  LayoutDashboard,
  Brain,
  Sparkles,
  BookOpen,
  Target,
  Activity,
  Users,
  School,
  FileCheck,
  BarChart3,
  Settings,
  GraduationCap,
  Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TeacherSidebar() {
  const { teacherTab, setTeacherTab } = useRole();

  const menuItems: { key: TeacherTab; label: string; icon: React.ElementType; section?: string; badge?: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'diagnost', label: 'AI Диагност', icon: Brain, section: 'AI Интеллектуалды Цикл' },
    { key: 'adapter', label: 'AI Бейімдеуші', icon: Sparkles },
    { key: 'explainer', label: 'AI Түсіндіруші', icon: BookOpen },
    { key: 'trainer', label: 'AI Тренажер', icon: Target },
    { key: 'analyst', label: 'AI Аналитик', icon: Activity },
    { key: 'students', label: 'Оқушылар', icon: Users, section: 'Педагогикалық Басқару', badge: '28' },
    { key: 'classes', label: 'Сыныптар', icon: School },
    { key: 'assignments', label: 'Тапсырмалар', icon: FileCheck },
    { key: 'progress', label: 'Прогресс', icon: BarChart3 },
    { key: 'project_results', label: 'Жоба нәтижесі', icon: Award, section: 'Байқау & Қорғау', badge: 'PDF' },
    { key: 'settings', label: 'Параметрлер', icon: Settings, section: 'Жүйе' },
  ];

  return (
    <>
      {/* Mobile / Tablet Horizontal Swipeable Pill Navigation */}
      <div className="lg:hidden w-full overflow-x-auto pb-1 no-scrollbar flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft-xs">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = teacherTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTeacherTab(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-soft-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 rounded-3xl bg-white p-4 shadow-soft-sm border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 sticky top-20">
        {/* Role Header Badge */}
        <div className="flex items-center gap-3 px-3 py-2 mb-4 bg-indigo-50/80 rounded-2xl border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">Мұғалім Кабинеті</div>
            <div className="text-[10px] text-indigo-700 dark:text-indigo-300 font-semibold">4 «А» сыныбы (24 оқушы)</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = teacherTab === item.key;

            return (
              <React.Fragment key={item.key}>
                {item.section && (
                  <div className="pt-3 pb-1 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {item.section}
                  </div>
                )}
                <button
                  onClick={() => setTeacherTab(item.key)}
                  className={`w-full flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-extrabold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-soft-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant={isActive ? 'purple' : 'default'} className="text-[10px] px-2 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
