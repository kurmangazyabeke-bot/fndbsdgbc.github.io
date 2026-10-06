'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { useAuth } from '@/lib/context/AuthContext';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { AuthModal } from '@/components/auth/AuthModal';
import { useRole } from '@/lib/context/RoleContext';
import {
  Brain,
  Sparkles,
  User,
  GraduationCap,
  Activity,
  Menu,
  X,
  LogIn,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Home,
  Layers,
  Trophy
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  activeTab?: 'diagnost' | 'explainer' | 'trainer' | 'analyst';
  setActiveTab?: (tab: 'diagnost' | 'explainer' | 'trainer' | 'analyst') => void;
  userRole?: 'student' | 'teacher';
  setUserRole?: (role: 'student' | 'teacher') => void;
}

export function Navbar({ activeTab, setActiveTab, userRole, setUserRole }: NavbarProps) {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { role, setRole, viewMode, setViewMode, setTeacherTab, setStudentTab, openWowModal } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'diagnost', label: t.nav.diagnost, color: 'emerald' },
    { key: 'explainer', label: t.nav.explainer, color: 'indigo' },
    { key: 'trainer', label: t.nav.trainer, color: 'amber' },
    { key: 'analyst', label: t.nav.analyst, color: 'purple' },
  ] as const;

  const handleNavClick = (key: 'diagnost' | 'explainer' | 'trainer' | 'analyst') => {
    setViewMode('cabinet');
    if (role === 'teacher') {
      setTeacherTab(key);
    } else {
      setStudentTab(key === 'trainer' ? 'practice' : (key as any));
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 shadow-soft-xs transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          
          {/* Brand Logo & Slogan */}
          <div 
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 text-white shadow-soft-md group-hover:scale-105 group-hover:shadow-glow-emerald transition-all">
              <Brain className="h-6 w-6 transition-transform group-hover:rotate-6" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  MathQadam <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">AI</span>
                </span>
                <span className="hidden md:inline-flex text-[10px] uppercase font-mono tracking-wider font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 shadow-soft-xs">
                  v2.4 PRO
                </span>
              </div>
              <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                «{t.brand.slogan}»
              </p>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1.5 rounded-2xl bg-slate-100/80 p-1.5 dark:bg-slate-800/80">
            {/* Landing / Home Link */}
            <button
              onClick={() => setViewMode('landing')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black transition-all ${
                viewMode === 'landing'
                  ? 'bg-white text-emerald-700 shadow-soft-xs dark:bg-slate-900 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              Басты бет
            </button>

            {/* Core AI Engines Tabs */}
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold transition-all ${
                  viewMode === 'cabinet' && activeTab === item.key
                    ? 'bg-white text-slate-900 shadow-soft-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                <span className={`h-2 w-2 rounded-full bg-${item.color}-500`} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 25-ҚАДАМ: Байқауға арналған WOW Effect Flow Button */}
            <button
              onClick={openWowModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-soft-xs hover:shadow-soft-md transition-all animate-pulse"
              title="5 AI байланысын көрсететін 10 қадамдық интерактивті байқау демосы"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-100" />
              <span className="hidden md:inline">Байқау Демосы (WOW)</span>
              <span className="md:hidden">WOW</span>
            </button>

            {/* Quick Role View Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <button
                onClick={() => {
                  setRole('teacher');
                  setViewMode('cabinet');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  viewMode === 'cabinet' && role === 'teacher'
                    ? 'bg-indigo-600 text-white shadow-soft-xs'
                    : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Мұғалім
              </button>
              <button
                onClick={() => {
                  setRole('student');
                  setViewMode('cabinet');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  viewMode === 'cabinet' && role === 'student'
                    ? 'bg-emerald-600 text-white shadow-soft-xs'
                    : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                Оқушы
              </button>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Authenticated User / Login Trigger */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 pl-2 pr-1.5 py-1 rounded-2xl border border-slate-200/70 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs font-black text-white ${
                    user.role === 'teacher' ? 'bg-indigo-600' : 'bg-emerald-600'
                  }`}>
                    {user.role === 'teacher' ? <GraduationCap className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className="hidden xl:block text-left text-xs">
                    <p className="font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                      {user.fullName}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold leading-tight">
                      {user.role === 'teacher' ? 'Мұғалім' : user.className || 'Оқушы'}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal(user.role)}
                  className="h-7 px-2 text-[11px] font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 rounded-xl"
                  title="Аккаунтты ауыстыру"
                >
                  <span className="hidden sm:inline">Ауыстыру</span>
                  <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl"
                  title="Жүйеден шығу"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => openAuthModal('teacher')}
                className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-soft-xs"
              >
                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                Кіру
              </Button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2 dark:border-slate-800 dark:bg-slate-900 animate-in slide-in-from-top-2">
            <button
              onClick={() => {
                setViewMode('landing');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 rounded-xl p-3 text-xs font-bold transition-all text-left ${
                viewMode === 'landing'
                  ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                  : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300'
              }`}
            >
              <Home className="h-4 w-4 text-emerald-600" />
              Басты бет (Landing)
            </button>

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  handleNavClick(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-xl p-3 text-xs font-bold transition-all text-left ${
                  viewMode === 'cabinet' && activeTab === item.key
                    ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300'
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full bg-${item.color}-500`} />
                {item.label}
              </button>
            ))}

            {/* 25-ҚАДАМ: Байқауға арналған WOW Effect Flow Button for Mobile */}
            <button
              onClick={() => {
                openWowModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between rounded-xl p-3 text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft-xs text-left"
            >
              <div className="flex items-center gap-2.5">
                <Trophy className="h-4 w-4 text-amber-200 animate-bounce" />
                <span>🏆 Байқау Демосы (WOW Effect Flow)</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">10 Қадам</span>
            </button>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setRole('teacher');
                    setViewMode('cabinet');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 ${
                    viewMode === 'cabinet' && role === 'teacher'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" /> Мұғалім
                </button>
                <button
                  onClick={() => {
                    setRole('student');
                    setViewMode('cabinet');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 ${
                    viewMode === 'cabinet' && role === 'student'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <User className="h-4 w-4" /> Оқушы
                </button>
              </div>

              <Button
                onClick={() => {
                  openAuthModal(role || 'teacher');
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Аккаунтқа кіру / Ауыстыру
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Auth Modal */}
      <AuthModal />
    </>
  );
}
