'use client';

import React, { useState } from 'react';
import { LanguageProvider, useTranslation } from '@/lib/i18n/context';
import { AuthProvider } from '@/lib/context/AuthContext';
import { RoleProvider, useRole, UserRole } from '@/lib/context/RoleContext';
import { Navbar } from '@/components/layout/Navbar';
import { HeroBanner } from '@/components/layout/HeroBanner';
import { TeacherSidebar } from '@/components/layout/TeacherSidebar';
import { StudentSidebar } from '@/components/layout/StudentSidebar';

// Engine views
import { DiagnosticRunner } from '@/components/diagnost/DiagnosticRunner';
import { AIAdapterModuleView } from '@/components/adapter/AIAdapterModuleView';
import { MultiMethodExplainer } from '@/components/explainer/MultiMethodExplainer';
import { InteractiveTrainer } from '@/components/trainer/InteractiveTrainer';
import { TeacherAnalyticsDashboard } from '@/components/analyst/TeacherAnalyticsDashboard';

// Teacher Views
import { TeacherDashboardView } from '@/components/teacher/TeacherDashboardView';
import { StudentsView } from '@/components/teacher/StudentsView';
import { ClassesView } from '@/components/teacher/ClassesView';
import { AssignmentsView } from '@/components/teacher/AssignmentsView';
import { ProgressHeatmapView } from '@/components/teacher/ProgressHeatmapView';
import { ProjectResultsDefenseView } from '@/components/teacher/ProjectResultsDefenseView';
import { TeacherSettingsView } from '@/components/teacher/TeacherSettingsView';

// Student Views
import { StudentDashboardView } from '@/components/student/StudentDashboardView';
import { TodayTasksView } from '@/components/student/TodayTasksView';
import { StudentRouteView } from '@/components/student/StudentRouteView';
import { StudentResultsView } from '@/components/student/StudentResultsView';
import { StudentAchievementsView } from '@/components/student/StudentAchievementsView';
import { StudentProfileView } from '@/components/student/StudentProfileView';

// Landing View
import { LandingPageView } from '@/components/landing/LandingPageView';

// 25-ҚАДАМ: WOW Effect Modal
import { PedagogicalWowFlowModal } from '@/components/demo/PedagogicalWowFlowModal';

import { MathGap } from '@/types/mathqadam';

function MathQadamMainApp() {
  const { t } = useTranslation();
  const {
    role,
    setRole,
    viewMode,
    setViewMode,
    teacherTab,
    setTeacherTab,
    studentTab,
    setStudentTab,
    isWowModalOpen,
    closeWowModal
  } = useRole();

  const [activeGaps, setActiveGaps] = useState<MathGap[]>([
    {
      id: 'default-gap-1',
      topicId: 'addition-carry',
      topicNameKaz: 'Ойша санды ескерусіз қосу (28 + 15)',
      misconception: 'CARRIED_OVER_FORGOTTEN',
      descriptionKaz: 'Оқушы бағандап қосуда разрядтан өтетін 1 санын еске сақтамай қосады.',
      severity: 'HIGH',
      detectedAt: new Date().toISOString(),
      remediationStatus: 'UNRESOLVED',
    },
  ]);
  const [adaptiveLevel, setAdaptiveLevel] = useState<number>(2.0);

  const handleDiagnosticComplete = (detectedGaps: MathGap[], recommendedLevel: number) => {
    setActiveGaps(detectedGaps);
    setAdaptiveLevel(recommendedLevel);
    if (role === 'teacher') {
      setTeacherTab('explainer');
    } else {
      setStudentTab('explainer');
    }
  };

  const handleStartPlatform = () => {
    setViewMode('cabinet');
    if (role === 'teacher') {
      setTeacherTab('diagnost');
    } else {
      setStudentTab('practice');
    }
  };

  const handleNavigateToModule = (moduleKey: 'diagnost' | 'adapter' | 'explainer' | 'trainer' | 'analyst') => {
    setViewMode('cabinet');
    if (role === 'teacher') {
      setTeacherTab(moduleKey);
    } else {
      setStudentTab(moduleKey === 'trainer' ? 'practice' : (moduleKey as any));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={role === 'teacher' ? (teacherTab as any) : (studentTab as any)}
        setActiveTab={(tab: any) => {
          setViewMode('cabinet');
          if (role === 'teacher') setTeacherTab(tab);
          else setStudentTab(tab);
        }}
        userRole={role}
        setUserRole={setRole}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 space-y-6">
        
        {viewMode === 'landing' ? (
          /* ========================================================= */
          /* 20-ҚАДАМ: БАСТАПҚЫ БЕТ — LANDING PAGE */
          /* ========================================================= */
          <LandingPageView
            onStartPlatform={handleStartPlatform}
            onNavigateToModule={handleNavigateToModule}
          />
        ) : (
          /* ========================================================= */
          /* TEACHER / STUDENT WORKSPACE CABINET VIEWS */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Dynamic Role Layout with Sidebar */}
            <div className="flex flex-col lg:flex-row items-start gap-6">
              
              {/* Sidebar Navigation depending on Active Role */}
              {role === 'teacher' ? <TeacherSidebar /> : <StudentSidebar />}

              {/* Role Content Area */}
              <div className="flex-1 w-full min-w-0">
                {role === 'teacher' ? (
                  /* TEACHER CABINET VIEWS (11 tabs) */
                  <>
                    {teacherTab === 'dashboard' && <TeacherDashboardView />}
                    {teacherTab === 'diagnost' && <DiagnosticRunner onDiagnosticComplete={handleDiagnosticComplete} />}
                    {teacherTab === 'adapter' && <AIAdapterModuleView />}
                    {teacherTab === 'explainer' && <MultiMethodExplainer />}
                    {teacherTab === 'trainer' && <InteractiveTrainer activeGaps={activeGaps} initialLevel={adaptiveLevel} />}
                    {teacherTab === 'analyst' && <TeacherAnalyticsDashboard activeGaps={activeGaps} />}
                    {teacherTab === 'students' && <StudentsView />}
                    {teacherTab === 'classes' && <ClassesView />}
                    {teacherTab === 'assignments' && <AssignmentsView />}
                    {teacherTab === 'progress' && <ProgressHeatmapView />}
                    {teacherTab === 'project_results' && <ProjectResultsDefenseView />}
                    {teacherTab === 'settings' && <TeacherSettingsView />}
                  </>
                ) : (
                  /* STUDENT CABINET VIEWS (8 tabs) */
                  <>
                    {studentTab === 'my_dashboard' && (
                      <StudentDashboardView onNavigate={(tab) => setStudentTab(tab)} />
                    )}
                    {studentTab === 'today_tasks' && (
                      <TodayTasksView onStartPractice={() => setStudentTab('practice')} />
                    )}
                    {studentTab === 'my_route' && <StudentRouteView />}
                    {studentTab === 'explainer' && <MultiMethodExplainer />}
                    {studentTab === 'practice' && (
                      <InteractiveTrainer activeGaps={activeGaps} initialLevel={adaptiveLevel} />
                    )}
                    {studentTab === 'my_results' && <StudentResultsView />}
                    {studentTab === 'achievements' && <StudentAchievementsView />}
                    {studentTab === 'profile' && <StudentProfileView />}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Clean SaaS Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 dark:border-slate-800 dark:bg-slate-900 mb-14 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-medium">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* 25-ҚАДАМ: Байқауға арналған 10 Қадамдық WOW Effect Demo Flow Модалы */}
      <PedagogicalWowFlowModal isOpen={isWowModalOpen} onClose={closeWowModal} />
    </div>
  );
}

import { ToastProvider } from '@/lib/context/ToastContext';
import { AIPipelineProvider } from '@/lib/context/AIPipelineContext';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export default function MathQadamHomePage() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RoleProvider>
          <AIPipelineProvider>
            <ToastProvider>
              <MathQadamMainApp />
            </ToastProvider>
          </AIPipelineProvider>
        </RoleProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
