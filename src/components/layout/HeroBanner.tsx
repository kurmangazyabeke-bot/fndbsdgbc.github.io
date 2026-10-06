'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { Sparkles, Brain, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroBannerProps {
  onStartDiagnostic: () => void;
  onViewTeacherDashboard: () => void;
}

export function HeroBanner({ onStartDiagnostic, onViewTeacherDashboard }: HeroBannerProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950 p-8 sm:p-12 text-white shadow-soft-lg mb-8">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl space-y-6">
        
        {/* Brand Slogan Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-black tracking-wide text-emerald-300">
            {t.brand.slogan}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          MathQadam <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">AI</span>
        </h1>

        {/* Tagline & Description */}
        <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartDiagnostic}
            className="rounded-2xl shadow-glow-emerald font-extrabold"
          >
            <Brain className="h-5 w-5 mr-1" /> {t.hero.startDiagnostic}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onViewTeacherDashboard}
            className="rounded-2xl border-white/20 text-white hover:bg-white/10 dark:border-white/20"
          >
            {t.hero.viewTeacherDashboard} <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Key Feature Micro Badges */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Концептуалды Диагностика</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-400" />
            <span>4 Сюжеттік Түсіндіру</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Педагогикалық Аналитика</span>
          </div>
        </div>

      </div>
    </section>
  );
}
