import { PostContent } from '../post/PostContent'

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <p className="text-sm text-gray-400 dark:text-gray-500 italic">미리보기할 내용이 없습니다.</p>
    )
  }
  return <PostContent content={content} />
}
