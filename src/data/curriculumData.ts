import { Subject } from '../types';

export const CURRICULUM_SUBJECTS: Subject[] = [
  {
    id: 'english',
    name: 'English (New Hello!)',
    nameAr: 'اللغة الإنجليزية (New Hello!)',
    track: 'languages',
    category: 'english',
    icon: 'BookOpen',
    accentColor: '#0284c7',
    bgLight: '#f0f9ff',
    description: 'Complete New Hello! curriculum for Prep 3 with grammar rules, vocabulary, reading dialogues, listening texts, and model exams.',
    descriptionAr: 'منهج اللغة الإنجليزية الحديث للشهادة الإعدادية (New Hello! Prep 3): نصوص الاستماع والقراءة، القواعد اللغوية، الكلمات والمشتقات، ونماذج امتحانات المحافظات.',
    units: [
      {
        id: 'eng-u1',
        number: 1,
        title: 'Unit 1: Around Town',
        titleAr: 'الوحدة الأولى: في أرجاء المدينة (Around Town)',
        description: 'Prepositions of place and movement, Present simple tense for timetables and schedules, Ismailia city attractions.',
        descriptionAr: 'حروف جر المكان والحركة، زمن المضارع البسيط للتعبير عن المواعيد والجداول، معالم الإسماعيلية وحديقة الحيوان والمتحف.',
        term: 1,
        lessons: [
          'Lesson 1 & 2: Places in town & Public transport',
          'Lesson 3 & 4: Asking for & giving directions, Present simple for schedules',
          'Lesson 5 & 6: Writing a description of your hometown (Ismailia & Suez)'
        ],
        lessonsAr: [
          'الدرس 1 و 2: الأماكن في المدينة ووسائل المواصلات العامة',
          'الدرس 3 و 4: السؤال وإعطاء الاتجاهات، والمضارع البسيط للمواعيد المجدولة',
          'الدرس 5 و 6: كتابة فقرة وصفية عن مدينتك ومعالمها البارزة'
        ],
        keyGrammarOrTheorems: [
          'Prepositions of time: in, on, at (at 7:00, on Monday, in October)',
          'Prepositions of movement: past, opposite, between, next to, straight on',
          'Present Simple for timetables: The train leaves at 8:00 am.'
        ]
      },
      {
        id: 'eng-u2',
        number: 2,
        title: "Unit 2: Let's Go Shopping",
        titleAr: 'الوحدة الثانية: لنذهب للتسوق (Let\'s Go Shopping)',
        description: 'Comparative and superlative adjectives, Correlative conjunctions: both...and, either...or, neither...nor, Smart appliances.',
        descriptionAr: 'مقارنة الصفات والتفضيل، أدوات الربط (Both... and / Either... or / Neither... nor)، الأجهزة المنزلية الذكية والتسوق الإلكتروني.',
        term: 1,
        lessons: [
          'Lesson 1 & 2: Electronic appliances & Online deals',
          'Lesson 3 & 4: Both / Either / Neither / None rules',
          'Lesson 5 & 6: Writing customer reviews & Product complaints'
        ],
        lessonsAr: [
          'الدرس 1 و 2: الأجهزة الكهربائية والعروض الذكية عبر الإنترنت',
          'الدرس 3 و 4: قواعد Both / Either / Neither / None مع الأفعال',
          'الدرس 5 و 6: كتابة تقييم المنتج ورسائل الشكوى الرسمية'
        ],
        keyGrammarOrTheorems: [
          'Both + plural noun + plural verb (Both Omar and Ali are ready)',
          'Either ... or / Neither ... nor (Verb agrees with nearest subject)',
          'None of + plural noun + singular or plural verb'
        ]
      },
      {
        id: 'eng-u3',
        number: 3,
        title: 'Unit 3: My Community',
        titleAr: 'الوحدة الثالثة: مجتمعي (My Community)',
        description: 'Present continuous for fixed arrangements, Going to for plans and intentions, Decent Life initiative (حياة كريمة).',
        descriptionAr: 'المضارع المستمر للترتيبات المستقبلية، صيغة Going to للخطط والنوايا، مبادرة حياة كريمة والخدمات المجتمعية.',
        term: 1,
        lessons: [
          'Lesson 1 & 2: Community services & Local initiatives',
          'Lesson 3 & 4: Present continuous vs. Going to for future',
          'Lesson 5 & 6: Writing about social projects & Decent Life'
        ],
        lessonsAr: [
          'الدرس 1 و 2: الخدمات المجتمعية والمبادرات والمرافق العامة',
          'الدرس 3 و 4: التفرقة بين المضارع المستمر و Going to للمستقبل',
          'الدرس 5 و 6: موضوعات التعبير عن التطوع ومبادرة حياة كريمة'
        ]
      }
    ],
    resources: [
      {
        id: 'eng-bk-1',
        title: "Ministry Student's Book - Term 1",
        titleAr: 'كتاب المدرسة الرسمي (Student\'s Book) - الترم الأول',
        type: 'textbook',
        pagesCount: 88,
        fileSize: '14.2 MB',
        description: 'Official Ministry textbook covering Units 1 to 6 with reading passages, exercises, and vocabulary notes.',
        descriptionAr: 'الكتاب المدرسي المعتمد من وزارة التربية والتعليم للشهادة الإعدادية - الفصل الدراسي الأول كاملاً بنصوص القراءة والتمارين.',
        term: 1,
        downloadCount: 12450
      },
      {
        id: 'eng-bk-2',
        title: "Ministry Workbook - Term 1",
        titleAr: 'كتاب التدريبات والأنشطة (Workbook) - الترم الأول',
        type: 'workbook',
        pagesCount: 72,
        fileSize: '11.8 MB',
        description: 'Complete workbook drills, comprehension passages, and official writing exercises.',
        descriptionAr: 'تمارين كتاب الأنشطة والتدريبات المدرسية شاملة أسئلة الاختيار والجرامر وإعادة الصياغة والمحادثات.',
        term: 1,
        downloadCount: 9840
      },
      {
        id: 'eng-sum-1',
        title: 'Grammar Master Cheat Sheet - Term 1',
        titleAr: 'المخطط الذهبي لجميع قواعد الجرامر - الترم الأول',
        type: 'formula_sheet',
        pagesCount: 12,
        fileSize: '3.1 MB',
        description: 'Clear, tabular breakdown of all grammar rules: Prepositions, Schedules, Both/Either/Neither, Future Forms, Present Perfect.',
        descriptionAr: 'ملخص شامل لجميع قواعد الجرامر من الوحدة 1 إلى 6 في جداول مقارنة سهلة الحفظ مع الكلمات الدالة والأسئلة الشائعة.',
        term: 1,
        downloadCount: 18200
      },
      {
        id: 'eng-ex-1',
        title: 'Expected Exam Night Questions & Answers',
        titleAr: 'مذكرة ليلة الامتحان المتوقعة وسؤال وجواب بالإجابات النموذجية',
        type: 'exam_model',
        pagesCount: 24,
        fileSize: '5.4 MB',
        description: '150 most repeated questions in Egyptian governorates exams: Dialogues, Complete, Read and correct, Paragraphs.',
        descriptionAr: 'أقوى مذكرة مراجعة ليلة الامتحان: 150 سؤالاً متكرراً في امتحانات المحافظات مع أهم موضوعات البراجراف ونماذج المحادثات.',
        term: 1,
        downloadCount: 22100
      }
    ],
    videos: [
      {
        id: 'eng-v1',
        title: 'Unit 1: Around Town - Complete Grammar & Prepositions',
        titleAr: 'شرح الوحدة الأولى كاملة: حروف الجر والمضارع البسيط للمواعيد',
        teacherName: 'مستر أحمد إبراهيم (خبير لغة إنجليزية)',
        channelName: 'قناة مدرستنا 1 (الرسمية - وزارة التربية والتعليم)',
        duration: '38:15',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'شرح unit 1 new hello الصف الثالث الاعدادي الترم الاول مستر احمد ابراهيم',
        unitId: 'eng-u1',
        term: 1,
        keyTopics: ['Prepositions of movement', 'Present Simple for timetables', 'Key town vocabulary'],
        keyTopicsAr: ['حروف جر المكان والحركة', 'المضارع البسيط لجداول القطارات والسينما', 'أهم كلمات الدرس والمترادفات'],
        summaryNote: 'Use at with specific clock times and the weekend; in with months, years, seasons; on with days and dates.',
        summaryNoteAr: 'قاعدة ذهبية: نستخدم at مع الساعات (at 5:00) و at the weekend، ونستخدم on مع الأيام والتواريخ (on Friday, on 15 May)، ونستخدم in مع فترات اليوم والشهور وفصول السنة.',
        alternativeTeachers: [
          {
            teacherName: 'قناة مدرستنا الرسمية',
            channelName: 'قناة مدرستنا 1 التعليمية',
            searchQuery: 'شرح انجليزي تالتة اعدادي قناة مدرستنا الوحدة الاولى الترم الاول'
          },
          {
            teacherName: 'مستر محمد خليل',
            channelName: 'منصة الخليل في الإنجليزية',
            searchQuery: 'انجليزي تالتة اعدادي ترم اول مستر محمد خليل unit 1'
          }
        ]
      },
      {
        id: 'eng-v2',
        title: "Unit 2: Let's Go Shopping - Both / Either / Neither / None",
        titleAr: 'شرح الوحدة الثانية: إتقان قواعد Both, Either, Neither, None بدون أخطاء',
        teacherName: 'مستر محمد خليل',
        channelName: 'منصة اللغة الإنجليزية للشهادة الإعدادية',
        duration: '42:30',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'شرح unit 2 new hello الصف الثالث الاعدادي ترم اول both either neither',
        unitId: 'eng-u2',
        term: 1,
        keyTopics: ['Both ... and plural verb', 'Either / Neither rules', 'Smart appliances vocabulary'],
        keyTopicsAr: ['قاعدة Both والفعل الجمع', 'تطابق الفعل مع الفاعل الأقرب في Either/Neither', 'كلمات العروض والأجهزة'],
        summaryNote: 'When using "Either... or" or "Neither... nor", the verb agrees with the second (nearest) subject.',
        summaryNoteAr: 'هام جداً في تصحيح الخطأ: في Either... or و Neither... nor يتبع الفعل الفاعل الثاني (الأقرب له)؛ مثلاً: Neither Ali nor his friends *were* absent.',
        alternativeTeachers: [
          {
            teacherName: 'مستر إسلام طه',
            channelName: 'دروس أونلاين إنجليزي',
            searchQuery: 'شرح جرامر الوحدة الثانية تالتة اعدادي ترم اول مستر اسلام طه'
          }
        ]
      },
      {
        id: 'eng-v3',
        title: 'Unit 3: Future Forms - Present Continuous vs. Going to',
        titleAr: 'شرح الوحدة الثالثة: الفرق الحاسم بين المضارع المستمر و Going to للمستقبل',
        teacherName: 'مس نورهان طارق',
        channelName: 'قناة مدرستنا 1 التعليمية',
        duration: '35:50',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'شرح unit 3 انجليزي تالتة اعدادي ترم اول present continuous going to future',
        unitId: 'eng-u3',
        term: 1,
        keyTopics: ['Arrangements vs Intentions', 'Decent Life reading text', 'Paragraph writing'],
        keyTopicsAr: ['الترتيبات المجهزة مسبقاً مقابل النوايا', 'نص مبادرة حياة كريمة والخدمات', 'كيفية كتابة موضوع تعبير متقن'],
        summaryNote: 'Look for trigger words: "arranged / booked / prepared" -> Present Continuous; "decided / planned / intend" -> Be going to.',
        summaryNoteAr: 'كلمات سر الامتحان: إذا وجدت booked أو arranged أو got tickets فاختر مضارع مستمر فوراً، وإذا وجدت decided أو planned فاختر going to.'
      }
    ],
    quizzes: [
      {
        id: 'quiz-eng-u1',
        unitId: 'eng-u1',
        unitTitle: 'Unit 1: Around Town',
        unitTitleAr: 'الوحدة الأولى: في أرجاء المدينة',
        title: 'Unit 1 Comprehensive Mastery Quiz',
        titleAr: 'الاختبار الدوري التفاعلي الشامل للوحدة الأولى',
        term: 1,
        timeLimitMinutes: 15,
        totalMarks: 20,
        questions: [
          {
            id: 'q-eng-1',
            question: 'The train to Alexandria ______ at 7:30 tomorrow morning.',
            options: ['leaves', 'leave', 'is leaving', 'leaving'],
            correctAnswerIndex: 0,
            explanation: 'Present Simple is used for scheduled public transport timetables and official fixed itineraries with singular subjects (leaves).',
            explanationAr: 'نستخدم زمن المضارع البسيط (leaves بإضافة s للمفرد) للتعبير عن المواعيد المجدولة رسمياً لوسائل المواصلات والقطارات.',
            difficulty: 'medium'
          },
          {
            id: 'q-eng-2',
            question: 'Turn right at the traffic lights, then go straight ______. The museum is on your left.',
            options: ['on', 'in', 'at', 'by'],
            correctAnswerIndex: 0,
            explanation: 'The fixed prepositional phrase for continuing forward is "go straight on".',
            explanationAr: 'التعبير الاصطلاحي الثابت للسير للأمام مباشرة هو "go straight on".',
            difficulty: 'easy'
          },
          {
            id: 'q-eng-3',
            question: 'My grandfather was born ______ 15th October 1952.',
            options: ['on', 'in', 'at', 'from'],
            correctAnswerIndex: 0,
            explanation: 'We use the preposition "on" with specific complete dates that include the day.',
            explanationAr: 'نستخدم حرف الجر "on" مع التواريخ المحددة التي تحتوي على اليوم والشهر (on 15th October).',
            difficulty: 'easy'
          },
          {
            id: 'q-eng-4',
            question: 'A ______ is a large area of water surrounded by land.',
            options: ['lake', 'island', 'aquarium', 'botanical garden'],
            correctAnswerIndex: 0,
            explanation: 'A lake is water surrounded by land (like Lake Timsah in Ismailia), while an island is land surrounded by water.',
            explanationAr: 'البحيرة (Lake) هي مساحة مائية محاطة باليابسة، بينما الجزيرة (Island) هي يابسة محاطة بالماء.',
            difficulty: 'medium'
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc-eng-1',
        front: 'What preposition is used before clock times and before "the weekend"?',
        back: 'The preposition "at" (e.g., at 7:30 pm, at the weekend).',
        category: 'Prepositions',
        hint: 'Used for precise points in time.'
      },
      {
        id: 'fc-eng-2',
        front: 'Complete the rule: "Neither Ali nor his brothers ______ (be) at the match yesterday."',
        back: '"were" (In Neither... nor, verb agrees with the nearest subject: "his brothers" is plural past).',
        category: 'Grammar',
        hint: 'Look at the subject closest to the verb.'
      },
      {
        id: 'fc-eng-3',
        front: 'What tense is used for train schedules, movie times, and school timetables?',
        back: 'Present Simple tense with singular verb +s (e.g. The flight departs at 9:00).',
        category: 'Tenses',
        hint: 'Expresses permanent routines and official schedules.'
      },
      {
        id: 'fc-eng-4',
        front: 'What does "botanical garden" mean?',
        back: 'A large park or garden where plants and rare flowers are grown for scientific study and public display (حديقة نباتية).',
        category: 'Vocabulary',
        hint: 'Unit 1 town places.'
      }
    ]
  },
  {
    id: 'math',
    name: 'Mathematics (Algebra & Geometry)',
    nameAr: 'الرياضيات باللغة الإنجليزية (Math Prep 3)',
    track: 'languages',
    category: 'math',
    icon: 'Calculator',
    accentColor: '#d97706',
    bgLight: '#fffbeb',
    description: 'Egyptian Prep 3 Math curriculum in English: Algebra & Statistics and Geometry & Trigonometry.',
    descriptionAr: 'منهج الرياضيات لمدارس اللغات والتجريبي: حاصل الضرب الديكارتي، الدوال، النسبة والتناسب، حساب المثلثات والهندسة التحليلية وميل الخط المستقيم.',
    units: [
      {
        id: 'math-u1',
        number: 1,
        title: 'Unit 1 (Algebra): Relations & Functions',
        titleAr: 'الوحدة الأولى (جبر): حاصل الضرب الديكارتي والعلاقات والدوال',
        description: 'Cartesian product of two sets, Arrow diagrams, Relations, Functions, and Polynomial functions.',
        descriptionAr: 'تساوي الأزواج المرتبة، حاصل الضرب الديكارتي للمجموعات، المخطط السهمي والبياني، مفهوم الدالة ومدى الدالة.',
        term: 1,
        lessons: [
          'Lesson 1: Cartesian Product of two finite sets',
          'Lesson 2: Relations and Functions representation',
          'Lesson 3: Polynomial functions: Constant, Linear & Quadratic functions'
        ],
        lessonsAr: [
          'الدرس 1: حاصل الضرب الديكارتي وتساوي زوجين مرتبين',
          'الدرس 2: العلاقات ومتى تكون العلاقة دالة',
          'الدرس 3: دوال كثيرات الحدود بيانيا'
        ]
      },
      {
        id: 'math-u4',
        number: 4,
        title: 'Unit 4 (Trigonometry): Main Trig Ratios',
        titleAr: 'الوحدة الرابعة (حساب مثلثات): النسب المثلثية الأساسية للزاوية الحادة',
        description: 'Sine, Cosine, and Tangent of acute angles, Special angles (30°, 45°, 60°).',
        descriptionAr: 'جيب وجيب تمام وظل الزاوية الحادة (sin, cos, tan)، والنسب المثلثية للزوايا الخاصة 30° و 45° و 60° والمتطابقات.',
        term: 1,
        lessons: [
          'Lesson 1: Main trigonometric ratios in right-angled triangle',
          'Lesson 2: Special angles (30°, 45°, 60°)'
        ],
        lessonsAr: [
          'الدرس 1: النسب المثلثية الأساسية في المثلث القائم',
          'الدرس 2: قيم الزوايا الخاصة 30° و 45° و 60°'
        ]
      },
      {
        id: 'math-u5',
        number: 5,
        title: 'Unit 5 (Geometry): Coordinate Geometry',
        titleAr: 'الوحدة الخامسة (هندسة تحليلية): البعد بين نقطتين وميل الخط المستقيم',
        description: 'Distance formula, Midpoint, Slope of straight line, Parallel and perpendicular lines, Equation of straight line.',
        descriptionAr: 'قانون البعد بين نقطتين، إحداثيات المنتصف، ميل الخط المستقيم، شرط التوازي والتعامد، ومعادلة المستقيم ص = م س + جـ.',
        term: 1,
        lessons: [
          'Lesson 1: Distance between two points',
          'Lesson 2: Coordinates of midpoint',
          'Lesson 3: Slope of straight line & Parallel/Perpendicular conditions',
          'Lesson 4: Equation of straight line (y = mx + c)'
        ],
        lessonsAr: [
          'الدرس 1: قانون البعد بين نقطتين وتطبيقاته',
          'الدرس 2: إحداثيات نقطة المنتصف',
          'الدرس 3: ميل المستقيم وشرطا التوازي والتعامد',
          'الدرس 4: الصورة العامة لمعادلة الخط المستقيم'
        ]
      }
    ],
    resources: [
      {
        id: 'math-bk-1',
        title: 'Official Ministry Math Book (English Track) - Term 1',
        titleAr: 'كتاب الوزارة الرسمي للرياضيات باللغات - الترم الأول',
        type: 'textbook',
        pagesCount: 120,
        fileSize: '18.4 MB',
        description: 'Complete official textbook for Prep 3 Algebra and Geometry with proofs, examples, and exercises.',
        descriptionAr: 'كتاب الوزارة باللغة الإنجليزية لطلاب اللغات والتجريبي: الجبر والهندسة وحساب المثلثات مع التمارين.',
        term: 1,
        downloadCount: 15400
      },
      {
        id: 'math-sum-1',
        title: 'All Geometry & Algebra Theorems & Formulas Booklet',
        titleAr: 'كراسة القوانين والنظريات الذهبية للجبر والهندسة التحليلية',
        type: 'formula_sheet',
        pagesCount: 16,
        fileSize: '4.2 MB',
        description: 'Essential formula sheet containing all coordinate geometry laws, trig values table, variation methods, and step-by-step proofs.',
        descriptionAr: 'تجميعة شاملة لكل قوانين البعد والمنتصف والميل ومعادلة المستقيم وجدول الزوايا الخاصة ومسائل التناسب.',
        term: 1,
        downloadCount: 24300
      }
    ],
    videos: [
      {
        id: 'math-v1',
        title: 'Cartesian Product & Relations - Full Algebra Mastery',
        titleAr: 'الجبر: حاصل الضرب الديكارتي والعلاقات والدوال من الصفر حتى الاحتراف',
        teacherName: 'مستر أشرف عبد الله (كبير معلمي الرياضيات)',
        channelName: 'قناة مدرستنا 1 (وزارة التربية والتعليم)',
        duration: '45:10',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'Math prep 3 first term Cartesian product and relations مستر اشرف عبد الله',
        unitId: 'math-u1',
        term: 1,
        keyTopics: ['Ordered pairs equality', 'Arrow diagrams', 'Function condition test'],
        keyTopicsAr: ['تساوي الأزواج المرتبة', 'رسم المخطط السهمي والبياني', 'شرط أن تكون العلاقة دالة ومداها'],
        summaryNote: 'In (x, y) = (a, b), set x = a and y = b to solve the simultaneous equations.',
        summaryNoteAr: 'قاعدة أساسية: تساوي زوجين مرتبين يعني المسقط الأول = المسقط الأول، والمسقط الثاني = المسقط الثاني.',
        alternativeTeachers: [
          {
            teacherName: 'مستر سامح فاروق',
            channelName: 'Math Clinic',
            searchQuery: 'Prep 3 math term 1 Cartesian product Sameh Farouk'
          }
        ]
      },
      {
        id: 'math-v2',
        title: 'Trigonometry & Special Angles (30°, 45°, 60°) Made Simple',
        titleAr: 'حساب المثلثات: إتقان النسب المثلثية والزوايا الخاصة بدون حفظ',
        teacherName: 'مستر هاني سليم',
        channelName: 'منصة الرياضيات لمدارس اللغات',
        duration: '40:20',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'Prep 3 Trigonometry main trig ratios special angles 30 45 60',
        unitId: 'math-u4',
        term: 1,
        keyTopics: ['sin, cos, tan definitions', 'Proving identities without calculator', 'Complementary angles'],
        keyTopicsAr: ['تعريفات جا وجتا وظا في المثلث القائم', 'إثبات صحة المتطابقات بدون حاسبة', 'العلاقة بين الزاويتين المتتامتين'],
        summaryNote: 'If sin(A) = cos(B), then m(∠A) + m(∠B) = 90°.',
        summaryNoteAr: 'سؤال مضمون في الامتحان: إذا كان sin(A) = cos(B) فإن قياس الزاوية A + الزاوية B = 90°.'
      }
    ],
    quizzes: [
      {
        id: 'quiz-math-u1',
        unitId: 'math-u1',
        unitTitle: 'Unit 1: Relations & Functions',
        unitTitleAr: 'الوحدة الأولى: حاصل الضرب الديكارتي والدوال',
        title: 'Algebra Unit 1 Comprehensive Test',
        titleAr: 'اختبار الجبر الدوري: حاصل الضرب الديكارتي والدوال',
        term: 1,
        timeLimitMinutes: 20,
        totalMarks: 25,
        questions: [
          {
            id: 'q-math-1',
            question: 'If (x - 1, 11) = (8, y + 3), then the value of √(x + 2y) equals:',
            options: ['5', '7', '25', '9'],
            correctAnswerIndex: 0,
            explanation: 'x - 1 = 8 => x = 9. y + 3 = 11 => y = 8. Then √(x + 2y) = √(9 + 2(8)) = √(9 + 16) = √25 = 5.',
            explanationAr: 'بمساواة المساقط: س - 1 = 8 إذن س = 9. ص + 3 = 11 إذن ص = 8. بالتعويض: √(9 + 2×8) = √(25) = 5.',
            difficulty: 'medium'
          },
          {
            id: 'q-math-2',
            question: 'If n(X) = 3 and n(X × Y) = 12, then n(Y²) equals:',
            options: ['16', '4', '9', '36'],
            correctAnswerIndex: 0,
            explanation: 'n(Y) = 12 / 3 = 4. Therefore, n(Y²) = 4 × 4 = 16.',
            explanationAr: 'عدد عناصر ص = 12 ÷ 3 = 4. وعليه فإن n(Y²) = 4 × 4 = 16.',
            difficulty: 'easy'
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc-math-1',
        front: 'What is the condition for two lines with slopes m₁ and m₂ to be perpendicular?',
        back: 'm₁ × m₂ = -1 (The slope of one line is the negative reciprocal of the other).',
        category: 'Coordinate Geometry',
        hint: 'Multiply the slopes together.'
      },
      {
        id: 'fc-math-2',
        front: 'If sin(X) = cos(X), where X is an acute angle, what is m(∠X)?',
        back: 'm(∠X) = 45° (Because tan(X) = 1, and 45° + 45° = 90°).',
        category: 'Trigonometry',
        hint: 'The only acute angle where sine equals cosine.'
      },
      {
        id: 'fc-math-3',
        front: 'State the distance formula between points (x₁, y₁) and (x₂, y₂):',
        back: 'Distance = √[(x₂ - x₁)² + (y₂ - y₁)²] length units.',
        category: 'Coordinate Geometry',
        hint: 'Derived from the Pythagorean theorem.'
      },
      {
        id: 'fc-math-4',
        front: 'What is the slope of any horizontal line parallel to the X-axis?',
        back: 'Slope = 0 (Zero).',
        category: 'Slope Laws',
        hint: 'Δy is equal to 0.'
      }
    ]
  },
  {
    id: 'science',
    name: 'Science (Physics, Optics, Astronomy & Biology)',
    nameAr: 'العلوم باللغة الإنجليزية (Science Prep 3)',
    track: 'languages',
    category: 'science',
    icon: 'Atom',
    accentColor: '#059669',
    bgLight: '#ecfdf5',
    description: 'Egyptian Prep 3 Science curriculum in English: Motion & Acceleration, Light Energy (Mirrors & Lenses), Universe, and Cell Division.',
    descriptionAr: 'منهج العلوم لمدارس اللغات والمسار الإنجليزي: الحركة والسرعة والعجلة، الطاقة الضوئية والمرايا والعدسات ورسم مسارات الأشعة، الكون، والتكاثر والانقسام الخلوي.',
    units: [
      {
        id: 'sci-u1',
        number: 1,
        title: 'Unit 1: Force and Motion',
        titleAr: 'الوحدة الأولى: القوى والحركة (Force and Motion)',
        description: 'Movement in one direction, Speed formulas, Uniform Acceleration, Graphs, Scalars and Vectors.',
        descriptionAr: 'السرعة المنتظمة وغير المنتظمة والمتوسطة والنسبية، العجلة وقوانينها، الرسوم البيانية، والكميات القياسية والمتجهة.',
        term: 1,
        lessons: [
          'Lesson 1: Movement in one direction & Speed',
          'Lesson 2: Graphic representation & Acceleration',
          'Lesson 3: Physical quantities: Scalars and Vectors'
        ],
        lessonsAr: [
          'الدرس 1: الحركة في اتجاه واحد ومفاهيم السرعة',
          'الدرس 2: التمثيل البياني للحركة والعجلة المنتظمة',
          'الدرس 3: الكميات الفيزيائية القياسية والمتجهة'
        ]
      },
      {
        id: 'sci-u2',
        number: 2,
        title: 'Unit 2: Light Energy (Mirrors & Lenses)',
        titleAr: 'الوحدة الثانية: الطاقة الضوئية (المرايا والعدسات)',
        description: 'Reflection, Concave & Convex mirrors, Lenses, Ray diagrams, Vision defects (Myopia & Hyperopia).',
        descriptionAr: 'انعكاس الضوء، المرايا المستوية والكروية، العدسات المحدبة والمقعرة، مسارات الأشعة، وعيوب الإبصار وطرق علاجها.',
        term: 1,
        lessons: [
          'Lesson 1: Mirrors (Plane, Concave, and Convex)',
          'Lesson 2: Lenses and Vision Defects'
        ],
        lessonsAr: [
          'الدرس 1: المرايا المستوية والكروية ومسارات الأشعة',
          'الدرس 2: العدسات وعلاج قصر وطول النظر'
        ]
      }
    ],
    resources: [
      {
        id: 'sci-bk-1',
        title: 'Official Ministry Science Book (English Track) - Term 1',
        titleAr: 'كتاب المدرسة الرسمي للعلوم باللغات - الترم الأول',
        type: 'textbook',
        pagesCount: 104,
        fileSize: '16.2 MB',
        description: 'Complete Ministry Science textbook for Prep 3 with experiments, diagrams, and end-of-unit tests.',
        descriptionAr: 'الكتاب المدرسي المعتمد للعلوم باللغة الإنجليزية شاملاً التجارب العملية ورسومات المرايا والعدسات وأسئلة الوزارة.',
        term: 1,
        downloadCount: 16800
      },
      {
        id: 'sci-sum-1',
        title: 'Complete "Give Reason" & Scientific Terms Dictionary',
        titleAr: 'موسوعة أسئلة (علل - Give Reason) والمصطلحات العلمية الشاملة',
        type: 'summary',
        pagesCount: 20,
        fileSize: '3.9 MB',
        description: 'All Give Reason questions and definitions from Egyptian past exams with precise model answers.',
        descriptionAr: 'تجميعة شاملة لكل أسئلة علل لما يأتي مع الإجابة النموذجية المعتمدة في التصحيح الوزاري ومفاهيم الفيزياء والأحياء.',
        term: 1,
        downloadCount: 26500
      }
    ],
    videos: [
      {
        id: 'sci-v1',
        title: 'Motion, Speed & Acceleration Formulas with Exam Problems',
        titleAr: 'شرح الوحدة الأولى: السرعة والعجلة والرسومات البيانية وحل مسائل الامتحانات',
        teacherName: 'دكتور وليد عيسى (خبير تدريس العلوم والساينس)',
        channelName: 'قناة مدرستنا 1 (الرسمية)',
        duration: '48:30',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'Science prep 3 first term unit 1 motion speed acceleration دكتور وليد عيسى',
        unitId: 'sci-u1',
        term: 1,
        keyTopics: ['Speed calculation', 'Uniform acceleration graphs', 'Relative speed rules'],
        keyTopicsAr: ['قوانين السرعة والعجلة', 'رسم وتفسير منحنيات (ف - ز) و (ع - ز)', 'حساب السرعة النسبية'],
        summaryNote: 'When moving in opposite directions, relative speed = speed₁ + speed₂. If same direction: subtract!',
        summaryNoteAr: 'قاعدة السرعة النسبية: في نفس الاتجاه = الفرق بين السرعتين، وفي عكس الاتجاه = مجموع السرعتين.',
        alternativeTeachers: [
          {
            teacherName: 'مستر رامي النجار',
            channelName: 'Science Hub Egypt',
            searchQuery: 'Prep 3 science term 1 motion in one direction Ramy Elnaggar'
          }
        ]
      }
    ],
    quizzes: [
      {
        id: 'quiz-sci-u1',
        unitId: 'sci-u1',
        unitTitle: 'Unit 1: Force and Motion',
        unitTitleAr: 'الوحدة الأولى: القوى والحركة',
        title: 'Science Unit 1 Motion & Acceleration Test',
        titleAr: 'اختبار العلوم الدوري: الحركة والعجلة والكميات الفيزيائية',
        term: 1,
        timeLimitMinutes: 20,
        totalMarks: 20,
        questions: [
          {
            id: 'q-sci-1',
            question: 'A car moves with uniform speed of 72 km/h. Its speed in meters per second (m/s) equals:',
            options: ['20 m/s', '25 m/s', '15 m/s', '36 m/s'],
            correctAnswerIndex: 0,
            explanation: '72 × (5/18) = 20 m/s.',
            explanationAr: 'للتحويل من كم/س إلى م/ث نضرب في (5 ÷ 18): 72 × (5/18) = 20 م/ث.',
            difficulty: 'easy'
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc-sci-1',
        front: 'What is the relation between the radius of curvature (R) and focal length (f) of a spherical mirror?',
        back: 'Radius of curvature R = 2 × f (or focal length f = R / 2).',
        category: 'Optics',
        hint: 'Half the radius.'
      },
      {
        id: 'fc-sci-2',
        front: 'How is Short-sightedness (Myopia) treated medically?',
        back: 'Treated using medical eyeglasses with Concave lenses (عدسة مقعرة) to diverge rays so they focus on the retina.',
        category: 'Vision Defects',
        hint: 'Think diverging lens.'
      },
      {
        id: 'fc-sci-3',
        front: 'What is the acceleration of a body moving at a uniform (constant) speed?',
        back: 'Acceleration = 0 (Zero), because change in speed (Δv) equals zero.',
        category: 'Motion Physics',
        hint: 'Acceleration measures rate of CHANGE in velocity.'
      }
    ]
  },
  {
    id: 'arabic',
    name: 'اللغة العربية (Arabic Language)',
    nameAr: 'اللغة العربية والتربية الإسلامية',
    track: 'general',
    category: 'arabic',
    icon: 'Feather',
    accentColor: '#0284c7',
    bgLight: '#f8fafc',
    description: 'Egyptian Prep 3 Arabic curriculum: النصوص الأدبية، القراءة المتحررة، النحو الشامل (المنادى، البدل، المدح والذم، الممنوع من الصرف)، وقصة طموح جارية.',
    descriptionAr: 'منهج اللغة العربية للشهادة الإعدادية: نصوص عباد الرحمن وكن جميلاً ورحمة ومحبة، دروس سميرة موسى وطريق النور، قواعد النحو المقررة، وقصة طموح جارية.',
    units: [
      {
        id: 'ara-u1',
        number: 1,
        title: 'الوحدة الأولى: قيم وحياة',
        titleAr: 'الوحدة الأولى: قيم وحياة (عباد الرحمن وكن جميلاً)',
        description: 'نص عباد الرحمن (قرآن كريم)، نص كن جميلاً، سميرة موسى، والنحو: المنادى وأنواعه.',
        descriptionAr: 'نص عباد الرحمن ومواطن الجمال، قصيدة كن جميلاً لإيليا أبو ماضي، درس سميرة موسى، وقاعدة المنادى المعرب والمبني.',
        term: 1,
        lessons: [
          'الدرس الأول: نص عباد الرحمن (سورة الفرقان)',
          'الدرس الثاني: نص كن جميلاً (إيليا أبو ماضي)',
          'الدرس الثالث: قراءة - سميرة موسى',
          'قواعد النحو: المنادى وأنواعه'
        ],
        lessonsAr: [
          'نص عباد الرحمن القرآني ومواطن الجمال',
          'نص كن جميلاً وفلسفة التفاؤل',
          'درس سميرة موسى وتفوقها العلمي',
          'النحو: إعراب وبناء المنادى وحكم نداء ما فيه أل'
        ]
      }
    ],
    resources: [
      {
        id: 'ara-bk-1',
        title: 'كتاب المدرسة الرسمي للغة العربية - الترم الأول',
        titleAr: 'كتاب الوزارة للغة العربية والقصة والنصوص - الترم الأول',
        type: 'textbook',
        pagesCount: 136,
        fileSize: '19.8 MB',
        description: 'الكتاب المدرسي المعتمد للغة العربية وقصة طموح جارية وتمارين النحو والتعبير.',
        descriptionAr: 'كتاب وزارة التربية والتعليم كاملاً يشمل دروس القراءة والنصوص المقررة وفصول القصة والتدريبات النحوية.',
        term: 1,
        downloadCount: 17200
      },
      {
        id: 'ara-sum-1',
        title: 'سفينة النحو الذهبية للشهادة الإعدادية',
        titleAr: 'سفينة النحو الذهبية: المنادى والبدل والمدح والذم والممنوع من الصرف',
        type: 'summary',
        pagesCount: 22,
        fileSize: '4.5 MB',
        description: 'شرح مبسط لقواعد النحو الأربعة المقررة مع 100 جملة إعراب من امتحانات المحافظات السابقة.',
        descriptionAr: 'مذكرة النحو الأكثر طلباً في مصر: جداول التفرقة بين المنادى المعرب والمبني، وأنواع البدل، وصور فاعل نعم وبئس.',
        term: 1,
        downloadCount: 28900
      }
    ],
    videos: [
      {
        id: 'ara-v1',
        title: 'شرح النحو كاملاً: درس المنادى بجميع أنواعه مع حل تدريبات الامتحانات',
        titleAr: 'النحو: المنادى وأنواعه بالتفصيل وأسرار استخراجه من القطعة بسهولة',
        teacherName: 'أستاذ سامح جاد (كبير معلمي اللغة العربية)',
        channelName: 'قناة مدرستنا 1 (وزارة التربية والتعليم)',
        duration: '44:20',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'شرح درس المنادى كامل تالتة اعدادي ترم اول استاذ سامح جاد',
        unitId: 'ara-u1',
        term: 1,
        keyTopics: ['المنادى المعرب والمبني', 'حكم نداء ما فيه أل', 'إعراب المنادى المضاف لياء المتكلم'],
        keyTopicsAr: ['التفرقة بين المنادى المضاف والشبيه بالمضاف والنكرة', 'نداء أيها وأيتها وإعراب الاسم بعدها', 'حل قطع الامتحانات السابقة'],
        summaryNote: 'في نداء (أيها الطالب): أيّ هي المنادى مبني على الضم في محل نصب، والطالب نعت مرفوع وعلامة رفعه الضمة.',
        summaryNoteAr: 'ثابت إعرابي في امتحانات المحافظات: (يا أيها الطالب) المنادى هو كلمة (أيّ) مبني على الضم في محل نصب، والهاء للتنبيه، والاسم المشتق بعدهما يعرب نعتاً مرفوعاً.',
        alternativeTeachers: [
          {
            teacherName: 'بسطتُهالك (مستر محمد صلاح)',
            channelName: 'قناة بسطتهالك',
            searchQuery: 'درس المنادى تالتة اعدادي ترم اول بسطتهالك محمد صلاح'
          }
        ]
      }
    ],
    quizzes: [
      {
        id: 'quiz-ara-u1',
        unitId: 'ara-u1',
        unitTitle: 'الوحدة الأولى: قيم وحياة',
        unitTitleAr: 'الوحدة الأولى: قيم وحياة والمنادى',
        title: 'اختبار اللغة العربية التفاعلي للوحدة الأولى',
        titleAr: 'اختبار الوحدة الأولى: النصوص والقراءة والنحو (المنادى)',
        term: 1,
        timeLimitMinutes: 20,
        totalMarks: 20,
        questions: [
          {
            id: 'q-ara-1',
            question: 'في قوله تعالى: (وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا)، معنى كلمة "هَوْنًا":',
            options: ['بسكينة ووقار وتواضع', 'بسرعة وخوف', 'بكسل وتثاقل', 'بفخر وخيلاء'],
            correctAnswerIndex: 0,
            explanation: 'يمشون على الأرض هوناً أي بسكينة ووقار وتواضع ولين جانب دون تكبر.',
            explanationAr: 'الهون في الآية الكريمة يعني السكينة والوقار والتواضع دون استعلاء أو كبرياء.',
            difficulty: 'easy'
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc-ara-1',
        front: 'ما هي أنواع المنادى المعرب (المنصوب بالفتحة أو الياء أو الكسرة)؟',
        back: '1. المنادى المضاف (يا طالبَ العلمِ)\n2. المنادى الشبيه بالمضاف (يا طالباً للعلمِ)\n3. المنادى النكرة غير المقصودة (يا غافلاً تنبّه).',
        category: 'قواعد النحو',
        hint: 'ثلاثة أنواع يكون حكمها الإعرابي النصب.'
      },
      {
        id: 'fc-ara-2',
        front: 'أعرب كلمة (المعلمُ) في جملة: "يا أيها المعلمُ أخلص في عملك":',
        back: 'نعت مرفوع وعلامة رفعه الضمة الظاهرة على آخره (والمنادى هو كلمة: أيّ مبني على الضم في محل نصب).',
        category: 'إعراب ثابت',
        hint: 'الاسم المشتق المعرف بأل بعد أيها يعرب نعتاً.'
      },
      {
        id: 'fc-ara-3',
        front: 'ما الفكرة الرئيسة التي دعا إليها إيليا أبو ماضي في نص "كن جميلاً"؟',
        back: 'الدعوة إلى التفاؤل والاستمتاع بجمال الحياة، وترك الشكوى والتشاؤم والخوف غير المبرر من الموت.',
        category: 'النصوص الأدبية',
        hint: 'كن جميلاً ترَ الوجود جميلاً.'
      }
    ]
  },
  {
    id: 'social',
    name: 'الدراسات الاجتماعية (Social Studies)',
    nameAr: 'الدراسات الاجتماعية (جغرافيا وتاريخ مصر)',
    track: 'general',
    category: 'social',
    icon: 'Globe',
    accentColor: '#b45309',
    bgLight: '#fffbeb',
    description: 'Egyptian Prep 3 Social Studies: جغرافية قارات العالم وتاريخ مصر الحديث.',
    descriptionAr: 'منهج الدراسات الاجتماعية للشهادة الإعدادية: تضاريس ومناخ وسكان قارات العالم، تاريخ مصر من المماليك والعثمانيين والحملة الفرنسية وثورة 1919 حتى ثورة 1952.',
    units: [
      {
        id: 'soc-u1',
        number: 1,
        title: 'الوحدة الأولى (جغرافيا): الجغرافيا الطبيعية للعالم',
        titleAr: 'الوحدة الأولى (جغرافيا): قارات العالم تضاريس ومناخ',
        description: 'الموقع الفلكي والجغرافي لقارات العالم، تضاريس العالم (الجبال والهضاب والسهول)، والأقاليم المناخية.',
        descriptionAr: 'موقع ومساحة قارات العالم، الجبال والهضاب والأنهار والسهول الفيضية، والأقاليم المناخية والنبات الطبيعي.',
        term: 1,
        lessons: [
          'الدرس الأول: قارات العالم (الموقع والمساحة)',
          'الدرس الثاني: تضاريس العالم',
          'الدرس الثالث: المناخ والنبات الطبيعي في العالم'
        ],
        lessonsAr: [
          'موقع قارات العالم وأكبر وأصغر القارات والمحيطات',
          'تضاريس آسيا وأفريقيا وأوروبا والأمريكتين وأستراليا',
          'توزيع الأقاليم المناخية والنبات الطبيعي'
        ]
      }
    ],
    resources: [
      {
        id: 'soc-bk-1',
        title: 'كتاب المدرسة الرسمي للدراسات الاجتماعية - الترم الأول',
        titleAr: 'كتاب الوزارة للدراسات الاجتماعية (الجغرافيا والتاريخ) - الترم الأول',
        type: 'textbook',
        pagesCount: 112,
        fileSize: '17.1 MB',
        description: 'الكتاب الوزاري المعتمد شاملاً خرائط قارات العالم وأسئلة بما تفسر وما النتائج المترتبة على الأحداث التاريخية.',
        descriptionAr: 'كتاب الوزارة كاملاً بخرائطه الملونة ومصادر التاريخ والوثائق وأنشطة التفكير للشهادة الإعدادية.',
        term: 1,
        downloadCount: 14800
      }
    ],
    videos: [
      {
        id: 'soc-v1',
        title: 'شرح تضاريس العالم كاملة وحل سؤال الخريطة المضمون في الامتحان',
        titleAr: 'جغرافيا: تضاريس قارات العالم بطريقة مبسطة وحل عقدة الخريطة الصماء',
        teacherName: 'أستاذ إبراهيم فتحي (خبير الدراسات الاجتماعية)',
        channelName: 'قناة مدرستنا 1 (التعليمية)',
        duration: '46:10',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'تضاريس العالم الصف الثالث الاعدادي دراسات اجتماعية ترم اول الخريطة',
        unitId: 'soc-u1',
        term: 1,
        keyTopics: ['أعلى قمم الجبال في العالم', 'أطول وأكبر الأنهار والسهول', 'طريقة حل الخريطة بالامتحان'],
        keyTopicsAr: ['تضاريس آسيا وأفريقيا وأمريكا الشمالية والجنوبية', 'هضبة التبت والبحيرات العظمى وسهل سيبيريا', 'توزيع الأنهار'],
        summaryNote: 'هضبة التبت في آسيا تسمى بسقف العالم بسبب ارتفاعها عن قمم الجبال المجاورة لها.',
        summaryNoteAr: 'سؤال بما تفسر دائم التكرار: تسمى هضبة التبت بسقف العالم لارتفاعها عن قمم الجبال المحيطة بها.',
        alternativeTeachers: [
          {
            teacherName: 'الخطة التعليمية',
            channelName: 'قناة الخطة التعليمية',
            searchQuery: 'دراسات اجتماعية تالتة اعدادي ترم اول تضاريس العالم الخطة'
          }
        ]
      }
    ],
    quizzes: [
      {
        id: 'quiz-soc-u1',
        unitId: 'soc-u1',
        unitTitle: 'الوحدة الأولى (جغرافيا): الجغرافيا الطبيعية للعالم',
        unitTitleAr: 'الوحدة الأولى: تضاريس وخريطة العالم',
        title: 'اختبار الجغرافيا الدوري لتضاريس العالم',
        titleAr: 'اختبار تضاريس قارات العالم والخرائط الصماء',
        term: 1,
        timeLimitMinutes: 15,
        totalMarks: 20,
        questions: [
          {
            id: 'q-soc-1',
            question: 'أعلى قمة جبلية في العالم هي قمة ______ وتقع في قارة آسيا:',
            options: ['إفرست (جبال الهيمالايا)', 'كلمنجارو', 'مون بلان (الألب)', 'أكونكاجوا'],
            correctAnswerIndex: 0,
            explanation: 'قمة إفرست في جبال الهيمالايا هي أعلى قمة في العالم بارتفاع يزيد عن 8848 متراً.',
            explanationAr: 'قمة إفرست في سلسلة جبال الهيمالايا بوسط آسيا هي أعلى قمة في العالم.',
            difficulty: 'easy'
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc-soc-1',
        front: 'بم تفسر: تُعرف هضبة التبت في قارة آسيا باسم "سقف العالم"؟',
        back: 'بسبب شدة ارتفاعها عن قمم الجبال المجاورة والمحيطة بها.',
        category: 'جغرافيا العالم',
        hint: 'أعلى هضاب العالم.'
      },
      {
        id: 'fc-soc-2',
        front: 'ما هي أوسع السهول الفيضية النهرية في العالم، وفي أي قارة تقع؟',
        back: 'سهول حوض نهر الأمازون، وتقع في قارة أمريكا الجنوبية.',
        category: 'تضاريس وأنهار',
        hint: 'تغطيه أكبر غابة استوائية مطيرة.'
      },
      {
        id: 'fc-soc-3',
        front: 'في أي معركة أصبحت مصر رسمياً ولاية عثمانية وفي أي عام؟',
        back: 'معركة الريدانية عام 1517م (بصحراء العباسية) بهزيمة طومان باي.',
        category: 'تاريخ مصر الحديث',
        hint: 'بعد معركة مرج دابق في الشام.'
      }
    ]
  },
  {
    id: 'ict',
    name: 'Computer & ICT (Visual Basic .NET)',
    nameAr: 'الحاسب الآلي وتكنولوجيا المعلومات (ICT)',
    track: 'languages',
    category: 'ict',
    icon: 'Monitor',
    accentColor: '#4f46e5',
    bgLight: '#eef2ff',
    description: 'Egyptian Prep 3 Computer curriculum: Problem Solving, Flowcharts, and Visual Basic .NET.',
    descriptionAr: 'منهج الحاسب الآلي للشهادة الإعدادية: حل المشكلات، خرائط التدفق (Flowcharts)، وبيئة Visual Basic .NET.',
    units: [
      {
        id: 'ict-u1',
        number: 1,
        title: 'Unit 1: Problem Solving & Flowcharts',
        titleAr: 'الوحدة الأولى: أسلوب حل المشكلات وخرائط التدفق',
        description: 'Problem definition, Algorithm design, Flowchart standard shapes, Branches, and Loops.',
        descriptionAr: 'مراحل حل المشكلة، الرموز القياسية لخرائط التدفق (البداية/النهاية، الإدخال/الإخراج، المعالجة، القرار)، وخرائط التكرار.',
        term: 1,
        lessons: [
          'Lesson 1: Problem solving stages',
          'Lesson 2: Simple arithmetic flowcharts',
          'Lesson 3: Branching flowcharts (Decision diamond)',
          'Lesson 4: Looping flowcharts'
        ],
        lessonsAr: [
          'الدرس 1: مراحل حل المشكلة الخمسة وتوثيق البرنامج',
          'الدرس 2: خرائط التدفق البسيطة لحساب المساحة والمحيط',
          'الدرس 3: خرائط التفرع واتخاذ القرار',
          'الدرس 4: خرائط التكرار واستخدام العدادات'
        ]
      }
    ],
    resources: [
      {
        id: 'ict-bk-1',
        title: 'Official Ministry ICT Book (English Track) - Term 1',
        titleAr: 'كتاب الوزارة الرسمي للحاسب الآلي وتكنولوجيا المعلومات - الترم الأول',
        type: 'textbook',
        pagesCount: 84,
        fileSize: '12.4 MB',
        description: 'Official Ministry textbook covering flowcharts and VB.NET programming basics.',
        descriptionAr: 'الكتاب المدرسي المعتمد لطلاب اللغات والعام في الحاسب الآلي ورسم خرائط التدفق وأدوات الفيجوال بيسك.',
        term: 1,
        downloadCount: 11200
      }
    ],
    videos: [
      {
        id: 'ict-v1',
        title: 'Flowcharts from Zero to Mastery - All Exam Questions Solved',
        titleAr: 'خرائط التدفق من الصفر للاحتراف: رسم وفهم جميع أفكار الامتحانات في نصف ساعة',
        teacherName: 'مهندس حسام الدين (خبير مناهج الحاسب الآلي)',
        channelName: 'قناة مدرستنا 1 (التعليمية)',
        duration: '36:45',
        youtubeId: 'bTqVqk-2q2w',
        youtubeSearchQuery: 'شرح خرائط التدفق Flowcharts الصف الثالث الاعدادي حاسب الي كمبيوتر ترم اول',
        unitId: 'ict-u1',
        term: 1,
        keyTopics: ['Standard symbols', 'Decision branches', 'Loop flowcharts'],
        keyTopicsAr: ['رموز خريطة التدفق', 'خريطة طباعة الأعداد من 1 إلى 3', 'خريطة معرفة الرقم زوجي أم فردي'],
        summaryNote: 'Parallelogram = Input/Output, Rectangle = Process, Rhombus = Decision.',
        summaryNoteAr: 'قاعدة رسم الخريطة: متوازي الأضلاع للإدخال والإخراج، المستطيل للمعالجة والحساب، والمعين لاتخاذ القرار.',
        alternativeTeachers: [
          {
            teacherName: 'أستاذ ناصر الكمبيوتر',
            channelName: 'قناة الكمبيوتر وتكنولوجيا المعلومات',
            searchQuery: 'كمبيوتر تالتة اعدادي ترم اول شرح خرائط التدفق مستر ناصر'
          }
        ]
      }
    ],
    quizzes: [
      {
        id: 'quiz-ict-u1',
        unitId: 'ict-u1',
        unitTitle: 'Unit 1: Problem Solving & Flowcharts',
        unitTitleAr: 'الوحدة الأولى: خرائط التدفق وحل المشكلات',
        title: 'Computer & ICT Unit 1 Test',
        titleAr: 'اختبار الحاسب الآلي الدوري: خرائط التدفق و VB.NET',
        term: 1,
        timeLimitMinutes: 15,
        totalMarks: 20,
        questions: [
          {
            id: 'q-ict-1',
            question: 'The standard geometric shape used in flowcharts to represent a Decision is the:',
            options: ['Rhombus (Diamond)', 'Rectangle', 'Parallelogram', 'Oval'],
            correctAnswerIndex: 0,
            explanation: 'A rhombus/diamond is used for Decision making (e.g. Is N >= 50?) and has two or three output flowlines.',
            explanationAr: 'شكل المعين (Rhombus/Diamond) يستخدم لاتخاذ القرار والشرط وله مخرجان على الأقل (Yes / No).',
            difficulty: 'easy'
          }
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc-ict-1',
        front: 'ما الشكل الهندسي القياسي المستخدم في خريطة التدفق لتمثيل الإدخال والإخراج (Input / Output)؟',
        back: 'متوازي الأضلاع (Parallelogram) ويكتب داخله ألفاظ مثل: Read, Enter, Input أو Print, Output.',
        category: 'رموز الخرائط',
        hint: 'شكل ذو أربعة أضلاع متقابلة متوازية ومائلة.'
      },
      {
        id: 'fc-ict-2',
        front: 'ما هي أولى مراحل حل المشكلة (Problem Solving Stages)؟',
        back: 'تحديد المشكلة (Problem Definition): وتتضمن تحديد المخرجات المطلوبة والمدخلات المتوفرة وعمليات المعالجة.',
        category: 'مراحل حل المشكلات',
        hint: 'تسبق خطوة إعداد خطوات الحل الخوارزمية (Algorithm).'
      },
      {
        id: 'fc-ict-3',
        front: 'ما الفرق بين الخاصية (Name) والخاصية (Text) في لغة Visual Basic .NET؟',
        back: 'الخاصية Name: اسم الأداة البرمجي المستخدم في الكود.\nالخاصية Text: النص الظاهر للمستخدم على واجهة الأداة.',
        category: 'أدوات VB.NET',
        hint: 'أحدهما في الكود والآخر على الشاشة.'
      }
    ]
  }
];
