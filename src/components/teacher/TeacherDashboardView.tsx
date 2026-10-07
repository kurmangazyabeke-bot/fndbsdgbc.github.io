'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import {
  Users,
  UserCheck,
  Award,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Brain,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export function TeacherDashboardView() {
  // Chart Data for "Сыныптың жалпы динамикасы" (Baseline vs Current Growth over weeks)
  const chartData = [
    { week: '1-Апта (Baseline)', score: 45 },
    { week: '2-Апта', score: 52 },
    { week: '3-Апта', score: 61 },
    { week: '4-Апта', score: 68 },
    { week: '5-Апта', score: 74 },
    { week: '6-Апта (Қазір)', score: 78 },
  ];

  // 7 Skills Map Data as requested by user (17-ҚАДАМ)
  const skillsData = [
    { name: 'Сан құрамы', percentage: 88, color: 'bg-emerald-500' },
    { name: 'Салыстыру', percentage: 89, color: 'bg-emerald-500' },
    { name: 'Қосу', percentage: 76, color: 'bg-indigo-500' },
    { name: 'Азайту', percentage: 70, color: 'bg-indigo-500' },
    { name: 'Разрядтан аттап қосу', percentage: 69, color: 'bg-purple-500' },
    { name: 'Разрядтан аттап азайту', percentage: 48, color: 'bg-rose-500' },
    { name: 'Мәтіндік есеп', percentage: 46, color: 'bg-amber-500' },
  ];

  // Students requiring immediate attention (17-ҚАДАМ Demo students)
  const strugglingStudents = [
    {
      id: 'st-madina',
      name: 'Мадина Қайрат',
      grade: '4 «А» сыныбы',
      avatar: '👧',
      weakGaps: [
        { topic: 'Разрядтан аттап азайту', score: 35 },
        { topic: 'Разрядтан аттап қосу', score: 42 },
      ],
      aiRecommendation:
        '1-деңгейлік визуалды разрядтық модельдер (20+10, 3+4 текшелер) арқылы жеке қолдау маршрутын тағайындау қажет.',
    },
    {
      id: 'st-jandos',
      name: 'Жандос Тұрсынов',
      grade: '4 «А» сыныбы',
      avatar: '👦',
      weakGaps: [
        { topic: 'Разрядтан аттап азайту (52-18=44)', score: 42 },
        { topic: 'Мәтіндік есеп', score: 55 },
      ],
      aiRecommendation:
        'Разрядтан аттап азайту бойынша 4-деңгейлік визуалды текшелер тренажеры мен қадамдық бағандау алгоритмін күшейту ұсынылады.',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Top Greeting Header Banner */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-soft-lg border border-indigo-900/60">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-black backdrop-blur-md border border-white/15">
              <span>👋 4 «А» Сыныбы</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-indigo-200">Мұғалімнің Басқару Панелі</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white drop-shadow-sm">
              Сәлеметсіз бе! Бүгін оқушыларыңыздың математикалық прогресін бақылаңыз.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              4 «А» сыныбындағы 24 оқушының интеллектуалды білім динамикасы мен AI талдаулары.
            </p>
          </div>
          
          <Button
            variant="accent"
            size="lg"
            className="rounded-2xl shrink-0 shadow-glow-emerald font-black text-xs sm:text-sm active:scale-95 transition-all"
          >
            <Sparkles className="h-4 w-4 mr-2 animate-spin" style={{ animationDuration: '4s' }} /> Реалды Режим AI Талдау
          </Button>
        </div>
      </div>

      {/* 2. 5 KPI Stat Cards with Glows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Барлық оқушы"
          value="24"
          subtitle="4 «А» Сыныбы"
          icon={<Users className="h-6 w-6 text-slate-700 dark:text-slate-200" />}
          variant="default"
        />

        <StatCard
          title="Белсенді оқушы"
          value="22"
          subtitle="Бүгін жаттығу орындаған"
          icon={<UserCheck className="h-6 w-6 text-emerald-600" />}
          variant="success"
        />

        <StatCard
          title="Орташа нәтиже"
          value="78%"
          subtitle="Сыныптық жиынтық балл"
          icon={<Award className="h-6 w-6 text-indigo-600" />}
          variant="accent"
        />

        <StatCard
          title="Қиындық анықталған"
          value="4"
          subtitle="Назар аудару қажет"
          icon={<AlertTriangle className="h-6 w-6 text-rose-600" />}
          variant="default"
        />

        <StatCard
          title="Осы аптадағы өсім"
          value="+18%"
          subtitle="Педагогикалық тиімділік"
          icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
          trend="Жоғары өсім"
          variant="success"
        />
      </div>

      {/* ========================================================================= */}
      {/* 27-ҚАДАМ: «AI БҮГІНГІ ҰСЫНЫСТАРЫ» (AI DAILY RECOMMENDATIONS) */}
      {/* ========================================================================= */}
      <Card className="rounded-3xl p-6 sm:p-7 shadow-soft-md border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-white dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 dark:border-indigo-900/60 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-indigo-100/80 dark:border-indigo-900/50 gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-soft-xs">
              <Brain className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  AI Бүгінгі Ұсыныстары
                </h3>
                <Badge variant="purple" className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                  Student Data Синтезі
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                4 «А» сыныбының ағымдағы диагностикалық деректеріне негізделген жедел педагогикалық шешімдер
              </p>
            </div>
          </div>

          <Badge variant="success" className="self-start sm:self-auto font-black text-xs">
            4 Белсенді Ұсыныс
          </Badge>
        </div>

        {/* 4 Data-Driven Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Рекомендация 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-indigo-100 dark:border-slate-800 shadow-soft-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                  Қиындық тобы: 6 Оқушы
                </span>
                <span className="text-xs font-black text-rose-600">Mastery: 48%</span>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm leading-snug">
                «4 «А» сыныбында 6 оқушы разрядтан аттап азайту тақырыбында қиындық көрсетуде.»
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Оқушылардың көбі (Бекарыс, Жандос, Мадина т.б.) 1 ондықты 10 бірлікке ыдыратудың орнына үлкен саннан кіші санды азайта салу қатесін жіберуде.
              </p>
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">Ұсыныс: Визуалды текшелер</span>
              <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold h-8">
                Тренажер тағайындау ➔
              </Button>
            </div>
          </div>

          {/* Рекомендация 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-indigo-100 dark:border-slate-800 shadow-soft-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900">
                  Мәтіндік талдау: 3 Оқушы
                </span>
                <span className="text-xs font-black text-amber-600">Mastery: 46%</span>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm leading-snug">
                «3 оқушы мәтіндік есептерде шарт пен сұрақты ажыратуда қиналады.»
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Нұрислам мен Аружан мәтіндік есептің негізгі сандық байланысын емес, соңғы сөздерді ғана қарап арифметикалық амалды шатастыруда.
              </p>
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">Ұсыныс: Сюжеттік сызба моделі</span>
              <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold h-8">
                Сюжеттік модельді ашу ➔
              </Button>
            </div>
          </div>

          {/* Рекомендация 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-indigo-100 dark:border-slate-800 shadow-soft-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-900">
                  Сабақ әдістемесі
                </span>
                <span className="text-xs font-black text-emerald-600">Тиімділігі: 92%</span>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm leading-snug">
                «Келесі сабақта визуалды модельдерді қолдану ұсынылады.»
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Абстрактілі бағандауды бастамас бұрын, 10-рамкалар (Ten-frames) мен Dienes блоктары арқылы 10 минуттық топтық көрнекілік енгізу ұсынылады.
              </p>
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">Сабақ жоспарына қосу</span>
              <Button size="sm" variant="primary" className="rounded-xl text-xs font-bold h-8">
                Жоспарға енгізу ✓
              </Button>
            </div>
          </div>

          {/* Рекомендация 4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-indigo-100 dark:border-slate-800 shadow-soft-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-600 uppercase bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-900">
                  Жеке дифференциация
                </span>
                <span className="text-xs font-black text-purple-600">Жеке маршрут</span>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm leading-snug">
                «Бекарыс пен Жандосқа 10 минуттық жеке микро-тренажер ұсынылды.»
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Екі оқушының ZPD көрсеткіші 2.5-тен 1.5-ке бейімделіп, қадамдық ыдырату алгоритмін бекіту үшін жеке тапсырмалар генерацияланды.
              </p>
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">Статус: Тағайындауға дайын</span>
              <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold h-8">
                Маршрутты бекіту ➔
              </Button>
            </div>
          </div>

        </div>
      </Card>

      {/* 3. Class Dynamics Line Chart & 4. Skills Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart: Сыныптың жалпы динамикасы */}
        <Card className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Сыныптың жалпы динамикасы
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Бастапқы нәтиже (Baseline 45%) ➔ Қазіргі нәтижеге (78%) дейінгі өсім
              </p>
            </div>
            <Badge variant="success" className="font-bold">+33% Алға жылжу</Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: 'none',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3.5}
                  dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skills Map: Дағдылар картасы */}
        <Card className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Дағдылар картасы
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Тақырыптар бойынша сынып оқушыларының меңгеру пайыздық деңгейі
              </p>
            </div>
            <Badge variant="purple" className="font-bold">6 Негізгі Тақырып</Badge>
          </div>

          <div className="space-y-3.5">
            {skillsData.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  <span>{skill.name}</span>
                  <span className="font-black">{skill.percentage}%</span>
                </div>
                <Progress value={skill.percentage} indicatorColor={skill.color} />
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* 5. Students Needing Attention & AI Recommendations */}
      <Card className="rounded-3xl p-6 shadow-soft-xs border border-rose-100 bg-white space-y-4 dark:border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Назар аударуды қажет ететін оқушылар
            </h3>
          </div>
          <Badge variant="danger" className="font-bold">4 Оқушы Қолдау Күтуде</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strugglingStudents.map((st) => (
            <div
              key={st.id}
              className="rounded-3xl border border-rose-100 bg-rose-50/40 p-5 space-y-3.5 dark:border-rose-950 dark:bg-rose-950/30"
            >
              {/* Student Info Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft-xs text-2xl border border-rose-100">
                    {st.avatar}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base">{st.name}</h4>
                    <span className="text-xs text-slate-500 font-semibold">{st.grade}</span>
                  </div>
                </div>
              </div>

              {/* Identified Weak Gaps */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Анықталған Алшақтықтар:
                </span>
                {st.weakGaps.map((gap, gIdx) => (
                  <div key={gIdx} className="flex justify-between items-center text-xs font-extrabold text-rose-950 dark:text-rose-200">
                    <span>• {gap.topic}</span>
                    <span className="text-rose-600 font-black">{gap.score}%</span>
                  </div>
                ))}
              </div>

              {/* AI Recommendation Box */}
              <div className="rounded-2xl bg-white p-3.5 border border-rose-100 text-xs text-slate-700 dark:bg-slate-900 dark:border-slate-800 space-y-1 shadow-soft-xs">
                <div className="flex items-center gap-1.5 font-black text-indigo-600 dark:text-indigo-400">
                  <Brain className="h-4 w-4" /> AI Ұсынысы:
                </div>
                <p className="font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                  «{st.aiRecommendation}»
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <Button variant="outline" size="sm" className="rounded-xl text-xs">
                  Жеке Жаттығу Тағайындау <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
