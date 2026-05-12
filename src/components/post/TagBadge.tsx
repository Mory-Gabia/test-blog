import { Link } from 'react-router-dom'
import { clsx } from 'clsx'

interface TagBadgeProps {
  tag: string
  active?: boolean
  onClick?: () => void
}

export function TagBadge({ tag, active, onClick }: TagBadgeProps) {
  const classes = clsx(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
    active
      ? 'bg-brand-600 text-white'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        #{tag}
      </button>
    )
  }

  return (
    <Link to={`/?tag=${encodeURIComponent(tag)}`} className={classes}>
      #{tag}
    </Link>
  )
}
