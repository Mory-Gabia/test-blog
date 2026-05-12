import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import type { PostSummary } from '../../types/blog'
import { TagBadge } from './TagBadge'
import { PostMeta } from './PostMeta'

interface PostCardProps {
  post: PostSummary
  isRead?: boolean
}

export function PostCard({ post, isRead }: PostCardProps) {
  return (
    <article
      className={clsx(
        'group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800',
        isRead && 'opacity-70',
      )}
    >
      <Link to={`/posts/${post.id}`} className="block focus-visible:outline-none">
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 focus-visible:ring-2">
          {post.title}
        </h2>
      </Link>
      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{post.excerpt}</p>
      <div className="mt-3">
        <PostMeta createdAt={post.createdAt} updatedAt={post.updatedAt} />
      </div>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
