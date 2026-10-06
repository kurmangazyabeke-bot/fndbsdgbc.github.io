-- =========================================================================
-- MATHQADAM AI - PRODUCTION DATABASE SCHEMA (Supabase PostgreSQL)
-- 15-ҚАДАМ: ДЕРЕКТЕР ҚОРЫ АРХИТЕКТУРАСЫ
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================================
-- 1. USERS & PROFILES
-- =========================================================================

-- 1.1 Users (Base Auth & Account table)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('teacher', 'student', 'parent', 'admin')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.2 Profiles (Extended User Profile Information)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    preferred_language VARCHAR(10) DEFAULT 'kk' CHECK (preferred_language IN ('kk', 'ru', 'en')),
    phone VARCHAR(50),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.3 Teachers (Teacher Specific Info)
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    school_name VARCHAR(255) NOT NULL,
    subject VARCHAR(100) DEFAULT 'Бастауыш сынып математикасы',
    experience_years INT DEFAULT 1,
    bio TEXT,
    verification_status VARCHAR(50) DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.4 Students (Student Specific Info & Gamification KPIs)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    grade_level INT NOT NULL CHECK (grade_level BETWEEN 1 AND 4),
    student_code VARCHAR(20) UNIQUE NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    current_level INT DEFAULT 1,
    total_xp INT DEFAULT 0,
    daily_streak INT DEFAULT 1,
    baseline_score NUMERIC(5,2) DEFAULT 0.0,
    current_score NUMERIC(5,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- 2. CLASSES & MEMBERSHIP
-- =========================================================================

-- 2.1 Classes
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- e.g. "4 «А» сыныбы"
    grade_level INT NOT NULL CHECK (grade_level BETWEEN 1 AND 4),
    invite_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. "MQ-4A-8921"
    academic_year VARCHAR(20) DEFAULT '2025-2026',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.2 Class Members (Junction table linking students to classes)
CREATE TABLE IF NOT EXISTS public.class_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'transferred')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (class_id, student_id)
);

-- =========================================================================
-- 3. CURRICULUM: SKILLS & TOPICS
-- =========================================================================

-- 3.1 Skills
CREATE TABLE IF NOT EXISTS public.skills (
    id VARCHAR(100) PRIMARY KEY, -- e.g. "skill_borrow_subtraction"
    code VARCHAR(50) UNIQUE NOT NULL,
    name_kaz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255),
    category VARCHAR(100) NOT NULL, -- e.g. "Арифметика", "Мәтіндік есеп", "Геометрия"
    grade_level INT NOT NULL CHECK (grade_level BETWEEN 1 AND 4),
    icon_name VARCHAR(50) DEFAULT 'Calculator',
    order_index INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.2 Topics
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    name_kaz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255),
    grade_level INT NOT NULL CHECK (grade_level BETWEEN 1 AND 4),
    description_kaz TEXT,
    order_index INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- 4. TASKS, ATTEMPTS & EXPLANATIONS
-- =========================================================================

-- 4.1 Tasks (Math Problems Bank)
CREATE TABLE IF NOT EXISTS public.tasks (
    id VARCHAR(100) PRIMARY KEY, -- e.g. "p-sub-12-5", "task-diag-borrow-main"
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    grade_level INT NOT NULL CHECK (grade_level BETWEEN 1 AND 4),
    difficulty NUMERIC(3,2) NOT NULL DEFAULT 1.0, -- 1.0 to 4.0
    task_type VARCHAR(50) NOT NULL DEFAULT 'multiple choice' CHECK (task_type IN (
        'multiple choice', 'number input', 'short answer', 'drag and drop', 'matching', 'visual task', 'word problem'
    )),
    question_kaz TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    options JSONB DEFAULT '[]'::jsonb,
    target_misconception VARCHAR(100),
    visual_decomposition JSONB,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4.2 Explanations (AI Explainer Multi-Mode Data)
CREATE TABLE IF NOT EXISTS public.explanations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id VARCHAR(100) NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    style_type VARCHAR(50) NOT NULL CHECK (style_type IN (
        'VISUAL', 'NUMBER_LINE', 'STEP_BY_STEP', 'STORY', 'SOCRATIC'
    )),
    title_kaz VARCHAR(255) NOT NULL,
    content_kaz TEXT NOT NULL,
    steps_kaz JSONB DEFAULT '[]'::jsonb,
    visual_data JSONB,
    socratic_prompts JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4.3 Task Attempts (Execution History)
CREATE TABLE IF NOT EXISTS public.task_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id VARCHAR(100) NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    student_answer TEXT,
    is_correct BOOLEAN NOT NULL,
    mistake_type VARCHAR(100),
    time_spent_sec INT NOT NULL DEFAULT 0,
    explanation_mode_used VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- 5. AI DIAGNOST: SESSIONS & RESULTS
-- =========================================================================

-- 5.1 Diagnostic Sessions
CREATE TABLE IF NOT EXISTS public.diagnostic_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
    total_questions INT NOT NULL DEFAULT 5,
    correct_count INT NOT NULL DEFAULT 0,
    score_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    primary_misconception VARCHAR(100),
    confidence_score NUMERIC(4,2) DEFAULT 0.0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5.2 Diagnostic Results
CREATE TABLE IF NOT EXISTS public.diagnostic_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.diagnostic_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    is_gap_detected BOOLEAN NOT NULL DEFAULT FALSE,
    recurrence_rate NUMERIC(4,2) DEFAULT 0.0,
    confidence_score NUMERIC(4,2) DEFAULT 0.0,
    recommended_route VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- 6. MISTAKES & SKILL MASTERY
-- =========================================================================

-- 6.1 Mistakes (Exact schema requested)
CREATE TABLE IF NOT EXISTS public.mistakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    task_id VARCHAR(100) REFERENCES public.tasks(id) ON DELETE SET NULL,
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    mistake_type VARCHAR(100) NOT NULL,
    mistake_pattern TEXT,
    severity VARCHAR(20) DEFAULT 'MEDIUM' CHECK (severity IN ('HIGH', 'MEDIUM', 'LOW')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6.2 Student Skill Mastery (Exact schema requested)
CREATE TABLE IF NOT EXISTS public.student_skill_mastery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    mastery_score NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    previous_score NUMERIC(5,2) DEFAULT 0.0,
    status VARCHAR(50) NOT NULL DEFAULT 'NEEDS_SUPPORT' CHECK (status IN (
        'NEEDS_SUPPORT', 'DEVELOPING', 'MASTERED', 'ADVANCED'
    )),
    last_assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (student_id, skill_id)
);

-- =========================================================================
-- 7. AI ADAPTER & AI TRAINER ROUTES
-- =========================================================================

-- 7.1 Adaptive Tasks (AI Adapter state & queue)
CREATE TABLE IF NOT EXISTS public.adaptive_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    current_level INT NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 4),
    target_difficulty NUMERIC(3,2) NOT NULL DEFAULT 1.0,
    support_level VARCHAR(20) DEFAULT 'high' CHECK (support_level IN ('high', 'medium', 'low', 'none')),
    task_id VARCHAR(100) REFERENCES public.tasks(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7.2 Training Routes (Exact schema requested)
CREATE TABLE IF NOT EXISTS public.training_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    skill_id VARCHAR(100) NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    route_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7.3 Training Route Steps (6-stage Roadmap steps)
CREATE TABLE IF NOT EXISTS public.training_route_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id UUID NOT NULL REFERENCES public.training_routes(id) ON DELETE CASCADE,
    step_number INT NOT NULL CHECK (step_number BETWEEN 1 AND 6),
    title_kaz VARCHAR(255) NOT NULL,
    description_kaz TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'active', 'completed')),
    mastery_score NUMERIC(5,2) DEFAULT 0.0,
    min_mastery_to_unlock NUMERIC(5,2) DEFAULT 85.0,
    drills_payload JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (route_id, step_number)
);

-- =========================================================================
-- 8. ANALYTICS, PROGRESS & ACHIEVEMENTS
-- =========================================================================

-- 8.1 Analytics Snapshots (AI Analyst Pedagogical Evidence)
CREATE TABLE IF NOT EXISTS public.analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    baseline_mastery NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    current_mastery NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    growth_diff NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    skills_improved JSONB DEFAULT '[]'::jsonb,
    skills_stalled JSONB DEFAULT '[]'::jsonb,
    persistent_errors JSONB DEFAULT '[]'::jsonb,
    pedagogical_conclusion TEXT,
    recommendations JSONB DEFAULT '[]'::jsonb,
    snapshot_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8.2 Student Progress (Daily activity logs)
CREATE TABLE IF NOT EXISTS public.student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    xp_earned INT DEFAULT 0,
    daily_streak INT DEFAULT 1,
    level INT DEFAULT 1,
    daily_target_completed BOOLEAN DEFAULT FALSE,
    activity_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (student_id, activity_date)
);

-- 8.3 Achievements (Badges & Gamification)
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    badge_code VARCHAR(100) NOT NULL,
    badge_name_kaz VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'Award',
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (student_id, badge_code)
);

-- =========================================================================
-- 9. PERFORMANCE INDEXES
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_students_code ON public.students(student_code);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON public.classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_members_student ON public.class_members(student_id);
CREATE INDEX IF NOT EXISTS idx_tasks_skill ON public.tasks(skill_id);
CREATE INDEX IF NOT EXISTS idx_task_attempts_student ON public.task_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_mistakes_student ON public.mistakes(student_id);
CREATE INDEX IF NOT EXISTS idx_mistakes_skill ON public.mistakes(skill_id);
CREATE INDEX IF NOT EXISTS idx_student_skill_mastery_student ON public.student_skill_mastery(student_id);
CREATE INDEX IF NOT EXISTS idx_training_routes_student ON public.training_routes(student_id);
CREATE INDEX IF NOT EXISTS idx_training_route_steps_route ON public.training_route_steps(route_id);
CREATE INDEX IF NOT EXISTS idx_analytics_snapshots_student ON public.analytics_snapshots(student_id);

-- =========================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_route_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- 10. ROLE-BASED ACCESS CONTROL (RBAC) & ROW LEVEL SECURITY (RLS)
-- =========================================================================

-- Public reference tables (Skills, Topics, Tasks, Explanations)
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Public read explanations" ON public.explanations FOR SELECT USING (true);

-- Users & Profiles: Users can view and edit only their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT 
    USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Teachers: Teacher can view and manage their own teacher profile
CREATE POLICY "Teachers manage own profile" ON public.teachers FOR ALL 
    USING (auth.uid() = id);

-- Students: Student can view their own data, OR a Teacher can view their enrolled students
CREATE POLICY "Students view own profile" ON public.students FOR SELECT 
    USING (
        auth.uid() = id 
        OR EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.class_members cm ON c.id = cm.class_id
            WHERE c.teacher_id = auth.uid() AND cm.student_id = public.students.id
        )
    );
CREATE POLICY "Students update own profile" ON public.students FOR UPDATE 
    USING (auth.uid() = id);

-- Classes: Teacher manages their own classes; Students can view only their enrolled classes
CREATE POLICY "Teachers manage own classes" ON public.classes FOR ALL 
    USING (teacher_id = auth.uid());
CREATE POLICY "Students view joined classes" ON public.classes FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.class_members cm 
            WHERE cm.class_id = public.classes.id AND cm.student_id = auth.uid()
        )
    );

-- Class Members: Enrolled student or class teacher
CREATE POLICY "Members view class enrollment" ON public.class_members FOR SELECT 
    USING (
        student_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM public.classes c 
            WHERE c.id = public.class_members.class_id AND c.teacher_id = auth.uid()
        )
    );
CREATE POLICY "Teachers manage class members" ON public.class_members FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.classes c 
            WHERE c.id = public.class_members.class_id AND c.teacher_id = auth.uid()
        )
    );

-- Student Skill Mastery: Student accesses own, Teacher accesses their class students
CREATE POLICY "Student skill mastery access" ON public.student_skill_mastery FOR SELECT 
    USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.class_members cm ON c.id = cm.class_id
            WHERE c.teacher_id = auth.uid() AND cm.student_id = public.student_skill_mastery.student_id
        )
    );
CREATE POLICY "Student update own mastery" ON public.student_skill_mastery FOR ALL 
    USING (student_id = auth.uid());

-- Mistakes: Student sees own mistakes, Teacher sees enrolled students' mistakes
CREATE POLICY "Mistakes access" ON public.mistakes FOR SELECT 
    USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.class_members cm ON c.id = cm.class_id
            WHERE c.teacher_id = auth.uid() AND cm.student_id = public.mistakes.student_id
        )
    );
CREATE POLICY "Student record mistakes" ON public.mistakes FOR INSERT 
    WITH CHECK (student_id = auth.uid());

-- Training Routes & Steps: Private to student and their teacher
CREATE POLICY "Training routes access" ON public.training_routes FOR SELECT 
    USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.class_members cm ON c.id = cm.class_id
            WHERE c.teacher_id = auth.uid() AND cm.student_id = public.training_routes.student_id
        )
    );
CREATE POLICY "Training routes manage" ON public.training_routes FOR ALL 
    USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.class_members cm ON c.id = cm.class_id
            WHERE c.teacher_id = auth.uid() AND cm.student_id = public.training_routes.student_id
        )
    );

CREATE POLICY "Training route steps access" ON public.training_route_steps FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.training_routes tr 
            WHERE tr.id = public.training_route_steps.route_id 
            AND (
                tr.student_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM public.classes c
                    JOIN public.class_members cm ON c.id = cm.class_id
                    WHERE c.teacher_id = auth.uid() AND cm.student_id = tr.student_id
                )
            )
        )
    );

-- Analytics Snapshots: Private to student and class teacher
CREATE POLICY "Analytics snapshots access" ON public.analytics_snapshots FOR SELECT 
    USING (
        student_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.classes c
            JOIN public.class_members cm ON c.id = cm.class_id
            WHERE c.teacher_id = auth.uid() AND cm.student_id = public.analytics_snapshots.student_id
        )
    );

-- Student Progress & Achievements: Student own records
CREATE POLICY "Student progress access" ON public.student_progress FOR ALL 
    USING (student_id = auth.uid());
CREATE POLICY "Achievements access" ON public.achievements FOR ALL 
    USING (student_id = auth.uid());

-- =========================================================================
-- 11. INITIAL SEED DATA (Curriculum Skills)
-- =========================================================================

INSERT INTO public.skills (id, code, name_kaz, name_ru, category, grade_level, icon_name, order_index)
VALUES 
    ('skill_number_composition', 'NUM_COMP', 'Санның разрядтық құрамы', 'Разрядный состав числа', 'Арифметика', 1, 'Boxes', 1),
    ('skill_number_comparison', 'NUM_COMPARE', 'Сандарды салыстыру', 'Сравнение чисел', 'Логика', 1, 'Sliders', 2),
    ('skill_basic_addition', 'ADD_BASIC', '20 көлеміндегі қосу', 'Сложение в пределах 20', 'Арифметика', 1, 'Plus', 3),
    ('skill_basic_subtraction', 'SUB_BASIC', 'Ондықтан аттамай азайту', 'Вычитание без перехода', 'Арифметика', 1, 'Minus', 4),
    ('skill_borrow_subtraction', 'SUB_BORROW', 'Разрядтан аттап азайту', 'Вычитание с переходом через разряд', 'Арифметика', 2, 'Zap', 5),
    ('skill_word_problems', 'WORD_PROBLEMS', 'Мәтіндік өмірлік есептер', 'Текстовые жизненные задачи', 'Мәтіндік есеп', 2, 'BookOpen', 6)
ON CONFLICT (id) DO NOTHING;
