import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchBarProps {
  value: string
  onChange: (q: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [local, setLocal] = useState(value)
  const debounced = useDebounce(local, 300)

  useEffect(() => {
    if (debounced !== value) onChange(debounced)
  }, [debounced, onChange, value])

  useEffect(() => {
    setLocal(value)
  }, [value])

  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400"
        aria-hidden="true"
      >
        🔍
      </span>
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="글 검색..."
        aria-label="글 검색"
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
      />
    </div>
  )
}
