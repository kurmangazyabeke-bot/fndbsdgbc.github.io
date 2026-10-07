/**
 * MATHQADAM AI - ADAPTIVE ENGINE (AI БЕЙІМДЕУШІ)
 * 14-ҚАДАМ: AI CORE SERVICE АРХИТЕКТУРАСЫ
 * 
 * Функциясы: Тапсырманы оқушының жеке деңгейіне, қателіктер тарихына
 * және меңгеру пайызына байланысты автоматты түрде бейімдеу (4 деңгей).
 */

import { MathProblem, SkillId, ExplanationStyle } from '@/types/mathqadam';

export interface StudentProfileData {
  id: string;
  name?: string;
  grade?: number;
  learningPace?: 'fast' | 'normal' | 'support_needed';
  preferredStyle?: string;
}

export interface AdaptiveThresholdConfig {
  supportMax: number;   // default < 50%
  standardMax: number;  // default 50 - 69%
  contextMax: number;   // default 70 - 84%
  // 85%+ is Challenge
}

export const DEFAULT_ADAPTIVE_CONFIG: AdaptiveThresholdConfig = {
  supportMax: 49,
  standardMax: 69,
  contextMax: 84,
};

export type TaskType =
  | 'SUPPORT_VISUAL'       // 1-деңгей: Визуалды қолдау
  | 'STANDARD_PROCEDURAL'  // 2-деңгей: Стандартты процедуралық
  | 'CONTEXT_STORY'        // 3-деңгей: Өмірлік контекст (Сюжет)
  | 'CHALLENGE_COMPLEX';   // 4-деңгей: Күрделі логикалық есеп

export interface AdaptiveEngineInput {
  studentProfile: StudentProfileData;
  skillMastery: number | Record<string, number>;
  mistakeHistory: string[];
  currentSkill?: SkillId | string;
  config?: AdaptiveThresholdConfig;
}

export interface AdaptiveEngineOutput {
  nextDifficulty: number; // 1.0 - 4.0
  difficulty: number;     // compatibility alias
  taskType: TaskType;
  supportLevel: 'high' | 'medium' | 'low' | 'none';
  nextSkill: string;
  
  // Rich extension properties for UI compatibility
  nextLevel: 1 | 2 | 3 | 4;
  explanationMode: ExplanationStyle;
  reinforcementRequired: boolean;
  levelTitleKaz: string;
  levelDescriptionKaz: string;
  sampleTaskKaz: MathProblem;
}

/**
 * AI Adaptive Core Function
 * Decoupled from UI components
 */
export function adaptiveEngine(input: AdaptiveEngineInput): AdaptiveEngineOutput {
  const config = input.config || DEFAULT_ADAPTIVE_CONFIG;
  
  // Determine average mastery
  let mastery = 50;
  if (typeof input.skillMastery === 'number') {
    mastery = input.skillMastery;
  } else if (typeof input.skillMastery === 'object' && input.skillMastery !== null) {
    const scores = Object.values(input.skillMastery);
    if (scores.length > 0) {
      mastery = scores.reduce((a, b) => a + b, 0) / scores.length;
    }
  }

  let nextLevel: 1 | 2 | 3 | 4 = 1;
  let taskType: TaskType = 'SUPPORT_VISUAL';
  let supportLevel: 'high' | 'medium' | 'low' | 'none' = 'high';
  let explanationMode: ExplanationStyle = 'VISUAL';
  let levelTitleKaz = '';
  let levelDescriptionKaz = '';
  let nextSkill = input.currentSkill || 'skill_carry_addition';

  // Configurable threshold matching logic
  if (mastery <= config.supportMax) {
    nextLevel = 1;
    taskType = 'SUPPORT_VISUAL';
    supportLevel = 'high';
    explanationMode = 'VISUAL';
    levelTitleKaz = '1-деңгей — Қолдау';
    levelDescriptionKaz = 'Оқушыға визуалды разрядтық ыдырату моделі (20+10, 3+4) мен қадамдық қолдау беріледі.';
    nextSkill = 'skill_number_composition';
  } else if (mastery <= config.standardMax) {
    nextLevel = 2;
    taskType = 'STANDARD_PROCEDURAL';
    supportLevel = 'medium';
    explanationMode = 'STEP_BY_STEP';
    levelTitleKaz = '2-деңгей — Стандарт';
    levelDescriptionKaz = 'Базалық сан өрнектерін (47 + 28) бағандап және алгоритммен орындау.';
    nextSkill = 'skill_basic_addition';
  } else if (mastery <= config.contextMax) {
    nextLevel = 3;
    taskType = 'CONTEXT_STORY';
    supportLevel = 'low';
    explanationMode = 'STORY';
    levelTitleKaz = '3-деңгей — Контекст';
    levelDescriptionKaz = 'Математиканы өмірлік сюжеттік мәтіндік есеп (Бекарыста 47 теңге болды...) арқылы қолдану.';
    nextSkill = 'skill_word_problems';
  } else {
    nextLevel = 4;
    taskType = 'CHALLENGE_COMPLEX';
    supportLevel = 'none';
    explanationMode = 'SOCRATIC';
    levelTitleKaz = '4-деңгей — Күрделі';
    levelDescriptionKaz = 'Жанама мәтіндік және кері амалдарды талап етеді (Бекарыста 75 теңгеден 47 қалды...).';
    nextSkill = 'skill_word_problems';
  }

  const reinforcementRequired = input.mistakeHistory.length > 1 || mastery < 50;
  const sampleTaskKaz = getTaskForLevel(nextLevel);

  return {
    nextDifficulty: Number(nextLevel.toFixed(1)),
    difficulty: Number(nextLevel.toFixed(1)),
    taskType,
    supportLevel,
    nextSkill: typeof nextSkill === 'string' ? nextSkill : 'skill_basic_addition',
    nextLevel,
    explanationMode,
    reinforcementRequired,
    levelTitleKaz,
    levelDescriptionKaz,
    sampleTaskKaz
  };
}

export function getTaskForLevel(level: 1 | 2 | 3 | 4): MathProblem {
  switch (level) {
    case 1:
      return {
        id: 'adapt-lvl-1',
        skillId: 'skill_basic_addition',
        topicKaz: 'Екі таңбалы сандарды қосу (1-деңгей: Қолдау)',
        grade: 2,
        difficulty: 1.0,
        questionKaz: '23 + 14 = ?',
        correctAnswer: '37',
        options: ['37', '27', '47', '36'],
        visualDecomposition: {
          tensBreakdownKaz: '20 + 10 = 30',
          onesBreakdownKaz: '3 + 4 = 7',
          sumResultKaz: '30 + 7 = 37',
        },
        explanations: {
          VISUAL: {
            style: 'VISUAL',
            titleKaz: 'Визуалды разрядтық модель',
            iconName: 'Boxes',
            contentKaz: 'Ондықтар: 20 + 10 = 30. Бірліктер: 3 + 4 = 7. Барлығы: 30 + 7 = 37.',
            steps: []
          }
        }
      };

    case 2:
      return {
        id: 'adapt-lvl-2',
        skillId: 'skill_basic_addition',
        topicKaz: 'Екі таңбалы сандарды қосу (2-деңгей: Стандарт)',
        grade: 2,
        difficulty: 2.0,
        questionKaz: '47 + 28 = ?',
        correctAnswer: '75',
        options: ['75', '65', '74', '68'],
        explanations: {
          STEP_BY_STEP: {
            style: 'STEP_BY_STEP',
            titleKaz: 'Стандартты бағандап қосу',
            iconName: 'ListOrdered',
            contentKaz: '7 + 8 = 15 (5 бірлік жазылады, 1 ондық ойда). 4 + 2 + 1 = 7 ондық. Нәтиже: 75.',
            steps: []
          }
        }
      };

    case 3:
      return {
        id: 'adapt-lvl-3',
        skillId: 'skill_word_problems',
        topicKaz: 'Екі таңбалы сандарды қосу (3-деңгей: Контекст)',
        grade: 4,
        difficulty: 3.0,
        questionKaz: '«Бекарыста 47 теңге болды. Анасы оған 28 теңге берді. Бекарыста барлығы қанша теңге болды?»',
        correctAnswer: '75',
        options: ['75 теңге', '65 теңге', '74 теңге', '70 теңге'],
        explanations: {
          STORY: {
            style: 'STORY',
            titleKaz: 'Өмірлік контекст түсіндірмесі',
            iconName: 'BookOpen',
            contentKaz: 'Барлық ақша = бастапқы ақша + анасы берген ақша = 47 + 28 = 75 теңге.',
            steps: []
          }
        }
      };

    case 4:
      return {
        id: 'adapt-lvl-4',
        skillId: 'skill_word_problems',
        topicKaz: 'Екі таңбалы сандарды қосу (4-деңгей: Күрделі / Жанама)',
        grade: 4,
        difficulty: 4.0,
        questionKaz: '«Бекарыста 75 теңге болды. Оның бір бөлігін жұмсағаннан кейін 47 теңге қалды. Ол қанша теңге жұмсады?»',
        correctAnswer: '28',
        options: ['28 теңге', '38 теңге', '22 теңге', '18 теңге'],
        explanations: {
          SOCRATIC: {
            style: 'SOCRATIC',
            titleKaz: 'Кері логикалық ізденіс',
            iconName: 'HelpCircle',
            contentKaz: 'Жұмсалған ақша = Барлық ақша – Қалған ақша = 75 – 47 = 28 теңге.',
            steps: []
          }
        }
      };
  }
}

/**
 * AdaptiveEngine Class for backward compatibility
 */
export class AdaptiveEngine {
  static evaluateAdaptation(input: any): AdaptiveEngineOutput {
    if ('studentProfile' in input) {
      return adaptiveEngine(input as AdaptiveEngineInput);
    }
    // Backward compatibility with previous input signature
    return adaptiveEngine({
      studentProfile: { id: input.studentId || 'st-default' },
      skillMastery: input.currentMastery ?? 50,
      mistakeHistory: input.recentErrors || [],
      currentSkill: input.skillId,
      config: input.config
    });
  }

  static getTaskForLevel(level: 1 | 2 | 3 | 4): MathProblem {
    return getTaskForLevel(level);
  }
}
