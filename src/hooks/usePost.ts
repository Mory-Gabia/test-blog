import { useMemo } from 'react'
import type { Post } from '../types/blog'

export function usePost(posts: Post[], id: string | undefined): Post | null {
  return useMemo(
    () => (id ? (posts.find((p) => p.id === id) ?? null) : null),
    [posts, id],
  )
}
