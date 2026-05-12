import { Container } from './Container'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700">
      <Container>
        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} 내 블로그. React + Vite + TypeScript로 만들었습니다.
        </div>
      </Container>
    </footer>
  )
}
