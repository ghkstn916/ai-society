import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz.jsx'
import FlipReveal from '../../components/interactive/FlipReveal.jsx'

function ExpandableImage({ thumb, full, alt }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <img
        src={thumb}
        alt={alt}
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl shadow cursor-pointer hover:opacity-90 transition-opacity"
      />
      <p className="text-xs text-slate-400 text-center mt-1 mb-2">🔍 이미지를 클릭하면 크게 볼 수 있습니다</p>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={full}
              alt={alt}
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-lg hover:bg-black/70"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const aiExamples = [
  {
    icon: '🔊',
    label: '인공지능 스피커',
    reason: '왜 인공지능인가?',
    desc: '단순히 버튼을 눌러 소리를 내는 것이 아닙니다. "오늘 날씨 어때?"처럼 사람의 말을 듣고, 목소리에서 단어와 의미를 스스로 분석해 상황에 맞는 대답을 합니다. 목소리 인식·자연어 처리·대화 맥락 파악까지, 인간의 언어 능력을 기계로 구현한 것입니다.',
  },
  {
    icon: '🚗',
    label: '자율 주행 자동차',
    reason: '왜 인공지능인가?',
    desc: '카메라·레이더·라이다 센서로 주변 환경을 실시간으로 인식하고, 신호등·보행자·다른 차량을 스스로 판단해 속도와 방향을 결정합니다. 정해진 규칙만 따르는 것이 아니라, 예상치 못한 상황에서도 데이터를 분석해 최선의 행동을 선택합니다.',
  },
  {
    icon: '📱',
    label: '얼굴 인식 잠금',
    reason: '왜 인공지능인가?',
    desc: '수백만 장의 얼굴 사진 데이터를 학습해 눈·코·입의 위치와 비율 같은 특징을 스스로 파악합니다. 안경을 쓰거나 머리 스타일이 바뀌어도 "같은 사람"임을 인식할 수 있는 이유가 바로 이 학습 능력 덕분입니다.',
  },
  {
    icon: '🛒',
    label: '쇼핑 추천 알고리즘',
    reason: '왜 인공지능인가?',
    desc: '내가 검색하고 구매한 기록, 비슷한 취향을 가진 다른 사람들의 구매 패턴을 분석해 "지금 이 사람에게 가장 필요한 상품"을 스스로 예측합니다. 사람이 일일이 규칙을 만들지 않아도 데이터에서 패턴을 찾아내는 것이 AI의 핵심입니다.',
  },
]

function AIExampleCards() {
  const [openId, setOpenId] = useState(null)
  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      {aiExamples.map(item => {
        const isOpen = openId === item.label
        return (
          <div
            key={item.label}
            onClick={() => setOpenId(isOpen ? null : item.label)}
            className={`rounded-xl border cursor-pointer transition-all shadow-sm ${
              isOpen
                ? 'bg-blue-50 border-blue-300 col-span-2'
                : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/40'
            }`}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              </div>
              <span className={`text-slate-400 text-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </div>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-blue-200">
                <p className="text-xs font-bold text-blue-600 mb-1">{item.reason}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function YouTubeEmbed({ videoId }) {
  const [playing, setPlaying] = useState(false)
  return playing ? (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      className="w-full aspect-video rounded-2xl shadow"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : (
    <div
      className="relative cursor-pointer group"
      onClick={() => setPlaying(true)}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="유튜브 영상 썸네일"
        className="w-full rounded-2xl shadow object-cover"
        onError={e => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
      />
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20 group-hover:bg-black/30 transition-all">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
          <span className="text-white text-2xl ml-1">▶</span>
        </div>
      </div>
    </div>
  )
}

export default function Lesson1_1() {
  return (
    <article className="space-y-8">
      {/* 헤더 */}
      <header>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">모듈 1 · 레슨 1</span>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">인공지능이란 무엇인가?</h1>
        <p className="text-slate-500 text-sm">인공지능의 개념과 4가지 특성을 이해하고, 이를 연구한 과학자들을 알아봅니다.</p>
      </header>

      {/* 이 레슨에서 배우는 것 */}
      <section className="rounded-2xl bg-blue-50 border border-blue-200 p-5">
        <h2 className="font-bold text-blue-800 mb-3">이 레슨에서 배우는 것</h2>
        <ul className="space-y-1.5 text-sm text-blue-900">
          <li className="flex items-start gap-2"><span>•</span> 인공지능의 개념과 정의를 설명할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 인공지능의 4가지 특성을 구분할 수 있다</li>
          <li className="flex items-start gap-2"><span>•</span> 튜링 테스트가 무엇인지 설명할 수 있다</li>
        </ul>
      </section>

      {/* AI 뉴스 도입 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">🎵 전설의 가수들이 AI로 노래한다</h2>
        <YouTubeEmbed videoId="Jm0s0CEEd3Q" />
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm text-slate-700 leading-relaxed mt-4">
          <p>케이블 TV의 한 음악 방송에서 세상을 떠난 가수들의 목소리를 AI로 복원하는 특집 방송이 시도되었습니다. AI 음성 복원 기술로 만든 음성은 생전의 목소리라고 해도 무방할 만큼 완성도가 높았고, 관객들은 큰 감동을 받았습니다.</p>
          <p className="mt-2 text-slate-500">→ 이런 기술이 가능한 이유가 무엇일까요? 이 레슨에서 함께 알아봅시다.</p>
        </div>
      </section>

      {/* 1. 인공지능의 개념 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">1. 인공지능이란 무엇일까?</h2>
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-5 mb-4">
          <p className="text-sm font-semibold text-blue-100 mb-1">핵심 정의</p>
          <p className="text-base font-bold leading-relaxed">
            인공지능(AI)은 인간의 지능으로 수행할 수 있는 다양한 인식, 사고, 학습 활동 등을 기계가 할 수 있도록 구현하는 기술이자 그 기술을 연구하는 학문 분야이다.
          </p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          쉽게 말하면, <strong>인간의 지능 전부나 일부를 기계로 구현한 것</strong>입니다. 인공지능 스피커, 자율 주행 자동차, 얼굴 인식 잠금 해제가 모두 AI 기술의 예입니다.
        </p>
        <ExpandableImage
          thumb="/ai-society/image/16_1.png"
          full="/ai-society/image/16_2.png"
          alt="인공지능 개념 설명 이미지"
        />
        <p className="text-sm text-slate-500 mt-4 mb-2">아래 카드를 클릭하면 왜 인공지능인지 확인할 수 있어요.</p>
        <AIExampleCards />
      </section>

      {/* 중간 실습 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">🎯 실습해보기</h2>
        <ChoiceQuiz
          question="다음 중 인공지능(AI) 기술이 사용된 것은 어느 것일까요?"
          options={[
            '자동으로 열리는 마트 자동문',
            '버튼을 누르면 작동하는 전자레인지',
            '내가 자주 보는 영상을 알아서 추천해 주는 유튜브',
            '시간이 되면 울리는 자명종 알람',
            '형광등 스위치를 올리면 켜지는 조명',
          ]}
          answer={2}
          explanation="유튜브의 추천 알고리즘은 내가 본 영상 기록을 분석해 취향을 스스로 파악하고 영상을 추천합니다. 나머지는 정해진 규칙대로만 동작하는 일반 기계입니다."
          storageKey="ai-m1l1-mid-quiz"
        />
      </section>

      {/* AI 과학자들 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">🧑‍🔬 인공지능을 만든 과학자들</h2>
        <img
          src="https://i.namu.wiki/i/rQBSP7X2mZlcoIXAB9dUT3sklm5-EkbarP0XwuiqpOkWyiSIUPsxDYl2_jOp4iSYILPSlc3GhMjrVQ9AJntsUV7Ls25lz0sBQBh7dlm0A5qZI8DD86AXz0Ajus6WdNBUjMaa3WFTER3xM9qYQsBe3Q.webp"
          alt="인공지능을 만든 과학자들"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="space-y-3">
          {[
            { name: '앨런 튜링 (1912~1954)', desc: '최초의 컴퓨터를 만든 과학자. 1950년 「컴퓨팅 기계와 지능」 논문에서 인공지능을 정의하고 튜링 테스트를 제안했다.' },
            { name: '피터 노빅 (1956~ )', desc: '스튜어트 러셀과 함께 「인공지능: 현대적 접근 방식」을 저술해 현대 AI의 개념을 정리했다.' },
            { name: '스튜어트 러셀 (1962~ )', desc: 'UC버클리 인공지능 연구소를 이끄는 세계적인 석학이다.' },
          ].map(s => (
            <div key={s.name} className="flex gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <span className="text-2xl mt-0.5">👤</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{s.name}</p>
                <p className="text-sm text-slate-600 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. AI의 4가지 특성 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">2. 인공지능의 4가지 특성</h2>
        <p className="text-sm text-slate-600 mb-4">피터 노빅과 스튜어트 러셀은 AI가 아래 4가지 특성을 가진다고 했습니다. 어떤 특성을 중요하게 보느냐에 따라 연구 방향이 완전히 달라집니다.</p>
        <div className="space-y-3">
          {[
            {
              title: '인간 같은 행동 (Acting Humanly)',
              color: 'blue',
              desc: '사람처럼 대화하고, 물체를 알아보고, 문제를 스스로 해결하는 기계를 만들려 했습니다.',
              example: '💡 튜링 테스트: 심사원이 컴퓨터와 사람을 구분하지 못하면 통과!',
            },
            {
              title: '인간 같은 사고 (Thinking Humanly)',
              color: 'purple',
              desc: '인간의 인지 과정과 마음을 연구해, 그것을 기계로 흉내 내려 했습니다.',
              example: '💡 신경과학·심리학 연구 결과를 계산 모델로 구현',
            },
            {
              title: '합리적 행동 (Acting Rationally)',
              color: 'green',
              desc: '어떻게 생각하는지 고민하지 말고, 주어진 상황에서 최선의 행동을 하는 기계를 만들자는 방향입니다.',
              example: '💡 쇼핑몰 AI: 가격·품질·취향을 종합해 최적 상품 추천',
            },
            {
              title: '합리적 사고 (Thinking Rationally)',
              color: 'amber',
              desc: '삼단 논법처럼 올바른 전제에서 항상 옳은 결론을 이끌어 내는 방식을 연구했습니다.',
              example: '💡 "모든 사람은 죽는다 → 소크라테스는 사람이다 → 그러므로 소크라테스는 죽는다"',
            },
          ].map(item => {
            const bg = { blue: 'bg-blue-50 border-blue-200', purple: 'bg-purple-50 border-purple-200', green: 'bg-green-50 border-green-200', amber: 'bg-amber-50 border-amber-200' }
            const title = { blue: 'text-blue-800', purple: 'text-purple-800', green: 'text-green-800', amber: 'text-amber-800' }
            return (
              <div key={item.title} className={`rounded-2xl border p-4 ${bg[item.color]}`}>
                <p className={`font-bold text-sm mb-1 ${title[item.color]}`}>{item.title}</p>
                <p className="text-sm text-slate-700 mb-2">{item.desc}</p>
                <p className="text-xs text-slate-500 bg-white/70 rounded-xl px-3 py-1.5">{item.example}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 튜링 테스트 FlipReveal */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">🧪 튜링 테스트 이해하기</h2>
        <img
          src="http://terms.tta.or.kr/upload/image/terms2021/43_turingtest.png"
          alt="튜링 테스트 설명 이미지"
          className="w-full rounded-2xl object-contain mb-4 shadow bg-white p-2"
        />
        <FlipReveal
          question="튜링 테스트를 '통과'한다는 것은 무슨 의미일까요?"
          answer="심사원이 상대방과 메시지를 주고받은 뒤 어느 쪽이 컴퓨터인지 구별하지 못한다면, 그 컴퓨터는 튜링 테스트를 통과한 것입니다. 하지만 지금까지 완벽하게 튜링 테스트를 통과한 AI는 없습니다. 인간처럼 생각하고 판단하는 것을 기계로 구현하기가 그만큼 어렵기 때문입니다."
          storageKey="ai-m1l1-flip-0"
        />
      </section>

      {/* 퀴즈 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">✏️ 확인 퀴즈</h2>
        <ChoiceQuiz
          question="인공지능의 개념으로 가장 옳은 설명은 무엇인가요?"
          options={[
            '인간이 만든 모든 소프트웨어를 통칭하는 말이다',
            '인간의 지능 전부나 일부를 기계로 구현한 기술이다',
            '인터넷에 연결된 컴퓨터 네트워크를 의미한다',
            '데이터를 저장하고 처리하는 데이터베이스 시스템이다',
            '사람이 직접 모든 규칙을 코딩해 넣은 프로그램이다',
          ]}
          answer={1}
          explanation="인공지능은 인간의 지능으로 수행할 수 있는 인식, 사고, 학습 활동 등을 기계가 할 수 있도록 구현하는 기술입니다."
          storageKey="ai-m1l1-quiz-0"
        />
        <ChoiceQuiz
          question="피터 노빅과 스튜어트 러셀이 제시한 인공지능의 특성이 아닌 것은?"
          options={[
            '인간 같은 행동 (Acting Humanly)',
            '합리적 사고 (Thinking Rationally)',
            '감성적 공감 (Emotional Empathy)',
            '합리적 행동 (Acting Rationally)',
            '인간 같은 사고 (Thinking Humanly)',
          ]}
          answer={2}
          explanation="노빅과 러셀이 제시한 4가지 특성은 인간 같은 행동, 인간 같은 사고, 합리적 행동, 합리적 사고입니다. 감성적 공감은 포함되지 않습니다."
          storageKey="ai-m1l1-quiz-1"
        />
        <ChoiceQuiz
          question="튜링 테스트에서 '통과'의 기준은?"
          options={[
            '컴퓨터가 체스 게임에서 세계 챔피언을 이겼을 때',
            '심사원이 컴퓨터와 사람을 구분하지 못했을 때',
            '컴퓨터가 100개의 질문에 모두 정답을 맞혔을 때',
            '컴퓨터가 사람보다 빠른 속도로 계산을 수행했을 때',
            '컴퓨터가 스스로 새로운 질문을 만들어냈을 때',
          ]}
          answer={1}
          explanation="튜링 테스트는 심사원이 상대방이 컴퓨터인지 사람인지 구별하지 못할 때 통과로 인정합니다."
          storageKey="ai-m1l1-quiz-2"
        />
      </section>

      {/* 요약 */}
      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 인공지능은 인간의 지능 전부나 일부를 기계로 구현한 기술이다</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> AI의 4가지 특성: 인간 같은 행동/사고, 합리적 행동/사고</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 튜링 테스트: 심사원이 사람과 기계를 구분하지 못하면 통과</li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✓</span> 어떤 특성을 중요하게 생각하느냐에 따라 AI 연구 방향이 달라진다</li>
        </ul>
      </section>
    </article>
  )
}
