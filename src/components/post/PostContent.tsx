import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <article className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-brand-600 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 dark:prose-code:bg-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
