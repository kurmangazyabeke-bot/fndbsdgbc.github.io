'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import {
  Sparkles,
  Boxes,
  ListOrdered,
  BookOpen,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingDown,
  RefreshCw,
  Candy
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIExplainerEngine } from '@/services/ai/explainer';
import { ExplanationStyle, MathProblem, ExplanationOption } from '@/types/mathqadam';

export function MultiMethodExplainer() {
  const { t } = useTranslation();
  const problems: MathProblem[] = AIExplainerEngine.getSampleProblems();
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [activeStyle, setActiveStyle] = useState<ExplanationStyle>('VISUAL');

  const problem = problems[selectedProblemIndex] || problems[0];
  
  // Safe fallback explanation mode if selected mode is undefined
  const explanation: ExplanationOption =
    problem.explanations[activeStyle] ||
    problem.explanations.VISUAL ||
    Object.values(problem.explanations)[0]!;

  const handleExplainDifferently = () => {
    const nextMode = AIExplainerEngine.getNextExplanationMode(activeStyle);
    setActiveStyle(nextMode);
  };

  return (
    <Card className="mx-auto max-w-4xl shadow-soft-md border-indigo-100 dark:border-slate-800 rounded-3xl">
      
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-pink-50/90 p-6 sm:p-8 rounded-t-3xl border-b border-indigo-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-soft-xs">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
                AI ТҮСІНДІРУШІ
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-400">
                Subtitle: «Бір есеп — бірнеше түсіндіру жолы»
              </CardDescription>
            </div>
          </div>

          {/* Problem Selector Buttons */}
          <div className="flex gap-2">
            {problems.map((p, idx) => (
              <Button
                key={p.id}
                size="sm"
                variant={selectedProblemIndex === idx ? 'accent' : 'outline'}
                onClick={() => {
                  setSelectedProblemIndex(idx);
                  setActiveStyle('VISUAL');
                }}
                className="text-xs rounded-2xl font-extrabold"
              >
                {p.questionKaz}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-6">

        {/* Question Card (Сұрақ карточкасы) */}
        <div className="rounded-3xl bg-indigo-50/80 p-6 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 text-center space-y-2 shadow-soft-xs">
          <Badge variant="purple" className="px-3 py-1 font-extrabold mb-1">
            {problem.topicKaz}
          </Badge>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {problem.questionKaz}
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            Дұрыс жауабы: <strong className="text-emerald-600 font-black text-sm">{problem.correctAnswer}</strong>
          </p>
        </div>

        {/* Mode Selector Header Label: «Қалай түсіндіргің келеді?» */}
        <div>
          <label className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-wider block mb-3 text-center sm:text-left">
            «Қалай түсінгің келеді?» (4 Түрлі Түсіндіру Тәсілі):
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="tablist" aria-label="Түсіндіру тәсілдері">
            <button
              role="tab"
              aria-selected={activeStyle === 'VISUAL'}
              onClick={() => setActiveStyle('VISUAL')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all gap-2 min-h-[56px] focus-visible:ring-4 focus-visible:ring-indigo-500 ${
                activeStyle === 'VISUAL'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-soft-xs scale-[1.02]'
                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <Boxes className="h-6 w-6" aria-hidden="true" />
              <span>[Көрсетіп түсіндір]</span>
            </button>

            <button
              role="tab"
              aria-selected={activeStyle === 'NUMBER_LINE'}
              onClick={() => setActiveStyle('NUMBER_LINE')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all gap-2 min-h-[56px] focus-visible:ring-4 focus-visible:ring-indigo-500 ${
                activeStyle === 'NUMBER_LINE'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-soft-xs scale-[1.02]'
                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <TrendingDown className="h-6 w-6" aria-hidden="true" />
              <span>[Сан сәулесімен]</span>
            </button>

            <button
              role="tab"
              aria-selected={activeStyle === 'STEP_BY_STEP'}
              onClick={() => setActiveStyle('STEP_BY_STEP')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all gap-2 min-h-[56px] focus-visible:ring-4 focus-visible:ring-indigo-500 ${
                activeStyle === 'STEP_BY_STEP'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-soft-xs scale-[1.02]'
                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <ListOrdered className="h-6 w-6" aria-hidden="true" />
              <span>[Қадам бойынша]</span>
            </button>

            <button
              role="tab"
              aria-selected={activeStyle === 'STORY'}
              onClick={() => setActiveStyle('STORY')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all gap-2 min-h-[56px] focus-visible:ring-4 focus-visible:ring-indigo-500 ${
                activeStyle === 'STORY'
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-soft-xs scale-[1.02]'
                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <BookOpen className="h-6 w-6" aria-hidden="true" />
              <span>[Өмірлік мысал]</span>
            </button>
          </div>
        </div>

        {/* Active Explanation Content Card */}
        <div
          className="rounded-3xl border-2 border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft-xs dark:border-slate-800 dark:bg-slate-900 space-y-5"
          role="tabpanel"
          aria-label={explanation.titleKaz}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-amber-500" aria-hidden="true" />
              {explanation.titleKaz}
            </h4>
            <Badge variant="blue" className="px-3 py-1 text-xs font-black">{activeStyle}</Badge>
          </div>

          <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 font-black leading-relaxed">
            {explanation.contentKaz}
          </p>

          {/* 1. VISUAL MODE: Object Removal (12 Candy items with 5 removed) */}
          {activeStyle === 'VISUAL' && (
            <div className="rounded-2xl bg-amber-50/70 p-6 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900 space-y-3 text-center">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                12 кәмпиттің 5-еуін сызып, алып тастау:
              </span>
              
              <div className="flex flex-wrap justify-center gap-3 py-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isRemoved = i >= 7; // 12 - 5 = 7 remain
                  return (
                    <div
                      key={i}
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border text-xl transition-all shadow-soft-xs ${
                        isRemoved
                          ? 'border-rose-300 bg-rose-100 text-rose-400 line-through opacity-50 dark:bg-rose-950 dark:border-rose-900'
                          : 'border-emerald-300 bg-emerald-100 text-emerald-800 font-black dark:bg-emerald-950 dark:border-emerald-800'
                      }`}
                    >
                      🍬
                      {isRemoved && (
                        <span className="absolute inset-0 flex items-center justify-center text-rose-600 font-black text-2xl">
                          ✕
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs font-black text-emerald-700 dark:text-emerald-300 pt-1">
                Қалған боялған кәмпиттер саны: 7
              </p>
            </div>
          )}

          {/* 2. NUMBER LINE MODE: Interactive Number Line (12 back 5 steps to 7) */}
          {activeStyle === 'NUMBER_LINE' && (
            <div className="rounded-2xl bg-indigo-50/70 p-6 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900 space-y-4 text-center">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                Сан Сәулесі (12-ден Артқа 5 Қадам):
              </span>

              {/* Number Line Visual Track */}
              <div className="flex justify-center items-center gap-2 sm:gap-4 overflow-x-auto py-3">
                {[7, 8, 9, 10, 11, 12].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center font-black text-base ${
                      num === 12
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-soft-xs'
                        : num === 7
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-soft-xs ring-4 ring-emerald-400/30'
                        : 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
                    }`}>
                      {num}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      {num === 12 ? 'Бастау' : num === 7 ? 'Нәтиже (7)' : `<- қадам`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                12 ➔ 11 ➔ 10 ➔ 9 ➔ 8 ➔ <strong>7</strong> (5 Қадам артқа жүрдік)
              </div>
            </div>
          )}

          {/* Steps list */}
          {explanation.steps && explanation.steps.length > 0 && (
            <div className="space-y-2 pt-2">
              {explanation.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-black text-indigo-700">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          )}

          {/* Prominent "Басқаша түсіндір" Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-semibold text-center sm:text-left">
              Бала бұл түсіндіруді түсінбесе, жүйе автоматты түрде басқа режимді ұсынады.
            </p>

            <Button
              variant="accent"
              size="lg"
              onClick={handleExplainDifferently}
              className="rounded-2xl shadow-soft-xs font-black w-full sm:w-auto shrink-0"
            >
              <RefreshCw className="h-4 w-4 mr-1.5" /> «Басқаша түсіндір»
            </Button>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}
