import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null

// ── 학생 정보 (localStorage) ──────────────────────────────────────
export function getStudentInfo() {
  try {
    const raw = localStorage.getItem('ai-society-student')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveStudentInfo(studentId, studentName) {
  localStorage.setItem('ai-society-student', JSON.stringify({ studentId, studentName }))
}

// ── Supabase 저장/조회 ────────────────────────────────────────────
export async function submitProgress(studentId, studentName, lessonId, lessonTitle, moduleId) {
  if (!supabase) return
  await supabase.from('lesson_progress').upsert(
    { student_id: studentId, student_name: studentName, lesson_id: lessonId, lesson_title: lessonTitle, module_id: moduleId },
    { onConflict: 'student_id,lesson_id' }
  )
}

export async function fetchAllProgress() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .order('completed_at', { ascending: true })
  if (error) console.error(error)
  return data || []
}

// ── 주관식 답변 저장/조회 ──────────────────────────────────────────
export async function submitQuizResponses(studentId, studentName, quizId, textAnswers) {
  if (!supabase) return
  const rows = textAnswers.map(({ questionIdx, question, answer }) => ({
    student_id: studentId,
    student_name: studentName,
    quiz_id: quizId,
    question_idx: questionIdx,
    question,
    answer,
  }))
  await supabase
    .from('quiz_responses')
    .upsert(rows, { onConflict: 'student_id,quiz_id,question_idx' })
}

export async function fetchQuizResponses() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('quiz_responses')
    .select('*')
    .order('submitted_at', { ascending: true })
  if (error) console.error(error)
  return data || []
}
