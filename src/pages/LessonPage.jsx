import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getLessonById } from '../data/lessonRegistry.js'
import Sidebar from '../components/layout/Sidebar.jsx'
import LessonNav from '../components/layout/LessonNav.jsx'

// Dynamic lesson loader map
import Lesson1_1 from '../lessons/module1/Lesson1_1.jsx'
import Lesson1_2 from '../lessons/module1/Lesson1_2.jsx'
import Lesson1_3 from '../lessons/module1/Lesson1_3.jsx'
import Quiz1 from '../lessons/module1/Quiz1.jsx'
import Lesson2_1 from '../lessons/module2/Lesson2_1.jsx'
import Lesson2_2 from '../lessons/module2/Lesson2_2.jsx'
import Lesson2_3 from '../lessons/module2/Lesson2_3.jsx'
import Quiz2 from '../lessons/module2/Quiz2.jsx'

const lessonComponents = {
  lesson1_1: Lesson1_1,
  lesson1_2: Lesson1_2,
  lesson1_3: Lesson1_3,
  quiz1: Quiz1,
  lesson2_1: Lesson2_1,
  lesson2_2: Lesson2_2,
  lesson2_3: Lesson2_3,
  quiz2: Quiz2,
}

export default function LessonPage() {
  const { lessonId } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const lesson = getLessonById(lessonId)

  if (!lesson) return <Navigate to="/" replace />

  const LessonContent = lessonComponents[lessonId]
  if (!LessonContent) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            ☰
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 truncate">인공지능과 사회</p>
            <p className="text-sm font-semibold text-slate-800 truncate">{lesson.title}</p>
          </div>
          {lesson.duration && (
            <span className="text-xs text-slate-400 flex-shrink-0">⏱ {lesson.duration}</span>
          )}
        </div>

        {/* Lesson content */}
        <div className="max-w-2xl mx-auto px-6 py-8">
          <LessonContent />
          <LessonNav lessonId={lessonId} />
        </div>
      </main>
    </div>
  )
}
