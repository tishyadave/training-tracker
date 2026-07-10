import { cn } from '@/lib/utils';

/**
 * Signature "growth ring" — circular SVG progress indicator used on stat
 * cards in place of a flat progress bar. Ties visually to the training
 * programme's idea of gradual growth/completion.
 */
export function ProgressRing({
  percent = 0,
  size = 88,
  strokeWidth = 8,
  className,
  label,
  sublabel,
  color = '#0F6E56',
  trackColor = '#E6E2D8',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-lg font-semibold text-ink leading-none">{label ?? `${clamped}%`}</span>
        {sublabel && <span className="mt-1 text-[10px] uppercase tracking-wide text-ink-tertiary">{sublabel}</span>}
      </div>
    </div>
  );
}
