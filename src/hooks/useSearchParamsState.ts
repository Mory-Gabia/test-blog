import { useSearchParams } from 'react-router-dom'
import type { PostFilter } from '../types/blog'

export function usePostFilter(): [PostFilter, (patch: Partial<PostFilter>) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const filter: PostFilter = {
    q: searchParams.get('q') ?? '',
    tag: searchParams.get('tag'),
    sort: (searchParams.get('sort') as PostFilter['sort']) ?? 'newest',
  }

  function updateFilter(patch: Partial<PostFilter>) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (patch.q !== undefined) {
          patch.q ? next.set('q', patch.q) : next.delete('q')
        }
        if ('tag' in patch) {
          patch.tag ? next.set('tag', patch.tag) : next.delete('tag')
        }
        if (patch.sort !== undefined) {
          patch.sort === 'newest' ? next.delete('sort') : next.set('sort', patch.sort)
        }
        return next
      },
      { replace: true },
    )
  }

  return [filter, updateFilter]
}
