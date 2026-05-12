import { describe, it, expect } from 'vitest'
import { formatDate, estimateReadingMinutes, normalizeTags, generateExcerpt } from '../../lib/format'

describe('formatDate', () => {
  it('ISO 날짜를 한국어 형식으로 변환', () => {
    const result = formatDate('2026-05-12T00:00:00.000Z')
    expect(result).toContain('2026')
    expect(result).toContain('5')
  })

  it('잘못된 날짜는 그대로 반환', () => {
    expect(formatDate('invalid')).toBe('invalid')
  })
})

describe('estimateReadingMinutes', () => {
  it('200단어 = 1분', () => {
    const content = Array(200).fill('단어').join(' ')
    expect(estimateReadingMinutes(content)).toBe(1)
  })

  it('최소 1분 보장', () => {
    expect(estimateReadingMinutes('짧은글')).toBe(1)
  })
})

describe('normalizeTags', () => {
  it('쉼표로 분리 및 트림', () => {
    expect(normalizeTags('react, typescript, vite')).toEqual(['react', 'typescript', 'vite'])
  })

  it('소문자 변환', () => {
    expect(normalizeTags('React, TypeScript')).toEqual(['react', 'typescript'])
  })

  it('중복 제거', () => {
    expect(normalizeTags('react, react, react')).toEqual(['react'])
  })

  it('빈 태그 제거', () => {
    expect(normalizeTags('react,,,')).toEqual(['react'])
  })

  it('빈 문자열은 빈 배열', () => {
    expect(normalizeTags('')).toEqual([])
  })
})

describe('generateExcerpt', () => {
  it('150자 초과 시 잘라냄', () => {
    const long = 'a'.repeat(200)
    const result = generateExcerpt(long)
    expect(result.length).toBeLessThanOrEqual(154)
    expect(result.endsWith('…')).toBe(true)
  })

  it('150자 이하면 그대로', () => {
    const short = '짧은 내용'
    expect(generateExcerpt(short)).toBe(short)
  })
})
