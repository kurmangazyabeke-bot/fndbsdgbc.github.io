'use client';

import React, { useState } from 'react';
import {
  Brain,
  Sliders,
  BookOpen,
  TrendingUp,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  Lock,
  Flame,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAIPipeline } from '@/lib/context/AIPipelineContext';

interface InteractivePipelineSectionProps {
  onNavigateToModule: (moduleKey: 'diagnost' | 'adapter' | 'explainer' | 'trainer' | 'analyst') => void;
}

export function InteractivePipelineSection({ onNavigateToModule }: InteractivePipelineSectionProps) {
  const { snapshot, processAnswer, recordAttempt } = useAIPipeline();
  const [activeStep, setActiveStep] = useState<'diagnost' | 'adapter' | 'explainer' | 'trainer' | 'analyst'>('diagnost');

  // Step 1: Diagnost Interactive State
  const [diagnostAnswer, setDiagnostAnswer] = useState<number | null>(null);

  // Step 2: Adapter Interactive State
  const [adapterLevel, setAdapterLevel] = useState<number>(2);

  // Step 3: Explainer Interactive State
  const [explainerMode, setExplainerMode] = useState<'visual' | 'line' | 'place' | 'story'>('visual');

  // Step 4: Trainer Interactive State
  const [trainerInput, setTrainerInput] = useState<string>('');
  const [trainerCompleted, setTrainerCompleted] = useState<boolean>(false);
  const [trainerXp, setTrainerXp] = useState<number>(60);

  // Step 5: Analyst Interactive View
  const [analystMetric, setAnalystMetric] = useState<'all' | 'growth' | 'errors'>('all');

  const pipelineSteps = [
    {
      id: 'diagnost',
      num: '1',
      title: 'Диагност',
      subtitle: 'Қиындықты анықтау',
      icon: Brain,
      color: 'emerald',
      bgActive: 'bg-emerald-600 text-white',
      borderActive: 'border-emerald-500',
    },
    {
      id: 'adapter',
      num: '2',
      title: 'Бейімдеу',
      subtitle: 'Деңгейді реттеу',
      icon: Sliders,
      color: 'indigo',
      bgActive: 'bg-indigo-600 text-white',
      borderActive: 'border-indigo-500',
    },
    {
      id: 'explainer',
      num: '3',
      title: 'Түсіндіру',
      subtitle: '4 түрлі тәсіл',
      icon: BookOpen,
      color: 'purple',
      bgActive: 'bg-purple-600 text-white',
      borderActive: 'border-purple-500',
    },
    {
      id: 'trainer',
      num: '4',
      title: 'Тренажер',
      subtitle: 'Жеке маршрут',
      icon: TrendingUp,
      color: 'amber',
      bgActive: 'bg-amber-600 text-white',
      borderActive: 'border-amber-500',
    },
    {
      id: 'analyst',
      num: '5',
      title: 'Аналитик',
      subtitle: 'Өсімді дәлелдеу',
      icon: BarChart3,
      color: 'rose',
      bgActive: 'bg-rose-600 text-white',
      borderActive: 'border-rose-500',
    },
  ] as const;

  const cycleExplainerMode = () => {
    const modes: Array<'visual' | 'line' | 'place' | 'story'> = ['visual', 'line', 'place', 'story'];
    const nextIdx = (modes.indexOf(explainerMode) + 1) % modes.length;
    setExplainerMode(modes[nextIdx]);
  };

  const handleTrainerSubmit = () => {
    if (trainerInput.trim() === '2') {
      setTrainerCompleted(true);
      setTrainerXp(80);
    }
  };

  return (
    <section id="how-it-works-section" className="space-y-8 scroll-mt-20">
      {/* Header & Badges */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="blue" className="px-4 py-1.5 text-xs font-black uppercase tracking-wider shadow-soft-xs">
          21-ҚАДАМ: ИНТЕРАКТИВТІ PIPELINE
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          «Қалай жұмыс істейді?» — 5-Сатылы Үздіксіз AI Циклі
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Қатені жай жазаламай, оны талдап, түсіндіріп және жеңіске айналдыратын толық автоматтандырылған педагогикалық конвейер
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 26-ҚАДАМ: 11-БУЫНДЫ ТОЛЫҚ DATA PIPELINE КАРТАСЫ */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white shadow-soft-md border border-slate-800 max-w-5xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider">
              26-ҚАДАМ: БІРТҰТАС AI DATA PIPELINE ЖҮЙЕСІ (11-КЕЗЕҢ)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 font-bold hidden sm:inline">
            Status: LIVE REACTIVE STATE
          </span>
        </div>

        <div className="overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold whitespace-nowrap">
            <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
              1. STUDENT ANSWER
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              2. AI DIAGNOST
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
              3. SKILL PROFILE
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              4. AI ADAPTIVE
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              5. CUSTOM TASK
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
              6. AI EXPLAIN
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              7. AI TRAINER
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              8. PERSONAL ROUTE
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              9. NEW ATTEMPTS
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
              10. AI ANALYTICS
            </span>
            <span className="text-slate-500">➔</span>
            <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
              11. PEDAGOGICAL RECOMMENDATION
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PIPELINE STEP BAR WITH ARROWS */}
      {/* ========================================================================= */}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id as any)}
                className={`relative flex flex-col items-center sm:items-start p-4 rounded-3xl transition-all duration-300 text-left border text-xs ${
                  isActive
                    ? `${step.bgActive} shadow-soft-md border-transparent scale-[1.02] ring-4 ring-${step.color}-500/20`
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-soft-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {step.num}
                  </div>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : `text-${step.color}-500`}`} />
                </div>
                
                <p className="font-black text-sm tracking-tight">{step.title}</p>
                <p className={`text-[11px] font-semibold mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {step.subtitle}
                </p>

                {/* Connecting Arrow for Desktop */}
                {idx < pipelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-300 dark:text-slate-700">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DEMONSTRATION WORKSPACE CARD */}
      {/* ========================================================================= */}
      <Card className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft-md overflow-hidden max-w-5xl mx-auto">
        
        {/* Step 1 Demonstration: AI ДИАГНОСТ */}
        {activeStep === 'diagnost' && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <Badge variant="success" className="mb-1 text-xs">1-ҚАДАМ ДЕМОНСТРАЦИЯСЫ</Badge>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  AI Диагност: «Бала қай жерде қиналады?»
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Оқушының жауабын тексеріп, 7 нақты қате түрін анықтау үлгісін сынап көріңіз:
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onNavigateToModule('diagnost')}
                className="rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Толық Диагностика Модулі ➔
              </Button>
            </div>

            {/* Interactive Question Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500">Диагностикалық Есеп #1</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  Дағды: Разрядтан аттап азайту
                </span>
              </div>

              <div className="text-center py-4">
                <p className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-slate-900 dark:text-white">
                  52 – 18 = <span className="text-emerald-600 underline decoration-dashed">?</span>
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium">Төмендегі жауаптардың бірін таңдап, AI қалай талдайтынын көріңіз:</p>
              </div>

              {/* Answer Choices */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                {[
                  { val: 34, label: '34 (Дұрыс)', isCorrect: true },
                  { val: 44, label: '44 (Қате)', isCorrect: false, mistake: 'subtraction_borrow_error' },
                  { val: 36, label: '36 (Қате)', isCorrect: false, mistake: 'calculation_error' },
                  { val: 40, label: '40 (Қате)', isCorrect: false, mistake: 'concept_error' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setDiagnostAnswer(opt.val)}
                    className={`py-3 px-4 rounded-xl text-xs font-black transition-all border ${
                      diagnostAnswer === opt.val
                        ? opt.isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-soft-xs'
                          : 'bg-rose-600 text-white border-rose-600 shadow-soft-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live AI Analysis Result */}
            {diagnostAnswer !== null && (
              <div className={`p-5 rounded-2xl border text-xs space-y-3 animate-in slide-in-from-top-2 ${
                diagnostAnswer === 34
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm">
                  {diagnostAnswer === 34 ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span>Жауап Дұрыс! Разрядтан аттау алгоритмі толық меңгерілген (Mastery: 92%).</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-rose-600" />
                      <span>Қате Анықталды: «subtraction_borrow_error» (Ондықтан қарыз алмау қатесі)</span>
                    </>
                  )}
                </div>

                {diagnostAnswer !== 34 && (
                  <div className="space-y-2 pt-2 border-t border-amber-200/60 dark:border-amber-800/60">
                    <p className="font-medium">
                      🧠 <strong>AI Талдауы:</strong> Оқушы 2-ден 8-ді азайта алмаған соң, ондықтан қарыз алудың орнына үлкен саннан кішісін алып (8 - 2 = 6) және 50 - 10 = 40 деп, <strong>44</strong> нәтижесін шығарған.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono font-bold text-[11px]">
                      <span className="bg-white/80 dark:bg-slate-900 px-2 py-1 rounded-md border border-amber-300 dark:border-amber-700">
                        Сенімділік (Confidence): 94%
                      </span>
                      <span className="bg-white/80 dark:bg-slate-900 px-2 py-1 rounded-md border border-amber-300 dark:border-amber-700">
                        Кезекке қойылған бақылау сұрақтары: 4 сұрақ (43-17, 61-25, 74-38, 82-49)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2 Demonstration: AI БЕЙІМДЕУШІ */}
        {activeStep === 'adapter' && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <Badge variant="blue" className="mb-1 text-xs">2-ҚАДАМ ДЕМОНСТРАЦИЯСЫ</Badge>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  AI Бейімдеуші: «Тапсырма балаға бейімделеді»
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Оқушының дайындығына қарай бір тақырыпты 4 түрлі қиындық деңгейінде беру:
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onNavigateToModule('adapter')}
                className="rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Толық Бейімдеу Модулі ➔
              </Button>
            </div>

            {/* Level Switcher Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { lvl: 1, label: '1. Қолдау (Визуалды)', desc: 'Текшелер және ыдырату' },
                { lvl: 2, label: '2. Стандарт (Санмен)', desc: '47 + 28 тікелей есебі' },
                { lvl: 3, label: '3. Контексттік', desc: 'Дүкендегі сюжетті есеп' },
                { lvl: 4, label: '4. Күрделі (Кері амал)', desc: 'Логикалық белгісіз сан' },
              ].map((item) => (
                <button
                  key={item.lvl}
                  onClick={() => setAdapterLevel(item.lvl)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    adapterLevel === item.lvl
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-soft-xs'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white'
                  }`}
                >
                  <p className="text-xs font-black">{item.label}</p>
                  <p className={`text-[10px] mt-0.5 font-medium ${adapterLevel === item.lvl ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Live Task Preview for Selected Level */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Таңдалған деңгей: {adapterLevel}-деңгей
                </span>
                <span className="font-semibold text-slate-500">Тақырып: 2 таңбалы сандарды қосу (47 + 28)</span>
              </div>

              {adapterLevel === 1 && (
                <div className="space-y-3 py-2">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    🟢 Разрядтық текшелермен қосу: 47 санын (4 ондық, 7 бірлік) және 28 санын (2 ондық, 8 бірлік) біріктір:
                  </p>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-black">[40 + 20 = 60]</span>
                    <span>+</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-black">[7 + 8 = 15]</span>
                    <span>=</span>
                    <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded font-black text-sm">75</span>
                  </div>
                </div>
              )}

              {adapterLevel === 2 && (
                <div className="space-y-2 py-2">
                  <p className="text-base font-black text-slate-900 dark:text-white font-mono">
                    Есепте: 47 + 28 = ?
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Стандартты бағандап қосу және ойша 1 ондықты келесі разрядқа қосу.</p>
                </div>
              )}

              {adapterLevel === 3 && (
                <div className="space-y-2 py-2">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    🍎 Дүкенге түске дейін <strong>47 кг алма</strong>, ал түстен кейін <strong>28 кг алмұрт</strong> әкелінді. Дүкенге барлығы неше килограмм жеміс әкелінді?
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Сюжетті мәтінді есепке айналдыру және шешу алгоритмін құру.</p>
                </div>
              )}

              {adapterLevel === 4 && (
                <div className="space-y-2 py-2">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    🧩 Себетте белгісіз сан жеміс болды. Одан <strong>28-ін</strong> алғанда, себетте <strong>47 жеміс</strong> қалды. Бастапқыда себетте қанша жеміс болған?
                  </p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Кері амал арқылы логикалық теңдеу құру: x – 28 = 47</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3 Demonstration: AI ТҮСІНДІРУШІ */}
        {activeStep === 'explainer' && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <Badge variant="purple" className="mb-1 text-xs">3-ҚАДАМ ДЕМОНСТРАЦИЯСЫ</Badge>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  AI Түсіндіруші: «Бір есеп — 4 түрлі түсіндіру жолы»
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Бала бір әдісті түсінбесе, «Басқаша түсіндір» батырмасымен келесі мультимодальды режимге ауыстырыңыз:
                </p>
              </div>
              <Button
                size="sm"
                onClick={cycleExplainerMode}
                className="rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white shadow-soft-xs"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Басқаша түсіндір 🔄
              </Button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'visual', label: '1. Визуалды заттар' },
                { key: 'line', label: '2. Сан сәулесі' },
                { key: 'place', label: '3. Разрядтық ыдырату' },
                { key: 'story', label: '4. Өмірлік оқиға' },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setExplainerMode(m.key as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    explainerMode === m.key
                      ? 'bg-purple-600 text-white shadow-soft-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Live Explanation Content */}
            <div className="bg-purple-50/50 dark:bg-purple-950/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-purple-950 dark:text-purple-200 font-mono">
                  Есеп: 12 – 5 = 7
                </span>
                <Badge variant="purple" className="text-[10px]">Режим: {explainerMode.toUpperCase()}</Badge>
              </div>

              {explainerMode === 'visual' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    🔴 12 дөңгелектен 5-еуін алып тастаймыз:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800">
                    <span className="text-xs font-bold text-slate-400">Қалғаны (7):</span>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <span key={i} className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </span>
                    ))}
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="text-xs font-bold text-rose-500">Алынғаны (5):</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="h-6 w-6 rounded-full bg-rose-200 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[10px] line-through font-bold">
                        ✕
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {explainerMode === 'line' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    📏 Сан сәулесінде 12-ден 5 қадам артқа секіреміз:
                  </p>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 font-mono text-xs flex items-center justify-between">
                    <span className="font-bold text-slate-400">0</span>
                    <span className="text-slate-300">····</span>
                    <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">7 (Нәтиже)</span>
                    <span className="text-purple-500 font-bold">⬅ 2 қадам</span>
                    <span className="font-bold text-indigo-600">10 (Тірек сан)</span>
                    <span className="text-purple-500 font-bold">⬅ 3 қадам</span>
                    <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded">12 (Бастапқы)</span>
                  </div>
                </div>
              )}

              {explainerMode === 'place' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    🔢 Разрядтық ыдырату ережесі:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-purple-800">
                      1-қадам: 12 = 10 + 2
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-100 dark:border-purple-800">
                      2-қадам: 10 – 5 = 5
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700 font-black text-emerald-600">
                      3-қадам: 5 + 2 = 7 ✓
                    </div>
                  </div>
                </div>
              )}

              {explainerMode === 'story' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-purple-900 dark:text-purple-300">
                    🍬 Өмірлік сюжет:
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 leading-relaxed font-medium">
                    «Аружанның қолында <strong>12 кәмпит</strong> бар еді. Ол <strong>5 кәмпитті</strong> інісіне берді. Аружанда неше кәмпит қалды? Алдымен ондық қораптан 5-еуін береміз (5 қалады), сосын қолындағы 2 кәмпитті қосамыз: <strong>5 + 2 = 7 кәмпит</strong>.»
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4 Demonstration: AI ТРЕНАЖЕР */}
        {activeStep === 'trainer' && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <Badge variant="warning" className="mb-1 text-xs">4-ҚАДАМ ДЕМОНСТРАЦИЯСЫ</Badge>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  AI Тренажер: «Қатеден жеке оқу маршрутын құру»
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  6-кезеңдік прогресс roadmap. Тапсырманы шешіп, келесі деңгейді ашыңыз:
                </p>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 font-black text-xs text-amber-700 dark:text-amber-300">
                <Flame className="h-4 w-4 text-amber-500" />
                <span>{trainerXp} XP жиналды</span>
              </div>
            </div>

            {/* 6-Stage Roadmap Visualizer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { stage: 1, title: 'Сан құрамы', status: 'completed' },
                { stage: 2, title: 'Ондық толықтыру', status: trainerCompleted ? 'completed' : 'active' },
                { stage: 3, title: 'Модельмен қосу', status: trainerCompleted ? 'active' : 'locked' },
                { stage: 4, title: 'Санмен орындау', status: 'locked' },
                { stage: 5, title: 'Мәтіндік есеп', status: 'locked' },
                { stage: 6, title: 'Өмірлік тапсырма', status: 'locked' },
              ].map((st) => (
                <div
                  key={st.stage}
                  className={`p-3 rounded-2xl border text-center space-y-1 text-xs transition-all ${
                    st.status === 'completed'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                      : st.status === 'active'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-soft-xs scale-105'
                      : 'bg-slate-100/60 border-slate-200 text-slate-400 dark:bg-slate-800/40 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {st.status === 'completed' && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                    {st.status === 'active' && <Flame className="h-3.5 w-3.5 text-white animate-pulse" />}
                    {st.status === 'locked' && <Lock className="h-3 w-3 text-slate-400" />}
                  </div>
                  <p className="font-black text-[11px] leading-tight">{st.title}</p>
                </div>
              ))}
            </div>

            {/* Interactive Micro Exercise */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600 dark:text-slate-300">2-кезең тапсырмасы: Ондықты толықтыру</span>
                <span className="font-mono text-amber-600 font-black">+20 XP Сынақ</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-2 text-2xl font-black font-mono">
                <span>8 +</span>
                <input
                  type="text"
                  placeholder="?"
                  value={trainerInput}
                  onChange={(e) => setTrainerInput(e.target.value)}
                  maxLength={2}
                  className="w-14 h-12 text-center rounded-xl border-2 border-amber-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                />
                <span>= 10</span>

                <Button
                  onClick={handleTrainerSubmit}
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs h-12 px-5 ml-2"
                >
                  Тексеру ➔
                </Button>
              </div>

              {trainerCompleted && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center text-xs font-black text-emerald-700 dark:text-emerald-300 animate-in zoom-in-95">
                  🎉 Жарайсың! +20 XP берілді. 3-кезең «Модельмен қосу» ашылды!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5 Demonstration: AI АНАЛИТИК */}
        {activeStep === 'analyst' && (
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <Badge variant="danger" className="mb-1 text-xs">5-ҚАДАМ ДЕМОНСТРАЦИЯСЫ</Badge>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  AI Аналитик: «Балада нақты не өзгерді?»
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Оқушының даму динамикасын растайтын ғылыми-педагогикалық салыстырмалы синтез:
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => onNavigateToModule('analyst')}
                className="rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white"
              >
                Толық Аналитика Панелі ➔
              </Button>
            </div>

            {/* Snapshot Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Бастапқы Диагностика</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">35%</p>
                <p className="text-xs text-rose-600 font-semibold">«subtraction_borrow_error» анықталған</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Тренажерден кейін</span>
                <p className="text-2xl font-black text-emerald-600">82%</p>
                <p className="text-xs text-emerald-600 font-semibold">Барлық 6 кезеңнен сәтті өтті</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Нақты Өсім (+Growth)</span>
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">+47%</p>
                <p className="text-xs text-indigo-600 font-semibold">Қате қайталанбау деңгейі: 94%</p>
              </div>
            </div>

            {/* Pedagogical Conclusion Box */}
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2">
              <div className="flex items-center gap-2 font-black text-rose-900 dark:text-rose-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Педагогикалық Қорытынды (AI Synthesis):</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                «Оқушы разрядтан аттап азайтуда ондықты қарыз алу алгоритмін толық түсінді. Визуалды блоктар мен сан сәулесі әдістері концептуалды қатені жоюға ең жоғары әсер етті. Ұсыныс: Мәтіндік күрделі есептерге көшуге дайын.»
              </p>
            </div>
          </div>
        )}

      </Card>
    </section>
  );
}
