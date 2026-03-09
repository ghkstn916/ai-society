import { Link } from 'react-router-dom'
import { getAdjacentLessons } from '../../data/lessonRegistry.js'
import useProgressStore from '../../store/progressStore.js'

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function LessonNav({ lessonId }) {
  const { prev, next } = getAdjacentLessons(lessonId)
  const { markComplete, isComplete } = useProgressStore()
  const done = isComplete(lessonId)

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
      <div>
        {prev ? (
          <Link
            to={`/lesson/${prev.moduleId}/${prev.id}`}
            onClick={scrollTop}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← {prev.title}
          </Link>
        ) : <span />}
      </div>
      <button
        onClick={() => markComplete(lessonId)}
        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
          done
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {done ? '✓ 완료됨' : '완료 표시'}
      </button>
      <div>
        {next ? (
          <Link
            to={`/lesson/${next.moduleId}/${next.id}`}
            onClick={scrollTop}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            {next.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}
