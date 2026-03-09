import { Link } from 'react-router-dom'
import { modules, allLessons } from '../data/lessonRegistry.js'
import useProgressStore from '../store/progressStore.js'

const colorMap = {
  blue: {
    card: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50',
    badge: 'bg-blue-100 text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    icon: 'bg-blue-100 text-blue-600',
    progress: 'bg-blue-500',
  },
  green: {
    card: 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50',
    badge: 'bg-green-100 text-green-700',
    btn: 'bg-green-600 hover:bg-green-700 text-white',
    icon: 'bg-green-100 text-green-600',
    progress: 'bg-green-500',
  },
}

const moduleIcons = { module1: '🤖', module2: '🌐' }

export default function Home() {
  const isComplete = useProgressStore(s => s.isComplete)

  const totalLessons = allLessons.filter(l => !l.isQuiz).length
  const doneCount = allLessons.filter(l => !l.isQuiz && isComplete(l.id)).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500 bg-opacity-40 text-xs font-semibold mb-4 tracking-wide">
                고등학교 3학년 · 인공지능 기초
              </span>
              <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                인공지능과 사회
              </h1>
              <p className="text-blue-100 text-base leading-relaxed mb-6">
                인공지능이 우리 삶과 사회를 어떻게 바꾸고 있는지,<br />
                함께 탐구하고 미래를 준비합니다.
              </p>
              <div className="flex items-center gap-6 text-sm text-blue-100">
                <span>📚 {allLessons.filter(l => !l.isQuiz).length}개 레슨</span>
                <span>⏱ 약 3시간</span>
                <span>✅ 모듈별 형성평가</span>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=380&h=280&fit=crop"
                alt="인공지능 이미지"
                className="rounded-2xl shadow-2xl w-80 h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {doneCount > 0 && (
        <div className="max-w-5xl mx-auto px-6 mt-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">전체 학습 진도</span>
              <span className="text-sm text-slate-500">{doneCount} / {totalLessons}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full">
              <div
                className="h-2.5 bg-blue-500 rounded-full transition-all"
                style={{ width: `${(doneCount / totalLessons) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Module cards */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-slate-800 mb-6">학습 모듈</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, mIdx) => {
            const c = colorMap[mod.color] || colorMap.blue
            const modLessons = mod.lessons.filter(l => !l.isQuiz)
            const modDone = modLessons.filter(l => isComplete(l.id)).length
            const firstLesson = mod.lessons[0]

            return (
              <div key={mod.id} className={`rounded-2xl border p-6 shadow-sm ${c.card}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${c.icon}`}>
                    {moduleIcons[mod.id]}
                  </span>
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                      모듈 {mIdx + 1}
                    </span>
                    <h3 className="font-bold text-slate-800 mt-0.5">{mod.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{mod.description}</p>

                {/* Lesson list */}
                <div className="space-y-1.5 mb-5">
                  {mod.lessons.map(lesson => (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.moduleId}/${lesson.id}`}
                      className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors py-1"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isComplete(lesson.id) ? c.progress : 'bg-slate-300'}`} />
                      {lesson.title}
                      {lesson.isQuiz && <span className={`ml-1 text-xs px-1.5 py-0.5 rounded ${c.badge}`}>평가</span>}
                      {isComplete(lesson.id) && <span className="text-green-500 text-xs ml-auto">✓</span>}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{modDone}/{modLessons.length} 완료</span>
                  <Link
                    to={`/lesson/${firstLesson.moduleId}/${firstLesson.id}`}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${c.btn}`}
                  >
                    {modDone > 0 ? '이어서 학습' : '시작하기'} →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Core question banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-7 text-center">
          <p className="text-xs font-semibold text-indigo-200 mb-2 tracking-wide">핵심 질문</p>
          <h3 className="text-xl font-bold mb-1">인공지능은 개인의 삶과 사회에 어떤 영향을 미칠까?</h3>
          <p className="text-indigo-100 text-sm">이 단원을 마치면 스스로 답할 수 있게 됩니다.</p>
        </div>
      </main>
    </div>
  )
}
