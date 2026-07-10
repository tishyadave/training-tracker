import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/misc';
import { Clock } from 'lucide-react';

export function LogHistoryList({ logs = [], coursesById = {} }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your submission history</CardTitle>
        <CardDescription>Newest first. Read-only once submitted.</CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <EmptyState title="No logs yet" description="Submissions you make will show up here." />
        ) : (
          <ul>
            {logs.map((log) => (
              <li key={log.id} className="flex items-start justify-between gap-4 border-b border-hairline py-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-ink">{coursesById[log.courseId]?.name || 'Unknown task'}</p>
                  {log.notes && <p className="mt-0.5 text-sm text-ink-secondary">{log.notes}</p>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
                  <span className="text-sm font-medium text-ink">{log.hoursWorked}h</span>
                  <span className="flex items-center gap-1 text-xs text-ink-tertiary">
                    <Clock className="h-3 w-3" />
                    {log.date} · {log.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
