import { useMemo } from 'react'
import type { Post, Tag } from '../types/blog'
import { aggregateTags } from '../lib/posts'

export function useTags(posts: Post[]): Tag[] {
  return useMemo(() => aggregateTags(posts), [posts])
}
