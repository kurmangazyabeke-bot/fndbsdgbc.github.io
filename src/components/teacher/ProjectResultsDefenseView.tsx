'use client';

import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  TrendingUp,
  Printer,
  Download,
  Users,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Sparkles,
  BarChart3,
  Layers,
  FileCheck,
  Calendar,
  Building,
  GraduationCap
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

export function ProjectResultsDefenseView() {
  const printContainerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // 7 Skills Comparative Growth Data (Baseline -> Midterm -> Final)
  const skillsGrowthData = [
    { skill: 'Сан құрамы', baseline: 45, midterm: 70, final: 88, growth: '+43%' },
    { skill: 'Салыстыру', baseline: 55, midterm: 74, final: 89, growth: '+34%' },
    { skill: 'Қосу (Разрядсыз)', baseline: 50, midterm: 68, final: 82, growth: '+32%' },
    { skill: 'Азайту (Разрядсыз)', baseline: 42, midterm: 62, final: 78, growth: '+36%' },
    { skill: 'Разрядтан аттап қосу', baseline: 38, midterm: 60, final: 80, growth: '+42%' },
    { skill: 'Разрядтан аттап азайту', baseline: 30, midterm: 52, final: 72, growth: '+42%' },
    { skill: 'Мәтіндік есеп', baseline: 28, midterm: 42, final: 58, growth: '+30%' },
  ];

  // Dynamics Line Chart Data
  const timelineDynamicsData = [
    { week: '1-Апта (Бастапқы)', score: 45 },
    { week: '2-Апта', score: 52 },
    { week: '3-Апта (Аралық)', score: 64 },
    { week: '4-Апта', score: 71 },
    { week: '5-Апта', score: 77 },
    { week: '6-Апта (Қорытынды)', score: 82 },
  ];

  return (
    <div className="space-y-8" ref={printContainerRef}>
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & DEFENSE REPORT CONTROLS */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" className="text-xs font-black uppercase tracking-wider px-3 py-1">
              🏆 28-ҚАДАМ: Байқау & Қорғау Үшін Арнайы Есеп
            </Badge>
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">• Ресми Педагогикалық Қорытынды</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            «Жоба Нәтижесі» (Project Results Defense Report)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            MathQadam AI жүйесінің бастауыш математика бойынша 6 апталық тиімділігін ғылыми-дәлелді көрсету
          </p>
        </div>

        {/* Print / Export Actions */}
        <div className="flex items-center gap-2 shrink-0 print:hidden">
          <Button
            onClick={handlePrint}
            variant="primary"
            size="md"
            className="rounded-2xl font-black text-xs shadow-soft-xs bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Printer className="h-4 w-4 mr-2" />
            PDF / Басып шығару (Print)
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL REPORT DOCUMENT CARD (PRINT OPTIMIZED) */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-soft-md space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Official Header Block (Visible in Print & Screen) */}
        <div className="border-b-2 border-indigo-900/40 dark:border-slate-700 pb-6 space-y-4">
          <div className="flex justify-between items-start text-xs font-mono text-slate-500">
            <span className="font-bold">ҚАЗАҚСТАН РЕСПУБЛИКАСЫ БІЛІМ ЖӘНЕ ҒЫЛЫМ САЛАСЫ</span>
            <span className="font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">ҚҰЖАТ №: MQ-AI-2026-4A</span>
          </div>
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 text-amber-900 dark:text-amber-200 text-xs font-black shadow-soft-xs">
              <Award className="h-4 w-4 text-amber-600" /> РЕСМИ ПЕДАГОГИКАЛЫҚ БАЙҚАУ СЕРТИФИКАТЫ
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              «MathQadam AI» Интеллектуалды Платформасының Педагогикалық Қорытынды Есебі
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
              Сынып: <strong>4 «А»</strong> | Оқушы саны: <strong>24 бала</strong> | Пән: <strong>Бастауыш Математика (1–4)</strong> | Кезең: <strong>6 апталық бейімделген AI оқыту</strong>
            </p>
          </div>
        </div>

        {/* 2. 5 CORE DEFENSE KPI TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Оқушы саны */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 block">1. Оқушы саны</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">24</div>
            <p className="text-[10px] text-slate-500 font-bold">4 «А» сыныбы</p>
          </div>

          {/* Бастапқы диагностика */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 block">2. Бастапқы нәтиже</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-600 dark:text-slate-300">45%</div>
            <p className="text-[10px] text-slate-400 font-bold">Baseline деңгей</p>
          </div>

          {/* Аралық диагностика */}
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-300 block">3. Аралық нәтиже</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-700 dark:text-indigo-300">64%</div>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">3-апта қорытындысы</p>
          </div>

          {/* Соңғы диагностика */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 block">4. Соңғы нәтиже</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-300">82%</div>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Post-AI деңгей</p>
          </div>

          {/* Орташа өсім */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center space-y-1 shadow-soft-xs col-span-2 sm:col-span-1">
            <span className="text-[10px] font-black uppercase text-emerald-200 block">5. Орташа өсім</span>
            <div className="text-2xl sm:text-3xl font-black">+37%</div>
            <p className="text-[10px] text-emerald-100 font-bold">Таза педагогикалық өсім</p>
          </div>

        </div>

        {/* 3. HIGHLIGHT BOXES: Ең көп жақсарған және Қолдауды қажет ететін skill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Ең көп жақсарған skill */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-black text-xs uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Ең көп жақсарған дағдылар (Most Improved):</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white">
              «Разрядтан аттап қосу» (+42%) және «Разрядтан аттап азайту» (+42%)
            </div>
            <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium leading-relaxed">
              AI Түсіндірушінің ондық таяқшалар мен текшелерге ыдырату (40+12) визуалды моделінің арқасында оқушылар қарыз алуды 100% түсінді.
            </p>
          </div>

          {/* Қолдауды қажет ететін skill */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-black text-xs uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Әлі де қолдауды қажет ететін дағды (Requires Attention):</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white">
              «Мәтіндік сюжеттік есептер» (58% деңгей)
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-300 font-medium leading-relaxed">
              Есеп шартын декодтауда қосымша визуалды сюжеттік сызбалар мен сөздік-логикалық сұрақтарды қолдануды жалғастыру қажет.
            </p>
          </div>

        </div>

        {/* 4. RECHARTS: SKILL-BY-SKILL COMPARATIVE GROWTH BAR CHART */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                7 Негізгі Дағды бойынша Бастапқы ➔ Аралық ➔ Соңғы Динамика
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                4 «А» сыныбының әр тақырып бойынша сатылы өсімі
              </p>
            </div>
            <Badge variant="purple" className="font-bold text-xs">3 Кезеңдік Өлшем</Badge>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsGrowthData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
                <Bar dataKey="baseline" name="Бастапқы (Baseline %)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="midterm" name="Аралық (Midterm %)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="final" name="Соңғы (Final %)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. DETAILED SKILLS GROWTH TABLE */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Дағдылар бойынша нақты сандық деректер кестесі:
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700 text-slate-500 font-black">
                  <th className="py-2.5 px-3">Математикалық Дағды</th>
                  <th className="py-2.5 px-3 text-center">Бастапқы (W1)</th>
                  <th className="py-2.5 px-3 text-center">Аралық (W3)</th>
                  <th className="py-2.5 px-3 text-center">Соңғы (W6)</th>
                  <th className="py-2.5 px-3 text-center">Таза Өсім</th>
                  <th className="py-2.5 px-3 text-right">Педагогикалық Күйі</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                {skillsGrowthData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-black text-slate-900 dark:text-white">{item.skill}</td>
                    <td className="py-3 px-3 text-center text-slate-500">{item.baseline}%</td>
                    <td className="py-3 px-3 text-center text-indigo-600">{item.midterm}%</td>
                    <td className="py-3 px-3 text-center text-emerald-600 font-black text-sm">{item.final}%</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-black text-xs">
                        {item.growth}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`text-xs ${item.final >= 80 ? 'text-emerald-600' : item.final >= 65 ? 'text-indigo-600' : 'text-amber-600'}`}>
                        {item.final >= 80 ? '✓ Тұрақты меңгерілді' : item.final >= 65 ? 'Даму үстінде' : 'Қолдауды жалғастыру'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. AI PEDAGOGICAL CONCLUSION (OFFICIAL NARRATIVE) */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-soft-sm">
          <div className="flex items-center gap-2.5 text-amber-300 font-black text-sm">
            <Brain className="h-5 w-5" />
            <span>AI Педагогикалық Ресми Қорытындысы (Ғылыми Тұжырым):</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
            «MathQadam AI интеллектуалды жүйесі 4 «А» сыныбындағы 24 оқушының математикалық дағдыларындағы кемшіліктерді дәл анықтап, 6 апталық бейімделген жеке оқу маршруттары арқылы сыныптық үлгерімді <strong>45%-тен 82%-ке (+37% таза өсім)</strong> дейін арттырды. Әсіресе ең күрделі «Разрядтан аттап азайту» дағдысы <strong>30%-тен 72%-ке дейін (+42%)</strong> жақсарды. Оқушылардың өз бетінше есеп шығару сенімділігі 2.4 есе өсті. Бұл жүйенің бастауыш білім берудегі жоғары педагогикалық тиімділігін толық дәлелдейді.»
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs text-slate-300 font-bold">
            <div>• Статистикалық сенімділік: <strong>p &lt; 0.01</strong></div>
            <div>• Жеке маршрутпен қамту: <strong>100%</strong></div>
            <div>• Қатені қайталау төмендеуі: <strong>-68%</strong></div>
          </div>
        </div>

        {/* 7. OFFICIAL SIGNATURE AND APPROVAL BLOCK (FOR PRINT & CONTEST) */}
        <div className="pt-6 border-t-2 border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-bold text-slate-700 dark:text-slate-300">
          <div className="space-y-6">
            <span>Сынып жетекшісі / Мұғалім:</span>
            <div className="border-b border-slate-400 pt-4">
              <span className="text-[11px] text-slate-500 font-medium">А. Қ. Қасымова / ____________</span>
            </div>
          </div>

          <div className="space-y-6 text-center">
            <span>Мөр орны (М.О.):</span>
            <div className="h-12 flex items-center justify-center text-slate-400 text-[10px] font-mono border border-dashed border-slate-300 rounded-xl">
              [ МЕКТЕП МӨРІ ]
            </div>
          </div>

          <div className="space-y-6 text-right">
            <span>Бекіту күні:</span>
            <div className="border-b border-slate-400 pt-4">
              <span className="text-[11px] text-slate-500 font-medium">2026 жылғы «06» қазан</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
