import { describe, it, expect } from 'vitest'
import type { Post } from '../../types/blog'
import { searchPosts, filterByTag, sortPosts, applyFilter, aggregateTags } from '../../lib/posts'

const makePosts = (): Post[] => [
  {
    id: '1',
    title: 'React 기초',
    excerpt: 'React 입문',
    content: 'React는 UI 라이브러리입니다.',
    tags: ['react', 'javascript'],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'TypeScript 가이드',
    excerpt: 'TS 안내',
    content: 'TypeScript는 정적 타입 언어입니다.',
    tags: ['typescript'],
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Vite 설정',
    excerpt: 'Vite 빌드 도구',
    content: 'Vite는 빠른 빌드 도구입니다.',
    tags: ['vite', 'javascript'],
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
  },
]

describe('searchPosts', () => {
  it('빈 쿼리는 전체 반환', () => {
    const posts = makePosts()
    expect(searchPosts(posts, '')).toHaveLength(3)
  })

  it('제목으로 검색', () => {
    expect(searchPosts(makePosts(), 'react')).toHaveLength(1)
  })

  it('대소문자 무관 검색', () => {
    expect(searchPosts(makePosts(), 'TYPESCRIPT')).toHaveLength(1)
  })

  it('태그로 검색', () => {
    expect(searchPosts(makePosts(), 'javascript')).toHaveLength(2)
  })

  it('없는 키워드는 빈 배열', () => {
    expect(searchPosts(makePosts(), '없는키워드xyz')).toHaveLength(0)
  })
})

describe('filterByTag', () => {
  it('null 태그는 전체 반환', () => {
    expect(filterByTag(makePosts(), null)).toHaveLength(3)
  })

  it('특정 태그 필터링', () => {
    expect(filterByTag(makePosts(), 'javascript')).toHaveLength(2)
  })

  it('없는 태그는 빈 배열', () => {
    expect(filterByTag(makePosts(), 'nonexistent')).toHaveLength(0)
  })
})

describe('sortPosts', () => {
  it('최신순 정렬', () => {
    const sorted = sortPosts(makePosts(), 'newest')
    expect(sorted[0].id).toBe('3')
    expect(sorted[2].id).toBe('1')
  })

  it('오래된순 정렬', () => {
    const sorted = sortPosts(makePosts(), 'oldest')
    expect(sorted[0].id).toBe('1')
    expect(sorted[2].id).toBe('3')
  })

  it('원본 배열 불변', () => {
    const posts = makePosts()
    const original = [...posts]
    sortPosts(posts, 'oldest')
    expect(posts).toEqual(original)
  })
})

describe('applyFilter', () => {
  it('검색+태그+정렬 복합 필터', () => {
    const result = applyFilter(makePosts(), { q: 'javascript', tag: 'react', sort: 'newest' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})

describe('aggregateTags', () => {
  it('태그별 카운트 집계', () => {
    const tags = aggregateTags(makePosts())
    const js = tags.find((t) => t.name === 'javascript')
    expect(js?.count).toBe(2)
  })

  it('카운트 내림차순 정렬', () => {
    const tags = aggregateTags(makePosts())
    expect(tags[0].count).toBeGreaterThanOrEqual(tags[1].count)
  })
})
