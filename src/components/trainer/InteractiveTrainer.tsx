'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import {
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Flame,
  Lock,
  Sparkles,
  Award,
  AlertCircle,
  Play,
  RotateCcw,
  Boxes,
  Compass
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AITrainerEngineService, TrainerMasteryEvaluation } from '@/services/ai/trainerEngine';
import { RoadmapStage, MathGap, MathProblem } from '@/types/mathqadam';

interface InteractiveTrainerProps {
  activeGaps?: MathGap[];
  initialLevel?: number;
}

export function InteractiveTrainer({ activeGaps = [], initialLevel = 2.0 }: InteractiveTrainerProps) {
  const { t } = useTranslation();

  // 6-Stage Roadmap state
  const [stages, setStages] = useState<RoadmapStage[]>(() =>
    AITrainerEngineService.getInitial6StageRoadmap()
  );

  // Active stage ID (default: stage-3 'Модельмен қосу')
  const [activeStageId, setActiveStageId] = useState<string>('stage-3');

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[2];
  
  // Current drill in active stage
  const [drillIndex, setDrillIndex] = useState(0);
  const currentDrill: MathProblem = activeStage.drills[drillIndex] || activeStage.drills[0];

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [feedback, setFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');

  // Mastery evaluation of active stage
  const masteryEval: TrainerMasteryEvaluation = AITrainerEngineService.evaluateMasteryScore(activeStage.masteryScore);

  const handleOptionSelect = (opt: string) => {
    if (feedback !== 'IDLE') return;
    setSelectedOption(opt);
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption.trim() === currentDrill.correctAnswer.toString().trim();
    setFeedback(isCorrect ? 'CORRECT' : 'WRONG');

    // Update Mastery score for the stage
    let newScore = activeStage.masteryScore;
    if (isCorrect) {
      newScore = Math.min(100, newScore + 25);
    } else {
      newScore = Math.max(20, newScore - 15);
    }

    // Update stages array & check for unlocking next stage at 85%+
    setStages((prevStages) =>
      prevStages.map((st, idx) => {
        if (st.id === activeStage.id) {
          const isCompleted = newScore >= st.minMasteryToUnlock;
          return {
            ...st,
            masteryScore: newScore,
            status: isCompleted ? 'completed' : 'active',
          };
        }
        // If current stage reached 85%+, unlock the next locked stage!
        if (newScore >= activeStage.minMasteryToUnlock && idx === activeStage.stageNumber) {
          return {
            ...st,
            status: st.status === 'locked' ? 'active' : st.status,
          };
        }
        return st;
      })
    );
  };

  const handleNextDrill = () => {
    setSelectedOption('');
    setFeedback('IDLE');

    if (drillIndex + 1 < activeStage.drills.length) {
      setDrillIndex(drillIndex + 1);
    } else {
      setDrillIndex(0);
    }
  };

  const handleSelectStage = (stage: RoadmapStage) => {
    if (stage.status === 'locked') return;
    setActiveStageId(stage.id);
    setDrillIndex(0);
    setSelectedOption('');
    setFeedback('IDLE');
  };

  return (
    <Card className="mx-auto max-w-5xl shadow-soft-md border-amber-100 dark:border-slate-800 rounded-3xl">
      
      {/* Module Title & Subtitle */}
      <CardHeader className="bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-amber-100/90 p-6 sm:p-8 rounded-t-3xl border-b border-amber-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-soft-xs">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
                AI ТРЕНАЖЕР
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">
                Subtitle: «Қатеден жеке маршрут құру»
              </CardDescription>
            </div>
          </div>

          <Badge variant="purple" className="px-3.5 py-1 text-xs font-black">
            Адаптивті Маршрут v2.0
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-6">

        {/* Targeted Training Direction Alert Banner */}
        <div className="rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 p-6 space-y-3 dark:border-amber-900/60 dark:bg-amber-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <Compass className="h-4 w-4 text-amber-600" /> AI Анализ: 10 тапсырманың 6-уында қате тіркелді
            </div>
            <Badge variant="warning" className="font-extrabold text-[10px]">
              Қате жиілігі: 60%
            </Badge>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              «Сенің бүгінгі жаттығу бағытың: <span className="text-amber-700 dark:text-amber-400">Ондықтан аттап қосу</span>»
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Жүйе қателерді жою үшін төмендегі 6 кезеңдік жеке даму маршрутын (Progress Roadmap) құрды.
            </p>
          </div>
        </div>

        {/* 6-Stage Progress Roadmap Visualizer */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Жеке Маршрут (Progress Roadmap):
            </span>
            <span className="text-xs font-bold text-slate-500">
              Мақсатты шек: <strong>85%+ (Келесі деңгейді ашу)</strong>
            </span>
          </div>

          {/* 6-Stage Grid / Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {stages.map((stage) => {
              const isSelected = activeStageId === stage.id;
              const isCompleted = stage.status === 'completed';
              const isLocked = stage.status === 'locked';

              return (
                <button
                  key={stage.id}
                  disabled={isLocked}
                  onClick={() => handleSelectStage(stage)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400 shadow-soft-xs dark:bg-amber-950/50'
                      : isCompleted
                      ? 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/60 dark:border-emerald-900 dark:bg-emerald-950/30'
                      : isLocked
                      ? 'border-slate-200 bg-slate-100/60 opacity-60 cursor-not-allowed dark:border-slate-800 dark:bg-slate-800/40'
                      : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400">
                      Кезең #{stage.stageNumber}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : isLocked ? (
                      <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                  </div>

                  <h5 className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-2">
                    {stage.titleKaz.replace(/^\d+\.\s*/, '')}
                  </h5>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>Меңгеру:</span>
                      <strong className={isCompleted ? 'text-emerald-700' : 'text-amber-700'}>
                        {stage.masteryScore}%
                      </strong>
                    </div>
                    <Progress
                      value={stage.masteryScore}
                      indicatorColor={isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Drill Workspace */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
          
          {/* Stage Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={activeStage.status === 'completed' ? 'success' : 'warning'} className="font-bold">
                  {activeStage.titleKaz} ({activeStage.status.toUpperCase()})
                </Badge>
                <span className="text-xs text-slate-400 font-semibold">{activeStage.descriptionKaz}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                Кезең Меңгерілуі: <strong className="text-indigo-600 text-base">{activeStage.masteryScore}%</strong>
              </span>
            </div>
          </div>

          {/* Mastery Bracket Notice Box */}
          <div className={`p-4 rounded-2xl border text-xs font-bold ${
            masteryEval.bracket === 'UNLOCKED_NEXT'
              ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900'
              : masteryEval.bracket === 'PREP_NEXT'
              ? 'border-indigo-200 bg-indigo-50/80 text-indigo-900 dark:bg-indigo-950/40 dark:border-indigo-900'
              : masteryEval.bracket === 'MIXED_PRACTICE'
              ? 'border-amber-200 bg-amber-50/80 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900'
              : 'border-rose-200 bg-rose-50/80 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900'
          }`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{masteryEval.feedbackKaz}</span>
            </div>
          </div>

          {/* Question Drill Canvas */}
          <div className="rounded-2xl bg-slate-50/80 p-6 border border-slate-200/80 text-center space-y-4 dark:bg-slate-800/40 dark:border-slate-700">
            <Badge variant="blue" className="px-3 py-1 font-bold">
              {currentDrill.topicKaz}
            </Badge>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentDrill.questionKaz}
            </h3>

            {/* Multiple Choice Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-2">
              {currentDrill.options?.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={feedback !== 'IDLE'}
                  onClick={() => handleOptionSelect(opt)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left font-black text-base transition-all ${
                    selectedOption === opt
                      ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-400 dark:bg-amber-950/50 dark:text-amber-200'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                  }`}
                >
                  <span>{opt}</span>
                  <span className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs ${
                    selectedOption === opt ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Output */}
          {feedback === 'CORRECT' && (
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 animate-in fade-in">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-extrabold text-sm">Дұрыс! Кезең меңгеру баллы артты (+25%).</p>
                <p className="text-xs text-emerald-700">85%+ жеткенде келесі күрделі кезең автоматты түрде ашылады.</p>
              </div>
            </div>
          )}

          {feedback === 'WRONG' && (
            <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-4 border border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 animate-in fade-in">
              <XCircle className="h-6 w-6 text-rose-600 shrink-0" />
              <div>
                <p className="font-extrabold text-sm">Қате жауап! Дұрыс жауап: {currentDrill.correctAnswer}</p>
                <p className="text-xs text-rose-700">Mastery &lt; 50% болғандықтан сол деңгейде қосымша жаттығу беріледі.</p>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            {feedback === 'IDLE' ? (
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedOption}
                onClick={handleAnswerSubmit}
                className="rounded-2xl font-black"
              >
                Жауапты Тексеру
              </Button>
            ) : (
              <Button
                variant="accent"
                size="lg"
                onClick={handleNextDrill}
                className="rounded-2xl font-black"
              >
                Келесі Жаттығу <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>

        </div>

      </CardContent>
    </Card>
  );
}
