/**
 * MATHQADAM AI - UNIFIED AI DATA PIPELINE ORCHESTRATOR
 * 26-ҚАДАМ: 5 AI ФУНКЦИЯНЫ БІР ДЕМО СЦЕНАРИЙГЕ БАЙЛАУ
 * 
 * Data Flow Architecture:
 * STUDENT ANSWER
 *      ↓
 * AI DIAGNOST
 *      ↓
 * SKILL PROFILE
 *      ↓
 * AI ADAPTIVE
 *      ↓
 * CUSTOM TASK
 *      ↓
 * AI EXPLAIN
 *      ↓
 * AI TRAINER
 *      ↓
 * PERSONAL ROUTE
 *      ↓
 * NEW ATTEMPTS
 *      ↓
 * AI ANALYTICS
 *      ↓
 * PEDAGOGICAL RECOMMENDATION
 */

import {
  diagnosticEngine,
  DiagnosticEngineInput,
  DiagnosticEvaluationResult as DiagnosticEngineOutput,
} from './diagnosticEngine';
import {
  adaptiveEngine,
  AdaptiveEngineInput,
  AdaptiveEngineOutput,
} from './adaptiveEngine';
import {
  explanationEngine,
  ExplanationEngineInput,
  ExplanationEngineOutput,
} from './explanationEngine';
import {
  trainerEngine,
  TrainerEngineInput,
  TrainerEngineOutput,
} from './trainerEngine';
import {
  analyticsEngine,
  AnalyticsEngineInput,
  AnalyticsEngineOutput,
} from './analyticsEngine';

import { MathProblem, MathGap, SkillId } from '@/types/mathqadam';

export interface StudentAnswerSignal {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  skillId: SkillId | string;
  topicNameKaz: string;
  timestamp: string;
}

export interface SkillProfileState {
  studentId: string;
  studentName: string;
  classGrade: string;
  overallMastery: number;
  baselineMastery: number;
  skillScores: Record<string, number>;
  activeGaps: MathGap[];
  mistakeHistory: string[];
  totalXp: number;
  streakDays: number;
}

export interface PracticeAttemptRecord {
  id: string;
  stepIndex: number;
  taskTitle: string;
  formula: string;
  studentInput: string;
  expectedInput: string;
  isCorrect: boolean;
  xpEarned: number;
  timestamp: string;
}

export interface UnifiedPipelineSnapshot {
  // 1. Student Answer
  studentAnswer: StudentAnswerSignal;

  // 2. AI Diagnost
  diagnosticResult: DiagnosticEngineOutput;

  // 3. Skill Profile
  skillProfile: SkillProfileState;

  // 4. AI Adaptive
  adaptiveResult: AdaptiveEngineOutput;

  // 5. Custom Task (Scaffolded Task)
  customTask: MathProblem;

  // 6. AI Explain
  explanationResult: ExplanationEngineOutput;

  // 7. AI Trainer
  trainerResult: TrainerEngineOutput;

  // 8. Personal Route
  personalRoute: TrainerEngineOutput['personalRoute'];

  // 9. New Attempts
  attemptsHistory: PracticeAttemptRecord[];

  // 10. AI Analytics
  analyticsResult: AnalyticsEngineOutput;

  // 11. Pedagogical Recommendation
  pedagogicalRecommendation: {
    conclusion: string;
    recommendations: string[];
    teacherActionPlan: string[];
    parentSummaryKaz: string;
  };

  // Pipeline Status Meta
  pipelineStage:
    | 'STUDENT_ANSWER'
    | 'AI_DIAGNOST'
    | 'SKILL_PROFILE'
    | 'AI_ADAPTIVE'
    | 'CUSTOM_TASK'
    | 'AI_EXPLAIN'
    | 'AI_TRAINER'
    | 'PERSONAL_ROUTE'
    | 'NEW_ATTEMPTS'
    | 'AI_ANALYTICS'
    | 'PEDAGOGICAL_RECOMMENDATION'
    | 'COMPLETED';
  lastUpdatedAt: string;
}

export class AIPipelineOrchestrator {
  private static instance: AIPipelineOrchestrator;
  private currentSnapshot: UnifiedPipelineSnapshot;

  private constructor() {
    this.currentSnapshot = this.generateInitialDemoPipeline('44');
  }

  public static getInstance(): AIPipelineOrchestrator {
    if (!AIPipelineOrchestrator.instance) {
      AIPipelineOrchestrator.instance = new AIPipelineOrchestrator();
    }
    return AIPipelineOrchestrator.instance;
  }

  /**
   * Generates or recalculates the entire end-to-end data pipeline starting from student answer
   */
  public generateInitialDemoPipeline(studentAnswerVal: string = '44'): UnifiedPipelineSnapshot {
    // 1. STUDENT ANSWER
    const studentAnswer: StudentAnswerSignal = {
      question: '52 – 18 = ?',
      studentAnswer: studentAnswerVal,
      correctAnswer: '34',
      skillId: 'subtraction-borrow',
      topicNameKaz: 'Разрядтан аттап азайту (52 - 18)',
      timestamp: new Date().toISOString(),
    };

    // 2. AI DIAGNOST
    const diagnosticInput: DiagnosticEngineInput = {
      question: studentAnswer.question,
      correctAnswer: studentAnswer.correctAnswer,
      studentAnswer: studentAnswer.studentAnswer,
      skill: studentAnswer.skillId,
    };
    const diagnosticResult: DiagnosticEngineOutput = diagnosticEngine(diagnosticInput);

    // 3. SKILL PROFILE
    const isError = !diagnosticResult.isCorrect;
    const borrowScore = isError ? 32 : 85;
    const skillProfile: SkillProfileState = {
      studentId: 'demo-student-aidos',
      studentName: 'Айдос Нұрланұлы',
      classGrade: '4 «А»',
      overallMastery: isError ? 58 : 82,
      baselineMastery: 35,
      skillScores: {
        'place-value': 88,
        'comparison': 90,
        'addition': 78,
        'subtraction-basic': 82,
        'addition-carry': 76,
        'subtraction-borrow': borrowScore,
        'word-problem': 48,
      },
      activeGaps: isError
        ? [
            {
              id: 'gap-borrow-1',
              topicId: 'subtraction-borrow',
              topicNameKaz: 'Разрядтан аттап азайту (Ондықтан қарыз алмау)',
              misconception: 'CARRIED_OVER_FORGOTTEN',
              descriptionKaz: 'Оқушы 2-ден 8 азаймайтынын көріп, көрші ондықтан 1 ондық алудың орнына 8-2=6 деп есептеді.',
              severity: 'HIGH',
              detectedAt: new Date().toISOString(),
              remediationStatus: 'UNRESOLVED',
            },
          ]
        : [],
      mistakeHistory: isError ? ['subtraction_borrow_error'] : [],
      totalXp: 850,
      streakDays: 7,
    };

    // 4. AI ADAPTIVE
    const adaptiveInput: AdaptiveEngineInput = {
      studentProfile: {
        id: skillProfile.studentId,
        name: skillProfile.studentName,
        grade: 4,
        learningPace: 'normal',
      },
      skillMastery: skillProfile.skillScores['subtraction-borrow'] || 32,
      mistakeHistory: skillProfile.mistakeHistory,
      currentSkill: 'subtraction-borrow',
    };
    const adaptiveResult: AdaptiveEngineOutput = adaptiveEngine(adaptiveInput);

    // 5. CUSTOM TASK (Generated scaffolding task based on adaptive output)
    const customTask: MathProblem = {
      id: 'custom-scaffold-task-52-18',
      skillId: 'skill_borrow_subtraction',
      topicKaz: 'Разрядтан аттап азайту (52 - 18)',
      grade: 4,
      difficulty: adaptiveResult.nextDifficulty,
      questionKaz: '52 санын ыдырат: 40 + [ 12 ]. Енді 12-ден 8-ді азайт.',
      correctAnswer: '34',
      options: ['34', '44', '24', '36'],
      targetMisconception: 'BORROWING_STAGE_FAILED',
      visualDecomposition: {
        tensBreakdownKaz: '52 = 40 + 12',
        onesBreakdownKaz: '18 = 10 + 8',
        sumResultKaz: '(40 - 10) + (12 - 8) = 30 + 4 = 34',
      },
      explanations: {
        VISUAL: {
          style: 'VISUAL',
          titleKaz: 'Визуалды Текшелер',
          iconName: 'Boxes',
          contentKaz: '5 ондықтан 1 ондықты 10 бірлікке ұсақтаймыз: 12 - 8 = 4, 40 - 10 = 30 ➔ 34.',
        },
      },
    };

    // 6. AI EXPLAIN
    const explanationInput: ExplanationEngineInput = {
      question: studentAnswer.question,
      studentLevel: adaptiveResult.nextLevel,
      preferredMode: 'VISUAL',
    };
    const explanationResult: ExplanationEngineOutput = explanationEngine(explanationInput);

    // 7. AI TRAINER
    const trainerInput: TrainerEngineInput = {
      mistakePatterns: skillProfile.mistakeHistory,
      weakSkills: ['subtraction-borrow'],
      mastery: skillProfile.skillScores['subtraction-borrow'],
    };
    const trainerResult: TrainerEngineOutput = trainerEngine(trainerInput);

    // 8. PERSONAL ROUTE
    const personalRoute = trainerResult.personalRoute;

    // 9. NEW ATTEMPTS (Default initial attempts before practice)
    const attemptsHistory: PracticeAttemptRecord[] = [
      {
        id: 'attempt-init-1',
        stepIndex: 1,
        taskTitle: '52-ні ондық пен бірлікке жіктеу',
        formula: '52 = 40 + [ 12 ]',
        studentInput: '12',
        expectedInput: '12',
        isCorrect: true,
        xpEarned: 25,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'attempt-init-2',
        stepIndex: 2,
        taskTitle: 'Бірліктерді азайту',
        formula: '12 - 8 = [ 4 ]',
        studentInput: '4',
        expectedInput: '4',
        isCorrect: true,
        xpEarned: 25,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'attempt-init-3',
        stepIndex: 3,
        taskTitle: 'Ондықтарды қосу',
        formula: '(40 - 10) + 4 = 30 + 4 = [ 34 ]',
        studentInput: '34',
        expectedInput: '34',
        isCorrect: true,
        xpEarned: 25,
        timestamp: new Date().toISOString(),
      },
    ];

    // 10. AI ANALYTICS
    const analyticsInput: AnalyticsEngineInput = {
      initialAssessment: {
        'place-value': 70,
        'addition': 65,
        'subtraction-borrow': 32,
        'word-problem': 30,
      },
      currentAssessment: {
        'place-value': 88,
        'addition': 78,
        'subtraction-borrow': 88,
        'word-problem': 60,
      },
      attemptHistory: attemptsHistory.map((a) => ({
        skillId: 'subtraction-borrow',
        isCorrect: a.isCorrect,
        timeSpentSec: 15,
        timestamp: a.timestamp,
      })),
      studentName: skillProfile.studentName,
      grade: 4,
    };
    const analyticsResult: AnalyticsEngineOutput = analyticsEngine(analyticsInput);

    // 11. PEDAGOGICAL RECOMMENDATION
    const pedagogicalRecommendation = {
      conclusion: analyticsResult.pedagogicalConclusion,
      recommendations: analyticsResult.recommendations,
      teacherActionPlan: [
        'Оқушы қарыз алу механизмін толық түсінді, сыныпта визуалды тірексіз жазуға көшуге болады.',
        'Келесі аптада 3 таңбалы сандарды (152 - 78) бағандап азайтуға көшу ұсынылады.',
        'Қатені қайталау ықтималдығы 4%-тен төмендеді.',
      ],
      parentSummaryKaz:
        'Айдос разрядтан аттап азайтуда 1 ондықты 10 бірлікке айналдыру алгоритмін 100% меңгерді. Нәтижесі 32%-тен 88%-ке өсті!',
    };

    return {
      studentAnswer,
      diagnosticResult,
      skillProfile,
      adaptiveResult,
      customTask,
      explanationResult,
      trainerResult,
      personalRoute,
      attemptsHistory,
      analyticsResult,
      pedagogicalRecommendation,
      pipelineStage: 'COMPLETED',
      lastUpdatedAt: new Date().toISOString(),
    };
  }

  /**
   * Process a live student answer through the complete 11-stage pipeline
   */
  public processStudentAnswer(
    answer: string,
    question: string = '52 – 18 = ?',
    correctAnswer: string = '34'
  ): UnifiedPipelineSnapshot {
    this.currentSnapshot = this.generateInitialDemoPipeline(answer);
    return this.currentSnapshot;
  }

  /**
   * Add a new practice attempt and recalculate downstream analytics & recommendations
   */
  public addPracticeAttempt(attempt: Omit<PracticeAttemptRecord, 'id' | 'timestamp'>): UnifiedPipelineSnapshot {
    const newRecord: PracticeAttemptRecord = {
      ...attempt,
      id: `attempt-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    const updatedAttempts = [...this.currentSnapshot.attemptsHistory, newRecord];
    const allCorrect = updatedAttempts.every((a) => a.isCorrect);

    // Update skill mastery dynamically
    const newBorrowScore = allCorrect ? 88 : 65;
    const updatedSkillProfile: SkillProfileState = {
      ...this.currentSnapshot.skillProfile,
      skillScores: {
        ...this.currentSnapshot.skillProfile.skillScores,
        'subtraction-borrow': newBorrowScore,
      },
      overallMastery: allCorrect ? 82 : 70,
      totalXp: this.currentSnapshot.skillProfile.totalXp + (attempt.xpEarned || 25),
    };

    // Recalculate analytics
    const analyticsInput: AnalyticsEngineInput = {
      initialAssessment: { 'subtraction-borrow': 32 },
      currentAssessment: { 'subtraction-borrow': newBorrowScore },
      attemptHistory: updatedAttempts.map((a) => ({
        skillId: 'subtraction-borrow',
        isCorrect: a.isCorrect,
        timeSpentSec: 15,
        timestamp: a.timestamp,
      })),
      studentName: updatedSkillProfile.studentName,
      grade: 4,
    };
    const updatedAnalytics: AnalyticsEngineOutput = analyticsEngine(analyticsInput);

    this.currentSnapshot = {
      ...this.currentSnapshot,
      skillProfile: updatedSkillProfile,
      attemptsHistory: updatedAttempts,
      analyticsResult: updatedAnalytics,
      pedagogicalRecommendation: {
        ...this.currentSnapshot.pedagogicalRecommendation,
        conclusion: updatedAnalytics.pedagogicalConclusion,
        recommendations: updatedAnalytics.recommendations,
      },
      lastUpdatedAt: new Date().toISOString(),
    };

    return this.currentSnapshot;
  }

  public getSnapshot(): UnifiedPipelineSnapshot {
    return this.currentSnapshot;
  }
}

export const aiPipelineOrchestrator = AIPipelineOrchestrator.getInstance();
