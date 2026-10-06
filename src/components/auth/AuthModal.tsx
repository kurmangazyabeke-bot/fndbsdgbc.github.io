'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useRole, UserRole } from '@/lib/context/RoleContext';
import { useTranslation } from '@/lib/i18n/context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  User,
  X,
  Mail,
  Lock,
  Phone,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  School,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function AuthModal() {
  const { t } = useTranslation();
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalInitialRole,
    loginWithEmailOrPhone,
    loginWithStudentCode,
    quickDemoLogin,
    isLoading,
  } = useAuth();

  const { setRole, setTeacherTab, setStudentTab } = useRole();

  const [activeTab, setActiveTab] = useState<'teacher' | 'student' | 'signup'>(
    authModalInitialRole === 'student' ? 'student' : 'teacher'
  );

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [studentLoginMode, setStudentLoginMode] = useState<'credentials' | 'code'>('code');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier || !password) {
      setErrorMessage('Барлық өрістерді толтырыңыз');
      return;
    }

    const res = await loginWithEmailOrPhone(identifier, password, 'teacher');
    if (res.success) {
      setRole('teacher');
      setTeacherTab('dashboard');
    } else {
      setErrorMessage(res.error || 'Кіру сәтсіз аяқталды');
    }
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (studentLoginMode === 'code') {
      if (!studentCode) {
        setErrorMessage('Оқушы кодын енгізіңіз');
        return;
      }
      const res = await loginWithStudentCode(studentCode, studentPin);
      if (res.success) {
        setRole('student');
        setStudentTab('my_dashboard');
      } else {
        setErrorMessage(res.error || 'Оқушы коды табылмады');
      }
    } else {
      if (!identifier || !password) {
        setErrorMessage('Барлық өрістерді толтырыңыз');
        return;
      }
      const res = await loginWithEmailOrPhone(identifier, password, 'student');
      if (res.success) {
        setRole('student');
        setStudentTab('my_dashboard');
      } else {
        setErrorMessage(res.error || 'Кіру сәтсіз аяқталды');
      }
    }
  };

  const handleQuickDemo = (demoRole: UserRole, demoUser?: 'aigul' | 'aidos' | 'jandos') => {
    quickDemoLogin(demoRole, demoUser);
    setRole(demoRole);
    if (demoRole === 'teacher') {
      setTeacherTab('dashboard');
    } else {
      setStudentTab('my_dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-indigo-600 text-white shadow-soft-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            MathQadam <span className="text-emerald-600">AI</span> Жүйесіне Кіру
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Рөлге байланысты авторизация және қорғалған деректер кеңістігі
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800 mb-6">
          <button
            onClick={() => {
              setActiveTab('teacher');
              setErrorMessage('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
              activeTab === 'teacher'
                ? 'bg-white text-indigo-700 shadow-soft-xs dark:bg-slate-900 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            Мұғалім
          </button>
          <button
            onClick={() => {
              setActiveTab('student');
              setErrorMessage('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
              activeTab === 'student'
                ? 'bg-white text-emerald-700 shadow-soft-xs dark:bg-slate-900 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <User className="h-4 w-4" />
            Оқушы
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-white text-amber-700 shadow-soft-xs dark:bg-slate-900 dark:text-amber-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Тіркелу
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. TEACHER LOGIN FORM */}
        {activeTab === 'teacher' && (
          <form onSubmit={handleTeacherLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email немесе Телефон нөмірі
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="aigul.teacher@mathqadam.kz немесе +7 777..."
                  className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Құпиясөз (Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 py-3 text-sm font-bold text-white shadow-soft-sm"
            >
              {isLoading ? 'Кіру орындалуда...' : 'Мұғалім болып кіру ➔'}
            </Button>

            {/* Quick Demo Login */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] font-bold text-slate-500 mb-2">
                Жылдам тексеру үшін (1-басумен):
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleQuickDemo('teacher', 'aigul')}
                className="w-full rounded-2xl border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-300 text-xs font-bold py-2"
              >
                👨‍🏫 Мұғалім Демо: Айгүл Серікқызы (4 «А» сыныбы)
              </Button>
            </div>
          </form>
        )}

        {/* 2. STUDENT LOGIN FORM */}
        {activeTab === 'student' && (
          <div className="space-y-4">
            {/* Student Mode Switcher */}
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setStudentLoginMode('code')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  studentLoginMode === 'code'
                    ? 'bg-white text-emerald-700 shadow-soft-xs dark:bg-slate-900 dark:text-emerald-400'
                    : 'text-slate-600'
                }`}
              >
                🔢 Оқушы кодымен (Жеңіл)
              </button>
              <button
                type="button"
                onClick={() => setStudentLoginMode('credentials')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  studentLoginMode === 'credentials'
                    ? 'bg-white text-emerald-700 shadow-soft-xs dark:bg-slate-900 dark:text-emerald-400'
                    : 'text-slate-600'
                }`}
              >
                📧 Телефон / Email
              </button>
            </div>

            <form onSubmit={handleStudentLogin} className="space-y-3">
              {studentLoginMode === 'code' ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Жеке Оқушы Коды (Student Code)
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={studentCode}
                        onChange={(e) => setStudentCode(e.target.value)}
                        placeholder="Мысалы: AIDO-882 немесе JAND-491"
                        className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm font-mono uppercase tracking-wider focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      4-таңбалы PIN код
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        maxLength={4}
                        value={studentPin}
                        onChange={(e) => setStudentPin(e.target.value)}
                        placeholder="••••"
                        className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm font-mono text-center tracking-widest focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Телефон немесе Email
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="+7 701... немесе aidos@..."
                        className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Құпиясөз
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3 text-sm font-bold text-white shadow-soft-sm"
              >
                {isLoading ? 'Кіру орындалуда...' : 'Оқушы болып кіру ➔'}
              </Button>
            </form>

            {/* Quick Demo Login */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-[11px] font-bold text-slate-500 text-center">
                1-басумен оқушы аккаунтына кіру:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleQuickDemo('student', 'aidos')}
                  className="rounded-xl border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300 text-xs font-bold py-2"
                >
                  🧒 Айдос (2 «А»)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleQuickDemo('student', 'jandos')}
                  className="rounded-xl border-teal-200 bg-teal-50/50 hover:bg-teal-100 text-teal-800 dark:border-teal-900 dark:bg-teal-950/30 dark:text-teal-300 text-xs font-bold py-2"
                >
                  🧒 Жандос (4 «А»)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 3. SIGNUP TAB */}
        {activeTab === 'signup' && (
          <div className="space-y-4 text-center py-2">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/50">
              <School className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Жаңа мұғалім немесе оқушыны тіркеу
            </h3>
            <p className="text-xs text-slate-500">
              Мұғалімдер сынып ашып, оқушыларына арнайы PIN кодтар үлестіре алады.
            </p>
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-xs font-semibold text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300">
              💡 Сыныпқа қосылу үшін мұғаліміңізден <span className="font-mono font-bold">MQ-4A-8921</span> сияқты кодты алыңыз.
            </div>
            <Button
              onClick={() => setActiveTab('teacher')}
              className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white"
            >
              Мұғалім ретінде кіру
            </Button>
          </div>
        )}

        {/* RBAC Security Note */}
        <div className="mt-5 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500 text-center dark:bg-slate-800/50 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span>Supabase RLS: Оқушы тек өз деректерін, мұғалім өз сыныбын көреді.</span>
        </div>

      </div>
    </div>
  );
}
