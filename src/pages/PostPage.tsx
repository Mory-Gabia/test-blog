import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { PostContent } from '../components/post/PostContent'
import { PostMeta } from '../components/post/PostMeta'
import { TagBadge } from '../components/post/TagBadge'
import { Button } from '../components/ui/Button'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { usePosts } from '../hooks/usePosts'
import { usePost } from '../hooks/usePost'
import { useUiStore } from '../store/uiStore'
import NotFoundPage from './NotFoundPage'

export default function PostPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { posts, removePost } = usePosts()
  const post = usePost(posts, id)
  const { markAsRead } = useUiStore()
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (post) markAsRead(post.id)
  }, [post?.id])

  if (!post) return <NotFoundPage />

  function handleDelete() {
    if (!post) return
    removePost(post.id)
    navigate('/', { replace: true })
  }

  return (
    <Container className="py-8">
      <nav aria-label="breadcrumb" className="mb-6">
        <Link to="/" className="text-sm text-brand-600 hover:underline dark:text-brand-400">
          ← 목록으로
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <div className="mt-3">
          <PostMeta createdAt={post.createdAt} updatedAt={post.updatedAt} content={post.content} />
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <PostContent content={post.content} />

      <footer className="mt-12 flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
        <Button variant="secondary" size="sm" onClick={() => navigate(`/posts/${post.id}/edit`)}>
          ✏️ 수정
        </Button>
        <Button variant="danger" size="sm" onClick={() => setConfirmOpen(true)}>
          🗑️ 삭제
        </Button>
      </footer>

      <ConfirmDialog
        open={confirmOpen}
        title="글 삭제"
        message={`"${post.title}" 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </Container>
  )
}
