import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { cn } from '@/lib/utils';

/**
 * A dashboard stat card. Pass `ring` for a circular-progress stat, or
 * `icon` for a plain numeric stat with an icon accent.
 */
export function StatCard({ title, value, icon: Icon, ring, accent = 'forest', className }) {
  const accentClasses = {
    forest: 'bg-forest-soft text-forest',
    amber: 'bg-amber-soft text-amber',
    rose: 'bg-rose-soft text-rose',
  };

  return (
    <Card className={cn('flex items-center justify-between gap-4 p-5', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-ink-secondary">{title}</span>
        {!ring && <span className="font-display text-2xl font-semibold text-ink">{value}</span>}
      </div>
      {ring ? (
        <ProgressRing percent={ring} size={64} strokeWidth={6} label={`${ring}%`} />
      ) : Icon ? (
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-md', accentClasses[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
    </Card>
  );
}
