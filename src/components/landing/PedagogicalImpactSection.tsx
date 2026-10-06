'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Sparkles,
  Award,
  CheckCircle2,
  BarChart2,
  RotateCcw,
  ArrowUpRight,
  ShieldCheck,
  Target,
  Zap,
  Activity,
  Layers,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface SkillGrowthData {
  skillKey: string;
  skillNameKaz: string;
  beforeScore: number;
  afterScore: number;
  growth: number;
  descriptionKaz: string;
}

export function PedagogicalImpactSection() {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'before' | 'after' | 'growth'>('all');
  const [animatedBars, setAnimatedBars] = useState<boolean>(false);

  // Exact dataset requested in Step 22
  const skillComparisonData: SkillGrowthData[] = [
    {
      skillKey: 'composition',
      skillNameKaz: 'Сан құрамы',
      beforeScore: 45,
      afterScore: 80,
      growth: 35,
      descriptionKaz: '10 көлеміндегі сандардың құрамын ондықтар мен бірліктерге жіктеу дағдысы',
    },
    {
      skillKey: 'addition',
      skillNameKaz: 'Қосу',
      beforeScore: 40,
      afterScore: 75,
      growth: 35,
      descriptionKaz: 'Разрядтан аттап және ойша 1 санын еске сақтап екі таңбалы сандарды қосу',
    },
    {
      skillKey: 'subtraction',
      skillNameKaz: 'Азайту',
      beforeScore: 30,
      afterScore: 65,
      growth: 35,
      descriptionKaz: 'Ондықтан қарыз алу алгоритмін меңгеріп, разрядтан аттап азайту амалы',
    },
    {
      skillKey: 'word_problems',
      skillNameKaz: 'Мәтіндік есеп',
      beforeScore: 25,
      afterScore: 55,
      growth: 30,
      descriptionKaz: 'Шартты, сұрақты талдап, кері логикалық және сюжеттік есептерді шешу',
    },
  ];

  useEffect(() => {
    setAnimatedBars(false);
    const timer = setTimeout(() => {
      setAnimatedBars(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [animationKey]);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const chartData = skillComparisonData.map((item) => ({
    name: item.skillNameKaz,
    'Бастапқы (Before)': item.beforeScore,
    'Кейінгі (After)': item.afterScore,
    'Өсім (+Growth)': item.growth,
  }));

  return (
    <section className="space-y-8 scroll-mt-20">
      
      {/* ========================================================================= */}
      {/* 1. SECTION HEADER */}
      {/* ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="purple" className="px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-soft-xs">
          22-ҚАДАМ: ПЕДАГОГИКАЛЫҚ НӘТИЖЕ
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          «Платформа не істейді?»
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Дәстүрлі тестілеу оқушыны тек бағалайды. Ал <strong>MathQadam AI</strong> баланың математикалық ойлау жүйесіндегі түпкі қателерді емдеп, нақты өлшенетін сапалық секіріске жеткізеді.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. CORE PHILOSOPHY BANNER */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white border border-emerald-500/30 shadow-soft-lg max-w-5xl mx-auto">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-glow-emerald">
              <Sparkles className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                MathQadam AI Педагогикалық Философиясы
              </span>
              <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-snug text-white">
                «Біз тапсырма санын емес, оқушының даму траекториясын өлшейміз.»
              </h3>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleReplay}
            className="rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-black shrink-0 px-4 py-2"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Анимацияны қайта қосу
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BEFORE VS AFTER COMPARISON WORKSPACE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
        
        {/* Left Column: Animated Progress Bars (7 Cols) */}
        <Card className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                Дағдылар Бойынша Салыстырмалы Өсім
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Бастапқы диагностика (Before) ➔ Түзетуден кейінгі нәтиже (After)
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeFilter === 'all' ? 'bg-white text-slate-900 shadow-soft-xs dark:bg-slate-700 dark:text-white' : 'text-slate-500'
                }`}
              >
                Барлығы
              </button>
              <button
                onClick={() => setActiveFilter('before')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeFilter === 'before' ? 'bg-white text-slate-900 shadow-soft-xs dark:bg-slate-700 dark:text-white' : 'text-slate-500'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setActiveFilter('after')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeFilter === 'after' ? 'bg-white text-slate-900 shadow-soft-xs dark:bg-slate-700 dark:text-white' : 'text-slate-500'
                }`}
              >
                After
              </button>
            </div>
          </div>

          {/* Progress Bars List with Animation */}
          <div key={animationKey} className="space-y-6">
            {skillComparisonData.map((item) => (
              <div key={item.skillKey} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-sm">
                      {item.skillNameKaz}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                      — {item.descriptionKaz}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono font-black">
                    <span className="text-slate-400">{item.beforeScore}%</span>
                    <span className="text-slate-300">➔</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{item.afterScore}%</span>
                    <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded text-[11px]">
                      +{item.growth}%
                    </span>
                  </div>
                </div>

                {/* Layered Progress Track */}
                <div className="relative h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {/* Before Marker Bar */}
                  {(activeFilter === 'all' || activeFilter === 'before') && (
                    <div
                      className="absolute top-0 left-0 h-full bg-slate-300 dark:bg-slate-600 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: animatedBars ? `${item.beforeScore}%` : '0%',
                      }}
                    />
                  )}

                  {/* After Growth Bar */}
                  {(activeFilter === 'all' || activeFilter === 'after') && (
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: animatedBars ? `${item.afterScore}%` : '0%',
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend Guide */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span>Бастапқы диагностика (Before)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span>AI Жаттығудан кейін (After)</span>
              </div>
            </div>
            <span className="text-emerald-600 font-black">Орташа өсім: +33.8%</span>
          </div>
        </Card>

        {/* Right Column: Recharts Bar Diagram (5 Cols) */}
        <Card className="lg:col-span-5 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="success" className="text-xs">
                <BarChart2 className="h-3.5 w-3.5 mr-1" />
                Диаграмма Динамикасы
              </Badge>
              <span className="text-xs font-mono font-bold text-slate-400">Өсім: +33.8%</span>
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">
              Көрнекі Салыстырмалы Диаграмма
            </h4>
          </div>

          {/* Recharts Bar Chart Container */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fontWeight: 700 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar
                  dataKey="Бастапқы (Before)"
                  fill="#94a3b8"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1200}
                />
                <Bar
                  dataKey="Кейінгі (After)"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <p className="font-black text-slate-800 dark:text-slate-200">
              📊 Ғылыми-әдістемелік қорытынды:
            </p>
            <p className="text-slate-500 font-medium text-[11px] leading-relaxed">
              Диагностика қателердің 92%-ын алғашқы 3 сессияда бекітіп, оқушылардың өздігінен есеп шығару деңгейін 2.4 есеге арттырды.
            </p>
          </div>
        </Card>

      </div>

      {/* ========================================================================= */}
      {/* 4. 4 KEY PEDAGOGICAL METRICS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">+33.8%</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Орташа білім өсімі</p>
          <p className="text-[11px] text-slate-400 font-medium">4 негізгі дағды бойынша</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">92%</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Қатені түзеу деңгейі</p>
          <p className="text-[11px] text-slate-400 font-medium">Концептуалды қателер жойылды</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <Zap className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">2.4 есе</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Өз бетінше орындау</p>
          <p className="text-[11px] text-slate-400 font-medium">Мұғалім көмегінсіз шешу</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Award className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">100%</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Жеке траектория</p>
          <p className="text-[11px] text-slate-400 font-medium">Әр баланың өз қарқыны</p>
        </div>

      </div>

    </section>
  );
}
