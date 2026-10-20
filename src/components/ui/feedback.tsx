import * as React from 'react'
import { CheckCircle2, CircleAlert, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export type FeedbackVariant = 'info' | 'success' | 'warning' | 'error'
const icons = { info: Info, success: CheckCircle2, warning: TriangleAlert, error: CircleAlert }

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FeedbackVariant
}
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', role, className, children, ...props }, ref) => {
    const Icon = icons[variant]
    return <div {...props} ref={ref} role={role ?? (variant === 'error' ? 'alert' : 'status')} className={cn('bl-alert', `bl-feedback-${variant}`, className)}>
      <Icon size={20} aria-hidden="true" className="bl-feedback-icon" />
      <div className="bl-feedback-copy">{children}</div>
    </div>
  },
)
Alert.displayName = 'Alert'
export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('bl-alert-title', className)} {...props} />
}
export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('bl-alert-description', className)} {...props} />
}

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}
export function Spinner({ label = 'Loading', size = 'md', className, ...props }: SpinnerProps) {
  return <span {...props} role="status" className={cn('bl-spinner', `bl-spinner-${size}`, className)}>
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".25" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <span className="bl-sr-only">{label}</span>
  </span>
}

/** Decorative placeholder. Label the containing loading region and set aria-busy there. */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} aria-hidden="true" className={cn('bl-skeleton', className)} />
}

export function ToastViewport({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bl-toast-viewport', className)} {...props} />
}
export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  variant?: FeedbackVariant
  dismissLabel?: string
}
/** Keep mounted before opening so assistive technology observes the live-region update.
 * Toasts persist until dismissed; callers control their lifecycle through open/onOpenChange.
 */
export function Toast({ open, onOpenChange, title, description, variant = 'info', dismissLabel = 'Dismiss notification', className, ...props }: ToastProps) {
  const Icon = icons[variant]
  return <div {...props} className={cn('bl-toast-slot', className)}>
    <span className="bl-sr-only" role={variant === 'error' ? 'alert' : 'status'} aria-atomic="true">
      {open ? `${title}${description ? `. ${description}` : ''}` : ''}
    </span>
    {open && <div className={cn('bl-toast', `bl-feedback-${variant}`)}>
      <Icon size={20} aria-hidden="true" className="bl-feedback-icon" />
      <div className="bl-feedback-copy"><p className="bl-alert-title">{title}</p>{description && <p className="bl-alert-description">{description}</p>}</div>
      <button type="button" className="icon-button bl-toast-dismiss" aria-label={dismissLabel} onClick={() => onOpenChange(false)}><X size={18} aria-hidden="true" /></button>
    </div>}
  </div>
}
