import { Pencil, Trash2, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ActivityBadge, StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/misc';
import { STATUS, STATUS_LABEL, formatDate, findProgress } from '@/lib/progress';

/**
 * Admin course table. When `candidateId` is 'all' and there are multiple
 * candidates, one status column per candidate is shown; otherwise a single
 * status + completion-date pair is shown for the selected candidate.
 */
export function CourseTable({
  courses = [],
  candidates = [],
  progress = [],
  candidateId = 'all',
  onEdit,
  onDelete,
  onStatusChange,
  onDateChange,
}) {
  if (courses.length === 0) {
    return <EmptyState title="No courses yet" description="Add your first course to start building the curriculum." />;
  }

  const showAllColumns = candidateId === 'all';
  const singleCandidate = !showAllColumns ? candidates.find((c) => c.id === candidateId) : null;

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
            {showAllColumns
              ? candidates.map((c) => (
                  <th key={c.id} className="px-4 py-3 min-w-[160px]">{c.name.split(' ')[0]}</th>
                ))
              : (
                <>
                  <th className="px-4 py-3 min-w-[150px]">Status</th>
                  <th className="px-4 py-3 min-w-[150px]">Completion date</th>
                </>
              )}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="group border-b border-hairline last:border-0 hover:bg-canvas/50">
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

              {showAllColumns
                ? candidates.map((candidate) => {
                    const row = findProgress(progress, candidate.id, course.id);
                    return (
                      <td key={candidate.id} className="px-4 py-3">
                        <StatusSelect
                          value={row?.status || STATUS.NOT_STARTED}
                          onChange={(status) => onStatusChange(row, candidate.id, course.id, status)}
                        />
                      </td>
                    );
                  })
                : (() => {
                    const row = findProgress(progress, singleCandidate?.id, course.id);
                    return (
                      <>
                        <td className="px-4 py-3">
                          <StatusSelect
                            value={row?.status || STATUS.NOT_STARTED}
                            onChange={(status) => onStatusChange(row, singleCandidate?.id, course.id, status)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="date"
                            className="h-8 w-[150px] text-xs"
                            value={row?.completionDate ? row.completionDate.slice(0, 10) : ''}
                            onChange={(e) => onDateChange(row, singleCandidate?.id, course.id, e.target.value)}
                          />
                        </td>
                      </>
                    );
                  })()}

              <td className="px-4 py-3">
                <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(course)} aria-label={`Edit ${course.name}`}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-rose-soft hover:text-rose"
                    onClick={() => onDelete(course)}
                    aria-label={`Delete ${course.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusSelect({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(STATUS).map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABEL[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { StatusBadge };
