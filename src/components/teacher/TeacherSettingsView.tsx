'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Bell, Shield, User } from 'lucide-react';

export function TeacherSettingsView() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-indigo-600" /> Параметрлер & Мұғалім Баптаулары
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Мұғалім кабинетінің AI ескертулері мен интерфейсті баптау.
        </p>
      </div>

      <Card className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 font-black text-xl">
            СА
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">Серикова Айгүл Бақытқызы</h4>
            <p className="text-xs text-slate-400">Бастауыш сынып мұғалімі • №15 Мектеп-Лицей</p>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Bell className="h-4 w-4 text-indigo-600" /> AI Олқылық туралы реалды уақытта хабарлама беру
            </span>
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-indigo-600 rounded" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Shield className="h-4 w-4 text-emerald-600" /> Автоматты ZPD бейімдеу режимі қосулы
            </span>
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600 rounded" />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" className="rounded-2xl">Баптауларды Сақтау</Button>
        </div>
      </Card>
    </div>
  );
}
