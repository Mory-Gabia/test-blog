import type { Tag } from '../../types/blog'
import { TagBadge } from '../post/TagBadge'

interface TagFilterProps {
  tags: Tag[]
  activeTag: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div role="group" aria-label="태그 필터">
      <div className="flex flex-wrap gap-2">
        <TagBadge
          tag="전체"
          active={!activeTag}
          onClick={() => onSelect(null)}
        />
        {tags.map((tag) => (
          <TagBadge
            key={tag.name}
            tag={`${tag.name} (${tag.count})`}
            active={activeTag === tag.name}
            onClick={() => onSelect(activeTag === tag.name ? null : tag.name)}
          />
        ))}
      </div>
    </div>
  )
}
