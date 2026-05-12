import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { PostEditor } from '../components/editor/PostEditor'
import { usePosts } from '../hooks/usePosts'
import { usePost } from '../hooks/usePost'
import type { Post } from '../types/blog'
import NotFoundPage from './NotFoundPage'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { posts, editPost } = usePosts()
  const post = usePost(posts, id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!post) return <NotFoundPage />

  function handleSubmit(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!post) return
    setIsSubmitting(true)
    setError(null)
    try {
      editPost(post.id, data)
      navigate(`/posts/${post.id}`, { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : '수정에 실패했습니다.')
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">글 수정</h1>
      {error && (
        <div role="alert" className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      <PostEditor initial={post} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Container>
  )
}
