import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'

const sectors = [
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
    desc: '2018년 AI가 20년 경력 안과 의사 수준으로 당뇨성 망막증을 자동 진단하는 시스템이 미국 식약청 인증을 받았습니다.',
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

export default function Lesson2_2() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">모듈 2 · 레슨 2</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 사회 각 분야의 변화</h1>
        <p className="text-slate-500 text-sm">제조·교통·의료·건설·환경 분야에서 AI가 어떤 혁신을 가져오고 있는지 살펴봅니다.</p>
      </header>

      <section className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <h2 className="font-bold text-green-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-green-900">
          <li className="flex items-start gap-2"><span>•</span> 5개 이상의 산업 분야에서 AI 활용 사례를 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 각 분야에서 AI로 인해 새롭게 필요한 직업을 파악할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 인공지능이 경제에 미치는 거시적 영향을 이해한다</li>
        </ul>
      </section>

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

      {/* 분야별 변화 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">2. 산업 분야별 AI 혁신</h2>
        <div className="space-y-5">
          {sectors.map(sec => (
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

      {/* 인공지능 국가전략 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">3. 우리나라의 인공지능 국가전략</h2>
        <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-5">
          <p className="text-xs font-semibold text-blue-200 mb-2">2019년 제53회 국무회의 발표</p>
          <p className="font-bold mb-3">2030년까지 최대 455조 원의 경제 효과 창출 목표</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-blue-100">
            {['세계를 선도하는 AI 생태계 구축', '인공지능을 가장 잘 활용하는 나라', '사람 중심의 AI 구현'].map(goal => (
              <div key={goal} className="bg-white bg-opacity-10 rounded-xl p-2 text-center">{goal}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 탐구 활동 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">💭 생각해보기</h2>
        <FlipReveal
          question="법률·농업·문화·예술 분야에서도 AI가 활용됩니다. 각 분야에서 어떻게 쓰이는지 한 가지씩 생각해보세요."
          answer="법률: AI 변호사(law-bo)가 판례 검색 담당 / 농업: 드론이 작물 상태를 AI로 분석해 최적 비료·물 공급 / 문화: AI가 작곡·그림 창작 보조 / 예술: 딥페이크 기술로 영화 특수효과 제작 등 다양한 활용이 이루어지고 있습니다."
          storageKey="ai-m2l2-flip-0"
        />
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
          question="건설 현장에서 AI 드론의 활용 효과로 적절하지 않은 것은?"
          options={[
            '24시간 자율 주행 장비 가동으로 건설 시간 단축',
            '현장 촬영 데이터로 위험 요소 사전 감지',
            '건설 근로자의 안전 강화',
            '건설 비용 절감',
            '드론이 직접 벽돌을 쌓아 인력을 완전히 대체',
          ]}
          answer={4}
          explanation="AI 드론은 현장 모니터링·데이터 수집·자율 장비 운용을 지원하지만, 모든 건설 작업을 완전 대체하지는 않습니다."
          storageKey="ai-m2l2-quiz-1"
        />
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 제조·교통·의료·건설·환경 등 거의 모든 산업 분야를 변화시키고 있다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI 도입으로 새로운 전문 직업들이 생겨나고 있다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 매킨지 추정: AI로 2030년까지 글로벌 GDP가 13조 달러 증가 예상</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 우리나라도 AI 국가전략을 통해 2030년 455조 원 경제 효과 목표</li>
        </ul>
      </section>
    </article>
  )
}
