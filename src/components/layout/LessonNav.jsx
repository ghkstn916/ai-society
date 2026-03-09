import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdjacentLessons, getLessonById } from '../../data/lessonRegistry.js'
import useProgressStore from '../../store/progressStore.js'
import StudentModal from '../StudentModal.jsx'
import { getStudentInfo, saveStudentInfo, submitProgress } from '../../lib/supabase.js'

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function LessonNav({ lessonId }) {
  const { prev, next } = getAdjacentLessons(lessonId)
  const { markComplete, isComplete } = useProgressStore()
  const done = isComplete(lessonId)
  const [showModal, setShowModal] = useState(false)

  const doComplete = async (studentId, studentName) => {
    markComplete(lessonId)
    const lesson = getLessonById(lessonId)
    await submitProgress(
      studentId,
      studentName,
      lessonId,
      lesson?.title || lessonId,
      lesson?.moduleId || ''
    )
  }

  const handleCompleteClick = () => {
    if (done) return
    const info = getStudentInfo()
    if (!info) {
      setShowModal(true)
    } else {
      doComplete(info.studentId, info.studentName)
    }
  }

  const handleModalSubmit = (studentId, studentName) => {
    saveStudentInfo(studentId, studentName)
    setShowModal(false)
    doComplete(studentId, studentName)
  }

  return (
    <>
      {showModal && <StudentModal onSubmit={handleModalSubmit} />}

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
          onClick={handleCompleteClick}
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
    </>
  )
}
