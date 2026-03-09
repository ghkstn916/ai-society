import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'

const timeline = [
  { year: '1956', title: '다트머스 회의', desc: '학자들이 모여 지능을 가진 기계를 "인공지능"이라 부르기로 하고 연구 방향을 논의했다. 이후 AI 연구의 본격적인 출발점이 되었다.' },
  { year: '1969', title: '로봇 셰이키(Shakey)', desc: '자신의 행동을 추론할 수 있는 최초의 모바일 로봇. 화성 탐사선 설계, 웹 서버 구축, 자동차 개발 등에 영향을 끼쳤다.' },
  { year: '1988', title: '카드 승인 시스템', desc: '전문가의 지식을 컴퓨터에 넣은 전문가 시스템을 비즈니스에 적용한 성공 사례. 개인 카드 결제 승인 여부를 자동으로 확인했다.' },
  { year: '1996', title: '책 추천 시스템 & 로봇 청소기', desc: '아마존이 유사한 책을 구매한 소비자 그룹을 분석해 맞춤형 책 추천 서비스를 시작했다. 같은 해 최초의 상업용 로봇 청소기도 등장했다.' },
  { year: '2004', title: '자율 주행 자동차 경주 대회', desc: 'DARPA가 주최한 자율 주행 자동차 대회가 화제가 되며 많은 기업이 자율 주행 연구에 참여하기 시작했다.' },
  { year: '2011', title: '왓슨 & AI 비서', desc: 'IBM 왓슨이 퀴즈 쇼에 참가해 우승. 같은 해 스마트폰 AI 개인 비서가 공개되어 이후 애플리케이션 실행부터 일정 관리까지 담당하게 되었다.' },
  { year: '2016', title: '알파고', desc: 'AI 바둑 프로그램 알파고가 세계 최고 수준의 바둑 기사 이세돌을 이겼다. AI가 인류 난제 해결에도 기여할 수 있다는 기대를 높였다.' },
]

export default function Lesson2_1() {
  const [openYear, setOpenYear] = useState(null)

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

      {/* AI 기술 발전 역사 타임라인 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-1">1. 인공지능 기술은 어떻게 발전했을까?</h2>
        <p className="text-sm text-slate-500 mb-4">연도를 클릭하면 해당 시기의 핵심 사건을 확인할 수 있습니다.</p>
        <div className="relative">
          {/* 타임라인 세로선 */}
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

      {/* 스마트폰 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">2. AI가 들어온 스마트폰</h2>
        <img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&h=280&fit=crop"
          alt="스마트폰 활용"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          우리가 매일 쓰는 스마트폰에는 수십 가지 AI 기능이 들어 있습니다.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '👤', label: '얼굴 인식 잠금', desc: '내 얼굴을 학습해 잠금 해제·결제' },
            { icon: '📷', label: 'AI 카메라', desc: '인물·풍경 인식, 자동 설정 최적화' },
            { icon: '🌐', label: '실시간 번역', desc: '외국어 메뉴를 카메라로 비추면 번역' },
            { icon: '🎵', label: '음악 인식', desc: '흘러나오는 노래를 들으면 곡명 알림' },
            { icon: '❤️', label: '건강 관리', desc: '웨어러블 데이터로 맥박·수면 분석' },
            { icon: '🏠', label: 'IoT 제어', desc: '집 안 기기를 음성으로 원격 제어' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm font-semibold text-slate-800 mt-1">{item.label}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
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
        <div className="rounded-2xl bg-gradient-to-br from-green-600 to-teal-600 text-white p-5 mb-4">
          <p className="text-xs font-semibold text-green-100 mb-1">핵심 원리</p>
          <p className="font-bold text-sm leading-relaxed">AI는 내가 자주 검색한 단어, 시청한 영상, 구매 내역을 분석해 내가 좋아할 만한 것을 예측합니다.</p>
        </div>
        <div className="space-y-3">
          {[
            { platform: '유튜브', desc: '시청 기록과 좋아요 데이터를 분석해 관심 있을 영상 추천' },
            { platform: '넷플릭스', desc: '시청 패턴·장르·평점을 분석해 다음 볼 작품 추천' },
            { platform: '쇼핑몰', desc: '조회한 상품·구매 이력으로 비슷한 상품 자동 매칭' },
            { platform: '뉴스 앱', desc: '클릭 패턴으로 관심 분야 기사를 우선 노출' },
          ].map(item => (
            <div key={item.platform} className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />
              <div>
                <span className="text-sm font-bold text-slate-800">{item.platform}</span>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
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
          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&h=240&fit=crop"
          alt="학생 학습"
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
        <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-green-700 text-white p-5 mb-4">
          <p className="text-xs font-semibold text-teal-100 mb-2">핵심 관점</p>
          <p className="font-bold text-sm leading-relaxed">인공지능은 사람을 도와 사회의 다양한 문제 해결을 위해 활용될 뿐만 아니라, 더 가치 있고 창의적인 새로운 일을 할 수 있게 도움을 줄 수 있다.</p>
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
