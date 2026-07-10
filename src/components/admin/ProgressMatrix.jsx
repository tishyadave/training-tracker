import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/shared/Avatar';
import { STATUS, findProgress } from '@/lib/progress';
import { cn } from '@/lib/utils';

function Dot({ status }) {
  if (status === STATUS.COMPLETED) {
    return <span className="block h-3 w-3 rounded-full bg-forest" title="Completed" />;
  }
  if (status === STATUS.IN_PROGRESS) {
    return <span className="block h-3 w-3 rounded-full border-2 border-amber bg-amber-soft" title="In progress" />;
  }
  if (status === STATUS.BLOCKED) {
    return <span className="block h-3 w-3 rounded-full border-2 border-rose bg-rose-soft" title="Blocked" />;
  }
  return <span className="block h-3 w-3 rounded-full border-2 border-hairline bg-white" title="Not started" />;
}

export function ProgressMatrix({ candidates = [], courses = [], progress = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress matrix</CardTitle>
        <CardDescription>Every candidate against every course, at a glance.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto pt-0">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white pb-3 pr-3 text-left text-xs font-medium uppercase tracking-wide text-ink-tertiary">
                Course
              </th>
              {candidates.map((c) => (
                <th key={c.id} className="pb-3 px-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Avatar name={c.name} colorIndex={c.colorIndex} size={24} />
                    <span className="max-w-[64px] truncate text-[11px] font-normal text-ink-secondary">
                      {c.name.split(' ')[0]}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, i) => (
              <tr key={course.id} className={cn(i % 2 === 1 && 'bg-canvas/60')}>
                <td className="sticky left-0 z-10 bg-white py-2 pr-3 text-sm text-ink">
                  <span className="text-ink-tertiary mr-1.5 tabular-nums">{course.sr}.</span>
                  {course.name}
                </td>
                {candidates.map((candidate) => {
                  const row = findProgress(progress, candidate.id, course.id);
                  return (
                    <td key={candidate.id} className="py-2 px-2 text-center">
                      <div className="flex justify-center">
                        <Dot status={row?.status || STATUS.NOT_STARTED} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-hairline pt-4 text-xs text-ink-secondary">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-forest" /> Completed</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border-2 border-amber bg-amber-soft" /> In progress</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border-2 border-rose bg-rose-soft" /> Blocked</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border-2 border-hairline bg-white" /> Not started</span>
        </div>
      </CardContent>
    </Card>
  );
}
