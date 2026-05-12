import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description?: string
  action?: { label: string; to: string }
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-4xl mb-4" aria-hidden="true">📭</p>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      {action && (
        <Link
          to={action.to}
          className="mt-6 inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
