import FormativeQuiz from '../../components/interactive/FormativeQuiz.jsx'

const questions = [
  {
    question: 'AI 맞춤형 추천 서비스에서 발생할 수 있는 "필터 버블" 현상은?',
    options: [
      '추천 서비스가 너무 느려지는 현상',
      '관심 분야만 반복 노출되어 다양한 시각을 접하기 어려워지는 현상',
      '배터리가 빨리 소모되는 현상',
      '인터넷 연결이 자주 끊기는 현상',
      '광고가 너무 많이 표시되는 현상',
    ],
    answer: 1,
    explanation: '필터 버블은 알고리즘이 나와 비슷한 정보만 보여줘 편향된 시각이 강화되는 현상입니다.',
  },
  {
    question: '2018년 AI가 자동 진단에서 미국 FDA 인증을 받은 질병은?',
    options: [
      '폐암', '코로나19', '당뇨성 망막증', '알츠하이머', '심장 질환',
    ],
    answer: 2,
    explanation: '2018년 AI가 20년 경력 안과 의사 수준으로 당뇨성 망막증을 진단해 미국 식약청 인증을 받았습니다.',
  },
  {
    question: '자동화 대체율이 낮은 직업 상위 10개에 해당하지 않는 것은?',
    options: [
      '화가 및 조각가', '작가 및 관련 전문가', '경리 사무원', '무용가 및 안무가', '사진작가',
    ],
    answer: 2,
    explanation: '경리 사무원은 규칙적이고 반복적인 작업이 많아 자동화 대체율이 높은 직업군에 속합니다.',
  },
  {
    question: '인공지능 유창성(AI Fluency)에 대한 설명으로 옳은 것은?',
    options: [
      'AI 프로그래밍 코드를 작성하는 능력',
      'AI와 인간의 강점을 파악하고 적절한 업무에 AI를 활용하는 능력',
      'AI보다 모든 분야에서 더 잘하는 능력',
      'AI를 완전히 차단하고 인간만으로 업무를 처리하는 능력',
      'AI 관련 시험에서 만점을 받는 능력',
    ],
    answer: 1,
    explanation: 'AI 유창성은 AI와 인간이 각각 잘하는 영역을 이해하고 협업하는 미래 필수 역량입니다.',
  },
  {
    question: '우리나라 인공지능 국가전략(2019)의 목표 경제 효과는?',
    options: [
      '2030년까지 최대 100조 원', '2030년까지 최대 455조 원',
      '2025년까지 최대 100조 원', '2035년까지 최대 1000조 원', '2030년까지 최대 55조 원',
    ],
    answer: 1,
    explanation: '2019년 제53회 국무회의에서 2030년까지 최대 455조 원의 경제 효과를 창출하겠다는 목표를 발표했습니다.',
  },
]

export default function Quiz2() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">모듈 2 · 형성평가</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 사회 변화</h1>
        <p className="text-slate-500 text-sm">모듈 2에서 배운 내용을 스스로 점검해 보세요. 5문항 · 제출 후 해설 확인</p>
      </header>
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        💡 모든 문항에 답한 후 제출 버튼을 눌러 결과를 확인하세요.
      </div>
      <FormativeQuiz questions={questions} storageKey="ai-m2-formative" />
    </article>
  )
}
