import { useState } from 'react'
import usePersistentState from '../../hooks/usePersistentState.js'
import { getStudentInfo, submitActivityResult } from '../../lib/supabase.js'

export default function SortCards({ items, groupA, groupB, storageKey = null }) {
  const [submitted, setSubmitted] = usePersistentState(storageKey ? storageKey + '-sub' : null, false)
  const [placements, setPlacements] = usePersistentState(storageKey, {})
  const [dragItem, setDragItem] = useState(null)

  function place(item, group) {
    if (submitted) return
    setPlacements(prev => ({ ...prev, [item.id]: group }))
  }

  function getScore() {
    return items.filter(item => placements[item.id] === item.correct).length
  }

  const unplaced = items.filter(i => !placements[i.id])
  const inA = items.filter(i => placements[i.id] === 'A')
  const inB = items.filter(i => placements[i.id] === 'B')

  function cardStyle(item) {
    if (!submitted) return 'bg-white border-slate-200'
    return placements[item.id] === item.correct
      ? 'bg-green-50 border-green-400 text-green-800'
      : 'bg-red-50 border-red-400 text-red-800'
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 my-4">
      {unplaced.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 mb-2">분류할 항목</p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map(item => (
              <button
                key={item.id}
                draggable
                onDragStart={() => setDragItem(item)}
                onClick={() => {}}
                className="drag-item px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 shadow-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {[['A', groupA, inA], ['B', groupB, inB]].map(([key, label, list]) => (
          <div
            key={key}
            className="drop-zone rounded-xl border-2 border-dashed border-slate-300 p-3 bg-white"
            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }}
            onDragLeave={e => e.currentTarget.classList.remove('drag-over')}
            onDrop={e => { e.currentTarget.classList.remove('drag-over'); if (dragItem) { place(dragItem, key); setDragItem(null) } }}
          >
            <p className="text-xs font-bold text-slate-600 mb-2">{label}</p>
            <div className="space-y-1">
              {list.map(item => (
                <div key={item.id} className={`px-2 py-1.5 rounded-lg border text-sm ${cardStyle(item)}`}>
                  {item.label}
                  {submitted && placements[item.id] !== item.correct && <span className="ml-1 text-xs">→ {item.correct === 'A' ? groupA : groupB}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button
          onClick={() => {
            setSubmitted(true)
            if (storageKey) {
              const score = items.filter(item => placements[item.id] === item.correct).length
              const info = getStudentInfo()
              if (info) submitActivityResult(info.studentId, info.studentName, storageKey, score, items.length)
            }
          }}
          disabled={Object.keys(placements).length < items.length}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-blue-700 transition-colors"
        >
          제출하기
        </button>
      ) : (
        <p className="mt-3 text-sm font-semibold text-slate-700">
          결과: {getScore()} / {items.length} 정답
        </p>
      )}
    </div>
  )
}
