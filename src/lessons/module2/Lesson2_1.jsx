import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'

export default function Lesson2_1() {
  return (
    <article className="space-y-8">
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-3">모듈 2 · 레슨 1</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능과 개인 삶의 변화</h1>
        <p className="text-slate-500 text-sm">스마트폰, 맞춤형 서비스, 교육까지 — AI가 일상을 어떻게 바꾸고 있는지 살펴봅니다.</p>
      </header>

      <section className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <h2 className="font-bold text-green-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-green-900">
          <li className="flex items-start gap-2"><span>•</span> AI가 개인의 일상에 가져온 구체적 변화를 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 개인 맞춤형 서비스의 원리를 이해한다</li>
          <li className="flex items-start gap-2"><span>•</span> AI 교육 서비스의 가능성과 한계를 생각할 수 있다</li>
        </ul>
      </section>

      {/* 스마트폰 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">1. AI가 들어온 스마트폰</h2>
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
        <h2 className="text-lg font-bold text-slate-800 mb-3">2. 나를 위한 맞춤형 서비스</h2>
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
        <h2 className="text-lg font-bold text-slate-800 mb-3">3. AI가 바꾸는 교육</h2>
        <img
          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&h=240&fit=crop"
          alt="학생 학습"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="space-y-3 text-sm text-slate-700">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="font-semibold mb-1">📊 데이터 기반 개인 맞춤 학습</p>
            <p>AI가 학생의 표정, 눈동자 움직임, 문제별 정답률, 집중 시간 등을 분석해 각 학생에게 딱 맞는 학습을 제공합니다.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="font-semibold mb-1">🎮 게임형 학습</p>
            <p>어려운 수학 개념을 게임으로 배우거나, AI가 외국어 발음을 실시간으로 교정해 주는 방식이 가능합니다.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="font-semibold mb-1">🌍 교육 기회의 평등</p>
            <p>AI 교육 서비스는 교육 소외 계층에게도 평등한 학습 기회를 제공할 수 있다는 점에서 기대가 큽니다.</p>
          </div>
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
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 스마트폰의 얼굴 인식·AI 카메라·번역·건강 관리 등이 모두 AI 기술</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 나의 데이터를 분석해 맞춤형 서비스를 제공한다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 필터 버블·프라이버시 등 맞춤형 서비스의 부작용도 존재한다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI 교육은 개인 맞춤 학습과 교육 기회 평등을 가능하게 한다</li>
        </ul>
      </section>
    </article>
  )
}
