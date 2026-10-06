'use client';

import React from 'react';
import { StudentTab, useRole } from '@/lib/context/RoleContext';
import {
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  Lightbulb,
  Gamepad2,
  Trophy,
  Award,
  User,
  Flame,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function StudentSidebar() {
  const { studentTab, setStudentTab } = useRole();

  const menuItems: { key: StudentTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { key: 'my_dashboard', label: 'Менің панелім', icon: LayoutDashboard },
    { key: 'today_tasks', label: 'Тапсырмалар', icon: CalendarCheck, badge: '3' },
    { key: 'my_route', label: 'Маршрутым', icon: MapPin },
    { key: 'explainer', label: 'Түсіндіру', icon: Lightbulb },
    { key: 'practice', label: 'Жаттығу', icon: Gamepad2 },
    { key: 'my_results', label: 'Нәтижелерім', icon: Trophy },
    { key: 'achievements', label: 'Жетістіктер', icon: Award, badge: '🏆 4' },
    { key: 'profile', label: 'Профиль', icon: User },
  ];

  return (
    <>
      {/* Mobile / Tablet Horizontal Swipeable Pill Navigation */}
      <div className="lg:hidden w-full overflow-x-auto pb-1 no-scrollbar flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft-xs">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = studentTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setStudentTab(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-soft-xs'
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
        <div className="flex items-center gap-3 px-3 py-2.5 mb-4 bg-emerald-50/90 rounded-2xl border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-soft-xs font-black">
            👦
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white">Айдос Нұрланұлы</div>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
              <Flame className="h-3 w-3 text-amber-500 fill-amber-500" /> 7 Күн Стрик • 850 XP
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = studentTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setStudentTab(item.key)}
                className={`w-full flex items-center justify-between rounded-2xl px-3.5 py-3 text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-soft-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant={isActive ? 'success' : 'default'} className="text-[10px] px-2 py-0">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
