import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { PostList } from '../components/post/PostList'
import { SearchBar } from '../components/filter/SearchBar'
import { TagFilter } from '../components/filter/TagFilter'
import { usePosts } from '../hooks/usePosts'
import { useTags } from '../hooks/useTags'
import { usePostFilter } from '../hooks/useSearchParamsState'
import { applyFilter } from '../lib/posts'

export default function HomePage() {
  const { posts } = usePosts()
  const tags = useTags(posts)
  const [filter, updateFilter] = usePostFilter()

  const filtered = useMemo(() => applyFilter(posts, filter), [posts, filter])
  const isFiltered = !!filter.q || !!filter.tag

  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {filter.tag ? `#${filter.tag}` : '전체 글'}
          <span className="ml-2 text-sm font-normal text-gray-500">({filtered.length})</span>
        </h1>
        <Link
          to="/posts/new"
          className="inline-flex items-center rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          ✏️ 글쓰기
        </Link>
      </div>

      <div className="mb-4 space-y-3">
        <SearchBar value={filter.q} onChange={(q) => updateFilter({ q })} />
        <div className="flex items-center justify-between gap-4">
          <TagFilter
            tags={tags}
            activeTag={filter.tag}
            onSelect={(tag) => updateFilter({ tag })}
          />
          <select
            value={filter.sort}
            onChange={(e) => updateFilter({ sort: e.target.value as 'newest' | 'oldest' })}
            aria-label="정렬 순서"
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>
      </div>

      <PostList posts={filtered} isFiltered={isFiltered} />
    </Container>
  )
}
