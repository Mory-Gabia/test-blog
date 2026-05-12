import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Spinner } from '../components/ui/Spinner'

const HomePage = lazy(() => import('../pages/HomePage'))
const PostPage = lazy(() => import('../pages/PostPage'))
const NewPostPage = lazy(() => import('../pages/NewPostPage'))
const EditPostPage = lazy(() => import('../pages/EditPostPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'posts/new',
        element: (
          <SuspenseWrapper>
            <NewPostPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'posts/:id',
        element: (
          <SuspenseWrapper>
            <PostPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'posts/:id/edit',
        element: (
          <SuspenseWrapper>
            <EditPostPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])
