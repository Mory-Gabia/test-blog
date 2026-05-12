import { Link, useNavigate } from 'react-router-dom'
import { Container } from './Container'
import { Button } from '../ui/Button'
import { useUiStore, applyTheme } from '../../store/uiStore'

export function Header() {
  const { theme, toggleTheme } = useUiStore()
  const navigate = useNavigate()

  function handleToggleTheme() {
    toggleTheme()
    applyTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold text-gray-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
          >
            📝 내 블로그
          </Link>
          <nav className="flex items-center gap-2" aria-label="주 내비게이션">
            <Button variant="ghost" size="sm" onClick={() => navigate('/posts/new')}>
              ✏️ 글쓰기
            </Button>
            <button
              onClick={handleToggleTheme}
              aria-label={theme === 'light' ? '다크모드로 전환' : '라이트모드로 전환'}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </Container>
    </header>
  )
}
