import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { PostEditor } from '../components/editor/PostEditor'
import { usePosts } from '../hooks/usePosts'
import type { Post } from '../types/blog'

export default function NewPostPage() {
  const navigate = useNavigate()
  const { addPost } = usePosts()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) {
    setIsSubmitting(true)
    setError(null)
    try {
      const post = addPost(data)
      navigate(`/posts/${post.id}`, { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장에 실패했습니다.')
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">새 글 작성</h1>
      {error && (
        <div role="alert" className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      <PostEditor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Container>
  )
}
