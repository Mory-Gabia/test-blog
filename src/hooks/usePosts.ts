import { useState, useCallback } from 'react'
import type { Post } from '../types/blog'
import { loadPosts, createPost, updatePost, deletePost } from '../lib/storage'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(() => loadPosts())

  const refresh = useCallback(() => {
    setPosts(loadPosts())
  }, [])

  const addPost = useCallback(
    (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
      const post = createPost(data)
      setPosts((prev) => [post, ...prev])
      return post
    },
    [],
  )

  const editPost = useCallback(
    (id: string, data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
      const updated = updatePost(id, data)
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      return updated
    },
    [],
  )

  const removePost = useCallback((id: string) => {
    deletePost(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { posts, refresh, addPost, editPost, removePost }
}
