export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type PostSummary = Omit<Post, 'content'>

export interface Tag {
  name: string
  count: number
}

export interface PostFilter {
  q: string
  tag: string | null
  sort: 'newest' | 'oldest'
}

export interface PostFormData {
  title: string
  content: string
  tags: string
}
