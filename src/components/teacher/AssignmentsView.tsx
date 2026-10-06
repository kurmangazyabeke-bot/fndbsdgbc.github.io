'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  FileCheck,
  Plus,
  Sparkles,
  CheckCircle2,
  Sliders,
  Layers,
  HelpCircle,
  Eye,
  Trash2,
  Clock,
  School,
  Check,
  Zap,
  MousePointer,
  Grid,
  FileText,
  Hash,
  List,
  BookOpen
} from 'lucide-react';

import { NoAssignmentsEmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/lib/context/ToastContext';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { AILoadingIndicator } from '@/components/ui/loading-state';

export type TaskFormatType =
  | 'multiple choice'
  | 'number input'
  | 'short answer'
  | 'drag and drop'
  | 'matching'
  | 'visual task'
  | 'word problem';

export interface AssignmentItem {
  id: string;
  title: string;
  topicKaz: string;
  skillId: string;
  skillNameKaz: string;
  classTarget: string;
  difficulty: number; // 1 to 5
  taskType: TaskFormatType;
  questionKaz: string;
  options?: string[];
  correctAnswer: string;
  explanationKaz: string;
  status: 'БЕЛСЕНДІ' | 'ЖОСПАРЛАНҒАН' | 'АЯҚТАЛДЫ';
  submittedCount: string;
  dueDate: string;
  isAiGenerated: boolean;
}

export function AssignmentsView() {
  const toast = useToast();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<AssignmentItem[]>([
    {
      id: 'asg-1',
      title: 'Разрядпен қосу бойынша микро-тренажер',
      topicKaz: 'Екі таңбалы сандарды қосу',
      skillId: 'skill_basic_addition',
      skillNameKaz: 'Қосу (Ондықтан аттау)',
      classTarget: '4 «А» сыныбы',
      difficulty: 2.5,
      taskType: 'multiple choice',
      questionKaz: '28 + 15 = ?',
      options: ['43', '33', '45', '38'],
      correctAnswer: '43',
      explanationKaz: '8 + 5 = 13 (3 жазып, 1 ойда). 2 + 1 + 1 = 4 ондық.',
      status: 'БЕЛСЕНДІ',
      submittedCount: '21/24',
      dueDate: '08 Қазан',
      isAiGenerated: true,
    },
    {
      id: 'asg-2',
      title: 'Бөлшектерді пицца моделімен талдау',
      topicKaz: 'Жай бөлшектер мен геометрия',
      skillId: 'skill_word_problems',
      skillNameKaz: 'Бөлшектерді визуалды тану',
      classTarget: '4 «А» сыныбы',
      difficulty: 3.0,
      taskType: 'visual task',
      questionKaz: 'Пиццаның 4 бөлігінен 3-еуі алынды. Қай бөлшек сәйкес келеді?',
      options: ['3/4', '1/4', '4/3', '2/4'],
      correctAnswer: '3/4',
      explanationKaz: 'Барлығы 4 тең бөлік, соның 3-еуі алынғандықтан 3/4 болады.',
      status: 'БЕЛСЕНДІ',
      submittedCount: '19/24',
      dueDate: '10 Қазан',
      isAiGenerated: true,
    },
    {
      id: 'asg-3',
      title: 'Айдостың сауда есебі (Мәтіндік контекст)',
      topicKaz: 'Сюжетті мәтіндік есептер',
      skillId: 'skill_word_problems',
      skillNameKaz: 'Мәтіндік есепті шешу',
      classTarget: '4 «А» сыныбы',
      difficulty: 4.0,
      taskType: 'word problem',
      questionKaz: 'Айдоста 75 теңге болды. Оның бір бөлігін жұмсағаннан кейін 47 теңге қалды. Ол қанша теңге жұмсады?',
      options: ['28 теңге', '38 теңге', '18 теңге', '32 теңге'],
      correctAnswer: '28 теңге',
      explanationKaz: 'Жұмсалған ақша = 75 – 47 = 28 теңге.',
      status: 'ЖОСПАРЛАНҒАН',
      submittedCount: '0/24',
      dueDate: '12 Қазан',
      isAiGenerated: false,
    },
  ]);

  // Form Creation States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [creationMode, setCreationMode] = useState<'MANUAL' | 'AI_ASSISTED'>('AI_ASSISTED');

  // Form Fields as requested
  const [formTopic, setFormTopic] = useState('Екі таңбалы сандарды азайту');
  const [formSkill, setFormSkill] = useState('skill_borrow_subtraction');
  const [formClass, setFormClass] = useState('4 «А» сыныбы');
  const [formDifficulty, setFormDifficulty] = useState<number>(2.5);
  const [formTaskType, setFormTaskType] = useState<TaskFormatType>('multiple choice');
  const [formQuestion, setFormQuestion] = useState('52 – 18 = ?');
  const [formOptions, setFormOptions] = useState('34, 44, 46, 36');
  const [formCorrectAnswer, setFormCorrectAnswer] = useState('34');
  const [formExplanation, setFormExplanation] = useState('2-ден 8 азайтылмайды. 5-тен 1 ондық аламыз: 12 - 8 = 4, 4 - 1 = 3.');

  const [aiGenerating, setAiGenerating] = useState(false);

  // AI Auto-Fill Generator
  const handleAiAutoGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      if (formTaskType === 'word problem') {
        setFormQuestion('Дүкенде 65 дәптер бар еді. Түске дейін 28 дәптер сатылды. Дүкенде неше дәптер қалды?');
        setFormOptions('37 дәптер, 47 дәптер, 35 дәптер, 43 дәптер');
        setFormCorrectAnswer('37 дәптер');
        setFormExplanation('Қалған дәптер = 65 – 28 = 37 дәптер.');
      } else if (formTaskType === 'visual task') {
        setFormQuestion('Визуалды текшелер моделі бойынша 43 – 17 есебінің қалдығын тап.');
        setFormOptions('26, 36, 24, 34');
        setFormCorrectAnswer('26');
        setFormExplanation('4 ондықтан 1 ондық алынып, 13 - 7 = 6 бірлік, 3 - 1 = 2 ондық қалады.');
      } else if (formTaskType === 'number input') {
        setFormQuestion('63 – 29 өрнегінің мәнін санмен жаз:');
        setFormOptions('');
        setFormCorrectAnswer('34');
        setFormExplanation('13 – 9 = 4, 5 – 2 = 3. Жауабы: 34.');
      } else {
        setFormQuestion('52 – 18 = ?');
        setFormOptions('34, 44, 46, 36');
        setFormCorrectAnswer('34');
        setFormExplanation('12 - 8 = 4, 4 - 1 = 3. Жауабы: 34.');
      }
      setAiGenerating(false);
      toast.ai('AI тақырып пен деңгейге сәйкес сұрақ пен түсіндірмені құрастырды!', 'AI Генератор');
    }, 600);
  };

  const handleSaveAssignment = () => {
    if (!formQuestion.trim()) return;

    const newAsg: AssignmentItem = {
      id: `asg-${Date.now()}`,
      title: `${formTopic} бойынша жаттығу`,
      topicKaz: formTopic,
      skillId: formSkill,
      skillNameKaz: formSkill === 'skill_borrow_subtraction' ? 'Разрядтан аттап азайту' : 'Математикалық дағды',
      classTarget: formClass,
      difficulty: formDifficulty,
      taskType: formTaskType,
      questionKaz: formQuestion.trim(),
      options: formOptions ? formOptions.split(',').map(s => s.trim()) : undefined,
      correctAnswer: formCorrectAnswer.trim(),
      explanationKaz: formExplanation.trim(),
      status: 'БЕЛСЕНДІ',
      submittedCount: '0/24',
      dueDate: '14 Қазан',
      isAiGenerated: creationMode === 'AI_ASSISTED',
    };

    setAssignments([newAsg, ...assignments]);
    setIsFormOpen(false);
    toast.success('Жаңа тапсырма сәтті қосылды және сыныпқа жіберілді!');
  };

  const handleDeleteAssignment = () => {
    if (!deleteTargetId) return;
    setAssignments((prev) => prev.filter((a) => a.id !== deleteTargetId));
    setDeleteTargetId(null);
    toast.info('Тапсырма тізімнен өшірілді');
  };

  const getTaskTypeIcon = (type: TaskFormatType) => {
    switch (type) {
      case 'multiple choice': return <List className="h-3.5 w-3.5" />;
      case 'number input': return <Hash className="h-3.5 w-3.5" />;
      case 'short answer': return <FileText className="h-3.5 w-3.5" />;
      case 'drag and drop': return <MousePointer className="h-3.5 w-3.5" />;
      case 'matching': return <Layers className="h-3.5 w-3.5" />;
      case 'visual task': return <Grid className="h-3.5 w-3.5" />;
      case 'word problem': return <BookOpen className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Create Assignment CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-indigo-600" /> Тапсырмалар Жүйесі & Құрастырғыш
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Тапсырманы мұғалім өзі құра алады немесе AI көмегімен 7 түрлі форматта автоматты түрде генерациялайды.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="accent"
            onClick={() => {
              setCreationMode('AI_ASSISTED');
              setIsFormOpen(true);
            }}
            className="rounded-2xl font-black text-xs shadow-soft-xs"
          >
            <Sparkles className="h-4 w-4 mr-1" /> AI Көмегімен Тапсырма Құру
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setCreationMode('MANUAL');
              setIsFormOpen(true);
            }}
            className="rounded-2xl font-bold text-xs"
          >
            <Plus className="h-4 w-4 mr-1" /> Өзім Құрастырамын
          </Button>
        </div>
      </div>

      {/* 7 Task Types Supported Banner */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 space-y-2">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
          Қолдау Көрсетілетін 7 Тапсырма Типі:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-black">
          {[
            'multiple choice',
            'number input',
            'short answer',
            'drag and drop',
            'matching',
            'visual task',
            'word problem',
          ].map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-soft-xs text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            >
              {getTaskTypeIcon(type as TaskFormatType)}
              <span>{type}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Assignments List or Empty State */}
      {assignments.length === 0 ? (
        <NoAssignmentsEmptyState
          onCreateAssignment={() => {
            setCreationMode('AI_ASSISTED');
            setIsFormOpen(true);
          }}
        />
      ) : (
        <div className="space-y-4">
        {assignments.map((asg) => (
          <Card
            key={asg.id}
            className="rounded-3xl p-6 shadow-soft-xs border border-slate-200/80 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-soft-md transition-all"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="purple" className="flex items-center gap-1 text-[10px] font-bold">
                  {getTaskTypeIcon(asg.taskType)} {asg.taskType}
                </Badge>
                <Badge variant="blue" className="text-[10px] font-bold">
                  {asg.classTarget}
                </Badge>
                <Badge variant={asg.status === 'БЕЛСЕНДІ' ? 'success' : 'default'} className="text-[10px] font-black">
                  {asg.status}
                </Badge>
                {asg.isAiGenerated && (
                  <Badge variant="warning" className="text-[10px] font-black flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AI Жасаған
                  </Badge>
                )}
              </div>

              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  {asg.title}
                </h4>
                <p className="text-xs font-bold text-indigo-600 mt-0.5">
                  Сұрақ: «{asg.questionKaz}» ➔ Дұрыс жауап: <strong className="text-emerald-600">{asg.correctAnswer}</strong>
                </p>
              </div>

              <div className="text-[11px] text-slate-400 font-medium">
                Түсіндіру: {asg.explanationKaz}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-bold">Орындағандар:</span>
                <span className="text-xl font-black text-indigo-600">{asg.submittedCount}</span>
                <span className="text-[10px] text-slate-400 block">Мерзім: {asg.dueDate}</span>
              </div>

              <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold">
                Өңдеу
              </Button>
            </div>
          </Card>
        ))}
      </div>
      )}

      {/* Assignment Creator Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-soft-lg dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-indigo-600" />
                  {creationMode === 'AI_ASSISTED' ? 'AI Көмегімен Тапсырма Құру' : 'Тапсырма Құрастыру Формасы'}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Тақырып, сынып, skill және тапсырма түрін таңдаңыз.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFormOpen(false)}
                className="rounded-full h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            {/* AI Assistant Quick Auto-Generate Button */}
            {creationMode === 'AI_ASSISTED' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 flex items-center justify-between gap-3">
                <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  <span className="flex items-center gap-1 font-black text-indigo-700 dark:text-indigo-300 mb-0.5">
                    <Sparkles className="h-4 w-4" /> AI Тапсырма Генераторы:
                  </span>
                  Таңдалған skill мен деңгейге сай сұрақ пен дұрыс жауапты автоматты жазады.
                </div>

                <Button
                  variant="accent"
                  size="sm"
                  disabled={aiGenerating}
                  onClick={handleAiAutoGenerate}
                  className="rounded-xl font-black shrink-0 text-xs shadow-soft-xs"
                >
                  {aiGenerating ? 'AI ойлануда...' : 'Авто-толтыру ✨'}
                </Button>
              </div>
            )}

            {/* Form Fields as required by user prompt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              
              {/* 1. Тақырып */}
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Тақырып (Topic):</label>
                <input
                  type="text"
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              {/* 2. Skill */}
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Skill (Мақсатты Дағды):</label>
                <select
                  value={formSkill}
                  onChange={(e) => setFormSkill(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="skill_borrow_subtraction">Разрядтан аттап азайту</option>
                  <option value="skill_basic_addition">Ондықтан аттап қосу</option>
                  <option value="skill_number_composition">Сан құрамы</option>
                  <option value="skill_word_problems">Мәтіндік сюжетті есеп</option>
                </select>
              </div>

              {/* 3. Сынып */}
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Сынып (Class Target):</label>
                <select
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="4 «А» сыныбы">4 «А» сыныбы</option>
                  <option value="2 «А» сыныбы">2 «А» сыныбы</option>
                  <option value="3 «Б» сыныбы">3 «Б» сыныбы</option>
                </select>
              </div>

              {/* 4. Деңгей */}
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Деңгей (Difficulty: {formDifficulty}):</label>
                <select
                  value={formDifficulty}
                  onChange={(e) => setFormDifficulty(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value={1.0}>1-деңгей (Қолдау)</option>
                  <option value={2.0}>2-деңгей (Стандарт)</option>
                  <option value={3.0}>3-деңгей (Контекст)</option>
                  <option value={4.0}>4-деңгей (Күрделі)</option>
                </select>
              </div>

              {/* 5. Тапсырма түрі (7 тип) */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Тапсырма түрі (7 Task Types):</label>
                <select
                  value={formTaskType}
                  onChange={(e) => setFormTaskType(e.target.value as TaskFormatType)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold text-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="multiple choice">1. multiple choice (Бірнеше жауаптан таңдау)</option>
                  <option value="number input">2. number input (Сандық мән енгізу)</option>
                  <option value="short answer">3. short answer (Қысқаша жауап)</option>
                  <option value="drag and drop">4. drag and drop (Сүйреп апару)</option>
                  <option value="matching">5. matching (Сәйкестендіру)</option>
                  <option value="visual task">6. visual task (Визуалды текшелер/блоктар)</option>
                  <option value="word problem">7. word problem (Мәтіндік сюжетті есеп)</option>
                </select>
              </div>

              {/* 6. Сұрақ */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Сұрақ (Question Prompt):</label>
                <textarea
                  rows={2}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              {/* 7. Жауап / Варианттар */}
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Жауап нұсқалары (үтірмен):</label>
                <input
                  type="text"
                  placeholder="34, 44, 46, 36"
                  value={formOptions}
                  onChange={(e) => setFormOptions(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              {/* 8. Дұрыс жауап */}
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Дұрыс жауап (Correct Answer):</label>
                <input
                  type="text"
                  value={formCorrectAnswer}
                  onChange={(e) => setFormCorrectAnswer(e.target.value)}
                  className="w-full rounded-2xl border border-emerald-300 bg-emerald-50/50 p-3 font-black text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                />
              </div>

              {/* 9. Түсіндіру */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-700 dark:text-slate-300">Түсіндіру (Explanation & Multi-Method Hint):</label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3 font-bold dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-2xl">
                Бас тарту
              </Button>
              <Button variant="primary" onClick={handleSaveAssignment} className="rounded-2xl font-black">
                Тапсырманы Бекіту & Сыныпқа Жіберу
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
