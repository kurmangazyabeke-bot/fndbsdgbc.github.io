'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Brain,
  ArrowRight,
  Filter,
  UserX,
  Award,
  Sparkles,
  Zap,
  FileCheck,
  KeyRound,
  ShieldCheck,
  Layers,
  X
} from 'lucide-react';
import { DEMO_STUDENTS, DemoStudentItem } from '@/lib/data/demoData';

import { EmptyState, NoStudentsEmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/lib/context/ToastContext';

export type StudentFilterType =
  | 'ALL'
  | 'NEEDS_SUPPORT'
  | 'MEDIUM'
  | 'HIGH'
  | 'INACTIVE';

export function StudentsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<StudentFilterType>('ALL');
  const [selectedStudent, setSelectedStudent] = useState<DemoStudentItem | null>(null);
  const toast = useToast();

  const studentsList: DemoStudentItem[] = DEMO_STUDENTS;

  // Filter & Search Logic
  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.weakSkillKaz.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'ALL') return true;
    return student.category === activeFilter;
  });

  const getCategoryBadge = (cat: DemoStudentItem['category']) => {
    switch (cat) {
      case 'NEEDS_SUPPORT':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-black text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            <AlertTriangle className="h-3 w-3" /> Қолдау қажет
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-black text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
            <Zap className="h-3 w-3" /> Орта деңгей
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
            <CheckCircle2 className="h-3 w-3" /> Жоғары деңгей
          </span>
        );
      case 'INACTIVE':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <UserX className="h-3 w-3" /> Белсенді емес
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <Card className="relative overflow-hidden rounded-4xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white shadow-soft-lg border border-indigo-900/60">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-black uppercase tracking-wider backdrop-blur-md border border-white/10">
                4 «А» Сыныбы оқушылары
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
              Оқушылар Тізімі және Жеке Профильдері
            </h2>
            <p className="text-sm text-indigo-200 mt-1 max-w-2xl font-medium">
              Мұғалім сыныптағы барлық оқушының нақты дағдыларын, қате заңдылықтары мен AI педагогикалық ұсыныстарын бақылай алады.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="rounded-3xl bg-white/10 px-5 py-3.5 backdrop-blur-md border border-white/15 text-center shadow-soft-xs">
              <span className="text-[10px] text-indigo-200 block uppercase font-black tracking-wider">Сынып оқушылары</span>
              <span className="text-2xl sm:text-3xl font-black text-white">{studentsList.length} оқушы</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Оқушы аты, коды немесе skill бойынша іздеу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder-slate-400 shadow-soft-xs focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Total stats */}
        <div className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5 self-end sm:self-center">
          <Users className="h-4 w-4 text-indigo-600" />
          <span>Табылғаны: <strong className="text-slate-900 dark:text-white">{filteredStudents.length}</strong> / {studentsList.length}</span>
        </div>
      </div>

      {/* 5 Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
            activeFilter === 'ALL'
              ? 'bg-slate-900 text-white shadow-soft-xs dark:bg-white dark:text-slate-900'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
          }`}
        >
          <Filter className="h-3.5 w-3.5" /> Барлық оқушы ({studentsList.length})
        </button>

        <button
          onClick={() => setActiveFilter('NEEDS_SUPPORT')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
            activeFilter === 'NEEDS_SUPPORT'
              ? 'bg-rose-600 text-white shadow-soft-xs'
              : 'bg-white text-rose-700 border border-rose-200/80 hover:bg-rose-50 dark:bg-slate-900 dark:border-rose-900 dark:text-rose-300'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" /> Қолдау қажет ({studentsList.filter(s => s.category === 'NEEDS_SUPPORT').length})
        </button>

        <button
          onClick={() => setActiveFilter('MEDIUM')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
            activeFilter === 'MEDIUM'
              ? 'bg-purple-600 text-white shadow-soft-xs'
              : 'bg-white text-purple-700 border border-purple-200/80 hover:bg-purple-50 dark:bg-slate-900 dark:border-purple-900 dark:text-purple-300'
          }`}
        >
          <Zap className="h-3.5 w-3.5" /> Орта деңгей ({studentsList.filter(s => s.category === 'MEDIUM').length})
        </button>

        <button
          onClick={() => setActiveFilter('HIGH')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
            activeFilter === 'HIGH'
              ? 'bg-emerald-600 text-white shadow-soft-xs'
              : 'bg-white text-emerald-700 border border-emerald-200/80 hover:bg-emerald-50 dark:bg-slate-900 dark:border-emerald-900 dark:text-emerald-300'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Жоғары деңгей ({studentsList.filter(s => s.category === 'HIGH').length})
        </button>

        <button
          onClick={() => setActiveFilter('INACTIVE')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
            activeFilter === 'INACTIVE'
              ? 'bg-slate-700 text-white shadow-soft-xs'
              : 'bg-white text-slate-500 border border-slate-200/80 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800'
          }`}
        >
          <UserX className="h-3.5 w-3.5" /> Белсенді емес ({studentsList.filter(s => s.category === 'INACTIVE').length})
        </button>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          title="Сәйкес оқушы табылмады"
          description={`«${searchTerm}» іздеу сөзі немесе таңдалған фильтр бойынша нәтиже табылмады.`}
          actionLabel="Фильтрді тазарту"
          onAction={() => {
            setSearchTerm('');
            setActiveFilter('ALL');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4"
            >
            {/* Top Row: Avatar, Name, Code & Status Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="h-12 w-12 rounded-2xl object-cover border border-slate-200 shadow-soft-xs"
                />
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base leading-snug">
                    {student.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-slate-500 font-bold">
                      {student.classGrade}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-md dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {student.studentCode}
                    </span>
                  </div>
                </div>
              </div>

              {getCategoryBadge(student.category)}
            </div>

            {/* Metrics Breakdown Grid (Жалпы mastery, Әлсіз skill, Соңғы белсенділігі, Прогресс) */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-700/80 space-y-2.5 text-xs font-bold">
              
              {/* 1. Жалпы mastery */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Жалпы Mastery:</span>
                  <strong className={student.overallMastery >= 75 ? 'text-emerald-600' : student.overallMastery >= 50 ? 'text-purple-600' : 'text-rose-600'}>
                    {student.overallMastery}%
                  </strong>
                </div>
                <Progress
                  value={student.overallMastery}
                  indicatorColor={student.overallMastery >= 75 ? 'bg-emerald-500' : student.overallMastery >= 50 ? 'bg-purple-500' : 'bg-rose-500'}
                />
              </div>

              {/* 2. Прогресс (Бастапқы ➔ Қазіргі) */}
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pt-1">
                <span>Динамика:</span>
                <span className="text-slate-900 dark:text-white font-black flex items-center gap-1">
                  {student.baselineScore}% ➔ <strong className="text-emerald-600">{student.currentScore}%</strong>
                  <span className="text-emerald-600 text-[11px] bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.2 rounded-full font-black">
                    +{student.progressGrowthPct}%
                  </span>
                </span>
              </div>

              {/* 3. Әлсіз skill */}
              <div className="flex justify-between items-start text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span className="shrink-0 text-slate-400">Әлсіз тұсы:</span>
                <span className="text-right text-rose-700 dark:text-rose-400 font-black pl-2 truncate max-w-[150px]">
                  {student.weakSkillKaz}
                </span>
              </div>

              {/* 4. Соңғы белсенділігі */}
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> Соңғы белсенділік:
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-extrabold">
                  {student.lastActiveKaz}
                </span>
              </div>

            </div>

            {/* 5. AI Recommendation Box */}
            <div className="rounded-2xl bg-indigo-50/70 p-3 border border-indigo-100 text-xs text-indigo-950 dark:bg-indigo-950/30 dark:border-indigo-900/60 dark:text-indigo-200 space-y-1">
              <span className="font-black flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider text-[10px]">
                <Brain className="h-3.5 w-3.5" /> AI Ұсынысы:
              </span>
              <p className="font-semibold leading-relaxed line-clamp-2">
                «{student.aiRecommendationKaz}»
              </p>
            </div>

            {/* Action Footer */}
            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-bold w-full"
                onClick={() => setSelectedStudent(student)}
              >
                Толық Профильді Ашу ➔
              </Button>
            </div>

          </Card>
        ))}
      </div>
      )}

      {/* Detailed Student Modal if Selected */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedStudent.avatarUrl}
                  alt={selectedStudent.name}
                  className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shadow-soft-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 dark:text-white text-xl">
                      {selectedStudent.name}
                    </h3>
                    <span className="font-mono text-xs font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg dark:bg-indigo-950 dark:text-indigo-300">
                      {selectedStudent.studentCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-bold mt-1">
                    <span>{selectedStudent.classGrade}</span>
                    <span>•</span>
                    <span>Деңгей: <strong className="text-emerald-600">{selectedStudent.currentLevel}</strong></span>
                    <span>•</span>
                    <span>XP: <strong className="text-amber-600">{selectedStudent.totalXp}</strong></span>
                    <span>•</span>
                    <span>Стрик: <strong className="text-orange-600">{selectedStudent.dailyStreak} күн 🔥</strong></span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 7 Demo Skills Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-600" />
                7 Математикалық Дағдыны Меңгеру Картасы:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedStudent.skillScores.map((sk) => (
                  <div
                    key={sk.skillId}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700/80 space-y-1.5"
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-800 dark:text-slate-200">{sk.skillNameKaz}</span>
                      <span className={
                        sk.score >= 85 ? 'text-emerald-600' :
                        sk.score >= 70 ? 'text-indigo-600' :
                        sk.score >= 50 ? 'text-purple-600' : 'text-rose-600'
                      }>
                        {sk.score}%
                      </span>
                    </div>
                    <Progress
                      value={sk.score}
                      indicatorColor={
                        sk.score >= 85 ? 'bg-emerald-500' :
                        sk.score >= 70 ? 'bg-indigo-500' :
                        sk.score >= 50 ? 'bg-purple-500' : 'bg-rose-500'
                      }
                    />
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                      <span>Статус:</span>
                      <span className="font-bold text-slate-600 dark:text-slate-300">{sk.statusTextKaz}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mistake Patterns & Misconceptions */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 space-y-1.5">
                <span className="font-black text-rose-800 dark:text-rose-300 flex items-center gap-1.5 uppercase text-[10px]">
                  <AlertTriangle className="h-3.5 w-3.5" /> Қате заңдылығы (Mistake Pattern):
                </span>
                <ul className="list-disc list-inside space-y-1 text-rose-900 dark:text-rose-200 font-semibold">
                  {selectedStudent.mistakePatterns.map((mp, idx) => (
                    <li key={idx}>{mp}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900 space-y-1.5">
                <span className="font-black text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5 uppercase text-[10px]">
                  <Brain className="h-3.5 w-3.5" /> AI Педагогикалық Ұсынысы:
                </span>
                <p className="text-indigo-950 dark:text-indigo-200 font-semibold leading-relaxed">
                  «{selectedStudent.aiRecommendationKaz}»
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                onClick={() => setSelectedStudent(null)}
                className="rounded-2xl px-6 text-xs font-bold"
              >
                Жабу
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
