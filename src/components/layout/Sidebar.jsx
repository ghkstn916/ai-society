import { Link, useParams } from 'react-router-dom'
import { modules } from '../../data/lessonRegistry.js'
import useProgressStore from '../../store/progressStore.js'

const colorMap = {
  blue: { dot: 'bg-blue-500', ring: 'ring-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  green: { dot: 'bg-green-500', ring: 'ring-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Sidebar({ onClose }) {
  const { lessonId } = useParams()
  const isComplete = useProgressStore(s => s.isComplete)

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="font-bold text-slate-800 hover:text-blue-600 transition-colors text-sm">
          ← 홈으로
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {modules.map(mod => {
          const c = colorMap[mod.color] || colorMap.blue
          return (
            <div key={mod.id}>
              <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${c.text}`}>{mod.title}</p>
              <div className="space-y-1">
                {mod.lessons.map(lesson => {
                  const active = lesson.id === lessonId
                  const done = isComplete(lesson.id)
                  return (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.moduleId}/${lesson.id}`}
                      onClick={() => { onClose?.(); scrollTop() }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        active
                          ? `ring-2 ${c.ring} bg-slate-50 font-semibold text-slate-800`
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${done ? c.dot : 'bg-slate-300'}`} />
                      <span className="flex-1">{lesson.title}</span>
                      {lesson.isQuiz && <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${c.badge}`}>평가</span>}
                      {done && <span className="text-green-500 text-xs">✓</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
