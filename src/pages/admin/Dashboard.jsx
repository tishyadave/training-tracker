import { Users, ListChecks, NotebookPen } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { CandidateTable } from '@/components/admin/CandidateTable';
import { ProgressMatrix } from '@/components/admin/ProgressMatrix';
import { Loader } from '@/components/shared/misc';
import { useDashboardStats, useProgressMatrix, useProgress } from '@/hooks/useProgress';
import { useCandidates } from '@/hooks/useCandidates';
import { useCourses } from '@/hooks/useCourses';
import { summarizeCandidate } from '@/lib/progress';

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: matrix, isLoading: matrixLoading } = useProgressMatrix();
  const { data: candidates = [], isLoading: candidatesLoading } = useCandidates();
  const { data: courses = [] } = useCourses();
  const { data: progress = [] } = useProgress();

  const isLoading = statsLoading || matrixLoading || candidatesLoading;

  if (isLoading) return <Loader label="Loading dashboard…" className="h-[60vh]" />;

  const progressByCandidate = {};
  candidates.forEach((c) => {
    progressByCandidate[c.id] = summarizeCandidate(progress, c.id, courses.length);
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-secondary">Cohort overview across the Power BI training programme.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total candidates" value={stats.totalCandidates} icon={Users} accent="forest" />
        <StatCard title="Total courses" value={stats.totalCourses} icon={ListChecks} accent="amber" />
        <StatCard title="Average progress" ring={stats.avgProgress} />
        <StatCard title="Logs submitted today" value={stats.logsToday} icon={NotebookPen} accent="rose" />
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">Candidate progress</h2>
        <CandidateTable candidates={candidates} progressByCandidate={progressByCandidate} onEdit={() => {}} onDelete={() => {}} />
        <p className="mt-2 text-xs text-ink-tertiary">Manage candidates from the Candidates page.</p>
      </div>

      <ProgressMatrix candidates={matrix.candidates} courses={matrix.courses} progress={matrix.progress} />
    </div>
  );
}