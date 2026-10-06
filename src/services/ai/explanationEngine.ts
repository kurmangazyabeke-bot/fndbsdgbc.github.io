/**
 * MATHQADAM AI - EXPLANATION ENGINE (AI ТҮСІНДІРУШІ)
 * 14-ҚАДАМ: AI CORE SERVICE АРХИТЕКТУРАСЫ
 * 
 * Функциясы: Бір есепті баланың қабылдау ерекшелігіне қарай
 * 4 түрлі әдіспен (Визуалды, Сан сәулесі, Қадамдық, Өмірлік) түсіндіру.
 */

import { ExplanationOption, ExplanationStyle, MathProblem } from '@/types/mathqadam';

export interface ExplanationBlock {
  title: string;
  content: string;
  steps: string[];
  visualData?: Record<string, any>;
}

export interface ExplanationEngineInput {
  question: string | MathProblem;
  studentLevel: number | string;
  preferredMode?: ExplanationStyle | string;
}

export interface ExplanationEngineOutput {
  visualExplanation: ExplanationBlock;
  numberLineExplanation: ExplanationBlock;
  stepExplanation: ExplanationBlock;
  realLifeExplanation: ExplanationBlock;
  socraticExplanation?: ExplanationBlock;
  activeMode?: ExplanationStyle;
}

/**
 * AI Explanation Core Function
 * Decoupled from UI components
 */
export function explanationEngine(input: ExplanationEngineInput): ExplanationEngineOutput {
  const qStr = typeof input.question === 'string' ? input.question : input.question.questionKaz;

  // 12 - 5 specific multi-method explanation
  if (qStr.includes('12') && qStr.includes('5')) {
    return {
      visualExplanation: {
        title: '1. Визуалды тәсіл (Заттарды алып тастау)',
        content: '12 заттың (кәмпит/текше) ішінен 5-еуін сызып, алып тастаймыз.',
        steps: [
          '1-ҚАДАМ: 12 текше сызамыз.',
          '2-ҚАДАМ: Соның 5 текшесін сызып алып тастаймыз.',
          '3-ҚАДАМ: Тізімде қалған текшелерді санаймыз -> 7 текше қалды!'
        ],
        visualData: {
          type: 'OBJECT_REMOVAL',
          itemsTotal: 12,
          itemsRemoved: 5,
          resultNumber: 7
        }
      },
      numberLineExplanation: {
        title: '2. Сан сәулесі (Артқа 5 қадам)',
        content: '12 санынан бастап, сан сәулесі бойымен 5 қадам АРТҚА қозғаламыз.',
        steps: [
          '12-ден 1 қадам артқа ➔ 11',
          '2-қадам артқа ➔ 10',
          '3-қадам артқа ➔ 9',
          '4-қадам артқа ➔ 8',
          '5-қадам артқа ➔ 7! Нәтиже: 7'
        ],
        visualData: {
          type: 'NUMBER_LINE',
          startNumber: 12,
          stepsBack: 5,
          resultNumber: 7
        }
      },
      stepExplanation: {
        title: '3. Разрядтық тәсіл (10 + 2 ыдырату)',
        content: '12 санын 10 + 2 деп жіктеп, алдымен 10-нан 5-ті азайтамыз:',
        steps: [
          '1-ҚАДАМ: 12 санын былай жазамыз: 12 = 10 + 2',
          '2-ҚАДАМ: 10-нан 5-ті азайтамыз: 10 – 5 = 5',
          '3-ҚАДАМ: Шыққан 5-ке қалған 2-ні қосамыз: 5 + 2 = 7',
          'Қорытынды: 12 – 5 = 7'
        ]
      },
      realLifeExplanation: {
        title: '4. Өмірлік тәсіл (Кәмпит оқиғасы)',
        content: '«Сенде 12 кәмпит болды. Оның 5-еуін досыңа бердің. Нешеуі қалды?»',
        steps: [
          'Сенде 12 кәмпит бар.',
          '5 кәмпитті досыңа сыйладың.',
          'Қалған кәмпиттеріңді санасаң: 12 – 5 = 7 кәмпит қалды!'
        ]
      },
      socraticExplanation: {
        title: '5. Сократтық жетелеу',
        content: 'Өзің жауап беріп көр:',
        steps: [
          '12-ден алдымен 2-ні азайтсаң неше қалады?',
          'Енді 10-нан қалған 3-ті азайтсаң қанша болады?'
        ]
      },
      activeMode: (input.preferredMode as ExplanationStyle) || 'VISUAL'
    };
  }

  // 52 - 18 borrowing multi-method explanation
  if (qStr.includes('52') && qStr.includes('18')) {
    return {
      visualExplanation: {
        title: '1. Визуалды Ондық Текшелер',
        content: '5 ондықтан 1 ондықты бірлікке ұсақтап, 12 бірліктен 8 бірлікті алып тастаймыз.',
        steps: [
          '5 ондықтан 1 ондықты аламыз ➔ қалды 4 ондық.',
          '1 ондық (10) + 2 бірлік = 12 бірлік.',
          '12 бірліктен 8 бірлікті сызып тастаймыз ➔ қалды 4 бірлік.',
          '4 ондықтан 1 ондықты азайтамыз ➔ 3 ондық.',
          'Нәтиже: 34.'
        ]
      },
      numberLineExplanation: {
        title: '2. Сан сәулесімен азайту',
        content: '52-ден алдымен 10 қадам артқа, содан кейін 8 қадам артқа секіреміз.',
        steps: [
          '52 – 10 = 42',
          '42 – 2 = 40 (дөңгелек ондыққа жету)',
          '40 – 6 = 34 (қалған 6 бірлікті шегеру)'
        ]
      },
      stepExplanation: {
        title: '3. Разрядтық бағандау алгоритмі',
        content: 'Бағандап жазып, оң жақтан (бірліктерден) бастап есептейміз:',
        steps: [
          '1. 2-ден 8 азайтылмайды. 5-тен 1 ондық қарыз аламыз.',
          '2. 12 – 8 = 4 (бірлікке жазамыз).',
          '3. 5-тен 1 кеткен соң 4 қалды. 4 – 1 = 3 (ондыққа жазамыз).',
          '4. Жауабы: 34.'
        ]
      },
      realLifeExplanation: {
        title: '4. Өмірлік дүкен мысалы',
        content: '«Сенде 52 теңге болды. Дүкеннен 18 теңгеге қарындаш сатып алдың. Қалтаңда неше теңге қалды?»',
        steps: [
          'Барлық ақша: 52 теңге.',
          'Жұмсалған: 18 теңге.',
          'Қалды: 52 – 18 = 34 теңге.'
        ]
      },
      activeMode: (input.preferredMode as ExplanationStyle) || 'VISUAL'
    };
  }

  // Default dynamic multi-explanation builder
  return {
    visualExplanation: {
      title: '1. Визуалды модель',
      content: `${qStr} өрнегін визуалды текшелер мен заттық блоктар түрінде бейнелеу.`,
      steps: ['Сандарды блоктарға бөлу', 'Амалды блоктар арқылы орындау', 'Қалған блоктарды есептеу']
    },
    numberLineExplanation: {
      title: '2. Сан сәулесі',
      content: 'Координаталық түзу немесе сан сәулесі бойымен қадамдар жасау.',
      steps: ['Бастапқы нүктені табу', 'Қажетті қадамды алға не артқа жылжыту', 'Тоқтаған нүктені белгілеу']
    },
    stepExplanation: {
      title: '3. Қадамдық алгоритм',
      content: 'Математикалық ереже бойынша амалдарды ретімен орындау.',
      steps: ['Разрядтарды ажырату', 'Амалдарды оңнан солға қарай орындау', 'Нәтижені тексеру']
    },
    realLifeExplanation: {
      title: '4. Өмірлік мысал',
      content: `Күнделікті тұрмыста кездесетін нақты жағдаятпен байланыстыру.`,
      steps: ['Жағдаятты елестету', 'Мәтіннен сандарды табу', 'Жауабын тұжырымдау']
    },
    activeMode: (input.preferredMode as ExplanationStyle) || 'VISUAL'
  };
}

/**
 * AIExplainerEngine for backward compatibility
 */
export class AIExplainerEngine {
  static getNextExplanationMode(currentStyle: ExplanationStyle): ExplanationStyle {
    const sequence: ExplanationStyle[] = ['VISUAL', 'NUMBER_LINE', 'STEP_BY_STEP', 'STORY', 'SOCRATIC'];
    const currentIndex = sequence.indexOf(currentStyle);
    const nextIndex = (currentIndex + 1) % sequence.length;
    return sequence[nextIndex];
  }

  static getSampleProblems(): MathProblem[] {
    return [
      {
        id: 'p-sub-12-5',
        skillId: 'skill_basic_subtraction',
        topicKaz: 'Саннан азайту (12 – 5)',
        grade: 1,
        difficulty: 1.5,
        questionKaz: '12 – 5 = ?',
        correctAnswer: '7',
        options: ['7', '6', '8', '5'],
        explanations: {
          VISUAL: {
            style: 'VISUAL',
            titleKaz: '1. Визуалды тәсіл (Заттарды алып тастау)',
            iconName: 'Boxes',
            contentKaz: '12 заттың (кәмпит/текше) ішінен 5-еуін сызып, алып тастаймыз.',
            visualData: {
              type: 'OBJECT_REMOVAL',
              itemsTotal: 12,
              itemsRemoved: 5,
              resultNumber: 7,
            },
            steps: [
              '1-ҚАДАМ: 12 текше сызамыз.',
              '2-ҚАДАМ: Соның 5 текшесін сызып алып тастаймыз.',
              '3-ҚАДАМ: Тізімде қалған текшелерді санаймыз -> 7 текше қалды!'
            ]
          },
          NUMBER_LINE: {
            style: 'NUMBER_LINE',
            titleKaz: '2. Сан сәулесі (Артқа 5 қадам)',
            iconName: 'TrendingDown',
            contentKaz: '12 санынан бастап, сан сәулесі бойымен 5 қадам АРТҚА қозғаламыз.',
            visualData: {
              type: 'NUMBER_LINE',
              startNumber: 12,
              stepsBack: 5,
              resultNumber: 7,
            },
            steps: [
              '12-ден 1 қадам артқа ➔ 11',
              '2-қадам артқа ➔ 10',
              '3-қадам артқа ➔ 9',
              '4-қадам артқа ➔ 8',
              '5-қадам артқа ➔ 7! Нәтиже: 7'
            ]
          },
          STEP_BY_STEP: {
            style: 'STEP_BY_STEP',
            titleKaz: '3. Разрядтық тәсіл (10 + 2 ыдырату)',
            iconName: 'ListOrdered',
            contentKaz: '12 санын 10 + 2 деп жіктеп, алдымен 10-нан 5-ті азайтамыз:',
            steps: [
              '1-ҚАДАМ: 12 санын былай жазамыз: 12 = 10 + 2',
              '2-ҚАДАМ: 10-нан 5-ті азайтамыз: 10 – 5 = 5',
              '3-ҚАДАМ: Шыққан 5-ке қалған 2-ні қосамыз: 5 + 2 = 7',
              'Қорытынды: 12 – 5 = 7'
            ]
          },
          STORY: {
            style: 'STORY',
            titleKaz: '4. Өмірлік тәсіл (Кәмпит оқиғасы)',
            iconName: 'BookOpen',
            contentKaz: '«Сенде 12 кәмпит болды. Оның 5-еуін досыңа бердің. Нешеуі қалды?»',
            steps: [
              'Сенде 12 кәмпит бар.',
              '5 кәмпитті досыңа сыйладың.',
              'Қалған кәмпиттеріңді санасаң: 12 – 5 = 7 кәмпит қалды!'
            ]
          },
          SOCRATIC: {
            style: 'SOCRATIC',
            titleKaz: 'Сократтық жетелеу',
            iconName: 'HelpCircle',
            contentKaz: 'Өзің жауап беріп көр:',
            socraticQuestions: [
              '12-ден 2-ні азайтсаң қанша қалады?',
              'Енді 10-нан тағы 3-ті азайтсаң неше болады?'
            ]
          }
        }
      }
    ];
  }
}
