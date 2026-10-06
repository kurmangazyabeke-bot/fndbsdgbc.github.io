'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Zap,
  Activity,
  ShieldAlert,
  Search,
  Check,
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
  Target,
  FileCheck,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AIDiagnostEngine,
  DiagnosticMistakeType,
  DiagnosticEvaluationResult,
  AssessmentAnswer,
  DetailedDiagnosticResult,
  evaluateStudentAnswer
} from '@/services/ai/diagnosticEngine';
import { MathGap, MathProblem, SkillMasteryItem, SkillStatus } from '@/types/mathqadam';

interface DiagnosticRunnerProps {
  onDiagnosticComplete: (gaps: MathGap[], level: number) => void;
}

// Sample Diagnostic Bank to test all mistake types live
const DIAGNOSTIC_TEST_SUITE: MathProblem[] = [
  {
    id: 'p-diag-borrow-main',
    skillId: 'skill_borrow_subtraction',
    topicKaz: 'Разрядтан аттап азайту (52 – 18)',
    grade: 2,
    difficulty: 2.5,
    questionKaz: '52 – 18 = ?',
    correctAnswer: '34',
    options: ['44', '34', '46', '36'],
    targetMisconception: 'BORROWING_STAGE_FAILED',
    explanations: {}
  },
  {
    id: 'p-diag-place-value',
    skillId: 'skill_number_composition',
    topicKaz: 'Санның разрядтық құрамы',
    grade: 2,
    difficulty: 1.5,
    questionKaz: '35 саны неше ондық және неше бірліктен тұрады?',
    correctAnswer: '3 ондық 5 бірлік',
    options: ['3 ондық 5 бірлік', '5 ондық 3 бірлік', '35 бірлік 0 ондық', '30 ондық 5 бірлік'],
    explanations: {}
  },
  {
    id: 'p-diag-carry-addition',
    skillId: 'skill_basic_addition',
    topicKaz: 'Ондықтан аттап қосу',
    grade: 2,
    difficulty: 2.0,
    questionKaz: '28 + 15 = ?',
    correctAnswer: '43',
    options: ['43', '33', '42', '53'],
    explanations: {}
  },
  {
    id: 'p-diag-word-problem',
    skillId: 'skill_word_problems',
    topicKaz: 'Мәтіндік өмірлік есеп',
    grade: 2,
    difficulty: 2.8,
    questionKaz: 'Дүкенде 65 дәптер болды. Түске дейін 28 дәптер сатылды. Неше дәптер қалды?',
    correctAnswer: '37 дәптер',
    options: ['37 дәптер', '47 дәптер', '93 дәптер', '35 дәптер'],
    explanations: {}
  }
];

import { AILoadingIndicator } from '@/components/ui/loading-state';
import { useToast } from '@/lib/context/ToastContext';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';

export function DiagnosticRunner({ onDiagnosticComplete }: DiagnosticRunnerProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const toast = useToast();

  const [selectedSuiteIndex, setSelectedSuiteIndex] = useState<number>(0);
  const activePrimaryProblem = DIAGNOSTIC_TEST_SUITE[selectedSuiteIndex];
  const probeQuestions = AIDiagnostEngine.getBorrowingProbeQuestions();

  // Test Phases: 'PRIMARY_QUESTION' -> 'PROBE_QUESTIONS' -> 'DIAGNOSTIC_PROFILE'
  const [phase, setPhase] = useState<'PRIMARY_QUESTION' | 'PROBE_QUESTIONS' | 'DIAGNOSTIC_PROFILE'>('PRIMARY_QUESTION');
  
  const [userAnswers, setUserAnswers] = useState<AssessmentAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [probeIndex, setProbeIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Live Real-Time Evaluation Result
  const [latestEvaluation, setLatestEvaluation] = useState<DiagnosticEvaluationResult | null>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<DetailedDiagnosticResult | null>(null);

  // Current Problem depending on Phase
  const currentProblem = phase === 'PRIMARY_QUESTION' ? activePrimaryProblem : probeQuestions[probeIndex];

  // 1. Submit Primary Answer with AI Reasoning State
  const handlePrimarySubmit = () => {
    if (!selectedOption || isAnalyzing) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      // STEP 1 to 4: Real-time Evaluation
      const evalResult = evaluateStudentAnswer({
        question: activePrimaryProblem,
        correctAnswer: String(activePrimaryProblem.correctAnswer),
        studentAnswer: selectedOption,
        skill: activePrimaryProblem.skillId,
        previousMastery: 70
      });

      setLatestEvaluation(evalResult);

      const answer: AssessmentAnswer = {
        problemId: activePrimaryProblem.id,
        userAnswer: selectedOption,
        timeSpentSec: 14,
        problem: activePrimaryProblem,
        evaluation: evalResult
      };

      const newAnswers = [answer];
      setUserAnswers(newAnswers);
      setSelectedOption('');
      setIsAnalyzing(false);

      if (evalResult.isCorrect) {
        toast.success('Жауап дұрыс! Дағды меңгерілуі жоғары', 'AI Диагностика');
      } else {
        toast.ai(
          `Қате анықталды: ${evalResult.mistakeType || 'concept_error'} (${evalResult.identifiedDifficultyKaz || 'Ондықтан қарыз алмау'})`,
          'AI Диагностика'
        );
      }
    }, 600);
  };

  // 2. Start Probes Phase
  const handleStartProbePhase = () => {
    setPhase('PROBE_QUESTIONS');
    setProbeIndex(0);
    setLatestEvaluation(null);
    toast.info('Қатені нақтылау үшін 4 бақылау сұрағы басталды');
  };

  // 3. Submit Probe Answer with AI Reasoning State
  const handleProbeSubmit = () => {
    if (!selectedOption || isAnalyzing) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const evalResult = evaluateStudentAnswer({
        question: currentProblem,
        correctAnswer: String(currentProblem.correctAnswer),
        studentAnswer: selectedOption,
        skill: currentProblem.skillId,
        previousMastery: latestEvaluation?.updatedScore ?? 60
      });

      setLatestEvaluation(evalResult);

      const answer: AssessmentAnswer = {
        problemId: currentProblem.id,
        userAnswer: selectedOption,
        timeSpentSec: 12,
        problem: currentProblem,
        evaluation: evalResult
      };

      const updatedAnswers = [...userAnswers, answer];
      setUserAnswers(updatedAnswers);
      setSelectedOption('');
      setIsAnalyzing(false);

      if (probeIndex + 1 < probeQuestions.length) {
        setProbeIndex(probeIndex + 1);
      } else {
        // Diagnostic complete - process deep pattern analysis & skill profile
        const result = AIDiagnostEngine.processDiagnosticAnswers(updatedAnswers);
        setDiagnosticResult(result);
        setPhase('DIAGNOSTIC_PROFILE');
        toast.success('Барлық бақылау сұрақтары аяқталды. Толық профиль дайын!', 'AI Диагностика');
        onDiagnosticComplete(result.detectedGaps, result.detectedGaps.length > 0 ? 2.0 : 3.5);
      }
    }, 500);
  };

  const handleReset = () => {
    setPhase('PRIMARY_QUESTION');
    setUserAnswers([]);
    setSelectedOption('');
    setProbeIndex(0);
    setLatestEvaluation(null);
    setDiagnosticResult(null);
    setShowResetConfirm(false);
    toast.info('Диагностикалық сессия бастапқы күйге келтірілді');
  };

  return (
    <Card className="mx-auto max-w-4xl shadow-soft-md border-emerald-100 dark:border-slate-800 rounded-3xl">
      
      {/* Module Title & Subtitle */}
      <CardHeader className="bg-gradient-to-r from-emerald-50/90 via-teal-50/90 to-indigo-50/90 p-6 sm:p-8 rounded-t-3xl border-b border-emerald-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-soft-xs">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
                AI ДИАГНОСТ (Интерактивті Режим)
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400">
                Subtitle: «Бала қай жерде қиналады?» (18-ҚАДАМ: Тікелей Диагностика)
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="purple" className="px-3.5 py-1 text-xs font-black">
              18-Қадам: Real-Time Engine
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-6">

        {/* Diagnostic Question Preset Switcher (To test all mistake types live) */}
        {phase === 'PRIMARY_QUESTION' && !latestEvaluation && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Тест жасау үшін сұрақты таңдаңыз:</span>
              <span>Оқушы: <strong className="text-indigo-600">{user?.fullName || 'Жандос Тұрсынов'}</strong></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DIAGNOSTIC_TEST_SUITE.map((prob, idx) => (
                <button
                  key={prob.id}
                  onClick={() => {
                    setSelectedSuiteIndex(idx);
                    setSelectedOption('');
                    setLatestEvaluation(null);
                  }}
                  className={`p-2.5 rounded-2xl text-xs font-black transition-all border text-left flex flex-col justify-between ${
                    selectedSuiteIndex === idx
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 uppercase">Сұрақ #{idx + 1}</span>
                  <span className="font-mono mt-1">{prob.questionKaz.split('=')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 1: Primary Diagnostic Question */}
        {phase === 'PRIMARY_QUESTION' && (
          <div className="space-y-6">
            {!latestEvaluation ? (
              <div className="space-y-6">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:border-slate-700 flex justify-between items-center">
                  <span>Негізгі Диагностикалық Сұрақ:</span>
                  <Badge variant="blue">{activePrimaryProblem.topicKaz}</Badge>
                </div>

                {/* Primary Question Box or AI Loading */}
                {isAnalyzing ? (
                  <AILoadingIndicator status="diagnosing_mistake" size="lg" />
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 text-center space-y-6 shadow-soft-xs">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Өрнектің Мәнін Тап:
                    </span>
                    
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      {activePrimaryProblem.questionKaz}
                    </h3>

                    {/* Multiple Choice Options with keyboard accessibility */}
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2" role="radiogroup" aria-label="Жауап нұсқалары">
                      {activePrimaryProblem.options?.map((opt, idx) => (
                        <button
                          key={idx}
                          role="radio"
                          aria-checked={selectedOption === opt}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedOption(opt);
                            }
                          }}
                          onClick={() => setSelectedOption(opt)}
                          className={`flex items-center justify-between rounded-2xl border-2 p-4 font-black text-lg sm:text-xl transition-all min-h-[60px] focus-visible:ring-4 focus-visible:ring-emerald-500 ${
                            selectedOption === opt
                              ? 'border-emerald-600 bg-emerald-100/80 text-emerald-950 ring-4 ring-emerald-500/30 dark:bg-emerald-950/70 dark:text-emerald-100 shadow-sm'
                              : 'border-slate-200 bg-slate-50/70 text-slate-900 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                          }`}
                        >
                          <span>{opt}</span>
                          <span className={`h-7 w-7 rounded-full border-2 flex items-center justify-center text-xs font-black ${
                            selectedOption === opt ? 'border-emerald-700 bg-emerald-600 text-white' : 'border-slate-400 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!selectedOption || isAnalyzing}
                    onClick={handlePrimarySubmit}
                    aria-label="Жауапты тексеру және AI талдауды бастау"
                    className="w-full sm:w-auto rounded-2xl font-black min-h-[48px] px-6 text-sm sm:text-base shadow-soft-xs active:scale-95"
                  >
                    {isAnalyzing ? 'AI Талдауда…' : 'Жауапты Тексеру & AI Талдау ➔'}
                  </Button>
                </div>
              </div>
            ) : (
              /* REAL-TIME AI DIAGNOSTIC EVALUATION RESULT (18-ҚАДАМ) */
              <div className="space-y-6 animate-in fade-in">
                
                {/* 1. Evaluation Banner */}
                <div className={`rounded-3xl p-6 sm:p-8 border shadow-soft-sm ${
                  latestEvaluation.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                    : 'border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl text-white ${latestEvaluation.isCorrect ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                      {latestEvaluation.isCorrect ? <Check className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={latestEvaluation.isCorrect ? 'success' : 'danger'} className="text-xs font-black">
                          {latestEvaluation.isCorrect ? 'Жауап Дұрыс ✓' : 'Қате Жауап ✗'}
                        </Badge>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/10">
                          {latestEvaluation.mistakeType}
                        </span>
                      </div>

                      <h4 className="text-lg font-black">
                        AI Қорытындысы: {latestEvaluation.identifiedDifficultyKaz}
                      </h4>

                      <p className="text-xs font-bold opacity-90 leading-relaxed">
                        🔍 <strong>Анықталған дағды</strong>: {latestEvaluation.skillNameKaz} ({latestEvaluation.skillId})
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Real-Time Skill Mastery Update Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Activity className="h-4 w-4 text-indigo-600" />
                      Оқушының Skill Mastery Өзгерісі (Динамикалық Жүйе):
                    </span>
                    <span className="text-indigo-600 font-mono">
                      Mastery: {latestEvaluation.updatedScore}% ({latestEvaluation.statusTextKaz})
                    </span>
                  </div>

                  <Progress
                    value={latestEvaluation.updatedScore}
                    indicatorColor={latestEvaluation.updatedScore >= 85 ? 'bg-emerald-500' : latestEvaluation.updatedScore >= 70 ? 'bg-indigo-500' : latestEvaluation.updatedScore >= 50 ? 'bg-purple-500' : 'bg-rose-500'}
                  />

                  <div className="flex justify-between items-center text-xs text-slate-500 font-bold pt-1">
                    <span>Сенімділік деңгейі (Confidence): <strong>{Math.round(latestEvaluation.confidence * 100)}%</strong></span>
                    <span>Әрекет: <strong className="text-slate-800 dark:text-slate-200">{latestEvaluation.nextDiagnosticActionKaz}</strong></span>
                  </div>
                </div>

                {/* 3. Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setLatestEvaluation(null);
                      setSelectedOption('');
                    }}
                    className="w-full sm:w-auto rounded-2xl text-xs font-bold"
                  >
                    Басқа сұрақпен тексеру
                  </Button>

                  <Button
                    variant="accent"
                    size="lg"
                    onClick={handleStartProbePhase}
                    className="w-full sm:w-auto rounded-2xl font-black shadow-soft-sm"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Тексеру үшін 4 Диагностикалық Сұраққа Өту ➔
                  </Button>
                </div>

              </div>
            )}
          </div>
        )}

        {/* PHASE 2: Probe Diagnostic Questions (42-17, 61-29, 53-18, 72-35) */}
        {phase === 'PROBE_QUESTIONS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-2xl bg-indigo-50 p-4 text-xs font-extrabold text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900">
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-600" />
                Қосымша Диагностикалық Тексеру ({probeIndex + 1} / {probeQuestions.length})
              </span>
              <Badge variant="purple">{currentProblem.topicKaz}</Badge>
            </div>

            <Progress value={((probeIndex + 1) / probeQuestions.length) * 100} indicatorColor="bg-indigo-600" />

            <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 text-center space-y-6 shadow-soft-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Сұрақ #{probeIndex + 1}:
              </span>
              
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentProblem.questionKaz}
              </h3>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                {currentProblem.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(opt)}
                    className={`flex items-center justify-between rounded-2xl border p-4 font-black text-lg transition-all ${
                      selectedOption === opt
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20 dark:bg-indigo-950/50 dark:text-indigo-200'
                        : 'border-slate-200 bg-slate-50/50 text-slate-800 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs ${
                      selectedOption === opt ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="accent"
                size="lg"
                disabled={!selectedOption}
                onClick={handleProbeSubmit}
                className="w-full sm:w-auto rounded-2xl font-black"
              >
                {probeIndex + 1 < probeQuestions.length ? 'Келесі Сұрақ ➔' : 'Диагностиканы Аяқтау & Профиль Жаңарту ➔'}
              </Button>
            </div>
          </div>
        )}

        {/* PHASE 3: Complete Diagnostic Profile & Updated Student Profile */}
        {phase === 'DIAGNOSTIC_PROFILE' && diagnosticResult && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Top Conclusion Card */}
            <div className="rounded-3xl border border-rose-200 bg-rose-50/80 p-6 sm:p-8 dark:border-rose-900 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="danger" className="text-xs font-black">
                  AI Қорытындысы
                </Badge>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                  Қайталану сенімділігі: <strong>{Math.round(diagnosticResult.recurrenceConfidence * 100)}%</strong>
                </span>
              </div>

              <h4 className="text-xl font-black">
                {diagnosticResult.initialDiagnosisKaz}
              </h4>

              <p className="text-xs font-bold leading-relaxed opacity-90">
                {diagnosticResult.mistakePatternKaz}
              </p>
            </div>

            {/* 6 Skill Mastery Profile Cards */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-600" />
                Оқушының Жаңартылған 6-Skill Диагностикалық Профилі:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diagnosticResult.skillProfile.map((sk) => (
                  <div
                    key={sk.skillId}
                    className="p-4 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 space-y-2 shadow-soft-xs"
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-900 dark:text-white">{sk.nameKaz}</span>
                      <span className={sk.score >= 85 ? 'text-emerald-600' : sk.score >= 70 ? 'text-indigo-600' : sk.score >= 50 ? 'text-purple-600' : 'text-rose-600'}>
                        {sk.score}%
                      </span>
                    </div>

                    <Progress
                      value={sk.score}
                      indicatorColor={sk.score >= 85 ? 'bg-emerald-500' : sk.score >= 70 ? 'bg-indigo-500' : sk.score >= 50 ? 'bg-purple-500' : 'bg-rose-500'}
                    />

                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-semibold">
                      <span>Статус:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{sk.statusTextKaz}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset / Next Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                onClick={() => setShowResetConfirm(true)}
                className="rounded-2xl text-xs font-bold"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Қайта Диагностика Жүргізу
              </Button>

              <Badge variant="success" className="text-xs font-black py-1.5 px-3">
                Профиль толық жаңартылды ✓
              </Badge>
            </div>

          </div>
        )}

      </CardContent>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Диагностиканы қайта бастау"
        message="Ағымдағы диагностикалық сессия нәтижелері тазартылып, сұрақтар басынан басталады. Жалғастырасыз ба?"
        confirmLabel="Иә, қайта бастау"
        cancelLabel="Жоқ, қалдыру"
        variant="warning"
      />
    </Card>
  );
}
