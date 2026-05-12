import type { Post } from '../types/blog'

export const SAMPLE_POSTS: Post[] = [
  {
    id: 'sample-1',
    title: 'React 블로그를 만들어봤습니다',
    excerpt: 'Vite, React, TypeScript, Tailwind CSS로 간단한 블로그를 만드는 과정을 공유합니다.',
    content: `# React 블로그를 만들어봤습니다

Vite, React, TypeScript, Tailwind CSS를 조합해서 간단한 블로그를 만들어봤습니다.

## 왜 이 스택을 선택했나

- **Vite**: 빠른 개발 서버와 번들링
- **React 18**: 최신 기능 (Suspense, Concurrent Mode)
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 빠른 스타일링

## 주요 기능

1. 글 작성/수정/삭제
2. 마크다운 렌더링
3. 태그 필터
4. 다크모드

\`\`\`tsx
function App() {
  return <RouterProvider router={router} />
}
\`\`\`

블로그를 직접 만들어보면 많은 것을 배울 수 있습니다!`,
    tags: ['react', 'typescript', 'vite'],
    createdAt: '2026-05-01T09:00:00.000Z',
    updatedAt: '2026-05-01T09:00:00.000Z',
  },
  {
    id: 'sample-2',
    title: 'TypeScript 제네릭 완전 정복',
    excerpt: '제네릭은 TypeScript의 핵심 기능입니다. 실용적인 예제와 함께 완전히 이해해봅시다.',
    content: `# TypeScript 제네릭 완전 정복

제네릭은 타입을 파라미터처럼 다루는 기능입니다.

## 기본 예제

\`\`\`typescript
function identity<T>(value: T): T {
  return value
}

const num = identity<number>(42)
const str = identity<string>('hello')
\`\`\`

## 제약 조건 (Constraints)

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
\`\`\`

## 실용적인 패턴: API 응답 타입

\`\`\`typescript
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

async function fetchUser(): Promise<ApiResponse<User>> {
  const res = await fetch('/api/user')
  return res.json()
}
\`\`\`

제네릭을 잘 활용하면 코드 재사용성이 크게 높아집니다.`,
    tags: ['typescript', '제네릭'],
    createdAt: '2026-05-05T10:00:00.000Z',
    updatedAt: '2026-05-05T10:00:00.000Z',
  },
  {
    id: 'sample-3',
    title: 'Tailwind CSS로 다크모드 구현하기',
    excerpt: 'Tailwind CSS의 class 기반 다크모드를 React + Zustand로 구현하는 방법을 알아봅니다.',
    content: `# Tailwind CSS로 다크모드 구현하기

## 설정

\`tailwind.config.js\`에서 \`darkMode: 'class'\`를 설정합니다.

\`\`\`js
export default {
  darkMode: 'class',
  // ...
}
\`\`\`

## HTML 요소에 클래스 토글

\`\`\`tsx
document.documentElement.classList.toggle('dark', isDark)
\`\`\`

## Zustand로 상태 관리

\`\`\`typescript
const useUiStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'blog-ui' }
  )
)
\`\`\`

이렇게 하면 새로고침 후에도 다크모드 설정이 유지됩니다.`,
    tags: ['tailwind', 'css', 'react'],
    createdAt: '2026-05-10T11:00:00.000Z',
    updatedAt: '2026-05-10T11:00:00.000Z',
  },
  {
    id: 'sample-4',
    title: 'React Router v6 완벽 가이드',
    excerpt: 'React Router v6의 createBrowserRouter, Outlet, useParams 등 핵심 기능을 정리합니다.',
    content: `# React Router v6 완벽 가이드

## createBrowserRouter

\`\`\`tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'posts/:id', element: <PostPage /> },
    ],
  },
])
\`\`\`

## useParams

\`\`\`tsx
function PostPage() {
  const { id } = useParams<{ id: string }>()
  // ...
}
\`\`\`

## useSearchParams

URL 쿼리를 상태처럼 다루기:

\`\`\`tsx
const [searchParams, setSearchParams] = useSearchParams()
const q = searchParams.get('q') ?? ''
\`\`\`

## Lazy Loading

\`\`\`tsx
const PostPage = lazy(() => import('./pages/PostPage'))
\`\`\`

React Router v6는 이전 버전보다 훨씬 직관적입니다!`,
    tags: ['react', 'router', 'spa'],
    createdAt: '2026-05-12T08:00:00.000Z',
    updatedAt: '2026-05-12T08:00:00.000Z',
  },
]
