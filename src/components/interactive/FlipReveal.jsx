import usePersistentState from '../../hooks/usePersistentState.js'

export default function FlipReveal({ question, answer, storageKey = null }) {
  const [revealed, setRevealed] = usePersistentState(storageKey, false)

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 my-4">
      <p className="font-semibold text-blue-900 mb-3">🤔 {question}</p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          답 확인하기
        </button>
      ) : (
        <div className="bg-white border border-blue-200 rounded-xl p-4 text-slate-700 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}
