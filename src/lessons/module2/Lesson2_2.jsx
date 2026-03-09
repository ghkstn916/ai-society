import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'

const aiRoleCards = [
  { label: 'AI가 X선 사진을 분석해 의심 병변 위치를 의사에게 표시해준다', group: 'A' },
  { label: 'AI 챗봇이 은행 상담원 없이 고객 질문에 24시간 자동 응답한다', group: 'B' },
  { label: 'AI 프로그램이 기자 없이 주식 시황 뉴스를 자동으로 작성·배포한다', group: 'B' },
  { label: 'AI 번역기가 외교 회의에서 통역관 옆에서 실시간 보조 번역을 한다', group: 'A' },
  { label: 'AI 로봇이 물류 창고에서 사람 없이 24시간 상품을 분류·포장한다', group: 'B' },
  { label: 'AI가 수천 건의 판례를 검색해 변호사에게 관련 자료를 제공한다', group: 'A' },
]

const mainSectors = [
  {
    icon: '🏭',
    name: '제조·물류',
    img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&h=200&fit=crop',
    desc: '제품 주문 처리부터 배송까지 AI 시스템과 로봇이 자동화합니다. 아마존 물류 창고에서는 AI 로봇이 24시간 상품을 분류합니다.',
    jobs: '데이터 분석가 · 로봇 엔지니어 · AI 소프트웨어 개발자',
  },
  {
    icon: '🚗',
    name: '교통',
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&h=200&fit=crop',
    desc: '자율 주행 기능이 일부 자동차에 탑재되어 안전 운행을 돕고, AI 카메라가 교통사고를 자동 감지합니다.',
    jobs: '무인 자동차 엔지니어 · 교통 설계 전문가',
  },
  {
    icon: '🏥',
    name: '의료',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=200&fit=crop',
    desc: '비싼 정밀 의료 기기 없이도 AI로 신체적 질환을 진단하고, 환자의 대화 문장을 분석해 질병에 걸릴 확률을 예측합니다. 2018년 AI가 20년 경력 안과 의사 수준으로 당뇨성 망막증을 자동 진단하는 시스템이 미국 식약청 인증을 받았습니다.',
    jobs: '빅 데이터 전문가 · 정보 보호 전문가',
  },
  {
    icon: '🏗️',
    name: '건설',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=200&fit=crop',
    desc: '드론이 현장을 촬영하고 AI가 데이터를 분석해 자율 주행 장비를 24시간 가동합니다. 건설 시간 단축 및 안전 강화에 기여합니다.',
    jobs: '비전 인식 전문가',
  },
  {
    icon: '🌿',
    name: '환경',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=200&fit=crop',
    desc: '기계학습으로 산불 위험도를 모델링해 초기 진압에 기여하고, 멸종 위기종 서식지 지도를 AI로 자동 작성합니다.',
    jobs: '지리 정보 시스템 전문가 · 기계학습 전문가',
  },
]

const expandedSectors = [
  {
    id: 'law',
    icon: '⚖️',
    name: '법률',
    color: 'blue',
    desc: '과거에는 변호사가 며칠에 걸쳐 하던 일을 AI 프로그램이 손쉽게 해결할 수 있습니다. 수천 건의 판례 중에서 관련도가 높은 순서대로 나열하고, 변론을 위한 주장을 뒷받침하는 근거를 추천받을 수 있습니다.',
    highlight: '💡 AI가 계약서 자문 대회에서 150점 만점에 100점 이상을 받은 반면, 일반 변호사는 50~60점대에 그쳤습니다. (연합뉴스, 2019)',
  },
  {
    id: 'finance',
    icon: '💹',
    name: '금융',
    color: 'green',
    desc: '주식은 국제 정세나 정치 문제 등 여러 요소에 따라 달라지기에 전문가에게도 어렵습니다. AI는 다양한 정보를 수집·분석해 어떤 종목에 투자해야 할지 예측하고 자동으로 주식을 사고팝니다.',
    highlight: '💡 신속하고 정확하며 방대한 업무가 필수적인 금융 영역에서 AI 기반 서비스는 더욱 확대될 것입니다.',
  },
  {
    id: 'culture',
    icon: '🎨',
    name: '문화·예술',
    color: 'purple',
    desc: 'AI 프로그램이 작성한 소설이 일본 문학상 1차 심사를 통과했고, 추상 미술에도 진출했습니다. 바로크에서 현대 음악까지 아우르는 작곡·작사 실력도 선보였습니다.',
    highlight: '💡 AI가 생산한 저작물의 저작권을 누가 가지게 될지 등 윤리적 쟁점이 남아 있습니다.',
  },
  {
    id: 'home',
    icon: '🏠',
    name: '홈서비스',
    color: 'teal',
    desc: '현재 많은 가정에서 AI 기반 청소기나 세탁기를 사용합니다. 앱으로 휴대 전화나 태블릿으로 집 안 환경을 제어할 수도 있습니다. 앞으로는 더 나은 음성 인식 기술로 짐을 배달하거나 사무실을 청소하는 전문 로봇이 나올 것입니다.',
    highlight: '💡 스마트홈: AI로 냉난방·조명·보안 기기를 통합 제어하는 생활이 현실화되고 있습니다.',
  },
  {
    id: 'entertainment',
    icon: '🎬',
    name: '엔터테인먼트',
    color: 'pink',
    desc: '콘텐츠 제작 도구와 소셜 네트워크, AI의 결합으로 새로운 형태의 엔터테인먼트들이 등장하고 있으며, 개인화된 쌍방향 미디어가 더욱 발전할 것입니다. 고품질의 음악이나 댄스 콘텐츠 제작을 더욱 손쉽게 할 수 있게 됩니다.',
    highlight: '💡 AI가 시청 패턴을 분석해 개인에게 최적화된 콘텐츠를 자동 추천하고 제작까지 보조합니다.',
  },
  {
    id: 'security',
    icon: '🔒',
    name: '공공 안전 및 보안',
    color: 'red',
    desc: '인공지능의 활약이 가장 기대되는 분야로, 신용 카드 사기 같은 범죄 추적에 기여할 것으로 보입니다. 단, AI 적용을 위해 감시 카메라 설치와 개인 계좌 이력 조회 등이 필요하며, 사생활 침해 우려도 있어 제도적 장치가 필요합니다.',
    highlight: '💡 안전과 프라이버시 사이의 균형을 어떻게 맞출 것인지가 중요한 사회적 과제입니다.',
  },
  {
    id: 'edu',
    icon: '📚',
    name: '교육',
    color: 'amber',
    desc: '학생들의 수준에 따른 맞춤형 교수 학습 지원은 교육 분야의 오랜 관심사입니다. AI 기술로 개별 학습자의 이해를 진단하고 적합한 콘텐츠 및 피드백을 제공합니다. 현재는 어학 학습이나 진학에 도움을 주는 서비스가 많으며 범위가 점차 확대되고 있습니다.',
    highlight: '💡 AI 교사는 학생 한 명 한 명의 학습 속도와 수준에 맞춰 24시간 개별 지도가 가능합니다.',
  },
]

const colorMap = {
  blue:   'border-blue-200 bg-blue-50 text-blue-800',
  green:  'border-green-200 bg-green-50 text-green-800',
  purple: 'border-purple-200 bg-purple-50 text-purple-800',
  teal:   'border-teal-200 bg-teal-50 text-teal-800',
  pink:   'border-pink-200 bg-pink-50 text-pink-800',
  red:    'border-red-200 bg-red-50 text-red-800',
  amber:  'border-amber-200 bg-amber-50 text-amber-800',
}

export default function Lesson2_2() {
  const [openSector, setOpenSector] = useState(null)
  const [aiAnswers, setAiAnswers] = useState({})
  const [aiChecked, setAiChecked] = useState(false)

  const allAnswered = aiRoleCards.every((_, i) => aiAnswers[i])
  const aiScore = aiRoleCards.filter((c, i) => aiAnswers[i] === c.group).length

  const selectRole = (idx, group) => {
    if (aiChecked) return
    setAiAnswers(prev => ({ ...prev, [idx]: group }))
  }

  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">모듈 2 · 레슨 2</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 사회 각 분야의 변화</h1>
        <p className="text-slate-500 text-sm">제조·의료·법률·금융·문화예술 등 12개 분야에서 AI가 어떤 혁신을 가져오고 있는지 살펴봅니다.</p>
      </header>

      <section className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <h2 className="font-bold text-green-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-green-900">
          <li className="flex items-start gap-2"><span>•</span> 12개 이상의 산업·사회 분야에서 AI 활용 사례를 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 각 분야에서 AI로 인해 새롭게 필요한 직업을 파악할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 인공지능이 경제에 미치는 거시적 영향을 이해한다</li>
        </ul>
      </section>

      {/* 도입 FlipReveal */}
      <FlipReveal
        question="AI가 가장 먼저 큰 변화를 가져올 분야는 어디라고 생각하나요? 이유도 함께 생각해보세요."
        answer="전문가들은 반복 업무 비중이 높고 대량의 데이터가 쌓이는 분야(금융·법률·의료·물류)에서 변화가 빠르다고 봅니다. 하지만 예술·교육·복지처럼 인간의 감성과 판단이 핵심인 분야는 AI와 협업하는 방식으로 변화할 것입니다."
        storageKey="ai-m2l2-flip-intro"
      />

      {/* 거시적 경제 효과 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">1. AI가 세계 경제에 미치는 영향</h2>
        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&h=260&fit=crop"
          alt="글로벌 경제"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { value: '+1.2%', label: '연간 글로벌 GDP 증가 예상', color: 'bg-green-50 border-green-200 text-green-700' },
            { value: '13조 달러', label: '2030년까지 GDP 증가 규모', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { value: '+1.4%', label: '연간 생산성 증가 추정', color: 'bg-purple-50 border-purple-200 text-purple-700' },
          ].map(stat => (
            <div key={stat.label} className={`rounded-2xl border p-4 text-center ${stat.color}`}>
              <p className="text-xl font-extrabold">{stat.value}</p>
              <p className="text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 text-center">출처: 매킨지 글로벌 리서치</p>
      </section>

      {/* 핵심 5개 산업 분야 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">2. 핵심 산업 분야별 AI 혁신</h2>
        <div className="space-y-5">
          {mainSectors.map(sec => (
            <div key={sec.name} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <img src={sec.img} alt={sec.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{sec.icon}</span>
                  <h3 className="font-bold text-slate-800">{sec.name} 분야</h3>
                </div>
                <p className="text-sm text-slate-600 mb-2 leading-relaxed">{sec.desc}</p>
                <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-1.5">
                  관련 직업: {sec.jobs}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 핵심 산업 분야 퀴즈 */}
      <ChoiceQuiz
        question="다음 중 AI가 건설 분야에서 주로 활용되는 방식으로 옳은 것은?"
        options={[
          'AI가 건설 현장의 모든 법적 계약을 처리한다',
          'AI 로봇이 벽돌을 손으로 하나씩 쌓는다',
          '건설 분야에서는 아직 AI를 거의 활용하지 않는다',
          '드론 촬영 데이터를 AI가 분석해 자율 주행 장비를 24시간 가동한다',
          '공사 설계 도면을 전부 AI가 혼자 완성한다',
        ]}
        answer={3}
        explanation="드론으로 현장을 촬영하고 AI가 데이터를 분석해 자율 주행 장비를 가동합니다. 이를 통해 건설 시간을 단축하고 안전성을 높입니다."
        storageKey="ai-m2l2-quiz-industry"
      />

      {/* 추가 사회 영역 — 아코디언 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">3. 더 넓은 사회 영역에서의 AI</h2>
        <p className="text-sm text-slate-500 mb-3">카드를 클릭해 각 영역에서의 AI 활용을 확인해보세요.</p>
        <div className="space-y-2">
          {expandedSectors.map(sec => {
            const isOpen = openSector === sec.id
            const c = colorMap[sec.color] || colorMap.blue
            return (
              <div key={sec.id} className={`rounded-2xl border overflow-hidden transition-all ${isOpen ? c : 'border-slate-200 bg-white'}`}>
                <button
                  onClick={() => setOpenSector(isOpen ? null : sec.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${isOpen ? '' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sec.icon}</span>
                    <span className={`font-bold text-sm ${isOpen ? '' : 'text-slate-700'}`}>{sec.name} 영역</span>
                  </div>
                  <span className={`text-lg font-bold transition-transform duration-200 ${isOpen ? 'rotate-180' : 'text-slate-400'}`}>▾</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-2 border-t border-current border-opacity-20">
                    <p className="text-sm text-slate-700 leading-relaxed mb-2">{sec.desc}</p>
                    <p className="text-xs bg-white/60 rounded-xl px-3 py-2 text-slate-600">{sec.highlight}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* AI 역할 분류 실습 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">🧪 활동: AI 역할 분류하기</h2>
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-3 text-sm">
          <p className="font-bold text-amber-800 mb-1">💡 두 가지 역할의 차이</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white border border-amber-200 rounded-xl p-2 text-xs text-slate-700">
              <p className="font-bold text-blue-700 mb-1">A 인간 보조형</p>
              AI가 정보·분석을 제공하고, 최종 판단은 사람이 내린다.
            </div>
            <div className="bg-white border border-amber-200 rounded-xl p-2 text-xs text-slate-700">
              <p className="font-bold text-rose-600 mb-1">B 인간 대체형</p>
              AI가 사람 없이 업무 전체를 직접 수행하고 결과를 만든다.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          {/* 그룹 레이블 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 rounded-lg border-2 p-3 text-center text-sm font-bold" style={{ borderColor: '#3b82f6', color: '#3b82f6' }}>
              A &nbsp; 인간 보조형
            </div>
            <div className="flex-1 rounded-lg border-2 p-3 text-center text-sm font-bold" style={{ borderColor: '#f43f5e', color: '#f43f5e' }}>
              B &nbsp; 인간 대체형
            </div>
          </div>

          {/* 카드 목록 */}
          <div className="flex flex-col gap-2 mb-4">
            {aiRoleCards.map((card, idx) => {
              const ans = aiAnswers[idx]
              const correct = card.group
              const isWrong = aiChecked && ans && ans !== correct
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`flex-1 px-3 py-2.5 rounded-lg text-sm border leading-snug ${
                    aiChecked
                      ? (ans === correct ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50')
                      : 'border-slate-200 bg-slate-50'
                  }`}>
                    {card.label}
                    {isWrong && (
                      <span className="text-red-500 ml-2 text-xs">
                        (→ {correct === 'A' ? '인간 보조형' : '인간 대체형'})
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => selectRole(idx, 'A')}
                    className={`px-3 py-2 rounded text-xs font-bold transition-colors ${
                      ans === 'A' ? 'text-white' : 'border border-slate-300 text-slate-500 hover:bg-slate-100'
                    }`}
                    style={ans === 'A' ? { backgroundColor: '#3b82f6' } : {}}
                  >A</button>
                  <button
                    onClick={() => selectRole(idx, 'B')}
                    className={`px-3 py-2 rounded text-xs font-bold transition-colors ${
                      ans === 'B' ? 'text-white' : 'border border-slate-300 text-slate-500 hover:bg-slate-100'
                    }`}
                    style={ans === 'B' ? { backgroundColor: '#f43f5e' } : {}}
                  >B</button>
                </div>
              )
            })}
          </div>

          {/* 제출 / 결과 */}
          {!aiChecked ? (
            <button
              onClick={() => setAiChecked(true)}
              disabled={!allAnswered}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                allAnswered
                  ? 'bg-slate-700 text-white hover:bg-slate-800'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              정답 확인
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
                {aiScore} / {aiRoleCards.length} 정답!
              </div>
              <button
                onClick={() => { setAiAnswers({}); setAiChecked(false) }}
                className="text-xs text-slate-400 underline"
              >
                다시 하기
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          💡 어느 쪽이 나쁘다는 게 아닙니다. 중요한 건 사회가 두 방향 모두를 이해하고 준비하는 것입니다.
        </div>
      </section>

      {/* AI 법률 자문 뉴스 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">💬 주목할 사례: AI, 법률 자문까지 넘본다</h2>
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
          <p className="text-sm text-slate-700 leading-relaxed">
            인공지능이 변호사를 상대로 한 법률 자문 대결에서 사람과 비교할 수 없을 만큼 빠르고 정확하게 계약서를 분석해 냈다. 계약서 자문 대회에 참가한 열두 팀은 제한 시간 50분 동안 근로 계약서 3종을 검토하였다. 채점 결과 AI 팀의 점수는 150점 만점 중 모두 100점을 상회하였는데 일반 변호사 팀 점수는 50~60점대로 절반 수준에 그쳤다.
          </p>
          <p className="text-xs text-slate-500 mt-2">출처: 연합뉴스(2019. 8. 31.)</p>
        </div>
        <FlipReveal
          question="AI가 법률 자문에서 변호사를 이겼다면, 변호사라는 직업은 사라지는 걸까요?"
          answer="반드시 그렇지는 않습니다. AI는 판례 검색과 문서 분류 같은 반복 업무를 잘하지만, 의뢰인의 감정을 이해하고, 복잡한 상황을 종합적으로 판단하며, 윤리적 결정을 내리는 일은 아직 인간이 더 잘합니다. 변호사는 AI를 도구로 활용해 더 중요한 일에 집중하게 될 것입니다."
          storageKey="ai-m2l2-flip-law"
        />
      </section>

      {/* 인공지능 국가전략 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">4. 우리나라의 인공지능 국가전략</h2>
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
          <p className="text-xs font-semibold text-blue-500 mb-1">2019년 제53회 국무회의 발표</p>
          <p className="font-bold text-slate-800 mb-4">2030년까지 최대 455조 원의 경제 효과 창출 목표</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { goal: '세계를 선도하는 AI 생태계 구축', icon: '🌐' },
              { goal: '인공지능을 가장 잘 활용하는 나라', icon: '🏆' },
              { goal: '사람 중심의 AI 구현', icon: '🤝' },
            ].map(item => (
              <div key={item.goal} className="bg-white border border-blue-200 rounded-xl p-3 text-center shadow-sm">
                <span className="text-xl block mb-1">{item.icon}</span>
                <p className="text-xs text-slate-700 font-medium leading-snug">{item.goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 퀴즈 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">✏️ 확인 퀴즈</h2>
        <ChoiceQuiz
          question="2018년 AI가 자동 진단을 수행해 미국 FDA 인증을 받은 질병은?"
          options={[
            '폐암 조기 진단',
            '코로나19 판별',
            '당뇨성 망막증 진단',
            '알츠하이머 예측',
            '심장 질환 진단',
          ]}
          answer={2}
          explanation="2018년 당뇨성 망막증 자동 진단 AI가 20년 경력 안과 의사 수준의 정확도를 보여 미국 식약청 인증을 받았습니다."
          storageKey="ai-m2l2-quiz-0"
        />
        <ChoiceQuiz
          question="AI의 법률·금융 분야 활용에 대한 설명으로 옳은 것은?"
          options={[
            'AI는 판례 분석을 전혀 하지 못한다',
            'AI는 주식 거래를 자동으로 수행하는 시스템에 이미 활용되고 있다',
            'AI가 법률 자문을 맡으면 변호사 직업은 즉시 사라진다',
            'AI는 금융 분야에서 개인 투자자만 이용할 수 있다',
            'AI는 금융 예측에서 항상 100% 정확하다',
          ]}
          answer={1}
          explanation="AI는 이미 다양한 정보를 수집·분석해 자동으로 주식을 사고파는 시스템에 활용되고 있습니다."
          storageKey="ai-m2l2-quiz-1"
        />
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 제조·교통·의료·건설·환경 등 핵심 산업을 변화시키고 있다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 법률·금융·문화예술·홈서비스·엔터테인먼트·공공안전·교육 영역까지 확산 중이다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 반복 업무를 빠르게 처리하지만 윤리적 판단·감성적 소통은 인간이 보완한다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 우리나라도 AI 국가전략을 통해 2030년 455조 원 경제 효과 목표</li>
        </ul>
      </section>
    </article>
  )
}
