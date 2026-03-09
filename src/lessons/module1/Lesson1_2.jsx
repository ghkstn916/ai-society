import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'
import SortCards from '../../components/interactive/SortCards.jsx'

const abilityItems = [
  { id: 'a1', label: '빠르고 정확한 계산', correct: 'B' },
  { id: 'a2', label: '창의적인 예술 창작', correct: 'A' },
  { id: 'a3', label: '수백만 건 데이터 기억', correct: 'B' },
  { id: 'a4', label: '감정적 공감과 위로', correct: 'A' },
  { id: 'a5', label: '논리적 추론 (삼단논법)', correct: 'B' },
  { id: 'a6', label: '모호한 상황에서 직감으로 판단', correct: 'A' },
]

export default function Lesson1_2() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">모듈 1 · 레슨 2</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 인간 지능의 차이</h1>
        <p className="text-slate-500 text-sm">AI가 잘하는 것과 인간이 잘하는 것을 비교하고, 둘의 근본적인 차이를 이해합니다.</p>
      </header>

      <section className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
        <h2 className="font-bold text-blue-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-blue-900">
          <li className="flex items-start gap-2"><span>•</span> 인공지능과 인간 지능의 차이점을 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 모라벡의 역설과 강한/약한 AI 개념을 이해한다</li>
          <li className="flex items-start gap-2"><span>•</span> 중국어 방 사고 실험을 통해 AI 이해의 한계를 안다</li>
        </ul>
      </section>

      {/* 알고리즘 지능 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">1. 인공지능은 어떻게 작동할까?</h2>
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad7b6?w=700&h=280&fit=crop"
          alt="인공지능 뇌 이미지"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-5 mb-4">
          <p className="text-xs font-semibold text-indigo-200 mb-1">핵심 개념</p>
          <p className="font-bold">인공지능은 데이터와 규칙에 의해 결과를 만드는 알고리즘 지능을 가지고 있다.</p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          인간은 경험, 책, 인터넷 등 다양한 대상으로부터 지식을 습득하고 모호한 상황에서 <strong>직감과 통찰</strong>을 활용합니다. 반면 AI는 센서, 이미지, 숫자 등 데이터로 수집한 지식 베이스를 통해 판단하고, 그 결과를 다시 데이터로 저장하며 점점 발전합니다.
        </p>
      </section>

      {/* 능력 비교 분류 활동 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">2. AI와 인간 중 누가 더 잘할까?</h2>
        <p className="text-sm text-slate-600 mb-3">아래 능력 카드를 끌어다 분류해 보세요.</p>
        <SortCards
          items={abilityItems}
          groupA="인간이 더 잘함"
          groupB="AI가 더 잘함"
          storageKey="ai-m1l2-sort-0"
        />
        <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          💡 계산력·기억력·논리 추론은 AI가 우수하고, 창의력·감성·직감은 인간이 우수합니다. 다만 AI 기술이 빠르게 발전하면서 경계가 점점 흐릿해지고 있습니다.
        </div>
      </section>

      {/* 모라벡의 역설 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">3. 모라벡의 역설</h2>
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p className="font-bold text-amber-800 mb-2">"어려운 것은 쉽고, 쉬운 것은 어렵다"</p>
          <p className="text-sm text-slate-700 leading-relaxed">
            컴퓨터가 높은 수준의 추론에서 성인 수준의 능력을 갖는 것은 상대적으로 쉽지만, 인간에게 쉬운 <strong>걷기, 듣기, 느끼기, 보기</strong> 같은 기술을 컴퓨터로 구현하기는 매우 어렵다는 역설입니다.
          </p>
          <p className="text-xs text-amber-700 mt-2">단, 기술이 발전하면서 이 역설은 점점 깨지고 있습니다.</p>
        </div>
      </section>

      {/* 강한 AI vs 약한 AI */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">4. 강한 AI vs 약한 AI</h2>
        <img
          src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=700&h=240&fit=crop"
          alt="AI 로봇"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4">
            <p className="font-bold text-red-700 mb-2">강한 AI</p>
            <p className="text-sm text-slate-600">인간처럼 다양한 상황에서 범용적으로 문제를 해결하고, 독립적인 의지·자아·양심을 가진 AI. 아직 영화 속에서만 존재합니다.</p>
          </div>
          <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
            <p className="font-bold text-green-700 mb-2">약한 AI</p>
            <p className="text-sm text-slate-600">특정 영역 안에서 전문가를 능가하는 능력을 가진 AI. 현재 우리 주변의 대부분의 AI가 여기에 해당합니다.</p>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          💡 바둑에서 이세돌을 이긴 알파고, 퀴즈쇼에서 인간을 이긴 왓슨 — 모두 특정 영역에서만 뛰어난 <strong>약한 AI</strong>입니다.
        </div>
      </section>

      {/* 중국어 방 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">5. AI는 정말 이해하는 걸까? — 중국어 방</h2>
        <FlipReveal
          question="AI가 중국어 질문에 완벽하게 답한다면, AI가 중국어를 '이해'한다고 볼 수 있을까요?"
          answer="철학자 존 설(John Searle)은 중국어를 모르는 사람이 방 안에서 매뉴얼만 보고 답을 찾아 내보내는 것처럼, AI는 규칙에 따라 처리할 뿐 실제로 '이해'한다고 볼 수 없다고 주장했습니다. AI가 인간처럼 감정을 느끼고 생각하는 것은 아직 먼 미래의 이야기입니다."
          storageKey="ai-m1l2-flip-0"
        />
        <FlipReveal
          question="AI가 슬픈 음악을 들을 때 감정을 느끼는 것처럼 반응한다면, 그것은 진짜 감정일까요?"
          answer="아닙니다. 감성 컴퓨팅(Affective Computing) 기술로 AI가 사람의 표정과 목소리 톤을 인식하여 감정이 있는 것처럼 흉내 낼 수 있지만, 인간과 같이 실제로 감정을 느끼는 것은 아닙니다."
          storageKey="ai-m1l2-flip-1"
        />
      </section>

      {/* 퀴즈 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">✏️ 확인 퀴즈</h2>
        <ChoiceQuiz
          question="모라벡의 역설이 말하는 핵심 내용은?"
          options={[
            'AI는 수학 계산을 전혀 하지 못한다',
            '인간에게 쉬운 감각·운동 능력을 기계로 구현하기가 오히려 어렵다',
            '강한 AI는 이미 현실에서 구현되었다',
            'AI가 인간보다 창의력이 뛰어나다',
            'AI는 감정을 완벽하게 표현할 수 있다',
          ]}
          answer={1}
          explanation="모라벡의 역설은 '어려운 것(논리 추론)은 쉽고, 쉬운 것(걷기, 느끼기)은 어렵다'는 역설입니다."
          storageKey="ai-m1l2-quiz-0"
        />
        <ChoiceQuiz
          question="현재 우리 주변의 대부분의 AI가 해당하는 유형은?"
          options={[
            '강한 AI — 범용적이고 자아를 가진 AI',
            '약한 AI — 특정 영역에서만 전문가 수준인 AI',
            '감성 AI — 인간처럼 감정을 가진 AI',
            '창의적 AI — 스스로 새로운 개념을 만드는 AI',
            '생물학적 AI — 살아있는 세포로 만든 AI',
          ]}
          answer={1}
          explanation="알파고, 왓슨, 얼굴 인식 AI 등 우리 주변 AI 대부분은 특정 영역에서만 뛰어난 약한 AI입니다."
          storageKey="ai-m1l2-quiz-1"
        />
      </section>

      {/* 요약 */}
      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> AI는 데이터·알고리즘으로 작동하는 알고리즘 지능, 인간은 경험·통찰로 판단</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 모라벡의 역설: 기계에게 쉬운 것이 인간에겐 쉽고, 인간에게 쉬운 것이 기계엔 어렵다</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 강한 AI(범용·자아) vs 약한 AI(특정 영역 전문)</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 중국어 방: AI는 규칙대로 처리할 뿐, 진정으로 '이해'하는 것은 아니다</li>
        </ul>
      </section>
    </article>
  )
}
