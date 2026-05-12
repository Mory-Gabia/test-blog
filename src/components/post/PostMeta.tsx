import { formatDate, estimateReadingMinutes } from '../../lib/format'

interface PostMetaProps {
  createdAt: string
  updatedAt: string
  content?: string
}

export function PostMeta({ createdAt, updatedAt, content }: PostMetaProps) {
  const isUpdated = createdAt !== updatedAt
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
      <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      {isUpdated && (
        <span>
          (수정: <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>)
        </span>
      )}
      {content && (
        <span>· 약 {estimateReadingMinutes(content)}분 읽기</span>
      )}
    </div>
  )
}
