import { useState, useEffect } from 'react'
import { fetchAllProgress, fetchQuizResponses, fetchActivityResults } from '../lib/supabase.js'
import { allLessons } from '../data/lessonRegistry.js'

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || 'admin').trim()

const QUIZ_LABELS = { quiz1: '모듈1 형성평가', quiz2: '모듈2 형성평가' }

const ACTIVITY_LABELS = {
  'ai-m1l1-mid-quiz':          '[1-1] 중간 퀴즈',
  'ai-m1l1-quiz-0':            '[1-1] 확인 퀴즈 1',
  'ai-m1l1-quiz-1':            '[1-1] 확인 퀴즈 2',
  'ai-m1l1-quiz-2':            '[1-1] 확인 퀴즈 3',
  'ai-m1l2-sort-0':            '[1-2] AI vs 인간 분류',
  'ai-m1l2-quiz-0':            '[1-2] 확인 퀴즈 1',
  'ai-m1l2-quiz-1':            '[1-2] 확인 퀴즈 2',
  'ai-m1l3-sort-0':            '[1-3] 소프트웨어 분류',
  'ai-m1l3-quiz-0':            '[1-3] 확인 퀴즈 1',
  'ai-m1l3-quiz-1':            '[1-3] 확인 퀴즈 2',
  'ai-m2l1-sort-phone':        '[2-1] 스마트폰 기능 분류',
  'ai-m2l1-quiz-0':            '[2-1] 확인 퀴즈 1',
  'ai-m2l1-quiz-1':            '[2-1] 확인 퀴즈 2',
  'ai-m2l1-quiz-2':            '[2-1] 확인 퀴즈 3',
  'ai-m2l2-quiz-industry':     '[2-2] 건설 분야 퀴즈',
  'ai-m2l2-classify-airole':   '[2-2] AI 보조/대체 분류',
  'ai-m2l2-quiz-0':            '[2-2] 확인 퀴즈 1',
  'ai-m2l2-quiz-1':            '[2-2] 확인 퀴즈 2',
  'ai-m2l3-quiz-direction':    '[2-3] AI 시대 방향 퀴즈',
  'ai-m2l3-sort-0':            '[2-3] 직업 자동화 분류',
  'ai-m2l3-quiz-0':            '[2-3] 확인 퀴즈 1',
  'ai-m2l3-quiz-1':            '[2-3] 확인 퀴즈 2',
  'ai-m2l3-quiz-2':            '[2-3] 확인 퀴즈 3',
}

function downloadCSV(rows, lessons) {
  const headers = ['학번', '이름', '완료 수', ...lessons.map((l) => l.title)]
  const lines = rows.map((r) => [
    r.studentId,
    r.studentName,
    r.completed.length,
    ...lessons.map((l) => (r.completed.includes(l.id) ? 'O' : '')),
  ])
  const csv = [headers, ...lines].map((row) => row.join(',')).join('\n')
  triggerDownload('\uFEFF' + csv, `진행상황_${dateStr()}.csv`)
}

function downloadActivitiesCSV(activities) {
  const headers = ['학번', '이름', '활동', '점수', '만점', '정오']
  const lines = activities.map((r) => [
    r.student_id,
    r.student_name,
    ACTIVITY_LABELS[r.activity_id] || r.activity_id,
    r.score,
    r.max_score,
    r.score === r.max_score ? 'O' : 'X',
  ])
  const csv = [headers, ...lines].map((row) => row.join(',')).join('\n')
  triggerDownload('\uFEFF' + csv, `실습결과_${dateStr()}.csv`)
}

function downloadResponsesCSV(responses) {
  const headers = ['학번', '이름', '퀴즈', '문항', '답변', '제출시각']
  const lines = responses.map((r) => [
    r.student_id,
    r.student_name,
    QUIZ_LABELS[r.quiz_id] || r.quiz_id,
    `"${r.question.replace(/"/g, '""')}"`,
    `"${r.answer.replace(/"/g, '""')}"`,
    r.submitted_at ? new Date(r.submitted_at).toLocaleString('ko-KR') : '',
  ])
  const csv = [headers, ...lines].map((row) => row.join(',')).join('\n')
  triggerDownload('\uFEFF' + csv, `주관식답변_${dateStr()}.csv`)
}

function triggerDownload(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function dateStr() {
  return new Date().toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '')
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
  const [tab, setTab] = useState('progress')
  const [rows, setRows] = useState([])
  const [responses, setResponses] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastFetched, setLastFetched] = useState(null)

  const lessons = allLessons

  const handleLogin = () => {
    if (pw.trim() === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  const loadData = async () => {
    setLoading(true)
    const [rawProgress, rawResponses, rawActivities] = await Promise.all([
      fetchAllProgress(), fetchQuizResponses(), fetchActivityResults()
    ])
    setRows(processProgress(rawProgress))
    setResponses(rawResponses)
    setActivities(rawActivities)
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
            <h1 className="text-2xl font-bold text-slate-800">학생 현황 관리</h1>
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
            {tab === 'progress' && (
              <button onClick={() => downloadCSV(rows, lessons)} disabled={rows.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
                CSV 다운로드
              </button>
            )}
            {tab === 'responses' && (
              <button onClick={() => downloadResponsesCSV(responses)} disabled={responses.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
                CSV 다운로드
              </button>
            )}
            {tab === 'activities' && (
              <button onClick={() => downloadActivitiesCSV(activities)} disabled={activities.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
                CSV 다운로드
              </button>
            )}
          </div>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
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
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">주관식 답변</p>
            <p className="text-3xl font-bold text-violet-600">{responses.length}건</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">실습 활동 기록</p>
            <p className="text-3xl font-bold text-orange-500">{activities.length}건</p>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 mb-4 bg-white border border-slate-100 rounded-2xl p-1 w-fit">
          <button
            onClick={() => setTab('progress')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === 'progress' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            진행 현황
          </button>
          <button
            onClick={() => setTab('responses')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === 'responses' ? 'bg-violet-600 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            주관식 답변
          </button>
          <button
            onClick={() => setTab('activities')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === 'activities' ? 'bg-orange-500 text-white' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            실습 결과
          </button>
        </div>

        {/* 진행 현황 테이블 */}
        {tab === 'progress' && (
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
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">학번</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">이름</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">완료</th>
                    {lessons.map((l) => (
                      <th key={l.id} className="text-center px-3 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap" title={l.title}>
                        <div className="truncate max-w-[72px]">{l.title}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.studentId} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-5 py-3 font-mono text-slate-700 whitespace-nowrap">{r.studentId}</td>
                      <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">{r.studentName}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          r.completed.length === lessons.length
                            ? 'bg-green-100 text-green-700'
                            : r.completed.length > 0
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {r.completed.length}/{lessons.length}
                        </span>
                      </td>
                      {lessons.map((l) => (
                        <td key={l.id} className="px-3 py-3 text-center">
                          {r.completed.includes(l.id)
                            ? <span className="text-green-500 text-base">✓</span>
                            : <span className="text-slate-200 text-base">○</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* 주관식 답변 */}
        {tab === 'responses' && (
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-100 flex items-center justify-center py-20 text-slate-400 text-sm">
                데이터를 불러오는 중...
              </div>
            ) : responses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 flex items-center justify-center py-20 text-slate-400 text-sm">
                아직 제출된 주관식 답변이 없습니다.
              </div>
            ) : (
              Object.entries(
                responses.reduce((acc, r) => {
                  const key = r.quiz_id
                  if (!acc[key]) acc[key] = {}
                  const qKey = r.question_idx
                  if (!acc[key][qKey]) acc[key][qKey] = { question: r.question, answers: [] }
                  acc[key][qKey].answers.push({ studentId: r.student_id, studentName: r.student_name, answer: r.answer })
                  return acc
                }, {})
              ).map(([quizId, qMap]) => (
                <div key={quizId} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-violet-50">
                    <h2 className="font-bold text-slate-800">{QUIZ_LABELS[quizId] || quizId}</h2>
                  </div>
                  {Object.entries(qMap).map(([qIdx, { question, answers }]) => (
                    <div key={qIdx} className="border-b border-slate-100 last:border-b-0">
                      <div className="px-6 py-3 bg-slate-50">
                        <p className="text-sm font-semibold text-slate-700">
                          <span className="text-violet-500 mr-2">Q.</span>{question}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{answers.length}명 답변</p>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {answers.map((a, i) => (
                          <div key={i} className="px-6 py-3 flex gap-4">
                            <div className="shrink-0 w-28">
                              <p className="text-xs font-mono text-slate-500">{a.studentId}</p>
                              <p className="text-sm font-medium text-slate-700">{a.studentName}</p>
                            </div>
                            <p className="text-sm text-slate-600 whitespace-pre-wrap flex-1">{a.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
        {/* 실습 결과 */}
        {tab === 'activities' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-400 text-sm">데이터를 불러오는 중...</div>
            ) : activities.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-slate-400 text-sm">아직 실습 기록이 없습니다.</div>
            ) : (
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">학번</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">이름</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">활동</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">점수</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">정오</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">제출시각</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-5 py-3 font-mono text-slate-700 whitespace-nowrap">{r.student_id}</td>
                      <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">{r.student_name}</td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                        {ACTIVITY_LABELS[r.activity_id] || r.activity_id}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          r.score === r.max_score ? 'bg-green-100 text-green-700' :
                          r.score > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
                        }`}>
                          {r.score}/{r.max_score}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-lg">
                        {r.score === r.max_score ? '✓' : r.score > 0 ? '△' : '✗'}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                        {r.submitted_at ? new Date(r.submitted_at).toLocaleString('ko-KR') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
