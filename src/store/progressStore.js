import { create } from 'zustand'

const STORAGE_KEY = 'ai-society-progress'

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

const useProgressStore = create((set, get) => ({
  completed: loadProgress(),
  markComplete: (lessonId) => {
    const next = { ...get().completed, [lessonId]: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    set({ completed: next })
  },
  isComplete: (lessonId) => !!get().completed[lessonId],
}))

export default useProgressStore
