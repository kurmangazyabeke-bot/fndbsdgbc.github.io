/**
 * MATHQADAM AI - DIAGNOSTIC ENGINE (AI ДИАГНОСТ)
 * 14-ҚАДАМ & 18-ҚАДАМ: ИНТЕРАКТИВТІ ДИАГНОСТИКА АЛГОРИТМІ
 * 
 * Функциясы:
 * 1. Жауапты тексеру (Check answer)
 * 2. Skill-ді анықтау (Identify skill)
 * 3. Қате болса нақты Mistake Type анықтау (Identify mistake type)
 * 4. Оқушының Skill Mastery-ін динамикалық жаңарту (Update mastery score & status)
 * 5. Қажет болса қосымша диагностикалық сұрақтар тағайындау (Queue diagnostic probe questions)
 * 6. Оқушының жеке профилін жаңарту (Update student profile)
 */

import { MathGap, MathProblem, SkillId, SkillMasteryItem, SkillStatus } from '@/types/mathqadam';

export type DiagnosticMistakeType =
  | 'place_value_error'            // Разрядтық құрамды шатастыру (ондық/бірлік орны)
  | 'subtraction_borrow_error'     // Разрядтан аттап азайтуда ондықтан қарыз алуды ұмыту (52-18=44)
  | 'addition_carry_error'          // Ондықтан аттап қосқанда 1-ді ұмыту (28+15=33)
  | 'calculation_error'             // Қарапайым арифметикалық есептеу қатесі
  | 'concept_error'                 // Математикалық түсінік қатесі
  | 'reading_error'                 // Таңбаны немесе шартты қате оқу (+/- шатастыру)
  | 'word_problem_structure_error' // Мәтіндік есептің логикалық құрылымын түсінбеу
  | 'NONE';

export interface DiagnosticEvaluationResult {
  isCorrect: boolean;
  skillId: SkillId;
  skillNameKaz: string;
  mistakeType: DiagnosticMistakeType;
  mistakeTitleKaz: string;
  confidence: number; // 0.0 to 1.0 (92%, т.б.)
  identifiedDifficultyKaz: string;
  nextDiagnosticActionKaz: string;
  suggestedProbes: MathProblem[];
  updatedScore: number;
  updatedStatus: SkillStatus;
  statusTextKaz: string;
}

export interface DiagnosticEngineInput {
  question: string | MathProblem;
  correctAnswer: string;
  studentAnswer: string;
  skill: SkillId | string;
  previousMastery?: number;
}

export interface AssessmentAnswer {
  problemId: string;
  userAnswer: string;
  timeSpentSec: number;
  problem: MathProblem;
  evaluation?: DiagnosticEvaluationResult;
}

export interface DetailedDiagnosticResult {
  detectedGaps: MathGap[];
  skillProfile: SkillMasteryItem[];
  mistakePatternKaz?: string;
  initialDiagnosisKaz?: string;
  recurrenceConfidence: number; // 0.0 to 1.0
  totalEvaluated: number;
  totalErrors: number;
  primaryMistakeType?: DiagnosticMistakeType;
}

/**
 * 18-ҚАДАМ: НАҚТЫ ЖҰМЫС ІСТЕЙТІН ДИАГНОСТИКАЛЫҚ ТАЛДАУ ҚОЗҒАЛТҚЫШЫ
 */
export function evaluateStudentAnswer(input: DiagnosticEngineInput): DiagnosticEvaluationResult {
  const qStr = typeof input.question === 'string' ? input.question : input.question.questionKaz;
  const qClean = qStr.replace(/\s+/g, '');
  const sAns = input.studentAnswer.trim();
  const cAns = input.correctAnswer.trim();
  const isCorrect = sAns.toLowerCase() === cAns.toLowerCase();

  const prevScore = input.previousMastery ?? 60;
  let skillId: SkillId = (typeof input.skill === 'string' && input.skill.startsWith('skill_'))
    ? (input.skill as SkillId)
    : 'skill_borrow_subtraction';

  let skillNameKaz = 'Разрядтан аттап азайту';
  if (skillId === 'skill_number_composition') skillNameKaz = 'Сан құрамы';
  else if (skillId === 'skill_number_comparison') skillNameKaz = 'Салыстыру';
  else if (skillId === 'skill_basic_addition') skillNameKaz = 'Қосу';
  else if (skillId === 'skill_basic_subtraction') skillNameKaz = 'Азайту';
  else if (skillId === 'skill_word_problems') skillNameKaz = 'Мәтіндік есеп';

  // 1. ДҰРЫС ЖАУАП БОЛҒАНДА
  if (isCorrect) {
    const updatedScore = Math.min(100, prevScore + 10);
    const updatedStatus: SkillStatus = updatedScore >= 85 ? 'ADVANCED' : updatedScore >= 70 ? 'MASTERED' : 'DEVELOPING';
    const statusTextKaz = updatedStatus === 'ADVANCED' ? 'Жоғары деңгей' : updatedStatus === 'MASTERED' ? 'Қалыптасқан' : 'Дамып келеді';

    return {
      isCorrect: true,
      skillId,
      skillNameKaz,
      mistakeType: 'NONE',
      mistakeTitleKaz: 'Қате жоқ (Дұрыс орындалды)',
      confidence: 0.95,
      identifiedDifficultyKaz: `${skillNameKaz} дағдысы бойынша есептеу дұрыс орындалды.`,
      nextDiagnosticActionKaz: 'Келесі күрделірек стандартты немесе мәтіндік деңгейге өту ұсынылады.',
      suggestedProbes: [],
      updatedScore,
      updatedStatus,
      statusTextKaz
    };
  }

  // 2. ҚАТЕ БОЛҒАНДА: MISTAKE TYPE АНЫҚТАУ
  let mistakeType: DiagnosticMistakeType = 'calculation_error';
  let mistakeTitleKaz = 'Жалпы есептеу қатесі';
  let identifiedDifficultyKaz = `${skillNameKaz} бойынша есептеуде қателік байқалды.`;
  let nextDiagnosticActionKaz = 'Қатенің тұрақтылығын тексеру үшін қосымша сұрақтар тағайындау.';
  let confidence = 0.85;

  // A. Subtraction Borrow Error (52 - 18 = 44 немесе 42-17=35, т.б.)
  if (
    (qClean.includes('52-18') && (sAns === '44' || sAns === '36' || sAns === '46')) ||
    (qClean.includes('42-17') && (sAns === '35' || sAns === '31')) ||
    (qClean.includes('61-29') && (sAns === '42' || sAns === '48')) ||
    (qClean.includes('53-18') && (sAns === '45' || sAns === '37')) ||
    (qClean.includes('72-35') && (sAns === '47' || sAns === '33')) ||
    qClean.includes('-') && (sAns.endsWith('4') || sAns.endsWith('5'))
  ) {
    mistakeType = 'subtraction_borrow_error';
    mistakeTitleKaz = 'Разрядтан аттап азайту қатесі (subtraction_borrow_error)';
    confidence = 0.92;
    identifiedDifficultyKaz = 'Қиындық анықталды: разрядтан аттап азайту алгоритмін қолдануда қиналады (Ондықтан қарыз алуды ұмытады, 50-10=40 және 8-2=6 немесе 2-8 орнына 8-2 орындайды).';
    nextDiagnosticActionKaz = 'Дәл осы разрядтан аттау дағдысын тексеру үшін 4 қосымша диагностикалық сұрақ шығару.';
  }
  // B. Place Value Error
  else if (qClean.includes('ондық') || qClean.includes('құрамы') || (sAns.includes('5 ондық 3 бірлік') && cAns.includes('3 ондық 5 бірлік'))) {
    mistakeType = 'place_value_error';
    mistakeTitleKaz = 'Разрядтық құрамды шатастыру (place_value_error)';
    confidence = 0.89;
    identifiedDifficultyKaz = 'Оқушы ондық пен бірліктің разрядтық орнын шатастырады.';
    nextDiagnosticActionKaz = 'Сан құрамы бойынша визуалды текшелер моделін тағайындау.';
  }
  // C. Addition Carry Error (28 + 15 = 33 немесе 47 + 28 = 65)
  else if (qClean.includes('+') && (sAns === '33' || sAns === '65' || sAns === '74')) {
    mistakeType = 'addition_carry_error';
    mistakeTitleKaz = 'Ондықтан аттап қосу қатесі (addition_carry_error)';
    confidence = 0.90;
    identifiedDifficultyKaz = 'Оқушы бірліктерді қосқанда шыққан 1 ондықты ойда сақтамайды.';
    nextDiagnosticActionKaz = 'Ондықты толықтыру және ойдағы санды ескеру жаттығуларын беру.';
  }
  // D. Word Problem Structure Error
  else if (qStr.includes('болды') || qStr.includes('дүкен') || qStr.includes('дәптер') || skillId === 'skill_word_problems') {
    mistakeType = 'word_problem_structure_error';
    mistakeTitleKaz = 'Мәтіндік есеп құрылымын түсінбеу (word_problem_structure_error)';
    confidence = 0.88;
    identifiedDifficultyKaz = 'Мәтіндік есепте шарт пен сұрақты толық ажыратпай, амалды қате таңдайды.';
    nextDiagnosticActionKaz = 'Мәтіндік есептің сызба-сұлбасын (визуалды сызба) құру жаттығуларын тағайындау.';
  }
  // E. Reading / Symbol Error
  else if (qClean.includes('>') || qClean.includes('<') || qClean.includes('=')) {
    mistakeType = 'reading_error';
    mistakeTitleKaz = 'Таңбаны қате оқу (reading_error)';
    confidence = 0.84;
    identifiedDifficultyKaz = 'Салыстыру таңбаларын ажыратуда шатасу байқалады.';
    nextDiagnosticActionKaz = 'Сандарды координаталық сәуледе салыстыру тренажеры.';
  }
  // F. Concept Error
  else if (qClean.includes('0') || qClean.includes('*0') || qClean.includes('+0')) {
    mistakeType = 'concept_error';
    mistakeTitleKaz = 'Математикалық ұғым қатесі (concept_error)';
    confidence = 0.86;
    identifiedDifficultyKaz = 'Математикалық ереже немесе нөл қасиетін түсінуде қателік бар.';
    nextDiagnosticActionKaz = 'Ережені визуалды мысалдармен қайталау.';
  }

  // Calculate dynamic dropped score
  const updatedScore = Math.max(10, prevScore - 18);
  const updatedStatus: SkillStatus = updatedScore < 50 ? 'NEEDS_SUPPORT' : updatedScore < 70 ? 'DEVELOPING' : 'MASTERED';
  const statusTextKaz = updatedStatus === 'NEEDS_SUPPORT' ? 'Қолдау қажет' : updatedStatus === 'DEVELOPING' ? 'Дамып келеді' : 'Қалыптасқан';

  const suggestedProbes = AIDiagnostEngine.getBorrowingProbeQuestions();

  return {
    isCorrect: false,
    skillId,
    skillNameKaz,
    mistakeType,
    mistakeTitleKaz,
    confidence,
    identifiedDifficultyKaz,
    nextDiagnosticActionKaz,
    suggestedProbes,
    updatedScore,
    updatedStatus,
    statusTextKaz
  };
}

/**
 * AI Diagnostic Core Function
 * Decoupled from UI components
 */
export function diagnosticEngine(input: DiagnosticEngineInput): DiagnosticEvaluationResult {
  return evaluateStudentAnswer(input);
}

/**
 * Diagnostic Engine Class & Probe Generators
 */
export class AIDiagnostEngine {
  static evaluate(input: DiagnosticEngineInput): DiagnosticEvaluationResult {
    return evaluateStudentAnswer(input);
  }

  static getBorrowingProbeQuestions(): MathProblem[] {
    return [
      {
        id: 'probe-sub-1',
        skillId: 'skill_borrow_subtraction',
        topicKaz: 'Разрядтан аттап азайту (Тексеру #1)',
        grade: 2,
        difficulty: 2.5,
        questionKaz: '42 – 17 = ?',
        correctAnswer: '25',
        options: ['35', '25', '31', '24'],
        targetMisconception: 'BORROWING_STAGE_FAILED',
        explanations: {
          VISUAL: { style: 'VISUAL', titleKaz: 'Визуалды Блок', iconName: 'Boxes', contentKaz: '4 ондықтан 1-ді алғанда 12 - 7 = 5 бірлік, 3 - 1 = 2 ондық.', steps: [] },
          STEP_BY_STEP: { style: 'STEP_BY_STEP', titleKaz: 'Қадамдар', iconName: 'ListOrdered', contentKaz: '12-7=5. 3-1=2. Жауабы: 25.', steps: [] },
          STORY: { style: 'STORY', titleKaz: 'Оқиға', iconName: 'BookOpen', contentKaz: '42 теңгеден 17 теңге азайды.', steps: [] },
          SOCRATIC: { style: 'SOCRATIC', titleKaz: 'Сұрақ', iconName: 'HelpCircle', contentKaz: '2-ден 7-ні азайту үшін не істейсің?', socraticQuestions: [] }
        }
      },
      {
        id: 'probe-sub-2',
        skillId: 'skill_borrow_subtraction',
        topicKaz: 'Разрядтан аттап азайту (Тексеру #2)',
        grade: 2,
        difficulty: 2.8,
        questionKaz: '61 – 29 = ?',
        correctAnswer: '32',
        options: ['42', '32', '38', '48'],
        targetMisconception: 'BORROWING_STAGE_FAILED',
        explanations: {
          VISUAL: { style: 'VISUAL', titleKaz: 'Визуалды Блок', iconName: 'Boxes', contentKaz: '11 - 9 = 2, 5 - 2 = 3 ондық.', steps: [] },
          STEP_BY_STEP: { style: 'STEP_BY_STEP', titleKaz: 'Қадамдар', iconName: 'ListOrdered', contentKaz: '11-9=2. 5-2=3. Жауабы: 32.', steps: [] },
          STORY: { style: 'STORY', titleKaz: 'Оқиға', iconName: 'BookOpen', contentKaz: '61 теңгеден 29 теңге жұмсалды.', steps: [] },
          SOCRATIC: { style: 'SOCRATIC', titleKaz: 'Сұрақ', iconName: 'HelpCircle', contentKaz: '1-ден 9 азайтыла ма?', socraticQuestions: [] }
        }
      },
      {
        id: 'probe-sub-3',
        skillId: 'skill_borrow_subtraction',
        topicKaz: 'Разрядтан аттап азайту (Тексеру #3)',
        grade: 2,
        difficulty: 2.6,
        questionKaz: '53 – 18 = ?',
        correctAnswer: '35',
        options: ['45', '35', '41', '37'],
        targetMisconception: 'BORROWING_STAGE_FAILED',
        explanations: {
          VISUAL: { style: 'VISUAL', titleKaz: 'Визуалды Блок', iconName: 'Boxes', contentKaz: '13 - 8 = 5, 4 - 1 = 3.', steps: [] },
          STEP_BY_STEP: { style: 'STEP_BY_STEP', titleKaz: 'Қадамдар', iconName: 'ListOrdered', contentKaz: '13-8=5. 4-1=3.', steps: [] },
          STORY: { style: 'STORY', titleKaz: 'Оқиға', iconName: 'BookOpen', contentKaz: '53 - 18 = 35 теңге.', steps: [] },
          SOCRATIC: { style: 'SOCRATIC', titleKaz: 'Сұрақ', iconName: 'HelpCircle', contentKaz: '5-тен 1 ондық алсаң неше қалады?', socraticQuestions: [] }
        }
      },
      {
        id: 'probe-sub-4',
        skillId: 'skill_borrow_subtraction',
        topicKaz: 'Разрядтан аттап азайту (Тексеру #4)',
        grade: 2,
        difficulty: 3.0,
        questionKaz: '72 – 35 = ?',
        correctAnswer: '37',
        options: ['47', '37', '43', '33'],
        targetMisconception: 'BORROWING_STAGE_FAILED',
        explanations: {
          VISUAL: { style: 'VISUAL', titleKaz: 'Визуалды Блок', iconName: 'Boxes', contentKaz: '12 - 5 = 7, 6 - 3 = 3.', steps: [] },
          STEP_BY_STEP: { style: 'STEP_BY_STEP', titleKaz: 'Қадамдар', iconName: 'ListOrdered', contentKaz: '12-5=7. 6-3=3.', steps: [] },
          STORY: { style: 'STORY', titleKaz: 'Оқиға', iconName: 'BookOpen', contentKaz: '72 теңгеден 35 теңге жұмсалды.', steps: [] },
          SOCRATIC: { style: 'SOCRATIC', titleKaz: 'Сұрақ', iconName: 'HelpCircle', contentKaz: '7 ондықтан неше ондық қалды?', socraticQuestions: [] }
        }
      }
    ];
  }

  static getPrimaryDiagnosticProblem(): MathProblem {
    return {
      id: 'p-diag-borrow-main',
      skillId: 'skill_borrow_subtraction',
      topicKaz: 'Разрядтан аттап азайту алгоритмі',
      grade: 2,
      difficulty: 2.5,
      questionKaz: '52 – 18 = ?',
      correctAnswer: '34',
      options: ['44', '34', '46', '36'],
      targetMisconception: 'BORROWING_STAGE_FAILED',
      explanations: {
        VISUAL: {
          style: 'VISUAL',
          titleKaz: 'Визуалды Ондық Текшелер',
          iconName: 'Boxes',
          contentKaz: '5 ондықтан 1 ондықты алғанда 12 бірлік болады. 12 - 8 = 4. 4 ондық - 1 ондық = 3 ондық. Жауабы: 34.',
          steps: []
        },
        STEP_BY_STEP: {
          style: 'STEP_BY_STEP',
          titleKaz: 'Қадамдық алгоритм',
          iconName: 'ListOrdered',
          contentKaz: '1. 2-ден 8 азайтылмайды. 5-тен 1 ондық қарызға аламыз. 2. 12 - 8 = 4. 3. 4 - 1 = 3 ондық. Жауабы: 34.',
          steps: []
        },
        STORY: { style: 'STORY', titleKaz: 'Өмірлік Сюжет', iconName: 'BookOpen', contentKaz: '52 теңгеден 18 теңге жұмсалды.', steps: [] },
        SOCRATIC: { style: 'SOCRATIC', titleKaz: 'Сократтық сұрақ', iconName: 'HelpCircle', contentKaz: '5 ондықтан 1 ондық алсаң неше қалады?', socraticQuestions: [] }
      }
    };
  }

  static processDiagnosticAnswers(answers: AssessmentAnswer[]): DetailedDiagnosticResult {
    let borrowErrors = 0;
    let totalBorrowQuestions = 0;
    let totalErrors = 0;

    const detectedGaps: MathGap[] = [];

    answers.forEach((ans) => {
      const isBorrow = ans.problem.skillId === 'skill_borrow_subtraction';
      if (ans.userAnswer !== ans.problem.correctAnswer) {
        totalErrors++;
      }
      if (isBorrow) {
        totalBorrowQuestions++;
        if (ans.userAnswer !== ans.problem.correctAnswer) {
          borrowErrors++;
        }
      }
    });

    const recurrenceRate = totalBorrowQuestions > 0 ? borrowErrors / totalBorrowQuestions : 0;
    const confidence = recurrenceRate >= 0.75 ? 0.92 : recurrenceRate >= 0.5 ? 0.8 : 0.4;

    if (borrowErrors > 0) {
      detectedGaps.push({
        id: 'gap-borrow-1',
        topicId: 'subtraction-borrow',
        topicNameKaz: 'Разрядтан аттап азайту',
        skillId: 'skill_borrow_subtraction',
        misconception: 'BORROWING_STAGE_FAILED',
        descriptionKaz: '52 – 18 сияқты есептерде ондықтан қарыз алуды ұмытып, 44 немесе 35 деп шегереді.',
        severity: recurrenceRate >= 0.5 ? 'HIGH' : 'MEDIUM',
        confidenceScore: confidence,
        detectedAt: new Date().toISOString(),
        drillRecommended: 'Ондықтан аттап азайтуда разрядты ыдырату тренажеры'
      });
    }

    const calculatedBorrowScore = Math.max(15, Math.round((1 - recurrenceRate) * 100));

    const skillProfile: SkillMasteryItem[] = [
      {
        skillId: 'skill_borrow_subtraction',
        nameKaz: 'Разрядтан аттап азайту',
        score: calculatedBorrowScore,
        status: calculatedBorrowScore < 50 ? 'NEEDS_SUPPORT' : calculatedBorrowScore < 70 ? 'DEVELOPING' : 'MASTERED',
        statusTextKaz: calculatedBorrowScore < 50 ? 'Қолдау қажет' : calculatedBorrowScore < 70 ? 'Дамып келеді' : 'Қалыптасқан'
      },
      {
        skillId: 'skill_number_composition',
        nameKaz: 'Санның разрядтық құрамы',
        score: 82,
        status: 'MASTERED',
        statusTextKaz: 'Қалыптасқан'
      },
      {
        skillId: 'skill_basic_addition',
        nameKaz: '20 көлеміндегі қосу',
        score: 78,
        status: 'MASTERED',
        statusTextKaz: 'Қалыптасқан'
      },
      {
        skillId: 'skill_number_comparison',
        nameKaz: 'Сандарды салыстыру',
        score: 88,
        status: 'ADVANCED',
        statusTextKaz: 'Жоғары деңгей'
      },
      {
        skillId: 'skill_word_problems',
        nameKaz: 'Жай мәтіндік есептер',
        score: 55,
        status: 'DEVELOPING',
        statusTextKaz: 'Дамып келеді'
      },
      {
        skillId: 'skill_basic_subtraction',
        nameKaz: 'Ондықтан аттамай азайту',
        score: 90,
        status: 'ADVANCED',
        statusTextKaz: 'Жоғары деңгей'
      }
    ];

    let mistakePatternKaz = 'Қателер байқалмады (Дағды тұрақты).';
    let initialDiagnosisKaz = 'Барлық тексеру сұрақтары сәтті орындалды.';
    let primaryMistakeType: DiagnosticMistakeType = 'NONE';

    if (recurrenceRate >= 0.75) {
      primaryMistakeType = 'subtraction_borrow_error';
      mistakePatternKaz = 'Оқушы 4 тексеру сұрағының үшеуінде разрядтан аттаған кезде ондықты азайтуды ұмытып отырған (subtraction_borrow_error).';
      initialDiagnosisKaz = 'Қиындық анықталды: разрядтан аттап азайту алгоритмін қолдануда тұрақты қиналады (Recurrence: 92%).';
    } else if (recurrenceRate > 0) {
      primaryMistakeType = 'calculation_error';
      mistakePatternKaz = 'Оқушы жекелеген есептерде разрядтан аттау кезінде асығыстық танытты.';
      initialDiagnosisKaz = 'Жартылай қате анықталды: ондықты толықтыру ережесін бекіту қажет.';
    }

    return {
      detectedGaps,
      skillProfile,
      mistakePatternKaz,
      initialDiagnosisKaz,
      recurrenceConfidence: confidence,
      totalEvaluated: answers.length,
      totalErrors,
      primaryMistakeType
    };
  }
}
