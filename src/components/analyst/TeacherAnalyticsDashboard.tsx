'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import {
  Activity,
  TrendingUp,
  Sparkles,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  HelpCircle,
  FileSpreadsheet,
  Printer,
  Compass,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AIAnalystEngine, DetailedPedagogicalAnalysis } from '@/services/ai/analyst';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface TeacherAnalyticsDashboardProps {
  activeGaps?: any[];
}

export function TeacherAnalyticsDashboard({ activeGaps = [] }: TeacherAnalyticsDashboardProps) {
  const { t } = useTranslation();

  // Load deep pedagogical analysis for Jandos
  const analysis: DetailedPedagogicalAnalysis = AIAnalystEngine.getJandosAnalysis();

  // Recharts Grouped Bar Chart Data
  const chartData = analysis.comparativeMetrics.map((m) => ({
    name: m.skillNameKaz,
    'Бастапқы нәтиже (Baseline)': m.baselineScore,
    'Қазіргі нәтиже (Current)': m.currentScore,
    'Өсім': `+${m.growthDiff}%`,
  }));

  return (
    <Card className="mx-auto max-w-5xl shadow-soft-md border-purple-100 dark:border-slate-800 rounded-3xl">
      
      {/* Module Title & Subtitle */}
      <CardHeader className="bg-gradient-to-r from-purple-50/90 via-indigo-50/90 to-purple-100/90 p-6 sm:p-8 rounded-t-3xl border-b border-purple-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-soft-xs">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
                AI АНАЛИТИК
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-400">
                Subtitle: «Балада нақты не өзгерді?» — Педагогикалық Дәлелдеу Құралы
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="purple" className="flex items-center gap-1 font-black px-3.5 py-1 text-xs">
              <UserCheck className="h-3.5 w-3.5" /> Оқушы: {analysis.studentName} ({analysis.grade}-Сынып)
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-8">

        {/* Top Summary Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Бастапқы Жиынтық Дәреже
            </span>
            <div className="text-3xl font-black text-slate-600 dark:text-slate-400 mt-1">
              {analysis.overallBaseline}%
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Диагностикаға дейінгі деңгей</p>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-soft-xs dark:border-emerald-900 dark:bg-emerald-950/30">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Қазіргі Жиынтық Нәтиже
            </span>
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
              {analysis.overallCurrent}%
            </div>
            <p className="text-[11px] text-emerald-600 mt-0.5">Тренажердан кейінгі тұрақты балл</p>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50/50 p-5 shadow-soft-xs dark:border-indigo-900 dark:bg-indigo-950/30">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-indigo-600" /> Салыстырмалы Нақты Өсім
            </span>
            <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300 mt-1">
              +{analysis.overallGrowthPct}%
            </div>
            <p className="text-[11px] text-indigo-600 mt-0.5">Дәлелденген педагогикалық динамика</p>
          </div>
        </div>

        {/* Comparative Line & Bar Chart (Бастапқы және Кейінгі Нәтиже Динамикасы) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Бастапқы және кейінгі нәтижелер салыстырмасы (5 Бағыт)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Жандостың әр дағды бойынша бастапқы (Baseline) және қазіргі деңгейінің өсімі
              </p>
            </div>
            <Badge variant="purple" className="font-extrabold self-start sm:self-auto">
              Графикалық Динамика
            </Badge>
          </div>

          {/* Grouped Comparative Bar Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} />
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
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} />
                <Bar dataKey="Бастапқы нәтиже (Baseline)" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Қазіргі нәтиже (Current)" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 5 Exact Text Data Points List */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            {analysis.comparativeMetrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500 block mb-0.5">{m.skillNameKaz}</span>
                <div className="text-xs font-black text-slate-800 dark:text-slate-200">
                  <span className="text-slate-400">{m.baselineScore}%</span> ➔ <strong className="text-purple-600 text-sm">{m.currentScore}%</strong>
                </div>
                <span className="inline-block mt-1 text-[10px] font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.2 rounded-full">
                  +{m.growthDiff}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Deep Narrative Conclusion Box */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md space-y-3 border border-purple-900/60">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h4 className="text-base font-black text-amber-300">
              AI Педагогикалық Қорытынды (Синтез):
            </h4>
          </div>
          <p className="text-sm sm:text-base text-purple-100 font-medium leading-relaxed">
            «{analysis.aiNarrativeSynthesisKaz}»
          </p>
        </div>

        {/* 5 Essential Pedagogical Proof Sections (Маңызды 5 Бөлім) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Қандай skill жақсарды */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-3 dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-black text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>1. Қандай skill жақсарды:</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-emerald-950 dark:text-emerald-300 leading-relaxed">
              {analysis.skillsImproved.map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Қай skill өзгермеді немесе баяу өсті */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6 space-y-3 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-sm">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span>2. Қай skill өзгермеді / баяу өсті:</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-amber-950 dark:text-amber-300 leading-relaxed">
              {analysis.skillsStalled.map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                  <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Қандай қате жойылды */}
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-6 space-y-3 dark:border-indigo-900/60 dark:bg-indigo-950/20">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-black text-sm">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <span>3. Қандай қате түгел жойылды:</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-indigo-950 dark:text-indigo-300 leading-relaxed">
              {analysis.resolvedMisconceptions.map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Қандай мәселе сақталды */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 space-y-3 dark:border-rose-900/60 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-black text-sm">
              <HelpCircle className="h-5 w-5 text-rose-600" />
              <span>4. Қандай мәселе сақталды:</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-rose-950 dark:text-rose-300 leading-relaxed">
              {analysis.persistingMisconceptions.map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-2xl border border-rose-100 dark:border-rose-900/40">
                  <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Келесі педагогикалық қадам қандай (Full Width Actionable Roadmap) */}
        <div className="rounded-3xl border border-purple-200 bg-purple-50/50 p-6 sm:p-8 space-y-4 dark:border-purple-900 dark:bg-purple-950/30">
          <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-black text-base">
            <Compass className="h-6 w-6 text-purple-600" />
            <span>5. Келесі педагогикалық қадам қандай (Мұғалім мен Ата-анаға Жол Картасы):</span>
          </div>

          <div className="space-y-3">
            {analysis.nextPedagogicalSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3.5 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-soft-xs text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white text-xs font-black">
                  {idx + 1}
                </span>
                <span className="leading-relaxed mt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
