import type { Post } from '../../types/blog'
import { PostCard } from './PostCard'
import { EmptyState } from '../ui/EmptyState'
import { useUiStore } from '../../store/uiStore'

interface PostListProps {
  posts: Post[]
  isFiltered?: boolean
}

export function PostList({ posts, isFiltered }: PostListProps) {
  const readIds = useUiStore((s) => s.readIds)

  if (posts.length === 0) {
    return (
      <EmptyState
        title={isFiltered ? '검색 결과가 없습니다.' : '아직 작성된 글이 없습니다.'}
        description={isFiltered ? '다른 검색어나 태그를 시도해보세요.' : '첫 번째 글을 작성해보세요!'}
      />
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2" role="list">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} isRead={readIds.includes(post.id)} />
        </li>
      ))}
    </ul>
  )
}
