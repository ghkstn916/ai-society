import { Link } from 'react-router-dom'
import { modules, allLessons } from '../data/lessonRegistry.js'
import useProgressStore from '../store/progressStore.js'

const moduleColors = {
  blue: '#2563eb',
  green: '#16a34a',
}

export default function Home() {
  const isComplete = useProgressStore(s => s.isComplete)

  const totalLessons = allLessons.filter(l => !l.isQuiz).length
  const doneCount = allLessons.filter(l => !l.isQuiz && isComplete(l.id)).length

  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      {/* Hero */}
      <div className="bg-[#1e3a8a] text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-wider uppercase opacity-75 mb-3">고등학교 3학년 · 인공지능 기초</p>
          <h1 className="text-4xl font-black mb-4">🤖 인공지능과 사회</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            인공지능이 우리 삶과 사회를 어떻게 바꾸고 있는지,<br />
            함께 탐구하고 미래를 준비합니다.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* 통계 배지 */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { num: '2', label: '모듈' },
            { num: String(totalLessons), label: '레슨' },
            { num: '2', label: '형성평가' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-[#1e3a8a]">{item.num}</div>
              <div className="text-sm text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 모듈 카드 */}
        <h2 className="text-lg font-bold text-gray-700 mb-4">수업 구성</h2>
        <div className="flex flex-col gap-5">
          {modules.map((mod, mIdx) => {
            const color = moduleColors[mod.color] || '#2563eb'
            const modLessons = mod.lessons.filter(l => !l.isQuiz)
            const completed = modLessons.filter(l => isComplete(l.id)).length
            const total = modLessons.length
            const pct = Math.round((completed / total) * 100)
            const firstLesson = mod.lessons[0]

            return (
              <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-2" style={{ backgroundColor: color }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">모듈 {mIdx + 1}</span>
                      <h3 className="text-lg font-bold mt-0.5" style={{ color }}>{mod.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{mod.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-black" style={{ color }}>{pct}%</span>
                      <p className="text-xs text-gray-400">{completed}/{total}</p>
                    </div>
                  </div>

                  {/* 진행 바 */}
                  <div className="h-1.5 bg-gray-100 rounded-full mb-4">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>

                  {/* 레슨 목록 */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {mod.lessons.map(lesson => (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${lesson.moduleId}/${lesson.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-gray-300 bg-gray-50 hover:bg-white text-sm text-gray-700 transition-all"
                      >
                        <span className="flex-shrink-0">
                          {lesson.isQuiz ? '📝' : isComplete(lesson.id) ? '✅' : '○'}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to={`/lesson/${firstLesson.moduleId}/${firstLesson.id}`}
                    className="inline-block px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: color }}
                  >
                    {completed > 0 ? '이어하기 →' : '시작하기 →'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* 핵심 질문 */}
        <div className="mt-8 rounded-2xl bg-[#1e3a8a] text-white p-7 text-center">
          <p className="text-xs font-semibold text-blue-300 mb-2 tracking-wide uppercase">핵심 질문</p>
          <h3 className="text-xl font-bold mb-1">인공지능은 개인의 삶과 사회에 어떤 영향을 미칠까?</h3>
          <p className="text-blue-200 text-sm mt-2">이 단원을 마치면 스스로 답할 수 있게 됩니다.</p>
        </div>
      </div>
    </div>
  )
}
