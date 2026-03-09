import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'
import SortCards from '../../components/interactive/SortCards.jsx'

const jobItems = [
  { id: 'j1', label: '버스 기사', correct: 'A' },
  { id: 'j2', label: '화가 및 조각가', correct: 'B' },
  { id: 'j3', label: '경리 사무원', correct: 'A' },
  { id: 'j4', label: '작가 및 관련 전문가', correct: 'B' },
  { id: 'j5', label: '택배원', correct: 'A' },
  { id: 'j6', label: '무용가 및 안무가', correct: 'B' },
  { id: 'j7', label: '조세 행정 사무원', correct: 'A' },
  { id: 'j8', label: '사진작가', correct: 'B' },
]

export default function Lesson2_3() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">모듈 2 · 레슨 3</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 직업의 변화</h1>
        <p className="text-slate-500 text-sm">자동화 대체율, 새로운 직업, 인공지능 유창성 — 미래를 어떻게 준비해야 할까요?</p>
      </header>

      <section className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <h2 className="font-bold text-green-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-green-900">
          <li className="flex items-start gap-2"><span>•</span> 자동화 대체율이 높은/낮은 직업의 특징을 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 인공지능 유창성의 개념을 이해한다</li>
          <li className="flex items-start gap-2"><span>•</span> AI 시대를 준비하는 구체적인 자세를 생각할 수 있다</li>
        </ul>
      </section>

      {/* 산업 혁명과 직업 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">1. 산업 혁명과 직업의 역사</h2>
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=260&fit=crop"
          alt="산업 혁명 자동화"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 leading-relaxed">
          <p>산업 혁명이 진행될 때마다 사람들은 <strong>"이제 일자리가 없어진다"</strong>는 두려움을 가졌습니다. 하지만 역사를 보면 기존 일자리가 줄어드는 동시에 <strong>새로운 일자리도 생겨났습니다.</strong></p>
          <p className="mt-2">4차 산업 혁명의 핵심 기술인 AI도 마찬가지입니다. AI 변호사가 법률 사무원의 일자리를 위협하는 동시에, AI 변호사를 개발하는 새로운 직업이 생겨나고 있습니다.</p>
        </div>
      </section>

      {/* 자동화 대체율 분류 활동 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">2. 활동: 자동화 대체율 분류하기</h2>
        <p className="text-sm text-slate-600 mb-1">아래 직업들을 자동화 대체율이 높은 직업과 낮은 직업으로 분류해 보세요.</p>
        <p className="text-xs text-slate-400 mb-3">힌트: 반복적·정형화된 작업 vs 창의적·감성적 작업</p>
        <SortCards
          items={jobItems}
          groupA="대체율 높음 (자동화 위험)"
          groupB="대체율 낮음 (AI가 대체 어려움)"
          storageKey="ai-m2l3-sort-0"
        />
        <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          💡 매뉴얼에 따라 규칙적으로 반복하는 직업 = 대체 위험 높음. 창의력·감성·독창성이 필요한 직업 = 대체 어려움.
        </div>
      </section>

      {/* 대체율 특징 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">3. 자동화 대체율이 높은 직업의 특징</h2>
        <div className="space-y-3">
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4">
            <p className="font-bold text-red-700 mb-2 text-sm">⚠️ 대체 위험이 높은 직업</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 매뉴얼에 따라 규칙적·정형화된 작업을 하는 직업</li>
              <li>• 숙련 전문직이더라도 정해진 절차를 반복하는 직업</li>
              <li className="text-slate-400 text-xs pt-1">예: 버스 기사, 경리 사무원, 법률 사무원, 영상의학 전문의, 관제사</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
            <p className="font-bold text-green-700 mb-2 text-sm">✅ 대체가 어려운 직업</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 창의력·감성·공감 능력이 핵심인 직업</li>
              <li>• 복잡한 인간관계와 상황 판단이 필요한 직업</li>
              <li className="text-slate-400 text-xs pt-1">예: 화가, 작가, 무용가, 상담사, 사회복지사</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 인공지능 유창성 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">4. 미래 핵심 역량: 인공지능 유창성</h2>
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=250&fit=crop"
          alt="미래 직업 준비"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="rounded-2xl bg-gradient-to-br from-green-600 to-teal-600 text-white p-5 mb-4">
          <p className="text-xs font-semibold text-green-100 mb-1">핵심 개념</p>
          <p className="font-bold">인공지능 유창성 (AI Fluency)</p>
          <p className="text-sm text-green-100 mt-1">인간과 AI의 능력을 파악하고, 적절한 업무에 AI를 활용할 수 있는 미래 인재의 필수 능력</p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          AI가 반복 작업을 처리하고, 인간은 <strong>창의적이고 감성적인 업무</strong>에 집중하는 시대가 오고 있습니다. AI와 경쟁하는 것이 아니라, <strong>AI와 협업</strong>할 수 있는 인재가 필요합니다.
        </p>
        <FlipReveal
          question="AI 시대를 살아갈 나에게 가장 필요한 역량은 무엇이라고 생각하나요?"
          answer="정답은 없지만, 전문가들이 강조하는 역량은 ① AI 도구를 이해하고 활용하는 디지털 리터러시, ② AI가 대체하기 어려운 창의력·공감 능력·비판적 사고, ③ 변화에 적응하고 새로운 것을 배우는 학습 능력입니다."
          storageKey="ai-m2l3-flip-0"
        />
      </section>

      {/* 인공지능 관련 유망 직업 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">5. AI 관련 유망 직업</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            { title: '인공지능 엔지니어', desc: 'AI 솔루션 설계 및 개발 담당' },
            { title: 'AI Technology R&D', desc: '최신 기술 동향을 탐색하고 AI 응용 분야 기반 기술 개발' },
            { title: '데이터 사이언티스트', desc: '대규모 데이터 분석으로 의사결정 지원' },
            { title: '기계학습 전문가', desc: 'AI가 데이터를 학습해 정확한 예측을 하도록 모델 설계' },
            { title: 'AI 윤리 전문가', desc: 'AI 시스템의 공정성·투명성·안전성 검토' },
          ].map(job => (
            <div key={job.title} className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <span className="text-lg mt-0.5">💼</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{job.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{job.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 퀴즈 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">✏️ 확인 퀴즈</h2>
        <ChoiceQuiz
          question="자동화 대체율이 낮은 직업의 특징으로 가장 적절한 것은?"
          options={[
            '매뉴얼에 따라 반복적으로 업무를 수행한다',
            '고정된 절차에 따라 규칙적인 정형화 정도가 높다',
            '창의력, 감성, 공감 능력이 핵심 역할을 한다',
            '정확한 계산 능력이 가장 중요한 직업이다',
            '데이터 입력과 처리가 주요 업무이다',
          ]}
          answer={2}
          explanation="AI가 대체하기 어려운 직업은 창의력, 감성, 공감, 예술적 표현 능력 등이 핵심인 직업입니다."
          storageKey="ai-m2l3-quiz-0"
        />
        <ChoiceQuiz
          question="인공지능 유창성(AI Fluency)의 정확한 의미는?"
          options={[
            'AI 프로그래밍 언어를 능숙하게 구사하는 능력',
            '인간과 AI의 능력을 파악하고 적절한 업무에 AI를 활용하는 능력',
            'AI보다 더 빠르게 계산하는 능력',
            'AI를 완전히 통제하고 지시하는 능력',
            'AI 관련 자격증을 여러 개 보유하는 것',
          ]}
          answer={1}
          explanation="AI 유창성은 AI와 인간의 강점을 이해하고, 상황에 맞게 AI를 협업 도구로 활용하는 미래 핵심 역량입니다."
          storageKey="ai-m2l3-quiz-1"
        />
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 일자리를 없애기도 하지만 동시에 새로운 직업을 만들어낸다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 반복·정형화 직업은 대체율 높음 / 창의·감성 직업은 대체율 낮음</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 인공지능 유창성: AI와 협업하는 능력이 미래 필수 역량</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI를 두려워하지 말고 정확히 이해하고 활용하는 자세가 중요하다</li>
        </ul>
      </section>
    </article>
  )
}
