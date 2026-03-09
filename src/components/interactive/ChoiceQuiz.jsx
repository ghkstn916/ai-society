import usePersistentState from '../../hooks/usePersistentState.js'

export default function ChoiceQuiz({ question, options, answer, explanation, storageKey = null }) {
  const [selected, setSelected] = usePersistentState(storageKey, null)
  const revealed = selected !== null

  function handleSelect(idx) {
    if (revealed) return
    setSelected(idx)
  }

  function getStyle(idx) {
    if (!revealed) return 'border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
    if (idx === answer) return 'border-green-400 bg-green-50 text-green-800 font-semibold'
    if (idx === selected && idx !== answer) return 'border-red-400 bg-red-50 text-red-800'
    return 'border-slate-200 bg-slate-50 text-slate-400'
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm my-4">
      <p className="font-semibold text-slate-800 mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${getStyle(idx)}`}
          >
            <span className="font-medium mr-2">{['①','②','③','④','⑤'][idx]}</span>
            {opt}
          </button>
        ))}
      </div>
      {revealed && (
        <div className={`mt-3 p-3 rounded-xl text-sm ${selected === answer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {selected === answer ? '✓ 정답입니다!' : `✗ 오답입니다. 정답은 ${['①','②','③','④','⑤'][answer]}번입니다.`}
          {explanation && <p className="mt-1 text-slate-600">{explanation}</p>}
        </div>
      )}
    </div>
  )
}
