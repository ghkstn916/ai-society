import { useState } from 'react'
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

const aiExperts = [
  {
    name: '앨런 튜링 (Alan Turing)',
    role: '인공지능의 아버지',
    desc: '현대 컴퓨터의 모형인 튜링 머신과 기계 지능을 판단하는 튜링 테스트 개념을 제안했다. 2021년 영국 중앙은행 새 지폐 도안의 인물로 선정됐다.',
    icon: '🖥️',
  },
  {
    name: '제프리 힌턴 (Geoffrey Hinton)',
    role: '딥러닝의 아버지',
    desc: '신경망 분야를 부활시킨 딥러닝 개념을 만들었다. 2018년 요슈아 벤지오, 얀 르쿤과 함께 컴퓨터 과학의 노벨상이라 불리는 튜링상을 공동 수상했다.',
    icon: '🧠',
  },
  {
    name: '페이페이 리 (Fei-Fei Li)',
    role: '컴퓨터 비전 연구자',
    desc: '컴퓨터 비전 분야를 이끌며 세계 최대 이미지 데이터베이스인 이미지넷(ImageNet) 구축을 주도했다. 이미지넷 대회에서 딥러닝 기술이 압도적 성능을 보이며 AI 붐의 전환점이 됐다.',
    icon: '📸',
  },
  {
    name: '아라이 노리코 (新井 紀子)',
    role: 'AI 한계 연구자',
    desc: '인공지능 로봇이 도쿄 대학교 합격을 목표로 입시를 치를 수 있는지 실험(도로보쿤 프로젝트)했다. AI의 한계와 인간 교육의 방향을 연구하는 데 결과를 활용 중이다.',
    icon: '🎓',
  },
]

const jobs = [
  {
    id: 'ai-engineer',
    icon: '🤖',
    title: '인공지능 엔지니어',
    summary: 'AI 솔루션 설계 및 개발 담당',
    detail: 'AI 시스템의 전반을 설계하고 개발하는 핵심 직업입니다. 머신러닝 모델을 학습시키고, AI 알고리즘을 실제 제품에 적용하며, 시스템 성능을 최적화합니다. Python, TensorFlow, PyTorch 등의 도구를 사용하며, 컴퓨터공학·수학 지식이 기반이 됩니다.',
    skills: '프로그래밍, 수학/통계, 딥러닝 프레임워크',
    color: 'blue',
  },
  {
    id: 'data-scientist',
    icon: '📊',
    title: '데이터 사이언티스트',
    summary: '대규모 데이터 분석으로 의사결정 지원',
    detail: '방대한 양의 데이터에서 의미 있는 패턴과 인사이트를 찾아내는 전문가입니다. 기업이 AI를 도입하거나 데이터 기반으로 의사결정을 내릴 수 있도록 지원합니다. 데이터 수집·정제·분석·시각화 전 과정을 담당하며, 통계학·프로그래밍 능력이 필요합니다.',
    skills: '통계학, 데이터 시각화, SQL, Python',
    color: 'green',
  },
  {
    id: 'ml-expert',
    icon: '🧠',
    title: '기계학습 전문가',
    summary: 'AI가 데이터를 학습해 정확한 예측을 하도록 모델 설계',
    detail: '기계학습 알고리즘을 연구하고 최적화하는 전문가입니다. AI가 스스로 패턴을 학습할 수 있는 모델을 설계하며, 의료 진단·자율주행·언어 처리 등 다양한 분야의 학습 모델을 개발합니다. 최신 AI 연구 논문을 이해하고 실제 시스템에 적용하는 능력이 요구됩니다.',
    skills: '딥러닝, 알고리즘 최적화, 수학적 모델링',
    color: 'purple',
  },
  {
    id: 'ai-ethics',
    icon: '⚖️',
    title: 'AI 윤리 전문가',
    summary: 'AI 시스템의 공정성·투명성·안전성 검토',
    detail: 'AI가 인종·성별·나이에 따라 차별적인 결정을 내리지 않도록 시스템을 감시하고 개선하는 전문가입니다. AI 정책 수립, 법·제도 연구, 기업 AI 윤리 가이드라인 작성 등의 업무를 합니다. 기술과 인문·법학·철학 지식을 모두 갖춘 융합형 직업입니다.',
    skills: 'AI 기술 이해, 법학/철학, 정책 분석',
    color: 'amber',
  },
  {
    id: 'robot-emotion',
    icon: '🦾',
    title: '로봇 감성 인지 연구원',
    summary: '로봇이 인간의 의도와 감정에 따라 효율적으로 작동하도록 연구',
    detail: '로봇이 인간의 표정, 목소리 톤, 몸짓 언어를 인식하고 적절하게 반응하도록 연구하는 전문가입니다. 고령자 돌봄 로봇, 의료 보조 로봇, 교육 로봇 등 인간과 밀접하게 상호작용하는 로봇 개발에 필수적입니다. 인지과학·심리학·로봇공학이 결합된 최첨단 분야입니다.',
    skills: '로봇공학, 인지과학, 감성 컴퓨팅',
    color: 'teal',
  },
]

const jobColorMap = {
  blue:   { border: 'border-blue-200',   bg: 'bg-blue-50',   icon: 'bg-blue-100 text-blue-700',   title: 'text-blue-800',   tag: 'bg-blue-100 text-blue-600'   },
  green:  { border: 'border-green-200',  bg: 'bg-green-50',  icon: 'bg-green-100 text-green-700',  title: 'text-green-800',  tag: 'bg-green-100 text-green-600'  },
  purple: { border: 'border-purple-200', bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-700', title: 'text-purple-800', tag: 'bg-purple-100 text-purple-600' },
  amber:  { border: 'border-amber-200',  bg: 'bg-amber-50',  icon: 'bg-amber-100 text-amber-700',  title: 'text-amber-800',  tag: 'bg-amber-100 text-amber-600'  },
  teal:   { border: 'border-teal-200',   bg: 'bg-teal-50',   icon: 'bg-teal-100 text-teal-700',   title: 'text-teal-800',   tag: 'bg-teal-100 text-teal-600'   },
}

export default function Lesson2_3() {
  const [openJob, setOpenJob] = useState(null)

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
          <li className="flex items-start gap-2"><span>•</span> AI 시대의 세 가지 직업 방향을 이해한다</li>
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

      {/* AI 시대 세 가지 직업 방향 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">2. AI 시대의 세 가지 직업 방향</h2>
        <p className="text-sm text-slate-600 mb-4">AI 기술이 발전하면서 직업 세계는 크게 세 가지 방향으로 변화하고 있습니다.</p>
        <div className="space-y-3">
          {[
            {
              num: '①',
              title: 'AI를 연구·개발한다',
              color: 'blue',
              desc: '인공지능 알고리즘, 딥러닝 모델, 데이터 처리 기술 등을 직접 연구하고 개발하는 직업입니다. AI 연구원, 머신러닝 엔지니어 등이 여기에 해당합니다.',
              example: '예: AI 연구원, 머신러닝 엔지니어, 딥러닝 개발자',
            },
            {
              num: '②',
              title: 'AI를 적용해 새로운 제품·서비스를 만든다',
              color: 'green',
              desc: '기존 AI 기술을 활용해 새로운 제품이나 서비스를 기획·개발하는 직업입니다. AI 스타트업 창업자, AI 프로덕트 매니저 등이 여기에 해당합니다.',
              example: '예: AI 프로덕트 매니저, AI 서비스 기획자, AI 스타트업 창업자',
            },
            {
              num: '③',
              title: '자신의 직업에 AI를 활용한다',
              color: 'purple',
              desc: '의사·교사·변호사·디자이너 등 기존 직업을 가진 사람이 AI 도구를 업무에 활용해 더 효율적으로 일하는 방향입니다. 가장 많은 사람에게 해당되는 변화입니다.',
              example: '예: AI를 활용하는 의사·변호사·교사·디자이너·기자',
            },
          ].map(item => {
            const bg = { blue: 'bg-blue-50 border-blue-200', green: 'bg-green-50 border-green-200', purple: 'bg-purple-50 border-purple-200' }
            const text = { blue: 'text-blue-800', green: 'text-green-800', purple: 'text-purple-800' }
            const sub = { blue: 'text-blue-600', green: 'text-green-600', purple: 'text-purple-600' }
            return (
              <div key={item.num} className={`rounded-2xl border p-4 ${bg[item.color]}`}>
                <div className="flex items-start gap-3">
                  <span className={`text-lg font-extrabold flex-shrink-0 ${text[item.color]}`}>{item.num}</span>
                  <div>
                    <p className={`font-bold text-sm mb-1 ${text[item.color]}`}>{item.title}</p>
                    <p className="text-sm text-slate-700 mb-2 leading-relaxed">{item.desc}</p>
                    <p className={`text-xs ${sub[item.color]}`}>{item.example}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500">
          💡 특히 ③번 방향은 여러분 모두에게 해당됩니다. 미래의 직업에서 AI를 도구로 활용할 줄 아는 능력이 점점 중요해지고 있습니다.
        </div>
      </section>

      {/* 자동화 대체율 분류 활동 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">3. 활동: 자동화 대체율 분류하기</h2>
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
        <h2 className="text-lg font-bold text-slate-800 mb-3">4. 자동화 대체율이 높은/낮은 직업의 특징</h2>
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
        <h2 className="text-lg font-bold text-slate-800 mb-3">5. 미래 핵심 역량: 인공지능 유창성</h2>
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=250&fit=crop"
          alt="미래 직업 준비"
          className="w-full rounded-2xl object-cover mb-4 shadow"
        />
        <div className="rounded-2xl bg-teal-50 border border-teal-200 p-5 mb-4">
          <p className="text-xs font-semibold text-teal-500 mb-1">핵심 개념</p>
          <p className="font-bold text-slate-800">인공지능 유창성 (AI Fluency)</p>
          <p className="text-sm text-slate-600 mt-1">인간과 AI의 능력을 파악하고, 적절한 업무에 AI를 활용할 수 있는 미래 인재의 필수 능력</p>
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

      {/* AI 전문가 소개 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-3">6. 주목할 AI 전문가들</h2>
        <p className="text-sm text-slate-500 mb-4">AI 분야의 발전을 이끈 주요 인물들을 알아봅시다.</p>
        <div className="space-y-3">
          {aiExperts.map(expert => (
            <div key={expert.name} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <span className="text-3xl flex-shrink-0">{expert.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{expert.name}</p>
                <p className="text-xs font-semibold text-green-600 mb-1">{expert.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{expert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 인공지능 관련 유망 직업 */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-2">7. AI 관련 유망 직업</h2>
        <p className="text-sm text-slate-500 mb-3">카드를 클릭하면 직업 설명과 필요 역량을 확인할 수 있습니다.</p>
        <div className="space-y-2">
          {jobs.map(job => {
            const isOpen = openJob === job.id
            const c = jobColorMap[job.color]
            return (
              <div
                key={job.id}
                onClick={() => setOpenJob(isOpen ? null : job.id)}
                className={`rounded-2xl border cursor-pointer transition-all overflow-hidden ${isOpen ? `${c.border} ${c.bg}` : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isOpen ? c.icon : 'bg-slate-100'}`}>
                      {job.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${isOpen ? c.title : 'text-slate-800'}`}>{job.title}</p>
                      <p className="text-xs text-slate-500 truncate">{job.summary}</p>
                    </div>
                    <span className={`text-slate-400 text-xs transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                  </div>
                  {isOpen && (
                    <div className={`mt-3 pt-3 border-t ${c.border}`}>
                      <p className="text-sm text-slate-700 leading-relaxed mb-3">{job.detail}</p>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${c.tag}`}>
                        <span>🎯</span> 필요 역량: {job.skills}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
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
        <ChoiceQuiz
          question="딥러닝 개념을 만들어 2018년 튜링상을 수상한 인물이 아닌 사람은?"
          options={[
            '제프리 힌턴 (Geoffrey Hinton)',
            '요슈아 벤지오 (Yoshua Bengio)',
            '얀 르쿤 (Yann LeCun)',
            '페이페이 리 (Fei-Fei Li)',
            '위 세 명 모두 수상했다',
          ]}
          answer={3}
          explanation="2018년 튜링상은 딥러닝 개념을 만든 제프리 힌턴, 요슈아 벤지오, 얀 르쿤이 공동 수상했습니다. 페이페이 리는 이미지넷 구축으로 알려진 컴퓨터 비전 연구자입니다."
          storageKey="ai-m2l3-quiz-2"
        />
      </section>

      <section className="rounded-2xl bg-slate-800 text-white p-5">
        <h2 className="font-bold mb-3">이번 레슨에서 배운 것</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI 시대 직업은 ① AI 연구·개발 ② AI로 제품·서비스 제작 ③ 직업에 AI 활용, 세 방향으로 변화한다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> AI는 일자리를 없애기도 하지만 동시에 새로운 직업을 만들어낸다</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 반복·정형화 직업은 대체율 높음 / 창의·감성 직업은 대체율 낮음</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 인공지능 유창성: AI와 협업하는 능력이 미래 필수 역량</li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span> 제프리 힌턴(딥러닝), 페이페이 리(이미지넷) 등이 현대 AI 발전을 이끌었다</li>
        </ul>
      </section>
    </article>
  )
}
