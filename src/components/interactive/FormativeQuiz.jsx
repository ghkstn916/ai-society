import usePersistentState from '../../hooks/usePersistentState.js'

export default function FormativeQuiz({ questions, storageKey = null }) {
  const [answers, setAnswers] = usePersistentState(storageKey ? storageKey + '-ans' : null, {})
  const [submitted, setSubmitted] = usePersistentState(storageKey ? storageKey + '-sub' : null, false)

  function select(qIdx, optIdx) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.answer).length
    : 0

  function optStyle(qIdx, optIdx) {
    if (!submitted) {
      return answers[qIdx] === optIdx
        ? 'border-blue-400 bg-blue-50 text-blue-800'
        : 'border-slate-200 bg-white hover:bg-slate-50 cursor-pointer'
    }
    const q = questions[qIdx]
    if (optIdx === q.answer) return 'border-green-400 bg-green-50 text-green-800 font-semibold'
    if (optIdx === answers[qIdx] && optIdx !== q.answer) return 'border-red-400 bg-red-50 text-red-700'
    return 'border-slate-200 bg-slate-50 text-slate-400'
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qIdx) => (
        <div key={qIdx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-800 mb-3">
            <span className="text-blue-600 mr-2">Q{qIdx + 1}.</span>{q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => select(qIdx, oIdx)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${optStyle(qIdx, oIdx)}`}
              >
                <span className="font-medium mr-2">{['①','②','③','④','⑤'][oIdx]}</span>
                {opt}
              </button>
            ))}
          </div>
          {submitted && q.explanation && (
            <p className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-2">{q.explanation}</p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 bg-blue-600 text-white rounded-2xl font-semibold text-sm disabled:opacity-40 hover:bg-blue-700 transition-colors"
        >
          제출하기 ({Object.keys(answers).length}/{questions.length} 답변)
        </button>
      ) : (
        <div className={`rounded-2xl p-5 text-center ${score >= questions.length * 0.8 ? 'bg-green-50 border border-green-300' : 'bg-amber-50 border border-amber-300'}`}>
          <p className="text-2xl font-bold mb-1">{score} / {questions.length}</p>
          <p className="text-sm text-slate-600">
            {score >= questions.length * 0.8 ? '훌륭해요! 이번 모듈을 잘 이해했습니다.' : '다시 한번 내용을 복습해 보세요.'}
          </p>
        </div>
      )}
    </div>
  )
}
