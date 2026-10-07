'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserRole } from './RoleContext';

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  studentCode?: string;
  schoolName?: string;
  className?: string;
  gradeLevel?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmailOrPhone: (identifier: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  loginWithStudentCode: (code: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: (role: UserRole, demoUserId?: 'aigul' | 'aidos' | 'jandos') => void;
  logout: () => Promise<void>;
  openAuthModal: (initialRole?: UserRole) => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalInitialRole: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default Teacher Demo Account
export const DEMO_TEACHER: AuthUser = {
  id: 'usr-teacher-aigul-01',
  email: 'aigul.teacher@mathqadam.kz',
  phone: '+7 777 123 4567',
  fullName: 'Айгүл Серікқызы',
  role: 'teacher',
  schoolName: '№175 IT Лицейі (Алматы қ.)',
  avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
};

// Default Student Demo Accounts
export const DEMO_STUDENT_AIDOS: AuthUser = {
  id: 'usr-student-aidos-02',
  email: 'bekarys.student@mathqadam.kz',
  phone: '+7 701 555 4321',
  fullName: 'Бекарыс Нұрлан',
  role: 'student',
  studentCode: 'BEKA-882',
  gradeLevel: 4,
  className: '4 «А» сыныбы',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
};

export const DEMO_STUDENT_JANDOS: AuthUser = {
  id: 'usr-student-jandos-03',
  email: 'jandos.student@mathqadam.kz',
  phone: '+7 707 999 8877',
  fullName: 'Жандос Тұрсынов',
  role: 'student',
  studentCode: 'JAND-491',
  gradeLevel: 2,
  className: '4 «А» сыныбы',
  avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(DEMO_TEACHER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>('teacher');

  // Supabase Auth listener
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        setUser({
          id: session.user.id,
          email: session.user.email,
          phone: session.user.phone,
          fullName: metadata.full_name || 'Пайдаланушы',
          role: (metadata.role as UserRole) || 'student',
          avatarUrl: metadata.avatar_url,
          studentCode: metadata.student_code,
          gradeLevel: metadata.grade_level || 2,
          schoolName: metadata.school_name,
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const loginWithEmailOrPhone = async (
    identifier: string,
    password: string,
    targetRole: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      if (isSupabaseConfigured()) {
        const isEmail = identifier.includes('@');
        const { data, error } = isEmail
          ? await supabase.auth.signInWithPassword({ email: identifier, password })
          : await supabase.auth.signInWithPassword({ phone: identifier, password });

        if (error) throw error;
        setIsLoading(false);
        setIsAuthModalOpen(false);
        return { success: true };
      }

      // Offline / Demo Fallback login simulation
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (targetRole === 'teacher') {
        setUser({
          ...DEMO_TEACHER,
          email: identifier.includes('@') ? identifier : DEMO_TEACHER.email,
          phone: !identifier.includes('@') ? identifier : DEMO_TEACHER.phone,
        });
      } else {
        setUser({
          ...DEMO_STUDENT_AIDOS,
          email: identifier.includes('@') ? identifier : DEMO_STUDENT_AIDOS.email,
          phone: !identifier.includes('@') ? identifier : DEMO_STUDENT_AIDOS.phone,
        });
      }

      setIsLoading(false);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Кіру қатесі орын алды' };
    }
  };

  const loginWithStudentCode = async (
    code: string,
    pin: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleanCode = code.trim().toUpperCase();
    if (cleanCode.includes('JAND') || cleanCode === 'JAND-491') {
      setUser(DEMO_STUDENT_JANDOS);
      setIsLoading(false);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    if (cleanCode.includes('AIDO') || cleanCode === 'AIDO-882' || cleanCode.length > 0) {
      setUser(DEMO_STUDENT_AIDOS);
      setIsLoading(false);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Оқушы коды немесе PIN қате!' };
  };

  const quickDemoLogin = (targetRole: UserRole, demoUserId?: 'aigul' | 'aidos' | 'jandos') => {
    if (demoUserId === 'aigul' || targetRole === 'teacher') {
      setUser(DEMO_TEACHER);
    } else if (demoUserId === 'jandos') {
      setUser(DEMO_STUDENT_JANDOS);
    } else {
      setUser(DEMO_STUDENT_AIDOS);
    }
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const openAuthModal = (initialRole: UserRole = 'teacher') => {
    setAuthModalInitialRole(initialRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const role: UserRole = user?.role || 'student';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        loginWithEmailOrPhone,
        loginWithStudentCode,
        quickDemoLogin,
        logout,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        authModalInitialRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
