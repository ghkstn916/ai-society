import FormativeQuiz from '../../components/interactive/FormativeQuiz.jsx'

const questions = [
  {
    question: '인공지능의 개념으로 가장 적절한 것은?',
    options: [
      '인터넷에 연결된 모든 컴퓨터 시스템',
      '인간의 지능 전부나 일부를 기계로 구현한 기술',
      '사람이 모든 규칙을 코딩해 넣은 자동화 프로그램',
      '데이터를 저장하는 데이터베이스 시스템',
      '인터넷 서비스를 제공하는 서버 컴퓨터',
    ],
    answer: 1,
    explanation: '인공지능은 인간의 지능으로 수행할 수 있는 인식, 사고, 학습 활동 등을 기계가 할 수 있도록 구현하는 기술입니다.',
  },
  {
    question: '튜링 테스트를 통과한다는 것의 의미는?',
    options: [
      '컴퓨터가 체스 게임에서 세계 챔피언을 이기는 것',
      '컴퓨터가 100개의 질문에 모두 정확히 답하는 것',
      '심사원이 컴퓨터와 사람을 구분하지 못하는 것',
      '컴퓨터가 1초에 1억 번 이상 계산하는 것',
      '컴퓨터가 스스로 새로운 질문을 만들어내는 것',
    ],
    answer: 2,
    explanation: '튜링 테스트는 심사원이 메시지 교환 후 어느 쪽이 컴퓨터인지 구별하지 못할 때 통과로 인정됩니다.',
  },
  {
    question: '현재 우리 주변 대부분의 AI는 어떤 유형인가?',
    options: [
      '강한 AI — 범용적이고 자아를 가진 AI',
      '약한 AI — 특정 영역에서만 전문가 수준인 AI',
      '감성 AI — 인간과 같이 감정을 느끼는 AI',
      '창의적 AI — 새로운 개념을 독자적으로 만드는 AI',
      '생물학적 AI — 살아있는 세포로 만들어진 AI',
    ],
    answer: 1,
    explanation: '알파고, 왓슨 등 현재 AI는 특정 영역에서만 뛰어난 약한 AI입니다.',
  },
  {
    question: '다음 중 AI 소프트웨어에 해당하는 것은?',
    options: [
      '계산기 앱',
      '메모장 프로그램',
      '유튜브 영상 추천 시스템',
      '음악 재생 앱',
      '문서 편집기',
    ],
    answer: 2,
    explanation: '유튜브 추천 시스템은 시청 기록을 학습해 취향에 맞는 영상을 스스로 추천하는 AI 소프트웨어입니다.',
  },
  {
    question: '지식 기반 AI 소프트웨어의 핵심 구성 요소는?',
    options: [
      '데이터와 학습 알고리즘',
      '하드웨어와 인터넷 연결',
      '전문가의 지식 베이스와 추론 기관',
      '그래픽카드와 CPU',
      '소셜 미디어 데이터와 사용자 정보',
    ],
    answer: 2,
    explanation: '지식 기반 AI는 전문가의 지식을 모은 지식 베이스와 그것을 활용해 결론을 내리는 추론 기관으로 구성됩니다.',
  },
  {
    type: 'text',
    question: '이번 수업에서 가장 인상 깊었던 내용이나 더 알고 싶은 점을 자유롭게 써 보세요. (피드백)',
    placeholder: '예: 튜링 테스트가 흥미로웠어요. 강한 AI는 언제쯤 등장할지 궁금합니다.',
  },
]

export default function Quiz1() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">모듈 1 · 형성평가</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능의 개념과 특성</h1>
        <p className="text-slate-500 text-sm">모듈 1에서 배운 내용을 스스로 점검해 보세요. 5문항 + 피드백 1문항 · 제출 후 해설 확인</p>
      </header>
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        💡 모든 문항에 답한 후 제출 버튼을 눌러 결과를 확인하세요.
      </div>
      <FormativeQuiz questions={questions} storageKey="ai-m1-formative" quizId="quiz1" />
    </article>
  )
}
