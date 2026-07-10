import { cn } from '@/lib/utils';

const VARIANTS = {
  default: 'bg-canvas text-ink-secondary border-hairline',
  forest: 'bg-forest-soft text-forest-hover border-transparent',
  amber: 'bg-amber-soft text-amber border-transparent',
  rose: 'bg-rose-soft text-rose border-transparent',
  outline: 'bg-transparent text-ink-secondary border-hairline',
};

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
