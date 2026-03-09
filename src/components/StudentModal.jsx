import { useState } from 'react'

export default function StudentModal({ onSubmit }) {
  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!studentId.trim()) { setError('학번을 입력해주세요.'); return }
    if (!studentName.trim()) { setError('이름을 입력해주세요.'); return }
    onSubmit(studentId.trim(), studentName.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-800 mb-1">학생 정보 입력</h2>
          <p className="text-sm text-slate-500">처음 한 번만 입력하면 이후엔 자동으로 기록됩니다.</p>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">학번</label>
            <input
              type="text"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="예: 20240101"
              autoFocus
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">이름</label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="예: 홍길동"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          완료 표시하기
        </button>
      </div>
    </div>
  )
}
