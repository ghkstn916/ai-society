import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'
import SortCards from '../../components/interactive/SortCards.jsx'

const phoneItems = [
  { id: 'p1', label: '얼굴 인식 잠금 해제', correct: 'B' },
  { id: 'p2', label: '계산기 앱', correct: 'A' },
  { id: 'p3', label: 'AI 카메라 자동 설정', correct: 'B' },
  { id: 'p4', label: '메모장 앱', correct: 'A' },
  { id: 'p5', label: '음악 인식 (Shazam)', correct: 'B' },
  { id: 'p6', label: '알람 앱', correct: 'A' },
  { id: 'p7', label: '실시간 번역 카메라', correct: 'B' },
  { id: 'p8', label: '전화 통화 앱', correct: 'A' },
]

const timeline = [
  { year: '1956', title: '다트머스 회의', desc: '학자들이 모여 지능을 가진 기계를 "인공지능"이라 부르기로 하고 연구 방향을 논의했다. 이후 AI 연구의 본격적인 출발점이 되었다.' },
  { year: '1969', title: '로봇 셰이키(Shakey)', desc: '자신의 행동을 추론할 수 있는 최초의 모바일 로봇. 화성 탐사선 설계, 웹 서버 구축, 자동차 개발 등에 영향을 끼쳤다.' },
  { year: '1988', title: '카드 승인 시스템', desc: '전문가의 지식을 컴퓨터에 넣은 전문가 시스템을 비즈니스에 적용한 성공 사례. 개인 카드 결제 승인 여부를 자동으로 확인했다.' },
  { year: '1996', title: '책 추천 시스템 & 로봇 청소기', desc: '아마존이 유사한 책을 구매한 소비자 그룹을 분석해 맞춤형 책 추천 서비스를 시작했다. 같은 해 최초의 상업용 로봇 청소기도 등장했다.' },
  { year: '2004', title: '자율 주행 자동차 경주 대회', desc: 'DARPA가 주최한 자율 주행 자동차 대회가 화제가 되며 많은 기업이 자율 주행 연구에 참여하기 시작했다.' },
  { year: '2011', title: '왓슨 & AI 비서', desc: 'IBM 왓슨이 퀴즈 쇼에 참가해 우승. 같은 해 스마트폰 AI 개인 비서가 공개되어 이후 애플리케이션 실행부터 일정 관리까지 담당하게 되었다.' },
  { year: '2016', title: '알파고', desc: 'AI 바둑 프로그램 알파고가 세계 최고 수준의 바둑 기사 이세돌을 이겼다. AI가 인류 난제 해결에도 기여할 수 있다는 기대를 높였다.' },
]

const smartphoneFeatures = [
  {
    id: 'face',
    icon: '👤',
    label: '얼굴 인식 잠금',
    summary: '내 얼굴을 학습해 잠금 해제·결제',
    detail: '얼굴의 수천 개 특징점을 딥러닝으로 학습해 정확하게 나를 인식합니다. 단순한 비밀번호와 달리 AI가 스스로 학습해 인식 정확도를 높이며, 조명 변화나 안경 착용 여부도 자동으로 보완합니다. 결제·앱 잠금 해제에도 활용됩니다.',
    color: 'blue',
  },
  {
    id: 'camera',
    icon: '📷',
    label: 'AI 카메라',
    summary: '인물·풍경 자동 인식, 촬영 설정 최적화',
    detail: '수백만 장의 사진 데이터를 학습해 피사체가 인물인지, 풍경인지, 음식인지 자동으로 판단하고 최적의 셔터 속도·밝기·색감을 설정합니다. 야간 모드나 인물 배경 흐리기(보케)도 AI가 실시간으로 처리합니다.',
    color: 'purple',
  },
  {
    id: 'translate',
    icon: '🌐',
    label: '실시간 번역',
    summary: '외국어를 카메라로 비추면 즉시 번역',
    detail: '카메라로 외국어 간판이나 메뉴판을 비추면 이미지 속 문자를 인식하고 자연스러운 한국어로 번역해 화면에 덮어씌웁니다. 단어 단위가 아닌 문맥 전체를 분석해 자연스럽게 번역하며, 음성 실시간 통역도 가능합니다.',
    color: 'teal',
  },
  {
    id: 'music',
    icon: '🎵',
    label: '음악 인식',
    summary: '흘러나오는 노래를 들으면 곡명 알림',
    detail: '주변 소리에서 멜로디 특징(핑거프린트)을 추출해 수억 곡 데이터베이스와 비교합니다. 단 5초 만에 노래를 찾아내며, 소음이 많은 환경에서도 높은 인식률을 보입니다. AI가 음성 패턴을 지속적으로 학습해 인식 범위를 넓혀가고 있습니다.',
    color: 'pink',
  },
  {
    id: 'health',
    icon: '❤️',
    label: '건강 관리',
    summary: '웨어러블 데이터로 맥박·수면 분석',
    detail: '스마트워치와 연동해 맥박, 혈중 산소, 수면 단계, 걸음 수 등의 데이터를 AI가 분석합니다. 평소 패턴과 다른 이상 징후가 감지되면 즉시 알림을 보내고, 장기적인 건강 트렌드를 분석해 운동 목표와 수면 개선 조언을 제공합니다.',
    color: 'red',
  },
  {
    id: 'iot',
    icon: '🏠',
    label: 'IoT 제어',
    summary: '집 안 기기를 음성으로 원격 제어',
    detail: 'AI 음성 인식으로 조명, 에어컨, TV, 잠금장치를 말 한마디로 제어합니다. 생활 패턴을 학습해 귀가 시간에 맞춰 자동으로 조명을 켜거나 온도를 조절하기도 합니다. 스마트홈 기기들이 서로 연결돼 생활 편의를 높입니다.',
    color: 'green',
  },
]

const phoneColorMap = {
  blue:   { border: 'border-blue-200',   bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-700',   title: 'text-blue-800'   },
  purple: { border: 'border-purple-200', bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-700', title: 'text-purple-800' },
  teal:   { border: 'border-teal-200',   bg: 'bg-teal-50',   icon: 'bg-teal-100 text-teal-700',   title: 'text-teal-800'   },
  pink:   { border: 'border-pink-200',   bg: 'bg-pink-50',   icon: 'bg-pink-100 text-pink-700',   title: 'text-pink-800'   },
  red:    { border: 'border-red-200',    bg: 'bg-red-50',    icon: 'bg-red-100 text-red-700',    title: 'text-red-800'    },
  green:  { border: 'border-green-200',  bg: 'bg-green-50',  icon: 'bg-green-100 text-green-700',  title: 'text-green-800'  },
}

const personalServices = [
  {
    platform: '유튜브',
    icon: '▶️',
    color: 'red',
    tag: '영상 추천',
    desc: '시청 기록, 검색어, 좋아요 데이터를 분석해 내가 관심 가질 만한 영상을 자동으로 추천합니다.',
  },
  {
    platform: '넷플릭스',
    icon: '🎬',
    color: 'rose',
    tag: '콘텐츠 추천',
    desc: '시청 패턴, 장르, 평점을 분석해 다음에 볼 만한 드라마와 영화를 맞춤 추천합니다.',
  },
  {
    platform: '쇼핑몰',
    icon: '🛒',
    color: 'amber',
    tag: '상품 추천',
    desc: '조회한 상품과 구매 이력을 분석해 비슷하거나 함께 사면 좋은 상품을 자동으로 보여줍니다.',
  },
  {
    platform: '뉴스 앱',
    icon: '📰',
    color: 'sky',
    tag: '뉴스 큐레이션',
    desc: '클릭 패턴을 분석해 관심 분야의 기사를 우선 노출하고 개인화된 뉴스피드를 제공합니다.',
  },
]

const serviceColorMap = {
  red:   { border: 'border-red-200',   bg: 'bg-red-50',   tag: 'bg-red-100 text-red-700',   title: 'text-red-800'   },
  rose:  { border: 'border-rose-200',  bg: 'bg-rose-50',  tag: 'bg-rose-100 text-rose-700',  title: 'text-rose-800'  },
  amber: { border: 'border-amber-200', bg: 'bg-amber-50', tag: 'bg-amber-100 text-amber-700', title: 'text-amber-800' },
  sky:   { border: 'border-sky-200',   bg: 'bg-sky-50',   tag: 'bg-sky-100 text-sky-700',   title: 'text-sky-800'   },
}

export default function Lesson2_1() {
  const [openYear, setOpenYear] = useState(null)
  const [openPhone, setOpenPhone] = useState(null)

  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">모듈 2 · 레슨 1</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 개인 삶의 변화</h1>
        <p className="text-slate-500 text-sm">AI 기술의 발전 역사부터 스마트폰, 맞춤형 서비스, 교육까지 — AI가 일상을 어떻게 바꾸고 있는지 살펴봅니다.</p>
      </header>

      <section className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <h2 className="font-bold text-green-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-green-900">
          <li className="flex items-start gap-2"><span>•</span> 인공지능 기술이 어떤 역사적 흐름으로 발전해왔는지 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> AI가 개인의 일상에 가져온 구체적 변화를 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 개인 맞춤형 서비스의 원리를 이해한다</li>
          <li className="flex items-start gap-2"><span>•</span> AI가 사회 문제 해결과 인간 협업에 어떤 역할을 하는지 이해한다</li>
        </ul>
      </section>

      {/* 도입 FlipReveal */}
      <FlipReveal
        question="오늘 아침 일어나서 지금까지 AI와 관련된 것을 몇 가지나 사용했을까요? 먼저 세어본 뒤 확인해보세요."
        answer="생각보다 많습니다! 스마트폰 잠금 해제(얼굴 인식), 음악 앱 추천, 지도 앱의 경로 안내, 뉴스·SNS 피드 추천, 날씨 예보까지 — 하루를 시작하는 순간부터 AI가 함께합니다."
        storageKey="ai-m2l1-flip-intro"
      />

      {/* AI 기술 발전 역사 타임라인 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-1">1. 인공지능 기술은 어떻게 발전했을까?</h2>
        <p className="text-sm text-slate-500 mb-4">연도를 클릭하면 해당 시기의 핵심 사건을 확인할 수 있습니다.</p>
        <div className="relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-0.5 bg-green-200" />
          <div className="space-y-3">
            {timeline.map(item => {
              const isOpen = openYear === item.year
              return (
                <div key={item.year} className="flex gap-4 items-start">
                  <button
                    onClick={() => setOpenYear(isOpen ? null : item.year)}
                    className={`flex-shrink-0 w-[88px] text-center px-2 py-1.5 rounded-xl text-xs font-bold border transition-all z-10 ${
                      isOpen
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-green-700 border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {item.year}년
                  </button>
                  <div className={`flex-1 rounded-2xl border overflow-hidden transition-all ${isOpen ? 'border-green-300 bg-green-50' : 'border-slate-100 bg-white'}`}>
                    <div
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => setOpenYear(isOpen ? null : item.year)}
                    >
                      <p className={`text-sm font-bold ${isOpen ? 'text-green-800' : 'text-slate-700'}`}>{item.title}</p>
                    </div>
                    {isOpen && (
                      <p className="px-4 pb-3 text-sm text-slate-600 leading-relaxed border-t border-green-200">{item.desc}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500 leading-relaxed">
          💡 1990년대: 기계학습으로 추천·예측 분야 발전 → 2000년대: 딥러닝으로 영상 인식·언어 번역·자율 주행 가능 → 현재: 사회 전 분야로 확산
        </div>
      </section>

      {/* 스마트폰 — 키카드 아코디언 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">2. AI가 들어온 스마트폰</h2>
        <img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&h=280&fit=crop"
          alt="스마트폰 활용"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          우리가 매일 쓰는 스마트폰에는 수십 가지 AI 기능이 들어 있습니다. 카드를 클릭해 각 기능이 어떻게 AI인지 확인해보세요.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {smartphoneFeatures.map(feat => {
            const isOpen = openPhone === feat.id
            const c = phoneColorMap[feat.color]
            return (
              <div
                key={feat.id}
                onClick={() => setOpenPhone(isOpen ? null : feat.id)}
                className={`rounded-2xl border cursor-pointer transition-all overflow-hidden ${isOpen ? `${c.border} ${c.bg} col-span-2` : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${isOpen ? c.icon : 'bg-slate-100'}`}>
                      {feat.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${isOpen ? c.title : 'text-slate-800'}`}>{feat.label}</p>
                      <p className="text-xs text-slate-500 truncate">{feat.summary}</p>
                    </div>
                    <span className={`text-slate-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                  </div>
                  {isOpen && (
                    <p className={`text-sm leading-relaxed mt-3 pt-3 border-t ${c.border} text-slate-700`}>
                      {feat.detail}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 스마트폰 분류 실습 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">🧪 활동: AI 기능 vs 일반 기능 구분하기</h2>
        <p className="text-sm text-slate-500 mb-3">스마트폰 기능들을 AI 기반 기능과 일반 소프트웨어 기능으로 나눠보세요.</p>
        <SortCards
          items={phoneItems}
          groupA="일반 소프트웨어"
          groupB="AI 기반 기능"
          storageKey="ai-m2l1-sort-phone"
        />
        <div className="mt-3 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          💡 힌트: 데이터를 학습해 스스로 판단·적응하는 기능이 AI입니다. 미리 정해진 절차만 따르면 일반 소프트웨어입니다.
        </div>
      </section>

      {/* 개인 맞춤형 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">3. 나를 위한 맞춤형 서비스</h2>
        <img
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=260&fit=crop"
          alt="개인 맞춤 추천"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-4">
          <p className="text-xs font-semibold text-slate-500 mb-1">핵심 원리</p>
          <p className="font-bold text-sm text-slate-800 leading-relaxed">AI는 내가 자주 검색한 단어, 시청한 영상, 구매 내역을 분석해 내가 좋아할 만한 것을 예측합니다.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {personalServices.map(item => {
            const c = serviceColorMap[item.color]
            return (
              <div key={item.platform} className={`rounded-2xl border p-4 ${c.border} ${c.bg}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag}`}>{item.tag}</span>
                </div>
                <p className={`text-sm font-bold mb-1.5 ${c.title}`}>{item.platform}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
        <FlipReveal
          question="맞춤형 추천 서비스가 항상 좋은 것만은 아닐 수도 있습니다. 어떤 문제가 생길까요?"
          answer="내가 좋아하는 것만 계속 보여줘 다양한 시각을 접하기 어려워지는 '필터 버블(Filter Bubble)' 현상이 생길 수 있습니다. 또한 개인 데이터가 수집되어 프라이버시 침해로 이어질 수 있습니다."
          storageKey="ai-m2l1-flip-0"
        />
      </section>

      {/* AI 교육 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">4. AI가 바꾸는 교육</h2>
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=240&fit=crop"
          alt="책과 학습"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="space-y-3 text-sm text-slate-700">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="font-semibold mb-1">📊 데이터 기반 개인 맞춤 학습</p>
            <p>AI가 학생의 표정, 눈동자 움직임, 문제별 정답률, 집중 시간 등을 분석해 각 학생에게 딱 맞는 학습을 제공합니다. 개별 학습자의 이해를 진단하고 적합한 콘텐츠와 피드백을 제공하려는 시도가 다양하게 이루어지고 있습니다.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="font-semibold mb-1">🎮 게임형 학습 & 어학 서비스</p>
            <p>어려운 수학 개념을 게임으로 배우거나, AI가 외국어 발음을 실시간으로 교정해 주는 방식이 가능합니다. 현재는 어학 학습이나 진학에 도움을 주는 서비스가 많으며, 교과 범위와 대상이 점차 확대되고 있습니다.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="font-semibold mb-1">🌍 교육 기회의 평등</p>
            <p>AI 교육 서비스는 교육 소외 계층에게도 평등한 학습 기회를 제공할 수 있다는 점에서 기대가 큽니다.</p>
          </div>
        </div>
      </section>

      {/* AI의 역할 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">5. AI의 역할: 인간과 함께 문제를 해결하다</h2>
        <div className="rounded-2xl bg-teal-50 border border-teal-200 p-5 mb-4">
          <p className="text-xs font-semibold text-teal-600 mb-2">핵심 관점</p>
          <p className="font-bold text-sm text-slate-800 leading-relaxed">인공지능은 사람을 도와 사회의 다양한 문제 해결을 위해 활용될 뿐만 아니라, 더 가치 있고 창의적인 새로운 일을 할 수 있게 도움을 줄 수 있다.</p>
        </div>
        <div className="space-y-3">
          {[
            { icon: '🏥', title: '의료 난제 해결', desc: 'AI로 암 치료법을 알아내거나 희귀 질환을 조기에 발견해 더 많은 생명을 구할 수 있다.' },
            { icon: '🌏', title: '사회 갈등 조정', desc: '다양한 데이터를 분석해 사회의 여러 갈등 원인을 파악하고 해소하는 데 활용될 수 있다.' },
            { icon: '🚀', title: '불가능의 가능성', desc: '우주 탐사나 잊혀진 역사의 발견처럼 과거에는 불가능했던 새로운 일들을 할 수 있게 해준다.' },
            { icon: '🤝', title: '인간과 AI의 협업', desc: 'AI가 반복 작업을 처리하고, 인간은 창의적·감성적 업무에 집중해 더 나은 결과를 만들어낼 수 있다.' },
          ].map(item => (
            <div key={item.title} className="flex gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 실제 사례 */}
        <div className="mt-4 rounded-2xl bg-green-50 border border-green-200 p-4">
          <p className="text-xs font-bold text-green-700 mb-2">📰 실제 사례 — AI 스피커가 독거노인의 생명을 구하다</p>
          <p className="text-sm text-slate-700 leading-relaxed">혼자 사는 한 노인이 갑작스러운 통증으로 고통을 호소하던 중 인공지능 스피커가 "살려 줘!"라는 외침을 감지해 관리자에게 자동으로 문자를 전송했다. 이를 통해 119 구조대가 긴급 출동해 노인을 병원으로 후송할 수 있었다. 독거노인 100가구에 AI 스피커를 설치해 위기 상황에 대처하는 지역 사회 돌봄 서비스의 성공 사례다.</p>
          <p className="text-xs text-slate-400 mt-2">출처: 경남신문(2020. 9. 15.)</p>
        </div>
      </section>

      {/* 퀴즈 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">✏️ 확인 퀴즈</h2>
        <ChoiceQuiz
          question="유튜브가 내가 좋아할 영상을 추천해 줄 수 있는 이유는?"
          options={[
            '유튜브 직원이 직접 취향을 분석해서',
            'AI가 시청 기록·검색어·좋아요 데이터를 분석해 취향을 예측해서',
            '유튜브에 올라온 모든 영상을 순서대로 보여줘서',
            '사용자가 직접 좋아하는 장르를 설정해서',
            '광고 수익을 많이 올리려고 인기 영상만 보여줘서',
          ]}
          answer={1}
          explanation="AI가 시청 기록, 검색어, 좋아요 등 사용자 데이터를 학습해 개인 취향을 예측하고 추천합니다."
          storageKey="ai-m2l1-quiz-0"
        />
        <ChoiceQuiz
          question="AI 개인 맞춤형 서비스의 단점으로 가장 적절한 것은?"
          options={[
            '추천 서비스를 사용하면 스마트폰 배터리가 빨리 닳는다',
            '관심 분야만 계속 노출되어 다양한 시각을 접하기 어려워진다',
            '맞춤형 서비스를 사용하면 요금이 올라간다',
            '추천 정확도가 낮아서 쓸모없는 정보만 나온다',
            '스마트폰을 오래 사용할수록 추천 품질이 낮아진다',
          ]}
          answer={1}
          explanation="필터 버블 현상으로 인해 편향된 정보에만 노출될 수 있고, 개인 데이터 수집에 따른 프라이버시 문제도 있습니다."
          storageKey="ai-m2l1-quiz-1"
        />
        <ChoiceQuiz
          question="AI가 인간을 도울 수 있는 역할로 적절하지 않은 것은?"
          options={[
            '독거노인의 위기 상황을 감지해 도움을 요청하는 돌봄 서비스',
            '암 치료법 연구 보조와 희귀 질환 조기 발견',
            '인간의 모든 창의적 판단과 감정을 완전히 대신하는 것',
            '우주 탐사 데이터 분석으로 새로운 발견 지원',
            '사회 문제의 원인을 데이터로 분석해 해결책 제시',
          ]}
          answer={2}
          explanation="AI는 인간의 창의성과 감성을 보조하고 협업하는 도구이지, 완전히 대신할 수 없습니다. AI와 인간이 각자의 강점을 살려 협업하는 것이 핵심입니다."
          storageKey="ai-m2l1-quiz-2"
        />
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 1956년 다트머스 회의 이후 전문가 시스템→기계학습→딥러닝으로 발전해 왔다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 스마트폰의 얼굴 인식·AI 카메라·번역·건강 관리 등이 모두 AI 기술</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 나의 데이터를 분석해 맞춤형 서비스를 제공한다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 필터 버블·프라이버시 등 맞춤형 서비스의 부작용도 존재한다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 인간을 대체하는 것이 아니라 협업해 더 나은 사회를 만드는 도구다</li>
        </ul>
      </section>
    </article>
  )
}
