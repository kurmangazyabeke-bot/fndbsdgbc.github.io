/**
 * MATHQADAM AI - SUPABASE DATABASE TYPES
 * 15-ҚАДАМ: ДЕРЕКТЕР ҚОРЫ ТИПТЕРІ
 * 
 * 21 Database Tables TypeScript Schema Definitions
 */

export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';
export type UserStatus = 'active' | 'pending' | 'suspended';
export type PreferredLanguage = 'kk' | 'ru' | 'en';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type ClassMemberStatus = 'active' | 'archived' | 'transferred';
export type TaskTypeDB =
  | 'multiple choice'
  | 'number input'
  | 'short answer'
  | 'drag and drop'
  | 'matching'
  | 'visual task'
  | 'word problem';
export type ExplanationStyleDB = 'VISUAL' | 'NUMBER_LINE' | 'STEP_BY_STEP' | 'STORY' | 'SOCRATIC';
export type SessionStatus = 'in_progress' | 'completed' | 'cancelled';
export type SeverityLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type MasteryStatusDB = 'NEEDS_SUPPORT' | 'DEVELOPING' | 'MASTERED' | 'ADVANCED';
export type RouteStatus = 'active' | 'completed' | 'paused';
export type RouteStepStatus = 'locked' | 'active' | 'completed';

// 1. Users
export interface DbUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

// 2. Profiles
export interface DbProfile {
  id: string; // references users.id
  full_name: string;
  avatar_url?: string;
  preferred_language: PreferredLanguage;
  phone?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// 3. Teachers
export interface DbTeacher {
  id: string; // references profiles.id
  school_name: string;
  subject: string;
  experience_years: number;
  bio?: string;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
}

// 4. Students
export interface DbStudent {
  id: string; // references profiles.id
  grade_level: number;
  student_code: string;
  pin_code: string;
  current_level: number;
  total_xp: number;
  daily_streak: number;
  baseline_score: number;
  current_score: number;
  created_at: string;
  updated_at: string;
}

// 5. Classes
export interface DbClass {
  id: string;
  teacher_id: string;
  name: string;
  grade_level: number;
  invite_code: string;
  academic_year: string;
  created_at: string;
  updated_at: string;
}

// 6. Class Members
export interface DbClassMember {
  id: string;
  class_id: string;
  student_id: string;
  status: ClassMemberStatus;
  joined_at: string;
}

// 7. Skills
export interface DbSkill {
  id: string;
  code: string;
  name_kaz: string;
  name_ru?: string;
  category: string;
  grade_level: number;
  icon_name?: string;
  order_index: number;
  created_at: string;
}

// 8. Topics
export interface DbTopic {
  id: string;
  skill_id: string;
  name_kaz: string;
  name_ru?: string;
  grade_level: number;
  description_kaz?: string;
  order_index: number;
  created_at: string;
}

// 9. Tasks
export interface DbTask {
  id: string;
  topic_id?: string;
  skill_id: string;
  grade_level: number;
  difficulty: number;
  task_type: TaskTypeDB;
  question_kaz: string;
  correct_answer: string;
  options: string[];
  target_misconception?: string;
  visual_decomposition?: {
    tensBreakdownKaz: string;
    onesBreakdownKaz: string;
    sumResultKaz: string;
  };
  metadata?: Record<string, any>;
  created_at: string;
}

// 10. Task Attempts
export interface DbTaskAttempt {
  id: string;
  task_id: string;
  student_id: string;
  student_answer?: string;
  is_correct: boolean;
  mistake_type?: string;
  time_spent_sec: number;
  explanation_mode_used?: string;
  created_at: string;
}

// 11. Diagnostic Sessions
export interface DbDiagnosticSession {
  id: string;
  student_id: string;
  status: SessionStatus;
  total_questions: number;
  correct_count: number;
  score_percentage: number;
  primary_misconception?: string;
  confidence_score: number;
  started_at: string;
  completed_at: string;
}

// 12. Diagnostic Results
export interface DbDiagnosticResult {
  id: string;
  session_id: string;
  student_id: string;
  skill_id: string;
  is_gap_detected: boolean;
  recurrence_rate: number;
  confidence_score: number;
  recommended_route?: string;
  created_at: string;
}

// 13. Mistakes (Exact schema requested)
export interface DbMistake {
  id: string;
  student_id: string;
  task_id?: string;
  skill_id: string;
  mistake_type: string;
  mistake_pattern?: string;
  severity: SeverityLevel;
  created_at: string;
}

// 14. Student Skill Mastery (Exact schema requested)
export interface DbStudentSkillMastery {
  id: string;
  student_id: string;
  skill_id: string;
  mastery_score: number;
  previous_score: number;
  status: MasteryStatusDB;
  last_assessed_at: string;
  updated_at: string;
}

// 15. Adaptive Tasks
export interface DbAdaptiveTask {
  id: string;
  student_id: string;
  skill_id: string;
  current_level: number;
  target_difficulty: number;
  support_level: 'high' | 'medium' | 'low' | 'none';
  task_id?: string;
  assigned_at: string;
}

// 16. Explanations
export interface DbExplanation {
  id: string;
  task_id: string;
  style_type: ExplanationStyleDB;
  title_kaz: string;
  content_kaz: string;
  steps_kaz: string[];
  visual_data?: Record<string, any>;
  socratic_prompts?: string[];
  created_at: string;
}

// 17. Training Routes (Exact schema requested)
export interface DbTrainingRoute {
  id: string;
  student_id: string;
  skill_id: string;
  route_name: string;
  status: RouteStatus;
  created_at: string;
}

// 18. Training Route Steps
export interface DbTrainingRouteStep {
  id: string;
  route_id: string;
  step_number: number;
  title_kaz: string;
  description_kaz?: string;
  status: RouteStepStatus;
  mastery_score: number;
  min_mastery_to_unlock: number;
  drills_payload: any[];
  created_at: string;
  updated_at: string;
}

// 19. Analytics Snapshots
export interface DbAnalyticsSnapshot {
  id: string;
  student_id: string;
  baseline_mastery: number;
  current_mastery: number;
  growth_diff: number;
  skills_improved: string[];
  skills_stalled: string[];
  persistent_errors: string[];
  pedagogical_conclusion?: string;
  recommendations: string[];
  snapshot_date: string;
  created_at: string;
}

// 20. Student Progress
export interface DbStudentProgress {
  id: string;
  student_id: string;
  xp_earned: number;
  daily_streak: number;
  level: number;
  daily_target_completed: boolean;
  activity_date: string;
  created_at: string;
}

// 21. Achievements
export interface DbAchievement {
  id: string;
  student_id: string;
  badge_code: string;
  badge_name_kaz: string;
  icon_name: string;
  unlocked_at: string;
}

/**
 * Complete Database Map
 */
export interface Database {
  public: {
    Tables: {
      users: { Row: DbUser; Insert: Partial<DbUser>; Update: Partial<DbUser> };
      profiles: { Row: DbProfile; Insert: Partial<DbProfile>; Update: Partial<DbProfile> };
      teachers: { Row: DbTeacher; Insert: Partial<DbTeacher>; Update: Partial<DbTeacher> };
      students: { Row: DbStudent; Insert: Partial<DbStudent>; Update: Partial<DbStudent> };
      classes: { Row: DbClass; Insert: Partial<DbClass>; Update: Partial<DbClass> };
      class_members: { Row: DbClassMember; Insert: Partial<DbClassMember>; Update: Partial<DbClassMember> };
      skills: { Row: DbSkill; Insert: Partial<DbSkill>; Update: Partial<DbSkill> };
      topics: { Row: DbTopic; Insert: Partial<DbTopic>; Update: Partial<DbTopic> };
      tasks: { Row: DbTask; Insert: Partial<DbTask>; Update: Partial<DbTask> };
      task_attempts: { Row: DbTaskAttempt; Insert: Partial<DbTaskAttempt>; Update: Partial<DbTaskAttempt> };
      diagnostic_sessions: { Row: DbDiagnosticSession; Insert: Partial<DbDiagnosticSession>; Update: Partial<DbDiagnosticSession> };
      diagnostic_results: { Row: DbDiagnosticResult; Insert: Partial<DbDiagnosticResult>; Update: Partial<DbDiagnosticResult> };
      mistakes: { Row: DbMistake; Insert: Partial<DbMistake>; Update: Partial<DbMistake> };
      student_skill_mastery: { Row: DbStudentSkillMastery; Insert: Partial<DbStudentSkillMastery>; Update: Partial<DbStudentSkillMastery> };
      adaptive_tasks: { Row: DbAdaptiveTask; Insert: Partial<DbAdaptiveTask>; Update: Partial<DbAdaptiveTask> };
      explanations: { Row: DbExplanation; Insert: Partial<DbExplanation>; Update: Partial<DbExplanation> };
      training_routes: { Row: DbTrainingRoute; Insert: Partial<DbTrainingRoute>; Update: Partial<DbTrainingRoute> };
      training_route_steps: { Row: DbTrainingRouteStep; Insert: Partial<DbTrainingRouteStep>; Update: Partial<DbTrainingRouteStep> };
      analytics_snapshots: { Row: DbAnalyticsSnapshot; Insert: Partial<DbAnalyticsSnapshot>; Update: Partial<DbAnalyticsSnapshot> };
      student_progress: { Row: DbStudentProgress; Insert: Partial<DbStudentProgress>; Update: Partial<DbStudentProgress> };
      achievements: { Row: DbAchievement; Insert: Partial<DbAchievement>; Update: Partial<DbAchievement> };
    };
  };
}
