import { useState, useEffect } from 'react'
import { fetchAllProgress } from '../lib/supabase.js'
import { allLessons } from '../data/lessonRegistry.js'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin'

function downloadCSV(rows, lessons) {
  const headers = ['학번', '이름', '완료 수', ...lessons.map((l) => l.title)]
  const lines = rows.map((r) => [
    r.studentId,
    r.studentName,
    r.completed.length,
    ...lessons.map((l) => (r.completed.includes(l.id) ? 'O' : '')),
  ])
  const csv = [headers, ...lines].map((row) => row.join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `진행상황_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function processProgress(raw) {
  const map = {}
  for (const row of raw) {
    const key = row.student_id
    if (!map[key]) {
      map[key] = { studentId: row.student_id, studentName: row.student_name, completed: [] }
    }
    map[key].completed.push(row.lesson_id)
  }
  return Object.values(map).sort((a, b) => a.studentId.localeCompare(b.studentId))
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastFetched, setLastFetched] = useState(null)

  const lessons = allLessons

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  const loadData = async () => {
    setLoading(true)
    const raw = await fetchAllProgress()
    setRows(processProgress(raw))
    setLastFetched(new Date())
    setLoading(false)
  }

  useEffect(() => {
    if (authed) loadData()
  }, [authed])

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <h1 className="text-xl font-bold text-slate-800 mb-1">관리자 로그인</h1>
          <p className="text-sm text-slate-500 mb-6">수업 진행 현황을 확인합니다.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="비밀번호"
            autoFocus
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition mb-3"
          />
          {pwError && <p className="text-xs text-red-500 mb-3">비밀번호가 틀렸습니다.</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            로그인
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">학생 진행 현황</h1>
            {lastFetched && (
              <p className="text-xs text-slate-400 mt-1">
                마지막 갱신: {lastFetched.toLocaleTimeString('ko-KR')}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {loading ? '불러오는 중...' : '새로고침'}
            </button>
            <button
              onClick={() => downloadCSV(rows, lessons)}
              disabled={rows.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              CSV 다운로드
            </button>
          </div>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">전체 학생</p>
            <p className="text-3xl font-bold text-slate-800">{rows.length}명</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">전체 레슨</p>
            <p className="text-3xl font-bold text-slate-800">{lessons.length}개</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">전체 완료</p>
            <p className="text-3xl font-bold text-blue-600">
              {rows.reduce((s, r) => s + r.completed.length, 0)}건
            </p>
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
              데이터를 불러오는 중...
            </div>
          ) : rows.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
              아직 완료 기록이 없습니다.
            </div>
          ) : (
            <table className="w-full text-sm min-w-max">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">
                    학번
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">
                    이름
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">
                    완료
                  </th>
                  {lessons.map((l) => (
                    <th
                      key={l.id}
                      className="text-center px-3 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap max-w-[80px]"
                      title={l.title}
                    >
                      <div className="truncate max-w-[72px]">{l.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.studentId}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-5 py-3 font-mono text-slate-700 whitespace-nowrap">
                      {r.studentId}
                    </td>
                    <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">
                      {r.studentName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          r.completed.length === lessons.length
                            ? 'bg-green-100 text-green-700'
                            : r.completed.length > 0
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {r.completed.length}/{lessons.length}
                      </span>
                    </td>
                    {lessons.map((l) => (
                      <td key={l.id} className="px-3 py-3 text-center">
                        {r.completed.includes(l.id) ? (
                          <span className="text-green-500 text-base">✓</span>
                        ) : (
                          <span className="text-slate-200 text-base">○</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
