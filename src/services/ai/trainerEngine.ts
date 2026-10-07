/**
 * MATHQADAM AI - TRAINER ENGINE (AI ТРЕНАЖЕР)
 * 14-ҚАДАМ: AI CORE SERVICE АРХИТЕКТУРАСЫ
 * 
 * Функциясы: Оқушының қателіктерінен жеке даму маршрутын (Roadmap) құру
 * және кезеңдік меңгеруге (Mastery) қарай жаттығуларды тағайындау.
 */

import { MathProblem, RoadmapStage, RoadmapStageStatus } from '@/types/mathqadam';

export interface TrainerEngineInput {
  mistakePatterns: string[];
  weakSkills: string[];
  mastery: number; // 0 to 100
  currentStageId?: string;
}

export interface TrainerEngineOutput {
  personalRoute: RoadmapStage[];
  nextExercises: MathProblem[];
  requiredMastery: number; // e.g. 85% to unlock next stage
  statusBracket: 'RETRY_EXTRA' | 'MIXED_PRACTICE' | 'PREP_NEXT' | 'UNLOCKED_NEXT';
  feedbackKaz: string;
  canAdvance: boolean;
}

export interface TrainerMasteryEvaluation {
  masteryScore: number;
  bracket: 'RETRY_EXTRA' | 'MIXED_PRACTICE' | 'PREP_NEXT' | 'UNLOCKED_NEXT';
  feedbackKaz: string;
  canAdvance: boolean;
}

/**
 * AI Trainer Core Function
 * Decoupled from UI components
 */
export function trainerEngine(input: TrainerEngineInput): TrainerEngineOutput {
  const roadmap = getInitial6StageRoadmap();
  const mastery = input.mastery;
  const requiredMastery = 85;

  let statusBracket: 'RETRY_EXTRA' | 'MIXED_PRACTICE' | 'PREP_NEXT' | 'UNLOCKED_NEXT' = 'RETRY_EXTRA';
  let feedbackKaz = '';
  let canAdvance = false;

  if (mastery < 50) {
    statusBracket = 'RETRY_EXTRA';
    feedbackKaz = 'Қосымша қарапайым жаттығулар тағайындалды. Негізгі ұғымдарды визуалды модельмен қайталаңыз.';
    canAdvance = false;
  } else if (mastery < 70) {
    statusBracket = 'MIXED_PRACTICE';
    feedbackKaz = 'Аралас жаттығулар ұсынылады. Бірнеше типтік есептерді шығарып, сенімділікті арттырыңыз.';
    canAdvance = false;
  } else if (mastery < 85) {
    statusBracket = 'PREP_NEXT';
    feedbackKaz = 'Келесі деңгейге өтуге жақынсыз! Қорытынды бақылаудан 85%+ жинаңыз.';
    canAdvance = false;
  } else {
    statusBracket = 'UNLOCKED_NEXT';
    feedbackKaz = 'Керемет! 85%+ меңгеру нәтижесімен келесі күрделі кезең ашылды.';
    canAdvance = true;
  }

  // Determine next exercises from active stage drills
  const activeStage = roadmap.find(s => s.status === 'active') || roadmap[2];
  const nextExercises = activeStage.drills || [];

  return {
    personalRoute: roadmap,
    nextExercises,
    requiredMastery,
    statusBracket,
    feedbackKaz,
    canAdvance
  };
}

/**
 * 6-кезеңді жеке маршрут үлгісі
 */
export function getInitial6StageRoadmap(): RoadmapStage[] {
  return [
    {
      id: 'stage-1',
      stageNumber: 1,
      titleKaz: '1. Сан құрамы',
      descriptionKaz: 'Ондықтар мен бірліктердің құрамын жіктеу (Мысалы: 28 = 20 + 8)',
      status: 'completed',
      masteryScore: 92,
      minMasteryToUnlock: 85,
      drills: [
        {
          id: 'd1-1',
          skillId: 'skill_number_composition',
          topicKaz: 'Сан құрамы',
          grade: 2,
          difficulty: 1.0,
          questionKaz: '35 саны неше ондық және неше бірліктен тұрады?',
          correctAnswer: '3 ондық 5 бірлік',
          options: ['3 ондық 5 бірлік', '5 ондық 3 бірлік', '35 бірлік 0 ондық', '30 ондық 5 бірлік'],
          explanations: {}
        }
      ]
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      titleKaz: '2. Ондықты толықтыру',
      descriptionKaz: 'Бірліктерді 10-ға дейін дөңгелектеу (Мысалы: 8 + 2 = 10, 7 + 3 = 10)',
      status: 'completed',
      masteryScore: 88,
      minMasteryToUnlock: 85,
      drills: [
        {
          id: 'd2-1',
          skillId: 'skill_basic_addition',
          topicKaz: 'Ондықты толықтыру',
          grade: 2,
          difficulty: 1.5,
          questionKaz: '8 санын 10-ға жеткізу үшін қанша қосу керек?',
          correctAnswer: '2',
          options: ['2', '3', '1', '4'],
          explanations: {}
        }
      ]
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      titleKaz: '3. Модельмен қосу',
      descriptionKaz: 'Визуалды текшелер мен блоктар арқылы 1 ондықтың ауысуын көру',
      status: 'active',
      masteryScore: 45, // <50%: Requires reinforcement!
      minMasteryToUnlock: 85,
      drills: [
        {
          id: 'd3-1',
          skillId: 'skill_basic_addition',
          topicKaz: 'Модельмен қосу (28 + 15)',
          grade: 2,
          difficulty: 2.0,
          questionKaz: '28 + 15 өрнегіндегі бірліктерді (8 + 5 = 13) қосқанда неше жаңа ондық пайда болады?',
          correctAnswer: '1 ондық',
          options: ['1 ондық', '2 ондық', '0 ондық', '3 ондық'],
          explanations: {}
        },
        {
          id: 'd3-2',
          skillId: 'skill_basic_addition',
          topicKaz: 'Модельмен қосу (37 + 14)',
          grade: 2,
          difficulty: 2.2,
          questionKaz: '37 + 14 = (30 + 10) + (7 + 4) = 40 + 11 = ?',
          correctAnswer: '51',
          options: ['41', '51', '52', '49'],
          explanations: {}
        }
      ]
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      titleKaz: '4. Санмен орындау',
      descriptionKaz: 'Бағандап және ойда 1-ді сақтап бағанмен жазу алгоритмі (Мысалы: 47 + 28)',
      status: 'locked',
      masteryScore: 0,
      minMasteryToUnlock: 85,
      drills: [
        {
          id: 'd4-1',
          skillId: 'skill_basic_addition',
          topicKaz: 'Санмен орындау',
          grade: 2,
          difficulty: 2.5,
          questionKaz: '47 + 28 = ?',
          correctAnswer: '75',
          options: ['75', '65', '74', '68'],
          explanations: {}
        }
      ]
    },
    {
      id: 'stage-5',
      stageNumber: 5,
      titleKaz: '5. Мәтіндік есеп',
      descriptionKaz: 'Қосу амалын мәтіндік есептер шартынан тану және өрнек құру',
      status: 'locked',
      masteryScore: 0,
      minMasteryToUnlock: 85,
      drills: [
        {
          id: 'd5-1',
          skillId: 'skill_word_problems',
          topicKaz: 'Мәтіндік есеп',
          grade: 4,
          difficulty: 3.0,
          questionKaz: 'Бекарыста 28 кітап бар еді. Оған тағы 15 кітап сыйлады. Барлығы неше кітап болды?',
          correctAnswer: '43',
          options: ['43', '33', '42', '53'],
          explanations: {}
        }
      ]
    },
    {
      id: 'stage-6',
      stageNumber: 6,
      titleKaz: '6. Өмірлік тапсырма',
      descriptionKaz: 'Дүкенде сауда жасау, саяхат немесе күнделікті өмірлік жағдаяттарда қолдану',
      status: 'locked',
      masteryScore: 0,
      minMasteryToUnlock: 85,
      drills: [
        {
          id: 'd6-1',
          skillId: 'skill_word_problems',
          topicKaz: 'Өмірлік тапсырма',
          grade: 2,
          difficulty: 3.5,
          questionKaz: 'Дүкенде балмұздақ 45 теңге, ал шырын 38 теңге тұрады. Екеуін сатып алу үшін неше теңге төлейсің?',
          correctAnswer: '83 теңге',
          options: ['83 теңге', '73 теңге', '85 теңге', '78 теңге'],
          explanations: {}
        }
      ]
    }
  ];
}

/**
 * AITrainerEngineService for backward compatibility
 */
export class AITrainerEngineService {
  static getInitial6StageRoadmap(): RoadmapStage[] {
    return getInitial6StageRoadmap();
  }

  static evaluateMasteryScore(score: number): TrainerMasteryEvaluation {
    if (score < 50) {
      return {
        masteryScore: score,
        bracket: 'RETRY_EXTRA',
        feedbackKaz: 'Mastery < 50%: Сол деңгейде қосымша қарапайым жаттығулар беріледі.',
        canAdvance: false
      };
    }
    if (score < 70) {
      return {
        masteryScore: score,
        bracket: 'MIXED_PRACTICE',
        feedbackKaz: 'Mastery 50–69%: Аралас жаттығулар ұсынылады.',
        canAdvance: false
      };
    }
    if (score < 85) {
      return {
        masteryScore: score,
        bracket: 'PREP_NEXT',
        feedbackKaz: 'Mastery 70–84%: Келесі деңгейге дайындық жаттығулары.',
        canAdvance: false
      };
    }
    return {
      masteryScore: score,
      bracket: 'UNLOCKED_NEXT',
      feedbackKaz: 'Mastery 85%+: Келесі күрделі кезең толық ашылды (Unlocked)!',
      canAdvance: true
    };
  }
}
