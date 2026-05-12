const DATE_FORMATTER = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return isNaN(date.getTime()) ? iso : DATE_FORMATTER.format(date)
}

export function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function normalizeTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0)
    .filter((t, i, arr) => arr.indexOf(t) === i)
}

export function generateExcerpt(content: string, maxLength = 150): string {
  const plain = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()
  return plain.length <= maxLength ? plain : plain.slice(0, maxLength) + '…'
}
