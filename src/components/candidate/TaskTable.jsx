import { Link as LinkIcon } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ActivityBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/misc';
import { STATUS, STATUS_LABEL, formatDate, findProgress } from '@/lib/progress';

/**
 * Candidate's own task table. Sr/Course/Type/Target date/Resource are
 * read-only; Status and Completion date are the only editable columns, and
 * only for this candidate's own rows — a real permission boundary that the
 * backend must also enforce once it exists.
 */
export function TaskTable({ courses = [], progress = [], candidateId, onStatusChange, onDateChange }) {
  if (courses.length === 0) {
    return <EmptyState title="No tasks assigned" description="Check back once your admin adds courses to the curriculum." />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-hairline bg-white">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="border-b border-hairline text-left text-xs font-medium uppercase tracking-wide text-ink-tertiary">
            <th className="px-4 py-3">Sr</th>
            <th className="px-4 py-3">Course</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Target date</th>
            <th className="px-4 py-3">Resource</th>
            <th className="px-4 py-3 min-w-[150px]">Status</th>
            <th className="px-4 py-3 min-w-[150px]">Completion date</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const row = findProgress(progress, candidateId, course.id);
            return (
              <tr key={course.id} className="border-b border-hairline last:border-0 hover:bg-canvas/50">
                <td className="px-4 py-3 tabular-nums text-ink-tertiary">{course.sr}</td>
                <td className="px-4 py-3 font-medium text-ink">{course.name}</td>
                <td className="px-4 py-3"><ActivityBadge type={course.activityType} /></td>
                <td className="px-4 py-3 text-ink-secondary">{formatDate(course.targetDate)}</td>
                <td className="px-4 py-3">
                  {course.resourceLink ? (
                    <a
                      href={course.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-forest hover:underline"
                    >
                      <LinkIcon className="h-3.5 w-3.5" /> Open
                    </a>
                  ) : (
                    <span className="text-ink-tertiary">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={row?.status || STATUS.NOT_STARTED}
                    onValueChange={(status) => onStatusChange(row, course.id, status)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Candidates cannot set BLOCKED — that's an admin-only state. */}
                      {Object.values(STATUS)
                        .filter((s) => s !== STATUS.BLOCKED)
                        .map((s) => (
                          <SelectItem key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="date"
                    className="h-8 w-[150px] text-xs"
                    value={row?.completionDate ? row.completionDate.slice(0, 10) : ''}
                    onChange={(e) => onDateChange(row, course.id, e.target.value)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
