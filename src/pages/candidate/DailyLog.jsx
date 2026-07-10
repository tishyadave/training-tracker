import { DailyLogForm } from '@/components/candidate/DailyLogForm';
import { LogHistoryList } from '@/components/candidate/LogHistoryList';
import { Loader } from '@/components/shared/misc';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/hooks/useCourses';
import { useCandidateLogs, useCreateLog } from '@/hooks/useLogs';

export default function DailyLog() {
  const { user } = useAuth();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const { data: logs = [], isLoading: logsLoading } = useCandidateLogs(user.id);
  const createLog = useCreateLog();

  const isLoading = coursesLoading || logsLoading;

  function handleSubmit(values, { onSuccess }) {
    createLog.mutate({ ...values, candidateId: user.id }, { onSuccess });
  }

  if (isLoading) return <Loader label="Loading your log…" className="h-[60vh]" />;

  const coursesById = Object.fromEntries(courses.map((c) => [c.id, c]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Daily Log</h1>
        <p className="mt-1 text-sm text-ink-secondary">Track the time you spend on each task, day by day.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyLogForm courses={courses} onSubmit={handleSubmit} isLoading={createLog.isPending} />
        <LogHistoryList logs={logs} coursesById={coursesById} />
      </div>
    </div>
  );
}
