/**
 * MATHQADAM AI - DEMO DATASET (17-ҚАДАМ)
 * 
 * Бірінші іске қосылғанда жүйені толыққанды педагогикалық деректермен қамтамасыз етеді:
 * 1. Demo Teacher: «Мұғалім» (Айгүл Серікқызы)
 * 2. Demo Class: 4 «А» сыныбы (24 оқушы, орташа 71%)
 * 3. 5 Demo Students: Айдос, Жандос, Аружан, Мадина, Нұрислам (әртүрлі mastery & mistake patterns)
 * 4. 7 Demo Skills: Сан құрамы, Салыстыру, Қосу, Азайту, Разрядтан аттап қосу, Разрядтан аттап азайту, Мәтіндік есеп
 */

export interface DemoSkillItem {
  id: string;
  nameKaz: string;
  categoryKaz: string;
  gradeLevel: number;
  iconName: string;
}

export interface StudentSkillScore {
  skillId: string;
  skillNameKaz: string;
  score: number; // 0 to 100%
  status: 'NEEDS_SUPPORT' | 'DEVELOPING' | 'MASTERED' | 'ADVANCED';
  statusTextKaz: string;
}

export interface DemoStudentItem {
  id: string;
  name: string;
  studentCode: string;
  pinCode: string;
  classGrade: string;
  overallMastery: number;
  baselineScore: number;
  currentScore: number;
  progressGrowthPct: number;
  totalXp: number;
  currentLevel: number;
  dailyStreak: number;
  avatarUrl: string;
  category: 'NEEDS_SUPPORT' | 'MEDIUM' | 'HIGH' | 'INACTIVE';
  weakSkillKaz: string;
  strongSkillKaz: string;
  lastActiveKaz: string;
  mistakePatterns: string[];
  persistingMisconceptionsKaz: string[];
  resolvedMisconceptionsKaz: string[];
  aiRecommendationKaz: string;
  skillScores: StudentSkillScore[];
}

export interface DemoClassGroup {
  id: string;
  name: string;
  grade: number;
  studentCount: number;
  avgMastery: number;
  strongestSkillKaz: string;
  strongestSkillScore: number;
  hardestSkillKaz: string;
  hardestSkillScore: number;
  classJoinCode: string;
  students: DemoStudentItem[];
}

// 7 DEMO SKILLS
export const DEMO_SKILLS: DemoSkillItem[] = [
  { id: 'skill_number_composition', nameKaz: 'Сан құрамы', categoryKaz: 'Арифметика', gradeLevel: 1, iconName: 'Boxes' },
  { id: 'skill_number_comparison', nameKaz: 'Салыстыру', categoryKaz: 'Логика', gradeLevel: 1, iconName: 'Sliders' },
  { id: 'skill_basic_addition', nameKaz: 'Қосу', categoryKaz: 'Арифметика', gradeLevel: 1, iconName: 'Plus' },
  { id: 'skill_basic_subtraction', nameKaz: 'Азайту', categoryKaz: 'Арифметика', gradeLevel: 1, iconName: 'Minus' },
  { id: 'skill_carry_addition', nameKaz: 'Разрядтан аттап қосу', categoryKaz: 'Арифметика', gradeLevel: 2, iconName: 'TrendingUp' },
  { id: 'skill_borrow_subtraction', nameKaz: 'Разрядтан аттап азайту', categoryKaz: 'Арифметика', gradeLevel: 2, iconName: 'Zap' },
  { id: 'skill_word_problems', nameKaz: 'Мәтіндік есеп', categoryKaz: 'Мәтіндік есеп', gradeLevel: 2, iconName: 'BookOpen' },
];

// 5 DEMO STUDENTS
export const DEMO_STUDENTS: DemoStudentItem[] = [
  // 1. АЙДОС НҰРЛАН
  {
    id: 'st-aidos',
    name: 'Айдос Нұрлан',
    studentCode: 'AIDO-882',
    pinCode: '1234',
    classGrade: '4 «А» сыныбы',
    overallMastery: 82,
    baselineScore: 45,
    currentScore: 82,
    progressGrowthPct: 37,
    totalXp: 850,
    currentLevel: 3,
    dailyStreak: 7,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    category: 'HIGH',
    weakSkillKaz: 'Мәтіндік есеп (55%)',
    strongSkillKaz: 'Сан құрамы (95%)',
    lastActiveKaz: 'Бүгін, 11:45',
    mistakePatterns: [
      'TEXT_PROBLEM_DECODING_FAIL (Мәтіндік есепте шарт пен сұрақты толық ажыратпай асығыстық жасау)',
    ],
    persistingMisconceptionsKaz: [
      'Мәтіндік есепте сандарды көре сала тез арада амал таңдау инерциясы байқалады.'
    ],
    resolvedMisconceptionsKaz: [
      '«Ойдағы санды ұмыту» қатесі 100% жойылды — ондықты сақтап қосады.',
      '«Сандарды салыстырудағы» таңбаларды шатастыру толық реттелді.'
    ],
    aiRecommendationKaz: 'Оқушыға мәтіндік есептердің сызба-модельдеу тренажерын күніне 10 минут қосу және 4-деңгейлік (Challenge) күрделі есептерді беру ұсынылады.',
    skillScores: [
      { skillId: 'skill_number_composition', skillNameKaz: 'Сан құрамы', score: 95, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_number_comparison', skillNameKaz: 'Салыстыру', score: 92, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_basic_addition', skillNameKaz: 'Қосу', score: 90, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_basic_subtraction', skillNameKaz: 'Азайту', score: 88, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_carry_addition', skillNameKaz: 'Разрядтан аттап қосу', score: 85, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_borrow_subtraction', skillNameKaz: 'Разрядтан аттап азайту', score: 72, status: 'MASTERED', statusTextKaz: 'Қалыптасқан' },
      { skillId: 'skill_word_problems', skillNameKaz: 'Мәтіндік есеп', score: 55, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
    ]
  },

  // 2. ЖАНДОС ТҰРСЫНОВ
  {
    id: 'st-jandos',
    name: 'Жандос Тұрсынов',
    studentCode: 'JAND-491',
    pinCode: '1234',
    classGrade: '4 «А» сыныбы',
    overallMastery: 69,
    baselineScore: 34,
    currentScore: 69,
    progressGrowthPct: 35,
    totalXp: 620,
    currentLevel: 2,
    dailyStreak: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    category: 'MEDIUM',
    weakSkillKaz: 'Разрядтан аттап азайту (42%)',
    strongSkillKaz: 'Салыстыру (85%)',
    lastActiveKaz: 'Бүгін, 10:20',
    mistakePatterns: [
      'BORROWING_STAGE_FAILED (52 – 18 = 44 қатесі: ондықтан қарыз алмай 50-10=40, 8-2=6 деп есептеу)',
      'OPERATIONAL_ORDER_FLAW (Амалдар ретін сақтаудағы асығыстық)'
    ],
    persistingMisconceptionsKaz: [
      'Разрядтан аттап азайтуда 52 – 18 сияқты есептерде бірлікті керісінше 8-2 деп шегере салады.',
      'Мәтіндік есепте жанама шарттарды талдауда қолдау қажет.'
    ],
    resolvedMisconceptionsKaz: [
      '«Сан құрамын жіктеу» (28 = 20 + 8) 100% қалыптасты.',
      '«Бағандап қосқанда 1-ді сақтау» тұрақты бекітілді.'
    ],
    aiRecommendationKaz: 'Разрядтан аттап азайту бойынша 4-деңгейлік визуалды текшелер тренажеры мен қадамдық бағандау алгоритмін күшейту ұсынылады.',
    skillScores: [
      { skillId: 'skill_number_composition', skillNameKaz: 'Сан құрамы', score: 80, status: 'MASTERED', statusTextKaz: 'Қалыптасқан' },
      { skillId: 'skill_number_comparison', skillNameKaz: 'Салыстыру', score: 85, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_basic_addition', skillNameKaz: 'Қосу', score: 75, status: 'MASTERED', statusTextKaz: 'Қалыптасқан' },
      { skillId: 'skill_basic_subtraction', skillNameKaz: 'Азайту', score: 65, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_carry_addition', skillNameKaz: 'Разрядтан аттап қосу', score: 70, status: 'MASTERED', statusTextKaz: 'Қалыптасқан' },
      { skillId: 'skill_borrow_subtraction', skillNameKaz: 'Разрядтан аттап азайту', score: 42, status: 'NEEDS_SUPPORT', statusTextKaz: 'Қолдау қажет' },
      { skillId: 'skill_word_problems', skillNameKaz: 'Мәтіндік есеп', score: 55, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
    ]
  },

  // 3. АРУЖАН БОЛАТБЕК
  {
    id: 'st-aruzhan',
    name: 'Аружан Болатбек',
    studentCode: 'ARUZ-720',
    pinCode: '1234',
    classGrade: '4 «А» сыныбы',
    overallMastery: 94,
    baselineScore: 70,
    currentScore: 94,
    progressGrowthPct: 24,
    totalXp: 1250,
    currentLevel: 4,
    dailyStreak: 12,
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    category: 'HIGH',
    weakSkillKaz: 'Жоқ (Жоғары академиялық меңгеру)',
    strongSkillKaz: 'Сан құрамы (98%)',
    lastActiveKaz: 'Бүгін, 09:15',
    mistakePatterns: [
      'VISUAL_FRACTION_MISMATCH (Күрделі кеңістіктік фигураларда сирек кездесетін қате, <5%)'
    ],
    persistingMisconceptionsKaz: [],
    resolvedMisconceptionsKaz: [
      'Барлық 7 математикалық дағды толық 85%+ деңгейінде меңгерілген.'
    ],
    aiRecommendationKaz: 'Тамаша академиялық көрсеткіш! Олимпиадалық логикалық тапсырмалар мен күрделі кері есептер беру ұсынылады.',
    skillScores: [
      { skillId: 'skill_number_composition', skillNameKaz: 'Сан құрамы', score: 98, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_number_comparison', skillNameKaz: 'Салыстыру', score: 96, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_basic_addition', skillNameKaz: 'Қосу', score: 95, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_basic_subtraction', skillNameKaz: 'Азайту', score: 92, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_carry_addition', skillNameKaz: 'Разрядтан аттап қосу', score: 94, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_borrow_subtraction', skillNameKaz: 'Разрядтан аттап азайту', score: 90, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
      { skillId: 'skill_word_problems', skillNameKaz: 'Мәтіндік есеп', score: 92, status: 'ADVANCED', statusTextKaz: 'Жоғары деңгей' },
    ]
  },

  // 4. МАДИНА ҚАЙРАТ
  {
    id: 'st-madina',
    name: 'Мадина Қайрат',
    studentCode: 'MADI-318',
    pinCode: '1234',
    classGrade: '4 «А» сыныбы',
    overallMastery: 48,
    baselineScore: 28,
    currentScore: 48,
    progressGrowthPct: 20,
    totalXp: 340,
    currentLevel: 1,
    dailyStreak: 2,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    category: 'NEEDS_SUPPORT',
    weakSkillKaz: 'Разрядтан аттап азайту (35%)',
    strongSkillKaz: 'Салыстыру (65%)',
    lastActiveKaz: 'Кеше, 16:30',
    mistakePatterns: [
      'PLACE_VALUE_CONFUSION (Ондық пен бірліктің орындарын шатастыру)',
      'CARRIED_OVER_FORGOTTEN (Қосқанда ойдағы 1-ді ескермеу)',
      'BORROWING_STAGE_FAILED (Азайтқанда разрядтан аттауды орындай алмау)'
    ],
    persistingMisconceptionsKaz: [
      'Сандарды жіктеуде ондық пен бірліктің мәнін ажыратуда шатасады.',
      'Разрядтан аттап қосу мен азайтуда визуалды қолдаусыз есептеу қиындық тудырады.'
    ],
    resolvedMisconceptionsKaz: [
      '10 көлеміндегі бір таңбалы сандарды санау қалыптасты.'
    ],
    aiRecommendationKaz: '1-деңгейлік визуалды модельдер (20+10, 3+4 текшелер) және сан сәулесі әдісімен жеке қолдау маршрутын тағайындау қажет.',
    skillScores: [
      { skillId: 'skill_number_composition', skillNameKaz: 'Сан құрамы', score: 52, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_number_comparison', skillNameKaz: 'Салыстыру', score: 65, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_basic_addition', skillNameKaz: 'Қосу', score: 50, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_basic_subtraction', skillNameKaz: 'Азайту', score: 45, status: 'NEEDS_SUPPORT', statusTextKaz: 'Қолдау қажет' },
      { skillId: 'skill_carry_addition', skillNameKaz: 'Разрядтан аттап қосу', score: 42, status: 'NEEDS_SUPPORT', statusTextKaz: 'Қолдау қажет' },
      { skillId: 'skill_borrow_subtraction', skillNameKaz: 'Разрядтан аттап азайту', score: 35, status: 'NEEDS_SUPPORT', statusTextKaz: 'Қолдау қажет' },
      { skillId: 'skill_word_problems', skillNameKaz: 'Мәтіндік есеп', score: 44, status: 'NEEDS_SUPPORT', statusTextKaz: 'Қолдау қажет' },
    ]
  },

  // 5. НҰРИСЛАМ ЕРЛАН
  {
    id: 'st-nurislam',
    name: 'Нұрислам Ерлан',
    studentCode: 'NURI-509',
    pinCode: '1234',
    classGrade: '4 «А» сыныбы',
    overallMastery: 63,
    baselineScore: 38,
    currentScore: 63,
    progressGrowthPct: 25,
    totalXp: 510,
    currentLevel: 2,
    dailyStreak: 3,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'MEDIUM',
    weakSkillKaz: 'Мәтіндік есеп (46%)',
    strongSkillKaz: 'Салыстыру (80%)',
    lastActiveKaz: 'Бүгін, 08:30',
    mistakePatterns: [
      'TEXT_PROBLEM_DECODING_FAIL (Көп қадамды мәтіндік есептердің мағынасын түсінуде қателесу)',
      'ZERO_PROPERTY_MISUNDERSTOOD (Нөл қатысатын өрнектердегі шатасулар)'
    ],
    persistingMisconceptionsKaz: [
      'Мәтіндік есептің шарты ұзақ болғанда логикалық байланысты тез жоғалтады.'
    ],
    resolvedMisconceptionsKaz: [
      '«Салыстыру таңбалары» (>, <, =) бойынша қателер жойылды.',
      '«Ондықтан аттамай азайту» толық қалыптасты.'
    ],
    aiRecommendationKaz: 'Өмірлік тұрмыстық қысқа сюжеттік есептерді көбейтіп, AI Explainer-дің «Өмірлік мысал» режимін қолдану ұсынылады.',
    skillScores: [
      { skillId: 'skill_number_composition', skillNameKaz: 'Сан құрамы', score: 72, status: 'MASTERED', statusTextKaz: 'Қалыптасқан' },
      { skillId: 'skill_number_comparison', skillNameKaz: 'Салыстыру', score: 80, status: 'MASTERED', statusTextKaz: 'Қалыптасқан' },
      { skillId: 'skill_basic_addition', skillNameKaz: 'Қосу', score: 68, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_basic_subtraction', skillNameKaz: 'Азайту', score: 64, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_carry_addition', skillNameKaz: 'Разрядтан аттап қосу', score: 58, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_borrow_subtraction', skillNameKaz: 'Разрядтан аттап азайту', score: 50, status: 'DEVELOPING', statusTextKaz: 'Дамып келеді' },
      { skillId: 'skill_word_problems', skillNameKaz: 'Мәтіндік есеп', score: 46, status: 'NEEDS_SUPPORT', statusTextKaz: 'Қолдау қажет' },
    ]
  }
];

// DEMO CLASS: 4 «А»
export const DEMO_CLASS_4A: DemoClassGroup = {
  id: 'cls-4a',
  name: '4 «А» сыныбы',
  grade: 4,
  studentCount: 24,
  avgMastery: 71,
  strongestSkillKaz: 'Салыстыру (89%)',
  strongestSkillScore: 89,
  hardestSkillKaz: 'Мәтіндік есеп (46%)',
  hardestSkillScore: 46,
  classJoinCode: 'MQ-4A-8921',
  students: DEMO_STUDENTS
};

// DEMO TEACHER PROFILE
export const DEMO_TEACHER_PROFILE = {
  id: 'usr-teacher-aigul-01',
  name: 'Мұғалім',
  fullName: 'Айгүл Серікқызы (Мұғалім)',
  schoolName: '№175 IT Лицейі',
  subject: 'Бастауыш сынып математикасы',
  activeClass: DEMO_CLASS_4A,
  totalStudents: 24,
  avgMastery: 71,
  skillsTaxonomy: DEMO_SKILLS
};
