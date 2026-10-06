'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { useAuth } from '@/lib/context/AuthContext';
import { useRole } from '@/lib/context/RoleContext';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Sliders,
  BookOpen,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Zap,
  Users,
  GraduationCap,
  User,
  ChevronRight,
  Check,
  HelpCircle,
  Clock,
  PlayCircle,
  Layers,
  Trophy,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { InteractivePipelineSection } from './InteractivePipelineSection';
import { PedagogicalImpactSection } from './PedagogicalImpactSection';

interface LandingPageViewProps {
  onStartPlatform: () => void;
  onNavigateToModule: (moduleKey: 'diagnost' | 'adapter' | 'explainer' | 'trainer' | 'analyst') => void;
}

export function LandingPageView({ onStartPlatform, onNavigateToModule }: LandingPageViewProps) {
  const { t } = useTranslation();
  const { user, isAuthenticated, openAuthModal, quickDemoLogin } = useAuth();
  const { setRole, setTeacherTab, setStudentTab, openWowModal } = useRole();

  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'diagnost' | 'adapter' | 'explainer' | 'trainer' | 'analyst'>('diagnost');

  const scrollToWorkflow = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTeacherCabinet = () => {
    quickDemoLogin('teacher', 'aigul');
    setRole('teacher');
    setTeacherTab('dashboard');
  };

  const handleStudentCabinet = () => {
    quickDemoLogin('student', 'aidos');
    setRole('student');
    setStudentTab('my_dashboard');
  };

  return (
    <div className="space-y-12 pb-12">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 p-8 sm:p-14 text-white shadow-soft-lg border border-slate-800/80">
        
        {/* Background Glowing Orbs */}
        <div className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-32 -left-32 h-[550px] w-[550px] rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8 text-center sm:text-left">
          
          {/* Brand Slogan Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20 shadow-soft-xs hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs sm:text-sm font-black tracking-wide text-emerald-300">
              «Әр балаға — өз математикалық қадамы»
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-sm">
              MathQadam <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">AI</span>
            </h1>
            
            <p className="text-lg sm:text-2xl font-black text-emerald-300 tracking-tight leading-snug drop-shadow-sm">
              «Диагностикалайды. Бейімдейді. Түсіндіреді. Жаттықтырады. Нәтижені талдайды.»
            </p>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
              Бастауыш сынып (1–4) оқушыларының математикалық қиындықтарын дәл анықтап, қатеден жеке білім беру маршрутын құратын инновациялық EdTech + AI платформасы.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
            <Button
              size="lg"
              onClick={openWowModal}
              className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm px-8 py-6 shadow-glow-amber border-0 hover:scale-105 transition-all animate-pulse"
            >
              <Trophy className="h-5 w-5 mr-2 text-amber-100" />
              🏆 Байқау Демосы (WOW Flow)
            </Button>

            <Button
              size="lg"
              onClick={onStartPlatform}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm px-8 py-6 shadow-glow-emerald border-0 hover:scale-105 transition-all"
            >
              <Brain className="h-5 w-5 mr-2" />
              Платформаны бастау ➔
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToWorkflow}
              className="rounded-2xl border-white/30 text-white hover:bg-white/10 dark:border-white/30 text-sm font-black px-6 py-6 backdrop-blur-sm"
            >
              <HelpCircle className="h-4 w-4 mr-2 text-indigo-400" />
              Қалай жұмыс істейді?
            </Button>
          </div>

          {/* Quick Cabinet Jump for Demo */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-bold text-slate-300">
            <span className="text-slate-400 font-extrabold">Жылдам кіру:</span>
            <button
              onClick={handleTeacherCabinet}
              className="px-4 py-2 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 flex items-center gap-2 transition-all hover:scale-105 shadow-soft-xs"
            >
              <GraduationCap className="h-4 w-4 text-indigo-300" /> Мұғалім Кабинеті (4 «А»)
            </button>
            <button
              onClick={handleStudentCabinet}
              className="px-4 py-2 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 flex items-center gap-2 transition-all hover:scale-105 shadow-soft-xs"
            >
              <User className="h-4 w-4 text-emerald-300" /> Оқушы Кабинеті (Айдос)
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 25-ҚАДАМ: БАЙҚАУҒА АРНАЛҒАН «WOW EFFECT» DEMO SHOWCASE BANNER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-700 p-6 sm:p-8 text-white shadow-soft-lg hover:shadow-soft-xl transition-all">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-black backdrop-blur-md">
              <Trophy className="h-4 w-4 text-amber-200" />
              <span>25-ҚАДАМ: Педагогикалық Байқау Үшін Арнайы Flow</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-200" />
              <span>10 Қадамдық Толық Цикл</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black drop-shadow-sm">
              «52 – 18 = 44» Қатесінен ➔ 88% Жеке Нәтижеге Дейін!
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 font-semibold max-w-2xl leading-relaxed">
              AI Диагност ➔ AI Бейімдеуші ➔ AI Түсіндіруші ➔ AI Тренажер ➔ AI Аналитик қозғалтқыштарының бір-бірімен үздіксіз байланысын тікелей көріңіз.
            </p>
          </div>

          <Button
            size="lg"
            onClick={openWowModal}
            className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-sm px-8 py-6 shadow-soft-md shrink-0 hover:scale-105 transition-all"
          >
            <Play className="h-5 w-5 mr-2 text-amber-600 fill-amber-600" />
            WOW Демоны Қосу (10 Қадам) ➔
          </Button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 5 НЕГІЗГІ AI ФУНКЦИЯСЫ (HERO АСТЫНДАҒЫ КАРТОЧКАЛАР) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge variant="purple" className="px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-soft-xs">
            Негізгі AI Қозғалтқыштары
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            5 Негізгі AI Архитектурасы
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Әр балаға жеке бейімделу үшін қатар жұмыс істейтін 5 инновациялық интеллектуалды модуль
          </p>
        </div>

        {/* 5 AI Cards Grid with Micro-Interactions and Glows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          
          {/* Card 1: AI ДИАГНОСТ */}
          <Card
            onClick={() => onNavigateToModule('diagnost')}
            className="rounded-3xl p-5 border-2 border-emerald-100 hover:border-emerald-500 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-soft-xs hover:shadow-soft-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all dark:bg-emerald-950/60 dark:text-emerald-400 shadow-soft-xs">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">
                  1-МОДУЛЬ
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  AI ДИАГНОСТ
                </h3>
                <p className="text-xs font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                  «Бала қай жерде қиналады?»
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Қате үлгісі мен 7 нақты қате түрін (subtraction_borrow_error, т.б.) анықтап, сенімділікті растау үшін 4 бақылау сұрағын шығарады.
              </p>
            </div>

            <div className="pt-4 flex items-center text-xs font-black text-emerald-600 group-hover:translate-x-1.5 transition-transform">
              Модульді ашу <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Card>

          {/* Card 2: AI БЕЙІМДЕУШІ */}
          <Card
            onClick={() => onNavigateToModule('adapter')}
            className="rounded-3xl p-5 border-2 border-indigo-100 hover:border-indigo-500 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-soft-xs hover:shadow-soft-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all dark:bg-indigo-950/60 dark:text-indigo-400 shadow-soft-xs">
                <Sliders className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                  2-МОДУЛЬ
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  AI БЕЙІМДЕУШІ
                </h3>
                <p className="text-xs font-black text-indigo-700 dark:text-indigo-400 mt-0.5">
                  «Тапсырма балаға бейімделеді»
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Бір тапсырманы 4 деңгейге автоматты бейімдейді: 1. Қолдау (визуалды), 2. Стандарт (47+28), 3. Контекст (сюжет), 4. Күрделі (кері амал).
              </p>
            </div>

            <div className="pt-4 flex items-center text-xs font-black text-indigo-600 group-hover:translate-x-1.5 transition-transform">
              Модульді ашу <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Card>

          {/* Card 3: AI ТҮСІНДІРУШІ */}
          <Card
            onClick={() => onNavigateToModule('explainer')}
            className="rounded-3xl p-5 border-2 border-purple-100 hover:border-purple-500 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-soft-xs hover:shadow-soft-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 transition-all dark:bg-purple-950/60 dark:text-purple-400 shadow-soft-xs">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-wider block">
                  3-МОДУЛЬ
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  AI ТҮСІНДІРУШІ
                </h3>
                <p className="text-xs font-black text-purple-700 dark:text-purple-400 mt-0.5">
                  «Бір есеп — бірнеше түсіндіру»
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                «Басқаша түсіндір» батырмасымен 4 режим: 1. Визуалды заттық, 2. Сан сәулесі, 3. Разрядтық жіктеу, 4. Өмірлік мысал.
              </p>
            </div>

            <div className="pt-4 flex items-center text-xs font-black text-purple-600 group-hover:translate-x-1.5 transition-transform">
              Модульді ашу <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Card>

          {/* Card 4: AI ТРЕНАЖЕР */}
          <Card
            onClick={() => onNavigateToModule('trainer')}
            className="rounded-3xl p-5 border-2 border-amber-100 hover:border-amber-500 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-soft-xs hover:shadow-soft-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:scale-110 transition-all dark:bg-amber-950/60 dark:text-amber-400 shadow-soft-xs">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider block">
                  4-МОДУЛЬ
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  AI ТРЕНАЖЕР
                </h3>
                <p className="text-xs font-black text-amber-700 dark:text-amber-400 mt-0.5">
                  «Қатеден жеке маршрут құру»
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                6 кезеңдік прогресс roadmap (locked, active, completed). 85%+ жинамай келесі күрделі кезең ашылмайды.
              </p>
            </div>

            <div className="pt-4 flex items-center text-xs font-black text-amber-600 group-hover:translate-x-1.5 transition-transform">
              Модульді ашу <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Card>

          {/* Card 5: AI АНАЛИТИК */}
          <Card
            onClick={() => onNavigateToModule('analyst')}
            className="rounded-3xl p-5 border-2 border-rose-100 hover:border-rose-500 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-soft-xs hover:shadow-soft-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white group-hover:scale-110 transition-all dark:bg-rose-950/60 dark:text-rose-400 shadow-soft-xs">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wider block">
                  5-МОДУЛЬ
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  AI АНАЛИТИК
                </h3>
                <p className="text-xs font-black text-rose-700 dark:text-rose-400 mt-0.5">
                  «Балада нақты не өзгерді?»
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Педагогикалық жобаның дәлелдеу құралы: Бастапқы ➔ Кейінгі динамика, Recharts графигі, 5 нақты педагогикалық өлшем.
              </p>
            </div>

            <div className="pt-4 flex items-center text-xs font-black text-rose-600 group-hover:translate-x-1.5 transition-transform">
              Модульді ашу <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Card>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 21-ҚАДАМ: «ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ?» ИНТЕРАКТИВТІ PIPELINE БӨЛІМІ */}
      {/* ========================================================================= */}
      <InteractivePipelineSection onNavigateToModule={onNavigateToModule} />

      {/* ========================================================================= */}
      {/* 4. 22-ҚАДАМ: ПЕДАГОГИКАЛЫҚ НӘТИЖЕНІ КӨРСЕТ («ПЛАТФОРМА НЕ ІСТЕЙДІ?») */}
      {/* ========================================================================= */}
      <PedagogicalImpactSection />

      {/* ========================================================================= */}
      {/* 4. КІМГЕ АРНАЛҒАН? (МҰҒАЛІМ ЖӘНЕ ОҚУШЫ КАБИНЕТТЕРІ) */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Teacher Cabinet Entrance */}
        <Card className="rounded-3xl p-8 bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-0 shadow-soft-md space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-300">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black">
              Мұғалімнің Басқару Панелі
            </h3>
            <p className="text-xs text-indigo-200 font-medium leading-relaxed">
              Сыныптар ашу (`4 «А»`), оқушыларға жеке кіру кодтарын беру, тапсырмалар құрастыру (7 тип) және әр оқушының қиналған тұстарына арналған AI ұсынымдарын көру.
            </p>
          </div>

          <Button
            onClick={handleTeacherCabinet}
            className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs py-3"
          >
            Мұғалім Кабинетіне Кіру (Демо) ➔
          </Button>
        </Card>

        {/* Student Cabinet Entrance */}
        <Card className="rounded-3xl p-8 bg-gradient-to-br from-emerald-900 to-slate-900 text-white border-0 shadow-soft-md space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300">
              <User className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black">
              Оқушының Жеке Кабинеті
            </h3>
            <p className="text-xs text-emerald-200 font-medium leading-relaxed">
              «Сәлем, Айдос!», бүгінгі 5-қадамды маршрут (Сан құрамы ✓ ➔ Ондықты толықтыру ✓ ➔ Модельмен қосу), 7 күндік streak, XP жинау және badges жүйесі.
            </p>
          </div>

          <Button
            onClick={handleStudentCabinet}
            className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-3"
          >
            Оқушы Кабинетіне Кіру (Айдос) ➔
          </Button>
        </Card>

      </section>

    </div>
  );
}
