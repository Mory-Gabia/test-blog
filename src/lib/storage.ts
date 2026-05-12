import type { Post } from '../types/blog'
import { storedPostsSchema } from './validation'
import { SAMPLE_POSTS } from './sampleData'

const STORAGE_KEY = 'blog-posts'

function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

let memoryStore: Post[] | null = null

export function loadPosts(): Post[] {
  if (!isStorageAvailable()) {
    if (memoryStore === null) memoryStore = [...SAMPLE_POSTS]
    return memoryStore
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      savePosts(SAMPLE_POSTS)
      return [...SAMPLE_POSTS]
    }
    const parsed = storedPostsSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) {
      console.error('저장된 데이터가 손상되었습니다. 초기화합니다.', parsed.error)
      savePosts(SAMPLE_POSTS)
      return [...SAMPLE_POSTS]
    }
    return parsed.data
  } catch (error) {
    console.error('데이터 로드 실패:', error)
    return [...SAMPLE_POSTS]
  }
}

export function savePosts(posts: Post[]): void {
  if (!isStorageAvailable()) {
    memoryStore = [...posts]
    return
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.error('데이터 저장 실패 (용량 초과일 수 있습니다):', error)
    throw new Error('저장 공간이 부족합니다. 일부 글을 삭제해주세요.')
  }
}

export function createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
  const now = new Date().toISOString()
  const post: Post = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  const posts = loadPosts()
  savePosts([post, ...posts])
  return post
}

export function updatePost(id: string, data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
  const posts = loadPosts()
  const existing = posts.find((p) => p.id === id)
  if (!existing) throw new Error(`글을 찾을 수 없습니다: ${id}`)
  const updated: Post = {
    ...existing,
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  }
  savePosts(posts.map((p) => (p.id === id ? updated : p)))
  return updated
}

export function deletePost(id: string): void {
  const posts = loadPosts()
  savePosts(posts.filter((p) => p.id !== id))
}

export function getPostById(id: string): Post | null {
  return loadPosts().find((p) => p.id === id) ?? null
}
