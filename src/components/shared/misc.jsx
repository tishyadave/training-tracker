import { Loader2, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Flat progress bar, used inline in tables where a ring doesn't fit.
 */
export function ProgressBar({ percent = 0, className, color = 'bg-forest' }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-hairline">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-xs text-ink-secondary tabular-nums">{clamped}%</span>
    </div>
  );
}

export function Loader({ label = 'Loading…', className }) {
  return (
    <div className={cn('flex items-center justify-center gap-2 py-12 text-ink-tertiary', className)}>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-hairline py-12 px-6 text-center', className)}>
      <Icon className="h-6 w-6 text-ink-tertiary" />
      <p className="text-sm font-medium text-ink">{title}</p>
      {description && <p className="max-w-xs text-sm text-ink-secondary">{description}</p>}
      {action}
    </div>
  );
}
