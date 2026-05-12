import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Post } from '../../types/blog'
import { postSchema, type PostFormValues } from '../../lib/validation'
import { normalizeTags } from '../../lib/format'
import { Button } from '../ui/Button'
import { MarkdownPreview } from './MarkdownPreview'

interface PostEditorProps {
  initial?: Post
  onSubmit: (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void
  isSubmitting?: boolean
}

export function PostEditor({ initial, onSubmit, isSubmitting }: PostEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initial?.title ?? '',
      content: initial?.content ?? '',
      tags: initial?.tags.join(', ') ?? '',
    },
  })

  const content = watch('content')

  function processSubmit(values: PostFormValues) {
    const tags = normalizeTags(values.tags)
    const excerpt = values.content
      .replace(/#{1,6}\s/g, '')
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
      .replace(/`[^`]+`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 150)
    onSubmit({ title: values.title.trim(), content: values.content, excerpt, tags })
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          제목 <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          aria-describedby={errors.title ? 'title-error' : undefined}
          placeholder="글 제목을 입력하세요"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
        {errors.title && (
          <p id="title-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          태그 <span className="text-xs text-gray-400">(쉼표로 구분)</span>
        </label>
        <input
          id="tags"
          type="text"
          {...register('tags')}
          placeholder="react, typescript, web"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            내용 <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="text-xs text-brand-600 hover:underline dark:text-brand-400"
          >
            {showPreview ? '✏️ 편집' : '👁️ 미리보기'}
          </button>
        </div>

        {showPreview ? (
          <div className="mt-1 min-h-48 rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
            <MarkdownPreview content={content} />
          </div>
        ) : (
          <textarea
            id="content"
            {...register('content')}
            aria-describedby={errors.content ? 'content-error' : undefined}
            rows={16}
            placeholder="마크다운으로 글을 작성하세요..."
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        )}
        {errors.content && (
          <p id="content-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => history.back()}>
          취소
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : initial ? '수정 완료' : '발행하기'}
        </Button>
      </div>
    </form>
  )
}
