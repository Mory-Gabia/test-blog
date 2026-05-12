import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadPosts, createPost, updatePost, deletePost, getPostById } from '../../lib/storage'

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})

describe('createPost', () => {
  it('새 글 생성 및 저장', () => {
    const post = createPost({
      title: '테스트 글',
      excerpt: '요약',
      content: '내용',
      tags: ['test'],
    })
    expect(post.id).toBeTruthy()
    expect(post.title).toBe('테스트 글')
    expect(post.createdAt).toBeTruthy()
    expect(post.updatedAt).toBeTruthy()
  })

  it('생성된 글이 목록 최상단에 위치', () => {
    createPost({ title: '첫번째', excerpt: '', content: '내용1', tags: [] })
    const second = createPost({ title: '두번째', excerpt: '', content: '내용2', tags: [] })
    const posts = loadPosts()
    expect(posts[0].id).toBe(second.id)
  })
})

describe('updatePost', () => {
  it('글 수정 및 updatedAt 갱신', () => {
    const created = createPost({ title: '원본', excerpt: '', content: '내용', tags: [] })
    const updated = updatePost(created.id, {
      title: '수정됨',
      excerpt: '',
      content: '수정 내용',
      tags: [],
    })
    expect(updated.title).toBe('수정됨')
    expect(updated.updatedAt).not.toBe(created.updatedAt)
    expect(updated.createdAt).toBe(created.createdAt)
  })

  it('없는 글 수정 시 에러', () => {
    expect(() => updatePost('nonexistent', { title: '', excerpt: '', content: '', tags: [] })).toThrow()
  })
})

describe('deletePost', () => {
  it('글 삭제 후 목록에서 제거', () => {
    const post = createPost({ title: '삭제될 글', excerpt: '', content: '내용', tags: [] })
    deletePost(post.id)
    expect(getPostById(post.id)).toBeNull()
  })
})

describe('getPostById', () => {
  it('존재하는 글 반환', () => {
    const created = createPost({ title: '조회 테스트', excerpt: '', content: '내용', tags: [] })
    expect(getPostById(created.id)?.title).toBe('조회 테스트')
  })

  it('없는 글은 null 반환', () => {
    expect(getPostById('nonexistent')).toBeNull()
  })
})
