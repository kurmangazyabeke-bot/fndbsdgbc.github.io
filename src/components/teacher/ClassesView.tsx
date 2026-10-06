'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  School,
  Plus,
  Users,
  Award,
  AlertTriangle,
  Key,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  UserPlus,
  Sparkles,
  BookOpen,
  BarChart3
} from 'lucide-react';

import { NoClassesEmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/lib/context/ToastContext';

export interface ClassStudentItem {
  id: string;
  name: string;
  studentCode: string; // Оқушыға берілетін жеке кіру коды
  mastery: number;
}

export interface ClassGroup {
  id: string;
  name: string; // Мысалы: 4 «А» сыныбы
  grade: number;
  studentCount: number; // 24
  avgMastery: number; // 71%
  strongestSkillKaz: string; // Салыстыру
  strongestSkillScore: number;
  hardestSkillKaz: string; // Мәтіндік есеп
  hardestSkillScore: number;
  classJoinCode: string; // MQ-4A-8921
  students: ClassStudentItem[];
}

export function ClassesView() {
  const toast = useToast();
  const [classes, setClasses] = useState<ClassGroup[]>([
    {
      id: 'cls-4a',
      name: '4 «А» сыныбы',
      grade: 4,
      studentCount: 24,
      avgMastery: 71,
      strongestSkillKaz: 'Салыстыру',
      strongestSkillScore: 89,
      hardestSkillKaz: 'Мәтіндік есеп',
      hardestSkillScore: 46,
      classJoinCode: 'MQ-4A-8921',
      students: [
        { id: 'cs-1', name: 'Айдос Нұрлан', studentCode: 'AIDO-882', mastery: 82 },
        { id: 'cs-2', name: 'Жандос Тұрсынов', studentCode: 'JAND-491', mastery: 69 },
        { id: 'cs-3', name: 'Аружан Болатбек', studentCode: 'ARUZ-720', mastery: 94 },
        { id: 'cs-4', name: 'Мадина Қайрат', studentCode: 'MADI-318', mastery: 48 },
        { id: 'cs-5', name: 'Нұрислам Ерлан', studentCode: 'NURI-509', mastery: 63 },
      ],
    },
    {
      id: 'cls-2a',
      name: '2 «А» сыныбы',
      grade: 2,
      studentCount: 28,
      avgMastery: 78,
      strongestSkillKaz: 'Сан құрамы',
      strongestSkillScore: 90,
      hardestSkillKaz: 'Разрядтан аттап азайту',
      hardestSkillScore: 35,
      classJoinCode: 'MQ-2A-3310',
      students: [
        { id: 'cs-5', name: 'Арман Серіков', studentCode: 'ARMA-221', mastery: 82 },
        { id: 'cs-6', name: 'Мәдина Болатова', studentCode: 'MADI-771', mastery: 65 },
      ],
    },
    {
      id: 'cls-3b',
      name: '3 «Б» сыныбы',
      grade: 3,
      studentCount: 22,
      avgMastery: 66,
      strongestSkillKaz: 'Қосу және Азайту',
      strongestSkillScore: 82,
      hardestSkillKaz: 'Көбейту кестесі',
      hardestSkillScore: 48,
      classJoinCode: 'MQ-3B-7742',
      students: [
        { id: 'cs-7', name: 'Дильназ Қайратқызы', studentCode: 'DILN-551', mastery: 71 },
      ],
    },
  ]);

  const [selectedClassId, setSelectedClassId] = useState<string>('cls-4a');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals state
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState<number>(4);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    toast.info(`Кіру коды көшірілді: ${code}`, 'Код көшірілді');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateClass = () => {
    if (!newClassName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCls: ClassGroup = {
      id: `cls-${Date.now()}`,
      name: newClassName.trim(),
      grade: newClassGrade,
      studentCount: 0,
      avgMastery: 50,
      strongestSkillKaz: 'Бастапқы диагностика',
      strongestSkillScore: 50,
      hardestSkillKaz: 'Бастапқы диагностика',
      hardestSkillScore: 50,
      classJoinCode: `MQ-${newClassGrade}G-${randomSuffix}`,
      students: [],
    };

    setClasses([newCls, ...classes]);
    setSelectedClassId(newCls.id);
    setNewClassName('');
    setIsCreateClassOpen(false);
    toast.success(`«${newCls.name}» жаңа сыныбы құрылды!`, 'Сынып құрылды');
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim() || !selectedClass) return;

    const randomCode = `${newStudentName.substring(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newStudent: ClassStudentItem = {
      id: `cs-${Date.now()}`,
      name: newStudentName.trim(),
      studentCode: randomCode,
      mastery: 50,
    };

    setClasses((prev) =>
      prev.map((cls) => {
        if (cls.id === selectedClass.id) {
          return {
            ...cls,
            studentCount: cls.studentCount + 1,
            students: [...cls.students, newStudent],
          };
        }
        return cls;
      })
    );

    setNewStudentName('');
    setIsAddStudentOpen(false);
    toast.success(`«${newStudent.name}» оқушысы қосылды! PIN: ${randomCode}`, 'Оқушы қосылды');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Create Class CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <School className="h-6 w-6 text-indigo-600" /> Сыныптар Жүйесі & Аналитикасы
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Сынып құру, оқушы қосу, жеке кіру кодтарын тарату және ортақ аналитиканы бақылау.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={() => setIsCreateClassOpen(true)}
            className="rounded-2xl font-black text-xs shadow-soft-xs"
          >
            <Plus className="h-4 w-4 mr-1" /> Жаңа Сынып Құру
          </Button>
        </div>
      </div>

      {/* Class Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {classes.map((c) => {
          const isSelected = selectedClassId === c.id;

          return (
            <Card
              key={c.id}
              onClick={() => setSelectedClassId(c.id)}
              className={`rounded-3xl p-6 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-soft-md dark:bg-indigo-950/30'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 shadow-soft-xs dark:bg-slate-900'
              }`}
            >
              {/* Class Name & Student Count */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {c.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-bold">
                    {c.grade}-Бастауыш сынып
                  </span>
                </div>

                <Badge variant={isSelected ? 'purple' : 'default'} className="font-extrabold text-xs px-3 py-1">
                  <Users className="h-3.5 w-3.5 mr-1" /> {c.studentCount} оқушы
                </Badge>
              </div>

              {/* Average Mastery Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                  <span>Орташа Mastery:</span>
                  <strong className="text-indigo-600 text-sm">{c.avgMastery}%</strong>
                </div>
                <Progress value={c.avgMastery} indicatorColor="bg-indigo-600" />
              </div>

              {/* Strongest & Hardest Skill Badges */}
              <div className="space-y-2 pt-1 text-xs font-bold border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-emerald-800 dark:text-emerald-300">
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-emerald-600" /> Ең мықты skill:
                  </span>
                  <strong className="font-black">{c.strongestSkillKaz} ({c.strongestSkillScore}%)</strong>
                </div>

                <div className="flex justify-between items-center text-rose-800 dark:text-rose-300">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600" /> Ең қиын skill:
                  </span>
                  <strong className="font-black">{c.hardestSkillKaz} ({c.hardestSkillScore}%)</strong>
                </div>
              </div>

              {/* Class Join Code Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Key className="h-3.5 w-3.5" /> Сынып коды:
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCode(c.classJoinCode);
                  }}
                  className="font-mono font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                >
                  {c.classJoinCode}
                  {copiedCode === c.classJoinCode ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Class Detailed Hub & Roster */}
      <Card className="rounded-3xl p-6 sm:p-8 shadow-soft-xs border border-slate-200/80 space-y-6">
        
        {/* Hub Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {selectedClass.name} — Оқушылар Тізімі мен Жеке Кіру Кодтары
              </h3>
              <Badge variant="success" className="font-black">{selectedClass.studentCount} Оқушы</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Оқушылар осы код арқылы өз жеке кабинетіне кіріп, тапсырмаларды орындайды.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              size="sm"
              onClick={() => setIsAddStudentOpen(true)}
              className="rounded-2xl font-black text-xs shadow-soft-xs"
            >
              <UserPlus className="h-4 w-4 mr-1" /> Оқушы Қосу
            </Button>
          </div>
        </div>

        {/* 4 «А» Example Highlight Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-indigo-50/60 border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900">
          <div>
            <span className="text-[10px] font-black uppercase text-indigo-800 dark:text-indigo-300 block">Оқушы саны</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{selectedClass.studentCount} бала</div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-indigo-800 dark:text-indigo-300 block">Орташа mastery</span>
            <div className="text-2xl font-black text-indigo-600 mt-0.5">{selectedClass.avgMastery}%</div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 block">Ең мықты skill</span>
            <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 mt-1">{selectedClass.strongestSkillKaz} ({selectedClass.strongestSkillScore}%)</div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-rose-800 dark:text-rose-300 block">Ең қиын skill</span>
            <div className="text-sm font-black text-rose-700 dark:text-rose-300 mt-1">{selectedClass.hardestSkillKaz} ({selectedClass.hardestSkillScore}%)</div>
          </div>
        </div>

        {/* Student Roster Table with Individual Codes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-black uppercase text-[10px]">
                <th className="py-3 px-4">Оқушының Аты</th>
                <th className="py-3 px-4">Жеке Кіру Коды (PIN)</th>
                <th className="py-3 px-4">Mastery</th>
                <th className="py-3 px-4 text-right">Әрекеттер</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
              {selectedClass.students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-black text-slate-900 dark:text-white">
                    {st.name}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleCopyCode(st.studentCode)}
                      className="inline-flex items-center gap-1.5 font-mono font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl border border-indigo-100 dark:border-indigo-900"
                    >
                      {st.studentCode}
                      {copiedCode === st.studentCode ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-400" />}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className={st.mastery >= 75 ? 'text-emerald-600 font-black' : st.mastery >= 50 ? 'text-indigo-600 font-black' : 'text-rose-600 font-black'}>
                      {st.mastery}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" className="text-xs text-indigo-600">
                      Карточкасын көру →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Card>

      {/* Modal: Жаңа Сынып Құру */}
      {isCreateClassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-soft-lg dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <School className="h-5 w-5 text-indigo-600" /> Жаңа Сынып Құру
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateClassOpen(false)}
                className="rounded-full h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4 text-xs font-bold">
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300">Сынып Атауы:</label>
                <input
                  type="text"
                  placeholder="Мысалы: 4 «А» сыныбы"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300">Сынып Деңгейі (1-4):</label>
                <select
                  value={newClassGrade}
                  onChange={(e) => setNewClassGrade(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value={1}>1-Сынып</option>
                  <option value={2}>2-Сынып</option>
                  <option value={3}>3-Сынып</option>
                  <option value={4}>4-Сынып</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsCreateClassOpen(false)} className="rounded-2xl">
                Бас тарту
              </Button>
              <Button variant="primary" onClick={handleCreateClass} className="rounded-2xl font-black">
                Сыныпты Сақтау & Код Алу
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Оқушы Қосу */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-soft-lg dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-indigo-600" /> {selectedClass.name} — Оқушы Қосу
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddStudentOpen(false)}
                className="rounded-full h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4 text-xs font-bold">
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-300">Оқушының Толық Аты-Жөні:</label>
                <input
                  type="text"
                  placeholder="Мысалы: Айдос Нұрланұлы"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Оқушы қосылғанда оған жеке 6-таңбалы PIN код автоматты түрде генерацияланады.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsAddStudentOpen(false)} className="rounded-2xl">
                Бас тарту
              </Button>
              <Button variant="accent" onClick={handleAddStudent} className="rounded-2xl font-black">
                Қосу & Код Беру
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
