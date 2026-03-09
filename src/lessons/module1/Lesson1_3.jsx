import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'
import SortCards from '../../components/interactive/SortCards.jsx'

const swItems = [
  { id: 's1', label: '문서 작성 프로그램', correct: 'A' },
  { id: 's2', label: '얼굴 인식 잠금 해제', correct: 'B' },
  { id: 's3', label: '음악 재생 앱', correct: 'A' },
  { id: 's4', label: '유튜브 영상 추천', correct: 'B' },
  { id: 's5', label: '계산기 앱', correct: 'A' },
  { id: 's6', label: '스팸 메일 자동 분류', correct: 'B' },
]

export default function Lesson1_3() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">모듈 1 · 레슨 3</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">AI 소프트웨어의 이해</h1>
        <p className="text-slate-500 text-sm">일반 소프트웨어와 AI 소프트웨어의 차이를 이해하고, AI 소프트웨어의 두 가지 유형을 구분합니다.</p>
      </header>

      <section className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
        <h2 className="font-bold text-blue-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-blue-900">
          <li className="flex items-start gap-2"><span>•</span> 일반 소프트웨어와 AI 소프트웨어의 차이를 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 지식 기반 AI 소프트웨어와 학습 기반 AI 소프트웨어를 구분할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 주변 제품이 AI인지 아닌지 판단할 수 있다</li>
        </ul>
      </section>

      {/* 도입 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">🤔 모든 소프트웨어가 AI일까?</h2>
        <img
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&h=270&fit=crop"
          alt="소프트웨어 코드"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <p className="text-sm text-slate-600 leading-relaxed">
          예전에는 자동화된 기계도 인공지능이라고 불렀습니다. 냉장고에 온도 자동 조절 기능이 있다고 해서 AI가 들어있다고 과장 광고하는 경우도 있었죠. 하지만 <strong>모든 소프트웨어가 AI는 아닙니다.</strong>
        </p>
        <FlipReveal
          question="계산기 앱도 인공지능일까요? 이유도 함께 생각해보세요."
          answer="아닙니다. 계산기는 개발자가 미리 정해 놓은 수식을 그대로 실행할 뿐입니다. 새로운 상황에 적응하거나 스스로 규칙을 바꾸지 않기 때문에 일반 소프트웨어에 해당합니다."
          storageKey="ai-m1l3-flip-0"
        />
      </section>

      {/* 일반 vs AI 소프트웨어 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">1. 일반 소프트웨어 vs AI 소프트웨어</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <p className="font-bold text-slate-700 mb-2 text-sm">📄 일반 소프트웨어</p>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>• 처리 과정과 기능이 <strong>미리 정해져 있음</strong></li>
              <li>• 개발자가 모든 규칙을 직접 코딩</li>
              <li>• 예외 상황 처리가 어려움</li>
              <li className="text-slate-400 text-xs pt-1">예: 문서 작성, 계산기, 음악 재생</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
            <p className="font-bold text-blue-700 mb-2 text-sm">🤖 AI 소프트웨어</p>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>• 데이터·알고리즘으로 <strong>스스로 답을 찾음</strong></li>
              <li>• 입력에 대한 처리가 유연함</li>
              <li>• 주변 상황에 빠르게 적응</li>
              <li className="text-slate-400 text-xs pt-1">예: 얼굴 인식, 추천 시스템, 번역</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 분류 활동 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">2. 활동: AI인가 아닌가?</h2>
        <p className="text-sm text-slate-600 mb-3">아래 소프트웨어를 올바르게 분류해 보세요.</p>
        <SortCards
          items={swItems}
          groupA="일반 소프트웨어"
          groupB="AI 소프트웨어"
          storageKey="ai-m1l3-sort-0"
        />
      </section>

      {/* 두 가지 AI 소프트웨어 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">3. AI 소프트웨어의 두 가지 유형</h2>
        <img
          src="/ai-society/image/17.jpg"
          alt="AI 소프트웨어 두 가지 유형"
          className="w-full rounded-2xl object-contain mb-4 shadow bg-white p-1"
        />
        <div className="space-y-4">
          <div className="rounded-2xl bg-purple-50 border border-purple-200 p-5">
            <p className="font-bold text-purple-800 mb-2">🧠 지식 기반 AI 소프트웨어</p>
            <p className="text-sm text-slate-700 mb-3">전문가의 지식을 모아 <strong>지식 베이스(Knowledge Base)</strong>를 만들고, 추론 기관이 사용자의 요구에 답합니다.</p>
            <img
              src="/ai-society/image/18_1.png"
              alt="지식 기반 AI 소프트웨어 구조"
              className="w-full rounded-xl object-contain mb-3 bg-white shadow-sm"
            />
            <p className="text-xs bg-white rounded-xl px-3 py-2 text-slate-500">
              💡 예: 브레드봇(AI 제빵 로봇) — 제빵사의 비법을 지식 베이스에 저장해두고, 기온·습도에 따라 온도와 시간을 조절해 빵을 굽습니다.
            </p>
          </div>
          <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
            <p className="font-bold text-green-800 mb-2">📊 학습 기반 AI 소프트웨어</p>
            <p className="text-sm text-slate-700 mb-3"><strong>학습 알고리즘</strong>을 통해 데이터에서 스스로 규칙을 찾아내고, 사용자 요구를 처리합니다.</p>
            <img
              src="/ai-society/image/18_2.png"
              alt="학습 기반 AI 소프트웨어 구조"
              className="w-full rounded-xl object-contain mb-3 bg-white shadow-sm"
            />
            <p className="text-xs bg-white rounded-xl px-3 py-2 text-slate-500">
              💡 예: 스마트폰 카메라 — 수백만 장의 사진 데이터를 학습해 인물·풍경을 자동 인식하고 최적 설정으로 촬영합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 퀴즈 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">✏️ 확인 퀴즈</h2>
        <ChoiceQuiz
          question="일반 소프트웨어와 AI 소프트웨어의 가장 큰 차이는?"
          options={[
            '일반 소프트웨어는 인터넷이 필요하고, AI는 필요 없다',
            'AI 소프트웨어는 데이터와 알고리즘으로 스스로 답을 찾는 반면, 일반 소프트웨어는 미리 정해진 절차를 따른다',
            '일반 소프트웨어만 스마트폰에서 실행 가능하다',
            'AI 소프트웨어는 항상 학습 데이터가 필요 없다',
            '일반 소프트웨어는 버그가 없지만 AI 소프트웨어는 버그가 많다',
          ]}
          answer={1}
          explanation="AI 소프트웨어는 지식 베이스나 학습 알고리즘을 통해 스스로 규칙을 찾고 적응하는 반면, 일반 소프트웨어는 개발자가 미리 코딩한 절차만 따릅니다."
          storageKey="ai-m1l3-quiz-0"
        />
        <ChoiceQuiz
          question="브레드봇이 기온·습도에 따라 굽는 온도를 자동으로 조절한다면 어떤 유형의 AI인가요?"
          options={[
            '학습 기반 AI 소프트웨어',
            '일반 소프트웨어',
            '지식 기반 AI 소프트웨어',
            '강한 AI',
            '감성 컴퓨팅',
          ]}
          answer={2}
          explanation="브레드봇은 전문가(제빵사)의 지식을 지식 베이스에 저장하고 추론 기관으로 판단하는 지식 기반 AI 소프트웨어입니다."
          storageKey="ai-m1l3-quiz-1"
        />
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 모든 소프트웨어가 AI는 아니다 — 자동화 ≠ 인공지능</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> AI 소프트웨어는 상황에 유연하게 적응한다</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 지식 기반: 전문가 지식 베이스 + 추론 기관</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 학습 기반: 데이터에서 알고리즘이 스스로 규칙을 찾음</li>
        </ul>
      </section>
    </article>
  )
}
