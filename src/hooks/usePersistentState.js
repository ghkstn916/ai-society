import { useState } from 'react'

export default function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    if (!key) return initialValue
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const toStore = value instanceof Function ? value(state) : value
      setState(toStore)
      if (key) localStorage.setItem(key, JSON.stringify(toStore))
    } catch {
      setState(value)
    }
  }

  return [state, setValue]
}
