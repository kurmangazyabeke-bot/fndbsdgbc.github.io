'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import {
  Sparkles,
  Zap,
  Sliders,
  Boxes,
  BookOpen,
  ListOrdered,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Settings
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AdaptiveEngine,
  AdaptiveThresholdConfig,
  DEFAULT_ADAPTIVE_CONFIG
} from '@/services/ai/adaptiveEngine';

export function AIAdapterModuleView() {
  const { t } = useTranslation();

  // Configurable thresholds state
  const [config, setConfig] = useState<AdaptiveThresholdConfig>(DEFAULT_ADAPTIVE_CONFIG);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Simulated Student Mastery Score slider (0-100%)
  const [simulatedMastery, setSimulatedMastery] = useState<number>(45);

  // Evaluate adaptation via AdaptiveEngine
  const adaptationResult = AdaptiveEngine.evaluateAdaptation({
    studentId: 'sim-student-1',
    skillId: 'skill_basic_addition',
    currentMastery: simulatedMastery,
    recentErrors: simulatedMastery < 50 ? ['BORROWING_STAGE_FAILED'] : [],
    attempts: 12,
    currentLevel: 1,
    config,
  });

  // Selected preview level (1 | 2 | 3 | 4)
  const [activePreviewLevel, setActivePreviewLevel] = useState<1 | 2 | 3 | 4>(adaptationResult.nextLevel);

  const previewTask = AdaptiveEngine.getTaskForLevel(activePreviewLevel);

  return (
    <Card className="mx-auto max-w-4xl shadow-soft-md border-amber-100 dark:border-slate-800 rounded-3xl">
      
      {/* Module Title & Subtitle */}
      <CardHeader className="bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-amber-100/90 p-6 sm:p-8 rounded-t-3xl border-b border-amber-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-soft-xs">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
                AI БЕЙІМДЕУШІ
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">
                Subtitle: «Тапсырма балаға бейімделеді»
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="rounded-2xl border-amber-200 bg-white text-xs font-bold"
            >
              <Settings className="h-3.5 w-3.5 mr-1 text-amber-600" /> Шектерді Баптау
            </Button>
            <Badge variant="purple" className="px-3.5 py-1 text-xs font-black">
              Adaptive Engine v2.0
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-6">

        {/* Configurable Threshold Settings Box */}
        {showConfigModal && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 space-y-4 dark:border-amber-900 dark:bg-amber-950/40 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Sliders className="h-4 w-4 text-amber-600" /> Конфигурацияланатын Адаптация Шектері:
              </h4>
              <button
                onClick={() => setConfig(DEFAULT_ADAPTIVE_CONFIG)}
                className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> Әдепкі Қалпына Келтіру
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300">1-деңгей Қолдау (Макс %):</label>
                <input
                  type="number"
                  value={config.supportMax}
                  onChange={(e) => setConfig({ ...config, supportMax: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 p-2 font-black dark:border-slate-700 dark:bg-slate-900"
                />
                <span className="text-[10px] text-slate-400">Әдепкі: &lt; 50%</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300">2-деңгей Стандарт (Макс %):</label>
                <input
                  type="number"
                  value={config.standardMax}
                  onChange={(e) => setConfig({ ...config, standardMax: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 p-2 font-black dark:border-slate-700 dark:bg-slate-900"
                />
                <span className="text-[10px] text-slate-400">Әдепкі: 50 – 69%</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300">3-деңгей Контекст (Макс %):</label>
                <input
                  type="number"
                  value={config.contextMax}
                  onChange={(e) => setConfig({ ...config, contextMax: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 p-2 font-black dark:border-slate-700 dark:bg-slate-900"
                />
                <span className="text-[10px] text-slate-400">Әдепкі: 70 – 84% (85%+ Күрделі)</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Student Mastery Slider */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4 shadow-soft-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                Интерактивті Тексеру (Симоляция):
              </span>
              <h4 className="text-base font-black text-slate-900 dark:text-white">
                Оқушының Ұпайы (Mastery Score): <strong className="text-indigo-600 text-xl">{simulatedMastery}%</strong>
              </h4>
            </div>

            <Badge variant="purple" className="px-3.5 py-1 text-xs font-black self-start sm:self-auto">
              Авто-Анықталған: {adaptationResult.levelTitleKaz}
            </Badge>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={simulatedMastery}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSimulatedMastery(val);
              const result = AdaptiveEngine.evaluateAdaptation({
                studentId: 'sim-student-1',
                skillId: 'skill_basic_addition',
                currentMastery: val,
                recentErrors: val < 50 ? ['BORROWING_STAGE_FAILED'] : [],
                attempts: 12,
                currentLevel: 1,
                config,
              });
              setActivePreviewLevel(result.nextLevel);
            }}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-800"
          />

          <div className="grid grid-cols-4 text-[11px] font-extrabold text-slate-500 text-center pt-1">
            <span className={simulatedMastery <= config.supportMax ? 'text-rose-600 font-black' : ''}>&lt; {config.supportMax + 1}% (1-Қолдау)</span>
            <span className={simulatedMastery > config.supportMax && simulatedMastery <= config.standardMax ? 'text-amber-600 font-black' : ''}>{config.supportMax + 1}–{config.standardMax}% (2-Стандарт)</span>
            <span className={simulatedMastery > config.standardMax && simulatedMastery <= config.contextMax ? 'text-indigo-600 font-black' : ''}>{config.standardMax + 1}–{config.contextMax}% (3-Контекст)</span>
            <span className={simulatedMastery > config.contextMax ? 'text-emerald-600 font-black' : ''}>{config.contextMax + 1}%+ (4-Күрделі)</span>
          </div>
        </div>

        {/* 4 Level Tabs Showcase Header */}
        <div>
          <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-3">
            Тақырып: Екі таңбалы сандарды қосу (4 Деңгейлік Тармақтар):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => setActivePreviewLevel(1)}
              className={`p-3.5 rounded-2xl border text-left text-xs font-black transition-all ${
                activePreviewLevel === 1
                  ? 'border-amber-500 bg-amber-500 text-white shadow-soft-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              1-деңгей — қолдау
            </button>

            <button
              onClick={() => setActivePreviewLevel(2)}
              className={`p-3.5 rounded-2xl border text-left text-xs font-black transition-all ${
                activePreviewLevel === 2
                  ? 'border-amber-500 bg-amber-500 text-white shadow-soft-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              2-деңгей — стандарт
            </button>

            <button
              onClick={() => setActivePreviewLevel(3)}
              className={`p-3.5 rounded-2xl border text-left text-xs font-black transition-all ${
                activePreviewLevel === 3
                  ? 'border-amber-500 bg-amber-500 text-white shadow-soft-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              3-деңгей — контекст
            </button>

            <button
              onClick={() => setActivePreviewLevel(4)}
              className={`p-3.5 rounded-2xl border text-left text-xs font-black transition-all ${
                activePreviewLevel === 4
                  ? 'border-amber-500 bg-amber-500 text-white shadow-soft-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              4-деңгей — күрделі
            </button>
          </div>
        </div>

        {/* Selected Level Task Details Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              {previewTask.topicKaz}
            </h4>
            <Badge variant="warning" className="px-3 py-1 font-bold">
              Қиындық: {previewTask.difficulty.toFixed(1)}
            </Badge>
          </div>

          <div className="rounded-2xl bg-amber-50/60 p-5 border border-amber-100 dark:bg-amber-950/30 dark:border-amber-900">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
              Тапсырма Мәтіні:
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {previewTask.questionKaz}
            </h3>
          </div>

          {/* Level 1 Visual Model Representation */}
          {activePreviewLevel === 1 && (
            <div className="rounded-2xl bg-emerald-50/80 p-6 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 space-y-3">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Boxes className="h-4 w-4 text-emerald-600" /> Визуалды Модель (Разрядтық Ыдырату):
              </span>
              <div className="font-mono text-base font-black text-slate-900 dark:text-white space-y-1 bg-white p-4 rounded-xl border border-emerald-100 shadow-soft-xs">
                <p>20 + 10 = 30</p>
                <p>3 + 4 = 7</p>
                <p className="text-emerald-700 font-extrabold pt-2 border-t">Нәтиже: 30 + 7 = 37</p>
              </div>
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {previewTask.options?.map((opt, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-3.5 text-center font-black text-base ${
                  opt.includes(previewTask.correctAnswer.toString())
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/50'
                    : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800'
                }`}
              >
                {opt}
              </div>
            ))}
          </div>

          {/* Engine Parameters Output Box */}
          <div className="rounded-2xl bg-slate-900 p-5 text-white font-mono text-xs space-y-2 pt-4">
            <span className="text-slate-400 font-bold block uppercase tracking-wider">
              AdaptiveEngine Output JSON Параметрлері:
            </span>
            <div className="grid grid-cols-2 gap-2 font-semibold">
              <div>nextLevel: <strong className="text-emerald-400">{adaptationResult.nextLevel}</strong></div>
              <div>taskType: <strong className="text-indigo-400">{adaptationResult.taskType}</strong></div>
              <div>difficulty: <strong className="text-amber-400">{adaptationResult.difficulty}</strong></div>
              <div>explanationMode: <strong className="text-purple-400">{adaptationResult.explanationMode}</strong></div>
              <div>reinforcementRequired: <strong className="text-rose-400">{String(adaptationResult.reinforcementRequired)}</strong></div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
