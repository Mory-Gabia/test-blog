import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  readIds: string[]
  markAsRead: (id: string) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      readIds: [],
      markAsRead: (id) =>
        set((state) => ({
          readIds: state.readIds.includes(id) ? state.readIds : [...state.readIds, id],
        })),
    }),
    { name: 'blog-ui' },
  ),
)

export function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
