import { Clock } from 'lucide-react';
import { Avatar } from '@/components/shared/Avatar';

export function ActivityFeedItem({ log, candidate, course }) {
  return (
    <div className="flex gap-3 border-b border-hairline py-4 last:border-0">
      <Avatar name={candidate?.name} colorIndex={candidate?.colorIndex} size={36} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="text-sm text-ink">
            <span className="font-medium">{candidate?.name || 'Unknown candidate'}</span>{' '}
            <span className="text-ink-secondary">logged</span>{' '}
            <span className="font-medium">{log.hoursWorked}h</span>{' '}
            <span className="text-ink-secondary">on</span>{' '}
            <span className="font-medium">{course?.name || 'Unknown course'}</span>
          </p>
          <span className="flex items-center gap-1 text-xs text-ink-tertiary whitespace-nowrap">
            <Clock className="h-3 w-3" />
            {log.date} · {log.time}
          </span>
        </div>
        {log.notes && <p className="mt-1 text-sm text-ink-secondary">{log.notes}</p>}
      </div>
    </div>
  );
}
