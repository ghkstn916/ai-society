export const modules = [
  {
    id: 'module1',
    title: '인공지능의 개념과 특성',
    description: '인공지능이 무엇인지, 인간 지능과 어떻게 다른지, AI 소프트웨어의 원리를 배웁니다.',
    color: 'blue',
    lessons: [
      {
        id: 'lesson1_1',
        title: '인공지능이란 무엇인가?',
        description: 'AI의 개념과 4가지 특성을 이해합니다.',
        duration: '30분',
        moduleId: 'module1',
      },
      {
        id: 'lesson1_2',
        title: '인공지능과 인간 지능의 차이',
        description: 'AI가 잘하는 것과 인간이 잘하는 것을 비교합니다.',
        duration: '35분',
        moduleId: 'module1',
      },
      {
        id: 'lesson1_3',
        title: 'AI 소프트웨어의 이해',
        description: '일반 소프트웨어와 AI 소프트웨어의 차이를 알아봅니다.',
        duration: '30분',
        moduleId: 'module1',
      },
      {
        id: 'quiz1',
        title: '모듈 1 형성평가',
        description: '인공지능의 개념과 특성 확인',
        duration: '15분',
        moduleId: 'module1',
        isQuiz: true,
      },
    ],
  },
  {
    id: 'module2',
    title: '인공지능과 사회 변화',
    description: '인공지능이 개인의 삶, 사회 각 분야, 직업에 어떤 변화를 가져오는지 탐색합니다.',
    color: 'green',
    lessons: [
      {
        id: 'lesson2_1',
        title: '인공지능과 개인 삶의 변화',
        description: '스마트폰, 개인 맞춤 서비스 등 AI가 바꾼 일상을 살펴봅니다.',
        duration: '30분',
        moduleId: 'module2',
      },
      {
        id: 'lesson2_2',
        title: '인공지능과 사회 각 분야의 변화',
        description: '의료·교통·제조·환경 분야의 AI 혁신을 알아봅니다.',
        duration: '35분',
        moduleId: 'module2',
      },
      {
        id: 'lesson2_3',
        title: '인공지능과 직업의 변화',
        description: '자동화 대체율과 인공지능 유창성, 미래 준비 방법을 배웁니다.',
        duration: '30분',
        moduleId: 'module2',
      },
      {
        id: 'quiz2',
        title: '모듈 2 형성평가',
        description: '인공지능과 사회 변화 확인',
        duration: '15분',
        moduleId: 'module2',
        isQuiz: true,
      },
    ],
  },
]

export const allLessons = modules.flatMap((m) => m.lessons)

export function getLessonById(lessonId) {
  return allLessons.find((l) => l.id === lessonId)
}

export function getAdjacentLessons(lessonId) {
  const idx = allLessons.findIndex((l) => l.id === lessonId)
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  }
}
