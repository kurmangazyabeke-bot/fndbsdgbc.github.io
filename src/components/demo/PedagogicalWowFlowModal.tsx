'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Sparkles,
  Sliders,
  BookOpen,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  X,
  Zap,
  Lock,
  Trophy,
  Flame,
  Award,
  Layers,
  GraduationCap,
  ShieldAlert,
  ChevronRight,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useAIPipeline } from '@/lib/context/AIPipelineContext';

interface PedagogicalWowFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PedagogicalWowFlowModal({ isOpen, onClose }: PedagogicalWowFlowModalProps) {
  const { snapshot, processAnswer, recordAttempt } = useAIPipeline();

  // Current Step (1 to 10)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [interactiveSelectedAnswer, setInteractiveSelectedAnswer] = useState<number | null>(null);
  const [microExerciseInputs, setMicroExerciseInputs] = useState<{ [key: string]: string }>({
    step1: '',
    step2: '',
    step3: '',
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // 10 Comprehensive Stages
  const stepsConfig = [
    {
      step: 1,
      title: '1. Оқушының қате жауабы',
      subtitle: '«52 – 18 = 44» есебі',
      icon: AlertTriangle,
      color: 'rose',
      engine: 'Кіріс сигналы',
    },
    {
      step: 2,
      title: '2. AI Қатені терең анықтау',
      subtitle: 'subtraction_borrow_error талдауы',
      icon: Brain,
      color: 'emerald',
      engine: 'AI ДИАГНОСТ',
    },
    {
      step: 3,
      title: '3. Қосымша тексеру сұрақтары',
      subtitle: '4 бақылау сұрағымен растау',
      icon: ShieldAlert,
      color: 'amber',
      engine: 'AI ДИАГНОСТ ПРОБА',
    },
    {
      step: 4,
      title: '4. Mastery профилін жаңарту',
      subtitle: '32%-ке динамикалық төмендеу',
      icon: Layers,
      color: 'rose',
      engine: 'ПРОФИЛЬ ЖҮЙЕСІ',
    },
    {
      step: 5,
      title: '5. AI Adaptive деңгей таңдау',
      subtitle: '1-Деңгей: Визуалды модельге көшу',
      icon: Sliders,
      color: 'indigo',
      engine: 'AI БЕЙІМДЕУШІ',
    },
    {
      step: 6,
      title: '6. AI Explain жаңаша түсіндіру',
      subtitle: '4 мультимодальды тәсіл',
      icon: BookOpen,
      color: 'purple',
      engine: 'AI ТҮСІНДІРУШІ',
    },
    {
      step: 7,
      title: '7. AI Trainer жеке маршруты',
      subtitle: '6-кезеңдік roadmap генерациясы',
      icon: TrendingUp,
      color: 'amber',
      engine: 'AI ТРЕНАЖЕР',
    },
    {
      step: 8,
      title: '8. Оқушының жаттығу орындауы',
      subtitle: 'Ыдырату және қарыз алу микро-сынағы',
      icon: Zap,
      color: 'emerald',
      engine: 'ОҚУШЫ ПРАКТИКАСЫ',
    },
    {
      step: 9,
      title: '9. AI Analytics Before/After',
      subtitle: '32% ➔ 88% (+56% таза өсім)',
      icon: BarChart3,
      color: 'indigo',
      engine: 'AI АНАЛИТИК',
    },
    {
      step: 10,
      title: '10. Мұғалімге AI Ұсынысы',
      subtitle: 'Педагогикалық шешім және қорытынды',
      icon: GraduationCap,
      color: 'purple',
      engine: 'AI ТӘЛІМГЕР ҚОРЫТЫНДЫСЫ',
    },
  ];

  // Auto-play timer (advance every 5 seconds if playing)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 10) {
            setIsPlaying(false);
            return 10;
          }
          return prev + 1;
        });
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen]);

  // Trigger celebration on step 8 and 9
  useEffect(() => {
    if (currentStep === 8 || currentStep === 9) {
      setShowCelebration(true);
      const t = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  if (!isOpen) return null;

  // Chart data for step 9
  const analyticsComparisonData = [
    { skill: 'Сан құрамы', Baseline: 45, Current: 85, Growth: '+40%' },
    { skill: 'Қосу', Baseline: 40, Current: 78, Growth: '+38%' },
    { skill: 'Азайту (Разрядсыз)', Baseline: 50, Current: 82, Growth: '+32%' },
    { skill: 'Разрядтан аттап азайту', Baseline: 32, Current: 88, Growth: '+56%' },
    { skill: 'Мәтіндік есеп', Baseline: 25, Current: 60, Growth: '+35%' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Outer Modal Container */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* ========================================================================= */}
        {/* HEADER WITH STEP TIMELINE & CONTROLS */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-6 border-b border-indigo-900/60 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-soft-xs">
                <Trophy className="h-6 w-6 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    🏆 Байқау Демосы • WOW Effect Flow
                  </span>
                  <span className="text-[10px] text-indigo-300 font-mono font-bold">5 AI Core Loop</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  «Қатеден Жеке Дамуға Дейінгі 10 Қадамдық Толық AI Циклі»
                </h2>
              </div>
            </div>

            {/* Playback Controls & Close */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-9 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="h-4 w-4 text-amber-300" /> : <Play className="h-4 w-4 fill-white text-white" />}
                <span>{isPlaying ? 'Кідірту' : 'Авто-көрсетілім'}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentStep(1);
                  setIsPlaying(false);
                  setInteractiveSelectedAnswer(null);
                  setMicroExerciseInputs({ step1: '', step2: '', step3: '' });
                }}
                className="h-9 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                title="Қайта басынан бастау"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <button
                onClick={onClose}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all ml-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 10 Step Progress Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {stepsConfig.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.step;
              const isPast = currentStep > s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setCurrentStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black shrink-0 transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-soft-xs ring-2 ring-amber-300'
                      : isPast
                      ? 'bg-white/20 text-emerald-300 hover:bg-white/30'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <span className="w-4 text-center">{s.step}</span>
                  <span className="hidden md:inline truncate max-w-[90px]">{s.engine}</span>
                  {isPast && <Check className="h-3 w-3 text-emerald-300" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN INTERACTIVE STAGE CONTENT */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

          {/* ===================================================================== */}
          {/* STEP 1: Оқушы «52 – 18 = 44» деп жауап береді */}
          {/* ===================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between">
                <Badge variant="danger" className="text-xs font-black uppercase px-3 py-1">
                  1-ҚАДАМ: Бастапқы Сигнал
                </Badge>
                <span className="text-xs text-slate-400 font-bold">Оқушы: Айдос (2-Сынып)</span>
              </div>

              <div className="text-center space-y-2 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Оқушыға берілген есеп:
                </h3>
                <div className="inline-block p-6 rounded-3xl bg-slate-900 text-white font-mono text-4xl sm:text-5xl font-black tracking-wider shadow-soft-md">
                  52 – 18 = ?
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Төмендегі жауаптардың бірін таңдаңыз немесе «44» қатесін тексеріңіз:
                </p>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {[
                  { value: 34, label: '34', desc: 'Дұрыс жауап' },
                  { value: 44, label: '44', desc: 'Оқушы жауабы (Қате!)' },
                  { value: 36, label: '36', desc: 'Есептеу қатесі' },
                  { value: 40, label: '40', desc: 'Жуықтау қатесі' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setInteractiveSelectedAnswer(opt.value);
                      if (opt.value === 44) {
                        setTimeout(() => setCurrentStep(2), 700);
                      }
                    }}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      interactiveSelectedAnswer === opt.value || opt.value === 44
                        ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-400 dark:bg-rose-950/40 dark:border-rose-800'
                        : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                    }`}
                  >
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{opt.label}</div>
                    <div className="text-[10px] font-bold text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-200 text-xs text-center font-bold">
                ⚠️ Айдос <strong>«44»</strong> деп жауап берді (Ондықтан қарыз алмады: 5-1=4, 8-2=6 деп есептеді).
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 2: AI Қатені терең анықтайды */}
          {/* ===================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="purple" className="text-xs font-black uppercase px-3 py-1">
                2-ҚАДАМ: AI ДИАГНОСТ СИНТЕЗІ
              </Badge>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-black">
                    <Brain className="h-5 w-5 animate-pulse" />
                    <span>AI Нейрондық Талдау Аяқталды</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    Анықталған қате типі:
                  </h3>
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-200 space-y-1">
                    <div className="text-xs font-mono font-black text-rose-600 uppercase tracking-wide">
                      MISTAKE TYPE: subtraction_borrow_error
                    </div>
                    <div className="text-lg font-black text-rose-900 dark:text-rose-100">
                      «Разрядтан аттап азайтуда қарыз алуды ұмыту»
                    </div>
                    <p className="text-xs font-medium text-rose-800 dark:text-rose-300">
                      Оқушы 2-ден 8 азаймайтынын көріп, көрші ондықтан 1 ондық алудың орнына, үлкен саннан кіші санды азайта салған (8 - 2 = 6 және 5 - 1 = 4).
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-soft-md space-y-4">
                  <span className="text-xs font-mono text-emerald-400 font-bold block uppercase tracking-wider">
                    // AI Diagnostic Metric Log
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Сұрақ:</span>
                      <span className="text-white font-bold">52 - 18</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Дұрыс жауап:</span>
                      <span className="text-emerald-400 font-bold">34</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Оқушы жауабы:</span>
                      <span className="text-rose-400 font-bold">44 (Қате)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Сенімділік (Confidence):</span>
                      <span className="text-amber-400 font-black">96.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Келесі диагностикалық қадам:</span>
                      <span className="text-indigo-400 font-bold">trigger_verification_probes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 3: Қосымша диагностикалық тапсырмалар пайда болады */}
          {/* ===================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between">
                <Badge variant="warning" className="text-xs font-black uppercase px-3 py-1">
                  3-ҚАДАМ: Тексеру Пробалары (Verification Probes)
                </Badge>
                <span className="text-xs text-amber-600 font-black">Сенімділікті 100% растау</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  AI қосымша 2 бақылау сұрағын берді:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Бұл кездейсоқ жаңсақтық па, әлде тұрақты қателік пе?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="rounded-3xl p-5 border border-amber-200 bg-amber-50/40 dark:bg-slate-900 dark:border-amber-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 dark:text-amber-300">1-Бақылау сұрағы:</span>
                    <Badge variant="danger" className="text-[10px]">ҚАТЕ ЖАУАП БЕРДІ</Badge>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">43 – 17 = ?</div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Оқушы таңдауы: <strong className="text-rose-600">34</strong> (Дұрысы: 26).
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Тағы да қарыз алмады: 4-1=3, 7-3=4 деп жазды.
                  </p>
                </Card>

                <Card className="rounded-3xl p-5 border border-amber-200 bg-amber-50/40 dark:bg-slate-900 dark:border-amber-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-900 dark:text-amber-300">2-Бақылау сұрағы:</span>
                    <Badge variant="danger" className="text-[10px]">ҚАТЕ ЖАУАП БЕРДІ</Badge>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">61 – 25 = ?</div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Оқушы таңдауы: <strong className="text-rose-600">44</strong> (Дұрысы: 36).
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Тағы да қарыз алмады: 6-2=4, 5-1=4 деп жазды.
                  </p>
                </Card>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>Диагноз толық расталды: Оқушыда разрядтан қарыз алу концепциясы түсіндірілмеген.</span>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 4: Жүйе mastery profile жасайды */}
          {/* ===================================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="danger" className="text-xs font-black uppercase px-3 py-1">
                4-ҚАДАМ: ДИНАМИКАЛЫҚ MASTERY ҚАЙТА ЕСЕПТЕЛДІ
              </Badge>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Айдостың Дағдылар Профилі Жаңартылды:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  «Разрядтан аттап азайту» дағдысы қызыл қауіпті аймаққа түсті.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="rounded-3xl p-5 border border-slate-200 bg-slate-50 dark:bg-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Сан құрамы</span>
                  <div className="text-3xl font-black text-emerald-600 mt-1">88%</div>
                  <Progress value={88} indicatorColor="bg-emerald-500" className="mt-2" />
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">Меңгерілді ✓</span>
                </Card>

                <Card className="rounded-3xl p-5 border border-slate-200 bg-slate-50 dark:bg-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Қосу (Разрядпен)</span>
                  <div className="text-3xl font-black text-indigo-600 mt-1">76%</div>
                  <Progress value={76} indicatorColor="bg-indigo-500" className="mt-2" />
                  <span className="text-[10px] text-indigo-700 font-bold mt-1 block">Жақсы деңгей</span>
                </Card>

                <Card className="rounded-3xl p-5 border border-rose-300 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-900 ring-2 ring-rose-400/40">
                  <span className="text-[11px] font-bold text-rose-600 uppercase">Разрядтан аттап азайту</span>
                  <div className="text-3xl font-black text-rose-600 mt-1">32% ⚠️</div>
                  <Progress value={32} indicatorColor="bg-rose-500" className="mt-2" />
                  <span className="text-[10px] text-rose-700 font-black mt-1 block">Шұғыл қолдау қажет!</span>
                </Card>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 5: AI Adaptive келесі деңгейді таңдайды */}
          {/* ===================================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="purple" className="text-xs font-black uppercase px-3 py-1">
                5-ҚАДАМ: AI БЕЙІМДЕУШІ (ADAPTIVE ENGINE)
              </Badge>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Тапсырма баланың нақты ZPD деңгейіне бейімделді:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Абстрактілі сандарды уақытша тоқтатып, 1-деңгейлік визуалды қолдау режимі қосылды.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Card className="rounded-3xl p-4 border-2 border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-soft-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300">1-ДЕҢГЕЙ (ТАҢДАЛДЫ)</span>
                    <Sparkles className="h-4 w-4 text-emerald-600 animate-spin" />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm">Визуалды қолдау</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    Ондық таяқшалар мен бірлік текшелер арқылы ыдырату.
                  </p>
                </Card>

                <Card className="rounded-3xl p-4 border border-slate-200 bg-slate-50 opacity-60 dark:bg-slate-900 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">2-ДЕҢГЕЙ</span>
                  <h4 className="font-black text-slate-700 dark:text-slate-300 text-sm">Стандарт есеп</h4>
                  <p className="text-xs text-slate-500 font-medium">52 - 18 тікелей амал.</p>
                </Card>

                <Card className="rounded-3xl p-4 border border-slate-200 bg-slate-50 opacity-60 dark:bg-slate-900 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">3-ДЕҢГЕЙ</span>
                  <h4 className="font-black text-slate-700 dark:text-slate-300 text-sm">Контекстік сюжет</h4>
                  <p className="text-xs text-slate-500 font-medium">Мәтіндік сюжетті есеп.</p>
                </Card>

                <Card className="rounded-3xl p-4 border border-slate-200 bg-slate-50 opacity-60 dark:bg-slate-900 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">4-ДЕҢГЕЙ</span>
                  <h4 className="font-black text-slate-700 dark:text-slate-300 text-sm">Күрделі / Кері амал</h4>
                  <p className="text-xs text-slate-500 font-medium">x + 18 = 52 теңдеуі.</p>
                </Card>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-200 text-xs font-bold">
                💡 <strong>AI Педагогикалық Ережесі:</strong> Оқушы қате жібергенде тапсырманы қиындатпай, оны түсінікті визуалды баспалдаққа (scaffolding) түсіреміз.
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 6: AI Explain есепті басқа тәсілмен түсіндіреді */}
          {/* ===================================================================== */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="purple" className="text-xs font-black uppercase px-3 py-1">
                6-ҚАДАМ: AI ТҮСІНДІРУШІ (MULTI-METHOD EXPLAINER)
              </Badge>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  «Басқаша Түсіндіру» — 4 Мультимодальды Модель:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Бір есепті бала қабылдай алатын нақты бейнелермен ашып көрсету.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual Block Representation */}
                <Card className="rounded-3xl p-5 border border-indigo-200 bg-indigo-50/40 dark:bg-slate-900 dark:border-indigo-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-800 dark:text-indigo-300">1. Визуалды Текшелер Моделі:</span>
                    <Badge variant="purple" className="text-[10px]">Көрнекілік</Badge>
                  </div>
                  <div className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-slate-700">
                      🟦 52 саны = <strong>5 ондық (50)</strong> және <strong>2 бірлік (2)</strong>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-slate-700">
                      🔄 1 ондықты 10 бірлікке ұсақтаймыз: <strong>4 ондық (40)</strong> + <strong>12 бірлік (12)</strong>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-emerald-800 dark:text-emerald-300">
                      ✨ Енді азайтамыз: (12 – 8 = <strong>4</strong>) және (40 – 10 = <strong>30</strong>) ➔ <strong>34</strong>!
                    </div>
                  </div>
                </Card>

                {/* Number line representation */}
                <Card className="rounded-3xl p-5 border border-purple-200 bg-purple-50/40 dark:bg-slate-900 dark:border-purple-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-800 dark:text-purple-300">2. Сан Сәулесі (Секіру Әдісі):</span>
                    <Badge variant="purple" className="text-[10px]">Координат</Badge>
                  </div>
                  <div className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700">
                      1️⃣ 52 нүктесінен 10 қадам артқа секіреміз: <strong>42</strong>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700">
                      2️⃣ 42 нүктесінен 2 қадам дөңгелек ондыққа: <strong>40</strong>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-slate-700">
                      3️⃣ 40 нүктесінен қалған 6 қадам артқа: <strong>34</strong>!
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 7: AI Trainer жеке маршрут жасайды */}
          {/* ===================================================================== */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="warning" className="text-xs font-black uppercase px-3 py-1">
                7-ҚАДАМ: AI ТРЕНАЖЕР ЖЕКЕ МАРШРУТЫ
              </Badge>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Қатеден Жеке 6-Кезеңдік Roadmap Құрылды:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Оқушы 85%+ жинамай келесі күрделі кезең ашылмайды.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { step: 1, title: 'Ондық пен бірлікті жіктеу', status: 'COMPLETED' },
                  { step: 2, title: '1 ондықты 10 бірлікке ыдырату', status: 'COMPLETED' },
                  { step: 3, title: 'Визуалды текшелермен қарыз алу', status: 'ACTIVE' },
                  { step: 4, title: 'Бағандап қарыз алу алгоритмі', status: 'LOCKED' },
                  { step: 5, title: 'Мәтіндік сюжеттік есептер', status: 'LOCKED' },
                  { step: 6, title: 'Өмірлік бақылау сынағы', status: 'LOCKED' },
                ].map((st) => (
                  <div
                    key={st.step}
                    className={`p-4 rounded-2xl border transition-all ${
                      st.status === 'ACTIVE'
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 ring-2 ring-amber-300'
                        : st.status === 'COMPLETED'
                        ? 'border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20'
                        : 'border-slate-200 bg-slate-50 opacity-60 dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase text-slate-400">Кезең {st.step}</span>
                      <Badge variant={st.status === 'COMPLETED' ? 'success' : st.status === 'ACTIVE' ? 'warning' : 'default'} className="text-[9px]">
                        {st.status === 'COMPLETED' ? 'ӨТІЛДІ' : st.status === 'ACTIVE' ? 'АҒЫМДАҒЫ 🚀' : 'ҚҰЛЫПТАУЛЫ 🔒'}
                      </Badge>
                    </div>
                    <div className="text-xs font-black text-slate-900 dark:text-white leading-snug">{st.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 8: Оқушы бірнеше тапсырма орындайды */}
          {/* ===================================================================== */}
          {currentStep === 8 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between">
                <Badge variant="success" className="text-xs font-black uppercase px-3 py-1">
                  8-ҚАДАМ: ИНТЕРАКТИВТІ МИКРО-ПРАКТИКА
                </Badge>
                <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                  <Flame className="h-4 w-4 fill-amber-500 text-amber-500" /> +75 XP Жинау
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Айдос қадамдық интерактивті жаттығуларды орындады:
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-xs">1</span>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      52 санын ыдырат: <strong>40 + [ 12 ]</strong>
                    </div>
                  </div>
                  <Badge variant="success" className="font-bold text-xs">✓ ДҰРЫС (+25 XP)</Badge>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-xs">2</span>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Бірліктерді азайт: <strong>12 – 8 = [ 4 ]</strong>
                    </div>
                  </div>
                  <Badge variant="success" className="font-bold text-xs">✓ ДҰРЫС (+25 XP)</Badge>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-xs">3</span>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Ондықтарды қос: <strong>(40 – 10) + 4 = 30 + 4 = [ 34 ]</strong>
                    </div>
                  </div>
                  <Badge variant="success" className="font-bold text-xs">✓ 100% МЕҢГЕРІЛДІ (+25 XP)</Badge>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 9: AI Analytics before/after нәтижесін шығарады */}
          {/* ===================================================================== */}
          {currentStep === 9 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="purple" className="text-xs font-black uppercase px-3 py-1">
                9-ҚАДАМ: AI АНАЛИТИК (BEFORE ➔ AFTER ӨСІМІ)
              </Badge>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Педагогикалық Салыстырмалы Динамика:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  «Разрядтан аттап азайту» бойынша бастапқы (Baseline 32%) және қазіргі (88%) нәтиже өсімі.
                </p>
              </div>

              {/* Recharts Bar Comparison */}
              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
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
                    <Bar dataKey="Baseline" fill="#94a3b8" name="Бастапқы (Baseline %)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Current" fill="#10b981" name="Қазіргі (Current %)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200 text-xs font-black text-center">
                🎉 «Разрядтан аттап азайту»: 32% ➔ 88% (+56% таза дәлелденген өсім!)
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* STEP 10: Мұғалімге педагогикалық ұсыныс береді */}
          {/* ===================================================================== */}
          {currentStep === 10 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <Badge variant="purple" className="text-xs font-black uppercase px-3 py-1">
                10-ҚАДАМ: МҰҒАЛІМГЕ AI ПЕДАГОГИКАЛЫҚ ҰСЫНЫСЫ
              </Badge>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Мұғалім мен Ата-анаға Ғылыми Қорытынды:
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  AI циклі оқушының кемшілігін толық жойып, келесі сыныптық тапсырмаларға дайындығын растады.
                </p>
              </div>

              <Card className="rounded-3xl p-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-soft-md border-0 space-y-4">
                <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                  <GraduationCap className="h-5 w-5" />
                  <span>AI Тәлімгердің Педагогикалық Шешімі:</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
                  «Оқушы Айдос Нұрланұлы разрядтан 1 ондықты қарызға алып, оны 10 бірлікке ыдырату механизмін толық түсінді. Қатені қайталау ықтималдығы 4%-тен төмен. Келесі аптада 3 таңбалы сандарды (152 - 78) азайтуға көшу ұсынылады.»
                </p>

                <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-bold text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> 1. Сыныптық жазбаша жұмыстарда қосымша визуалды тірек қажет етпейді.
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> 2. Бастауыш математика бойынша ZPD деңгейі 2.0-ден 3.5-ке дейін өсті.
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* FOOTER ACTIONS & STEP NAVIGATION */}
        {/* ========================================================================= */}
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-black text-slate-500 dark:text-slate-400">
            Қадам: <strong className="text-slate-900 dark:text-white">{currentStep}</strong> / 10
            <span className="mx-2">•</span>
            {stepsConfig[currentStep - 1]?.title}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStep <= 1}
              onClick={() => {
                setCurrentStep((prev) => Math.max(1, prev - 1));
                setIsPlaying(false);
              }}
              className="rounded-xl text-xs font-bold"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Алдыңғы
            </Button>

            {currentStep < 10 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setCurrentStep((prev) => Math.min(10, prev + 1));
                  setIsPlaying(false);
                }}
                className="rounded-xl text-xs font-bold px-4"
              >
                Келесі қадам <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            ) : (
              <Button
                variant="accent"
                size="sm"
                onClick={onClose}
                className="rounded-xl text-xs font-bold px-6 shadow-soft-xs"
              >
                Демоны Аяқтау 🎉
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
