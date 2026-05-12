import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'

export default function NotFoundPage() {
  return (
    <Container className="py-20 text-center">
      <p className="text-6xl" aria-hidden="true">🔍</p>
      <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        요청하신 페이지가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        홈으로 돌아가기
      </Link>
    </Container>
  )
}
