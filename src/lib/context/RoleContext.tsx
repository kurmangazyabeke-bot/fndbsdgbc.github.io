'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'teacher' | 'student';
export type ViewMode = 'landing' | 'cabinet';

export type TeacherTab =
  | 'dashboard'
  | 'diagnost'
  | 'adapter'
  | 'explainer'
  | 'trainer'
  | 'analyst'
  | 'students'
  | 'classes'
  | 'assignments'
  | 'progress'
  | 'project_results'
  | 'settings';

export type StudentTab =
  | 'my_dashboard'
  | 'today_tasks'
  | 'my_route'
  | 'explainer'
  | 'practice'
  | 'my_results'
  | 'achievements'
  | 'profile';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  teacherTab: TeacherTab;
  setTeacherTab: (tab: TeacherTab) => void;
  studentTab: StudentTab;
  setStudentTab: (tab: StudentTab) => void;
  isWowModalOpen: boolean;
  setIsWowModalOpen: (open: boolean) => void;
  openWowModal: () => void;
  closeWowModal: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('teacher');
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [teacherTab, setTeacherTab] = useState<TeacherTab>('dashboard');
  const [studentTab, setStudentTab] = useState<StudentTab>('my_dashboard');
  const [isWowModalOpen, setIsWowModalOpen] = useState<boolean>(false);

  const openWowModal = () => setIsWowModalOpen(true);
  const closeWowModal = () => setIsWowModalOpen(false);

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        viewMode,
        setViewMode,
        teacherTab,
        setTeacherTab,
        studentTab,
        setStudentTab,
        isWowModalOpen,
        setIsWowModalOpen,
        openWowModal,
        closeWowModal,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
