'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, AlertCircle, CheckCircle2, Zap, Users, Sparkles } from 'lucide-react';
import { DEMO_STUDENTS, DEMO_SKILLS } from '@/lib/data/demoData';

export function ProgressHeatmapView() {
  const topics = [
    { name: '1. Сан құрамы (Ондық пен бірліктерді жіктеу)', mastered: 21, inProgress: 2, critical: 1 },
    { name: '2. Салыстыру (Сандар мен өрнектерді салыстыру)', mastered: 22, inProgress: 2, critical: 0 },
    { name: '3. Қосу (20 көлеміндегі және бағандап қосу)', mastered: 19, inProgress: 4, critical: 1 },
    { name: '4. Азайту (Ондықтан аттамай азайту)', mastered: 18, inProgress: 4, critical: 2 },
    { name: '5. Разрядтан аттап қосу (28 + 15)', mastered: 16, inProgress: 5, critical: 3 },
    { name: '6. Разрядтан аттап азайту (52 – 18)', mastered: 12, inProgress: 7, critical: 5 },
    { name: '7. Мәтіндік есеп (Өмірлік сюжеттік есептер)', mastered: 11, inProgress: 8, critical: 5 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-indigo-600" /> Сыныптық Прогресс & Heatmap Картасы
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          4 «А» сыныбының 7 негізгі математикалық дағдысы бойынша нақты меңгеру дәрежесін визуалды бақылау.
        </p>
      </div>

      {/* 1. Skill Aggregated Progress Bars */}
      <Card className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            4 «А» Сыныбының Жалпы Меңгеру Бағаны (24 Оқушы)
          </h3>
          <div className="flex gap-3 text-xs font-bold shrink-0">
            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Меңгерілді (85%+)</span>
            <span className="flex items-center gap-1 text-amber-600"><Zap className="h-3.5 w-3.5" /> Түзетілуде (50-84%)</span>
            <span className="flex items-center gap-1 text-rose-600"><AlertCircle className="h-3.5 w-3.5" /> Қолдау қажет (&lt;50%)</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((t, idx) => {
            const total = t.mastered + t.inProgress + t.critical;
            const masteredPct = Math.round((t.mastered / total) * 100);
            const inProgressPct = Math.round((t.inProgress / total) * 100);
            const criticalPct = Math.round((t.critical / total) * 100);

            return (
              <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>{t.name}</span>
                  <span className="text-emerald-700 dark:text-emerald-400">{masteredPct}% Меңгерілді ({t.mastered} / {total} оқушы)</span>
                </div>
                <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700 shadow-inner">
                  <div style={{ width: `${masteredPct}%` }} className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all" title={`Меңгерілді: ${t.mastered} оқушы`} />
                  <div style={{ width: `${inProgressPct}%` }} className="bg-gradient-to-r from-amber-400 to-orange-400 h-full transition-all" title={`Түзетілуде: ${t.inProgress} оқушы`} />
                  <div style={{ width: `${criticalPct}%` }} className="bg-gradient-to-r from-rose-500 to-red-500 h-full transition-all" title={`Қолдау қажет: ${t.critical} оқушы`} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 2. Individual 5 Students x 7 Skills Heatmap Matrix */}
      <Card className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 space-y-4 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" /> Оқушылар бойынша 7 Дағдының Heatmap Матрицасы
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Әр оқушының әр дағды бойынша жеке меңгеру көрсеткіштері
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-black">
                <th className="py-3 px-3">Оқушы</th>
                <th className="py-3 px-2 text-center">Жалпы</th>
                {DEMO_SKILLS.map((sk) => (
                  <th key={sk.id} className="py-3 px-2 text-center text-[11px] truncate max-w-[90px]" title={sk.nameKaz}>
                    {sk.nameKaz}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
              {DEMO_STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2.5">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="h-8 w-8 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <span className="font-black text-slate-900 dark:text-white block">{student.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{student.studentCode}</span>
                    </div>
                  </td>

                  {/* Overall score */}
                  <td className="py-3 px-2 text-center font-black">
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      student.overallMastery >= 85 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      student.overallMastery >= 65 ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {student.overallMastery}%
                    </span>
                  </td>

                  {/* 7 skill scores */}
                  {student.skillScores.map((sk) => (
                    <td key={sk.skillId} className="py-3 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-[11px] font-black ${
                          sk.score >= 85
                            ? 'bg-emerald-500 text-white'
                            : sk.score >= 70
                            ? 'bg-indigo-500 text-white'
                            : sk.score >= 50
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-rose-500 text-white'
                        }`}
                        title={`${sk.skillNameKaz}: ${sk.score}% (${sk.statusTextKaz})`}
                      >
                        {sk.score}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}
