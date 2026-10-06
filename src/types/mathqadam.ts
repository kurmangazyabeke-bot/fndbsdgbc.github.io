export type GradeLevel = 1 | 2 | 3 | 4;

export type MisconceptionCategory =
  | 'CARRIED_OVER_FORGOTTEN'     // Ойдағы санды қосуды ұмыту
  | 'PLACE_VALUE_CONFUSION'       // Разрядтық құрамды шатастыру (ондық/бірлік)
  | 'ZERO_PROPERTY_MISUNDERSTOOD' // Нөлге көбейту/қосу қателігі
  | 'BORROWING_STAGE_FAILED'      // Разрядтан аттап азайтуда ондықтан ауысу қатесі
  | 'VISUAL_FRACTION_MISMATCH'    // Бөлшекті визуалды қабылдау алшақтығы
  | 'OPERATIONAL_ORDER_FLAW'     // Амалдардың орындалу ретін бұзу
  | 'TEXT_PROBLEM_DECODING_FAIL'; // Мәтіндік есептің шартын түсінбеу

export type SkillId =
  | 'skill_number_composition'    // Сан құрамы
  | 'skill_number_comparison'     // Салыстыру
  | 'skill_basic_addition'        // Қосу
  | 'skill_basic_subtraction'     // Азайту
  | 'skill_borrow_subtraction'    // Разрядтан аттап азайту
  | 'skill_word_problems';        // Мәтіндік есеп

export type SkillStatus =
  | 'ADVANCED'     // Жоғары деңгей (85-100%)
  | 'MASTERED'     // Қалыптасқан (70-84%)
  | 'DEVELOPING'   // Дамып келеді (50-69%)
  | 'NEEDS_SUPPORT';// Қолдау қажет (0-49%)

export interface SkillMasteryItem {
  skillId: SkillId;
  nameKaz: string;
  score: number;
  status: SkillStatus;
  statusTextKaz: string;
}

export type RoadmapStageStatus = 'locked' | 'active' | 'completed';

export interface RoadmapStage {
  id: string;
  stageNumber: number; // 1 to 6
  titleKaz: string;
  descriptionKaz: string;
  status: RoadmapStageStatus;
  masteryScore: number; // 0 to 100%
  minMasteryToUnlock: number; // default 85%
  drills: MathProblem[];
}

export interface MathGap {
  id: string;
  topicId?: string;
  topicNameKaz?: string;
  skillId?: SkillId | string;
  misconception: MisconceptionCategory;
  descriptionKaz?: string;
  severity?: 'HIGH' | 'MEDIUM' | 'LOW';
  detectedAt: string;
  remediationStatus?: 'UNRESOLVED' | 'IN_PROGRESS' | 'MASTERED';
  confidenceScore?: number;
  drillRecommended?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: GradeLevel;
  avatarUrl?: string;
  overallMastery: number;
  baselineScore: number;
  currentScore: number;
  activeGaps: MathGap[];
  strengths: string[];
  skillProfile?: SkillMasteryItem[];
}

export type ExplanationStyle = 
  | 'VISUAL'      // Визуалды / Көрсетіп түсіндір (заттарды алып тастау)
  | 'NUMBER_LINE' // Сан сәулесімен (артқа 5 қадам)
  | 'STEP_BY_STEP'// Қадам бойынша / Разрядтық тәсіл
  | 'STORY'       // Өмірлік мысал (Кәмпиттер)
  | 'SOCRATIC';   // Сократтық жетелеу

export interface ExplanationOption {
  style: ExplanationStyle;
  titleKaz: string;
  iconName: string;
  contentKaz: string;
  visualData?: {
    type: 'BLOCKS' | 'NUMBER_LINE' | 'GRID' | 'OBJECT_REMOVAL';
    items?: number[];
    total?: number;
    highlight?: number[];
    startNumber?: number;
    stepsBack?: number;
    resultNumber?: number;
    itemsTotal?: number;
    itemsRemoved?: number;
  };
  steps?: string[];
  socraticQuestions?: string[];
}

export interface MathProblem {
  id: string;
  skillId: SkillId;
  topicKaz: string;
  grade: GradeLevel;
  difficulty: number;
  questionKaz: string;
  correctAnswer: string | number;
  options?: string[];
  targetMisconception?: MisconceptionCategory;
  visualDecomposition?: {
    tensBreakdownKaz: string;
    onesBreakdownKaz: string;
    sumResultKaz: string;
  };
  explanations: Partial<Record<ExplanationStyle, ExplanationOption>>;
}

export interface AdaptiveState {
  currentDifficulty: number; // 1.0 - 5.0
  streakCount: number;
  consecutiveErrors: number;
  timePerProblemSec: number[];
  recommendedZone: 'SUPPORT_NEEDED' | 'OPTIMAL_ZPD' | 'CHALLENGE_READY';
}

export interface TeacherAnalyticsReport {
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  baselineScore: number;
  currentScore: number;
  growthPercentage: number;
  masteryMap: {
    additionSubtraction: number;
    multiplicationDivision: number;
    fractionsGeometry: number;
    wordProblems: number;
  };
  topGaps: MathGap[];
  pedagogicalRecommendationKaz: string;
}
