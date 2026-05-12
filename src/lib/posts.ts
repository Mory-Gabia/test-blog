import type { Post, PostSummary, Tag, PostFilter } from '../types/blog'

export function toSummary(post: Post): PostSummary {
  const { content: _content, ...summary } = post
  return summary
}

export function searchPosts(posts: Post[], q: string): Post[] {
  if (!q.trim()) return posts
  const query = q.toLowerCase()
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query) ||
      p.tags.some((t) => t.includes(query)),
  )
}

export function filterByTag(posts: Post[], tag: string | null): Post[] {
  if (!tag) return posts
  return posts.filter((p) => p.tags.includes(tag.toLowerCase()))
}

export function sortPosts(posts: Post[], sort: PostFilter['sort']): Post[] {
  return [...posts].sort((a, b) => {
    const diff =
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return sort === 'newest' ? diff : -diff
  })
}

export function applyFilter(posts: Post[], filter: PostFilter): Post[] {
  return sortPosts(filterByTag(searchPosts(posts, filter.q), filter.tag), filter.sort)
}

export function aggregateTags(posts: Post[]): Tag[] {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}
