import { type ReactNode } from 'react'
import { clsx } from 'clsx'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('mx-auto w-full max-w-4xl px-4 sm:px-6', className)}>{children}</div>
  )
}
